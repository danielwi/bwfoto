var lightbox = (function() {

	return {
		updateList: function(id) {
			var container = $('#lightboxList');
			if(id) {
				var row = $('tr[data-lightbox='+id+']');
				var numCell = $('td:nth-child(2)',row);
				var currVal = parseInt(numCell.text(),10);

				row.addClass('highlight');
				numCell.text(currVal+1);
				setTimeout(function() {
					row.removeClass('highlight');
				}, 1000);
			} else {

				$.getJSON('/dan/lightboxe/',function(data) {
					var container = $('#lightboxList');
					$('tbody > tr',container).remove();
					$.each(data,function(i,item) {
						var htmlString;
						htmlString = '<tr data-data-lightbox="'+item.id+'">';
						htmlString += '<td>'+item.name+'</td>';
						htmlString += '<td>'+item.num_images+'</td>';
						htmlString += '<td><a href="lightbox.htm" class="show icon">g</a></td>';
						htmlString += "</tr>";
						$('tbody',container).append(htmlString);
					});
				});
			}

		},
		changeName: function() {

		},
		getList: function(box,imageId) {
			var scope = this;
			$.getJSON('/dan/lightboxe/',function(data) {
				var container = $("<div class='lightboxSelector' />");
				$.each(data,function(i,item) {
					var htmlString;
					htmlString = '<a href="#" data-lightboxid="'+item.id+'">';
					htmlString += item.name;
					htmlString += "</a>";
					container.append(htmlString);
				});
				box.append(container);

				$('a',container).click(function() {
					var lightboxId = $(this).data('lightboxid');
					container.remove();
					if($('a[data-action=lightbox]',box).text() == "x") {
						$('a[data-action=lightbox]',box).text("b");
					}
					scope.addImage(lightboxId,imageId);

					return false;
				});
			});
		},
		deleteImage: function(lightboxId,imageId) {
			var scope = this;
			$.ajax({
				url: '/dan/lightboxe/'+lightboxId+'/'+imageId+'/',
				type: 'DELETE'
			}).done(function() {
				scope.updateList();
			});
		},
		addImage: function(lightboxId,imageId) {
			var scope = this;
			$.ajax({
				url: '/dan/lightboxe/'+lightboxId+'/'+imageId+'/',
				type: 'POST'
			}).done(function() {
				scope.updateList(lightboxId);
			});

			return false;

		},
		init: function() {
			var scope = this;
			$(".imgBox a[data-action='lightbox']").click(function() {
				var _this = $(this);
				var box = _this.parent().parent();
				var imageid = $('img',box).data('id');

				if(_this.text() == "b") {
					_this.text("x");
					scope.getList(box,imageid);

				} else {
					_this.text("b");
					$(".lightboxSelector",box).remove();
				}

				return false;
				
			});

			$(".buttons a[data-action='lightbox']").click(function() {
				var _this = $(this);
				var box = _this.parent();
				var imageid = _this.data('billedid');

				scope.getList(box,imageid);

				return false;
				
			});

			$("a[data-action=delete]").click(function() {
				var listElm = $(this).parent().parent();
				var lightboxId = listElm.parent().data('lightboxid');
				var imageId = listElm.data('billedid');
				listElm.css('background-color','#ED9DA7').fadeOut(1000,function() {
					listElm.remove();
				});

				scope.deleteImage(lightboxId,imageId);

				return false;

			});
		}
	}

})();