var weather;
var api='https://api.openweathermap.org/data/2.5/forecast?q=';
var APPID='&APPID=645e787e7e6a99a1bfc06f2da15c3047';
var units='&units=metric';

var input = document.querySelector('.city');

var button = document.querySelector('.search_but'); 

var data;
button.onclick = async function(){
    
  var url=api+input.value+APPID+units;
  fetch(url)
	.then(response => response.json())
	.then(data => console.log(data));
/*
.then(
    function(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }

      // Examine the text in the response
      response.json().then(function(data) {
        console.log(data);
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });
  */
}
