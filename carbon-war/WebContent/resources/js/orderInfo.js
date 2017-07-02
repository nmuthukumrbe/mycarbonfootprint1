function resetOrder(){
	$('#name').val("");
	$('#mobile').val("");
	$('#date').val("");
	if($('#orderNo').is(":visible")){
		$('#orderNo').val("");
	}
	if($('#orderStatusId').is(":visible")){
		$('#orderStatusId').val(0);
	}
	loadOrderInfoPage();
}

function loadOrderInfoDetails(id) {
	hideAll();
	var orderInfo = JSON.stringify({
		"id" : id
	});
	
	doAjaxWithArgAndReturn("viewOrderInfo", "post", orderInfo, function(content) {
		$("#dynamic-content").html(content.message);
		$("#dynamic-content").slideDown();
		$('#order-history-table').DataTable({
			"order" : [ [ 0, "desc" ] ]
		});
	});
}

function deleteOrderInfo(id) {
	hideAll();
	var orderInfo = JSON.stringify({
		"id" : id
	});
	doAjaxWithArgAndReturn("deleteOrderInfo", "POST", orderInfo, function(content) {
		if (content.ackType=="Success") {
			showSuccessMgs("OrderInfo information deleted successfully");
			loadOrderInfoPage(true);
		}
	});
}

