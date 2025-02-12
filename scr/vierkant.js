const SchaalStedelijk=  ['#ffffe5','#87477f','#d92023','#f19353','#fede99','#faf0ca','#f5efe6']; //'#c8c8ca'
//                          0           1          2      3         4          5        6          7        8          9
const LabelNabij = [0,'Hoog stedelijk','Stedelijk','Suburbaan','Laag suburbaan','Dorps','Landelijk']

function plotVierkanten4(json,kolom,kolom2) {
// voorbeeld item in json: ["E0930N4825",...vier latLon en dan values  kolom geeft de value die kleur bepaalt+8
const Schaalgroengeel = ['#ffffe5','#ffffe5','#f7fcb9','#d9f0a3','#addd8e','#78c679','#41ab5d','#238443','#006837','#004529'];
const SchaalOV =        ['#ffffe5','#004529','#238443','#78c679','#addd8e','#d9f0a3','#ffffe5','#ffffe5','#ffffe5','#004529'];

  for(itemi in json) {
    item = json[itemi];
    var polyg = [ [item[1],item[2]], [item[3],item[4]], [item[5],item[6]],  [item[7],item[8]] ];
    waarde = item[kolom+8]; // kolom 0 = cel ID, kolom 1 t/m 8 cooordinaat, daarna de waardes
    intwaarde= Math.min(Math.floor(waarde),9);
    if (waarde <0 ) {var prop = {fillColor: "#FFFFFF" ,fillOpacity: 0,stroke : false}} //niet inkleuren
    else {

      if (kolom == 9) {vulkleur = SchaalOV[waarde]; vul = 0.5} 
      else if (kolom == 10) {vulkleur = SchaalStedelijk[waarde]; vul = 0.7}   
      else    {vulkleur = Schaalgroengeel[intwaarde]; if (intwaarde >5 ) {vul = 0.5 } else {vul = 0.3} }  // lage waarden lichtere vulling 
      
      var prop ={fillColor: vulkleur ,fillOpacity: vul,stroke : true,color: vulkleur,weight:1,opacity: 0.2}

      if (kolom2 !=0){ //randje andere kleur
        if (kolom2 == 9) {randkleur = SchaalOV[waarde];} 
        else if (kolom2 == 10) {waarde2 = item[kolom2+8]; randkleur = SchaalStedelijk[waarde2]; }   
        else    {randkleur = Schaalgroengeel[intwaarde]; prop.weight = 4;
        }  // lage waarden lichtere vulling 
      } else {randkleur = vulkleur}
      prop.color = randkleur;

    }
    var poptxt =  "<p><b>Score: " + waarde + "</b></p><ul>" ;
    for (let tel = 0; tel < 13; tel++) {
      if (item[9+tel] > 0){
        poptxt = poptxt + "<li>" + labels[tel] + ": " + item[9+tel] +"</li>"
      }
    }
    poptxt = poptxt + "</ul> Tegel : " + item[0]
    marker = L.polygon(polyg,prop).addTo(map).bindPopup(poptxt);
  }
}
