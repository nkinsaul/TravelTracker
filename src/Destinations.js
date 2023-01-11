class Destination {
    constructor(destinationData, destinationId) {
        this.oneDestination = this.findADestination(destinationData, destinationId)
        this.id = destinationId
        this.location = this.oneDestination.destination
        this.estimatedLodgingCostPerDay = this.oneDestination.estimatedLodgingCostPerDay
        this.estimatedFlightCostPerPerson = this.oneDestination.estimatedFlightCostPerPerson
        this.image = this.oneDestination.image
        this.alt = this.oneDestination.alt
    }
    findADestination(destinationData, destinationId) {
        return destinationData.find(destination => {
            return destination.id === destinationId
        })
    }
}

export default Destination