function loadOrderInfoPage(date, status) {
	try {
		if(date==undefined || date == false){
			date = $('#date').val();
		}
		if(status==undefined){
			status = $('#orderStatusId').val();
		}
		var orderInfo = JSON.stringify({
			"number": $('#orderNo').val(),
			"customerTO": { "mobile" :  $('#mobile').val() },
			"estimatedDate": date,
			"status" : status
			/*"fromDate" : $('#fromDate').val(),
			"toDate" : $('#toDate').val()*/
		});
		hideAll();
		doAjaxWithArgAndReturn("loadAllOrderInfo", "POST", orderInfo, function(content) {
			$("#orderInfo-content").html(content.message);
			$("#orderInfo-content").attr("isLoaded", true);
			$("#orderInfo-content").slideDown();
			$('#orderInfo-table').DataTable({
				"order" : [ [ 0, "desc" ] ]
			});
			$('#date').datetimepicker({
				format : "ddd, DD MMM YYYY hh:mm a"
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

function loadAddEditOrderInfo(id) {
	hideAll();
	var orderInfo = JSON.stringify({
		"id" : id
	});
	doAjaxWithArgAndReturn("loadAddEditOrderInfo", "POST", orderInfo, function(content) {
		$("#orderInfo-content").html(content.message);
		$("#orderInfo-content").attr("isLoaded", true);
		$("#orderInfo-content").slideDown();
		orderOnLoad();
	});
}

/*function initializeOrderButAction(){
	
	$("input[id=custNumber]").keyup(function(event){
		if(event.keyCode == 13){
			//Enter
	    	fetchItem();
	    	return true;
	    }
	});
	
	fetchItem();
	
}*/

function fetchItem(){
	var custRequest = {};
	custRequest.mobile = $('#custNumber').val();
	custRequest.name = $('#custName').val();
	var data = JSON.stringify(custRequest);
	var url = "pickCustomer";
	doAjaxWithArgAndReturn(url, "post", data, function(responseData) {
		if (responseData.ackType == "Success") {
			
			$("#cust-selection-content").html(responseData.message);
			$('input[name=cust-id]:first').attr('checked', true);
			$("input[name=cust-id]").keyup(function(event){
				if(event.keyCode == 13){
					//Enter
					selectedCustomer();
			    }
			});
			//G_currentDialog.close();
		} else {
			setErrorMessage(responseData.message); 
		}
	});
}

function selectedCustomer(){
	
	if($('input[name=cust-id]:checked').val()==undefined){
		showErrorMgs("Select Customer");
		return;
	}
	var id = $('input[name=cust-id]:checked').attr('meta-id');
	var name = $('input[name=cust-id]:checked').attr('meta-name');
	var number = $('input[name=cust-id]:checked').attr('meta-mobile');
	$('#custId').val(id);
	$('#custName').val(name);
	$('#custNumber').val(number);
	$("#cust-selection-content").html("");
	loadOrderJobForCust(id, $('#id').val());
	getCustSitchPanel(id);
	activaTab('order');
}

function loadCustStitchingDetails(id){
	$('#ord_add_cust').hide();
	var orderInfo = {};
	var custRequest = {};
	if(id > 0){
		custRequest.id = id;
	} else {
		custRequest.id = parseInt($('#custId').val());
	}
	orderInfo.id = parseInt($('#id').val());
	orderInfo.customerTO = custRequest; 
	var data = JSON.stringify(orderInfo);
	var url = "getCustomerStitchingDetails";
	doAjaxWithArgAndReturn(url, "post", data, function(responseData) {
		if (responseData.ackType == "Success") {
			$("#cust-order-details").html(responseData.message);
			initializeFabricAction();
			$("#estimatedDate").datetimepicker({
				format : "ddd, DD MMM YYYY hh:mm a"
			});
			$("#trailDate").datetimepicker({
				format : "ddd, DD MMM YYYY hh:mm a"
			});
			$('#expressDelivery').change(function(){
				if($('#expressDelivery').is(":checked")){
					$('#estimatedDate').val($('#EXPRESS_DELIVERY_DAY').val());
					$('#expressChrages').removeAttr('disabled');
					updateTotal();
				} else {
					$('#estimatedDate').val($('#AUTO_DELIVERY_DAY').val())
					$('#expressChrages').attr('disabled','disabled');
					updateTotal();
				}
			});
			$('#expressChrages').keyup(function(){
				updateTotal();
			});
			$('#cust-talilor-job input[name=rate]').keyup(function(){
				updateTotal();
			});
			$('#fabric-job input[name=quantity]').keyup(function(){
				updateTotal();
			});
			$('#fabric-job input[name=rate]').keyup(function(){
				updateTotal();
			});
			$('#ord_g_a').html(parseInt($('#orginalPayment').val()));
			$('#orginalPayment').keyup(function(){
				$('#ord_g_a').html(parseInt($('#orginalPayment').val()));
				updateTotal();
			});
			$('#orginalPayment').keyup(function(){
				$('#ord_g_a').html(parseInt($('#orginalPayment').val()));
				updateTotal();
			});
			$('#redeemPoints').keyup(function(){
				if($('#redeemPoints').val()<=$('#availablePoints').val()){
					updateTotal();
				} else {
					$('#redeemPoints').val(0);
				}
			});
			
			$('#discAmount').keyup(function(){
				if(parseInt($('#ord_tot_af_v').html())<parseInt($('#discAmount').val().trim())){
					$('#discAmount').val(0);
				} 
				updateTotal();
			});
			var order_status_id=0;
			for(i=1;i<=8;i++){
				if($('#sc-'+i).is(':checked')){
					order_status_id = i;
					break;
				}
			}
			if(order_status_id==0){
				$('#sc-1').prop('checked', true);
			}
		} else {
			setErrorMessage(responseData.message); 
		}
		updateTotal();
	});
}


var parentThat;

function pickItem_Popup(number, that){
	var content = "";
	parentThat = that;
	content += "<div id='msgContainer'></div>";
	content += "<div class='form-group has-feedback'>";
	content += "<label>Customer number </label>";
	content += "<input id='cust-number' type='text' value='" + number + "' class='form-control' placeholder='Customer Number' /> ";
	content += "</div>";
	content += "<div id='items-tab'>";
	content += "</div>";
	return content;
}

function validateOrder(navigation){
	/*if($("#remarks").val()==""){
		showErrorMgs("Remarks Information is Needed, Kindly specify");
		window.scrollTo(0, 0);
		return false;
	}*/
	if($("input[id=orginalPayment]").val()==""){
		showErrorMgs("Original Payment is Needed, Kindly specify");
		window.scrollTo(0, 0);
		return false;
	}
	if($("input[id=estimatedDate]").val()==""){
		showErrorMgs("Estimated Date is Needed, Kindly specify");
		window.scrollTo(0, 0);
		return false;
	}
	/*if($("input[id=trailDate]").val()==""){
		showErrorMgs("Trail Date is Needed, Kindly specify");
		window.scrollTo(0, 0);
		return false;
	}*/
	/*if($('#tailorId').val()==null){
		showErrorMgs("Tailor Information is Needed, Kindly specify");
		window.scrollTo(0, 0);
		return false;
	}*/
	if(navigation){
		activaTab('ord_status');
	}
	return true;
}

function saveOrderInfo() {
	try {
		
		if($('#custId').val()==null || $('#custId').val()==0){
			showErrorMgs("Customer selection is Needed, Kindly select it");
			window.scrollTo(0, 0);
			return;
		}
		if(!validateOrder(false)){
			return;
		}
		var jobTypeOrderDetailList = [];
		$('#cust-talilor-job tr').each(function() {
			$this = $(this);
			var cust_stitch_id = $this.find("input[id=cust-stitch-id]").val();
			if (cust_stitch_id == undefined)
				return true;
			jobTypeOrderDetailList.push({
				"quantity" : 1,
				"price": $this.find("input[name=rate]").val(),
				"total": $this.find("input[name=rate]").val(),
				"customerStitching": cust_stitch_id,
				"points": $this.find("td#points").html(),
				"id": $this.find("input[name=id]").val()
			});	
		});
		
		var fabricOrderDetailList = [];
		$('#fabric-job tr').each(function() {
			$this = $(this);			
			id = 0;
			if($this.find("input[name=id]").val()){
				id = $this.find("input[name=id]").val()
			}
			if($this.find("input[name=fabric_id]").val()!=undefined && $this.find("input[name=fabric_id]").val()!=""){
				fabricOrderDetailList.push({
					"fabricId": $this.find("input[name=fabric_id]").val(),
					"fabricNumber": $this.find("input[name=code]").val(),
					"quantity": $this.find("input[name=quantity]").val(),
					"price": $this.find("input[name=rate]").val(),
					"total": $this.find("td#total").html(),
					"points": $('#fabricPointTotal').html(),
					"id":id
				});
			}
		});
		
		var subOrderTOList = [];
		subOrderTOList.push({
			"orderType": "1",
			"total":$('#jobTypeTot').html(),
			"orderDetails":jobTypeOrderDetailList,
			"points": $('#jobPointTotal').html(),
			"id":$('#subJobId').val()
		});
		subOrderTOList.push({
			"orderType": "2",
			"total":$('#fabriTot').html() ,
			"orderDetails":fabricOrderDetailList,
			"points": $('#fabricPointTotal').html(),
			"id":$('#subFabricId').val()
		});
		
		var orderItemList = [];
		
		var order_status_id=0;
		for(i=1;i<=8;i++){
			if($('#sc-'+i).is(':checked')){
				order_status_id = i;
				break;
			}
		}
		
		var orderInfo = JSON.stringify({
			"id" : parseInt($("#id").val()),
			"remarks" : "",//$("#remarks").val()
			"estimatedDate" : $("input[id=estimatedDate]").val(),
			"trailDate" : $("input[id=trailDate]").val(),
			"tailorId" : $("#tailorId").val(),
			"number" : $("#orderNumber").val(),
			"customerTO": { "id" : $('#custId').val()},
			"status" : order_status_id,
			"subOrderlist":subOrderTOList,
			"jobAmount": $("#jobTypeTot").html(),
			"fabricAmount": $("#fabriTot").html(),
			"expressDelivery":$("#ord_ex_dy").html(),
			"total": $("#ord_tot").html(),
			"vat": $('#ord_vat_per').html(),
			"vatAmount":$("#ord_vat_amount").html(),
			"totalAfterVat":$("#ord_tot_af_v").html(),
			"discountPoints":$("#ord_dc_p").html(),
			"pointsEarned":$("#orderPoints").val(),
			"discountAmount":$("#ord_dc_p_a").html(),
			"grantTotal":$("#ord_g_t").html().replace("<b>","").replace("</b>",""),
			"advancePayment":$("#ord_g_a").html(),
			"remainingPayment":$("#ord_g_r").html(),
			"discAmount":$("#discAmount").val()
			
		});
		doAjaxWithArgAndReturn("saveOrderInfo", "POST", orderInfo, function(content) {
			if (content.object > 0) {
				showSuccessMgs("Invoice information saved successfully");
				//loadOrderInfoPage();
				loadOrderInfoDetails(content.object);
				//printOrderInfo(content.object);
			} else {
				showErrorMgs("Unable to save Invoice informetion");
			}
		});
	} catch (e) {
		showErrorMgs("Error save orderInfo: " + e.message);
	}
}

function addItem(){
	$("#itemTable").append("<tr>" +
			"<td><input name='code'/></td>" +
			"<td><input disabled name='name'/></td>" +
			"<td><input onkeypress='validate(event)' name='quantity'/></td>" +
			"<td><input disabled name='price'/></td>" +
			"<td><input disabled name='total'/></td>" +
			"<td><input name='id' type='hidden'></td>");
	initializeButAction();
}

function updateGrandTotal(){
	var total = 0;
	var orderTotal = 0;
	$("#itemTable tr").each(function() {
	  $this = $(this);
	  var quantity = $this.find("input[name=quantity]").val();
	  var price = $this.find("input[name=price]").val();
	  if(quantity == undefined)
		  return true;
	  if(quantity == "" || quantity == "0.0" || quantity == "0"){
		  quantity=0;
	  }
	  $this.find("input[name=total]").val(quantity*price);
	  total= total + (quantity*price);
	  orderTotal = orderTotal + (quantity*price);	  
	});
	percentage = (total/100);
	  $('input[name=tot]').val(orderTotal);
	  $('input[name=taxAmount]').val(percentage*$('input[name=tax]').val());
	  if($('input[name=discount]').val()!=''){
		  total = total + (percentage * $('input[name=tax]').val());
		  percentage = total/100;
		  var disc = $('input[name=discount]').val();
		  if(disc == "" || disc == "0.0" || disc == "0"){
			  disc = 0;
		  }
		  var discountAmount = (percentage)*disc;
		  $('input[name=afterTaxTot]').val(total);
		  total = total - (discountAmount);
		  $('input[name=discountAmount]').val(discountAmount);
	  } else {
		  total = total + (percentage*$('input[name=tax]').val())
		  $('input[name=afterTaxTot]').val(total);
	  }
	  
	  $('input[name=gTotal]').val(Math.round(total));
	  
}

function printOrderInfo(OIId){
	var la = JSON.stringify({
		"id" : OIId
	});
	
	doAjaxWithArgAndReturn("printOrderInfo","post", la, function(data){
		print(data.message);
	});	
}

function printStitchingInfo(OIId){
	var la = JSON.stringify({
		"id" : OIId
	});
	
	doAjaxWithArgAndReturn("printStitchingInfo","post", la, function(data){
		print(data.message);
	});	
}


function addTailoringJob(){
	
	$("#stitchTable").append("<tr class='form-group col-md-3'><td><input type='text' class='form-control' name='type' placeholder='field'></td></tr>");
	initializeTailorJob();
	
}

function initializeTailorJob(){
	$("input[name=type]").off();
	$("#cust-talilor-job input[name=type]").keyup(function(event){
		/*if(event.keyCode == 45){
			//Insert
		}*/
		if(event.keyCode == 46){
			//Delete
			$(this).closest("tr").remove();
			$("input[name=type]").focus();
			return true;
		}
		if(event.keyCode == 13){
			//Enter
			addTailoringJob();
			return true;
	    }
	});	
	$("#cust-talilor-job input[name=quantity]").keyup(function(event){
		updateTotal();
	});
	$("input[name=type]").focus();
}

function showRow(id,that){
	
	if($(that).hasClass('btn-info')){
		$(that).removeClass('btn-info');
		$('#cust-talilor-job tr.c-t-'+id+' input#quantity').attr('disabled', 'disabled');
		$('#cust-talilor-job tr.c-t-'+id+' input#rate').attr('disabled', 'disabled');
	} else {
		$(that).addClass('btn-info');
		$('#cust-talilor-job tr.c-t-'+id+' input#quantity').removeAttr('disabled');
		$('#cust-talilor-job tr.c-t-'+id+' input#rate').removeAttr('disabled');
	}
	
}

function updateTotal(){
	var total = 0,tot = 0, pointsTotal = 0, potot = 0;
	var pointsToRupee = $('#POINTS_TO_1_RUPEE').val();
	var jobTypePercentage = $('#POINTS_DISCOUNT_JOB_TYPE_PERCENTAGE').val();
	var fabricPercentage = $('#POINTS_DISCOUNT_FABRIC_PERCENTAGE').val();
	var vat = $('#FABRIC_VAT').val();
	$('#ord_vat_per').val(vat);
	$('#cust-talilor-job tr').each(function() {
		$this = $(this);
		var cust_stitch_id = $this.find("input[id=cust-stitch-id]").val();
		if (cust_stitch_id == undefined)
			return true;
		var rate =  $this.find("input[name=rate]").val();
		var point =  $this.find("td#point").html();
		total = total + parseFloat(rate);
		pointsTotal = pointsTotal + potot;
	});
	$('#jobTypeTotal').html(total);
	$('#jobPointTotal').html(pointsTotal);
	//Order
	$('#jobTypeTot').html(total);
	var orderId = $('#id').val();
	total = 0;
	pointsTotal = 0;
	$('#fabric-job tr').each(function() {
		$this = $(this);
		var quantity = $this.find("input[name=quantity]").val();
		var price = $this.find("input[name=rate]").val();
		var vat = $this.find("td#vat").html();
		var available = $this.find("td#available").html();
		if (quantity == undefined)
			return true;
		if (quantity == "" || quantity == "0.0" || quantity == "0") {
			quantity = 0;
		}
		if(orderId==0 && parseFloat(quantity) > parseFloat(available)){
			$this.find("input[name=quantity]").val(0);
			showErrorMgs("Quantity not available");
		}
		va = ((quantity * price)/100)*vat;
		tot = (quantity * price) + va;
		potot = (tot/100)*jobTypePercentage*pointsToRupee;
		$this.find("td#total").html(tot);
		$this.find("td#points").html(parseInt(potot));
		total = total + (tot);
		pointsTotal = pointsTotal + parseInt(potot); 
	});
	$("#fabricTypeTot").html(total);
	$('#fabricPointTotal').html(pointsTotal);
	//Order
	$('#fabriTot').html(total);
	
	$('#orderPoints').val(parseInt($('#fabricPointTotal').html())+parseInt($('#jobPointTotal').html()));
	$('#availablePoints').val(parseInt($('#existingPoints').val())+parseInt($('#orderPoints').val()));
	if(pointsToRupee>0){
		$('#discountAmtForPoints').val($('#redeemPoints').val()/pointsToRupee);
	} else {
		$('#discountAmtForPoints').val(0);
	}
	total = parseInt($('#jobTypeTot').html())+parseInt($('#fabriTot').html());
	
	if($('#expressDelivery').is(":checked")){
		$('#ord_ex_dy').html(parseInt($('#expressChrages').val()));
	} else {
		$('#ord_ex_dy').html(0);
	}
	
	$('#ord_tot').html(total+parseInt($('#ord_ex_dy').html()));
	
	//Order VAT Amount
	if($('#ord_vat_per').html()==""){
		$('#ord_vat_amount').html(0);
	} else {
		$('#ord_vat_amount').html((parseInt($('#ord_tot').html())/100)*parseInt($('#ord_vat_per').html()));
	}
	
	//Order Total after VAT Amount
	$('#ord_tot_af_v').html(parseInt($('#ord_tot').html())+parseInt($('#ord_vat_amount').html()));
	
	if(parseInt($('#redeemPoints').val())<=parseInt($('#availablePoints').val())){
		$('#ord_dc_p').html($('#redeemPoints').val());
		$('#ord_dc_p_a').html($('#discountAmtForPoints').val());
	} else {
		$('#ord_dc_p').html(0);
		$('#ord_dc_p_a').html(0);
	}
	
	if(parseInt($('#discAmount').val())>0){
		$('#ord_dc_a').html($('#discAmount').val());
	} else {
		$('#ord_dc_a').html(0);
	}
	
	if((parseInt($('#ord_tot_af_v').html())-parseInt($('#ord_dc_p_a').html()))>0){
		if(parseInt($('#discAmount').val())>0){
			$('#ord_g_t').html(parseInt($('#ord_tot_af_v').html())-(parseInt($('#discAmount').val())+parseInt($('#ord_dc_p_a').html())));
		} else {
			$('#ord_g_t').html(parseInt($('#ord_tot_af_v').html())-parseInt($('#ord_dc_p_a').html()));
		}
	} else {
		$('#ord_g_t').html(0);
	}
	
	if((parseInt($('#ord_g_t').html())-parseInt($('#ord_g_a').html()))>0){
		$('#ord_g_r').html(parseInt($('#ord_g_t').html())-parseInt($('#ord_g_a').html()));
	} else {
		$('#ord_g_r').html(0);
	}
	
	//25% calculated as express delivery
	if((parseFloat($('#jobTypeTot').html())/100)*25>0){
		$('#expressChrages').val((parseFloat($('#jobTypeTot').html())/100)*25)
	}
	
	$('#ord_g_t').html("<b>"+$('#ord_g_t').html()+"</b>");
}

function addFabric(){
	$("#fabric-job").append("<tr>"+
	"<td id='fabric_code'></td>"+
	"<td><input type='text' data-type='fabric_quantity' style='background-color: transparent;' name='quantity' placeholder='Quantity'></td>"+
	"<td id='fabric_total'></td>"+
	"</tr>");
	initializeFabricAction();
}

function initializeFabricAction(){
	$("input[name=code]").off();
	$("input[name=quantity]").off();
	$("input[name=rate]").off();
	$("#fabric-job input[name=code],input[name=quantity],input[name=rate]").keyup(function(event){
		if(event.keyCode == 46){
			//Delete
			$(this).closest("tr").remove();
			$("input[name=code]").focus();
			updateTotal();
			return true;
		}
		if(event.keyCode == 13){
			//Enter
			loadSelectFabric();
			return true;
	    }
	});	
	$('#fabric-job input[name=quantity],input[name=rate]').change(function(){
		updateTotal();
	});
	updateTotal();
	$("input[name=code]").focus();
}


function completeOrder(id) {
	hideAll();
	var orderInfo = JSON.stringify({
		"id" : id
	});
	doAjaxWithArgAndReturn("completeOrderInfo", "POST", orderInfo, function(content) {
		loadOrderInfoPage();
	});
}

//Add Fabric
function loadSelectFabric() {
	
	$('#fabric-job').hide();
	doAjaxWithArgAndReturn("loadSelectFabric", "POST", "{}", function(content) {
		$("#add-fabric-section").html(content.message);
		$("#add-fabric-section").attr("isLoaded", true);
		$("#add-fabric-section").slideDown();
		if(id>0){
			//loadCustStitchingDetails();
		} else {
			initializeFabricButAction();
		}
	});
}

function initializeFabricButAction(){
	
	$("input[id=fabric-name]").keyup(function(event){
		if(event.keyCode == 13){
			//Enter
	    	fetchFabric();
	    	return true;
	    }
	});
	
	fetchFabric();
	
}

function fetchFabric(){
	var fabric = {};
	fabric.materialCode = $('#fabric-name').val();
	var data = JSON.stringify(fabric);
	var url = "pickFabric";
	doAjaxWithArgAndReturn(url, "post", data, function(responseData) {
		if (responseData.ackType == "Success") {
			
			$("#fabric-selection").html(responseData.message);
			$("input[name=fabric-id]").keyup(function(event){
				if(event.keyCode == 13){
					//Enter
					selectedFabric();
			    }
			});
			//G_currentDialog.close();
		} else {
			setErrorMessage(responseData.message); 
		}
	});
}

function selectedFabric(){
	
	if($('input[name=fabric-id]:checked').val()==undefined){
		showErrorMgs("Select Fabric");
		return;
	}
	var $row = $(parentThat).closest("tr");
	var id = $('input[name=fabric-id]:checked').attr('meta-id');
	var name = $('input[name=fabric-id]:checked').attr('meta-name');
	var price = $('input[name=fabric-id]:checked').attr('meta-price');
	var quantity = $('input[name=fabric-id]:checked').attr('meta-quantity');
	var vat = $('input[name=fabric-id]:checked').attr('meta-vat');
	var canExist = false;
	$('#fabric-job tr').each(function() {
		$this = $(this);
		if($this.find("input[name=quantity]").val()!=undefined && $this.find("input[name=quantity]").val()!=""){
			if(id == $this.find("input[name=fabric_id]").val()){
				alert("Item Already Added");
				canExist = true;
				return true;
			}
		}
	});
	if(quantity <= 0){
		alert("Quantity is not available");
		canExist = true;
		return true;
	}
	if(!canExist){
		$("#fabric-job tr").eq(0).after("<tr>"+
				"<td><input type='text' style='background-color: transparent;/* border: 0px solid; */' value='1' name='quantity' placeholder='Quantity'></td>"+
				"<input type='hidden' name='fabric_id' value='"+id+"' ></td>"+
				"<td id='available'>"+quantity+"</td>"+
				"<td><input type='text' name='rate' value='"+price+"' ></td>"+
				"<td id='vat'>"+vat+"</td>"+
				"<td id='total'></td>"+
				"<td id='points'></td>"+
				"<td id='code'><a class='btn btn-info'>"+name+"</a></td>"+
				"</tr>");
		initializeFabricAction();
	}
	$('#add-fabric-section').html('');
	$('#fabric-job').show();
}

function activaTab(tab){
    $('.nav-tabs a[href="#' + tab + '"]').tab('show');
};

function updateOrderStatus() {
	try {
		var order_status_id=0;
		for(i=1;i<=8;i++){
			if($('#sc-'+i).is(':checked')){
				order_status_id = i;
				break;
			}
		}
		var orderInfo = JSON.stringify({
			"id" : $("#order_id").val(),
			"tailorId" : $("#tailorId").val(),
			"status" : order_status_id			
		});
		doAjaxWithArgAndReturn("updateOrderStatus", "POST", orderInfo, function(content) {
			if (content.object > 0) {
				showSuccessMgs("Invoice information saved successfully");
				loadOrderInfoDetails(content.object);
			} else {
				showErrorMgs("Unable to save Invoice informetion");
			}
		});
	} catch (e) {
		showErrorMgs("Error save orderInfo: " + e.message);
	}
}

function loadEditOrderStatus(id) {
	hideAll();
	var orderInfo = JSON.stringify({
		"id" : id
	});
	doAjaxWithArgAndReturn("loadEditOrderStatus", "POST", orderInfo, function(content) {
		$("#orderInfo-content").html(content.message);
		$("#orderInfo-content").attr("isLoaded", true);
		$("#orderInfo-content").slideDown();
	});
}

function loadAddEditCustomerForOrder(id) {
	var customer = JSON.stringify({
		"id" : id
	});
	doAjaxWithArgAndReturn("loadAddEditCustomerForOrder", "POST", customer, function(content) {
		$("#cust-new-content").html(content.message);
		$("#cust-new-content").slideDown();
		$('#dob').datetimepicker({
			format : "ddd, DD MMM YYYY hh:mm a"
		});
	});
}

function searchCustomerForOrder(){
	fetchItem();
}

function orderOnLoad(){
	//customer
	$("input[id=custNumber]").keyup(function(event){
		if(event.keyCode == 13){
			//Enter
	    	fetchItem();
	    	return true;
	    }
	});
	fetchItem();
	//Item 
	initializeFabricAction();
	//Customer Stitching
	if($('#id').val()!=""){
		searchCustomerForOrder();
		selectedCustomer();
	}
	//Order
	$("#estimatedDate").datetimepicker({
		format : "ddd, DD MMM YYYY hh:mm a"
	});
	$("#trailDate").datetimepicker({
		format : "ddd, DD MMM YYYY hh:mm a"
	});
	$('#expressDelivery').change(function(){
		if($('#expressDelivery').is(":checked")){
			$('#estimatedDate').val($('#EXPRESS_DELIVERY_DAY').val());
			$('#expressChrages').removeAttr('disabled');
			updateTotal();
		} else {
			$('#estimatedDate').val($('#AUTO_DELIVERY_DAY').val())
			$('#expressChrages').attr('disabled','disabled');
			updateTotal();
		}
	});
	$('#expressChrages').keyup(function(){
		updateTotal();
	});
	$('#cust-talilor-job input[name=quantity]').keyup(function(){
		updateTotal();
	});
	$('#cust-talilor-job input[name=rate]').keyup(function(){
		updateTotal();
	});
	$('#fabric-job input[name=quantity]').keyup(function(){
		updateTotal();
	});
	$('#fabric-job input[name=rate]').keyup(function(){
		updateTotal();
	});
	$('#ord_g_a').html(parseInt($('#orginalPayment').val()));
	$('#orginalPayment').keyup(function(){
		$('#ord_g_a').html(parseInt($('#orginalPayment').val()));
		updateTotal();
	});
	$('#orginalPayment').keyup(function(){
		$('#ord_g_a').html(parseInt($('#orginalPayment').val()));
		updateTotal();
	});
	$('#redeemPoints').keyup(function(){
		if($('#redeemPoints').val()<=$('#availablePoints').val()){
			updateTotal();
		} else {
			$('#redeemPoints').val(0);
		}
	});
	
	$('#discAmount').keyup(function(){
		if(parseInt($('#ord_tot_af_v').html())<parseInt($('#discAmount').val().trim())){
			$('#discAmount').val(0);
		} 
		updateTotal();
	});
	var order_status_id=0;
	for(i=1;i<=8;i++){
		if($('#sc-'+i).is(':checked')){
			order_status_id = i;
			break;
		}
	}
	if(order_status_id==0){
		$('#sc-1').prop('checked', true);
	}
	updateTotal();
}

function loadOrderJobForCust(custId, orderId) {
	var customer = JSON.stringify({
		"id" : orderId,
		"custId" : custId
	});
	doAjaxWithArgAndReturn("loadOrderJobForCust", "POST", customer, function(content) {
		$("#tailoringJob-tab").html(content.message);
		$("#tailoringJob-tab").slideDown();
		$('#existingPoints').val($('#ord-existing-point').val());
		$('#cust-talilor-job input[name=quantity]').keyup(function(){
			updateTotal();
		});
		$('#cust-talilor-job input[name=rate]').keyup(function(){
			updateTotal();
		});
	});
}

function getCustSitchPanel(custId) {
	var customer = JSON.stringify({
		"custId" : custId
	});
	doAjaxWithArgAndReturn("getCustSitchPanel", "POST", customer, function(content) {
		$("#cust-stitch-type").html(content.message);
		$("#cust-stitch-type").slideDown();
	});
}

function loadAddStitchForCust(custId, id) {
	var customerStitching = JSON.stringify({
		"custId": custId,
		"id": id,
		"isFromOrder": true
	});
	$("#add-cust-stit").show();
	$("#add-cust-stit").empty();
	$("#cust-stitch-order").hide();
	doAjaxWithArgAndReturn("loadAddEditCustomerStitching", "POST", customerStitching, function(content) {
		$("#add-cust-stit").html(content.message);
		$("#add-cust-stit").slideDown();
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

function custStitchPostAdd() {
	toggleCustStitchForOrder();
	getCustSitchPanel($('#custId').val());
}

function toggleCustStitchForOrder(){
	$("#add-cust-stit").hide();
	$("#cust-stitch-order").show();
}

function pickOrdCustStitch(that){
	$('#cust-talilor-job tr').eq(0).after("<tr>" +
			"<td><input name='rate' value='"+$(that).attr('meta-price')+"' /></td>" +
			"<td id='point'>"+$(that).attr('meta-point')+"</td>" +
			"<td><a class='btn btn-sm btn-info'>"+$(that).attr('meta-name')+"</a><input type='hidden' id='cust-stitch-id' value='"+$(that).attr('meta-id')+"'></td>" +
			"<td><a class='btn btn-sm btn-info' onclick='removeCustOrd(this)' ><i class='fa fa-remove'></i></a></td>");
	$('#cust-talilor-job input[name=rate]').keyup(function(){
		updateTotal();
	});	
	updateTotal();
	/*$('#cust-talilor-job tr').each(function() {
		$this = $(this);
		var cust_stitch_id = $this.find("input[id=cust-stitch-id]").val();
		if (cust_stitch_id == undefined)
			return true;
		console.log(cust_stitch_id);
		var remark =  $this.find("textarea[id=remark]").val();
		console.log(remark);
		var rate =  $this.find("input[name=rate]").val();
		console.log(rate);
		var point =  $this.find("td#point").html();
		console.log(point);
	});*/
}

function removeCustOrd(that){
	$(that).parent().parent().remove();
	updateTotal();
}
