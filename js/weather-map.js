"use strict";

// Requires a js/keys.js file with the API key for Mapbox (MAPBOX_API_KEY) and openweathermap (OPEN_WEATHER_APPID) to function


(function () {

const startPosition = [-98.48813, 29.42369]
	let results = [-98.48813, 29.42369]
//Sets up basic map and styling
mapboxgl.accessToken = MAPBOX_API_KEY;
const map = new mapboxgl.Map({
	container: 'map', // container ID
	style: 'mapbox://styles/shroud2/cl3m9j9z4002z14qqu70q5tn5',
	center: startPosition, // starting position [lng, lat]
	zoom: 10 // starting zoom
})
let marker = new mapboxgl.Marker({
	draggable: true
})
	.setLngLat(startPosition)
	.addTo(map);

// function onDragEnd() {
// 	const lngLat = marker.getLngLat();
// 	let coordinates = document.querySelector("#coordinates")
// 	 coordinates.innerHTML = `Longitude: ${lngLat.lng}<br />Latitude: ${lngLat.lat}`;
// }
//
// marker.on('dragend', onDragEnd);

//add zoom control to map
map.addControl(new mapboxgl.NavigationControl());

fetch('https://api.openweathermap.org/data/2.5/onecall?lat=29.42369&lon=-98.48813&appid=' + OPEN_WEATHER_APPID + '&units=imperial')
	.then(response => response.json())
	.then(data => {
		document.querySelector('#current-icon').innerHTML = `<img src="http://openweathermap.org/img/wn/${data['current']['weather']['0'].icon}@4x.png" className="img-fluid rounded-start "alt="..."> ${data['current']['weather']['0'].description}`
		document.querySelector('#current-temp').innerHTML = Math.round(data["current"].temp) + '&#176' //current temp
		document.querySelector('#feels-like').innerHTML =Math.round(data["current"].feels_like) + '&#176' //feels like temp
		document.querySelector('#hi-low').innerHTML =Math.round(data["daily"]["0"]["temp"].max) + '&#176' + '/' + Math.round(data["daily"]["0"]["temp"].min) + '&#176' //high temp today
		let d1 = data["daily"]["0"].dt * 1000;
		let d2 = data["daily"]["1"].dt * 1000;
		let d3 = data["daily"]["2"].dt * 1000;
		let d4 = data["daily"]["3"].dt * 1000;
		let d5 = data["daily"]["4"].dt * 1000;
		document.querySelector("#date1") .innerHTML = new Date(d1).toLocaleDateString("en-US", { dateStyle: 'full' }).slice(0, -6);
		document.querySelector("#date2") .innerHTML = new Date(d2).toLocaleDateString("en-US", { dateStyle: 'full' }).slice(0, -6);
		document.querySelector("#date3") .innerHTML = new Date(d3).toLocaleDateString("en-US", { dateStyle: 'full' }).slice(0, -6);
		document.querySelector("#date4") .innerHTML = new Date(d4).toLocaleDateString("en-US", { dateStyle: 'full' }).slice(0, -6);
		document.querySelector("#date5") .innerHTML = new Date(d5).toLocaleDateString("en-US", { dateStyle: 'full' }).slice(0, -6);
		document.querySelector('#day1-icon').innerHTML = `<img src="http://openweathermap.org/img/wn/${data['daily']['0']['weather']['0'].icon}@4x.png" class="card-img-top mx-auto" alt="..."><br>${data['daily']['0']['weather']['0'].description}`
		document.querySelector('#day2-icon').innerHTML = `<img src="http://openweathermap.org/img/wn/${data['daily']['1']['weather']['0'].icon}@4x.png" class="card-img-top mx-auto" alt="..."><br>${data['daily']['1']['weather']['0'].description}`
		document.querySelector('#day3-icon').innerHTML = `<img src="http://openweathermap.org/img/wn/${data['daily']['2']['weather']['0'].icon}@4x.png" class="card-img-top mx-auto" alt="..."><br>${data['daily']['2']['weather']['0'].description}`
		document.querySelector('#day4-icon').innerHTML = `<img src="http://openweathermap.org/img/wn/${data['daily']['3']['weather']['0'].icon}@4x.png" class="card-img-top mx-auto" alt="..."><br>${data['daily']['3']['weather']['0'].description}`
		document.querySelector('#day5-icon').innerHTML = `<img src="http://openweathermap.org/img/wn/${data['daily']['4']['weather']['0'].icon}@4x.png" class="card-img-top mx-auto" alt="..."><br>${data['daily']['4']['weather']['0'].description}`
		document.querySelector('#d1HiLo').innerHTML =Math.round(data["daily"]["0"]["temp"].max) + '&#176' + '/' + Math.round(data["daily"]["0"]["temp"].min) + '&#176'
		document.querySelector('#d1Precip').innerHTML = Math.round((data["daily"]["0"].pop * 100)) + '%'

		document.querySelector('#d2HiLo').innerHTML =Math.round(data["daily"]["1"]["temp"].max) + '&#176' + '/' + Math.round(data["daily"]["0"]["temp"].min) + '&#176'
		document.querySelector('#d2Precip').innerHTML = Math.round((data["daily"]["1"].pop * 100)) + '%'
		//console.log(data["daily"]["1"].pop);

		document.querySelector('#d3HiLo').innerHTML =Math.round(data["daily"]["2"]["temp"].max) + '&#176' + '/' + Math.round(data["daily"]["0"]["temp"].min) + '&#176'
		document.querySelector('#d3Precip').innerHTML = Math.round((data["daily"]["2"].pop * 100)) + '%'

		document.querySelector('#d4HiLo').innerHTML =Math.round(data["daily"]["3"]["temp"].max) + '&#176' + '/' + Math.round(data["daily"]["0"]["temp"].min) + '&#176'
		document.querySelector('#d4Precip').innerHTML = Math.round((data["daily"]["3"].pop * 100)) + '%'

		document.querySelector('#d5HiLo').innerHTML =Math.round(data["daily"]["4"]["temp"].max) + '&#176' + '/' + Math.round(data["daily"]["0"]["temp"].min) + '&#176'
		document.querySelector('#d5Precip').innerHTML = Math.round((data["daily"]["4"].pop * 100)) + '%'

	})



	//some date code
	// const d = new Date();
	// //let text = d.toLocaleDateString();
	// let text = new Date().toLocaleDateString("en-US", { dateStyle: 'full' });
	// document.getElementById("demo").innerHTML = text;



//click events to only show the map on the desired pages
document.querySelector("#pills-home-tab").addEventListener("click", showMap);
document.querySelector("#pills-5day-tab").addEventListener("click", showMap);
document.querySelector("#pills-contact-tab").addEventListener("click", hideMap);

//hide map function
function hideMap() {
	document.querySelector("#map").style.display = "none";
}
//show map function
function showMap() {
	document.querySelector("#map").style.display = "block";
}

//searchbox function
let button = document.querySelector('#submit');
let input = document.querySelector('#search');
button.addEventListener('click', function(name){
	geocode(input.value, MAPBOX_API_KEY).then(function(results) {
			console.log(results)
		let lat = results[1]
		let lon = results[0]
		map.flyTo({
			center: results,
			zoom: 10,
			essential: true
		})
		marker.setLngLat(results);
		let state = input.value.slice(-2,);
		let city = input.value.slice(0, -4);
		let cityCaps = city.charAt(0).toUpperCase() + city.slice(1);
		let stateCaps = state.toUpperCase();
		let locationName = cityCaps + ", " + stateCaps;
		document.querySelector('#h2Location').innerHTML = locationName;
		fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}` + '&appid=' + OPEN_WEATHER_APPID + '&units=imperial')
			.then(response => response.json())
			.then(data => {
				console.log(data)
				document.querySelector('#current-icon').innerHTML = `<img src="http://openweathermap.org/img/wn/${data['current']["weather"]['0'].icon}@4x.png" className="img-fluid rounded-start "alt="...">`
				document.querySelector('#current-temp').innerHTML = Math.round(data["current"].temp) //current temp
				document.querySelector('#feels-like').innerHTML =Math.round(data["current"].feels_like) //feels like temp
				document.querySelector('#hi-low').innerHTML =Math.round(data["daily"]["0"]["temp"].max) + '/' + Math.round(data["daily"]["0"]["temp"].min) //high temp today
				let d1 = data["daily"]["0"].dt * 1000;
				let d2 = data["daily"]["1"].dt * 1000;
				let d3 = data["daily"]["2"].dt * 1000;
				let d4 = data["daily"]["3"].dt * 1000;
				let d5 = data["daily"]["4"].dt * 1000;
				document.querySelector("#date1") .innerHTML = new Date(d1).toLocaleDateString("en-US", { dateStyle: 'full' }).slice(0, -6);
				document.querySelector("#date2") .innerHTML = new Date(d2).toLocaleDateString("en-US", { dateStyle: 'full' }).slice(0, -6);
				document.querySelector("#date3") .innerHTML = new Date(d3).toLocaleDateString("en-US", { dateStyle: 'full' }).slice(0, -6);
				document.querySelector("#date4") .innerHTML = new Date(d4).toLocaleDateString("en-US", { dateStyle: 'full' }).slice(0, -6);
				document.querySelector("#date5") .innerHTML = new Date(d5).toLocaleDateString("en-US", { dateStyle: 'full' }).slice(0, -6);
				document.querySelector('#day1-icon').innerHTML = `<img src="http://openweathermap.org/img/wn/${data['daily']['0']['weather']['0'].icon}@4x.png" class="card-img-top mx-auto" alt="..."><br>${data['daily']['0']['weather']['0'].description}`
				document.querySelector('#day2-icon').innerHTML = `<img src="http://openweathermap.org/img/wn/${data['daily']['1']['weather']['0'].icon}@4x.png" class="card-img-top mx-auto" alt="..."><br>${data['daily']['1']['weather']['0'].description}`
				document.querySelector('#day3-icon').innerHTML = `<img src="http://openweathermap.org/img/wn/${data['daily']['2']['weather']['0'].icon}@4x.png" class="card-img-top mx-auto" alt="..."><br>${data['daily']['2']['weather']['0'].description}`
				document.querySelector('#day4-icon').innerHTML = `<img src="http://openweathermap.org/img/wn/${data['daily']['3']['weather']['0'].icon}@4x.png" class="card-img-top mx-auto" alt="..."><br>${data['daily']['3']['weather']['0'].description}`
				document.querySelector('#day5-icon').innerHTML = `<img src="http://openweathermap.org/img/wn/${data['daily']['4']['weather']['0'].icon}@4x.png" class="card-img-top mx-auto" alt="..."><br>${data['daily']['4']['weather']['0'].description}`
				document.querySelector('#d1HiLo').innerHTML =Math.round(data["daily"]["0"]["temp"].max) + '&#176' + '/' + Math.round(data["daily"]["0"]["temp"].min) + '&#176'
				document.querySelector('#d1Precip').innerHTML = Math.round((data["daily"]["0"].pop * 100)) + '%'

				document.querySelector('#d2HiLo').innerHTML =Math.round(data["daily"]["1"]["temp"].max) + '&#176' + '/' + Math.round(data["daily"]["0"]["temp"].min) + '&#176'
				document.querySelector('#d2Precip').innerHTML = Math.round((data["daily"]["1"].pop * 100)) + '%'
				//console.log(data["daily"]["1"].pop);

				document.querySelector('#d3HiLo').innerHTML =Math.round(data["daily"]["2"]["temp"].max) + '&#176' + '/' + Math.round(data["daily"]["0"]["temp"].min) + '&#176'
				document.querySelector('#d3Precip').innerHTML = Math.round((data["daily"]["2"].pop * 100)) + '%'

				document.querySelector('#d4HiLo').innerHTML =Math.round(data["daily"]["3"]["temp"].max) + '&#176' + '/' + Math.round(data["daily"]["0"]["temp"].min) + '&#176'
				document.querySelector('#d4Precip').innerHTML = Math.round((data["daily"]["3"].pop * 100)) + '%'

				document.querySelector('#d5HiLo').innerHTML =Math.round(data["daily"]["4"]["temp"].max) + '&#176' + '/' + Math.round(data["daily"]["0"]["temp"].min) + '&#176'
				document.querySelector('#d5Precip').innerHTML = Math.round((data["daily"]["4"].pop * 100)) + '%'
			})
	})
 })
	// function onDragEnd() {
	// 	const lngLat = marker.getLngLat();
	// 	let coordinates = document.querySelector("#coordinates")
	// 	coordinates.innerHTML = `Longitude: ${lngLat.lng}<br />Latitude: ${lngLat.lat}`;
	// }
//new 2nd code


	marker.on('dragend', function(name){
		// reverseGeocode(lngLat, MAPBOX_API_KEY).then(function(results) {
		// 	console.log(results)
		const lngLat2 = marker.getLngLat();
		let results = lngLat2
		// console.log(results)
		// console.log(results.lng)
		let lat2 = results.lat
		let lon2 = results.lng
		 // console.log(lat2);
		 // console.log(lon2);
		let placeName = reverseGeocode({lat: lat2, lng: lon2}, MAPBOX_API_KEY)
			.then(data => {
				//console.log(data)
				let newPlace = data.split(",")[1]
				console.log(newPlace)
			map.flyTo({
				center: results,
				zoom: 10,
				essential: true
			})
			marker.setLngLat(results);
			let state = input.value.slice(-2,);
			let city = input.value.slice(0, -4);
			let cityCaps = city.charAt(0).toUpperCase() + city.slice(1);
			let stateCaps = state.toUpperCase();
			let locationName = cityCaps + ", " + stateCaps;
			document.querySelector('#h2Location').innerHTML = newPlace;
			fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat2}&lon=${lon2}` + '&appid=' + OPEN_WEATHER_APPID + '&units=imperial')
				.then(response => response.json())
				.then(data => {
					//console.log(data)
					document.querySelector('#current-icon').innerHTML = `<img src="http://openweathermap.org/img/wn/${data['current']["weather"]['0'].icon}@4x.png" className="img-fluid rounded-start "alt="...">`
					document.querySelector('#current-temp').innerHTML = Math.round(data["current"].temp) //current temp
					document.querySelector('#feels-like').innerHTML =Math.round(data["current"].feels_like) //feels like temp
					document.querySelector('#hi-low').innerHTML =Math.round(data["daily"]["0"]["temp"].max) + '/' + Math.round(data["daily"]["0"]["temp"].min) //high temp today
					let d1 = data["daily"]["0"].dt * 1000;
					let d2 = data["daily"]["1"].dt * 1000;
					let d3 = data["daily"]["2"].dt * 1000;
					let d4 = data["daily"]["3"].dt * 1000;
					let d5 = data["daily"]["4"].dt * 1000;
					document.querySelector("#date1") .innerHTML = new Date(d1).toLocaleDateString("en-US", { dateStyle: 'full' }).slice(0, -6);
					document.querySelector("#date2") .innerHTML = new Date(d2).toLocaleDateString("en-US", { dateStyle: 'full' }).slice(0, -6);
					document.querySelector("#date3") .innerHTML = new Date(d3).toLocaleDateString("en-US", { dateStyle: 'full' }).slice(0, -6);
					document.querySelector("#date4") .innerHTML = new Date(d4).toLocaleDateString("en-US", { dateStyle: 'full' }).slice(0, -6);
					document.querySelector("#date5") .innerHTML = new Date(d5).toLocaleDateString("en-US", { dateStyle: 'full' }).slice(0, -6);
					document.querySelector('#day1-icon').innerHTML = `<img src="http://openweathermap.org/img/wn/${data['daily']['0']['weather']['0'].icon}@4x.png" class="card-img-top mx-auto" alt="..."><br>${data['daily']['0']['weather']['0'].description}`
					document.querySelector('#day2-icon').innerHTML = `<img src="http://openweathermap.org/img/wn/${data['daily']['1']['weather']['0'].icon}@4x.png" class="card-img-top mx-auto" alt="..."><br>${data['daily']['1']['weather']['0'].description}`
					document.querySelector('#day3-icon').innerHTML = `<img src="http://openweathermap.org/img/wn/${data['daily']['2']['weather']['0'].icon}@4x.png" class="card-img-top mx-auto" alt="..."><br>${data['daily']['2']['weather']['0'].description}`
					document.querySelector('#day4-icon').innerHTML = `<img src="http://openweathermap.org/img/wn/${data['daily']['3']['weather']['0'].icon}@4x.png" class="card-img-top mx-auto" alt="..."><br>${data['daily']['3']['weather']['0'].description}`
					document.querySelector('#day5-icon').innerHTML = `<img src="http://openweathermap.org/img/wn/${data['daily']['4']['weather']['0'].icon}@4x.png" class="card-img-top mx-auto" alt="..."><br>${data['daily']['4']['weather']['0'].description}`
					document.querySelector('#d1HiLo').innerHTML =Math.round(data["daily"]["0"]["temp"].max) + '&#176' + '/' + Math.round(data["daily"]["0"]["temp"].min) + '&#176'
					document.querySelector('#d1Precip').innerHTML = Math.round((data["daily"]["0"].pop * 100)) + '%'

					document.querySelector('#d2HiLo').innerHTML =Math.round(data["daily"]["1"]["temp"].max) + '&#176' + '/' + Math.round(data["daily"]["0"]["temp"].min) + '&#176'
					document.querySelector('#d2Precip').innerHTML = Math.round((data["daily"]["1"].pop * 100)) + '%'
					//console.log(data["daily"]["1"].pop);

					document.querySelector('#d3HiLo').innerHTML =Math.round(data["daily"]["2"]["temp"].max) + '&#176' + '/' + Math.round(data["daily"]["0"]["temp"].min) + '&#176'
					document.querySelector('#d3Precip').innerHTML = Math.round((data["daily"]["2"].pop * 100)) + '%'

					document.querySelector('#d4HiLo').innerHTML =Math.round(data["daily"]["3"]["temp"].max) + '&#176' + '/' + Math.round(data["daily"]["0"]["temp"].min) + '&#176'
					document.querySelector('#d4Precip').innerHTML = Math.round((data["daily"]["3"].pop * 100)) + '%'

					document.querySelector('#d5HiLo').innerHTML =Math.round(data["daily"]["4"]["temp"].max) + '&#176' + '/' + Math.round(data["daily"]["0"]["temp"].min) + '&#176'
					document.querySelector('#d5Precip').innerHTML = Math.round((data["daily"]["4"].pop * 100)) + '%'
				})
		})
	})




}())



//Example code from lecture
// const URL = "https://api.openweathermap.org/data/2.5/onecall";
// $.get(URL, {
// 	APPID: OPEN_WEATHER_APPID,
// 	lat: 40.7485452,
// 	lon: -73.9879522,
// 	units: "imperial"
// }).done(function(results) {console.log(results)});
//
// geocode("Spring Branch, US", MAPBOX_API_KEY).then(function (data) {
// 	$.get(URL, {
// 		APPID: OPEN_WEATHER_APPID,
// 		lat: data[1],
// 		lon: data[0],
// 		units: "imperial"
// 	}).done(function (results) {
// 		console.log(results);
// 		console.log(data[1]);
// 	})
//});