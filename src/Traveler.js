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
}

export default Traveler