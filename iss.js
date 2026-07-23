// ISS Live Tracker


const API_URL = "https://api.wheretheiss.at/v1/satellites/25544";


// Initialize Map


const map = L.map("map").setView([0, 0], 2);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors"
}).addTo(map);


// Custom ISS Icon


const issIcon = L.icon({
    iconUrl: "images/iss.png",
    iconSize: [48, 48],
    iconAnchor: [24, 24],
    popupAnchor: [0, -20]
});


// Variables


let issMarker;

let pathCoordinates = [];

let followISS = false;

let currentLatitude = 0;
let currentLongitude = 0;

// Orbit Trail


const orbitPath = L.polyline([], {
    color: "#3B82F6",
    weight: 3,
    opacity: 0.8
}).addTo(map);


// Buttons


const followButton = document.getElementById("follow-btn");
const locateButton = document.getElementById("locate-btn");
const resetButton = document.getElementById("reset-btn");

// Toggle Follow Mode
followButton.addEventListener("click", () => {

    followISS = !followISS;

    followButton.classList.toggle("active");

    followButton.textContent = followISS
        ? "🛰 Following"
        : "🛰 Follow ISS";

});

// Locate ISS
locateButton.addEventListener("click", () => {

    map.flyTo(
        [currentLatitude, currentLongitude],
        5,
        {
            animate: true,
            duration: 1.5
        }
    );

});

// Reset Map
resetButton.addEventListener("click", () => {

    map.flyTo(
        [0, 0],
        2,
        {
            animate: true,
            duration: 1.5
        }
    );

});


// Fetch ISS Data


async function getISSLocation() {

    try {

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();

        const latitude = data.latitude;
        const longitude = data.longitude;
        const altitude = data.altitude;
        const velocity = data.velocity;
        const visibility = data.visibility;

        // Save latest position

        currentLatitude = latitude;
        currentLongitude = longitude;

        // Orbit Trail

        pathCoordinates.push([latitude, longitude]);

        if (pathCoordinates.length > 100) {
            pathCoordinates.shift();
        }

        orbitPath.setLatLngs(pathCoordinates);

        // Create / Move Marker


        if (!issMarker) {

            issMarker = L.marker([latitude, longitude], {
                icon: issIcon
            }).addTo(map);

            issMarker.bindPopup(`
                <strong>🛰 International Space Station</strong><br>
                Latitude: ${latitude.toFixed(2)}°<br>
                Longitude: ${longitude.toFixed(2)}°
            `);

        } else {

            issMarker.slideTo(
                [latitude, longitude],
                {
                    duration: 1000,
                    keepAtCenter: false
                }
            );

            issMarker.setPopupContent(`
                <strong>🛰 International Space Station</strong><br>
                Latitude: ${latitude.toFixed(2)}°<br>
                Longitude: ${longitude.toFixed(2)}°
            `);

        }

        // Follow ISS


        if (followISS) {

            map.flyTo(
                [latitude, longitude],
                map.getZoom(),
                {
                    animate: true,
                    duration: 1
                }
            );

        }

        // Dashboard

        document.getElementById("latitude").textContent =
            `${latitude.toFixed(2)}°`;

        document.getElementById("longitude").textContent =
            `${longitude.toFixed(2)}°`;

        document.getElementById("altitude").textContent =
            `${altitude.toFixed(2)} km`;

        document.getElementById("velocity").textContent =
            `${velocity.toFixed(0)} km/h`;

        document.getElementById("visibility").textContent =
            visibility.charAt(0).toUpperCase() + visibility.slice(1);

        document.getElementById("last-update").textContent =
            new Date().toLocaleTimeString();

        document.getElementById("status").textContent = "● LIVE";
        document.getElementById("status").classList.add("live");

    } catch (error) {

        console.error("Failed to fetch ISS data:", error);

        document.getElementById("status").textContent = "● OFFLINE";
        document.getElementById("status").classList.remove("live");

    }

}


getISSLocation();

setInterval(getISSLocation, 5000);