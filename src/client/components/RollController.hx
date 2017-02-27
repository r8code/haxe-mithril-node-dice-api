package components;

import mithril.M;
import models.RollType;
import controllers.OneDieRoll;
import controllers.DiceRoll;
import controllers.DropLowestRolls;
import controllers.KeepHighestRolls;
import controllers.ExplosiveRoll;
import controllers.LiteralValue;

class RollController implements Mithril
{
    var oneDieRoll = new OneDieRoll();
    var diceRoll = new DiceRoll();
    var dropLowestRolls = new DropLowestRolls();
    var keepHighestRolls = new KeepHighestRolls();
    var explosiveRoll = new ExplosiveRoll();
    var literalValue = new LiteralValue();
    
    public function new() {
      
    }

    private function getRollType():mithril.Vnodes {
      var rollType = m('h1', {"class": "center-align"}, oneDieRoll.view());
      switch(RollType.rollType) {
        case "ONE_DIE_ROLL":
          rollType = m('h1', {"class": "center-align"}, oneDieRoll.view());
        case "DICE_ROLL":
          rollType = m('h1', {"class": "center-align"}, diceRoll.view());
        case "DROP_LOWEST_ROLLS":
          rollType = m('h1', {"class": "center-align"}, dropLowestRolls.view());
        case "KEEP_HIGHEST_ROLLS":
          rollType = m('h1', {"class": "center-align"}, keepHighestRolls.view());
        case "EXPLOSIVE_ROLL":
          rollType = m('h1', {"class": "center-align"}, explosiveRoll.view());
        case "LITERAL_VALUE":
          rollType = m('h1', {"class": "center-align"}, literalValue.view());
      }
      return rollType;
    }
  
    public function view() [
      m('div', {"class": ""}, getRollType())
    ];
}