var _____WB$wombat$assign$function_____=function(name){return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name))||self[name];};if(!self.__WB_pmw){self.__WB_pmw=function(obj){this.__WB_source=obj;return this;}}{
let window = _____WB$wombat$assign$function_____("window");
let self = _____WB$wombat$assign$function_____("self");
let document = _____WB$wombat$assign$function_____("document");
let location = _____WB$wombat$assign$function_____("location");
let top = _____WB$wombat$assign$function_____("top");
let parent = _____WB$wombat$assign$function_____("parent");
let frames = _____WB$wombat$assign$function_____("frames");
let opens = _____WB$wombat$assign$function_____("opens");
//  parse  [http://www.example.org linktext]  wiki external link
//  hiden van [+.....]  dus tweede teken een +
//  [!   ]  =img  Met na | styleinfo

function parseW(zin) {
  let zinUit ="";
  let stylex ="style='max-width:100%'"
  let p2 ="";
  while (zin  != null && zin != "") {
    let positionA = zin.indexOf("[");    if (positionA >0 ) {positionSL = positionA};

    if (positionA ==-1 ) { zinUit = zinUit + zin; zin ="";    return zinUit; }   // geen [ meer dus klaar

    if (positionA >0 ) { zinUit = zinUit+ zin.slice(0,positionA); zin = zin.slice(positionA); }// er zit gewone tekst voor de [ , eraf slicen
//  als we hier zijn staat er dus een [ op de eerste positie van zin
    let positionB = zin.indexOf("]");
    if (positionB ==-1 ) {console.log("parsfout,geen]");   zinUit = zinUit + zin; zin ="";    return zinUit;    }  // klaar

    let xteken =zin.slice(1,2);
    if ( xteken == '+' ) {  // bij een + gooi alles tussne [] eruit
        zin = zin.slice(positionB+1);
    }
    else if ( xteken == '!' ) {  // bij een ! afbeelding invoegen
        let xurl = zin.slice(2,positionB);
        let positionl = xurl.indexOf("|"); // test of er een | in zit voor afmetingen img
        if (positionl !=-1 ) {
            console.log("er is een |");   
            console.log(xurl)
            
            styleinf = xurl.slice(positionl+1) 
            console.log(styleinf)
            xurl = xurl.slice(0,positionl) 
            console.log(xurl)
            if (styleinf != "") {  //voeg format voor plaatje in , dit kan nog uitgewerkt.
                stylex = styleinf
              
               
            }
         }  
    

         console.log(stylex)
        zinUit = zinUit + "<img src='" + xurl+"' " +stylex+">" ;
        console.log(zinUit)

        zin = zin.slice(positionB+1); 
    }
    else { //dus url
        let positionC = zin.indexOf(" ");
        if ( (positionC ==-1 ) || (positionB < positionC)) {  // er staat geen spatie tussen de []
            let xurl = zin.slice(1,positionB);
            let xlabel="*";
            zinUit = zinUit + '<a href="' + xurl + '" target="_blank">' + xlabel + '</a>' ;
            zin = zin.slice(positionB+1);

        } else { // er zit wel een spatie tussen de []
            let xurl = zin.slice(1,positionC);
            let xlabel=zin.slice(positionC+1,positionB);
            zinUit = zinUit + '<a href="' + xurl + '" target="_blank">' + xlabel + '</a>' ;
            zin = zin.slice(positionB+1);

        }
    }

  }  // end while

  return zinUit;
}

}

/*
     FILE ARCHIVED ON 13:12:42 Oct 02, 2025 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 08:15:28 May 07, 2026.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  capture_cache.get: 1.377
  load_resource: 83.703
  PetaboxLoader3.resolve: 45.293
  PetaboxLoader3.datanode: 24.079
*/