function loadCustomerDetails(id) {
	var customer = JSON.stringify({
		"id" : id
	});
	
	doAjaxWithArgAndReturn("viewCustomer", "post", customer, function(content) {
		hideAll();
		$("#dynamic-content").html(content.message);
		$("#dynamic-content").slideDown();
		loadCustomerStitchingPage(id);
	});
}

function deleteCustomer(id) {
	hideAll();
	var customer = JSON.stringify({
		"id" : id
	});
	doAjaxWithArgAndReturn("deleteCustomer", "POST", customer, function(content) {
		if (content.ackType=="Success") {
			showSuccessMgs("Customer information deleted successfully");
			loadCustomerPage(true);
		} else {
			showErrorMgs("Unable to Delete Customer. Customer Mapped with some invoice");
			loadCustomerPage(true);
		}
	});
}

function loadCustomerPage() {
	try {
		hideAll();
		doAjaxWithArgAndReturn("loadAllCustomer", "POST", "{}", function(content) {
			$("#customer-content").html(content.message);
			$("#customer-content").attr("isLoaded", true);
			$("#customer-content").slideDown();
			searchCustomer();
		});
	} catch (e) {
		showErrorMgs(" Error: " + e.message);
	}
}

function searchCustomer() {
	try {
		var customer = JSON.stringify({
			"mobile" : $('#mobile').val(),
			"name" : $('#name').val()
		});
		$("#customer-pagination").html("");
		doAjaxWithArgAndReturn("searchCustomer", "POST", customer, function(content) {
			$("#customer-pagination").html(content.message);
			$("#customer-pagination").slideDown();
			$('#customer-table').DataTable({
				"order" : [ [ 0, "desc" ] ]
			});
		});
	} catch (e) {
		showErrorMgs(" Error: " + e.message);
	}
}

function loadAddEditCustomer(id) {
	hideAll();
	var customer = JSON.stringify({
		"id" : id
	});
	doAjaxWithArgAndReturn("loadAddEditCustomer", "POST", customer, function(content) {
		$("#dynamic-content").html(content.message);
		$("#dynamic-content").slideDown();
		$('#dob').datetimepicker({
			format : "ddd, DD MMM YYYY hh:mm a"
		});
	});
}

function loadAddEditCustomerImage(id) {
	hideAll();
	var customer = JSON.stringify({
		"id" : id
	});
	doAjaxWithArgAndReturn("loadAddEditCustomerImage", "POST", customer, function(content) {
		$("#dynamic-content").html(content.message);
		$("#dynamic-content").slideDown();
	});
}

function saveCustomer(isFromOrder) {
	try {
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
		var mobile = $("#mobile").val();
		var customer = JSON.stringify({
			"id" : $("#id").val(),
			"name" : $("#name").val(),
			"email" : $("#email").val(),
			"mobile" : $("#mobile").val(),
			"dob" :$('#dob').val().trim(),
			"type" : $('input[name=type]:checked').val(),
			"source" :  $('input[name=source]:checked').val()
		});
		doAjaxWithArgAndReturn("saveCustomer", "POST", customer, function(content) {
			if(content.ackType == "Success"){
				if(isFromOrder){
					$('#ord_pick_cust_id a').click();
					$('#custNumber').val(mobile);
					searchCustomerForOrder();
					selectedCustomer();
				} else {
					loadCustomerDetails(content.object);
				}
				showSuccessMgs(content.message);
			} else {
				showErrorMgs(content.message);
			}
		});
		
	} catch (e) {
		showErrorMgs("Error save customer: " + e.message);
	}
}


function displayCustFilter(){
	if($('#cust-filter-div').is(":visible")){
		$('#cust-filter-div').hide();
	} else {
		$('#cust-filter-div').show();
		jQuery('#cust-filter-div').slideDown();
	}
}

function resetCust(){
	$('#name').val("");
	$('#mobile').val("");
	if($('#orderNo').is(":visible")){
		$('#orderNo').val("");
	}
	if($('#orderStatusId').is(":visible")){
		$('#orderStatusId').val(0);
	}
	searchCustomer();
}

function addOrder(custId, mobile){
	loadAddEditOrderInfo();
	$('#custNumber').val(mobile);
	fetchItem();
	//loadCustStitchingDetails(custId);
}
