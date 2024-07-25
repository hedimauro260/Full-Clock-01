
//variaveis relógio analogico
const analogHour = document.querySelector(".hour_analog");
const analogMin = document.querySelector(".min_analog");
const analogSecond = document.querySelector(".second_analog");

//variaveis relogio digital
const digitalHour = document.querySelector(".hour_digital");
const digitalMin = document.querySelector(".min_digital");
const digitalSecond = document.querySelector(".second_digital");

//variaveis da data
const weekDay = document.querySelector(".day_week");
const day = document.querySelector(".day");
const month = document.querySelector(".month");
const year = document.querySelector(".year");

function setTime() {
    //Relogio Analogico
    let now = new Date()

    let hourHand = (360 / 12) * now.getHours();
    let minHand = (360 / 60) * now.getMinutes();
    let secondHand = (360 / 60) * now.getSeconds();
    
    analogHour.style.transform = `rotate(${hourHand}deg)`;
    analogMin.style.transform = `rotate(${minHand}deg)`;
    analogSecond.style.transform = `rotate(${secondHand}deg)`;

    //Relogio Digital
    let hr = now.getHours();
    let min = now.getMinutes();
    let sec = now.getSeconds();

    if (hr < 10) hr = "0" + hr;
    if (min < 10) min = "0" + min;
    if (sec < 10) sec = "0" + sec;

    digitalHour.textContent = hr;
    digitalMin.textContent = min;
    digitalSecond.textContent = sec;

    //Date
    let dateWeekDay = now.getDay();
    let daysWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thirsday', 'Friday', 'Saturday'];
    let nameWeekDay = daysWeek[dateWeekDay];

    let dateDay = now.getDate(); 

    let dateMonth = now.getMonth();
    let months = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
    let numberMonth = months[dateMonth];

    let dateYear = now.getFullYear();

    weekDay.textContent = nameWeekDay;
    day.textContent = dateDay;
    month.textContent = numberMonth;
    year.textContent = dateYear
}

setInterval(setTime, 1000);

//Local
const nameCity = document.querySelector(".local")

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;

        var apiKey = '681e2b4e4f584f358f5ffbf525c3128b';
        var geocodingUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;

        fetch(geocodingUrl)
            .then(response => response.json())
            .then(data => {
                if (data.results.length > 0) {
                    var city = data.results[0].components.city;
                    var country = data.results[0].components.country;
                    nameCity.textContent = city + ', ' + country;
                } else {
                    nameCity.textContent = "Não Foi possivel obter localização";
                }
            })
    })
}
