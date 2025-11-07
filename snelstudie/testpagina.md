---
layout: pzh
title: testpagina
header_image: \mobiliteit\img\zandmotorstrand.jpg
menu: |
   <a href="werkwijzer.html">toelichting</a>
   <a href="snelstudies.html">andere snelstudies</a>
---
# Snelstudies Test
## kop 2
### kop 3

 
 {% include klikblok.html
   img="img\fietesnstallingvandetoekomst.png"
   title="Rapport Fietsenstalling van de toekomst"
   url="https://movares.com/projecten/fietsenstalling-van-de-toekomst"
   text="Dit is een klikbaar klikblok. Een mooie studie van oa Movaris over het ruimtelijke vraagstuk rondom fietsenstallingen en de diversiteit in type fietsen." %} 

   klikblok zonder titel

   
 {% include klikblok.html
   img="img\fietesnstallingvandetoekomst.png"
   title="Rapport Fietsenstalling van de toekomst"
   url="https://movares.com/projecten/fietsenstalling-van-de-toekomst"
   text="Dit is een klikbaar klikblok. Een mooie studie van oa Movaris over het ruimtelijke vraagstuk rondom fietsenstallingen en de diversiteit in type fietsen." %} 

en nu door naar blok
 zonder url

{% include blok.html
   img="img\fietesnstallingvandetoekomst.png"
   title="Rapport Fietsenstalling van de toekomst"
   text="Dit is een klikbaar blok. Een mooie studie van oa Movaris over het ruimtelijke vraagstuk rondom fietsenstallingen en de diversiteit in type fietsen." %} 

blok  zonder title

{% include blok.html
   img="img\fietesnstallingvandetoekomst.png"
   url="https://movares.com/projecten/fietsenstalling-van-de-toekomst"
   text="Dit is een klikbaar blok. Een mooie studie van oa Movaris over het ruimtelijke vraagstuk rondom fietsenstallingen en de diversiteit in type fietsen." %} 




<div class="tekstblok">
  Deze snelstudie is net gestart en hopen we in november 2025 te voltooien (het resultaat komt op deze webpagina). Het is een samenwerking van provincie Zuid-Holland (<a href="https://kennis.zuid-holland.nl/" target="_blank">kennis Zuid-Holland</a>) en <a href="https://labverantwoordemobiliteit.nl/" target="_blank">LVM</a>. Toelichting <a href="werkwijzer.html" target="_blank">Snelstudie programma</a>.
 </div>


test  van tekstblok

{% include tekstblok.html
   bg="#beb1a7"
   title="test van tekstblok "
   text="Dit is een tekstblok met titel." %}


{% include videoblok.html
  video="HFgbAw92CGulizLd"
  title="Trein & Fiets: de perfecte match"
  text="Bekijk hoe deze combinatie werkt in de praktijk bij de TU Delft."
  url="https://www.tudelft.nl/citg/onderwijs/student-stories/trein-fiets-de-perfecte-match"
%}

nog een poging voor video blok:

<div class="item single-block"{{ style }}>
    <div class="item-left">
     <iframe width="560" height="315" src="https://www.youtube.com/embed/D2sYm-d0E3Y?si=Xhu-10l87Lr_QDdt" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    </div>
    <div class="item-right">
      {% if include.title %}
        <h2>Titel </h2>
      {% endif %}
      <p>tekst ...... tekst</p>
    </div>
  </div>
 en nog een

<div class="item single-block"{{ style }}>
    <div class="item-left">
     <iframe  src="https://www.youtube.com/embed/D2sYm-d0E3Y?si=Xhu-10l87Lr_QDdt" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    </div>
    <div class="item-right">
      {% if include.title %}
        <h2>Titel </h2>
      {% endif %}
      <p>tekst ...... tekst</p>
    </div>
  </div>


{% include tekstblok.html
   bg="#beb1a7"
   text="Dit is een tekstblok zonder titel." %}
....
{% include tekstblok.html
   text="Dit is een tekstblok zonder titel en kleurcode." %}



 De uitdaging is veel fietsers te faciliteren die per fiets aankomen of vertrekken, en tevens te zorgen dat deze fietsen zo kort mogelijk stilstaan op het station.

 De hoofdvraag is: 


