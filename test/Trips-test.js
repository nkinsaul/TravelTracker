import chai from 'chai';
const expect = chai.expect;
import Trips from '../src/Trips'
import trips from '../src/data/mock-Trips-data'
import Traveler from '../src/Traveler';

describe ("Trips", function() {
    let trips;
    let traveler;

    beforeEach(function () {
        trips = new Trips(trips)
        travelerData = new Traveler(travelerData)
        traveler25 = travelerData.findSingleTraveler(25)
    })

    
})

