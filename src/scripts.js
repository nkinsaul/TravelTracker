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
import { addTripData, fetchData } from './apiCalls';
import dayjs from 'dayjs';

// query selectors

const welcomeUser = document.getElementById('asideHeader');
const tripsContainer = document.getElementById('tripsContainer');
const tripsTotalSpent = document.getElementById('tripsTotalSpent');
const bookTripButton = document.getElementById('bookTripButton');
const mainHeader = document.getElementById('mainHeader');
const form = document.getElementById('form');
const backToTripsButton = document.getElementById('backToTrips')
const dateInput = document.getElementById('date');
const durationInput = document.getElementById('duration');
const numTravelersInput = document.getElementById('numTravelers');
const destinationInput = document.getElementById('destination');
const errorMessage = document.getElementById('errorMessage')
const pendingButton = document.getElementById('pendingTripsButton')
const allTripsButton = document.getElementById('seeAllTripsButton')


// event listeners 

bookTripButton.addEventListener('click', function(event) {
    event.preventDefault();
    displayForm();
    populateDestinationSelection(destinationData);
})

backToTripsButton.addEventListener('click', function(event) {
    event.preventDefault();
    tripsContainer.classList.remove('hidden')
    form.classList.add('hidden')
    mainHeader.innerText = "Your Trips"
});

form.addEventListener('submit', function(event){
    event.preventDefault();
    let modifyDate = dateInput.value.replaceAll('-', '/')
    let modifyDestination = destinationInput.value.split(' ')[0]
    checkInput(newTripId, randomUserId, parseInt(modifyDestination), parseInt(numTravelersInput.value), modifyDate, parseInt(durationInput.value), destinationData)
})

pendingButton.addEventListener('click', function(event) {
    displayPendingTrips(event);
}) 

allTripsButton.addEventListener('click', function(event) {
    displayDestinationImages(event)
})

// global variables

let travelerData;
let tripsData;
let destinationData;
let traveler;
let travelersTrips;
let travelersDestinations;
let randomUserId;
let newTripId;


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
    generateTripID(tripsData);
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
    tripsContainer.innerHTML = ''
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
    tripsContainer.classList.add('hidden')
    form.classList.remove('hidden')
    mainHeader.innerText = "Book a New Trip"
}

const populateDestinationSelection = (destinationData) => {
    destinationData.forEach(destination => {
        const option = document.createElement("option");
        option.innerText = `${destination.id} - ${destination.destination}`
        destinationInput.appendChild(option);
    }); 
};

const generateTripID = (data) => {
    const sortedTrips = data.sort((a, b) => {
        return b.id - a.id
    })
    newTripId = sortedTrips[0].id + 1
}

const fetchNewData = () => {
    Promise.all([fetchData('trips'), fetchData('travelers')])
    .then(data => {
        console.log(data)
        tripsData = data[0].trips;
        travelerData = data[1].travelers;
        generateTripID(tripsData)
    })
}    

const clearForm = () => {
    dateInput.value = ''
    durationInput.value = ''
    numTravelersInput.value = ''
    destinationInput.value = ''
}

const pleaseTryAgainError = () => {
    let message = document.createElement('p')
    message.innerText = 'Uh oh, there was a problem, please try again.'
    form.prepend(message);
    setTimeout(() => message.classList.add('hidden'), 3000)
}

const checkInput = (id, userID, destinationID, travelers, date, duration, destinationData) => {
    if (durationInput.value > 30) {
        errorMessage.innerText = 'For bookings over 30 days please call 1-888-BOOK-NOW'
        errorMessage.classList.remove('hidden')
        setTimeout(() => clearForm(), 3000);
        setTimeout(() => errorMessage.classList.add('hidden'), 3000)
    } else if (numTravelersInput.value > 20) {
        message.innerText = 'For bookings with large parties please call 1-888-BOOK-NOW'
        errorMessage.classList.remove('hidden')
        setTimeout(() => clearForm(), 3000);
        setTimeout(() => errorMessage.classList.add('hidden'), 3000)
    } else {
        addTripData(id, userID, destinationID, travelers, date, duration)
        .then(fetchNewData())
        clearForm();
        setTimeout(() => fetchNewData(), 1000);
        errorMessage.innerText = 'Booked!'
        errorMessage.classList.remove('hidden')
        setTimeout(() => errorMessage.classList.add('hidden'), 3000)
        setTimeout(() => getTripCostEstimate(id, destinationData, tripsData), 3000);
    }
}

const getTripCostEstimate = (tripId, destinationData, tripsData) => {
    travelersTrips = traveler.getTrips(tripsData);
    const tripEstimate = travelersTrips.calculateTripCost(tripId, destinationData)
    console.log(tripEstimate)
}

const displayPendingTrips = () => {
    tripsContainer.innerHTML = ''
    const pendingTrips = travelersTrips.findPendingTrips()
    const destinations = pendingTrips.reduce((arr, trip) => {
        arr.push(new Destination(destinationData, trip.destinationID))
        return arr
    },[])
    destinations.forEach(destination => {
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

const displayPastTrips = () => {
    
}


export {pleaseTryAgainError}