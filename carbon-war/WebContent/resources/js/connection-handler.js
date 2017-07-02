/*cache: false -> It will force requested pages not to be cached by the browser. 
 * It will Works fine, but :: except in IE8 when a POST is made to a URL that has already been requested by a GET, So need to append 
 * "_={timestamp}" to the GET parameters */

/*
 * Every Ajax request must be handled through exceptional blocks, is because based on the browsers/ compatibility there might be possibilities of getting exceptions.
 * ie. in IE 11 jquery json data type returns error other then the compatibility of Edge Mode.
 */
$(function() {
	$.ajaxSetup({
		error : function(jqXHR, ajaxOptions, thrownError) {
			console.log("Error status code: " + jqXHR.status);
			console.log("Error : " + thrownError);
			if (jqXHR.status === 0) {
				alert('Unable to connect.\n Please Verify Network.');
			} else if (jqXHR.status == 401) {
				//alert('Un Authorized access, Please signin');
				window.location.href = "/tile-design";
			}
		}
	});
});

/**
 * This method is used to perform ajax request with return type only
 * 
 * @param url
 * @param requestType
 * @param data
 * @param updateMethod
 */
function doAjaxWithReturn(url, requestType, updateMethod){
	try{
		
		$.ajax({
			url : G_URL_Rest + url,
			type : requestType,
			dataType: "json",
			async: false,
			cache: false,
			beforeSend: function(request){
				request.setRequestHeader("authorization", G_Session);
				showInProgress();
				console.log("doAjaxWithReturn "+ url + " request initiated");
			    // Handle the beforeSend event
				// Show Loading and parameters preparation
				if($('#divLoading').length > 0)
					$('#divLoading').addClass("show");
				$('#successDiv').hide();
				$('#errorDiv').hide();
				
			},
			success : updateMethod,
			complete: function(data, textStatus, request){
				hideInProgress();
				if($('#divLoading').length > 0)
					$('#divLoading').removeClass("show");
				console.log("doAjaxWithReturn "+url +" request complete");
			    // Handle the complete event
				// Hide Loading
				
			},
			error: function(data){
				//$('#errorMsg').html('Unable to perform User Action, Contact After some time or support');
				//$('#errorDiv').show();
				$('#msgContainer').html("<div class='alert alert-error' id='errorDiv' style='margin-top:10px;margin-bottom:10px'><a class='close' data-dismiss='alert'>x</a><div id='errorMsg'>Internal Server problem Happened,please try again after refresh, If problem exists contact support</div></div>");
			}
		});	
	} catch(error){
		console.log("doAjaxWithReturn "+error);
	}
}

function doAjaxWithArg(url, requestType, data, updateMethod){
	try{
		
		$.ajax({
			url : G_URL_Rest + url,
			contentType : "application/json",
			type : "post",
			data : data,
			async: false,
			cache: false,
			dataType: responseDataType,
			beforeSend: function(request){
				request.setRequestHeader("authorization", G_Session);
				console.log("doAjaxWithReturn "+ url + " request initiated");
			    // Handle the beforeSend event
				// Show Loading and parameters preparation
				if($('#divLoading').length > 0)
					$('#divLoading').addClass("show");
				$('#successDiv').hide();
				$('#errorDiv').hide();
				showInProgress();
			},
			success : updateMethod,
			complete: function(data, textStatus, request){
				if($('#divLoading').length > 0)
					$('#divLoading').removeClass("show");
				console.log("doAjaxWithArg "+url +" request complete");
			    // Handle the complete event
				// Hide Loading
				hideInProgress();
			},
			error: function(data){
				//$('#errorMsg').html('Unable to perform User Action, Contact After some time or support');
				//$('#errorDiv').show();
				$('#msgContainer').html("<div class='alert alert-error' id='errorDiv' style='margin-top:10px;margin-bottom:10px'><a class='close' data-dismiss='alert'>x</a><div id='errorMsg'>Internal Server problem Happened,please try again after refresh, If problem exists contact support</div></div>");
			}
		});	
	} catch(error){
		console.log("doAjaxWithArg "+error);
	}
}

/**
 *  This method is used to perform ajax request with data and return type
 *  
 * @param url
 * @param requestType
 * @param data
 * @param updateMethod
 */
