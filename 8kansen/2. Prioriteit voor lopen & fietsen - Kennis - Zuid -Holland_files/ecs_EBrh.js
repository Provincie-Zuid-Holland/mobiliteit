var _____WB$wombat$assign$function_____=function(name){return (globalThis._wb_wombat && globalThis._wb_wombat.local_init && globalThis._wb_wombat.local_init(name))||globalThis[name];};if(!globalThis.__WB_pmw){globalThis.__WB_pmw=function(obj){this.__WB_source=obj;return this;}}{
let window = _____WB$wombat$assign$function_____("window");
let self = _____WB$wombat$assign$function_____("self");
let document = _____WB$wombat$assign$function_____("document");
let location = _____WB$wombat$assign$function_____("location");
let top = _____WB$wombat$assign$function_____("top");
let parent = _____WB$wombat$assign$function_____("parent");
let frames = _____WB$wombat$assign$function_____("frames");
let opener = _____WB$wombat$assign$function_____("opener");

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
     INTERNET ARCHIVE ON 11:55:05 Aug 18, 2026.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  capture_cache.get: 0.742
  load_resource: 99.366
  PetaboxLoader3.resolve: 44.862
  PetaboxLoader3.datanode: 18.711
*/