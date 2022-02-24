
window.onload = function() {

	feather.replace();

	 var months = ["يناير", "فبراير", "مارس", "إبريل", "مايو", "يونيو",
	              "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];
	 var days =["اﻷحد","اﻷثنين","الثلاثاء","اﻷربعاء","الخميس","الجمعة","السبت"];
	 var date = new Date();
	 var chosenCity = "الأحساء";

	 var riyadhLink = "https://api.weatherapi.com/v1/current.json?key=YOURAPIKEY&q=Riyadh&aqi=no&lang=ar";
	 var khobarLink = "https://api.weatherapi.com/v1/current.json?key=YOURAPIKEY&q=Riyadh&aqi=no&lang=ar";
	 var hofufLink = "https://api.weatherapi.com/v1/current.json?key=YOURAPIKEY&q=Hofuf&aqi=no&lang=ar";

	// Deafult 
	getDataFromApi(hofufLink);


	function getDataFromApi(link){
        fetch(link)
        .then(
          function(response) {
             return response.json();
          }
        ).then(
            function(data){
            bindWeatherData(data);

        });
      
	}

	function bindWeatherData(the_data){
	
	 var dateOfData =  the_data['current']['last_updated'];
	 var windSpeed =  the_data['current']['wind_kph'];
	 var currentWeather = the_data['current']['condition']['text'];
	 var weatherIcon = the_data['current']['condition']['icon'];
	 var temprature =  the_data['current']['temp_c'];
	 var humidity =  the_data['current']['humidity'];

	var todaysDate = `<div class="arabicDateBox"> <div class="monthYear"> + `+ date.getFullYear() + `</div> ` + `<div class="monthText">` + months[date.getMonth()] + ` </div>`  +  `<div class="dayofmonth"> ` + date.getDate() + `</div> </div>`;


	document.querySelector(".date-dayname").innerHTML = days[date.getDay()];
	document.querySelector(".date-day").innerHTML = todaysDate;
	document.querySelector(".location").innerHTML = chosenCity;
	document.querySelector(".weather-temp").innerHTML = temprature+"°C";
	document.querySelector(".weather-desc").innerHTML = currentWeather;
	document.querySelector("#humidity").innerHTML = humidity +"%";
	document.querySelector("#windSpeed").innerHTML = windSpeed + " كم\\ ساعة";
	document.querySelector(".dateofdata").innerHTML ="<br> تاريخ جلب البيانات" + "<br>" +dateOfData;
	 }
	
	
	
	window.tizen.tvinputdevice.registerKey("1");
	window.tizen.tvinputdevice.registerKey("2");
	window.tizen.tvinputdevice.registerKey("3");



    // add eventListener for keydown
    document.body.addEventListener('keydown', function(e) {
    	
    	switch(e.keyCode){
    	case  tizen.tvinputdevice.getKey('1').code: // number 1 on remote
    	    chosenCity = "الرياض";
    	    getDataFromApi(riyadhLink);
    		break;
    	case tizen.tvinputdevice.getKey('2').code: //number 2
    	    chosenCity = "الخبر";
    	    getDataFromApi(khobarLink);
    		break;
    	case tizen.tvinputdevice.getKey('3').code: //number 3
    		chosenCity = "الأحساء";
    	    getDataFromApi(hofufLink);
    		break;
    	case 10009: //RETURN button
		tizen.application.getCurrentApplication().exit();
    		break;
    	default:
    		console.log('Key code : ' + e.keyCode);
    		break;
    	}
    });
    
    
    startTime();
    function startTime() {
    	  const today = new Date();
    	  let h = today.getHours();
    	  let m = today.getMinutes();
    	  let s = today.getSeconds();
    	  m = checkTime(m);
    	  s = checkTime(s);
    	  let daytime = "صباحاً";
    	  if(h>12){
    		  h = h-12;
    	  daytime = "مساءً";
    	  }
    	  
    	  document.querySelector(".tvClock").innerHTML =  h + ":" + m + ":" + s +" " +daytime;
    	  setTimeout(startTime, 1000);
    	}

    	function checkTime(i) {
    	  if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    	  return i;
    	}

};