function doAjaxWithArgAndReturn(url, requestType, data, updateMethod, responseDataType){
	try{
		if (responseDataType == undefined || responseDataType == null){
			responseDataType = "json";
		}
		$.ajax({
			url : G_URL_Rest + url,
			type : requestType,
			contentType : "application/json",
			data : data,
			async: false,
			cache: false,
			dataType: responseDataType,
			beforeSend: function(request){
				request.setRequestHeader("authorization", G_Session);
				console.log("doAjaxWithReturn "+ url + " request initiated");
			    // Handle the beforeSend event
				// Show Loading and parameters preparation
				if($('#divLoading').length > 0)
					$('#divLoading').addClass("show");
				$('#successDiv').hide();
				$('#errorDiv').hide();
				showInProgress();
			},
			success : updateMethod,
			complete: function(data, textStatus, request){
				/*if(geturl.getResponseHeader('action')=='logout'){
					logoutUser();
				}*/
				if($('#divLoading').length > 0)
					$('#divLoading').removeClass("show");
				console.log("doAjaxWithArgAndReturn "+url +" request complete");
			    // Handle the complete event
				// Hide Loading 
				hideInProgress();
			},
			error: function(data){
				//$('#errorMsg').html('Unable to perform User Action, Contact After some time or support');
				//$('#errorDiv').show();
				$('#msgContainer').html("<div class='alert alert-error' id='errorDiv' style='margin-top:10px;margin-bottom:10px'><a class='close' data-dismiss='alert'>x</a><div id='errorMsg'>Internal Server problem Happened,please try again after refresh, If problem exists contact support</div></div>");
			}
		});
	} catch(error){
		console.log("doAjaxWithArgAndReturn "+error);
	}
}

function doAjaxWithOutArgAndReturn(url, requestType, updateMethod){
	try{
		$.ajax({
			url : G_URL_Rest + url,
			type : requestType,
			async: false,
			cache: false,
			beforeSend: function(request){
				request.setRequestHeader("authorization", G_Session);
				console.log("doAjaxWithReturn "+ url + " request initiated");
			    // Handle the beforeSend event
				// Show Loading and parameters preparation
				if($('#divLoading').length > 0)
					$('#divLoading').addClass("show");
				$('#successDiv').hide();
				$('#errorDiv').hide();
				showInProgress();
			},
			success : updateMethod,
			complete: function(data, textStatus, request){
				if($('#divLoading').length > 0)
					$('#divLoading').removeClass("show");
				console.log("doAjaxWithOutArgAndReturn "+url +" request complete");
			    // Handle the complete event
				// Hide Loading
				hideInProgress();
			},
			error: function(){
				//$('#errorMsg').html('Unable to perform User Action, Contact After some time or support');
				//$('#errorDiv').show();
				$('#msgContainer').html("<div class='alert alert-error' id='errorDiv' style='margin-top:10px;margin-bottom:10px'><a class='close' data-dismiss='alert'>x</a><div id='errorMsg'>Internal Server problem Happened,please try again after refresh, If problem exists contact support</div></div>");
			}
		});	
	} catch(error){
		console.log("doAjaxWithOutArgAndReturn "+error);
	}
}

function addParameter(url, parameterName, parameterValue, atStart/*Add param before others*/){
    replaceDuplicates = true;
    if(url.indexOf('#') > 0){
        var cl = url.indexOf('#');
        urlhash = url.substring(url.indexOf('#'),url.length);
    } else {
        urlhash = '';
        cl = url.length;
    }
    sourceUrl = url.substring(0,cl);

    var urlParts = sourceUrl.split("?");
    var newQueryString = "";

    if (urlParts.length > 1)
    {
        var parameters = urlParts[1].split("&");
        for (var i=0; (i < parameters.length); i++)
        {
            var parameterParts = parameters[i].split("=");
            if (!(replaceDuplicates && parameterParts[0] == parameterName))
            {
                if (newQueryString == "")
                    newQueryString = "?";
                else
                    newQueryString += "&";
                newQueryString += parameterParts[0] + "=" + (parameterParts[1]?parameterParts[1]:'');
            }
        }
    }
    if (newQueryString == "")
        newQueryString = "?";

    if(atStart){
        newQueryString = '?'+ parameterName + "=" + parameterValue + (newQueryString.length>1?'&'+newQueryString.substring(1):'');
    } else {
        if (newQueryString !== "" && newQueryString != '?')
            newQueryString += "&";
        newQueryString += parameterName + "=" + (parameterValue?parameterValue:'');
    }
    return urlParts[0] + newQueryString + urlhash;
};

function replaceURLParams(params){
	var newURL = "?" + params;
	window.history.pushState("Fix A Doctor", "", newURL);
}

function getURLParams() {
	// This function is anonymous, is executed immediately and
	// the return value is assigned to QueryString!

	var query = window.location.search.substring(1);
	if (query != null && query != undefined && query.length > 0) {
		var query_string = {};
		var vars = query.split("&");
		for (var i = 0; i < vars.length; i++) {
			var pair = vars[i].split("=");
			// If first entry with this name
			if (typeof query_string[pair[0]] === "undefined") {
				query_string[pair[0]] = decodeURIComponent(pair[1]);
				// If second entry with this name
			} else if (typeof query_string[pair[0]] === "string") {
				var arr = [ query_string[pair[0]], decodeURIComponent(pair[1]) ];
				query_string[pair[0]] = arr;
				// If third or later entry with this name
			} else {
				query_string[pair[0]].push(decodeURIComponent(pair[1]));
			}
		}
		return query_string;
	}
	return null;
}

