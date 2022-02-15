//Arrow function-immediately invoked function expression
(() => { 
	
	/*global variables and HTML elements*/
	var alarm;
	var alarmset;
	var now;
	var fetching;
	var sound=new Audio("wake-up-sound.mp3");//alarm sound file 
	var alarmContainer=document.getElementById("alarms-container");
	setAlarmButton = document.getElementById("submitButton");
    // Event Listener added to Set Alarm Button
    setAlarmButton.addEventListener("click", getInputalarmvalue);
    updateAlarmlist();//keeps the alarm list to page even after refreshing page

	/*initilaising , updating time at for every second*/
	const init = () => {
		updateClock();
		setInterval(() => {
			updateClock();
		}, 1000);
		
	};
  /*function to update clock*/
	const updateClock = () => {
		resetClock();
		getCurrentTime();
		displayCurrentTime();
	};

	 /*function to get current hours, minutes , seconds from date object*/
	const getCurrentTime = () => {
		let fullDate = new Date();
		
		let	hours = fullDate.getHours();
		let	minutes = fullDate.getMinutes();
		let	seconds = fullDate.getSeconds();
		let period = (hours >= 12) ? "pm" : "am";//setting day or night as per hours

		//globalisation of time variables with window object
		window.clock = {};
		window.clock.time = {
			
			hours: hours,
			minutes: minutes,
			seconds: seconds,
			period: period
		};
		
		
		
	};

	 /*function to display current time*/
	const displayCurrentTime = () => {
		
		let hours = window.clock.time.hours;
		let minutes = window.clock.time.minutes;
		let seconds = window.clock.time.seconds;
		let period = window.clock.time.period;

		//formats hours
		hours = (hours > 12) ? (hours - 12) : hours;
		hours = (hours === 0) ? 12 : hours;
		hours = (hours <= 9) ? ("0" + hours) : hours;
		//formats minutes
		minutes = (minutes <= 9) ? ("0" + minutes) : minutes;
		//formats seconds
		seconds = (seconds <= 9) ? ("0" + seconds) : seconds;
		
		//complete 12 hour digital clock format of current time
		now=hours+":"+minutes+":"+seconds+" "+ period.toUpperCase();
    	alarmchecker(now,alarmset);//calling alarmchecker to at one second interval
		
	 // targets the html	
		const hoursHtml = document.getElementsByClassName('hours')[0];
		const minutesHtml = document.getElementsByClassName('minutes')[0];
		const secondsHtml = document.getElementsByClassName('seconds')[0];
		const periodHtml = document.getElementsByClassName(period)[0];

		// changes the html values
		
		hoursHtml.innerHTML = hours;
		minutesHtml.innerHTML = minutes;
		secondsHtml.innerHTML = seconds;
		periodHtml.classList.add("light-on");
	
		fetchAlarmvalue();//fetching alarms for every second
	
	};
	
	
		
	// create HTML selectors - hours, minutes,seconds
	var thr=createSelect(12);
	var thm=createSelect(59);
	var ths=createSelect(59);
	
	document.getElementById("tpick-h").appendChild(thr);
	document.getElementById("tpick-m").appendChild( thm);
	document.getElementById("tpick-s").appendChild(ths);	
 
   //  SUPPORT FUNCTION - CREATE SELECTOR FOR HR, MIN, SEC
  function createSelect (max) {
    let selector = document.createElement("select"), opt;
    for (let i=0; i<=max; i++) {
      opt = document.createElement("option");
      i = padzero(i);
      opt.value = i;
      opt.innerHTML = i;
	  selector.style.backgroundColor = "#d9d9d9"; 
	  selector.style.boxShadow = "inset -3px -3px 9px #ffffff83,inset 3px 3px 7px rgba(94,104,121,0.688)"; 
      selector.style.appearance= "none";
	  selector.style.margin= "10px";
	  selector.style.padding= "20px";
	  selector.style.border= "none";
	  selector.style.outline= "none";
      selector.appendChild(opt);//adding options to selectbox
    }
    return selector;
  };

  // (D) SUPPORT FUNCTION - PREPEND HR, MIN, SEC WITH 0 (IF < 10)
  function padzero (num)  {
    if (num < 10) { num = "0" + num; }
    else { num = num.toString(); }
    return num;
  };
  


  //function to get input from selectors and set alarm
  function getInputalarmvalue() {
	var tpick=document.getElementById("tpick-p");//getting am or pm value
	alarm = thr.value+":"+ thm.value+":" + ths.value+" " + tpick.value;
   fetching=false;
	if (!fetching) {
		saveAlarmvalue(alarm);
	  }	
	addAlarmlistitemToDom(alarm);
  }

  // function to add alarm list item to dom
  function addAlarmlistitemToDom(time) {
	
	const element = document.createElement("div");
	element.classList.add("alarm", "d-flex");
	element.innerHTML = `<div class= "time" >${time} </div> <button class="button" >Delete</button>`;   
	const deleteButton = element.querySelector(".button");
	deleteButton.addEventListener("click", (e) => deleteAlarmfromdom(e, time));
	alarmContainer.appendChild(element);//adding element to alarmContainer
  }


	
  //function to keep alarm list updated
	  function updateAlarmlist() {
		  const alarms = checkAlarmvalues();
	  console.log(alarms);
		  alarms.forEach((time) => {
		  
			  addAlarmlistitemToDom(time);
			  
			});
		  }

// Is alarms saved in Local Storage?
  function checkAlarmvalues() {
	let alarms = [];
	const isPresent = localStorage.getItem("alarms");
	if (isPresent) alarms = JSON.parse(isPresent);
	return alarms;
  }
  
  // save alarm list to local storage
  function saveAlarmvalue(time) {
	const alarms = checkAlarmvalues();  
	alarms.push(time);
	localStorage.setItem("alarms", JSON.stringify(alarms));
	
  }
  

  //function to ring alarm sound when it is alarm time 
  function alarmchecker(now,alarmset){

	if (alarmset != null) {
	
			if (now == alarmset ) 
		{ sound.play();
			setTimeout(alarmalert, 10000); 
		}
			
	  }
	  
 } 

//pops up an alert when alarm goes off	
  function alarmalert(){
	alert("alarm is off");
 }

  // Fetching alarms from local storage
  function fetchAlarmvalue() {
	const alarms =checkAlarmvalues();	
    alarms.forEach((time) => {
    alarmchecker(now,time);
		 fetching=true;
  });
 
  }
  
//delete alarm from dom
  function deleteAlarmfromdom(event, time) {
	const self = event.target;
	const parent = self.parentElement;
	deleteAlarmvalueFromLocal(time);
    parent.remove(); //removes HTML element form dom
  }
  
  //delete alarm from local storage
  function deleteAlarmvalueFromLocal(time) {
	const alarms = checkAlarmvalues();
	const index = alarms.indexOf(time);
	alarms.splice(index, 1);
	localStorage.setItem("alarms", JSON.stringify(alarms));
	
  }

  //resets the higlight for am-pm
  const resetClock = () => {
		const lights = document.querySelectorAll(".light-on");
		if(lights) {
			lights.forEach(item => {
				item.classList.remove("light-on")
			});
		}
	};

	return init();
})()
