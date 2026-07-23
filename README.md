# 🛰 ISS Live Tracker

A simple web application that tracks the International Space Station (ISS) in real time using a public API. The application displays the ISS on an interactive world map and updates its location every five seconds.

## Features

- 🌍 Interactive world map using Leaflet.js
- 🛰 Live ISS location updates
- 📍 Custom ISS marker
- 🛤 Orbit trail showing recent movement
- 📊 Live telemetry
  - Latitude
  - Longitude
  - Altitude
  - Velocity
  - Visibility
- 🎯 Follow ISS mode
- 📌 Locate ISS button
- 🌎 Reset map view

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6)
- Leaflet.js
- Where The ISS At API

## Project Structure

```
iss-live-tracker/
│
├── index.html
├── iss.css
├── iss.js
│
└── images/
    └── iss.png
```

## How to Run

1. Download or clone the project.
2. Open the project folder in Visual Studio Code.
3. Install the **Live Server** extension (if you don't already have it).
4. Right-click `index.html` and select **Open with Live Server**.
5. The application will open in your browser.

## API

This project uses the free **Where The ISS At API** to retrieve the ISS's live position.

API Endpoint:

```
https://api.wheretheiss.at/v1/satellites/25544
```


## License

This project is for educational and portfolio purposes.