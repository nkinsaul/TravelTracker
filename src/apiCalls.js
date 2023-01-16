import { pleaseTryAgainError } from "./scripts"

const fetchData = (urlPath) => {
    return fetch(`http://localhost:3001/api/v1/${urlPath}`)
            .then(response => {
                if(response.ok) {
                    return response.json()
                }
                response.json()
                .then(data => console.log(data))
                throw new Error(data)
            })    
            .catch((error) => {
                console.log(error)
            }) 
}

const addTripData = (id, userID, destinationID, travelers, date, duration) => {
    return fetch('http://localhost:3001/api/v1/trips', {
        method: "POST",
        body: JSON.stringify({
            id: id,
            userID: userID,
            destinationID: destinationID,
            travelers: travelers,
            date: date,
            duration: duration,
            status: 'pending',
            suggestedActivities: []
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        console.log('response:', response)
        if(response.ok) {
            return response.json()
        } 
        response.json()
        .then(data => console.log(data))
        pleaseTryAgainError()
        throw new Error(data)
    })
    .catch((error) => {
        console.log(error)
    })
}

export {fetchData};
export {addTripData}



//  .then(response => response.json())
// .then(data => console.log(data))