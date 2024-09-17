// Global variables for map and event data
let map;
let eventMarkers = [];

// Dummy event data
const sportsEvents = [
    {
        name: 'Local Soccer Tournament',
        description: 'A fun tournament for all ages.',
        lat: 40.73061,
        lng: -73.935242
    },
    {
        name: 'Community Basketball Game',
        description: 'A casual 3v3 basketball event.',
        lat: 40.741895,
        lng: -73.989308
    },
    {
        name: 'High School Baseball Championship',
        description: 'Watch local schools compete for the title!',
        lat: 40.752726,
        lng: -73.977229
    }
];

// Initialize the map
function initMap() {
    // Map options
    const mapOptions = {
        zoom: 12,
        center: { lat: 40.73061, lng: -73.935242 }
    };

    // New map
    map = new google.maps.Map(document.getElementById('map'), mapOptions);

    // Display sports events on the map
    sportsEvents.forEach(event => {
        const marker = new google.maps.Marker({
            position: { lat: event.lat, lng: event.lng },
            map: map,
            title: event.name
        });

        const infoWindow = new google.maps.InfoWindow({
            content: `<h3>${event.name}</h3><p>${event.description}</p>`
        });

        marker.addListener('click', () => {
            infoWindow.open(map, marker);
        });

        eventMarkers.push(marker);

        // Add event to the list
        document.getElementById('event-list').innerHTML += `
            <div class="event-item">
                <h3>${event.name}</h3>
                <p>${event.description}</p>
            </div>
        `;
    });
}
