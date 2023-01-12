import Destination from "./Destinations";

class Trips {
    constructor(tripData, userId) {
        this.usersTrips = this.getTripsForUser(tripData, userId)
    }
    getTripsForUser(tripData, userId) {
        return tripData.filter(trip => {
            return trip.userID === userId
        });
    }
    findApprovedTrips() {
        return this.usersTrips.filter(trip => {
            return trip.status === 'approved'
        });
    }
    findPendingTrips() {
        return this.usersTrips.filter(trip => {
            return trip.status === 'pending'
        });
    }
    findSingleTrip(tripId) {
        return this.usersTrips.find(trip => {
            return trip.id === tripId
        })
    }
    findTripDestination(destinationData, destinationId) {
        const destination = new Destination(destinationData, destinationId)
        return destination.oneDestination
    }
    calculateTripCost(tripId, destinationData) {
        const trip = this.findSingleTrip(tripId)
        const destination = this.findTripDestination(destinationData, trip.destinationID)
        const tripTotal = (destination.estimatedLodgingCostPerDay * trip.duration) + (destination.estimatedFlightCostPerPerson * trip.travelers)
        const agentFee = tripTotal * .10
        return tripTotal + agentFee
    }
}

export default Trips