function updateXMLResponse(responseXML){
	var responses = responseXML.getElementsByTagName("response");
	var innerValue;
	for ( var i = 0; i < responses.length; i++) {
		if (window.navigator.userAgent.indexOf("MSIE ") != -1) {
			innerValue = responses[i].text;
		} else {
			innerValue = responses[i].textContent;
		}
		var divId = responses[i].attributes.getNamedItem("id").nodeValue;
		$("#"+divId).html(innerValue);
	}
}
// This is the full list of Ajax events , and in the order in which they are
// triggered

/*ajaxStart (Global Event)
	
	This event is triggered if an Ajax request is started and no other Ajax requests are currently running.
	
beforeSend (Local Event)
	
	This event, which is triggered before an Ajax request is started, allows you to modify the XMLHttpRequest object (setting additional headers, if need be.)

ajaxSend (Global Event)

	This global event is also triggered before the request is run.

success (Local Event)

	This event is only called if the request was successful (no errors from the server, no errors with the data).

ajaxSuccess (Global Event)

	This event is also only called if the request was successful.

error (Local Event)

	This event is only called if an error occurred with the request (you can never have both an error and a success callback with a request).

ajaxError (Global Event)

	This global event behaves the same as the local error event.

complete (Local Event)

	This event is called regardless of if the request was successful, or not. You will always receive a complete callback, even for synchronous requests.

ajaxComplete (Global Event)

	This event behaves the same as the complete event and will be triggered every time an Ajax request finishes.

ajaxStop (Global Event)

	This global event is triggered if there are no more Ajax requests being processed.*/

/*HTTP Response Code
--------------------
1xx Informational- Request received, continuing process. 
2xx Success		 - The action was successfully received, understood, and accepted.
3xx Redirection  - The client must take additional action to complete the request.
4xx Client Error - The client failed to provide an valid request.
5xx Server Error - The server failed to fulfill an apparently valid request.

1XX
--------
100	Continue	The request has been completed and the rest of the process can continue.
101	Switching Protocols	When requesting a page, a browser might receive a statis code of 101, followed by an "Upgrade" header showing that the server is changing to a different version of HTTP.

2XX
--------
200	OK	Standard response for HTTP successful requests.
201	Created	When new pages are created by posted form data or by a CGI process, this is confirmation that it worked.
202	Accepted	The client's request was accepted, though not yet processed.
203	Non-Authorative Information	The information contained in the entity header is not from the original site, but from a third party server.
204	No Content	If you click a link which has no target URL, this response is elicited by the server. It's silent and doesn't warn the user about anything.
205	Reset Content	This allows the server to reset any content returned by a CGI.
206	Partial Content	The requested file wasn't downloaded entirely. This is returned when the user presses the stop button before a page is loaded, for example.

3XX
--------
300	Multiple Choices	The requested address refers to more than one file. Depending on how the server is configured, you get an error or a choice of which page you want.
301	Moved Permanently	If the server is set up properly it will automatically redirect the reader to the new location of the file.
302	Moved Temporarily	Page has been moved temporarily, and the new URL is available. You should be sent there by the server.
303	See Other	This is a "see other" SRC. Data is somewhere else and the GET method is used to retrieve it.
304	Not Modified	If the request header includes an 'if modified since' parameter, this code will be returned if the file has not changed since that date. Search engine robots may generate a lot of these.
305	Use Proxy	The recipient is expected to repeat the request via the proxy.

4XX
-------
400	Bad Request	There is a syntax error in the request, and it is denied.
401	Authorization Required	The request header did not contain the necessary authentication codes, and the client is denied access.
402	Payment Required	Payment is required. This code is not yet in operation.
403	Forbidden	The client is not allowed to see a certain file. This is also returned at times when the server doesn't want any more visitors.
404	Not Found	The requested file was not found on the server. Possibly because it was deleted, or never existed before. Often caused by misspellings of URLs.
405	Method Not Allowed	The method you are using to access the file is not allowed.
406	Not Acceptable	The requested file exists but cannot be used as the client system doesn't understand the format the file is configured for.
407	Proxy Authentication Required	The request must be authorised before it can take place.
408	Request Timed Out	The server took longer than its allowed time to process the request. Often caused by heavy net traffic.
409	Conflicting Request	Too many concurrent requests for a single file.
410	Gone	The file used to be in this position, but is there no longer.
411	Content Length Required	The request is missing its Content-Length header.
412	Precondition Failed	A certain configuration is required for this file to be delivered, but the client has not set this up.
413	Request Entity Too Long	The requested file was too big to process.
414	Request URI Too Long	The address you entered was overly long for the server.
415	Unsupported Media Type	The filetype of the request is unsupported.

5XX
-------
500	Internal Server Error	Nasty response that is usually caused by a problem in your Perl code when a CGI program is run.
501	Not Implemented	The request cannot be carried out by the server.
502	Bad Gateway	The server you're trying to reach is sending back errors.
503	Service Unavailable	The service or file that is being requested is not currently available.
504	Gateway Timeout	The gateway has timed out. Like the 408 timeout error, but this one occurs at the gateway of the server.
505	HTTP Version Not Supported	The HTTP protocol you are asking for is not supported.

*/