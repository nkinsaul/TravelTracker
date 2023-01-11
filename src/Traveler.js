class Traveler {
    constructor(travelerData) {
        this.travelerData = travelerData
    }
    findSingleTraveler(userId) {
        return this.travelerData.find(traveler => {
            return traveler.id === userId
        })
    }
    getTravelersFirstName(userId) {
        const traveler = this.findSingleTraveler(userId)
        const name = traveler.name.split('')
        return name[0]
    }
}

export default Traveler