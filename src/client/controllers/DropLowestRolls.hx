package controllers;

import mithril.M;
import Lambda;

class DropLowestRolls implements Mithril
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
        data: {type: "DROP_LOWEST_ROLLS", payload: {"rollValue": rollValue}},
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
      var diceArray:Array<mithril.Vnodes> = [m('h4', {}, 'Total: ${reqData.rollTotal}'), ];
      for(i in 0...reqData.diceGroup.length) {
        var die = reqData.diceGroup[i];
        diceArray.push(
          m('div', {style: {display: "inline-block", padding: "20px"}}, [
            m('img', {src: '../assets/dice-${die}.png'}),
            m('p', {}, 'Die Value: ${die}'),
          ])
        );
      }
      return diceArray;
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
        m('h3', {"class": ""}, "Drop Lowest Rolls"),
        m('h6', {"class": ""}, "Drop the lowest rolls (Accepted Values [1-∞]d[1-8]d[1-8]) - Example '10d4d2'"),
        m('a', {"class": "waves-effect btn-flat", onclick: rollDice}, "Click To Roll Dice"),
        m('div', {"class": "input-field"}, [
          m('input', {
            placeholder: "N​dX​dD​",
            oninput: function(e) rollValue = e.target.value,
            value: rollValue
          }),
        ]),
        m('div', {}, renderDice()),
      ]),
    ];
}