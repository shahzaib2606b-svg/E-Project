
/* Visitor Counter */

let visitors = localStorage.getItem("visitors");

if (visitors === null) {
    visitors = 1;
} else {
    visitors = Number(visitors) + 1;
}

localStorage.setItem("visitors", visitors);

document.getElementById("visitorCount").innerText = visitors;


/* Date and Time */

function updateDateTime() {
    let now = new Date();

    let date = now.toLocaleDateString();
    let time = now.toLocaleTimeString();

    document.getElementById("tickerText").innerText =
        "Welcome to Alpine Ascents | Date: " + date +
        " | Time: " + time;
}

updateDateTime();
setInterval(updateDateTime, 1000);


/* Menu Click Effect */

let menuLinks = document.querySelectorAll("nav a");

menuLinks.forEach(function(link) {

    link.addEventListener("click", function() {

        menuLinks.forEach(function(item) {
            item.classList.remove("active");
        });

        link.classList.add("active");

    });

});



// Geolocation and Live Ticker

function updateTicker(locationText = "Location not available") {

    let now = new Date();

    let date = now.toLocaleDateString();
    let time = now.toLocaleTimeString();

    document.getElementById("tickerText").innerText =
        "Welcome to Alpine Ascents | Date: " +
        date + " | Time: " + time +
        " | Location: " + locationText;
}

function getLocation() {

    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(

            function(position) {

                let lat = position.coords.latitude;
                let lon = position.coords.longitude;

                fetch(
                    "https://nominatim.openstreetmap.org/reverse?format=json&lat=" +
                    lat + "&lon=" + lon
                )
                .then(response => response.json())
                .then(data => {

                    let location = data.display_name ||
                    "Location detected";

                    updateTicker(location);

                })
                .catch(() => {
                    updateTicker("Location detected");
                });

            },

            function() {
                updateTicker("Permission denied");
            }

        );

    } else {
        updateTicker("Not supported");
    }
}

getLocation();

setInterval(function() {
    updateTicker();
}, 1000);


// Contact Form
let contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function(event) {
    event.preventDefault();

    let name = document.getElementById("name").value;

    document.getElementById("formMessage").innerText =
        "Thank you " + name + "! Your message is ready.";

    contactForm.reset();
});
