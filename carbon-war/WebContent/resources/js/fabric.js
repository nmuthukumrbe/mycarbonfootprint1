function loadFabricDetails(id) {
	var fabric = JSON.stringify({
		"id" : id
	});

	doAjaxWithArgAndReturn("viewFabric", "post", fabric, function(content) {
		hideAll();
		$("#dynamic-content").html(content.message);
		$("#dynamic-content").slideDown();
		loadItemHistory(id);
	});
}

function loadItemHistory(id){
	
	var fabric = JSON.stringify({
		"id" : id
	});
	$('#item-histroy').html("");
	doAjaxWithArgAndReturn("getFabricHistory", "POST", fabric, function(content) {
		if (content.ackType == "Success") {
			$('#item-histroy').html(content.message);
			$('#item-history-table').DataTable({
				"order" : [ [ 0, "desc" ] ]
			});
		} 
	});
}

function deleteFabric(id) {
	hideAll();
	var fabric = JSON.stringify({
		"id" : id
	});
	doAjaxWithArgAndReturn("deleteFabric", "POST", fabric, function(content) {
		if (content.ackType == "Success") {
			showSuccessMgs("fabric information deleted successfully");
		} else {
			showErrorMgs("Unable to Delete fabric. Mapped with some invoice");
		}

		loadFabricPage();
	});

}

function loadFabricPage() {
	try {
		var fabric = JSON.stringify({
			"materialCode" : $('#m_materialCode').val()
		});
		hideAll();
		doAjaxWithArgAndReturn("loadAllFabric", "POST", fabric, function(
				content) {
			$("#fabric-content").html(content.message);
			$("#fabric-content").attr("isLoaded", true);
			$("#fabric-content").slideDown();
			$('#fabric-table').DataTable({
				"order" : [ [ 0, "desc" ] ]
			});
		});

	} catch (e) {
		showErrorMgs(" Error: " + e.message);
	}
}

function loadAddEditFabric(id) {
	hideAll();
	var fabric = JSON.stringify({
		"id" : id,
		"materialCode" : $('#materialCode').val()

	});
	doAjaxWithArgAndReturn("loadAddEditFabric", "POST", fabric, function(
			content) {
		$("#dynamic-content").html(content.message);
		$("#dynamic-content").slideDown();

	});
}

function saveFabric() {
	try {
		if($("#materialCode").val().trim()==""){
			showErrorMgs("Material Code is Needed, Kindly specify");
			window.scrollTo(0, 0);
			return;
		}
		if($("#price").val().trim()==""){
			showErrorMgs("Price is Needed, Kindly specify");
			window.scrollTo(0, 0);
			return;
		}
		if($("#quantity").val().trim()==""){
			showErrorMgs("Quantity is Needed, Kindly specify");
			window.scrollTo(0, 0);
			return;
		}
		var fabric = JSON.stringify({
			"id" : $("#id").val(),
			"materialCode" : $('#materialCode').val(),
			"price" : $('#price').val(),
			"quantity" : $('#quantity').val(),
			"vat" : $('#vat').val()
		});
		doAjaxWithArgAndReturn("saveFabric", "POST", fabric, function(content) {
			showSuccessMgs("fabric information saved successfully");
			loadFabricPage();
		});
	} catch (e) {
		showErrorMgs("Error save fabric: " + e.message);
	}
}

function resetField1() {
	if ($('#m_materialCode').is(":visible")) {
		$('#m_materialCode').val("");
	}
	loadFabricPage();
}
