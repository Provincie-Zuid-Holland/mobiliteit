var _____WB$wombat$assign$function_____=function(name){return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name))||self[name];};if(!self.__WB_pmw){self.__WB_pmw=function(obj){this.__WB_source=obj;return this;}}{
let window = _____WB$wombat$assign$function_____("window");
let self = _____WB$wombat$assign$function_____("self");
let document = _____WB$wombat$assign$function_____("document");
let location = _____WB$wombat$assign$function_____("location");
let top = _____WB$wombat$assign$function_____("top");
let parent = _____WB$wombat$assign$function_____("parent");
let frames = _____WB$wombat$assign$function_____("frames");
let opens = _____WB$wombat$assign$function_____("opens");
/* start of /views/pagetypes/feedback/js/feedback.js (as is) */
(function(){"use strict";(function(e){if(e.fn.activateFeedback=function(t,n){var a,o,r,i,s,c,u,d,l,f,p,g;return null==t&&(t={}),null==n&&(n=!1),o={respond:{selector:"a.respond",target:".feedback-respond-link",behaviour:"onDemand"},responses:{selector:"a.responses",target:".feedback-responses-link",behaviour:"onDemand"},form:{target:".feedback-respond-form"},paging:{selector:".pager a",target:".feedback-responses-list"},responsecount:{selector:".feedback-responsecount"},progress:null,ready:null},t=e.extend(!0,o,null!=(l=window.feedbackPollConfig)?l:{},window.feedbackConfig,t),p=function(t,n){var a;return a=e(n),t.replaceWith(a),a},s=function(n){var a,o;o=t.form,(a=e("form",n)).one("submit",(function(r){var s;return a.on("submit",(function(){return!1})).find("button, input:button, input:submit").prop("disabled",!0).addClass("disabled"),e.isFunction(t.progress)&&t.progress(a),s=a.closest(o.target),e.post(extendUrl(a.attr("action"),"AppIdt=feedback-respond"),a.serialize()).done((function(e){return i(n,p(s,e))})),!1}))},i=function(n,a){var o;if(e.isFunction(t.ready)&&t.ready(a),window.pageLoadFunctions&&a.initPageLoadFunctions(),s(a),(o=t.paging)&&o.selector&&o.target&&u(n,o.selector,o.target),window.IproxLightbox)return a.editActions(window.editActionsConfig||{})},c=function(n,a,o){var r,s,c,u;if(null==o&&(o=a),r="string"==typeof a?e(a,n):a,s="string"==typeof o?r.closest(o,n):r,c=r.data("ajax"),e(n).data("last-ajax",c),u=r.attr("href"),e(n).data("last-href",u),c)return e.isFunction(t.progress)&&t.progress(r),e.ajax(c).done((function(t){if(c===e(n).data("last-ajax"))return i(n,p(s,t))})).fail((function(){if(u&&"onDemand"===t.behaviour)return document.location=u}))},f=function(n){var a,o;return(o=t.paging)&&o.target&&e(n).data("last-ajax")?(a=e(o.target,n),e.ajax(e(n).data("last-ajax")).done((function(e){return i(n,p(a,e))})).fail((function(){return e(n).data("last-href")?document.location=e(n).data("last-href"):location.reload()}))):location.reload()},u=function(t,n,a){var o;return null==a&&(a=n),(o="string"==typeof n?e(n,t):n).data("ajax")&&!o.hasClass("processed")&&o.addClass("processed").on("click",(function(n){return c(t,e(this),a),n.preventDefault(),!1})),!1},d=function(e,n){var a;if((a=t[n])&&a.selector&&a.behaviour)return"onDemand"===a.behaviour&&u(e,a.selector,a.target),"onLoad"===a.behaviour&&c(e,a.selector,a.target),!1},g=function(e){var n;return n=t.responsecount,c(e,n.selector),!1},r=function(e){var n;return(n=t.responses)&&n.behaviour&&"onLoad"!==n.behaviour&&g(e),!1},a=e(this),n?(f(a),!1):(d(a,"respond"),d(a,"responses"),r(a),!1)},this.activateFeedbackOnContext=function(t){return e(t).activateFeedback()},this.reloadFeedbackResponses=function(){return e(document).activateFeedback(null,!0)},this.pageLoadFunctions&&this.pageLoadFunctions.push(activateFeedbackOnContext),this.IproxLightbox)return this.IproxLightbox.addIcon("moderate","pencil")}).call(this,jQuery)}).call(this);
/* end of /views/pagetypes/feedback/js/feedback.js */

}

/*
     FILE ARCHIVED ON 14:53:52 Jul 16, 2025 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 13:50:48 May 07, 2026.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  capture_cache.get: 7.852
  load_resource: 191.021 (2)
  PetaboxLoader3.resolve: 86.254 (2)
  PetaboxLoader3.datanode: 57.606 (2)
*/