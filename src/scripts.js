// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'


console.log('This is the JavaScript entry file - your code begins here.');

// imports 

import Traveler from './Traveler';
import Destination from './Destinations';
import { fetchData } from './apiCalls';

// query selectors

const welcomeUser = document.getElementById('asideHeader');
const tripsContainer = document.getElementById('tripsContainer');
const tripsTotalSpent = document.getElementById('tripsTotalSpent');
const bookTripButton = document.getElementById('bookTripButton');
const mainHeader = document.getElementById('mainHeader');
const form = document.getElementById('form');

// event listeners 

bookTripButton.addEventListener('click', function(event) {
    event.preventDefault();
    displayForm();
})

// global variables

let travelerData;
let tripsData;
let destinationData;
let traveler;
let travelersTrips;
let travelersDestinations;
let randomUserId;

// functions

Promise.all([fetchData('travelers'), fetchData('trips'), fetchData('destinations')])
    .then(data => {
        travelerData = data[0].travelers
        tripsData = data[1].trips
        destinationData = data[2].destinations
        onLoad(travelerData, tripsData, destinationData)
    })

const generateRandomUserId = (min, max) => {
    randomUserId = Math.floor(Math.random() * (max - min) + 1)
}

function onLoad (travelerData, tripsData, destinationData) {
    generateRandomUserId(1, 50);
    displayUserWelcome(travelerData, randomUserId);
    getTripsAndDestinations(tripsData, destinationData);
    displayDestinationImages(tripsData, destinationData);
};

const displayUserWelcome = (travelerData, userId) => {
    traveler = new Traveler(travelerData, userId);
    const travelerFirstName = traveler.getTravelersFirstName();
    welcomeUser.innerText = `Hello, ${travelerFirstName}`
};

const getTripsAndDestinations = (tripsData, destinationData) => {
    travelersTrips = traveler.getTrips(tripsData)
    displayTripTotal(travelersTrips, destinationData)
    travelersDestinations = travelersTrips.usersTrips.reduce((arr, trip) => {
        arr.push(new Destination(destinationData, trip.destinationID))
        return arr
    },[]);
};

const displayDestinationImages = () => {
    travelersDestinations.forEach(destination => {
        let trip = document.createElement('ARTICLE')
        let img = document.createElement('img')
        img.src = destination.image
        let destName = document.createElement('CAPTION')
        destName.innerHTML = destination.destination
        tripsContainer.appendChild(trip)
        trip.appendChild(img)
        trip.appendChild(destName)
    });
}

const displayTripTotal = (travelersTrips, destinationData) => {
    const totalTripsCost = travelersTrips.findTotalTripsCost(destinationData)
    tripsTotalSpent.innerHTML = totalTripsCost;
}

const displayForm = () => {
    console.log('hello')
    tripsContainer.style.display = "none";
    form.classList.remove('hidden')
    mainHeader.innerText = "Book a New Trip"
}





