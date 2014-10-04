var searchAutoComplete = (function() {

	var keyarray = new Array();
	var searchHasFocus = false;
	var selectedkey = -1
	var word="";
	var getkeywordsframe;
	var oldsearch = ""
	var lang;

	return {
		fillSearchBox: function(ord) {
			document.getElementById('search').value = word+""
		},
		checkKey: function(keyEvent) {
			var scope = this;
			var code;
			if (!keyEvent){
				var keyEvent = event;
			}
			if (keyEvent.keyCode){
				code = keyEvent.keyCode;
			}
			else if (keyEvent.which){
				code = keyEvent.keyCode;
			}
			if(keyarray.length > 0 && searchHasFocus){
				switch (code){
					case 38:
						if( selectedkey <= 0 ){
							selectedkey = keyarray.length-1;
						}
						else{
							selectedkey--;
						}
						scope.fyldKeyLayer()
						return true;
						break;
					case 40:
						if( selectedkey < keyarray.length){
							selectedkey++;
						}
						if( selectedkey == keyarray.length){
							selectedkey = 0;
						}
						scope.fyldKeyLayer()
						return true;
						break;
					default:
						break;
				}
			}
			if(searchHasFocus){
				word = document.getElementById('search').value.toLowerCase()
				word = word.replace(/^\s*|\s*$/g,"");
				word = word.replace(/januar|februar|marts|april|maj|juni|juli|august|september|oktober|november|december/g,"");
				word = word.replace(/\*/g,"");
				word = word.replace(/\s*(,)\s*/g," ");
				word = word.replace(/\s*(\x2B)\s*/g," ");
				if(word != oldsearch ){
					bogstaver = word.replace(/\W/g,"")
					bogstaver = word.replace(/\d/g, "")
					if( bogstaver.length > 2){
						oldsearch = word
						word = escape(word)
						document.getElementById('keywordlayer').style.display = 'block';
						getkeywordsframe = callIframe(getkeywordsframe, "noegleramme", "http://bwfoto.dk/php/GetKeywordsFrame.php?start=" + escape(word) + "&sprog="+lang+"&niveau=1&getterfunction=searchAutoComplete.getKey");
						//getkeywordsframe = callIframe(getkeywordsframe, "noegleramme", "/ajax.htm?");

						//if(!getkeywordsframe){
						//	alert("fejl ved hetning af keywords")
						//}
					}
					else{
						oldsearch = '';
						keyarray = [];
						document.getElementById('keywordlayer').style.display = 'block';
					}
				}
			}
		},
		getKey: function(array) {
			//console.log('return');
			keyarray = array;
			if(keyarray.length > 0){
				selectedkey = -1
				this.fyldKeyLayer();
			}
		},
		getElementPosition: function(elemID) {
			var offsetTrail = document.getElementById(elemID);
		    var offsetLeft = 0;
		    var offsetTop = 0;
			while (offsetTrail) {
				offsetLeft += offsetTrail.offsetLeft;
		        offsetTop += offsetTrail.offsetTop;
		        offsetTrail = offsetTrail.offsetParent;
		    }
		    if (navigator.userAgent.indexOf("Mac") != -1 &&
		        typeof document.body.leftMargin != "undefined") {
		        offsetLeft += document.body.leftMargin;
		        offsetTop += document.body.topMargin;
		    }
		   	return {left:offsetLeft, top:offsetTop};
		},
		fyldKeyLayer: function() {
			thelayer = document.getElementById('keywordlayer');
			thelayer.style.display = 'none';
			search = document.getElementById('search');
			//thelayer.style.height = (keyarray.length*14)+"px";

			var html = "<div class='search-autocomplete-list'>";
			html += "<ul>";
			for(var i=0; i<keyarray.length; i++) {
				var word = keyarray[i];
				html += "<li"+((selectedkey == i)?" class='active' ":"")+" onClick=\"document.getElementById('search').value='" + word.replace(/'/, "\\'") + "'; document.getElementById('searchform').submit();\">";
				html += word;
				html += "</li>";
			}

			html += "</ul>";

			/* OLD HTML


			var html = "<TABLE align=\"left\" style=\"width:"+(search_width-2)+"px; font-family: verdana, serif; font-size: 12px;\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">"
			for( var i=0; i<keyarray.length; i++){
				var word = keyarray[i]
				html += "<TR " + ( (selectedkey == i)?"style=\"color: #FFFFFF\" bgcolor=\"#0066FF\"":"bgcolor=\"#EEEEEE\"") + ">"
				html += "<TD width=\"100%\" align=\"left\" onClick=\"document.searchform.search.value='" + word.replace(/'/, "\\'") + "'; document.searchform.submit();\" style=\"cursor:pointer; cursor:hand;" + ((selectedkey == i)?"color: #FFFFFF":"color: #000099") + "\">" + word + "<\/TD>"
				html += "<\/TR>"
			}
			html += "<\/TABLE>"

			*/


			if(selectedkey != -1){
				document.getElementById('search').value = keyarray[selectedkey]
			}
			//thelayer.innerHTML = ''
			//thelayer.innerHTML = html
			this.writit(html, thelayer);
			thelayer.style.display = 'block'
			ord = document.getElementById('search').value
			document.getElementById('search').focus();
			document.getElementById('search').value = ord;
		},
		hideAutocomplete: function() {
			var thelayer = document.getElementById('keywordlayer');
			thelayer.style.display = 'none'
		},
		checkSearch: function() {
			var string = new String( document.getElementById('search').value )
			if (string == "" || string == " ") {
        		alert("Du har ikke indtastet et søgeord")
				return false;
       		}
			else{
				if(selectedkey != -1){
					var word = keyarray[selectedkey]
					document.getElementById('search').value = word;
				}
				word = document.getElementById('search').value.toLowerCase();
				word = word.replace(/\s*(,)\s*/g," ");
				test = word.replace(/\bjanuar|februar|marts|april|maj|juni|juli|august|september|oktober|november|december\b/g,"");
				test = test.replace(/\s*(,)\s*/g," ");
				word = word.replace(/\s*(\x2B)\s*/g," ");
				if(test == ''){
					alert('Der kan ikke søges på månedsnavne alene.\nDer kan dog søges på månedsnavn i kombination med et eller flere andre søgeord');
					return false;
				}
				/*
				maaneder = new RegExp("\bjanuar|februar|marts|april|maj|juni|juli|august|september|oktober|november|december\b", "g")
				if(maaneder.test(word)){
					if(!confirm("Et af de ord du vil søge efter er en måned\nDu kan ikke søge efter månedsnavne\nTryk OK for at søge uden månednavnet eller annuler for at rette søgningen til")){
						return false;
					}
				}
				word = word.replace(/\bjanuar|februar|marts|april|maj|juni|juli|august|september|oktober|november|december\b/g,"");
				*/
				document.getElementById('search').value = word.replace(/^\s*|\s*$/g,"");
				var thelayer = document.getElementById('keywordlayer');
				thelayer.style.display = 'none'
				return true;
			}
		},
		writit: function(text,element) {
			if (document.getElementById)
			{
				//x = document.getElementById(id);
				element.innerHTML = '';
				element.innerHTML = text;
			}
			else if (document.all)
			{
				//x = document.all[id];
				element.innerHTML = text;
			}
			else if (document.layers)
			{
				//x = document.layers[id];
				text2 = '<P CLASS="testclass">' + text + '</P>';
				element.document.open();
				element.document.write(text2);
				element.document.close();
			}
		},
		init: function() {
			var scope = this;
			var searchBox = $("#search");

			if(window.location.href.indexOf("/eng/") > -1) {
				lang = "u";
			} else {
				lang = "d";
			}

			searchBox.focus(function() {
				searchHasFocus = true;
				//console.log('focus true');
			});

			searchBox.keyup(function(e) {
				scope.checkKey(e);
				//console.log('keyup');
			});

			searchBox.blur(function() {
				searchHasFocus = false;
				//console.log('focus false');
			});
		}
	}

})();
