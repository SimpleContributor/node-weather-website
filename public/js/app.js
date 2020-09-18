console.log('Client side JavaScript loaded');



const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const messageThree = document.querySelector('#message-3');
const messageFour = document.querySelector('#message-4');


weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const location = search.value;

    messageOne.textContent = 'LOADING...';
    messageTwo.textContent = '';

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                console.log('Error, no data...' + data.error);
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = "The current temperature is: " + data.weatherData.Temp;
                messageThree.textContent = "The forecast for today is: " + data.weatherData.Weather;
                messageFour.textContent = "It feel like " + data.weatherData.FeelsLike + " degrees outside.";
            }
        })
    });
})
