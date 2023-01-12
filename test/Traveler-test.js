import chai from 'chai';
const expect = chai.expect;
import Traveler from '../src/Traveler';
import sampleTravelerData from '../src/data/mock-Traveler-data'


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

    
})