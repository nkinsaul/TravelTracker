import chai from 'chai';
class Trips {
    constructor(tripData) {
        this.allTrips = tripData
    }
    getTripsForUser(userId) {
        return this.allTrips.filter(trip => {
            return trip.userID === userId
        })
    }
    findApprovedTrips(userId) {
        const usersTrips = this.getTripsForUser(userId)
        return usersTrips.filter(trip => {
            return trip.status === 'approved'
        })
    }
    findPendingTrips(userId) {
        const usersTrips = this.getTripsForUser(userId)
        return usersTrips.filter(trip => {
            return trip.status === 'pending'
        });
    }
}

export default Trips