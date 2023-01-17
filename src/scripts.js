
import './css/styles.css';

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
const backToTripsButton = document.getElementById('backToTrips');
const dateInput = document.getElementById('date');
const durationInput = document.getElementById('duration');
const numTravelersInput = document.getElementById('numTravelers');
const destinationInput = document.getElementById('destination');
const errorMessage = document.getElementById('errorMessage');
const pendingButton = document.getElementById('pendingTripsButton');
const allTripsButton = document.getElementById('seeAllTripsButton');
const pastTripsButton = document.getElementById('pastTripsButton');
const tripEstimateButton = document.getElementById('tripEstimateButton');
const loginForm = document.getElementById('loginForm');
const userName = document.getElementById('userName');
const password = document.getElementById('password');
const aside = document.getElementById('aside');
const main = document.getElementById('main');
const loginErrorMessage = document.getElementById('loginErrorMessage');
const noPendingTrips = document.getElementById('noPendingTrips'); 

// event listeners 

loginForm.addEventListener('submit', function(event) {
    event.preventDefault();
    checkLogin(travelerData);
});
 
bookTripButton.addEventListener('click', function(event) {
    event.preventDefault();
    displayForm();
    populateDestinationSelection(destinationData);
});

backToTripsButton.addEventListener('click', function(event) {
    event.preventDefault();
    tripsContainer.classList.remove('hidden');
    displayDestinationImages(tripsData, destinationData);
    form.classList.add('hidden');
    mainHeader.innerText = "Your Trips";
    bookTripButton.classList.remove('hidden');
    pendingButton.classList.remove('hidden');
    allTripsButton.classList.remove('hidden');
    pastTripsButton.classList.remove('hidden');
});

form.addEventListener('submit', function(event){
    event.preventDefault();
    let dateCheck = new Date(dateInput.value);
    let modifyDate = dateInput.value.replaceAll('-', '/');
    let modifyDestination = destinationInput.value.split(' ')[0];
    checkInputSubmit(newTripId, userId, parseInt(modifyDestination), parseInt(numTravelersInput.value), modifyDate, parseInt(durationInput.value), dateCheck);
})

pendingButton.addEventListener('click', function(event) {
    displayPendingTrips(event);
});

allTripsButton.addEventListener('click', function(event) {
    displayDestinationImages(event);
});

pastTripsButton.addEventListener('click', function(event) {
    displayPastTrips(event);
});

tripEstimateButton.addEventListener('click', function(event) {
    event.preventDefault();
    let modifyDestination = destinationInput.value.split(' ')[0];
    let date = new Date(dateInput.value);
    checkInputEstimate(destinationData, parseInt(modifyDestination), parseInt(durationInput.value), parseInt(numTravelersInput.value), date);
});

// global variables

let travelerData;
let tripsData;
let destinationData;
let traveler;
let travelersTrips;
let travelersDestinations;
let userId;
let newTripId;

// functions

Promise.all([fetchData('travelers')])
    .then(data => {
        travelerData = data[0].travelers
    });

function onLoad (travelerData, tripsData, destinationData) {
    displayUserWelcome(travelerData, userId);
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
    travelersTrips = traveler.getTrips(tripsData);
    displayTripTotal(travelersTrips, destinationData);
    travelersDestinations = travelersTrips.findDestinations(travelersTrips.usersTrips, destinationData);
};

const displayDestinationImages = () => {
    tripsContainer.innerHTML = ''
    displayTrips(travelersTrips.usersTrips, travelersDestinations);
};

const displayTrips = (trips, destinations) => {
    noPendingTrips.classList.add('hidden');
    trips.forEach((trip, index) => {
        let tripDestination = document.createElement('ARTICLE')
        let tripInfoContainer = document.createElement('div')
        tripInfoContainer.classList.add('trip-info-container')
        let img = document.createElement('img')
        img.setAttribute('tabindex', '0')
        let destName = document.createElement('CAPTION')
        destName.setAttribute('tabindex', '0')
        let tripDate = document.createElement('P')
        tripDate.setAttribute('tabindex', '0')
        tripDate.classList.add('trip-date')
        let tripDuration = document.createElement('P')
        tripDuration.setAttribute('tabindex', '0')
        tripDuration.classList.add('trip-duration')
        let numTravelers = document.createElement('P')
        numTravelers.setAttribute('tabindex', '0')
        numTravelers.classList.add('num-travelers')
        img.src = destinations[index].image
        img.alt = destinations[index].alt
        destName.innerHTML = destinations[index].destination
        tripDate.innerText = `Trip Date: ${dayjs(trip.date).format('MMM D, YYYY')}`
        tripDuration.innerText = `Duration: ${trip.duration} days`
        numTravelers.innerText = `Travelers: ${trip.travelers}`
        tripsContainer.appendChild(tripDestination)
        tripDestination.appendChild(img)
        tripDestination.appendChild(destName)
        tripDestination.appendChild(tripInfoContainer)
        tripInfoContainer.appendChild(tripDate)
        tripInfoContainer.appendChild(tripDuration)
        tripInfoContainer.appendChild(numTravelers)
    });
};

const displayTripTotal = (travelersTrips, destinationData) => {
    const totalTripsCost = travelersTrips.findTotalTripsCost(destinationData);
    tripsTotalSpent.innerHTML = `$${totalTripsCost}`;
};

const displayForm = () => {
    noPendingTrips.classList.add('hidden');
    tripsContainer.classList.add('hidden');
    form.classList.remove('hidden');
    mainHeader.innerText = "Book a New Trip"
    bookTripButton.classList.add('hidden');
    pendingButton.classList.add('hidden');
    allTripsButton.classList.add('hidden');
    pastTripsButton.classList.add('hidden');
};

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
    });
    newTripId = sortedTrips[0].id + 1
};

