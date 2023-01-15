// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'


// console.log('This is the JavaScript entry file - your code begins here.');

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
const pastTripsButton = document.getElementById('pastTripsButton')
const tripEstimateButton = document.getElementById('tripEstimateButton')
const tripInfoSection = document.getElementById('userTripsInfo')


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
    bookTripButton.classList.remove('hidden')
    pendingButton.classList.remove('hidden')
    allTripsButton.classList.remove('hidden')
    pastTripsButton.classList.remove('hidden')
});

form.addEventListener('submit', function(event){
    event.preventDefault()
    let dateCheck = new Date(dateInput.value)
    let modifyDate = dateInput.value.replaceAll('-', '/')
    let modifyDestination = destinationInput.value.split(' ')[0]
    checkInputSubmit(newTripId, randomUserId, parseInt(modifyDestination), parseInt(numTravelersInput.value), modifyDate, parseInt(durationInput.value), dateCheck)
})

pendingButton.addEventListener('click', function(event) {
    displayPendingTrips(event);
}) 

allTripsButton.addEventListener('click', function(event) {
    displayDestinationImages(event)
})

pastTripsButton.addEventListener('click', function(event) {
    displayPastTrips(event)
});

tripEstimateButton.addEventListener('click', function(event) {
    event.preventDefault()
    let modifyDestination = destinationInput.value.split(' ')[0]
    let date = new Date(dateInput.value)
    checkInputEstimate(destinationData, parseInt(modifyDestination), parseInt(durationInput.value), parseInt(numTravelersInput.value), date)
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
    travelersTrips.usersTrips.forEach((trip, index) => {
        let tripDestination = document.createElement('ARTICLE')
        let tripInfoContainer = document.createElement('div')
        tripInfoContainer.classList.add('trip-info-container')
        let img = document.createElement('img')
        let destName = document.createElement('CAPTION')
        let tripDate = document.createElement('P')
        tripDate.classList.add('trip-date')
        let tripDuration = document.createElement('P')
        tripDuration.classList.add('trip-duration')
        let numTravelers = document.createElement('P')
        numTravelers.classList.add('num-travelers')
        img.src = travelersDestinations[index].image
        img.alt = travelersDestinations[index].alt
        destName.innerHTML = travelersDestinations[index].destination
        tripDate.innerText = dayjs(trip.date).format('MMM D, YYYY')
        tripDuration.innerText = `Duration: ${trip.duration} days`
        numTravelers.innerText = `${trip.travelers} Travelers`
        tripsContainer.appendChild(tripDestination)
        tripDestination.appendChild(img)
        tripDestination.appendChild(destName)
        tripDestination.appendChild(tripInfoContainer)
        tripInfoContainer.appendChild(tripDate)
        tripInfoContainer.appendChild(tripDuration)
        tripInfoContainer.appendChild(numTravelers)
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
    bookTripButton.classList.add('hidden')
    pendingButton.classList.add('hidden')
    allTripsButton.classList.add('hidden')
    pastTripsButton.classList.add('hidden')
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
        tripsData = data[0].trips;
        travelerData = data[1].travelers;
        generateTripID(tripsData)
        getTripsAndDestinations(tripsData, destinationData);
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

const checkInputSubmit = (id, userID, destinationID, travelers, date, duration, dateCheck) => {
    let today = new Date()
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
    } else if (dateCheck <= today) {
        errorMessage.innerText = 'Please select a date after today.'
        errorMessage.classList.remove('hidden')
        setTimeout(() => errorMessage.classList.add('hidden'), 3000)
    } else {
        addTripData(id, userID, destinationID, travelers, date, duration)
        .then(fetchNewData())
        clearForm();
        setTimeout(() => fetchNewData(), 1000);
        errorMessage.innerText = 'Booked!'
        errorMessage.classList.remove('hidden')
        setTimeout(() => errorMessage.classList.add('hidden'), 3000)
        setTimeout(() => form.classList.add('hidden'), 3000)
        setTimeout(() => tripsContainer.classList.remove('hidden'), 3000)
        setTimeout(() => bookTripButton.classList.remove('hidden'), 3000)
        setTimeout(() => pendingButton.classList.remove('hidden'), 3000)
        setTimeout(() => allTripsButton.classList.remove('hidden'), 3000)
        setTimeout(() => pastTripsButton.classList.remove('hidden'), 3000)
        setTimeout(() => displayDestinationImages(tripsData, destinationData), 3000)
    }   
}

const displayPendingTrips = () => {
    tripsContainer.innerHTML = ''
    const pendingTrips = travelersTrips.findPendingTrips()
    const destinations = pendingTrips.reduce((arr, trip) => {
        arr.push(new Destination(destinationData, trip.destinationID))
        return arr
    },[])
    pendingTrips.forEach((trip, index) => {
        let tripDestination = document.createElement('ARTICLE')
        let tripInfoContainer = document.createElement('div')
        tripInfoContainer.classList.add('trip-info-container')
        let img = document.createElement('img')
        let destName = document.createElement('CAPTION')
        let tripDate = document.createElement('P')
        tripDate.classList.add('trip-date')
        let tripDuration = document.createElement('P')
        tripDuration.classList.add('trip-duration')
        let numTravelers = document.createElement('P')
        numTravelers.classList.add('num-travelers')
        img.src = destinations[index].image
        img.alt = destinations[index].alt
        destName.innerHTML = destinations[index].destination
        tripDate.innerText = dayjs(trip.date).format('MMM D, YYYY')
        tripDuration.innerText = `Duration: ${trip.duration} days`
        numTravelers.innerText = `${trip.travelers} Travelers`
        tripsContainer.appendChild(tripDestination)
        tripDestination.appendChild(img)
        tripDestination.appendChild(destName)
        tripDestination.appendChild(tripInfoContainer)
        tripInfoContainer.appendChild(tripDate)
        tripInfoContainer.appendChild(tripDuration)
        tripInfoContainer.appendChild(numTravelers)
    })
}

const displayPastTrips = () => {
    tripsContainer.innerHTML = ''
    const pastTrips = travelersTrips.findPastTrips()
    const destinations = pastTrips.reduce((arr, trip) => {
        arr.push(new Destination(destinationData, trip.destinationID))
        return arr
    },[])
    pastTrips.forEach((trip, index) => {
        let tripDestination = document.createElement('ARTICLE')
        let tripInfoContainer = document.createElement('div')
        tripInfoContainer.classList.add('trip-info-container')
        let img = document.createElement('img')
        img.alt = travelersDestinations[index].alt
        let destName = document.createElement('CAPTION')
        let tripDate = document.createElement('P')
        tripDate.classList.add('trip-date')
        let tripDuration = document.createElement('P')
        tripDuration.classList.add('trip-duration')
        let numTravelers = document.createElement('P')
        numTravelers.classList.add('num-travelers')
        img.src = destinations[index].image
        img.alt = destinations[index].alt
        destName.innerHTML = destinations[index].destination
        tripDate.innerText = dayjs(trip.date).format('MMM D, YYYY')
        tripDuration.innerText = `Duration: ${trip.duration} days`
        numTravelers.innerText = `${trip.travelers} Travelers`
        tripsContainer.appendChild(tripDestination)
        tripDestination.appendChild(img)
        tripDestination.appendChild(destName)
        tripDestination.appendChild(tripInfoContainer)
        tripInfoContainer.appendChild(tripDate)
        tripInfoContainer.appendChild(tripDuration)
        tripInfoContainer.appendChild(numTravelers)
    })
}

const showTripEstimate = (destinationData, destinationId, duration, travelers) => {
    const newDestination = new Destination(destinationData, destinationId)
    const tripCost = newDestination.estimateTripCost(duration, travelers)
    errorMessage.innerText = `Your estimated trip cost is $${tripCost}. Click submit to book your trip!`
    errorMessage.classList.remove('hidden')
}

const checkInputEstimate = (destinationData, destinationId, duration, travelers, date) => {
    let today = new Date()
    if (duration > 30) {
        errorMessage.innerText = 'For bookings over 30 days please call 1-888-BOOK-NOW'
        errorMessage.classList.remove('hidden')
        setTimeout(() => clearForm(), 3000);
        setTimeout(() => errorMessage.classList.add('hidden'), 3000)
    } else if (travelers > 20) {
        message.innerText = 'For bookings with large parties please call 1-888-BOOK-NOW'
        errorMessage.classList.remove('hidden')
        setTimeout(() => clearForm(), 3000);
        setTimeout(() => errorMessage.classList.add('hidden'), 3000)
    } else if (date <= today) {
        errorMessage.innerText = 'Please select a date after today.'
        errorMessage.classList.remove('hidden')
    } else {
        showTripEstimate(destinationData, destinationId, duration, travelers)
    }
}


export {pleaseTryAgainError}


