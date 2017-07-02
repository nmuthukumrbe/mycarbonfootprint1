function loadStitchingTypeDetails(id) {
	var StitchingType = JSON.stringify({
		"id" : id
	});
	
	doAjaxWithArgAndReturn("viewStitchingType", "post", StitchingType, function(content) {
		hideAll();
		$("#dynamic-content").html(content.message);
		$("#dynamic-content").slideDown();
		loadStitchingTypeDetailPage(id);
	});
}

function deleteStitchingType(id) {
	hideAll();
	var StitchingType = JSON.stringify({
		"id" : id
	});
	doAjaxWithArgAndReturn("deleteStitchingType", "POST", StitchingType, function(content) {
		if (content.ackType=="Success") {
			showSuccessMgs("StitchingType information deleted successfully");
			loadStitchingTypePage(true);
		} else {
			showErrorMgs("Unable to Delete StitchingType. StitchingType Mapped with some invoice");
			loadStitchingTypePage(true);
		}
	});
}

function loadStitchingTypePage() {
	try {
		hideAll();
		doAjaxWithReturn("loadAllStitchingType", "POST", function(content) {
			$("#StitchingType-content").html(content.message);
			$("#StitchingType-content").attr("isLoaded", true);
			$("#StitchingType-content").slideDown();
			$('#stitchingType-table').DataTable({
				"order" : [ [ 0, "desc" ] ]
			});
		});
			
	} catch (e) {
		showErrorMgs(" Error: " + e.message);
	}
}

function loadAddEditStitchingType(id) {
	hideAll();
	var customer = JSON.stringify({
		"id" : id
	});
	doAjaxWithArgAndReturn("loadAddEditStitchingType", "POST", customer, function(content) {
		$("#dynamic-content").html(content.message);
		$("#dynamic-content").slideDown();
		$("input[id=price]").keyup(function(event){
			calculatePoints();
	    	return true;
		});
		//initializeButAction();
	});
}

function calculatePoints(){
	var discountPercentage = ($('#price').val()/100)*$('#POINTS_DISCOUNT_JOB_TYPE_PERCENTAGE').val();
	var discountPoints = discountPercentage*$('#POINTS_TO_1_RUPEE').val();
	$('#discountAmount').val(discountPercentage);
	$('#discountPoints').val(discountPoints);
}

function saveStitchingType() {
	try {
		var StitchingType = JSON.stringify({
			"id" : $("#id").val(),
			"name" : $("#name").val(),
			"price" : $('#price').val(),
			"points" : $('#discountPoints').val(),
		});
	
		if($("#name").val().trim()==""){
			showErrorMgs("Amount is Needed, Kindly specify");
			window.scrollTo(0, 0);
			return;
		}
		
		doAjaxWithArgAndReturn("saveStitchingType", "POST", StitchingType, function(content) {
			showSuccessMgs("StitchingType information saved successfully");
			loadStitchingTypePage();
		});
		
	} catch (e) {
		showErrorMgs("Error save StitchingType: " + e.message);
	}
}

function addChoice(){
	
	$("#stitchTable").append("<tr class='form-group col-md-3'><td><input type='text' class='form-control' name='choice' placeholder='choice'></td>" +
			"<td onclick='removeChoice(this)''><a class='btn btn-info btn-sm'><i class='fa fa-remove'></i></a></td></tr>");
	initializeButAction();
	
}

function removeChoice(that){
	$(that).closest("tr").remove();
	$("input[name=choice]").focus();
}

function initializeButAction(){
	$("input[name=choice]").off();
	$("input[name=choice]").keyup(function(event){
		if(event.keyCode == 46){
			//Delete
			removeChoice(this);
			return true;
		}
		if(event.keyCode == 13){
			//Enter
			addChoice();
			return true;
	    }
	});	
	$("input[name=choice]").focus();
}

