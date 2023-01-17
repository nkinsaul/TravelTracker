import { pleaseTryAgainError } from "./scripts"
import { pleaseRefreshError } from "./scripts"

const fetchData = (urlPath) => {
    return fetch(`http://localhost:3001/api/v1/${urlPath}`)
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                response.json()
                .then(data => console.log(data))
                pleaseRefreshError()
                throw new Error(`Something went wrong, please refresh page`)
            })    
            .catch((error) => {
                console.log(error);
            }) 
}

const addTripData = (id, userID, destinationID, travelers, date, duration) => {
    return fetch('http://localhost:3001/api/v1/trips', {
        method: "POST",
        body: JSON.stringify({
            id,
            userID,
            destinationID,
            travelers,
            date,
            duration,
            status: 'pending',
            suggestedActivities: []
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => {
        console.log('response:', response)
        if (response.ok) {
            return response.json()
        } 
        response.json()
        .then(data => console.log(data))
        pleaseTryAgainError()
        throw new Error(`Something went wrong, please try again`)
    })
    .catch((error) => {
        console.log(error);
    })
}

export {fetchData};
export {addTripData}
