$(window).load( function() {

    $('#container').masonry({
        "itemSelector": ".item",
        "columnWidth": ".grid-sizer",
        cornerStampSelector: '.corner-stamp'
    });

});

$(document).ready(function() {

	$('.item').on('click', function popup() {
		$('#popup').fadeIn(450);
	});

	$('#popup').on('click', function popout(){
		$('#popup').fadeOut(450);
	})

});


