package utils;

import js.npm.express.Middleware;
import js.npm.express.Request;
import js.npm.express.Response;
import utils.MathUtil;

class Routes {

  public static function route(app:js.npm.express.Application) {
    app.post('/roll', function(req:Dynamic, res:Response) {

      var handleError:MathUtil.ErrorHandler = function(rollValue) {
        res.status(500).send("Invalid dice expression - " + rollValue);
        throw "Invalid dice expression: " + rollValue;
      }
      var mathUtil = new MathUtil(handleError);
      var type:String = req.body.type;
      var payload:Dynamic = req.body.payload;
      
      switch(type) {
        case 'ONE_DIE_ROLL':
          res.json(mathUtil.oneDieRoll(payload.rollValue));
        case 'DICE_ROLL':
          res.json(mathUtil.rollDice(payload.rollValue));    
        case 'DROP_LOWEST_ROLLS':
          res.json(mathUtil.dropLowestRolls(payload.rollValue));
        case 'KEEP_HIGHEST_ROLLS':
          res.json(mathUtil.keepHighestRolls(payload.rollValue)); 
        case 'EXPLOSIVE_ROLL':
          res.json(mathUtil.explosiveRoll(payload.rollValue));
        case 'LITERAL_VALUE':
          res.json(mathUtil.literalValue(payload.rollValue));    
        default:
          trace("No type submitted.");
      }
    }); 
  }
}