package components;

import mithril.M;

class Header implements Mithril
{
    public function new() {
      
    }

    public function view() [
      m('ul', {"class": "center-align"}, m('img', {src: "../assets/dice-header-icon.png"})),
      m('h3', {"class": "center-align"}, "Dice API - Troy Edwards")
    ];
}