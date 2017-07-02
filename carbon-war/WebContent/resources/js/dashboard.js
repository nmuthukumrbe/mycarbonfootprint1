function loadDashboard() {
	
	hideAll();
	$('#top-nav-bar').click();
	doAjaxWithReturn("loadDashBoard", "POST", function(content) {
		$("#dashboard-content").html(content.message);
		$("#dashboard-content").slideDown();
		getStats();
	});
	
}

function profitDashboard(initialize) {
	var summaryRequest = "{}";
	if(!initialize){
		summaryRequest = JSON.stringify({
			"toDate" : $('#toDate').val(),
			"fromDate" : $('#fromDate').val()
		});
	}
	
	doAjaxWithArgAndReturn("profitDashboard", "POST", summaryRequest, function(content) {
		cleanAllDashBoard();
		$("#profitDashboard").html(content.message);
		$("#profitDashboard").slideDown();
		$("#fromDate").datetimepicker({
			format : "ddd, DD MMM YYYY hh:mm a"
		});
		$("#toDate").datetimepicker({
			format : "ddd, DD MMM YYYY hh:mm a"
		});
	});
}

function cleanAllDashBoard(){
	$("#stats").html("");
	$("#profitDashboard").html("");
	$("#orderStatusDashBoard").html("");
	$("#tailorAmountDashBoard").html("");
	$("#tailorOrderStatusDashBoard").html("");
	$("#orderReport").html("");
}

function resetField(){
	$("#fromDate").val("");
	$("#toDate").val("");
}

function orderStatusDashBoard(initialize) {
	var summaryRequest = "{}";
	if(!initialize){
		summaryRequest = JSON.stringify({
			"toDate" : $('#toDate').val(),
			"fromDate" : $('#fromDate').val()
		});
	}
	
	doAjaxWithArgAndReturn("orderStatusDashBoard", "POST", summaryRequest, function(content) {
		cleanAllDashBoard();
		$("#orderStatusDashBoard").html(content.message);
		$("#orderStatusDashBoard").slideDown();
		$("#fromDate").datetimepicker({
			format : "ddd, DD MMM YYYY hh:mm a"
		});
		$("#toDate").datetimepicker({
			format : "ddd, DD MMM YYYY hh:mm a"
		});
	});
}

function tailorAmountDashBoard(initialize) {
	var summaryRequest = "{}";
	if(!initialize){
		summaryRequest = JSON.stringify({
			"toDate" : $('#toDate').val(),
			"fromDate" : $('#fromDate').val()
		});
	}
	
	doAjaxWithArgAndReturn("tailorAmountDashBoard", "POST", summaryRequest, function(content) {
		cleanAllDashBoard();
		$("#tailorAmountDashBoard").html(content.message);
		$("#tailorAmountDashBoard").slideDown();
		$("#fromDate").datetimepicker({
			format : "ddd, DD MMM YYYY hh:mm a"
		});
		$("#toDate").datetimepicker({
			format : "ddd, DD MMM YYYY hh:mm a"
		});
	});
}

function tailorOrderStatusDashBoard(initialize) {
	var summaryRequest = "{}";
	if(!initialize){
		summaryRequest = JSON.stringify({
			"toDate" : $('#toDate').val(),
			"fromDate" : $('#fromDate').val()
		});
	}
	
	doAjaxWithArgAndReturn("tailorOrderStatusDashBoard", "POST", summaryRequest, function(content) {
		cleanAllDashBoard();
		$("#tailorOrderStatusDashBoard").html(content.message);
		$("#tailorOrderStatusDashBoard").slideDown();
		$("#fromDate").datetimepicker({
			format : "ddd, DD MMM YYYY hh:mm a"
		});
		$("#toDate").datetimepicker({
			format : "ddd, DD MMM YYYY hh:mm a"
		});
	});
}

function getStats(initialize) {
	
	doAjaxWithArgAndReturn("stats", "POST", "{}", function(content) {
		cleanAllDashBoard();
		$("#stats").html(content.message);
		$("#stats").slideDown();
	});
}

