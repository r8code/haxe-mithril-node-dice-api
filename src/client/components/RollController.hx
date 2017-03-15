package components;

import mithril.M;
import models.RollType;
import controllers.OneDieRoll;
import controllers.DiceRoll;
import controllers.DropLowestRolls;
import controllers.KeepHighestRolls;
import controllers.ExplosiveRoll;
import controllers.LiteralValue;
import models.RollType.RollTypes;

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
        case RollTypes.ONE_DIE_ROLL:
          rollType = m('h1', {"class": "center-align"}, oneDieRoll.view());
        case RollTypes.DICE_ROLL:
          rollType = m('h1', {"class": "center-align"}, diceRoll.view());
        case RollTypes.DROP_LOWEST_ROLLS:
          rollType = m('h1', {"class": "center-align"}, dropLowestRolls.view());
        case RollTypes.KEEP_HIGHEST_ROLLS:
          rollType = m('h1', {"class": "center-align"}, keepHighestRolls.view());
        case RollTypes.EXPLOSIVE_ROLL:
          rollType = m('h1', {"class": "center-align"}, explosiveRoll.view());
        case RollTypes.LITERAL_VALUE:
          rollType = m('h1', {"class": "center-align"}, literalValue.view());
      }
      return rollType;
    }
  
    public function view() [
      m('div', {"class": ""}, getRollType())
    ];
}