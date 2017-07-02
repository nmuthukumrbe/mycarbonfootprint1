
function loadReport() {
	
	hideAll();
	doAjaxWithReturn("loadReport", "POST", function(content) {
		$("#report-content").html(content.message);
		$("#report-content").slideDown();
	});
	
}

function orderSummary(initialize) {

	var summaryRequest = "{}";
	if(!initialize){
		summaryRequest = JSON.stringify({
			"fromDate" : $('#fromDate').val(),
			"toDate" : $('#toDate').val()
		});
	}
	
	doAjaxWithArgAndReturn("orderSummary", "POST", summaryRequest, function(content) {
		cleanAllReport();
		$("#orderSummary").html(content.message);
		$("#orderSummary").slideDown();
		$('#order-report-table').DataTable({
			"order" : [ [ 0, "desc" ] ]
		});
		$("#fromDate").datetimepicker({
			format : "ddd, DD MMM YYYY hh:mm a"
		});
		$("#toDate").datetimepicker({
			format : "ddd, DD MMM YYYY hh:mm a"
		});
	});
	
}

function resetOrderSummary(){
	$('#fromDate').val("");
	$('#toDate').val("");
}

function downloadOrderSummary() {
	
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
    console.log("download Order Summary");
    var xhr = new XMLHttpRequest();
    xhr.open('POST', "orderReport/"+$('#fromDate').val()+"/"+$('#toDate').val(), true);
    xhr.responseType = 'arraybuffer';
    setSuccessMessage("Order Summary Download Initiated. Please wait for some time");
    xhr.onload = function () {
        if (this.status === 200) {
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



function cleanAllReport(){
	$("#orderSummary").html("");
	$("#dayWiseSummary").html("");
	$("#weekWiseSummary").html("");
	$("#monthWiseSummary").html("");
	$("#yearWiseSummary").html("");
}

function dayWiseSummary(initialize) {

	var summaryRequest = "{}";
	if(!initialize){
		summaryRequest = JSON.stringify({
			"fromDate" : $('#fromDate').val(),
			"toDate" : $('#toDate').val()
		});
	}
	
	doAjaxWithArgAndReturn("dayWiseSummary", "POST", summaryRequest, function(content) {
		cleanAllReport();
		$("#dayWiseSummary").html(content.message);
		$("#dayWiseSummary").slideDown();
		$('#dayWiseSummary-report-table').DataTable({
			"order" : [ [ 0, "desc" ] ]
		});
		$("#fromDate").datetimepicker({
			format : "ddd, DD MMM YYYY hh:mm a"
		});
		$("#toDate").datetimepicker({
			format : "ddd, DD MMM YYYY hh:mm a"
		});
	});
	
}

function downloadDayWise() {
	
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
    console.log("download Day Wise");
    var xhr = new XMLHttpRequest();
    xhr.open('POST', "exportDayWise/"+$('#fromDate').val()+"/"+$('#toDate').val(), true);
    xhr.responseType = 'arraybuffer';
    setSuccessMessage("Export Day Wise Download Initiated. Please wait for some time");
    xhr.onload = function () {
        if (this.status === 200) {
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

function weekWiseSummary(initialize) {

	var summaryRequest = "{}";
	if(!initialize){
		summaryRequest = JSON.stringify({
			"fromDate" : $('#fromDate').val(),
			"toDate" : $('#toDate').val()
		});
	}
	
	doAjaxWithArgAndReturn("weekWiseSummary", "POST", summaryRequest, function(content) {
		cleanAllReport();
		$("#weekWiseSummary").html(content.message);
		$("#weekWiseSummary").slideDown();
		$('#weekWiseSummary-report-table').DataTable({
			"order" : [ [ 0, "desc" ] ]
		});
		$("#fromDate").datetimepicker({
			format : "ddd, DD MMM YYYY hh:mm a"
		});
		$("#toDate").datetimepicker({
			format : "ddd, DD MMM YYYY hh:mm a"
		});
	});
	
}

function monthWiseSummary(initialize) {

	var summaryRequest = "{}";
	if(!initialize){
		summaryRequest = JSON.stringify({
			"fromDate" : $('#fromDate').val(),
			"toDate" : $('#toDate').val()
		});
	}
	
	doAjaxWithArgAndReturn("monthWiseSummary", "POST", summaryRequest, function(content) {
		cleanAllReport();
		$("#monthWiseSummary").html(content.message);
		$("#monthWiseSummary").slideDown();
		$('#monthWiseSummary-report-table').DataTable({
			"order" : [ [ 0, "desc" ] ]
		});
		$("#fromDate").datetimepicker({
			format : "ddd, DD MMM YYYY hh:mm a"
		});
		$("#toDate").datetimepicker({
			format : "ddd, DD MMM YYYY hh:mm a"
		});
	});
	
}

function yearWiseSummary(initialize) {

	var summaryRequest = "{}";
	if(!initialize){
		summaryRequest = JSON.stringify({
			"fromDate" : $('#fromDate').val(),
			"toDate" : $('#toDate').val()
		});
	}
	
	doAjaxWithArgAndReturn("yearWiseSummary", "POST", summaryRequest, function(content) {
		cleanAllReport();
		$("#yearWiseSummary").html(content.message);
		$("#yearWiseSummary").slideDown();
		$('#yearWiseSummary-report-table').DataTable({
			"order" : [ [ 0, "desc" ] ]
		});
		$("#fromDate").datetimepicker({
			format : "ddd, DD MMM YYYY hh:mm a"
		});
		$("#toDate").datetimepicker({
			format : "ddd, DD MMM YYYY hh:mm a"
		});
	});
	
}