**Hoe kunnen fietsenstallingen (op stations) efficiënter benut worden zodat stallen kosten-efficiënter wordt en de combinatie fiets-trein aantrekkelijker wordt?**

### Deelvragen:
- Welke type gebruikers van stallingen zijn er (korte vs lange duur) (normaal vs speciale fietsen)?
- Wat is de huidige efficiëntie van fietsenstallingen (doorlooptijd en bezettingsgraad)?
- Welke mogelijkheden zijn er om stallingen beter te benutten?
- Hoe zorg je dat mensen deze mogelijkheden ook daadwerkelijk gebruiken (denk aan prijsprikkels)?


<div class="tekstblok">
Voor meer informatie en meedoen: mail projectleider Igor Koster: Igor Koster I.Koster-2@student.tudelft.nl of ra.haverman@pzh.nl. Hieronder bouwen we de studie in draft op. Alles kan nog veranderen. 
</div>

## 2. De efficiëntie van fietsenstallingen 
Bij de efficientie van een fietsenstalling spelen twee factoren een grote rol
1. Hoeveel ruimte een fiets inneemt
2. Hoe lang (hoeveel dagen) de fiets daar staat voor hij weer een rit maakt

Naar de ruimte-efficientie zijn veel studies gedaan. Het mooiste zijn natuurlijk de standaard fietsen die netjes in de rekken passen omdat die de aanmerkelijk inder ruimte innemen dan buiten model fietsen. !Hier linken naar Movaris studie daarover.



Een onderbelicht aspect is de tijd dat de fiets gestald staat tot zijn volgende rit. Deze tijd varieert enorm (van minuten tot vele dagen). In deze snelstudie duiken we in het aspect van de stallingsduur omdat zal blijken dat dit van grote invloed is op het maatschappelijk rendement van de stalling en we denken dat we daarop kunnen sturen als maatschappij.

{% include blok.html
   bg="#beb1a7"
   title="Rapport Fietsenstalling van de toekomst"
   img="img\fietesnstallingvandetoekomst.png"
   text="Dit is een NIET klikbaar blok met bg=. Een mooie studie van oa Movaris over het ruimtelijke vraagstuk rondom fietsenstallingen en de diversiteit in type fietsen." %}

Een onderbelicht aspect is de tijd dat de fiets gestald staat tot zijn volgende rit. Deze tijd varieert enorm (van minuten tot vele dagen). In deze snelstudie duiken we in het aspect van de stallingsduur omdat zal blijken dat dit van grote invloed is op het maatschappelijk rendement van de stalling en we denken dat we daarop kunnen sturen als maatschappij.



{% include klikblok.html
   img="img\fietesnstallingvandetoekomst.png"
   title="Rapport Fietsenstalling van de toekomst"
   url="https://movares.com/projecten/fietsenstalling-van-de-toekomst"
   text="Dit is een klikbaar blok. Een mooie studie van oa Movaris over het ruimtelijke vraagstuk rondom fietsenstallingen en de diversiteit in type fietsen." %}

Een onderbelicht aspect is de tijd dat de fiets gestald staat tot zijn volgende rit. Deze tijd varieert enorm (van minuten tot vele dagen). In deze snelstudie duiken we in het aspect van de stallingsduur omdat zal blijken dat dit van grote invloed is op het maatschappelijk rendement van de stalling en we denken dat we daarop kunnen sturen als maatschappij.


## 3. Een analyse van de gebruikers en hun fiets
### Soorten fietsen


Zo neemt een bakfiets veel meer ruimte in dan een stadsfiets, en heeft een e-bike idealiter de beschikking over een laadplek.   


{% include blok.html
   img="img/Figuurtypefietsen.jpg"
   text="Op dit moment groeit het aandeel buitenmodel fietsen ten opzichte van de normale stadsfietsen. Buitenmodel fietsen zijn fietsen met bijvoorbeeld mandjes, kinderzitjes, erg brede sturen of andere elementen waardoor ze niet in standaard (dubbellaagse) fietsenrekken passen. Dat betekent dat in stallingen steeds meer ruimte nodig is om deze fietsen te accommoderen, wat ten koste kan gaan van de totale stallingscapaciteit ( [bron](https://www.rijkswaterstaat.nl/zakelijk/zakendoen-met-rijkswaterstaat/werkwijzen/werkwijze-in-gww/nederland-bereikbaar-hinderaanpak/toolbox/factsheet-fietsparkeren-bij-treinstations) ). " %}


  


