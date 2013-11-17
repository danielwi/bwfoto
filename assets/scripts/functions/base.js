var base = (function() {

	var menuTimer;

	return {

		init: function() {
			$(".fancybox-button").fancybox({
				width: 860,
				height: 600
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


	        /*
			$(".imgBox .actions a").click(function() {
				var _this = $(this);
				var _mother = _this.parent().parent();
				var _type = _this.attr("data-action");

				if(_type == "lightbox" && _this.text() == "b") {
					
					_this.text("x");
					var data = "<div class='lightboxSelector'></div>";
					_mother.append(data);

				} else if(_type == "lightbox" && _this.text() == "x") {
					
					_this.text("b");
					$(".lightboxSelector",_mother).remove();
				}

				$(".lightboxSelector a",_mother).click(function() {
					_mother.addClass(_type);
					
					var _target = $(".box.lightbox table tr:first-child td:nth-child(2)");
					var oldVal = parseInt(_target.text(),10);
					
					_target.text(oldVal+1);
					_target.parent().addClass("heightligt");
					
					$(".lightboxSelector",_mother).remove();
					_this.text("b");
					
					setTimeout(function() {
						_target.parent().removeClass("heightligt");
					}, 1000);
					
					return false;
				});

				return false;
			});
			*/

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