
let map; 
let eventMarkers = [];


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


function initMap() {
    
    const mapOptions = {
        zoom: 12,
        center: { lat: 25.717396, lng: -80.278130 }
    };

   
    map = new google.maps.Map(document.getElementById('map'), mapOptions);

 
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

      
        document.getElementById('event-list').innerHTML += `
            <div class="event-item">
                <h3>${event.name}</h3>
                <p>${event.description}</p>
            </div>
        `;
    });
}



document.addEventListener('DOMContentLoaded', () => {
    const toggleSwitch = document.getElementById('theme-switch');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme) {
        document.body.classList.toggle('dark-mode', currentTheme === 'dark');
        toggleSwitch.checked = currentTheme === 'dark';
    }

    toggleSwitch.addEventListener('change', () => {
        if (toggleSwitch.checked) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        }
    });
});
