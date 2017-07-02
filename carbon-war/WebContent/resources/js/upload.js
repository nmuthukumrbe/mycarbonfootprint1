function loadUpload(){
	hideAll();
	doAjaxWithReturn("loadUpload", "POST", function(content) {
		$("#upload-content").html(content.message);
		$("#upload-content").slideDown();
	});
}

/**
 * This method is used to download Item. This method will be helpful to download without navigating page 
 * 
 * @param userId
 */
function downloadItem() {

    console.log("download Item");
    var xhr = new XMLHttpRequest();
    xhr.open('POST', "downloadItem", true);
    xhr.responseType = 'arraybuffer';
    setSuccessMessage("Item Download Initiated. Please wait for some time");
    xhr.onload = function () {
        if (this.status === 200) {
        	setSuccessMessage("Item Download Completed");
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

function uploadItem(){
    var vcfData = new FormData($('#itemUploadForm')[0]); 
    
     $.ajax({
           url : "/appyTailor/uploadItem?itemUpload="+vcfData,
           type : "post",
           data : vcfData,
           processData: false,
           contentType: false,
           cache : false,
           beforeSend: function(request) {
        	   request.setRequestHeader("authorization", G_Session);
           },
           success : function(data) {
        	    if (data && data.ackType !=undefined && data.ackType == "Success") {
       				showSuccessMgs(data.message);
    				loadItemPage();
	       		} else {
	       			showErrorMgs(data.message);
	       		}
           }, complete: function() {
               //
           },error : function(data){
        	   console.log(data.responseText); 
        	   showErrorMgs("Unable to Upload Item, Please check after some time");
           }
       });   
} 
