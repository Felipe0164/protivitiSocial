"use strict";

(function () {
	var sideMenu = $("#side-menu");
	if (sideMenu && sideMenu.length)
		sideMenu.metisMenu();

	if (navigator.userAgent.indexOf("Chrome") <= 0 && navigator.userAgent.indexOf("Safari") > -1) {
		$(function () {
			var sidebarFakeBg = document.getElementById("sidebar-fake-bg"), l = 0;
			$(window).bind("load scroll", function () {
				var n = (window.pageYOffset <= 10 ? 125 : 0);
				if (l !== n) {
					l = n;
					sidebarFakeBg.style.top = n + "px";
				}
			});
		});
	}

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
