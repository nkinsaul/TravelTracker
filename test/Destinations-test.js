import chai from 'chai';
const expect = chai.expect;
import Destinations from '../src/Destinations';
import destinations from '../src/data/mock-Destinations-data';

describe('Destinations', function() {
    let allDestinations;

    beforeEach(function () {
        allDestinations = new Destinations(destinations)
    });

    it('should be a function', () => {
        expect(Destinations).to.be.a('function')
    });

    it('should be an instance of Destinations', () => {
        expect(allDestinations).to.be.an.instanceOf(Destinations)
    })
})
