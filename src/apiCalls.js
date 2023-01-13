const fetchData = (urlPath) => {
    return fetch(`http://localhost:3001/api/v1/${urlPath}`)
            .then(response => response.json())
}

const addTripData = (id, userID, destinationID, travelers, date, duration, status) => {
    fetch('http://localhost:3001/api/v1/trips', {
        method: "POST",
        body: JSON.stringify({
            id: id,
            userID: userID,
            destinationID: destinationID,
            travelers: travelers,
            date: date,
            duration: duration,
            status: status,
            suggestedActivities: []
        }),
        headers: {
            "Content-Type" : "application/json"
        }
    })
    .then(response => {
        if(response.ok) {
            return response.json()
        } 
        throw new Error('Something went wrong')
    })
    .catch((error) => {
        console.log(error)
        throw new Error(error)
    })
}

export {fetchData};
export {addTripData}

