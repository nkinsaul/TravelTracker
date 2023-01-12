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

// query selectors

const welcomeUser = document.getElementById("asideHeader");

// event listeners 

window.addEventListener('load', onLoad)

// global variables

let traveler;

// functions

function onLoad () {
    displayUserWelcome();
    displayTrips();
}

const displayUserWelcome = () => {
    traveler = new Traveler(sampleTravelerData, 25);
    const travelerFirstName = traveler.getTravelersFirstName();
    welcomeUser.innerText = `Welcome ${travelerFirstName}`
}

const displayTrips = () => {
    const travelersTrips = traveler.getTrips(trips)
    const tripDestinationsIDs = travelersTrips.usersTrips.map(trip => {
        return trip.destinationID
    });
}



