import chai from 'chai';
const expect = chai.expect;
import Traveler from '../src/Traveler';
import sampleTravelerData from '../src/data/mock-Traveler-data'

describe ("Traveler", function () {
    let travelerData;
    let traveler1;

    beforeEach(function () {
        travelerData = new Traveler(sampleTravelerData)
        traveler1 = travelerData.findSingleTraveler(1)
    });

    it('should be a function', () => {
        expect(Traveler).to.be.a('function');
    });

    it('should be an instance of Traveler', () => {
        expect(travelerData).to.be.an.instanceOf(Traveler);
    });
    
    it('should return a single travelers info', () => {
        expect(traveler1).to.deep.equal({
            "id": 1,
            "name": "Ham Leadbeater",
            "travelerType": "relaxer"
            })
    })

    it('should return a single users first name', () => {
        
    })

})