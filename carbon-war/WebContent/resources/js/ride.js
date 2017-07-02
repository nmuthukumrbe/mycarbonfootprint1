
function leadershipBoard(){
	hideAll();
	doAjaxWithArgAndReturn("leadershipBoard", "POST", "{}", function(content) {
		$("#dynamic-content").html(content.message);
		$("#dynamic-content").slideDown();
	});
}

function myInfo(){
	hideAll();
	doAjaxWithArgAndReturn("myInfo", "POST", "{}", function(content) {
		$("#dynamic-content").html(content.message);
		$("#dynamic-content").slideDown();
	});
}

function mySaving(){
	hideAll();
	doAjaxWithArgAndReturn("mySaving", "POST", "{}", function(content) {
		$("#dynamic-content").html(content.message);
		$("#dynamic-content").slideDown();
	});
}

function loadTrip(userId, rideId){
	hideAll();
	ride = JSON.stringify({
		"id" : rideId,
		"userId": userId
	});
	doAjaxWithArgAndReturn("viewTrip", "POST", ride, function(content) {
		$("#dynamic-content").html(content.message);
		$("#dynamic-content").slideDown();
		if(content.object=="QR"){
			makeCode();
		}
	});
}

function findTrip(){
	hideAll();
	doAjaxWithArgAndReturn("findTrip", "POST", "{}", function(content) {
		$("#dynamic-content").html(content.message);
		$("#dynamic-content").slideDown();
		if(content.object=="QR"){
			makeCode();
		}
	});
}

function startTrip(){
	
	var appUser = JSON.stringify({
		"id" : $('#id').val()
	});
	doAjaxWithArgAndReturn("startTrip", "POST", appUser, function(content) {
		if (content.ackType == "Success") {
			loadTrip();
			showSuccessMgs(content.message);
		} else {
			showErrorMgs(content.message);
		}
	});
}

function stopTrip(){
	if (navigator.geolocation) {
		var timeoutVal = 10 * 1000 * 1000;
	    navigator.geolocation.getCurrentPosition(function(position){
	    	var latitude = position.coords.latitude;
	    	var longitude = position.coords.longitude;
	    	var trip = JSON.stringify({
				"toLat" : latitude,
				"toLong" : longitude,
				"id" : $('#id').val()
			});
	    	doAjaxWithArgAndReturn("stopTrip", "POST", trip, function(content) {
	    		if (content.ackType == "Success") {
	    			loadTrip();
	    			showSuccessMgs(content.message);
	    		} else {
	    			showErrorMgs(content.message);
	    		}
	    	});
	    	console.log("Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude);
	    },showError, { enableHighAccuracy: true, timeout: timeoutVal, maximumAge: 0 });
	  } else {
	    console.log("Geolocation is not supported by this browser.");
	  }
	
}

function saveTrip(lat,long, name) {
	try {
		$.ajax({
			url : "https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+long+"&key=AIzaSyDHIKQbNechmNqMa08w64gu5wQjZK5HOx8",
			type : "GET",
			dataType: "json",
			success : function(data){
				var appUser = JSON.stringify({
					"name" : data.results[0].formatted_address,
					"fromLat" : lat,
					"fromLong" : long
				});
				doAjaxWithArgAndReturn("saveTrip", "POST", appUser, function(content) {
					if (content.ackType == "Success") {
						loadTrip();
						showSuccessMgs(content.message);
					} else {
						showErrorMgs(content.message);
					}
				});
			},
			complete: function(data, textStatus, request){
				console.log(data);
			},
			error: function(data){
				console.log(data);
			}
		});	
	} catch (e) {
		showErrorMgs("Error save appUser: " + e.message);
	}
}

function makeCode () {
	$('#qrcode').html("");
	var qrcode = new QRCode("qrcode");
    var elText = document.getElementById("text");
    
    if (!elText.value) {
        alert("Input a text");
        elText.focus();
        return;
    }
    
    qrcode.makeCode(elText.value);
}

//GEO Location
function getLocation() {
	  if (navigator.geolocation) {
		var timeoutVal = 10 * 1000 * 1000;
	    navigator.geolocation.getCurrentPosition(function(position){
	    	var latitude = position.coords.latitude;
	    	var longitude = position.coords.longitude;
	    	saveTrip(latitude,longitude,name);
	    	console.log("Latitude: " + position.coords.latitude + "<br>Longitude: " + position.coords.longitude);
	    },showError, { enableHighAccuracy: true, timeout: timeoutVal, maximumAge: 0 });
	  } else {
	    console.log("Geolocation is not supported by this browser.");
	  }
}


function showError(error) {
  switch(error.code) {
    case error.PERMISSION_DENIED:
      console.log("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      console.log("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      console.log("The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
      console.log("An unknown error occurred.");
      break;
  }
}
