function resetExpense(){
	$("#fromDate").val("");
	$("#toDate").val("");
	loadExpensePage();
}

function loadExpenseDetails(id) {
	var expense = JSON.stringify({
		"id" : id
	});
	
	doAjaxWithArgAndReturn("viewExpense", "post", expense, function(content) {
		hideAll();
		$("#dynamic-content").html(content.message);
		$("#dynamic-content").slideDown();
	});
}

function deleteExpense(id) {
	hideAll();
	var expense = JSON.stringify({
		"id" : id
	});
	doAjaxWithArgAndReturn("deleteExpense", "POST", expense, function(content) {
		if (content.ackType=="Success") {
			showSuccessMgs("Expense information deleted successfully");
			loadExpensePage(true);
		} else {
			showErrorMgs("Unable to Delete Expense. Expense Mapped with some invoice");
			loadExpensePage(true);
		}
	});
}

function loadExpensePage() {
	try {
		hideAll();
		var expense = JSON.stringify({
			"fromDate" : $("#fromDate").val(),
			"toDate" :$("#toDate").val()
		});
		doAjaxWithArgAndReturn("loadAllExpense", "POST", expense, function(content) {
			$("#expense-content").html(content.message);
			$("#expense-content").attr("isLoaded", true);
			$("#expense-content").slideDown();
			$('#expense-table').DataTable({
				"order" : [ [ 0, "desc" ] ]
			});
			$("#fromDate").datetimepicker({
				format : "ddd, DD MMM YYYY hh:mm a"
			});
			$("#toDate").datetimepicker({
				format : "ddd, DD MMM YYYY hh:mm a"
			});
			
			
		});
			
	} catch (e) {
		showErrorMgs(" Error: " + e.message);
	}
}

function loadAddEditExpense(id) {
	hideAll();
	var expense = JSON.stringify({
		"id" : id
	});
	doAjaxWithArgAndReturn("loadAddEditExpense", "POST", expense, function(content) {
		$("#dynamic-content").html(content.message);
		$("#dynamic-content").slideDown();
	});
}

function saveExpense() {
	try {
		var expense = JSON.stringify({
			"id" : $("#id").val(),
			"type" : $("#type").val(),
			"amount" : $("#amount").val(),
			"description" : $("#description").val(),
			"paymentMode" : $("#paymentMode").val()
			});
		if($("#type").val().trim()==""){
			showErrorMgs("Type is Needed, Kindly specify");
			window.scrollTo(0, 0);
			return;
		}
		if($("#amount").val().trim()==""){
			showErrorMgs("Amount is Needed, Kindly specify");
			window.scrollTo(0, 0);
			return;
		}
		doAjaxWithArgAndReturn("saveExpense", "POST", expense, function(content) {
			showSuccessMgs("Expense information saved successfully");
			loadExpensePage();
		});
		
	} catch (e) {
		showErrorMgs("Error save expense: " + e.message);
	}
}


