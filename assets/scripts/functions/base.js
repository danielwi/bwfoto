var base = (function() {

	var menuTimer;
	var keywordBox;

	return {

		init: function() {

			var scope = this;

			$(".fancybox-button").fancybox({
				width: 860,
				height: 600,
				fitWidth: true,
				beforeClose: function() {
					lightbox.updateList();
				}
			});

			$('select').uniform();

			$("#slider").flexslider({
				selector : ".slides > li",
				slideshowSpeed: 8000,
				animationSpeed: 2000,
				randomize: true,
				controlNav: false,
				directionNav: false,
				pausePlay: true 
			});

			$(".sub-cat-lists .hasChildren > a").click(function() {
				var _mother = $(this).parent();
				$(".lvl2",_mother).slideToggle(200);
				_mother.toggleClass("open");
				return false;
			});

			$('.imgBox img').bind('mouseover', function(e) {
				var elm = $(this);
				var imgId = elm.data('id');
				var htmlList = "<strong>Info/Keywords</strong><br/>";

				elm.addClass('hover');

				keywordBox = $('<div />');
				keywordBox.addClass('keywordbox');
				keywordBox.css({
					top: e.pageY+15,
					left: e.pageX+15
				});
			
				//$.getJSON('/keyword.json',function(data) {
				$.getJSON('http://bwfoto.dk/dan/arkivbilleder/'+imgId+'/keywords.json',function(data) {
					$.each(data,function(i,item) {
						htmlList += item;
						htmlList += "<br />";
					});

					if(elm.hasClass('hover')) {
						keywordBox.append(htmlList);
						keywordBox.appendTo('body');
					} else {
						keywordBox = null;
						htmlList = null;
					}
				});

			}).bind('mousemove',function(e) {

				keywordBox.css({
					top: e.pageY+15,
					left: e.pageX+15
				});
				
			}).bind('mouseout',function(e) {
				$(this).removeClass('hover');
				keywordBox.remove();
			});
	        
	        $("#topNav .nav > .hasChildren").bind("mouseover", function() {
		        
	        	$("#topNav .nav .hover").removeClass('hover');

		        clearTimeout(menuTimer);
		        $(this).addClass("hover");
		        
	        }).bind("mouseout", function() {
	        	var t = $(this);
	        	menuTimer = setTimeout(function() {
		        	t.removeClass("hover");
	        	}, 500);
	        });

			$(document).scroll(function() {
				
				var _doc = $(document);
				var scrollPos = _doc.scrollTop();

				if(scrollPos > 330) {
					$("aside.sidebar").addClass("fixed");
				} else {
					$("aside.sidebar").removeClass("fixed");
				}

			});
		}
	};
})();


$(document).ready(function() {
	base.init();
	searchAutoComplete.init();
	lightbox.init();
});