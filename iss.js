const API_URL = "https://api.wheretheiss.at/v1/satellites/25544";

const map = L.map("map").setView([0, 0], 2);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors"
}).addTo(map);

let issMarker;

async function getISSLocation() {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();

        const latitude = data.latitude;
        const longitude = data.longitude;

        // Update marker
        if (!issMarker) {
            issMarker = L.marker([latitude, longitude]).addTo(map);
        } else {
            issMarker.setLatLng([latitude, longitude]);
        }

        // Update information panel
        document.getElementById("latitude").textContent =
            latitude.toFixed(2);

        document.getElementById("longitude").textContent =
            longitude.toFixed(2);

        document.getElementById("last-update").textContent =
            new Date().toLocaleTimeString();

    } catch (error) {
        console.error(error);
    }
}

// Initial request
getISSLocation();

// Update every 5 seconds
setInterval(getISSLocation, 4000);