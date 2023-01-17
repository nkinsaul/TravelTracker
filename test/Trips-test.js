import chai from 'chai';
const expect = chai.expect;
import Trips from '../src/Trips'
import trips from '../src/data/mock-Trips-data'
import destinations from '../src/data/mock-Destinations-data';

describe ("Trips", function() {
    let tripsData;
    let traveler25Trips;

    beforeEach(function () {
        tripsData = new Trips(trips, 25)
        traveler25Trips = tripsData.usersTrips
    });

    it("should be a function", () => {
        expect(Trips).to.be.a('function')
    });

    it('should be an instance of Trips', () => {
        expect(tripsData).to.be.an.instanceOf(Trips)
    })
    
    it('should get all trips for one user', () => {
        expect(traveler25Trips.length).to.equal(5)
    });

    it('should sort dates from latest to oldest', () => {
        expect(traveler25Trips).to.deep.equal([
            {
            "id": 190,
            "userID": 25,
            "destinationID": 28,
            "travelers": 3,
            "date": "2023/02/03",
            "duration": 9,
            "status": "approved",
            "suggestedActivities": []
            },
            {
              id: 138,
              userID: 25,
              destinationID: 22,
              travelers: 3,
              date: '2020/10/29',
              duration: 18,
              status: 'pending',
              suggestedActivities: []
            },
            {
              id: 159,
              userID: 25,
              destinationID: 42,
              travelers: 6,
              date: '2020/07/24',
              duration: 17,
              status: 'approved',
              suggestedActivities: []
            },
            {
              id: 26,
              userID: 25,
              destinationID: 15,
              travelers: 3,
              date: '2019/12/10',
              duration: 9,
              status: 'approved',
              suggestedActivities: []
            },
            {
              id: 189,
              userID: 25,
              destinationID: 15,
              travelers: 4,
              date: '2019/12/01',
              duration: 10,
              status: 'approved',
              suggestedActivities: []
            }
          ]
        )
    })

    it('should find pending trips for a user', () => {
        const user25PendingTrips = tripsData.findPendingTrips(25)
        expect(user25PendingTrips).to.deep.equal([{
            "id": 138,
            "userID": 25,
            "destinationID": 22,
            "travelers": 3,
            "date": "2020/10/29",
            "duration": 18,
            "status": "pending",
            "suggestedActivities": []
            }]);
    });

    it('should find trips from the current year', () => {
        const thisYearsTrips = tripsData.findTripsFromThisYear();
        expect(thisYearsTrips).to.deep.equal([{
            "id": 190,
            "userID": 25,
            "destinationID": 28,
            "travelers": 3,
            "date": "2023/02/03",
            "duration": 9,
            "status": "approved",
            "suggestedActivities": []
            }])
    })

    it('should calculate total trips cost for the current year', () => {
        const thisYearsTripCost = tripsData.findTotalTripsCost(destinations)

        expect(thisYearsTripCost).to.equal(3663);
    })

    it('should find past trips', () => {
        const pastTrips = tripsData.findPastTrips()

        expect(pastTrips).to.deep.equal([{
            id: 138,
            userID: 25,
            destinationID: 22,
            travelers: 3,
            date: '2020/10/29',
            duration: 18,
            status: 'pending',
            suggestedActivities: []
          },
          {
            id: 159,
            userID: 25,
            destinationID: 42,
            travelers: 6,
            date: '2020/07/24',
            duration: 17,
            status: 'approved',
            suggestedActivities: []
          },
          {
            id: 26,
            userID: 25,
            destinationID: 15,
            travelers: 3,
            date: '2019/12/10',
            duration: 9,
            status: 'approved',
            suggestedActivities: []
          },
          {
            id: 189,
            userID: 25,
            destinationID: 15,
            travelers: 4,
            date: '2019/12/01',
            duration: 10,
            status: 'approved',
            suggestedActivities: []
          }])
    })

    it('should find trip destinations', function() {
      const allDestinations = tripsData.findDestinations(traveler25Trips, destinations);

      expect(allDestinations).to.deep.equal([{
        "id": 28,
        "destination": "San Juan, Puerto Rico",
        "estimatedLodgingCostPerDay": 70,
        "estimatedFlightCostPerPerson": 900,
        "image": "https://images.unsplash.com/photo-1580237541049-2d715a09486e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2090&q=80",
        "alt": "white and brown concrete buildings near sea under white clouds during daytime",
        },
        {
        "id": 22,
        "destination": "Rome, Italy",
        "estimatedLodgingCostPerDay": 90,
        "estimatedFlightCostPerPerson": 650,
        "image": "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        "alt": "people standing inside a colosseum during the day",
        },
        {
        "id": 42,
        "destination": "Santo Domingo, Dominican Republic",
        "estimatedLodgingCostPerDay": 400,
        "estimatedFlightCostPerPerson": 80,
        "image": "https://images.unsplash.com/photo-1510541383520-4daa77a666cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1782&q=80",
        "alt": "aerial view of houses and high rise building",
        },
        {
        "id": 15,
        "destination": "Manila, Philippines",
        "estimatedLodgingCostPerDay": 40,
        "estimatedFlightCostPerPerson": 900,
        "image": "https://images.unsplash.com/photo-1555557356-51c5d7a8f4c2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        "alt": "colorful buildings near the water with docked boats",
        },
        {
        "id": 15,
        "destination": "Manila, Philippines",
        "estimatedLodgingCostPerDay": 40,
        "estimatedFlightCostPerPerson": 900,
        "image": "https://images.unsplash.com/photo-1555557356-51c5d7a8f4c2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
        "alt": "colorful buildings near the water with docked boats",
        }
      ])
    });

    it('should find past trip destinations', function() {
      const pastTrips = tripsData.findPastTrips();
      const pastDestinations = tripsData.findDestinations(pastTrips, destinations);

      expect(pastDestinations).to.deep.equal([
        {
          "id": 22,
          "destination": "Rome, Italy",
          "estimatedLodgingCostPerDay": 90,
          "estimatedFlightCostPerPerson": 650,
          "image": "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
          "alt": "people standing inside a colosseum during the day",
          },
          {
          "id": 42,
          "destination": "Santo Domingo, Dominican Republic",
          "estimatedLodgingCostPerDay": 400,
          "estimatedFlightCostPerPerson": 80,
          "image": "https://images.unsplash.com/photo-1510541383520-4daa77a666cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1782&q=80",
          "alt": "aerial view of houses and high rise building",
          },
          {
          "id": 15,
          "destination": "Manila, Philippines",
          "estimatedLodgingCostPerDay": 40,
          "estimatedFlightCostPerPerson": 900,
          "image": "https://images.unsplash.com/photo-1555557356-51c5d7a8f4c2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
          "alt": "colorful buildings near the water with docked boats",
          },
          {
          "id": 15,
          "destination": "Manila, Philippines",
          "estimatedLodgingCostPerDay": 40,
          "estimatedFlightCostPerPerson": 900,
          "image": "https://images.unsplash.com/photo-1555557356-51c5d7a8f4c2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
          "alt": "colorful buildings near the water with docked boats",
          }
      ])
    })
});