const fetchNewData = () => {
    Promise.all([fetchData('trips'), fetchData('travelers')])
    .then(data => {
        tripsData = data[0].trips;
        travelerData = data[1].travelers;
        generateTripID(tripsData)
        getTripsAndDestinations(tripsData, destinationData);
    });
};

const clearForm = () => {
    dateInput.value = ''
    durationInput.value = ''
    numTravelersInput.value = ''
    destinationInput.value = ''
};

const pleaseTryAgainError = () => {
    errorMessage.innerText = 'Uh oh, there was a problem, please try again.'
    errorMessage.classList.remove('hidden')
    setTimeout(() => errorMessage.classList.add('hidden'), 3000);
};

const checkInputSubmit = (id, userID, destinationID, travelers, date, duration, dateCheck) => {
    let today = new Date();
    if (durationInput.value > 30) {
        displayExtendedBookingError();
    } else if (numTravelersInput.value > 20) {
        displayLargePartyBookingError();
    } else if (dateCheck <= today) {
        displayPastDateError();
    } else if (dateInput.value === '' || durationInput.vale === '' || numTravelersInput.value === '') {
        displayAllFieldsError();
    } else {
        addTripData(id, userID, destinationID, travelers, date, duration)
        .then(fetchNewData())
        clearForm();
        setTimeout(() => fetchNewData(), 1000);
        errorMessage.innerText = 'Booked!';
        errorMessage.classList.remove('hidden');
        setTimeout(() => errorMessage.classList.add('hidden'), 3000);
        setTimeout(() => form.classList.add('hidden'), 3000);
        setTimeout(() => tripsContainer.classList.remove('hidden'), 3000);
        setTimeout(() => bookTripButton.classList.remove('hidden'), 3000);
        setTimeout(() => pendingButton.classList.remove('hidden'), 3000);
        setTimeout(() => allTripsButton.classList.remove('hidden'), 3000);
        setTimeout(() => pastTripsButton.classList.remove('hidden'), 3000);
        setTimeout(() => displayDestinationImages(tripsData, destinationData), 3000);
    }   
}

const displayPendingTrips = () => {
    tripsContainer.innerHTML = '';
    const pendingTrips = travelersTrips.findPendingTrips();
    const destinations = travelersTrips.findDestinations(pendingTrips, destinationData);
    if (pendingTrips.length === 0) {
        noPendingTrips.classList.remove('hidden')
    } else {
        displayTrips(pendingTrips, destinations);
    }
};

const displayPastTrips = () => {
    tripsContainer.innerHTML = '';
    noPendingTrips.classList.add('hidden')
    const pastTrips = travelersTrips.findPastTrips();
    const destinations = travelersTrips.findDestinations(pastTrips, destinationData);
    displayTrips(pastTrips, destinations);
};

const showTripEstimate = (destinationData, destinationId, duration, travelers) => {
    const newDestination = new Destination(destinationData, destinationId);
    const tripCost = newDestination.estimateTripCost(duration, travelers);
    errorMessage.innerText = `Your estimated trip cost is $${tripCost}. Click submit to book your trip!`
    errorMessage.classList.remove('hidden');
};

const checkInputEstimate = (destinationData, destinationId, duration, travelers, date) => {
    let today = new Date();
    if (duration > 30) {
        displayExtendedBookingError();
    } else if (travelers > 20) {
        displayLargePartyBookingError();
    } else if (date <= today) {
        displayPastDateError();
    } else if (dateInput.value === '' || durationInput.vale === '' || numTravelersInput.value === '') {
        displayAllFieldsError();
    } else {
        showTripEstimate(destinationData, destinationId, duration, travelers);
    }
};

const checkLogin = (travelerData) => {
    const logins = travelerData.map(traveler => {
        return traveler.id
    });
    const slicedNumber = parseInt(userName.value.slice(8, 10));
    const slicedName = userName.value.slice(0, 8);
    if(slicedName === 'traveler' && logins.includes(slicedNumber) && password.value === 'travel') {
        userId = slicedNumber
        Promise.all([fetchData('trips'), fetchData('destinations')])
        .then(data => {
        tripsData = data[0].trips
        destinationData = data[1].destinations
        onLoad(travelerData, tripsData, destinationData)
        aside.classList.remove('hidden')
        main.classList.remove('hidden')
        loginForm.classList.add('hidden')
    })
    } else {
        loginErrorMessage.innerText = `Whoops, that doesn't match our records, please re-enter your login information`
        loginErrorMessage.classList.remove('hidden')
        setTimeout(() => loginErrorMessage.classList.add('hidden'), 3000)
    };
};

const displayExtendedBookingError = () => {
    errorMessage.innerText = 'For bookings over 30 days please call 1-888-BOOK-NOW'
    errorMessage.classList.remove('hidden');
    setTimeout(() => errorMessage.classList.add('hidden'), 4000)
}

const displayLargePartyBookingError = () => {
    errorMessage.innerText = 'For bookings with large parties please call 1-888-BOOK-NOW';
    errorMessage.classList.remove('hidden');
    setTimeout(() => errorMessage.classList.add('hidden'), 4000)
}

const displayPastDateError = () => {
    errorMessage.innerText = 'Please select a date after today.';
    errorMessage.classList.remove('hidden');
    setTimeout(() => errorMessage.classList.add('hidden'), 4000)
}

const displayAllFieldsError = () => {
    errorMessage.innerText = `Please fill out all fields`
    errorMessage.classList.remove('hidden')
    setTimeout(() => errorMessage.classList.add('hidden'), 3000)
}

export {pleaseTryAgainError}