function orderReport(initialize) {
	var summaryRequest = "{}";
	if(!initialize){
		summaryRequest = JSON.stringify({
			"toDate" : $('#toDate').val(),
			"fromDate" : $('#fromDate').val()
		});
	}
	
	doAjaxWithArgAndReturn("orderReport", "POST", summaryRequest, function(content) {
		cleanAllDashBoard();
		$("#orderReport").html(content.message);
		$("#orderReport").slideDown();
		$("#fromDate").datetimepicker({
			format : "ddd, DD MMM YYYY hh:mm a"
		});
		$("#toDate").datetimepicker({
			format : "ddd, DD MMM YYYY hh:mm a"
		});
	});
}

function orderDownloadReport(type) {
	
	var URL = G_URL_Rest+"/orderDownloadReport/"+type;
	
	if(type==4){
		if($("#fromDate").val().trim()==""){
			showErrorMgs("From Date is Needed, Kindly specify");
			window.scrollTo(0, 0);
			return;
		}
		if($("#toDate").val().trim()==""){
			showErrorMgs("To Date is Needed, Kindly specify");
			window.scrollTo(0, 0);
			return;
		}
		URL = URL + "/"+$('#fromDate').val()+"/"+$('#toDate').val();
	} else {
		//1,2 are dummy value to make the URL pattern
		URL = URL + "/1/2";
	}
	
    console.log("download Order Summary");
    var xhr = new XMLHttpRequest();
    xhr.open('POST', URL , true);
    xhr.responseType = 'arraybuffer';
    setSuccessMessage("Order Summary Download Initiated. Please wait for some time");
    xhr.onload = function () {
        if (this.status === 200) {
        	if($('#fromDate').val()=="1"){
        		$('#fromDate').val("");
        	}
        	if($('#toDate').val()=="2"){
        		$('#toDate').val("");
        	}
        	setSuccessMessage("Order Summary Download Completed");
            var filename = "";
            var disposition = xhr.getResponseHeader('Content-Disposition');
            if (disposition && disposition.indexOf('attachment') !== -1) {
                var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                var matches = filenameRegex.exec(disposition);
                if (matches != null && matches[1])
                    filename = matches[1].replace(/['"]/g, '');
            }
            var type = xhr.getResponseHeader('Content-Type');

            var blob = new Blob([this.response], {type: type});
            if (typeof window.navigator.msSaveBlob !== 'undefined') {
                window.navigator.msSaveBlob(blob, filename);
            } else {
                var URL = window.URL || window.webkitURL;
                var downloadUrl = URL.createObjectURL(blob);

                if (filename) {
                    var a = document.createElement("a");
                    if (typeof a.download === 'undefined') {
                        window.location = downloadUrl;
                    } else {
                        a.href = downloadUrl;
                        a.download = filename;
                        document.body.appendChild(a);
                        a.click();
                    }
                } else {
                    window.location = downloadUrl;
                }

                setTimeout(function () {
                    URL.revokeObjectURL(downloadUrl);
                }, 100); // cleanup
            }
        }
    };
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send();
}

function downloadCustomerProfile() {
	
	var URL = G_URL_Rest+"/downloadCustomerProfile";
	
    console.log("download downloadCustomerProfile");
    var xhr = new XMLHttpRequest();
    xhr.open('POST', URL , true);
    xhr.responseType = 'arraybuffer';
    setSuccessMessage("download Customer Profile Download Initiated. Please wait for some time");
    xhr.onload = function () {
        if (this.status === 200) {
        	setSuccessMessage("Order Customer Profile Download Completed");
            var filename = "";
            var disposition = xhr.getResponseHeader('Content-Disposition');
            if (disposition && disposition.indexOf('attachment') !== -1) {
                var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                var matches = filenameRegex.exec(disposition);
                if (matches != null && matches[1])
                    filename = matches[1].replace(/['"]/g, '');
            }
            var type = xhr.getResponseHeader('Content-Type');

            var blob = new Blob([this.response], {type: type});
            if (typeof window.navigator.msSaveBlob !== 'undefined') {
                window.navigator.msSaveBlob(blob, filename);
            } else {
                var URL = window.URL || window.webkitURL;
                var downloadUrl = URL.createObjectURL(blob);

                if (filename) {
                    var a = document.createElement("a");
                    if (typeof a.download === 'undefined') {
                        window.location = downloadUrl;
                    } else {
                        a.href = downloadUrl;
                        a.download = filename;
                        document.body.appendChild(a);
                        a.click();
                    }
                } else {
                    window.location = downloadUrl;
                }

                setTimeout(function () {
                    URL.revokeObjectURL(downloadUrl);
                }, 100); // cleanup
            }
        }
    };
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.send();
}

