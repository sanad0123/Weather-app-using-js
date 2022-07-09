// Openweathermap API. Do not share it publicly.
const api = 'e8c99b777d1b9e29224c271020878c15'; //Replace with your API

const iconImg = document.getElementById('weather-icon');
const loc = document.querySelector('#location');
const tempC = document.querySelector('.c');
const tempF = document.querySelector('.f');
const desc = document.querySelector('.desc');
const sunriseDOM = document.querySelector('.sunrise');
const sunsetDOM = document.querySelector('.sunset');
const con = document.querySelector('.country');
const hum = document.querySelector('.humidity-data');
const date = document.querySelector('.date');
const time = document.querySelector('.time');
const regionNames = new Intl.DisplayNames(
    ['en'], {type: 'region'}
  );
var today = new Date();
function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }
  const weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];

  var currentTime = formatAMPM(new Date);
  var currentDate = weekdays[today.getDay()] +', '+ monthNames[today.getMonth()] + ' ' + today.getDate() + ', ' + today.getFullYear();

  


window.addEventListener('load', () => {
  let long;
  let lat;
  // Accesing Geolocation of User
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      // Storing Longitude and Latitude in variables
      long = position.coords.longitude;
      lat = position.coords.latitude;
      const base = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api}&units=metric`;

      // Using fetch to get data
      fetch(base)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
            console.log(data);
          const { humidity, temp } = data.main;
          const place = data.name;
          const { description, icon } = data.weather[0];
          const { country, sunrise, sunset } = data.sys;
          

           const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
          const fahrenheit = (temp * 9) / 5 + 32;

          // Converting Epoch(Unix) time to GMT
          const sunriseGMT = new Date(sunrise * 1000);
          const sunsetGMT = new Date(sunset * 1000);
          console.log(sunriseGMT.toLocaleTimeString());
          console.log(currentDate);
          console.log(currentTime);

          // Interacting with DOM to show data
           iconImg.src = iconUrl;
          time.textContent = `${currentTime}`;
          date.textContent = `${currentDate}`;
          loc.textContent = `${place}`;
          con.textContent = `${regionNames.of(country)}`;
          hum.textContent = `${humidity}`;
          desc.textContent = `${description}`;
          tempC.textContent = `${temp.toFixed(2)} °C`;
          tempF.textContent = `${fahrenheit.toFixed(2)} °F`;
          sunriseDOM.textContent = `${sunriseGMT.toLocaleTimeString()}`;
          sunsetDOM.textContent = `${sunsetGMT.toLocaleTimeString()}`;
        });
    });
  }
});