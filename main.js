// $("document").ready(function () {
// Variable Declarations
let tempContainer = document.querySelector(".temp div");
let temp = document.querySelector(".temp div p");
let tempScale = document.querySelector(".temp div p:last-child");
let loc = document.querySelector(".temp div:last-child p");
let windSpeedContainer = document.querySelector(
	".other-contents div:last-child div div"
);
let windSpeed = document.querySelector(
	".other-contents div:last-child div div p"
);
let windSpeedScale = document.querySelector(
	".other-contents div:last-child div div p:last-child"
);
let humidity = document.querySelector(".other-contents div div p");
let form = document.getElementsByTagName("form")[0];
let formSearch = document.querySelector("form input");
let weatherIcon = document.getElementById("weather-icon");

form.addEventListener("submit", (e) => {
	e.preventDefault();
	console.log(e);
	// if(loc.innerHTML != ""){
	//     loc.innerHTML = formSearch.value
	// } else{
	//     loc.innerHTML = formSearch.value
	// }
	location.search = `location=${formSearch.value}`;
	loc.innerHTML = formSearch.value || location.search.slice(10);
	formSearch.value = "";
	console.log("Hello");
	// Fecthing Weather API
	const getWeatherData = async () => {
		let locValue = loc.getInnerHTML();
		const APIkey = "2828837120a8df72a7a5962d1eff34cd";
		await fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${locValue}&units=metric&appid=${APIkey}`
		)
			.then((response) => response.json())
			.then((data) => {
				// console.log(data)
				temp.innerHTML = data.main.temp;
				windSpeed.innerHTML = data.wind.speed;
				humidity.innerHTML = data.main.humidity;
				weatherIcon.innerHTML = data.weather.description;
			})
			.catch((e) => console.log(e));
	};
	getWeatherData();
	const tempConversion = () => {
		let tempValue =
			// Number.parseInt(temp.getInnerHTML())
			getWeatherData();
		const tempF = 1.8 * tempValue + 32;
		const tempK = tempValue + 273;
		if (tempScale.innerHTML.includes("C")) {
			temp.innerHTML = tempF;
			tempScale.innerHTML = "F";
		} else if (tempScale.innerHTML == "F") {
			temp.innerHTML = tempK;
			tempScale.innerHTML = "K";
		} else {
			temp.innerHTML = getWeatherData();
			tempScale.innerHTML = "°C";
		}
	};

	const windSpeedConversion = () => {
		let windSpeedValue =
			// Number.parseInt(windSpeed.getInnerHTML())
			getWeatherData();
		const windSpeedkmPhr = Math.round((windSpeedValue * 3600) / 1000);
		if (windSpeedScale.innerHTML == "m/s") {
			windSpeed.innerHTML = windSpeedkmPhr;
			windSpeedScale.innerHTML = "km/hr";
		} else {
			windSpeed.innerHTML = getWeatherData();
			windSpeedScale.innerHTML = "m/s";
		}
	};

	tempContainer.addEventListener("click", () => {
		tempConversion();
	});

	windSpeedContainer.addEventListener("click", () => {
		windSpeedConversion();
	});

	const weatherImages = {
		"Clear sky":
			'<img src="https://cdn-icons-png.flaticon.com/512/3222/3222800.png">',
		"light rain": '<i class="bi bi-cloud-drizzle-fill"></i>',
		"Few clouds": "path/to/few_clouds_image.jpg",
		"Scattered clouds": "path/to/scattered_clouds_image.jpg",
	};

	const imageUrl = weatherImages[getWeatherData()];

	weatherIcon.innerHTML = imageUrl;
});

// loc.innerHTML = formSearch.value
// localStorage.setItem("LocationStore", loc.innerHTML)
// });
