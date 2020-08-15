var api='https://api.openweathermap.org/data/2.5/forecast?q=';
var APPID='&APPID=645e787e7e6a99a1bfc06f2da15c3047';
var units='&units=imperial';

const selectedCity = document.querySelector(".city_location")
const place = document.querySelector(".city")
const form = document.querySelector("form");

var txt = "";
var savedCities = [];
var save_pos = 0;

function add_to_history(savedCities){
	var out = document.getElementById('item_history');
	out.innerHTML = " ";
	for(save_pos = 0; save_pos < savedCities.length; save_pos++){
		out.innerHTML += `<label class="text" onClick="selectHistory(${save_pos})">${savedCities[save_pos]}</label><br>`;
	}
}

function selectHistory(number){
	place.value = savedCities[number];
	place.focus();
	var evt = new CustomEvent('submit');
	form.dispatchEvent(evt);
}

if(localStorage.getItem("search_history")){
	var save = localStorage.getItem("search_history");
	savedCities = JSON.parse(save);
	add_to_history(savedCities);
	setTimeout(function(){ selectHistory(save_pos - 1); }, 0);
}

form.addEventListener("submit", e => {
	e.preventDefault();


	if(place.value){
                
		var url = api+place.value+APPID+units;
		txt = place.value;	
		txt = txt.toUpperCase();
		var url = api+txt+APPID+units;

		fetch(url)
		.then(response => {
			return response.json();
		})
		.then(data => {
		if(data.cod == '404'){
			selectedCity.textContent = "City not found!";
		}else{
			selectedCity.textContent = txt;

			var col = -1;
			for(var i = 0; i < save_pos; i++){	
				if(savedCities[i] == txt){
					col = i;
				}
			}

			if(col != -1){
				for(var i = col; i < save_pos; i++){
					savedCities[i] = savedCities[i + 1];
				}
				savedCities[save_pos - 1] = txt;
			}

			if(savedCities.length < 10){
				if(col == -1){
					savedCities[save_pos] = txt;
				}
			}else if(col == -1){
				for(save_pos = 0; save_pos < 9; save_pos++){
					savedCities[save_pos] = savedCities[save_pos + 1];
				}

				savedCities[save_pos] = txt;
			}

			add_to_history(savedCities);
			var temp = JSON.stringify(savedCities);
			localStorage.setItem("search_history", temp);

			for(var i = 0; i < 16; i++){
				var date = "";
				var date_par = [];

				date = data.list[i].dt_txt;
				date_par = date.split(" ");

				var date_out = [];
				date_out = date_par[0].split("-");

				var hours = [];
				hours = date_par[1].split(":");

				var hours_out = "";

				if(hours[0] < 12){
					if(hours[0] == 0){
						hours_out = "12am";
					}else{
						hours_out = `${hours[0]}am`;
					}
				}else{
					if(hours[0] == 12){
						hours_out = "12pm";
					}else{
						hours_out = `${hours[0] - 12}pm`;
					}
				}
							//data.list[i].weather[0].icon
				var cell = document.getElementById(`data${i}`);
				cell.innerHTML = `${date_out[1]}/${date_out[2]}/${date_out[0]}<br>${hours_out}<br><img class=weather_icon src="http://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png"><br>Temp: ${data.list[i].main.temp}F<br>Feels: ${data.list[i].main.feels_like}F<br>Humidity: ${data.list[i].main.humidity}%<br>Pres: ${(data.list[i].main.pressure * 0.0145038).toFixed(3)}psi`;
			}
		}
		}) 

	form.reset();
	place.focus();
          
        
	}
});
      
