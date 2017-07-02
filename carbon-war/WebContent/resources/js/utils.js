var utilsImpls = new Utils();

function log(msg) {
	if (colsole) {
		colsole.log(msg);
	}
}

function MultiSelectBox(mainElementId) {
	this.init = function() {
		var mainCheckBox = jQuery("#" + mainElementId);
		if (mainCheckBox) {
			var othereElements = jQuery("[name='" + mainCheckBox[0].name + "']");
			
			/**
			 * Binding the checkUncheckBox() on change of the checkbox state
			 */
			mainCheckBox.on("ifToggled", function(){
				/**
				 * method to perform the check and uncheck operations for a group of check
				 * boxes by checking unchecking the main check box
				 */
				var mainCheckBox = jQuery(this);
				var othereElements = jQuery("[name='" + this.name + "-items']");
				var allChecked = mainCheckBox.is(':checked');
				for (var i = 0; i < othereElements.length;i++){
					var currentElement = othereElements[i];
					if(allChecked){
						$(currentElement).iCheck('check');
					}else{
						$(currentElement).iCheck('uncheck');
					}
					//currentElement.checked = allChecked;
				}
			});
		}
	}
}

function Utils() {

}

function validate(evt) {
	  var theEvent = evt || window.event;
	  var key = theEvent.keyCode || theEvent.which;
	  key = String.fromCharCode( key );
	  var regex = /[0-9]|\./;
	  if( !regex.test(key) ) {
	    theEvent.returnValue = false;
	    if(theEvent.preventDefault) theEvent.preventDefault();
	  }
}

//_________________________

function sayWho() {
	var ua = navigator.userAgent, tem, M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
	if (/trident/i.test(M[1])) {
		tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
		return 'IE ' + (tem[1] || '');
	}
	if (M[1] === 'Chrome') {
		tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
		if (tem != null)
			return tem.slice(1).join(' ').replace('OPR', 'Opera');
	}
	M = M[2] ? [ M[1], M[2] ] : [ navigator.appName, navigator.appVersion, '-?' ];
	if ((tem = ua.match(/version\/(\d+)/i)) != null)
		M.splice(1, 1, tem[1]);
	return M.join(' ');
}

function isValid(id) {
	var e = $("#" + id);
	if (e.val() != null && e.val() != undefined && e.val() != "" && e.val() != " ") {
		highlight(id, false);
		return true;
	} else {
		highlight(id, true);
		return false;
	}
}

function highlight(id, h) {
	if (h) {
		$("#" + id).parent().addClass("has-warning");
	} else {
		$("#" + id).parent().removeClass("has-warning");
	}
}

function requiredFields() {
	showErrorMgs("Required fields are missing!");
}

function showSuccessMgs(msg) {
	hideInProgress();
	$("#success-msg-txt").text(msg);
	$("#success-msg").slideDown();
	setTimeout(function() {
		$("#success-msg").slideUp();
	}, 4000);
}

function showErrorMgs(msg) {
	hideInProgress();
	$("#error-msg-txt").text(msg);
	$("#error-msg").slideDown();
	setTimeout(function() {
		$("#error-msg").slideUp();
	}, 4000);
}

function showInProgress() {
	if (!$("#success-msg").is(":visible") && !$("#error-msg").is(":visible")) {
		$("#in-progress-msg").slideDown();
	}
}

function hideInProgress() {
	$("#in-progress-msg").slideUp();
}

function hideAll() {
	$('#loginPageContent').hide();
	$('#content-area').children('div').each(function() {
		$(this).html("");
		$(this).hide();
	});
	// $('#dynamic-content').html('');
}

function loadRegistration() {
	
	doAjaxWithArgAndReturn("register", "post", "{}", function(content) {
		$("#dynamic-content").html(content);
	});
	
}

function registerLicense() {
	
	doAjaxWithArgAndReturn("register/"+$("#k").val(), "post", "{}" ,function(content) {
		if (content == 'true') {
			showSuccessMgs("Registration successfull");
			setTimeout(function() {
				window.location.href = window.location.href.replace("#", "");
			}, 2000);
		} else {
			showErrorMgs("Registration failed");
		}
	});
	
}


function login() {
	
	if($("#u").val().trim()==""){
		showErrorMgs("UserName is Needed, Kindly specify");
		window.scrollTo(0, 0);
		return;
	}
	if($("#p").val().trim()==""){
		showErrorMgs("Password is Needed, Kindly specify");
		window.scrollTo(0, 0);
		return;
	}
	if($("#cmp_name").val().trim()==""){
		showErrorMgs("Company Name is Needed, Kindly specify");
		window.scrollTo(0, 0);
		return;
	}
	doAjaxWithReturn("login/"+$("#u").val()+"/"+$("#p").val()+"/"+$("#cmp_name").val(), "get", function(content) {
		if (content!=null && content.ackType == 'Success') {
			showSuccessMgs("Welcome!!");
			G_Session=content.message;
			$('#username').html(content.object);			
			$('#flash').hide();
			setTimeout(function() {
				loadBillSystemPage(content.object);
			}, 2000);
		} else {
			$("#u").val("");
			$("#p").val("");
			showErrorMgs("Login failed, Please try again");
			alert("Login failed, Please try again");
		}
	});
}

function logoutUser(){
	var url = "/logout-action";
	doAjaxWithReturn(url, "post", function(responseData) {
		if (responseData.ackType == "Failed") {
			showErrorMgs(responseData.message);
		} else {
			window.location.href = "/mycarbon/company/12";
		}
	});
}

