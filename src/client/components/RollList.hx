package components;

import mithril.M;
import models.RollType;

class RollList implements Mithril
{
    public function new() {

    }

    private function sendRequest(rollType) {
      RollType.rollType = rollType;
    }

    public function view() [
      m('div', {"class": "card"}, 
        m('div', {"class": "card-content"}, 
          m('ul', {"class": "collection"}, [
            m('h6', {"class": "center-align", style: {marginLeft: "50px"}}, "Pick Dice Roll Type"),
            m('li', {"class": "collection-item avatar waves-effect center-align", onclick: sendRequest.bind("ONE_DIE_ROLL")}, [
              m('i', {"class": "material-icons circle", style: {marginTop: "10px"}}, "casino"),
              m('h3', {"class": "title flow-text", style: {fontSize: "20px"}}, "One Die Roll"),
            ]),
            m('li', {"class": "collection-item avatar waves-effect center-align", onclick: sendRequest.bind("DICE_ROLL")}, [
              m('i', {"class": "material-icons circle", style: {marginTop: "10px"}}, "casino"),
              m('h3', {"class": "title flow-text", style: {fontSize: "20px"}}, "Dice Roll"),
            ]),
            m('li', {"class": "collection-item avatar waves-effect center-align", onclick: sendRequest.bind("DROP_LOWEST_ROLLS")}, [
              m('i', {"class": "material-icons circle", style: {marginTop: "10px"}}, "casino"),
              m('h3', {"class": "title flow-text", style: {fontSize: "20px"}}, "Drop Lowest Rolls"),
            ]),
            m('li', {"class": "collection-item avatar waves-effect center-align", onclick: sendRequest.bind("KEEP_HIGHEST_ROLLS")}, [
              m('i', {"class": "material-icons circle", style: {marginTop: "10px"}}, "casino"),
              m('h3', {"class": "title flow-text", style: {fontSize: "20px"}}, "Keep Highest Rolls"),
            ]),
            m('li', {"class": "collection-item avatar waves-effect center-align", onclick: sendRequest.bind("EXPLOSIVE_ROLL")}, [
              m('i', {"class": "material-icons circle", style: {marginTop: "10px"}}, "casino"),
              m('h3', {"class": "title flow-text", style: {fontSize: "20px"}}, "Explosive Roll"),
            ]),
            m('li', {"class": "collection-item avatar waves-effect center-align", onclick: sendRequest.bind("LITERAL_VALUE")}, [
              m('i', {"class": "material-icons circle", style: {marginTop: "10px"}}, "casino"),
              m('h3', {"class": "title flow-text", style: {fontSize: "20px"}}, "Literal Value"),
            ]),
          ])
        )
      )
    ];
}