### Typen gebruik
Wanneer men een fiets stalt in de fietsenstalling neemt dit logischerwijs een plek in, in deze stalling. Waar het om gaat is hoelang de fiets daar staat tot er weer iemand op weg fietst. Uit onderzoek blijkt dat wanneer veel mensen ook hun tweede of soms zelfs derde fiets in zulke stallingen plaatsen, dit betekent dat deze plekken voor lange tijd bezet blijven. Dit zorgt ervoor dat we in NEderland alsmaar stallingen moeten blijven bijbouwen op veelal dure en kostbare locaties. Dit kost de overheid en de provincies veel geld. Laen we kijken of het slimmer kan. 

**Gebruikersprofiel stallingsduur**  
We hebben de gebruikers in vijf categorieën ingedeeld. Binnen ieder type gebruik hebben we gekeken naar de geschatte  stallingsduur tussen twee ritten. 

<table class="table-container">
  <tr>
    <th style="min-width: 20%;">Categorie</th>
    <th >Omschrijving</th>
    <th style="min-width: 10%;">Dagen</th>
    <th style="min-width: 10%;">Rendement (ritten / dag)</th>

  </tr>
  <tr>
    <td>Voortransport</td>
    <td>Dit zijn gebruikers die hun privé fiets stallen bij het station in hun woonplaats, bijvoorbeeld als ze daarna met de trein naar werk of opleiding gaan.</td>
    <td>1 dag</td>
    <td>1</td>

  </tr>
  <tr>
    <td>Natransport</td>
    <td>Dit zijn gebruikers die een tweede of zelfs derde fiets stallen op een station van bestemming, bijvoorbeeld in de plaats waar ze werken. Deze fietsen overnachten vaak in de stalling en blijven vaak ook in het weekend staan. Gemiddeld staan deze fietsen 3,5 etmaal stil voordat er weer een rit gemaakt wordt. Dat is 4 keer zo lang vergeleken met een fiets die wordt gebruikt tussen woning en station (<a href="https://kennis.zuid-holland.nl/treingebruik-deelfiets/">bron</a>).</td>
    <td>3,5 dag</td>
    <td>1/3</td>

  </tr>
   <tr>
    <td>OV-fiets</td>
    <td>Gebruikers die de OV-fiets pakken. OV-fietsen overnachten meestal op het station</td>
    <td>1 tot 0,5</td>
    <td>1 a 2</td>

  </tr>
   <tr>
    <td>Deelfietsen (anders dan OV-fiets)</td>
    <td>Gebruikers van andere type deelfietsen dan de ov-fiets, bijvoorbeeld van DonkeyRepublic.</td>
    <td>kort (?hoe lang)</td>
    <td>1 a 2</td>

  </tr>
    <tr>
    <td>Wisselfiets</td>
    <td>(<a href="https://kennis.zuid-holland.nl/wisselfiets/">Wisselfietsen</a> zijn deelfietsen die maar kort stilstaan bij stations. De bedoeling is dat er mensen zijn die de Wisselfiets gebruiken van huis naar het station als eerste schakel voor een reis naar hun werk of opleiding. En dat er een andere groep mensen is die juist uit de trein stapt en de Wisselfiets voor het laatste stukje van de reis gebruikt.</td>
    <td>1 uur</td>
    <td>3 - 15</td>

  </tr>
</table>


Uit de tabel blijkt - wat velen wellicht aan aanvoelden - Dat het stallen van een 'tweede fietsje'in de plaats waar je werkt of een opleing volgt, voor de maatschappij een zeer inefficiente, dure zaak is.  Die fietsjes staan gemiddedeld 3,5 dag stilstaan totdat ze weer een rit maken. Dat komt ondat mensen lang iet iedere dag naar kantoor gaan. Soms met de auto gaan, wel een ziek zijn of op vakantie gaan. Veel mensen stallen ook een 'tweede' of 'derde' fietsje op stations waar ze niet vaak komen. Bijvoorbeeld in de plaats waar hun ouders wonen.

{% include blok.html
   img="img\kimrapport.png"
   title="Waar zouden we zijn zonder de fiets en de trein?"
   text="Er is flinke stallingdruk door fietsen die op het station klaar staan, voor vervoer naar werk, opleiding of een andere activiteit. Deze fietsen staan ongeveer vier keer zo lang achtereen gestald in een stationsstalling dan fietsen die worden gebruikt voor vervoer tussen huis en station en ze zorgen samen voor minimaal 45% van de stallingsdruk bezien over alle stations in Nederland." 
   url="https://www.kimnet.nl/publicaties/rapporten/2018/07/12/waar-zouden-we-zijn-zonder-de-fiets-en-de-trein"%}



Aan de andere kant van het spectrum zit de deelfiets. Die staat maar kort stil tussen twee ritten doordat hij van 'baasje wisselt'. Het concept [wisselfiets](https://kennis.zuid-holland.nl/wisselfiets/) spant de kroon met een rendement dat theoretisch naar oneindig gaat. Dit enorme rendement is niet eenvoudig te realiseren omdat het vraagt dat mensen van huis naar het station ook een deelfiets nemen (in plaats van hun eigen fiets). Zie  [wisselfiets](https://kennis.zuid-holland.nl/wisselfiets/) voor een uitleg van het concept.

Hoe dan ook. Een simpele rekensom leert ons dat wanneer zo’n tweede fiets (in de plaats waar mensen werken of studeren) vervangen wordt door een deelfiets, er veel meer fietsers naar en van het station kunnen fietsen zonder de stalling te hoeven uitbreiden.

{% include blok.html
   img="img\eindhoven.jpg"
   text="Een [stadsbreed deelfietsensysteem in Eindhoven](https://stadszaken.nl/artikel/8214/minder-ruimte-nodig-voor-stationsstallingen-met-deelfietssysteem) kan duizenden vierkante meters aan ruimte besparen die anders nodig zou zijn voor het stallen van privéfietsen [blijkt uit recent onderzoek](https://natuurlijkdeelmobiliteit.nl/product/casestudie-stadsbreed-deelfietssysteem-eindhoven/). Vooral in het centrum en bij stations ligt het besparingspotentieel hoog. De vraag is wel wanneer inwoners bereid zijn hun privéfiets in te ruilen voor een deelfiets.<details>De studie wil vooral bijdragen aan de discussie hoe we de fietsparkeeropgave zo ruimtelijk efficiënt mogelijk kunnen organiseren. Hier kan een stedelijk deelfietsensysteem een meerwaarde zijn. Deelfietsen zorgen namelijk voor de optimalisatie van de beschikbare ruimte door de rotatie van een deelfiets</details>" %}







Enkele vormen van deelfietsen zijn er natuurlijk al beschikbaar, denk aan de OV-fiets of deelfietsen van DonkeyRebuplic of Felix. Echter zijn deze vaak nog niet aantrekkelijk genoeg om mensen van hun tweede fiets af te krijgen. De kosten zijn te hoog, het gemak te laag en de beschikbaarheid te onzeker. In het volgende hoofdstuk kijken we welke barrieres er zijn om mensen meer van deelfietsen gebruik te laten maken en hoe we hen wllicht daartoe toech kunnen veleiden.

NOG TE BEANTWOORDEN:

Hoe vol zitten de Nederlandse fietsenstallingen bij stations op dit moment?  
Welk deel daarvan zijn tweede of derde fietsen, zwerffietsen of langstallers? 

Eventueel visualisering bezetting “gemiddelde” stationsfietsenstalling
 



## 3. Organisatie van fietsenstallingen bij stations (NS , ProRail, gemeenten) 

Om een analyse te doen over hoe het gebruik van fietsenstallingen efficiënter zou kunnen is het van belang om een beeld te hebben van het beheer van de fietsenstallingen. 

Fietsenstallingen in Nederland hebben ieder hun eigen gebruiksintentie. Waar in de ene stalling fietsers na 24 uur moeten betalen voor het stallen van hun fiets is dit in andere stallingen na 28 dagen, of is de stalling volledig gratis. Dit zorgt ook voor een ander gebruikerspatroon van deze stallingen. 

**Wie is de aanbieder?**

De verdeling van het onderhoud en beheer van de Nederlandse fiets parkeergelegenheden bij stations is drieledig. Waarbij de NS, ProRail en de lokale gemeente alle drie een grote rol op zich nemen. 

1. De rol van de NS  
   1. De NS is verantwoordelijk voor de exploitatie van de stallingen. Dit houdt onder andere in het inzetten van personeel, het schoonhouden van de stallingen maar ook het labelen van fietsen.  

2. De rol van Prorail  
   1. ProRail installeert de rekken en sensoren in de fietsenstallingen. Hierdoor heeft ProRail ook de beschikking over de data van fietsenstallingen. Echter wordt deze data maar beperkt gedeeld met andere partijen zoals de NS en de gemeente. Wat onderzoek naar de daadwerkelijke efficiëntie van fietsenstallingen beperkt.

3. De rol van de gemeente   
   1. De gemeente is dan weer verantwoordelijk voor het weghalen van fietsen. Worden fietsen als zwerffiets gelabeld, dan dient de gemeente deze op te halen. Hiervoor moet de NS dus een goede communicatie met de gemeente onderhouden. 



{% include blok.html
   img="img\Figuurbeheerfietsenstalling.jpg"
   title="Organisatie van stallingen"
   text="Door deze drieledige taakverdeling is coördinatie tussen deze partijen van groot belang" %}


<br>

{% include blok.html
   img="snelstudie\img\rapportIrene.png"
   title="Pedel tot platform"
   text="...Mooie masterscriptie TU Delft ....." %}


## 4. Hoe verkorten we de stallingsduur en verhogen zo het rendement?

...



Om de efficiëntie en stallingsduur van gebruikers te verbeteren zijn er een aantal mogelijkheden. Deze mogelijkheden zou je grofweg in kunnen delen in twee categorieën. Als eerste de mogelijkheden om de efficiëntie te verbeteren door anders om te gaan met het stallen van fietsen. Ten tweede door meer in te zetten op het gebruik van deelfietsen. De deelfiets staat immers veel minder lang stil in de stalling en kan hierdoor dus meer mensen bedienen dan een normale fiets. Hierdoor zijn er minder individuele fietsen nodig in de stallingen. 

1. **Anders omgaan met het stallen van fietsen**

   Hoe we onze fietsen stallen en onder welke voorwaarden dit gebeurt, bepaalt voor een aanzienlijk deel hoe de doorlooptijd van de fietsen binnen de stalling is. Wanneer men de efficiëntie van de stalling wil verhogen is het van belang om het aantal weesfietsen te reduceren en het langdurig stallen van fietsen moeilijk te maken.   
     
   Om weesfietsen snel te verwijderen is het nodig om goed bij te kunnen houden welke fietsen er al lang staan en of deze fietsen geen weesfietsen zijn. Denk hierbij aan het gebruik [van bonnen, barcodes, kaarten of tags](https://movares.com/wp-content/uploads/2025/05/Fietsenstalling-van-de-toekomst-De-route-naar-de-ideale-inpandige-fietsenstalling.pdf). Door hier dicht op te zitten kunnen weesfietsen vroegtijdig verwijderd worden, wat ruimte oplevert voor reguliere gebruikers.   
     
   Hiernaast kan het verhinderen van het langdurig stallen van een fiets bereikt worden door het financieel minder aantrekkelijk te maken je fiets lang te laten staan. Dit zal er ook direct voor zorgen dat het voor mensen met een tweede fiets minder aantrekkelijk wordt om deze in de stalling te plaatsen. Echter lost dit vaak niet direct het probleem op, maar zorgt het eerder voor een verschuiving van het probleem. In plaats van de fiets in de betaalde stalling te parkeren zal deze nu ergens anders komen te staan.   
     
   Om mensen echt efficiënt gebruik te laten maken van de fietsenstalling, en tegelijk te voorkomen dat men een tweede fiets in gebruik neemt, is een goed deelfietssysteem een mogelijke oplossing.


2. **Inzetten op deelfietsen**  
     
   Een deelfiets kan ervoor zorgen dat dezelfde fietsenstalling veel meer gebruikers van een fiets kan voorzien. Hierbij zijn er verschillende categorieën te identificeren die elk hun eigen doelgroep bedienen. Zoals beschreven in [Eindrapport: Naar een stedelijk deelfietssysteem voor Eindhoven](https://natuurlijkdeelmobiliteit.nl/wp-content/uploads/2025/06/Eindrapport-Naar-een-stedelijk-deelfietssysteem-voor-Eindhoven.pdf). kun je de deelfiets grofweg indelen in de volgende categorieën.  
       
   1. Back to one  
      Deze fietsen worden vanuit een centraal punt gehuurd en keren hier ook weer naartoe terug. Denk hierbij aan bijvoorbeeld de OV-fiets.

      2. Back to many (zoals Velo in Antwerpen)  
         Hierbij kunnen fietsen op veel verschillende, van te voren besloten plekken worden teruggezet. Denk aan in specifieke fietsenrekken of bij fietsenstallingen. Een voorbeeld hiervan is Velo in Antwerpen. 

      3. Free-floating  
         Hierbij kunnen fietsen overal worden achtergelaten mits dit binnen de drop zone valt. Denk hierbij aan bijvoorbeeld Felix. 

   Naast het type deelfiets, kan er ook gestuurd worden op hoe het deelfietssysteem ontwikkeld wordt. Laat je het volledig over aan de markt, waarbij de druk bezochte en financieel rendabele plekken zullen worden voorzien van fietsen. Of stuur je op een overheid gedreven systeem dat ook de minder rendabele plekken voorziet van deelfietsen. Die tweede zou natuurlijk wel een structurele overheidsinvestering vereisen. Echter zal dit wanneer goed uitgevoerd tot significante ruimtebesparing resulteren. Het geld zal nu dus niet zo veel in de fietsenstallingen geïnvesteerd hoeven worden maar meer in actieve mobiliteit. In de vorm van een deelfietssysteem

         Factoren die een rol kunnen spelen voor succes van zo’n deelfietssyteem zijn de tariefstelling, betrouwbaarheid en kwaliteit, en vertrouwbaarheid van de aanbieder. Waarbij het succes volgens [Eindrapport: Naar een stedelijk deelfietssysteem voor Eindhoven](https://natuurlijkdeelmobiliteit.nl/wp-content/uploads/2025/06/Eindrapport-Naar-een-stedelijk-deelfietssysteem-voor-Eindhoven.pdf) hem met name zit in de schaal en dichtheid van het systeem, de kosten voor de eindgebruiker, de zekerheid van een goed onderhouden fiets, een actieve herverdeling en de adoptie van het systeem door de lokale overheid om vertrouwen te creëren bij de eindgebruiker.

## 	5 Barrieres om over te stappen van 'tweede' fietsje op deelfiets 

!!! zullen we hier lijstje met iconen doen en dan de barrieres in tekst rechts?

{% include blok.html
   img="https://freesvg.org/img/1526536070.png"
   title="Te duur bij frequent ebruik"
   text="...Een OV-fiets kost .. per keer. Mensen gebruiken dit nauwelijks om dagelijks mee te reizen, tenzij de werkgever betaald ....." %}

{% include blok.html
   img="https://upload.wikimedia.org/wikipedia/commons/0/04/Bike_icon.png"
   title="Lastig steeds een andere fiets"
   text="... ....." %}


- Kosten   
- Ongemak van telkens een andere fiets  
- Er is te weinig *incentive* voor de gebruiker. Zolang er capaciteit is en dit gratis is, zien mensen geen heil in het aanpassen van hun mobiliteitgewoontes. 


## 6 Brainstorm opties om de overstap op deelfiets aantrekkelijk te maken
...
...

  ## 6\. De rol van de  overheden


Welke mogelijkheden hebben de overheden om de efficiëntie van fietsenstallingen te verhogen en daarmee de investeringskosten te verlagen?

{% include blok.html
   img="img/deelfiets_vaker_trein.jpg"
   title="Meer weten?"
   text="Klik voor meer informatie over dit onderwerp. [link wisselfiets](https://kennis.zuid-holland.nl/wisselfiets/)" %}
   <br>
{% include blok.html
   text="Klik voor meer informatie over dit onderwerp. [link wisselfiets](https://kennis.zuid-holland.nl/wisselfiets/)" %}
   <br>
 {% include blok.html
   img="img/deelfiets_vaker_trein.jpg"
   title="Meer weten?"
   text="Klik voor meer informatie over dit onderwerp. [link wisselfiets](https://kennis.zuid-holland.nl/wisselfiets/)" %}  


## Bronnen

Bronnen die interessant zouden zijn:




- [https://www.researchgate.net/publication/374006429\_Trends\_in\_access\_and\_egress\_transportation\_to\_and\_from\_train\_stations\_in\_The\_Netherlands](https://www.researchgate.net/publication/374006429_Trends_in_access_and_egress_transportation_to_and_from_train_stations_in_The_Netherlands)  
- [https://activetravelstudies.org/article/id/1392/](https://activetravelstudies.org/article/id/1392/)  
- [https://movares.com/projecten/fietsenstalling-van-de-toekomst/](https://movares.com/projecten/fietsenstalling-van-de-toekomst/)  
  - [https://movares.com/wp-content/uploads/2025/05/Fietsenstalling-van-de-toekomst-De-route-naar-de-ideale-inpandige-fietsenstalling.pdf](https://movares.com/wp-content/uploads/2025/05/Fietsenstalling-van-de-toekomst-De-route-naar-de-ideale-inpandige-fietsenstalling.pdf)  
- [https://www.rijkswaterstaat.nl/zakelijk/zakendoen-met-rijkswaterstaat/werkwijzen/werkwijze-in-gww/nederland-bereikbaar-hinderaanpak/toolbox/factsheet-fietsparkeren-bij-treinstations](https://www.rijkswaterstaat.nl/zakelijk/zakendoen-met-rijkswaterstaat/werkwijzen/werkwijze-in-gww/nederland-bereikbaar-hinderaanpak/toolbox/factsheet-fietsparkeren-bij-treinstations)   
- [https://www.nationaalfietscongres.nl/nieuws/20250506-naar-een-optimale-benutting-van-fietsenstallingen-1](https://www.nationaalfietscongres.nl/nieuws/20250506-naar-een-optimale-benutting-van-fietsenstallingen-1) 

Brainstorm

**Benutten mogelijkheden**

Hoe krijgen we mensen op de deelfiets?

- Betere parkeerplekken (sneller van stalling bij trein)  
  Financiële stimulans  
  - Korting of zelfs betaling om fiets snachts thuis te parkeren en op tijd terug naar station te brengen.  
- Breed aanbod van deelfiets locaties (niet alleen op 1 locatie maar op meerdere locatie deelfiets te gebruiken)  
- Misschien via een abonnement werking. 

1. **Anders omgaan met stallingen**  
   - Anders omgaan met stallingen / het stallen van de fiets  
     - 24 uur gratis, daarna betaald.  
       - Door een financiële prikkel toe te voegen wordt het langdurig stallen van fietsen ontmoedigd. Aangezien 90% van de fietsparkeerders zijn of haar fiets korter dan 24 uur bij een station parkeert, sluit dit goed aan bij de behoefte van treinreizigers (bron: [https://www.rijkswaterstaat.nl/zakelijk/zakendoen-met-rijkswaterstaat/werkwijzen/werkwijze-in-gww/nederland-bereikbaar-hinderaanpak/toolbox/factsheet-fietsparkeren-bij-treinstations](https://www.rijkswaterstaat.nl/zakelijk/zakendoen-met-rijkswaterstaat/werkwijzen/werkwijze-in-gww/nederland-bereikbaar-hinderaanpak/toolbox/factsheet-fietsparkeren-bij-treinstations) ).  
     - Bewaakt vs onbewaakt (schaal van grote van fietsenstallingen)







## Achtergrond info en links:
- [Wisselfiets](https://kennis.zuid-holland.nl/wisselfiets/)
- ...
