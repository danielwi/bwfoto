function callIframe(IFrameObj, id, URL) {
  //var IFrameObj; // our IFrame object  
  if (!document.createElement) {return false};
  var IFrameDoc;
  if (!IFrameObj && document.createElement) {
    // create the IFrame and assign a reference to the
    // object to our global variable IFrameObj.
    // this will only happen the first time 
    // callToServer() is called
    try {
      var tempIFrame=document.createElement('iframe');
      tempIFrame.setAttribute('id',id);
      tempIFrame.setAttribute('name',id);
      tempIFrame.style.border='0px';
      tempIFrame.style.width='0px';
      tempIFrame.style.height='0px';
      IFrameObj = document.body.appendChild(tempIFrame);
      
      if (document.frames) {
        // this is for IE5 Mac, because it will only
        // allow access to the document object
        // of the IFrame if we access it through
        // the document.frames array
        IFrameObj = document.frames[id];
      }
    } catch(exception) {
      // This is for IE5 PC, which does not allow dynamic creation
      // and manipulation of an iframe object. Instead, we'll fake
      // it up by creating our own objects.
      iframeHTML="<iframe id='"+id+"' name='"+id+"' style='";
	  iframeHTML+="border:0px;";
      iframeHTML+="width:0px;";
      iframeHTML+="height:0px;";
      iframeHTML+="'><\/iframe>";
      document.body.innerHTML+=iframeHTML;
      IFrameObj = new Object();
      IFrameObj.document = new Object();
      IFrameObj.document.location = new Object();
      if(document.getElementById && document.getElementById(id)) {
		//W3C DOM
	  	IFrameObj.document.location.iframe = document.getElementById(id);
	  } else if (document.all && document.all(id)) {
		// MSIE 4 DOM
		IFrameObj.document.location.iframe = document.all(id);
	  } else if (document.layers && document.layers[id]) {
		// NN 4 DOM.. note: this won't find nested layers
		IFrameObj.document.location.iframe = document.layers[id];
	  } else {
		return false;
	  }
      //IFrameObj.document.location.iframe = document.getElementById(id);
      IFrameObj.document.location.replace = function(location) {
        this.iframe.src = location;
      }
    }
  }
  
  if (navigator.userAgent.indexOf('Gecko') !=-1 && !IFrameObj.contentDocument) {
    // we have to give NS6 a fraction of a second
    // to recognize the new IFrame
    setTimeout("callIframe('"+id+"','"+URL+"')",10);
    return false;
  }
  
  if (IFrameObj.contentDocument) {
    // For NS6
    IFrameDoc = IFrameObj.contentDocument; 
  } else if (IFrameObj.contentWindow) {
    // For IE5.5 and IE6
    IFrameDoc = IFrameObj.contentWindow.document;
  } else if (IFrameObj.document) {
    // For IE5
    IFrameDoc = IFrameObj.document;
  } else {
    return false;
  }  
  IFrameDoc.location.replace(URL);
  return IFrameObj;
}
