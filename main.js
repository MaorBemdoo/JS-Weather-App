// Variable Declarations
let tempContainer = document.querySelector(".temp div")
let temp = document.querySelector(".temp div p")
let tempScale = document.querySelector(".temp div p:last-child")
let loc = document.querySelector(".temp div:last-child p")
let windSpeedContainer = document.querySelector(".other-contents div:last-child div div")
let windSpeed = document.querySelector(".other-contents div:last-child div div p")
let windSpeedScale = document.querySelector(".other-contents div:last-child div div p:last-child")
let humidity = document.querySelector(".other-contents div div p")
let form = document.getElementsByTagName("form")[0]
let formSearch = document.querySelector("form input")

form.addEventListener("submit", (e) => {
    e.preventDefault()
    // if(loc.innerHTML != ""){
    //     loc.innerHTML = formSearch.value
    // } else{
    //     loc.innerHTML = formSearch.value
    // }
    loc.innerHTML = formSearch.value
    formSearch.value = ""
    // Fecthing Weather API
    const getWeatherData = async () => {
        let locValue = loc.getInnerHTML()
        const APIkey = "2828837120a8df72a7a5962d1eff34cd"
        const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=' + locValue + '&units=metric&appid=2828837120a8df72a7a5962d1eff34cd')
        const jsonWeatherData = await response.json()
        // console.log(jsonWeatherData)
        temp.innerHTML = jsonWeatherData.main.temp
        windSpeed.innerHTML = jsonWeatherData.wind.speed
        humidity.innerHTML = jsonWeatherData.main.humidity
        return jsonWeatherData
    }
    getWeatherData()

    const tempConversion = () => {
        let tempValue = Number.parseInt(temp.getInnerHTML())
        const tempF = (1.8*tempValue) + 32
        const tempK = tempValue + 273
        if(tempScale.innerHTML.includes("C")){
            temp.innerHTML = tempF
            tempScale.innerHTML = "F"
        } else if(tempScale.innerHTML == "F"){
            temp.innerHTML = tempK
            tempScale.innerHTML = "K"
        } else{
            temp.innerHTML = getWeatherData()
            tempScale.innerHTML = "°C"
        }
    }

    const windSpeedConversion = () => {
        let windSpeedValue = Number.parseInt(windSpeed.getInnerHTML())
        const windSpeedkmPhr = Math.round((windSpeedValue * 3600) / 1000)
        if(windSpeedScale.innerHTML == "m/s"){
            windSpeed.innerHTML = windSpeedkmPhr
            windSpeedScale.innerHTML = "km/hr"
        } else{
            windSpeed.innerHTML = getWeatherData()
            windSpeedScale.innerHTML = "m/s"
        }
    }

    tempContainer.addEventListener("click", () => {
        tempConversion()
    })

    windSpeedContainer.addEventListener("click", () => {
        windSpeedConversion()
    })
})

// loc.innerHTML = formSearch.value
// localStorage.setItem("LocationStore", loc.innerHTML)

