const destinations = [
    {
    "id": 15,
    "destination": "Manila, Philippines",
    "estimatedLodgingCostPerDay": 40,
    "estimatedFlightCostPerPerson": 900,
    "image": "https://images.unsplash.com/photo-1555557356-51c5d7a8f4c2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
    "alt": "colorful buildings near the water with docked boats"
    },
    {
    "id": 16,
    "destination": "Bangkok, Thailand",
    "estimatedLodgingCostPerDay": 35,
    "estimatedFlightCostPerPerson": 988,
    "image": "https://images.unsplash.com/photo-1563492065599-3520f775eeed?ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80",
    "alt": "ornate buildings with a garden during the day"
    },
    {
    "id": 17,
    "destination": "Jaipur, India",
    "estimatedLodgingCostPerDay": 30,
    "estimatedFlightCostPerPerson": 1200,
    "image": "https://images.unsplash.com/photo-1534758607507-754e582adfa4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
    "alt": "a courtyard with trees and mountain in the distance"
    },
    {
    "id": 18,
    "destination": "Cape Town, South Africa",
    "estimatedLodgingCostPerDay": 120,
    "estimatedFlightCostPerPerson": 1200,
    "image": "https://images.unsplash.com/photo-1522576775862-7168ae29372c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1568&q=80",
    "alt": "a city with mountain cliffs by the sea"
    },
    {
    "id": 19,
    "destination": "Quito, Ecuador",
    "estimatedLodgingCostPerDay": 60,
    "estimatedFlightCostPerPerson": 500,
    "image": "https://images.unsplash.com/photo-1501684691657-cf3012635478?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80",
    "alt": "a city at night with cloudy, snowy mountains in the distance"
    },
    {
    "id": 20,
    "destination": "Miami, Florida",
    "estimatedLodgingCostPerDay": 158,
    "estimatedFlightCostPerPerson": 275,
    "image": "https://images.unsplash.com/photo-1514214246283-d427a95c5d2f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1573&q=80",
    "alt": "sand with palm trees and tall buildings in the background"
    },
    {
    "id": 21,
    "destination": "Tulum, Mexico",
    "estimatedLodgingCostPerDay": 100,
    "estimatedFlightCostPerPerson": 350,
    "image": "https://images.unsplash.com/photo-1501619593928-bef49688c888?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
    "alt": "a donkey standing on the beach"
    },
    {
    "id": 22,
    "destination": "Rome, Italy",
    "estimatedLodgingCostPerDay": 90,
    "estimatedFlightCostPerPerson": 650,
    "image": "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
    "alt": "people standing inside a colosseum during the day"
    },
    {
    "id": 23,
    "destination": "Copenhagen, Denmark",
    "estimatedLodgingCostPerDay": 120,
    "estimatedFlightCostPerPerson": 1000,
    "image": "https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
    "alt": "colorful buildings with holiday decorations by the water with tents and docked boats"
    },
    {
    "id": 24,
    "destination": "Vilnius, Lithuania",
    "estimatedLodgingCostPerDay": 65,
    "estimatedFlightCostPerPerson": 1100,
    "image": "https://images.unsplash.com/photo-1549891472-991e6bc75d1e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1952&q=80",
    "alt": "overhead view of a city with a hot air balloon"
    },
    {
    "id": 25,
    "destination": "New York, New York",
    "estimatedLodgingCostPerDay": 175,
    "estimatedFlightCostPerPerson": 200,
    "image": "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
    "alt": "people crossing the street during the day surrounded by tall buildings and advertisements"
    },
    {
    "id": 26,
    "destination": "London, England",
    "estimatedLodgingCostPerDay": 100,
    "estimatedFlightCostPerPerson": 1000,
    "image": "https://images.unsplash.com/photo-1549471156-52ee71691122?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
    "alt": "city with bridge under night sky"
    },
    {
    "id": 27,
    "destination": "San Francisco, California",
    "estimatedLodgingCostPerDay": 175,
    "estimatedFlightCostPerPerson": 200,
    "image": "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80",
    "alt": "golden gate bridge during the day time"
    },
    {
    "id": 28,
    "destination": "San Juan, Puerto Rico",
    "estimatedLodgingCostPerDay": 70,
    "estimatedFlightCostPerPerson": 900,
    "image": "https://images.unsplash.com/photo-1580237541049-2d715a09486e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2090&q=80",
    "alt": "white and brown concrete buildings near sea under white clouds during daytime"
    },
    {
    "id": 29,
    "destination": "Willemstad, Curaçao",
    "estimatedLodgingCostPerDay": 80,
    "estimatedFlightCostPerPerson": 1100,
    "image": "https://images.unsplash.com/photo-1541748603027-cbfefa3a6c8f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1952&q=80",
    "alt": "brightly colored buildings near body of water"
    },
    {
    "id": 30,
    "destination": "Antananarivo, Madagascar",
    "estimatedLodgingCostPerDay": 70,
    "estimatedFlightCostPerPerson": 1200,
    "image": "https://images.unsplash.com/photo-1563656353898-febc9270a0f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
    "alt": "landscape photo of a city skyline"
    },
    {
    "id": 42,
    "destination": "Santo Domingo, Dominican Republic",
    "estimatedLodgingCostPerDay": 400,
    "estimatedFlightCostPerPerson": 80,
    "image": "https://images.unsplash.com/photo-1510541383520-4daa77a666cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1782&q=80",
    "alt": "aerial view of houses and high rise building"
    }
]

export default destinations