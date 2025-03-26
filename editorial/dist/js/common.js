$(document).ready(function() {

	var $window = $(window),
		$body = $('body'),
		$sidebar = $('.sidebar'),
		$sidebar_inner = $('.sidebar-inner');

	
	window.setTimeout(function() {
		$body.removeClass('is-preload');
	}, 100);

	
	var resizeTimeout;
	$window.on('resize', function() {
		$body.addClass('is-resizing');

		clearTimeout(resizeTimeout);

		resizeTimeout = setTimeout(function() {
			$body.removeClass('is-resizing');
		}, 100);
	});
	
	
	$window.on('resize', function() {
		if ($window.width() <= 1199) {
			$sidebar.addClass('inactive');
		}
		else {
			$sidebar.removeClass('inactive');
		}
	}).trigger('resize');

	
	$('.sidebar-toggle').on('click', function(e) {
		e.preventDefault();
		e.stopPropagation();

		$sidebar.toggleClass('inactive');
	});


	// Prevent certain events inside the panel from bubbling.
	$sidebar.on('click touchend touchstart touchmove', function(e) {
		if ($window.width() > 1199) return;
		e.stopPropagation();
	});


	// Hide panel on body click/tap.
	$body.on('click touchend', function(event) {
		if ($window.width() > 1199) return;
		$sidebar.addClass('inactive');
	});

	
	// Scroll lock.
	// Note: If you do anything to change the height of the sidebar's content, be sure to
	// trigger 'resize.sidebar-lock' on $window so stuff doesn't get out of sync.
	(function() {

		var sh, wh, st;

		// Reset scroll position to 0 if it's 1.
		if ($window.scrollTop() == 1) $window.scrollTop(0);

		$window.on('scroll.sidebar-lock', function() {
			var x, y;

			if ($window.width() <= 1199) {
				$sidebar_inner
					.data('locked', 0)
					.css('position', '')
					.css('top', '');

				return;
			}

			// Calculate positions.
			x = Math.max(sh - wh, 0);
			y = Math.max(0, $window.scrollTop() - x);

			// Lock/unlock.
			if ($sidebar_inner.data('locked') == 1) {
				if (y <= 0) {
					$sidebar_inner
						.data('locked', 0)
						.css('position', '')
						.css('top', '');
				}
				else {
					$sidebar_inner.css('top', -1 * x);
				}
			}
			else {
				if (y > 0)
					$sidebar_inner
						.data('locked', 1)
						.css('position', 'fixed')
						.css('top', -1 * x);
			}
		});

		$window.on('resize.sidebar-lock', function() {
			// Calculate heights.
			wh = $window.height();
			sh = $sidebar_inner.outerHeight();

			// Trigger scroll.
			$window.trigger('scroll.sidebar-lock');

		})
		.trigger('resize.sidebar-lock');

	})();

});