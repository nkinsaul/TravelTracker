import chai from 'chai';
const expect = chai.expect;
import Traveler from '../src/Traveler';
import sampleTravelerData from '../src/data/mock-Traveler-data'
import trips from '../src/data/mock-Trips-data';


describe ("Traveler", function () {
    let traveler1;

    beforeEach(function () {
        traveler1 = new Traveler(sampleTravelerData, 1)
    });

    it('should be a function', () => {
        expect(Traveler).to.be.a('function');
    });

    it('should be an instance of Traveler', () => {
        expect(traveler1).to.be.an.instanceOf(Traveler);
    });
    
    it('should return a single travelers info', () => {
        expect(traveler1.travelerData).to.deep.equal({
            "id": 1,
            "name": "Ham Leadbeater",
            "travelerType": "relaxer"
            });
    });

    it('should return a single users first name', () => {
        const traveler1FirstName = traveler1.getTravelersFirstName()
        expect(traveler1FirstName).to.equal('Ham')
    });

    it('should get a users trips', () => {
        const traveler25 = new Traveler(sampleTravelerData, 25)
        const traveler25Trips = traveler25.getTrips(trips)


        expect(traveler25Trips.usersTrips).to.deep.equal([{
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
})