---
layout: pzh
title: Snelstudielijst
header_image: \mobiliteit\img\zandmotorstrand.jpg
menu: |
    <a href="werkwijzer.html">toelichting</a>

---
# Snelstudies

Snelstudies zijn kortlopende onderzoeken waarin we in teamverband intensief aan kansen voor Zuid-Holland werken. Meer informatie [over snelstudies](werkwijzer).

<div class="item-list">
  {% for item in site.data.items %}
    {% include item.html item=item %}
  {% endfor %}
</div>
