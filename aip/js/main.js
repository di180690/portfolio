$(document).ready(function() {

// wow
var wow = new WOW({
		mobile: false
	}
);
wow.init();


// go-to
$('.go-to').click(function(e) {
	e.preventDefault();

	var target = $($(this).data('target'));
	$('html, body').animate({
		scrollTop: target.offset().top
	}, 800);
});


// rules slider
(function() {

	var $window = $(window), 
		rulesSlider = $('.screen-rules .thumbnails .row'),
		opts;
	
	var defaults = {
			infiniteLoop: false,
			startSlide: 0,
			moveSlides: 1,
			slideMargin: 20,
			slideWidth: 330,
			controls: false
		};

	function sliderInit(opts) {
		if (opts) {
			if (rulesSlider.reloadSlider) {
				rulesSlider.reloadSlider(opts);
			} else {
				rulesSlider.bxSlider(opts);
			}
		} else {
			if (rulesSlider.destroySlider) {
				rulesSlider.destroySlider();
			}
		}
	}

	rulesSlider.on('click', '.expand', function(e) {
		e.preventDefault();

		var $this = $(this),
			thumbnail = $this.closest('.thumbnail');

		thumbnail
			.toggleClass('open')
			.find('.inner .description .more').slideToggle();
	});

	$window
		.on('resize', function() {
			var width = window.innerWidth;

			if(rulesSlider.getCurrentSlide) {
				defaults.startSlide = rulesSlider.getCurrentSlide();
			}

			if (width > 1199 && width <= 1679) {
				opts = $.extend({}, defaults, {
					maxSlides: 3
				});
			} else if (width > 767 && width <= 1199) {
				opts = $.extend({}, defaults, {
					maxSlides: 2
				});
			} else if (width <= 767) {
				opts = $.extend({}, defaults, {
					maxSlides: 1,
					slideWidth: 0,
					slideMargin: 0
				});
			} else {
				opts = null;
			}
			sliderInit(opts);
		})
		.trigger('resize');

}());


// callback-form
$('.callback-form-trigger').click(function(e) {
	e.preventDefault();

	$.fancybox({
		padding: 0,
		wrapCSS: 'fancybox-style-1',
		content: $('.callback-form')
	});
});

});


// google map
function initMap() {
	var myLatLng = { lat: 55.762436, lng: 37.552008 };

	var map = new google.maps.Map(document.querySelector('.screen-map .map-inner'), {
		scrollwheel: false,
		zoom: 16,
		center: myLatLng
	});

	var marker1 = new google.maps.Marker({
		position: myLatLng,
		map: map,
		icon: {
			url: 'img/map-marker.png',
			anchor: new google.maps.Point(0, 0)
		}
	});

	var marker2 = new google.maps.Marker({
		position: myLatLng,
		map: map
	});
	marker2.setMap(null);

	marker1.addListener('click', function() {
		marker1.setMap(null);
		marker2.setMap(map);
	});
}