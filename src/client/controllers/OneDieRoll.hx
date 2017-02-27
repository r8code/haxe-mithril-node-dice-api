package controllers;

import mithril.M;
import Lambda;

class OneDieRoll implements Mithril
{
    var rollValue:String = "";
    var reqValue:String = "";
    var reqLoaded:Bool = false;
    var initialLoad:Bool = false;
    var reqData:Dynamic = [];

    public function new() {

    }

    private function rollDice() {
      reqLoaded = false;
      initialLoad = true;
      M.request({
        method: "POST",
        url: "http://localhost:3000/roll",
        data: {type: "ONE_DIE_ROLL", payload: {"rollValue": rollValue}},
        withCredentials: false
      }).then(function(res) {
        reqLoaded = true;
        reqData = res;
        trace(res);
      }).catchError(function(res) {
        reqLoaded = false;
        initialLoad = false;
        js.Browser.alert("Request to server has failed - " + res);
      });
    }

    public function renderDiceImages():Array<mithril.Vnodes> {
      return [
        m('div', {style: {display: "inline-block", padding: "20px"}}, [
          m('img', {src: '../assets/dice-${reqData.rollValue}.png'}),
          m('p', {}, 'Die Value: ${reqData.rollValue}'),
        ])
      ];
    }

    public function renderDice():Array<mithril.Vnodes> {
      if(reqLoaded == false && initialLoad == true) {
        return [
        m('div', {"class": "preloader-wrapper small active", style: {margin: "30px"}}, 
          m('div', {"class": "spinner-layer spinner-green-only"}, [
            m('div', {"class": "circle-clipper left"}, 
              m('div', {"class": "circle"})
            ),
            m('div', {"class": "gap-patch"}, 
              m('div', {"class": "circle"})
            ),
            m('div', {"class": "circle-clipper right"}, 
              m('div', {"class": "circle"})
            ),
          ])
        )];
      } else if (reqLoaded == true && initialLoad == true) {
        return [m('div', {style: {paddingBottom: "30px"}}, renderDiceImages())];
      } else {
        return [m('div', {"class": "", style: {paddingBottom: "30px"}}, "Choose a dice expression.")];
      }
    }
    
    public function view() [
      m('div', {"class": "card center-align"}, [
        m('h3', {"class": ""}, "One Die Roll"),
        m('h6', {"class": ""}, "Roll One Die (Accepted Values: [1-8]) - Example: 'd4'"),
        m('a', {"class": "waves-effect btn-flat", onclick: rollDice}, "Click To Roll Dice"),
        m('div', {"class": "input-field"}, [
          m('input', {
            placeholder: "dX",
            oninput: function(e) rollValue = e.target.value,
            value: rollValue
          }),
        ]),
        m('div', {}, renderDice()),
      ]),
    ];
    
}