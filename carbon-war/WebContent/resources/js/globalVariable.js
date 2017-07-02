var G_URL_Rest= window.location.protocol + "//" + window.location.host + "/mycarbon/";

var G_Session;

var G_sq;

//Pagination
var G_pageNo;
var G_totalRecords;
var G_pageSize=10;
var G_maxPage;
var G_pageName;
var G_pageSection;
var G_docPhoneNumber;

var resTreamtments;
var G_Header_Locality;
var G_User_Locality;
var G_Language;
var G_currentDialog;

function setSuccessMessage(successMsg){
	$('#msgContainer').html("<div class='alert alert-success' id='successDiv' style='margin-top:10px;margin-bottom:10px'><a class='close' data-dismiss='alert'>x</a><strong>Success!&nbsp;</strong><div style='display:inline-block;' id='successMsg'>"+successMsg+"</div></div>");
}

function setErrorMessage(msg){
	$('#msgContainer').html("<div class='alert alert-error' id='errorDiv' style='margin-top:10px;margin-bottom:10px'><a class='close' data-dismiss='alert'>x</a><div id='errorMsg'> "+ msg +" </div></div>");
}

function setPopupSuccessMsg(successMsg){
	$('#pop_msgContainer').html("<div class='alert alert-success' id='successDiv' style='margin-top:10px;margin-bottom:10px'><a class='close' data-dismiss='alert'>x</a><strong>Success!&nbsp;</strong><div style='display:inline-block;' id='successMsg'>"+successMsg+"</div></div>");
}

function setPopupErrorMsg(msg){
	$('#pop_msgContainer').html("<div class='alert alert-error' id='errorDiv' style='margin-top:10px;margin-bottom:10px'><a class='close' data-dismiss='alert'>x</a><div id='errorMsg'> "+ msg +" </div></div>");
}


function print(data) 
{
    var mywindow = window.open('Zone Maker', 'Zone', '');
    mywindow.document.write('<html><head><title>Appy Tailor</title>');
    /*optional stylesheet*/ //mywindow.document.write('<link rel="stylesheet" href="main.css" type="text/css" />');
    mywindow.document.write('</head>');
    mywindow.document.write(data);
    mywindow.document.write('</html>');

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.focus(); // necessary for IE >= 10

    mywindow.print();
    mywindow.close();

    return true;
}

function loadLoginPage(){

	$('#loginPageContent').show();
	$('#billSystemPageContent').hide();
	
}

function loadBillSystemPage(role){

	$('#loginPageContent').hide();
	$('#billSystemPageContent').show();
	loadTrip();
	
}
