function loadClientPage() {
	try {
		var phone = $('#phoneNumber').val();
		var custId = $('#custId').val();
		window.location="/appyTailor/c/"+phone+"/"+custId;
		/*date = $('#date').val();
		status = $('#orderStatusId').val();
		var phone = $('#phoneNumber').val();
		var orderInfo = JSON.stringify({
			"number" : $('#orderNo').val(),
			"customerTO" : {"mobile" : phone},
			"estimatedDate" : date,
			"status" : status
		});
		$("#customer-content").html('');
		doAjaxWithArgAndReturn("c/"+phone+"/orderInfo", "POST", orderInfo, function(
				content) {
			$("#customer-content").html(content.message);
			$("#customer-content").attr("isLoaded", true);
			$("#customer-content").slideDown();
			$('#orderInfo-table').DataTable({
				"order" : [ [ 0, "desc" ] ]
			});
			$('#date').datetimepicker({
				format : "ddd, DD MMM YYYY hh:mm a"
			});
		});*/

	} catch (e) {
		showErrorMgs(" Error: " + e.message);
	}
}

function loadCustOrderInfoPage(custId, orderId) {
	$("#customer-content").html('');
	var orderInfo = JSON.stringify({
		"id" : orderId,
		"custId" : custId
	});
	$("#customer-content").html('');
	doAjaxWithArgAndReturn("c/"+custId+"/"+orderId+"/orderInfo", "POST", orderInfo, function(
			content) {
		$("#customer-content").html(content.message);
		$("#customer-content").attr("isLoaded", true);
		$("#customer-content").slideDown();
	});
}

function submitReview(custId, orderId){
	var review = JSON.stringify({
		"orderInfoTO" : { "id" : orderId},
		"rating": $("#rateYo").rateYo("rating"),
		"comments": $('#comments').val(),
		"custId" : custId,
		"id":$('#reviewId').val()
	});
	doAjaxWithArgAndReturn("c/"+custId+"/"+orderId+"/review", "POST", review, function(
			content) {
		if(content.ackType=="Success"){
			showSuccessMgs("Review submitted successfully");
			loadCustOrderInfoPage(custId, orderId);
		}
	});
}

function custPointDetails(){
	$('#custPointsTable').toggle();
}


function updateOrder() {
	try {
		if(!$('#agree').is(':checked')){
			showErrorMgs("Please acknowledge");
			return;
		}
		var order = JSON.stringify({
			"custId" : $("#custId").val(),
			"id" : $("#id").val()
		});
		doAjaxWithArgAndReturn("c/updateOrder", "POST", order, function(content) {
			showSuccessMgs(content.message);
			loadCustOrderInfoPage($("#custId").val(), $("#id").val());
		});
		
	} catch (e) {
		showErrorMgs("Error save customer: " + e.message);
	}
}

function loadTailorPage() {
	var tailorId = $('#tailorId').val();
	var orderNo = $('#orderNo').val();
	window.location="/appyTailor/t/"+tailorId+"/"+orderNo;
}

function loadTailorOrderInfoPage() {
	var tailorId = $('#tailorId').val();
	var orderNo = $('#orderNo').val();
	window.location="/appyTailor/t/"+tailorId+"/"+orderNo+"/info";
}

function printTailorStitchingInfo(orderId){
	var la = JSON.stringify({
		"id" : orderId
	});
	
	doAjaxWithArgAndReturn("/t/printStitchingInfo","post", la, function(data){
		print(data.message);
	});	
}

function loadTailorOrderPage(orderId){
	var la = JSON.stringify({
		"id" : orderId
	});
	$('#tailor-content').html("");
	doAjaxWithArgAndReturn("/t/printStitchingInfo","post", la, function(data){
		$('#tailor-content').html(data.message);
	});	
}
