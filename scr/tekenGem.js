

function regioKleur(str) {
  if (str < 60 ) {
    tst2 = gemData[str]["regio"];
    tst4 = regio[tst2]["kleur"];
  } else tst4 ="purple"
  return tst4
}

function tekenGemeentes() {
  console.log('mapInstellingen');
  console.log(mapInstellingen);
  if (mapInstellingen['gemFill'] != null ) {gemFill = mapInstellingen['gemFill'] } else {gemFill= 0.2}
  if (mapInstellingen['gemOpacity'] != null ) {gemOpacity = mapInstellingen['gemOpacity'] } else {gemOpacity= 0.1}

       L.geoJSON(gemeentes, {
           style: function(feature) {
             var myStyle = {
                 "color": "Black",
                 "fillColor" : regioKleur(feature.properties.code),
                 "weight": 1,
                   "opacity": gemOpacity,
                "fillOpacity" : gemFill,
             };
                return myStyle;
           }
       }).bindPopup(function (layer) {
         nr = layer.feature.properties.code
         nrRegio = gemData[nr]["regio"]
         gem = gemData[nr]["naam"]
         link = gemData[nr]["site"]
         linkC1 = "https://allecijfers.nl/gemeente/" + gem.toLowerCase();
         let linkC2 = linkC1.replace(" ", "-");
         let linkC3 = linkC2.replace(" ", "-");
         let linkCijfers = linkC3.replace(" ", "-");
         linkVerkiezing = linkCijfers +"#verkiezingsuitslagen"
         let extra ="";
         if  (regio[nrRegio]["extra"]!= null) {extra =regio[nrRegio]["extra"] }
         txt ="<b>"+gem+"</b><br>regio: "+regio[nrRegio]["naam"]+ "<br><a href='"+link+"' target='_blank'>website van gemeente</a><br>";
         if (gemData[nr]["WM"]!=null) { txt = txt+"Wethouder mobiliteit: "+ parseW(gemData[nr]["WM"]) +"<BR>" }
         txt = txt +"<a href='"+linkCijfers+"' target='_blank'>alleCijfers van gemeente</a><br>";
         txt = txt + "<a href='"+linkVerkiezing +"' target='_blank'>verkiezingsuitslag</a><br>"+extra
    return txt;
  }).addTo(map);
// legenda uitbreiden
  var legendHTML = ''
  for (let x in regio) {
    if (regio[x]["site"]  != null) {strx  =  '<a href="'+regio[x]["site"]+'"target="_blank">'+regio[x]["naam"]+'</a>'}
    else {strx  =  regio[x]["naam"]}
    legendHTML += '<i style=" opacity: 0.1; background-color:' + regio[x]["kleur"] + '; text-align: center"></i><span>'+strx +'</span><BR>' ;
  }
  const legC = document.getElementById("legendContent");
  legC.innerHTML = legendHTML
}