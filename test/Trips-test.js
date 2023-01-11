import chai from 'chai';
const expect = chai.expect;
import Trips from '../src/Trips'
import trips from '../src/data/mock-Trips-data'
import Traveler from '../src/Traveler';
import sampleTravelerData from '../src/data/mock-Traveler-data';

describe ("Trips", function() {
    let tripsData;
    let travelerData;
    let traveler25Trips;

    beforeEach(function () {
        tripsData = new Trips(trips)
        travelerData = new Traveler(sampleTravelerData)
        traveler25Trips = tripsData.getTripsForUser(25)
    });

    it("should be a function", () => {
        expect(Trips).to.be.a('function')
    });

    it('should be an instance of Trips', () => {
        expect(tripsData).to.be.an.instanceOf(Trips)
    })
    
    it('should get all trips for one user', () => {
        expect(traveler25Trips).to.deep.equal([{
            "id": 138,
            "userID": 25,
            "destinationID": 22,
            "travelers": 3,
            "date": "2020/10/29",
            "duration": 18,
            "status": "pending",
            "suggestedActivities": []
            },
            {
            "id": 159,
            "userID": 25,
            "destinationID": 42,
            "travelers": 6,
            "date": "2020/07/24",
            "duration": 17,
            "status": "approved",
            "suggestedActivities": []
            },
            {
            "id": 189,
            "userID": 25,
            "destinationID": 15,
            "travelers": 4,
            "date": "2019/12/01",
            "duration": 10,
            "status": "approved",
            "suggestedActivities": []
            },
            {
            "id": 26,
            "userID": 25,
            "destinationID": 15,
            "travelers": 3,
            "date": "2019/12/10",
            "duration": 9,
            "status": "approved",
            "suggestedActivities": []
            }])
    })

    it('should find a users approved trips', () => {
        const user25ApprovedTrips = tripsData.findApprovedTrips(25)

        expect(user25ApprovedTrips).to.deep.equal([{
            "id": 159,
            "userID": 25,
            "destinationID": 42,
            "travelers": 6,
            "date": "2020/07/24",
            "duration": 17,
            "status": "approved",
            "suggestedActivities": []
            },
            {
            "id": 189,
            "userID": 25,
            "destinationID": 15,
            "travelers": 4,
            "date": "2019/12/01",
            "duration": 10,
            "status": "approved",
            "suggestedActivities": []
            },
            {
            "id": 26,
            "userID": 25,
            "destinationID": 15,
            "travelers": 3,
            "date": "2019/12/10",
            "duration": 9,
            "status": "approved",
            "suggestedActivities": []
            }]);
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

    
});

