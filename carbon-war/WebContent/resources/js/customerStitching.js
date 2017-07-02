function loadCustomerStitchingDetails(id) {
	var customerStitching = JSON.stringify({
		"id" : id
	});
	
	doAjaxWithArgAndReturn("viewCustomerStitching", "post", customerStitching, function(content) {
		$("#customerStitching-content").html("");
		$("#customerStitching-content").html(content.message);
		$("#customerStitching-content").slideDown();
	});
}

function deleteCustomerStitching(id, custId) {
	$("#customerStitching-content").html("");
	var customerStitching = JSON.stringify({
		"id" : id
	});
	doAjaxWithArgAndReturn("deleteCustomerStitching", "POST", customerStitching, function(content) {
		if (content.ackType=="Success") {
			showSuccessMgs("CustomerStitching information deleted successfully");
			loadCustomerStitchingPage(custId);
		} else {
			showErrorMgs("Unable to Delete CustomerStitching. CustomerStitching Mapped with some invoice");
			loadCustomerStitchingPage(custId);
		}
	});
}

function loadCustomerStitchingPage(custId) {
	try {
		$("#customerStitching-content").html("");
		doAjaxWithReturn("loadAllCustomerStitching/"+custId, "POST", function(content) {
			$("#customerStitching-content").html(content.message);
			$("#customerStitching-content").attr("isLoaded", true);
			$("#customerStitching-content").slideDown();
			$('#customerStitching-table').DataTable({
				"order" : [ [ 0, "desc" ] ]
			});
		});
			
	} catch (e) {
		showErrorMgs(" Error: " + e.message);
	}
}

function loadAddEditCustomerStitching(id, custId) {
	$("#customerStitching-content").html("");
	var customerStitching = JSON.stringify({
		"id" : id,
		"custId": custId
	});
	doAjaxWithArgAndReturn("loadAddEditCustomerStitching", "POST", customerStitching, function(content) {
		$("#customerStitching-content").html(content.message);
		$("#customerStitching-content").slideDown();
		$('#stitchingType').on('change', function (e) {
			pickStitching($("#stitchingType").val());
			$('#cust-stitch-name').val($('#stitchingType').find(":selected").text());
		});
		if($('#cust-stitch-name').val()==""){
			$('#cust-stitch-name').val($('#stitchingType').find(":selected").text());
		}
		pickStitching($("#stitchingType").val());
	});
}

function saveCustomerStitching(isFromOrder) {
	try {
		
		var data = JSON.parse($('#stitchingTypeList').val().trim());
		var stitch = JSON.parse(data[$("#stitchingType").val()]);
		var len = Object.keys(stitch).length;
		
		var list = [];
		for(i=1;i<=len;i++){
			
			if($('#csm_'+i).val()==undefined){
				choice = "";
				$('input[name=csm_'+i+']:checkbox:checked').each(function() {
					choice = choice + $(this).val() + ";";
				});
				list.push(choice);
			} else {
				list.push($('#csm_'+i).val());
			}
		}
		
		var customerStitching = JSON.stringify({
			"id" : $("#cust-stitch-id").val(),
			"custId" : $("#custId").val(),
			"stitchingTypeTO" : { "id": $("#stitchingType").val() },
			"remarks" : $("#remarks").val(),
			"col01" : list[0],
			"col02" : list[1],
			"col03" : list[2],
			"col04" : list[3],
			"col05" : list[4],
			"col06" : list[5],
			"col07" : list[6],
			"col08" : list[7],
			"col09" : list[8],
			"col10" : list[9],
			"col11" : list[10],
			"col12" : list[11],
			"col13" : list[12],
			"col14" : list[13],
			"col15" : list[14],
			"col16" : list[15],
			"col17" : list[16],
			"col18" : list[17],
			"col19" : list[18],
			"col20" : list[19],
			"name"  : $('#cust-stitch-name').val()
		});
		if($("#stitchingType").val().trim()==""){
			showErrorMgs("stitchingType is Needed, Kindly specify");
			window.scrollTo(0, 0);
			return;
		}
		doAjaxWithArgAndReturn("saveCustomerStitching", "POST", customerStitching, function(content) {
			showSuccessMgs("CustomerStitching information saved successfully");
			if(isFromOrder){
				custStitchPostAdd();
			} else {
				loadCustomerStitchingPage($("#custId").val());
			}
		});
		
	} catch (e) {
		showErrorMgs("Error save customerStitching: " + e.message);
	}
}

function pickStitching(type){
	if(type==undefined){
		return true;
	}
	if($('#stitchingTypeId').val().trim()==type){
		return true;
	}
	var data = JSON.parse($('#stitchingTypeList').val().trim());
	//$('#customerStitching').val();
	var stitch = JSON.parse(data[type]);
	var len = Object.keys(stitch).length;
	j=1;
	$('#div-cs').html('');
	var id=1;
	for (var key in stitch){
	   var attrName = key;
	   var attrValue = stitch[key];
	   if(attrValue==""){
		   console.log("single" + attrName);  
		   $('#div-cs').append("<div class='form-group col-md-2' >"+
		   "<label id='lbl-col01'>"+attrName+"</label> <input id='csm_"+id+"' type='text'"+ 
		   "class='form-control'></div>");
	   } else {
		   console.log("multiple" + attrName);		   
		   var params = attrValue.split(';');
		   var list = "<div class='form-group col-md-4'><label id='lbl-col01' >"+attrName+"</label><div class='btn-group' data-toggle='buttons'>";
		   for (var i = 0; i < params.length; i++) {
			   list = list + "<label class='btn btn-primary'><input name='csm_"+id+"' value='"+params[i]+"' type='checkbox'>"+params[i]+"</label>";  
		   }
		   $('#div-cs').append(list+"</div></div>");
	   }
	   id=id+1;
	}
}

/*
<div id="all" class="btn btn-default"> New <button type="submit" style="display: none;" onclick="loadCustomerPage(0);" class="btn btn-info"><i class="fa fa-plus"></i></button></div>

$(document).ready(function () {
                $(document).on('mouseenter', '#all', function () {
                    $(this).find(":button").show();
                }).on('mouseleave', '#all', function () {
                    $(this).find(":button").hide();
                });
            });*/