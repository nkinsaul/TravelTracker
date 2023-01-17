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
    findPendingTrips() {
        return this.usersTrips.filter(trip => {
            return trip.status === 'pending'
        });
    }
    findTripsFromThisYear() {
        return this.usersTrips.filter(trip => {
            return dayjs().year() === parseInt(trip.date.slice(0, 4))
        })
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
        return Math.round(sumTripTotals)
    }
    findPastTrips () {
        const today = new Date()
        const convertDates = this.usersTrips.filter(trip => {
            trip.date = new Date(trip.date)
            return trip.date < today
        })
        convertDates.forEach(trip => {
            trip.date =  dayjs(trip.date).format('YYYY/MM/DD')
        })
        return convertDates
    }
    findDestinations (trips, destinations) {
        return trips.reduce((arr, trip) => {
            arr.push(new Destination(destinations, trip.destinationID))
            return arr
        },[]);
    }
}

export default Trips