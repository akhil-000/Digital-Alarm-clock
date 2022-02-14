# Digital-Alarm-clock
Digital Alarm Clock using Plain Javascript

Skip to content
Search or jump to…
Pull requests
Issues
Marketplace
Explore
 
@akhil-000 
akhil-000
/
Digital-Alarm-clock
Public
Code
Issues
Pull requests
Actions
Projects
Wiki
Security
Insights
Settings
Digital-Alarm-clock/tickclock.html
@akhil-000
akhil-000 initial commit
Latest commit 84ca053 20 hours ago
 History
 1 contributor
101 lines (77 sloc)  1.99 KB
   
<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8" />
	<meta name="viewport" content=
		"width=device-width, initial-scale=1.0" />
	<!-- page head title -->
	<title>
		Alarm Clock
	</title>
	<!-- it is connected to one stylesheet -->
    <link rel="stylesheet" type="text/css" href="tickclock.css">
</head>

<body>  
	<!-- clockface -->
    <div class="clockface">

		<!-- seven segement numerical font display -->
        <div class="clock-field">
			
				<!-- hours -->
			<div class="numbers">
				<p class="hours"></p>
				<p class="placeholder">88</p>
				<p class="type">hour</p>
			</div>
			
				<!-- colon between hours and minutes-->
			<div class="colon">
				<p>:</p>
			</div>
			
				<!-- minutes -->
			<div class="numbers">
				<p class="minutes"></p>
				<p class="placeholder">88</p>
				<p class="type">minute</p>
			</div>
			
			<!-- colon between minutes and seconds-->
			<div class="colon">
				<p>:</p>
			</div>
			
			<!-- seconds-->
			<div class="numbers">
				<p class="seconds"></p>
				<p class="placeholder">88</p>
				<p class="type">second</p>
			</div>
			
			<!-- 12 hour format-->
			<div class="am-pm">
			
				<div>
					<p class="am">am</p>
				</div>
			
				<div>
					<p class="pm">pm</p>
				</div>
			
			</div>
		
		</div>
    
		<!--SET ALARM -->
		<div id="set-alarm">
		
		<!-- dropdown selector input containers-->
			<div id="tpick-h" ></div>
			<div id="tpick-m" ></div>
			<div id="tpick-s" ></div>
			<select required name="am-pm" id="tpick-p">
				<option value="AM">AM</option>
				<option value="PM">PM</option>
			  </select>
			<button class="btn submit-button" id="submitButton" type="submit">Set Alarm</button>
			
	    </div>
		 
		<!-- Alarms list-->
		  <div class="set-alarm-container">
			<div class="set-alarm-container-title ">ALARMS</div>
			<div class="alarms-container" id= "alarms-container">
				
			</div>

          </div> 
    
    </div> 
	
			<!-- its connected to one javascript file-->
	<script src="tickclock.js"></script>
	 
	  
</body>

</html>
© 2022 GitHub, Inc.
Terms
Privacy
Security
Status
Docs
Contact GitHub
Pricing
API
Training
Blog
About
Loading complete
