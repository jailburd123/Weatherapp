document.querySelector('#searchButton').addEventListener('click', function() {
    let getValue = document.querySelector("#search").value;
    weatherData(getValue);
});


let weatherData = (value) => {
    let weatherurl = `https://api.openweathermap.org/data/2.5/weather?q=${value}&APPID=fe2e25be076abfb7b948ebb4743d71d2`;
    fetch(weatherurl)
    .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            return Promise.reject(response);
        }
    }).then((data) => {
        
        //log what comes back 
        // console.log(data);

        //variables 
        let country = data.sys.country;
        let cityName = data.name;
        let humidity = data.main['humidity'];
        let temp = data.main['temp'];
        let weatherdesc = data.weather[0].description;
        let windSpeed = Math.round(data.wind['speed']);
        let windDirection = data.wind['deg'];
        let direction = cardinalDirection(windDirection);
        let tempChange = Math.round(convertToFahrenheit(temp));

       

        // log our varaiables
        console.log("humidity: ", humidity);
        console.log("city Name: ", cityName);
        console.log("country: ", country);
        console.log("temp: ", temp);
        console.log("description: ", weatherdesc);
        console.log('Wind Speed: ', windSpeed);
        console.log('Wind direction: ', windDirection);            
        console.log('Converted Temp: ', tempChange);            
        console.log('Wind Direction: ', direction);

        changeBG(weatherdesc);
        resultingCard(data);
        
})
.catch((error) =>{
    console.error(error);
}).finally(() => {
console.log('Successfully completed!')
});

};


let changeBG = (data) => {
    console.log("Weather: ", data);
    if(data.includes('clouds')){
        document.body.style.backgroundImage = "url('https://www.budgetbytes.com/wp-content/uploads/2010/07/Classic-Homemade-Pizza-Dough-close-V3.jpg')";
        console.log('There was clouds');
    } else if(data.includes('rain')){
        console.log('There was rain');
    } else if(data.includes('clear')){
        console.log('There was clear');
    } else if(data.includes('snow')){
        console.log('There was snow');
    } else if(data.includes('mist')){
        console.log('There was mist');
    } else if(data.includes('thunderstorm')){
        console.log('There was thunderstorm');
    } else if(data.includes('drizzle')){
        console.log('There was drizzle');
    } else if(data.includes('fog')){
        console.log('There was fog');
    } else if(data.includes('haze')){
        console.log('There was haze');
    } else if(data.includes('smoke')){
        console.log('There was smoke');
    } else if(data.includes('sand')){
        console.log('There was sand');
    } else if(data.includes('dust')){
        console.log('There was dust');
    } else if(data.includes('ash')){
        console.log('There was ash');
    } else if(data.includes('squall')){
        console.log('There was squall');
    } else if(data.includes('tornado')){
        console.log('There was tornado');
    } else {
        console.log('There was nothing');
    }
}

let reset = () => {
    window.location.reload();   
}

let resultingCard = (data) => {
    let card = document.querySelector('#Results');
    card.innerHTML = `
    <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header">
                        <h3 id="nameOfLocation">${data.name}</h3>
                    </div>
                    <div class="card-body">
                    <h5 class="card-title">Weather Data</h5>
                    <p class="card-text" id="weatherResults">
                    <span>Description:${data.weather[0].description}</span>
                    </p>
                    <p class="card-text" id="weatherResults">
                    ${data.main['temp']}
                    </p>    
                    <p class="card-text" id="weatherResults">
                    ${data.main['humidity']}
                    ${data.wind['speed']}
                    ${data.wind['deg']}

                    </p>
                    </div>
                    <button type="button" class="btn btn-danger" onclick="reset();">Reset</button>
                </div>
            </div>
          </div>
    `;
}

let convertToFahrenheit = (data) => {
    let toF = ((data - 273.15) * 9/ 5) + 32;
    console.log("new temp: ", toF);    
    return toF;
    
}


let cardinalDirection = (data) => {
    var val = Math.floor((data / 22.5) + 0.5);
    var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
    let direction = arr[(val % 16)];
    return direction;

}
