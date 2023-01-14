import chai from 'chai';
const expect = chai.expect;
import Trips from '../src/Trips'
import trips from '../src/data/mock-Trips-data'
import destinations from '../src/data/mock-Destinations-data';

describe ("Trips", function() {
    let tripsData;
    let traveler25Trips;

    beforeEach(function () {
        tripsData = new Trips(trips, 25)
        traveler25Trips = tripsData.usersTrips
    });

    it("should be a function", () => {
        expect(Trips).to.be.a('function')
    });

    it('should be an instance of Trips', () => {
        expect(tripsData).to.be.an.instanceOf(Trips)
    })
    
    it('should get all trips for one user', () => {
        expect(traveler25Trips.length).to.equal(4)
    });

    it('should sort dates from latest to oldet', () => {
        expect(traveler25Trips).to.deep.equal([
            {
              id: 138,
              userID: 25,
              destinationID: 22,
              travelers: 3,
              date: '2020/10/29',
              duration: 18,
              status: 'pending',
              suggestedActivities: []
            },
            {
              id: 159,
              userID: 25,
              destinationID: 42,
              travelers: 6,
              date: '2020/07/24',
              duration: 17,
              status: 'approved',
              suggestedActivities: []
            },
            {
              id: 26,
              userID: 25,
              destinationID: 15,
              travelers: 3,
              date: '2019/12/10',
              duration: 9,
              status: 'approved',
              suggestedActivities: []
            },
            {
              id: 189,
              userID: 25,
              destinationID: 15,
              travelers: 4,
              date: '2019/12/01',
              duration: 10,
              status: 'approved',
              suggestedActivities: []
            }
          ]
        )
    })

    it('should find a users approved trips', () => {
        const user25ApprovedTrips = tripsData.findApprovedTrips(25)
        expect(user25ApprovedTrips.length).to.equal(3) 
    });

    it('should find pending trips for a user', () => {
        const user25PendingTrips = tripsData.findPendingTrips(25)
        expect(user25PendingTrips).to.deep.equal([{
            "id": 138,
            "userID": 25,
            "destinationID": 22,
            "travelers": 3,
            "date": "2020/10/29",
            "duration": 18,
            "status": "pending",
            "suggestedActivities": []
            }]);
    });

    it('can find a single trip', () => {
        const myTrip = tripsData.findSingleTrip(138)

        expect(myTrip).to.deep.equal({
            "id": 138,
            "userID": 25,
            "destinationID": 22,
            "travelers": 3,
            "date": "2020/10/29",
            "duration": 18,
            "status": "pending",
            "suggestedActivities": []
            })
    })

    it('can find a trips destination info', () => {
        const myTrip = tripsData.findSingleTrip(138)
        const myTripDestination = tripsData.findTripDestination(destinations, myTrip.destinationID)

        expect(myTripDestination).to.deep.equal({
            "id": 22,
            "destination": "Rome, Italy",
            "estimatedLodgingCostPerDay": 90,
            "estimatedFlightCostPerPerson": 650,
            "image": "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
            "alt": "people standing inside a colosseum during the day"
            })
    })

    it('should calculate a trips cost', () => {
        const tripCost = tripsData.calculateTripCost(138, destinations)

        expect(tripCost).to.equal(3927)
    })

    it('should calculate total trips cost for the current year', () => {

    })

});

