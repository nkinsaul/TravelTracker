class Destination {
    constructor(destinationData, destinationId) {
        this.oneDestination = this.findADestination(destinationData, destinationId)
        this.id = destinationId
        this.destination = this.oneDestination.destination
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
    estimateTripCost(duration, travelers) {
        const tripCost = (this.estimatedLodgingCostPerDay * duration) + (this.estimatedFlightCostPerPerson * travelers)
        const agentFee = tripCost * .1
        return Math.round(tripCost + agentFee)
    }
}

export default Destination