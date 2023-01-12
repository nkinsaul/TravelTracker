// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'


console.log('This is the JavaScript entry file - your code begins here.');

// imports 

import Traveler from './Traveler';
import sampleTravelerData from './data/mock-Traveler-data';
import trips from './data/mock-Trips-data';
import destinations from './data/mock-Destinations-data';
import Destination from './Destinations';
import { fetchData } from './apiCalls';

// query selectors

const welcomeUser = document.getElementById("asideHeader");
const tripsContainer = document.getElementById("tripsContainer")

// event listeners 

// window.addEventListener('load', onLoad)

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
        console.log(destinationData)
        onLoad(travelerData, tripsData, destinationData)
    })

function onLoad (travelerData, tripsData, destinationData) {
    generateRandomUserId(1, 50);
    displayUserWelcome(travelerData, randomUserId);
    getTripsAndDestinations(tripsData, destinationData);
    displayDestinationImages(tripsData, destinationData);
};

const displayUserWelcome = (travelerData, userId) => {
    traveler = new Traveler(travelerData, userId);
    console.log(traveler)
    const travelerFirstName = traveler.getTravelersFirstName();
    welcomeUser.innerText = `Welcome ${travelerFirstName}`
};

const getTripsAndDestinations = (tripsData, destinationData) => {
    travelersTrips = traveler.getTrips(tripsData)
    console.log('travelers trips:', travelersTrips)
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
    })
}


const generateRandomUserId = (min, max) => {
    randomUserId = Math.floor(Math.random() * (max - min) + 1)
}



