var _____WB$wombat$assign$function_____=function(name){return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name))||self[name];};if(!self.__WB_pmw){self.__WB_pmw=function(obj){this.__WB_source=obj;return this;}}{
let window = _____WB$wombat$assign$function_____("window");
let self = _____WB$wombat$assign$function_____("self");
let document = _____WB$wombat$assign$function_____("document");
let location = _____WB$wombat$assign$function_____("location");
let top = _____WB$wombat$assign$function_____("top");
let parent = _____WB$wombat$assign$function_____("parent");
let frames = _____WB$wombat$assign$function_____("frames");
let opens = _____WB$wombat$assign$function_____("opens");
(function ($) {
	"use strict";
	$(function () {
		// re init layout after ajax request
		$(document).on("sf:ajaxfinish", ".searchandfilter", function (e, data) {
			if (window.elementorFrontend && window.elementorFrontend.elementsHandler && window.elementorFrontend.elementsHandler.runReadyTrigger) {
				setTimeout(function () {
					var runReadyTrigger = window.elementorFrontend.elementsHandler.runReadyTrigger;
					runReadyTrigger($(data.targetSelector));
					var ajaxTarget = $(data.targetSelector);
					if (ajaxTarget.length > 0) {
						ajaxTarget.find('.elementor-widget').each(function () {
							runReadyTrigger($(this));
						});
					}
				}, 100);
			}
		});
	});

	// Detects the end of an ajax request being made.
	var forms = [];
	$(document).on("sf:ajaxfinish", ".searchandfilter", function (e, form) {
		var $form = $('.searchandfilter[data-sf-form-id=' + form.sfid + ']')
		forms[form.sfid] = $form[0].innerHTML;
	});

	// load search forms in popups
	$(window).on('elementor/frontend/init', function () {
		// Search forms in popups reset to their page load state every time they are shown.
		// So we need to keep track of the latest one, and reload it into the popup when it is shown.
		if (window.elementorFrontend) {
			window.elementorFrontend.elements.$window.on('elementor/popup/show', (e, id, document) => {
				if ($().searchAndFilter) {
					var $sliders = $('.elementor-popup-modal .searchandfilter .meta-slider');
					if ($sliders.length > 0) {
						$sliders.empty();
					}

					// Get the forms ID:
					$('.elementor-popup-modal .searchandfilter').each(function () {
						var $form = $(this);
						$form.off();
						var formId = $form.data('sf-form-id');
						if (forms[formId]) {
							// Replace the form with the latest version:
							$form.html(forms[formId])
						}
						$form.searchAndFilter();

					});
				}
			});
		}
	});

}(jQuery));

}

/*
     FILE ARCHIVED ON 01:49:03 Dec 22, 2025 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 13:49:56 May 07, 2026.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  capture_cache.get: 53.379
  load_resource: 373.769 (2)
  PetaboxLoader3.resolve: 248.487 (2)
  PetaboxLoader3.datanode: 104.714 (2)
*/