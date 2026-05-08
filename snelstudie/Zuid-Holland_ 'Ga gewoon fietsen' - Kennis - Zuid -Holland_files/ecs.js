var _____WB$wombat$assign$function_____=function(name){return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name))||self[name];};if(!self.__WB_pmw){self.__WB_pmw=function(obj){this.__WB_source=obj;return this;}}{
let window = _____WB$wombat$assign$function_____("window");
let self = _____WB$wombat$assign$function_____("self");
let document = _____WB$wombat$assign$function_____("document");
let location = _____WB$wombat$assign$function_____("location");
let top = _____WB$wombat$assign$function_____("top");
let parent = _____WB$wombat$assign$function_____("parent");
let frames = _____WB$wombat$assign$function_____("frames");
let opens = _____WB$wombat$assign$function_____("opens");

var ECS_hooks = {};

var ECS_Columns_Count=0;

function ECS_add_action(name, func) {
  if(!ECS_hooks[name]) ECS_hooks[name] = [];
  ECS_hooks[name].push(func);
}

function ECS_do_action(name, ...params){
  if(ECS_hooks[name]) 
     ECS_hooks[name].forEach(func => func(...params));
}
}

/*
     FILE ARCHIVED ON 21:07:08 Dec 16, 2025 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 13:36:34 May 07, 2026.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  capture_cache.get: 0.883
  load_resource: 122.394
  PetaboxLoader3.resolve: 62.711
  PetaboxLoader3.datanode: 38.109
*/