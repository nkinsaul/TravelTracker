import chai from 'chai';
const expect = chai.expect;
import Destination from '../src/Destinations';
import destinations from '../src/data/mock-Destinations-data';

describe('Destinations', function() {
    let newDestination;

    beforeEach(function () {
        newDestination = new Destination(destinations, 15)
    });

    it('should be a function', () => {
        expect(Destination).to.be.a('function')
    });

    it('should be an instance of Destinations', () => {
        expect(newDestination).to.be.an.instanceOf(Destination)
    })

    it('should have an id', () => {
        expect(newDestination.id).to.equal(15)
    });

    it('should have a location', () => {
        // console.log(newDestination.d)
        expect(newDestination.destination).to.equal('Manila, Philippines')
    });
    
    it('should have an estimated lodging cost per day', () => {
        expect(newDestination.estimatedLodgingCostPerDay).to.equal(40)
    });

    it('should have an estimated flight cost per person', () => {
        expect(newDestination.estimatedFlightCostPerPerson).to.equal(900)
    });

    it('should have an image', () => {
        expect(newDestination.image).to.equal("https://images.unsplash.com/photo-1555557356-51c5d7a8f4c2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80")
    });

    it('should have alt text', () => {
        expect(newDestination.alt).to.equal("colorful buildings near the water with docked boats")
    })

    it('should calculate an estimated trip cost', () => {
        const tripCost = newDestination.estimateTripCost(10, 3)
            400 + 2700
            3100
        expect(tripCost).to.equal(3410)
    })
})
