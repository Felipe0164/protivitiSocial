"use strict";

(function () {
	var originalModal = $.fn.modal;
	$.fn.modal = function () {
		var i, d, p;
		for (i = this.length - 1; i >= 0; i--) {
			if (document.body !== (p = (d = this[i]).parentNode)) {
				if (p)
					p.removeChild(d);
				document.body.appendChild(d);
			}
		}
		originalModal.apply(this, arguments);
	};
})();

$(function () {
	var sideMenu = $('#side-menu');

	if (!sideMenu || !sideMenu.length)
		return;

	sideMenu.metisMenu();

	//Loads the correct sidebar on window load,
	//collapses the sidebar on window resize.
	// Sets the min-height of #page-wrapper to window size
	$(window).bind("load resize", function () {
		var topOffset = 50;
		var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
		if (width < 768) {
            $("#navbar-collapse").addClass("collapse");
            $("#page-wrapper").css("min-height", "");
            //$("#sidebar").css("min-height", "");
			topOffset = 100; // 2-row-menu
		} else {
			var div_navbar_collapse = $("#navbar-collapse");
			div_navbar_collapse.removeClass("collapse");
			if (div_navbar_collapse && div_navbar_collapse[0])
				div_navbar_collapse[0].style.height = "";

            var height = ((window.innerHeight > 0) ? window.innerHeight : screen.height);
            height = height - topOffset;
            if (height < 1) height = 1;
            if (height > topOffset) {
                $("#page-wrapper").css("min-height", (height - 1) + "px");
                //$("#sidebar").css("min-height", height + "px");
            }
		}
	});
});
