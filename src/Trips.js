import Destination from "./Destinations";
import dayjs from "dayjs";
import trips from "./data/mock-Trips-data";

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
        const sortedTrips = allTrips.sort((a, b) => {
            return b.date - a.date
        })
        sortedTrips.forEach(trip => {
            trip.date =  dayjs(trip.date).format('YYYY/MM/DD')
        })
        return sortedTrips
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
    findTripsFromThisYear() {
        return this.usersTrips.filter(trip => {
            return dayjs().year() === parseInt(trip.date.slice(0, 4))
        })
    }
    calculateTripCost(tripId, destinationData) {
        const trip = this.findSingleTrip(tripId)
        const destination = this.findTripDestination(destinationData, trip.destinationID)
        const tripTotal = (destination.estimatedLodgingCostPerDay * trip.duration) + (destination.estimatedFlightCostPerPerson * trip.travelers)
        const agentFee = tripTotal * .10
        return tripTotal + agentFee
    }
    findTotalTripsCost(destinationData) {
        const thisYearsTrips = this.findTripsFromThisYear()
        const tripDestinationIDS = thisYearsTrips.map(trip => {
            return trip.destinationID
        })
        const tripDestinations = tripDestinationIDS.map(id => {
            return new Destination(destinationData, id)
        })
        const calculateTripCost = thisYearsTrips.map((trip, index) => {
            const tripTotal = (trip.duration * tripDestinations[index].estimatedLodgingCostPerDay) + (trip.travelers * tripDestinations[index].estimatedFlightCostPerPerson)
            const agentFee = tripTotal * .10
            return tripTotal + agentFee
        })
        const sumTripTotals = calculateTripCost.reduce((sum, cost) => {
            sum += cost
            return sum
        },0)
        return sumTripTotals
    }

}

export default Trips