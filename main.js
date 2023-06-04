// Variable Declarations
let tempContainer = document.querySelector(".temp div")
let temp = document.querySelector(".temp div p")
let tempValue = Number.parseInt(document.querySelector(".temp div p").getInnerHTML())
let tempScale = document.querySelector(".temp div p:last-child")
let loc = document.querySelector(".temp p:last-child")
let windSpeedContainer = document.querySelector(".other-contents div:last-child div div")
let windSpeed = document.querySelector(".other-contents div:last-child div div p")
let windSpeedValue = Number.parseInt(document.querySelector(".other-contents div:last-child div div p").getInnerHTML())
let windSpeedScale = document.querySelector(".other-contents div:last-child div div p:last-child")

const tempConversion = () => {
    const tempF = (1.8*tempValue) + 32
    const tempK = tempValue + 273
    if(tempScale.innerHTML.includes("C")){
        temp.innerHTML = tempF
        tempScale.innerHTML = "F"
    } else if(tempScale.innerHTML == "F"){
        temp.innerHTML = tempK
        tempScale.innerHTML = "K"
    } else{
        temp.innerHTML = tempValue
        tempScale.innerHTML = "°C"
    }
}

const windSpeedConversion = () => {
    const windSpeedmPs = Math.round((windSpeedValue * 1000) / 3600)
    if(windSpeedScale.innerHTML == "Km/hr"){
        windSpeed.innerHTML = windSpeedmPs
        windSpeedScale.innerHTML = "m/s"
    } else{
        windSpeed.innerHTML = windSpeedValue
        windSpeedScale.innerHTML = "Km/hr"
    }
}

tempContainer.addEventListener("click", () => {
    tempConversion()
})

windSpeedContainer.addEventListener("click", () => {
    windSpeedConversion()
})