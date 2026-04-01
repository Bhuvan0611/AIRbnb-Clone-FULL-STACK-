mapboxgl.accessToken = mapToken;

// 👇 Get listing from HTML
const mapDiv = document.getElementById("map");
const listing = JSON.parse(mapDiv.dataset.listing);

const coordinates = listing.geometry.coordinates;

// 👇 Create map
const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v12",
    center: coordinates,
    zoom: 9,
});

// 👇 Add marker
const marker = new mapboxgl.Marker({ color: "red" })
    .setLngLat(coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 }).setHTML(
            `<h4>${listing.title}</h4>
             <p>Exact location will be provided after booking</p>`
        )
    )
    .addTo(map);