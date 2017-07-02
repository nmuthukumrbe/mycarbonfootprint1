function sendNotification(){
	var appUser = JSON.stringify({
		"id" : $('#t-id').val(),
	});
	
	doAjaxWithArgAndReturn("sendNotification", "post", appUser, function(content) {
		if (content.ackType == "Success") {
			loadAppUserDetails($('#t-id').val());
			showSuccessMgs("Notification Delivered Successfully");
		} else {
			showErrorMgs("Unable to send Notification, try again after some time");
		}
	});
}

function loadAppUserDetails(id) {
	var appUser = JSON.stringify({
		"id" : id
	});
	
	doAjaxWithArgAndReturn("viewAppUser", "post", appUser, function(content) {
		hideAll();
		$("#dynamic-content").html(content.message);
		$("#dynamic-content").slideDown();
	});
}

function deleteAppUser(id) {
	hideAll();
	var appUser = JSON.stringify({
		"id" : id
	});
	doAjaxWithArgAndReturn("deleteAppUser", "POST", appUser, function(content) {
		if (content.ackType=="Success") {
			showSuccessMgs("AppUser information deleted successfully");
			loadAppUserPage(true);
		} else {
			showErrorMgs("Unable to Delete AppUser. AppUser Mapped with some invoice");
			loadAppUserPage(true);
		}
	});
}

function loadAppUserPage() {
	try {
		hideAll();
		doAjaxWithReturn("loadAllAppUser", "POST", function(content) {
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

function loadAddEditAppUser(id) {
	hideAll();
	var appUser = JSON.stringify({
		"id" : id
	});
	doAjaxWithArgAndReturn("loadAddEditAppUser", "POST", appUser, function(content) {
		$("#dynamic-content").html(content.message);
		$("#dynamic-content").slideDown();
		$('#dob').datetimepicker({
			format : "ddd, DD MMM YYYY hh:mm a"
		});
	});
}

function saveAppUser() {
	try {
		
		var appUser = JSON.stringify({
			"id" : $("#id").val(),
			"name" : $("#name").val().trim(),
			"dob" : $("#dob").val().trim(),
			"name" : $("#name").val().trim(),
			"password" : $("#password").val().trim(),
			"gender" : $("#gender").val(),
			"mobile" : $("#mobile").val().trim(),
			"vechicle" : $("#vechicle").val().trim(),
			"company" : $("#company").val().trim(),
			"address" : $("#address").val().trim()
		});
		if($("#name").val().trim()==""){
			showErrorMgs("name is Needed, Kindly specify");
			window.scrollTo(0, 0);
			return;
		}
		if($("#mobile").val().trim()==""){
			showErrorMgs("Mobile is Needed, Kindly specify");
			window.scrollTo(0, 0);
			return;
		}
		doAjaxWithArgAndReturn("saveAppUser", "POST", appUser, function(content) {
			if (content.ackType == "Success") {
				loadAppUserPage();
				showSuccessMgs(content.message);
			} else {
				showErrorMgs(content.message);
			}
		});
		
	} catch (e) {
		showErrorMgs("Error save appUser: " + e.message);
	}
}
