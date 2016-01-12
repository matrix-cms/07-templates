$(function () {

$('#news-rotation').cycle({
	timeout:       4000, 
	pause:   1,
	fx: 'fade', 
	speed: 'slow',

	after: function(idx){
		id = $(this).attr('rel');
		
	}
});



$('#feature-set').before('<div id="pager" class="pager">').cycle({
	timeout:       5000, 
	pause:   1,
	fx: 'fade', 
	speed: 'slow',
	pager: '#pager',

	after: function(idx){
		id = $(this).attr('rel');
	}
});



$("#features ol.episodes li a span.title").hide();
$("#features ol.episodes li a").hover(function() {
	$(this).find(".title").show({effect:"fade"} );
	}, function() {
	$(this).find(".title").hide({effect: "fade"});
});

});
