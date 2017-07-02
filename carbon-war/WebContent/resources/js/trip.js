function sendNotification(){
	var appUser = JSON.stringify({
		"id" : $('#t-id').val(),
	});
	
	doAjaxWithArgAndReturn("sendNotification", "post", appUser, function(content) {
		if (content.ackType == "Success") {
			loadTripDetails($('#t-id').val());
			showSuccessMgs("Notification Delivered Successfully");
		} else {
			showErrorMgs("Unable to send Notification, try again after some time");
		}
	});
}

function loadTripDetails(id) {
	var appUser = JSON.stringify({
		"id" : id
	});
	
	doAjaxWithArgAndReturn("viewTrip", "post", appUser, function(content) {
		hideAll();
		$("#dynamic-content").html(content.message);
		$("#dynamic-content").slideDown();
	});
}

function deleteTrip(id) {
	hideAll();
	var appUser = JSON.stringify({
		"id" : id
	});
	doAjaxWithArgAndReturn("deleteTrip", "POST", appUser, function(content) {
		if (content.ackType=="Success") {
			showSuccessMgs("Trip information deleted successfully");
			loadTripPage(true);
		} else {
			showErrorMgs("Unable to Delete Trip. Trip Mapped with some invoice");
			loadTripPage(true);
		}
	});
}

function loadTripPage() {
	try {
		hideAll();
		doAjaxWithReturn("loadAllTrip", "POST", function(content) {
			$("#appUser-content").html(content.message);
			$("#appUser-content").attr("isLoaded", true);
			$("#appUser-content").slideDown();
			$('#appUser-table').DataTable({
				"order" : [ [ 0, "desc" ] ]
			});
		});
			
	} catch (e) {
		showErrorMgs(" Error: " + e.message);
	}
}

function loadAddEditTrip(id) {
	hideAll();
	var appUser = JSON.stringify({
		"id" : id
	});
	doAjaxWithArgAndReturn("loadAddEditTrip", "POST", appUser, function(content) {
		$("#dynamic-content").html(content.message);
		$("#dynamic-content").slideDown();
	});
}

function saveTrip() {
	try {
		
		var appUser = JSON.stringify({
			"id" : $("#id").val(),
			"name" : $("#name").val().trim(),
			"fromLat" : $("#fromLat").val().trim(),
			"fromLong" : $("#fromLong").val().trim()
		});
		doAjaxWithArgAndReturn("saveTrip", "POST", appUser, function(content) {
			if (content.ackType == "Success") {
				loadTripPage();
				showSuccessMgs(content.message);
			} else {
				showErrorMgs(content.message);
			}
		});
		
	} catch (e) {
		showErrorMgs("Error save appUser: " + e.message);
	}
}