function loadSettigs() {
	hideAll();
	
	doAjaxWithArgAndReturn("settings", "post", {}, function(content) {
		$("#settings-content").html(content.message);
		$("#settings-content").slideDown();
	});
}

function loadSettings(){
	try {
		hideAll();
		doAjaxWithReturn("loadSettings", "POST", function(content) {
			$("#dynamic-content").html(content.message);
			$("#dynamic-content").attr("isLoaded", true);
			$("#dynamic-content").slideDown();
		});
			
	} catch (e) {
		showErrorMgs(" Error: " + e.message);
	}
}

function saveSettings(tab){
	var id = parseInt($('#st').val());
	if(tab==1){
		var settings = JSON.stringify(
				[{ "id" : id,
					"type" : $('#'+id).attr('meta-type'),
					"value" : $('#'+id).val() },
				{ "id" : id+1,
					"type" : $('#'+(id+1)).attr('meta-type'),
				    "value" : $('#'+(id+1)).val() },
				{ "id" : id+2,
				    "type" : $('#'+(id+2)).attr('meta-type'),
				    "value" : $('#'+(id+2)).val() },
				{ "id" : id+3,
				    "type" : $('#'+(id+3)).attr('meta-type'),
				    "value" : $('#'+(id+3)).val() },
				{ "id" : id+4,
				    "type" : $('#'+(id+4)).attr('meta-type'),				   
				    "value" : $('#'+(id+4)).val() },
				{ "id" : id+5,
				    "type" : $('#'+(id+5)).attr('meta-type'),
				    "value" : $('#'+(id+5)).val() },
				{ "id" : id+6,
				    "type" : $('#'+(id+6)).attr('meta-type'),
				    "value" : $('#'+(id+6)).val() }]
		);
	} else if(tab==2){
		var settings = JSON.stringify(
				[{ "id" : id+7,
					"type" : $('#'+(id+7)).attr('meta-type'),
					"value" : $('#'+(id+7)).val() },
				{ "id" : id+8,
					"type" : $('#'+(id+8)).attr('meta-type'),
				    "value" : $('#'+(id+8)).val() },
				{ "id" : id+9,
				    "type" : $('#'+(id+9)).attr('meta-type'),
				    "value" : $('#'+(id+9)).val() },
				{ "id" : id+10,
				    "type" : $('#'+(id+10)).attr('meta-type'),
				    "value" : $('#'+(id+10)).val() },
				{ "id" : id+11,
				    "type" : $('#'+(id+11)).attr('meta-type'),
				    "value" : $('#'+(id+11)).val() },
				{ "id" : id+18,
				    "type" : $('#'+(id+18)).attr('meta-type'),
				    "value" : $('#'+(id+18)).val() },
				{ "id" : id+19,
				    "type" : $('#'+(id+19)).attr('meta-type'),
				    "value" : $('#'+(id+19)).val() }]
		);
	} else if(tab==3){
		var settings = JSON.stringify(
				[{ "id" : id+12,
					"type" : $('#'+(id+12)).attr('meta-type'),
					"value" : $('#'+(id+12)).val() },
				{ "id" : id+13,
					"type" : $('#'+(id+13)).attr('meta-type'),
				    "value" : $('#'+(id+13)).val() },
				{ "id" : id+14,
				    "type" : $('#'+(id+14)).attr('meta-type'),
				    "value" : $('#'+(id+14)).val() }]
		);
	} else {
		var settings = JSON.stringify(
				[{ "id" : id+15,
					"type" : $('#'+(id+15)).attr('meta-type'),
				    "value" : $('#'+(id+15)).val() }]
		);
	}
	
	doAjaxWithArgAndReturn("saveSettings", "POST", settings, function(content) {
		showSuccessMgs("Settings information saved successfully");
		loadSettings();
	});
}

function loadNotification(){
	try {
		hideAll();
		doAjaxWithReturn("loadNotification", "POST", function(content) {
			$("#dynamic-content").html(content.message);
			$("#dynamic-content").attr("isLoaded", true);
			$("#dynamic-content").slideDown();
			$('#notification-table').DataTable({
				"order" : [ [ 0, "desc" ] ]
			});
		});
			
	} catch (e) {
		showErrorMgs(" Error: " + e.message);
	}
}

function loadDailySchedulePage() {
	try {
		hideAll();
		doAjaxWithArgAndReturn("loadDailySchedule", "POST", "{}", function(content) {
			$("#dailySchedule-content").html(content.message);
			$("#dailySchedule-content").attr("isLoaded", true);
			$("#dailySchedule-content").slideDown();
			$('#estimatedDate').datetimepicker({
				format : "ddd, DD MMM YYYY hh:mm a"
			});
			searchDailySchedule();
		});
	} catch (e) {
		showErrorMgs(" Error: " + e.message);
	}
}

function searchDailySchedule() {
	try {
		var order = JSON.stringify({
			"estimatedDate" : $('#estimatedDate').val(),
		});
		$("#dailySchedule-pagination").html("");
		doAjaxWithArgAndReturn("searchDailySchedule", "POST", order, function(content) {
			$("#dailySchedule-pagination").html(content.message);
			$("#dailySchedule-pagination").slideDown();
			$('#dailySchedule-table').DataTable({
				"order" : [ [ 0, "desc" ] ]
			});
		});
	} catch (e) {
		showErrorMgs(" Error: " + e.message);
	}
}