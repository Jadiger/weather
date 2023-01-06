const changeWeather = document.querySelector('.change_weather'),
      city = document.querySelector('#city'),
      weatherList = document.querySelector('.weather_list'),
      loader = document.querySelector('.loader')

function reload(item) {
    if (item) {
        loader.classList.remove('l-hidden')
    } else {
        loader.classList.add('l-hidden')
    }
}
reload(true)
const getData = (city=> {
    const KEY = '3a0862c4c18e9744a737abb33c15e5e9'
    const base = 'https://api.openweathermap.org/data/2.5/weather'
    const query = `?q=${city}&units=metric&APPID=${KEY}`
    reload(true)
    fetch(base + query)
    .then((data)=> {
        reload(false)
        return data.json()
    }).then((data)=> {
        console.log(data)
        weatherList.innerHTML = `
        <div class="w_title">${data.name}</div>
                <div class="w_icon">
                    <img src="http://openweathermap.org/img/wn/04n@2x.png" alt="">
                </div>
                <div class="w_about">
                    <div class="w_content">
                        <div class="temp">${Math.round(data.main.temp)} °C</div>
                    <div class="main">${data.weather[0].main}</div>
                    <div class="min_max">
                        <div class="temp_min">Min ${Math.round(data.main.temp_min)} °C </div>
                        <div class="temp_max">Max ${Math.round(data.main.temp)} °C </div>
                    </div>
                    </div>
                </div>`
                changeWeather.reset()
    }
    ).catch(err=> {
        weatherList.innerHTML= `
        <div class="red_error"> Qala ati qa'te kiritilgen qaytadan urinip korin !!! </div>
        `
        reload(false)
    })
})
getData('Nukus')
changeWeather.addEventListener('submit',e=> {
    e.preventDefault()
    const cityName = city.value
    getData(cityName)
    
})

