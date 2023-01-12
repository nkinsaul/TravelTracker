import Trips from "./Trips";

class Traveler {
    constructor(travelerData, userId) {
        this.travelerData = this.findSingleTraveler(travelerData, userId)
    }
    findSingleTraveler(travelerData, userId) {
        return travelerData.find(traveler => {
            return traveler.id === userId
        });
    };
    getTravelersFirstName() {
        const name = this.travelerData.name.split(' ')
        return name[0]
    };
    getTrips(tripData) {
        return new Trips(tripData, this.travelerData.id)
    }
}

export default Traveler