function loadStitchingTypeDetailPage(stitchingTypeId) {
	try {
		var stitchingTypeDetail = JSON.stringify({
			"stitchingTypeId" : stitchingTypeId
		});
		
		$('#stitching-type-detail-content').html("");
		
		doAjaxWithArgAndReturn("loadAllStitchingTypeDetail", "POST",stitchingTypeDetail, function(content) {
			$('#stitching-type-detail-content').html(content.message);
			$('#stitching-type-detail-content').attr("isLoaded", true);
			$('#stitching-type-detail-content').slideDown();
			$('#stitchingTypeDetail-table').DataTable({
				"order" : [ [ 0, "desc" ] ]
			});
		});
			
	} catch (e) {
		showErrorMgs(" Error: " + e.message);
	}
}

function saveStitchingTypeDetail() {
	try {
		
		var choices="";
		
		if($('#typeDetailId').val()==2){
			
			for(i=0;i<$('input[name=choice]').size();i++){
				choices = choices + $('input[name=choice]')[i].value
				if(i+1!=$('input[name=choice]').size()){
					choices = choices + ";";
				}
			}
			//Multi choice option
			if(choices.trim()==""){
				showErrorMgs("choice is Needed, Kindly specify");
				window.scrollTo(0, 0);
				return;
			}
		}
		
		
		var stitchingTypeId = $("#stitchingTypeId").val();
		var stitchingTypeDetail = JSON.stringify({
			"id" : $("#id").val(),
			"stitchingTypeId" : stitchingTypeId,
			"name" : $("#name").val(),
			"typeDetailId" : $('#typeDetailId').val(),
			"choice" : choices,
		});
	
		if($("#name").val().trim()==""){
			showErrorMgs("Name is Needed, Kindly specify");
			window.scrollTo(0, 0);
			return;
		}
		
		doAjaxWithArgAndReturn("saveStitchingTypeDetail", "POST", stitchingTypeDetail, function(content) {
			showSuccessMgs("saveStitchingTypeDetail information saved successfully");
			loadStitchingTypeDetailPage(stitchingTypeId);
		});
		
	} catch (e) {
		showErrorMgs("Error save StitchingType: " + e.message);
	}
}

function deleteStitchingTypeDetail(id) {
	var stitchingTypeDetail = JSON.stringify({
		"id" : id
	});
	doAjaxWithArgAndReturn("deleteStitchingTypeDetail", "POST", stitchingTypeDetail, function(content) {
		if (content.ackType=="Success") {
			showSuccessMgs("StitchingTypeDetail information deleted successfully");
			loadStitchingTypePage(true);
		} else {
			showErrorMgs("Unable to Delete StitchingTypeDetail");
			loadStitchingTypePage(true);
		}
	});
}

function loadAddEditStitchingTypeDetail(id) {
	var stitchingTypeId = $("#stitchingTypeId").val();
	var stitchingTypeDetail = JSON.stringify({
		"id" : id,
		"stitchingTypeId" : stitchingTypeId
	});
	$('#stitching-type-detail-content').html("");
	doAjaxWithArgAndReturn("loadAddEditStitchingTypeDetail", "POST", stitchingTypeDetail, function(content) {
		$('#stitching-type-detail-content').html(content.message);
		$('#stitching-type-detail-content').slideDown();
		stitchingTypeDetailOnload();
	});
}

function stitchingTypeDetailOnload(){
	$('#typeDetailId').change(function()
	{
		/* setting currently changed option value to option variable */
		var option = $(this).find('option:selected').val();
		/* setting input box value to selected option value */
		if(option==1){
			$('#choice-div').hide();
		} else {
			$('#choice-div').show();
		}
	});
	if($('#typeDetailId').val()==1){
		$('#choice-div').hide();
	} else {
		$('#choice-div').show();
	}
	initializeButAction();
}

function viewStitchingTypeDetail(id) {
	var stitchingTypeDetail = JSON.stringify({
		"id" : id
	});
	$('#stitching-type-detail-content').html("");
	doAjaxWithArgAndReturn("viewStitchingTypeDetail", "post", stitchingTypeDetail, function(content) {
		$('#stitching-type-detail-content').html(content.message);
		$('#stitching-type-detail-content').slideDown();
	});
}
