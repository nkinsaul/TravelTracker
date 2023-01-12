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

// query selectors

const welcomeUser = document.getElementById("asideHeader");
const tripsContainer = document.getElementById("tripsContainer")

// event listeners 

window.addEventListener('load', onLoad)

// global variables

let traveler;
let travelersTrips;
let travelersDestinations;

// functions

function onLoad () {
    displayUserWelcome();
    getTripsAndDestinations();
    displayDestinationImages();
};

const displayUserWelcome = () => {
    traveler = new Traveler(sampleTravelerData, 25);
    const travelerFirstName = traveler.getTravelersFirstName();
    welcomeUser.innerText = `Welcome ${travelerFirstName}`
};

const getTripsAndDestinations = () => {
    travelersTrips = traveler.getTrips(trips)
    travelersDestinations = travelersTrips.usersTrips.reduce((arr, trip) => {
        arr.push(new Destination(destinations, trip.destinationID))
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




