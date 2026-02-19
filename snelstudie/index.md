---
layout: pzh
title: Snelstudielijst
header_image: \mobiliteit\img\zandmotorstrand.jpg
menu: |
    <a href="werkwijzer.html">Wat een snelstudie is</a>
    <a href="\mobiliteit\festival.html">Festival Bereikbaar 24 maart</a>
---
# Snelstudies

Snelstudies zijn kortlopende onderzoeken waarin we in teamverband intensief aan kansen voor Zuid-Holland werken.

<div class="item-list">
  {% for item in site.data.items %}
    {% include item.html item=item %}
  {% endfor %}
</div>
