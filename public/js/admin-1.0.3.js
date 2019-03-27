"use strict";

(function () {
	var sideMenu = $('#side-menu');
	if (sideMenu && sideMenu.length)
		sideMenu.metisMenu();

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
