
# Travel Tracker

## Table of Contents

  * [Abstract](#abstract)
  * [Set-Up Instructions](#set-up-instructions)
  * [Developers](#developers)
  * [Goals](#goals)
  * [Demonstration](#demonstration)
  * [Technologies Used](#technologies-used)
  * [Reflections](#reflections)
    + [Challenges](#challenges)
    + [Wins](#wins)
  * [Acknowledgements](#acknowledgements)
  
## Abstract
**Travel Tracker** is a web application that allows a user to view and sort trips they have taken and also allows them to book new trips.  After logging into their account, they can view their trips and see the following information:
- The location of their trip
- The duration of their trip
- The number of travelers of their trip
- An image representing their travel location

## Set-Up Instructions
1. Copy the following SSH link: `git@github.com:nkinsaul/TravelTracker.git`
2. After determining one's desired installation location, open one's command line interpreter and run the following text into one's command line interpreter: `git clone git@github.com:nkinsaul/TravelTracker.git`
3. Install NPM packages:
    1. Run `npm install` to install project dependencies.
    2. Run `npm install dayjs`
4. Run `npm start` to start running the local server
5. Clone down the local API server using this SSH link: `git@github.com:turingschool-examples/travel-tracker-api.git`
    1. run `npm install`
    2. run `npm start` to start running the API server
6. Enter `https://localhost:8080` in your web browser to view the web application.
    1. To stop the web application from running on one's local server, enter `CTRL + C` into one's command line interpreter.

## Developers
- [Natalie Kinsaul](https://github.com/nkinsaul)

## Goals
- Write clean and concise JS, with limited duplications 
- Use object and array prototype methods to perform data manipulation
- Create a dashboard that is easy to use and displays information in an accessible way for users
- Write code that follows SRP (Single Responsibility Principle).
- Use TDD to implement robust testing suites
- Make network requests to retrieve data using `.fetch()` and other methods
- Create a well implemented login page 

*More information can be found on [the official project specifications document](https://frontend.turing.edu/projects/travel-tracker.html).*

## Demonstration
The video below demonstrates a user interacting with the main Travel Tracker application interface. They look at previous, pending, and all trips and then book a new trip.

https://user-images.githubusercontent.com/67208858/212809945-ecba4439-ef12-40e8-a4ae-17a158d3054c.mp4

## Technologies Used
- Javascript (ES5, ES6)
- HTML
- CSS
- [Node.js](https://nodejs.org/en/)
- [Mocha](https://mochajs.org/)
- [Chai](https://www.chaijs.com/)
- dayjs

## Reflections
### Challenges
- It was difficult getting started on this project as it was entirely up to me to decide how to approach everything
- Getting the classes set up in a way that felt clean and concise was challenging. I am satisfied with where it ended up but I think there is still room for improvement.
- Implementing a login page for the first time was a little daunting and it took me a little while to figure out the logic but ended up not being too difficult once I got over the intial hump of trying to do something I'd never done before.
- I think my grasp of error handling could still use improvement.

### Wins
- I successfully completed the first 4 iterations laid out in the project spec and my app runs without error.
- I successfully implemented dayjs
- I am pretty happy with how the app looks.  It is simple yet effective.
- I was able to complete the project almost entirely on my own.  I got help looking at a couple of minor problems but otherwise was totally self sufficient.






