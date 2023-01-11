import chai from 'chai';
class Trips {
    constructor(tripData, userId) {
        this.allTrips = tripData
        this.usersTrips = this.getTripsForUser(userId)
    }
    getTripsForUser(userId) {
        return this.allTrips.filter(trip => {
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
}

export default Trips