import Destination from "./Destinations";

class Trips {
    constructor(tripData, userId) {
        this.usersTrips = this.getTripsForUser(tripData, userId)
    }
    getTripsForUser(tripData, userId) {
        const allTrips = tripData.filter(trip => {
            return trip.userID === userId
        });
        const convertDate = allTrips.forEach(trip => {
            trip.date = Date.parse(trip.date)
        })
        return allTrips.sort((b, a) => {
            return a.date - b.date
        })
    }
    
    //Above method will return trips in order from most recent trip to oldest trip.  Number representing the date will need to be parsed back into a more readable date format to be displayed

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
    findTotalTripsCost(destinationData) {
        const tripDestinationIDS = this.usersTrips.map(trip => {
            return trip.destinationID
        })
        const tripDestinations = tripDestinationIDS.map(id => {
            return new Destination(destinationData, id)
        })
        const calculateTripCost = this.usersTrips.map((trip, index) => {
            return (trip.duration * tripDestinations[index].estimatedLodgingCostPerDay) + (trip.travelers * tripDestinations[index].estimatedFlightCostPerPerson)
        })
        const sumTripTotals = calculateTripCost.reduce((sum, cost) => {
            sum += cost
            return sum
        },0)
        console.log('calculate trip cost:', calculateTripCost)
        console.log('users trips:', this.usersTrips)
        console.log('trip destinations:', tripDestinations)
        return sumTripTotals
    }
}

export default Trips