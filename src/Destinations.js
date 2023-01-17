class Destination {
    constructor(destinationData, destinationId) {
        this.id = destinationId
        this.destination = this.findADestination(destinationData, destinationId).destination
        this.estimatedLodgingCostPerDay = this.findADestination(destinationData, destinationId).estimatedLodgingCostPerDay
        this.estimatedFlightCostPerPerson = this.findADestination(destinationData, destinationId).estimatedFlightCostPerPerson
        this.image = this.findADestination(destinationData, destinationId).image
        this.alt = this.findADestination(destinationData, destinationId).alt
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