package utils;

import js.npm.express.Middleware;
import js.npm.express.Request;
import js.npm.express.Response;
import js.RegExp;
import Lambda;

typedef ErrorHandler = String -> Void;
typedef OneDieRoll = {
  rollValue:Int
}
typedef RollDiceObj = {
  diceGroup:Array<Int>,
  rollTotal:Int
}
typedef DropLowestRollsObj = {
  diceGroup:Array<Int>,
  rollTotal:Int,
  dropped:Int
}
typedef KeepHighestRollsObj = {
  diceGroup:Array<Int>,
  rollTotal:Int,
  kept:Int
}
typedef ExplosiveRollObj = {
  diceGroup:Array<Int>,
  rollTotal:Int,
  exploded:Int
}
typedef LiteralValueObj = {
  rollValue:Int
}

class MathUtil {
  var handleError:ErrorHandler;

  var rollRegex:Array<Dynamic> = [];
  var rollNum:Int;
  var diceNum:Int;
  var diceIntGroup:Array<Int>;
  var rollTotal:Int = 0;

  var keepNum:Int ;
  var dropNum:Int;
  var explodedNum:Int;
  var exploded:Int = 0;

  public function new(_handleError:ErrorHandler) {
    handleError = _handleError;
  }

  public function rollDie(min:Int, max:Int):Int {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  public function oneDieRoll(rollValue:String):OneDieRoll {
    rollRegex = new RegExp("^d([1-8])$").exec(rollValue);
    if (rollRegex == null) {
      handleError(rollValue);
    } else {
      if (rollRegex[1] != null) {
        rollNum = Std.parseInt(rollRegex[1]);
      } else {
        handleError(rollValue);
      }
      return {rollValue: rollDie(1, rollNum)}
    }
    return {rollValue: rollDie(1, rollNum)}
  }
  
  public function rollDice(rollValue:String):RollDiceObj {
    rollRegex = new RegExp("^([0-9]*)?d([1-8])$").exec(rollValue);
    diceIntGroup = [];
    
    if (rollRegex == null) {
      handleError(rollValue);
    } else {
      if (rollRegex[1] != null) {
        diceNum = Std.parseInt(rollRegex[1]);
      } else {
        handleError(rollValue);
      }
      if (rollRegex[2] != null) {
        rollNum = Std.parseInt(rollRegex[2]);
      } else {
        handleError(rollValue);
      }
      for (i in 0...diceNum) {
        var roll = rollDie(1, rollNum);
        rollTotal += roll;
        diceIntGroup.push(roll);
      }
      return {diceGroup: diceIntGroup, rollTotal: rollTotal};
    }
    return null;
  }
  
  public function dropLowestRolls(rollValue:String):DropLowestRollsObj {
    rollRegex = new RegExp("^([0-9]*)?d([1-8])?d([1-8])$").exec(rollValue);
    diceIntGroup = [];

    if (rollRegex == null) {
      handleError(rollValue);
    } else {

      if (rollRegex[1] != null) {
        diceNum = Std.parseInt(rollRegex[1]);
      } else {
        handleError(rollValue);
      }
      if (rollRegex[2] != null) {
        rollNum = Std.parseInt(rollRegex[2]);
      }
      if (rollRegex[3] != null) {
        dropNum = Std.parseInt(rollRegex[3]);
      } else {
        handleError(rollValue);
      }

      for (i in 0...diceNum) {
        var roll = rollDie(1, rollNum);
        diceIntGroup.push(roll);
      }

      diceIntGroup.sort(function(a, b):Int {
          if(a < b) return -1;
          else if(a > b) return 1;
          else return 0;
      });

      diceIntGroup = diceIntGroup.slice(0, diceIntGroup.length - dropNum);

      Lambda.map(diceIntGroup, function(value) { 
        rollTotal += value;
      });

      return {diceGroup: diceIntGroup, rollTotal: rollTotal, dropped: dropNum};
    }
    return null;
  }
  
  public function keepHighestRolls(rollValue:String):KeepHighestRollsObj {
    rollRegex = new RegExp("^([0-9]*)?d([1-8])?k([1-8])$").exec(rollValue);
    diceIntGroup = [];

    if (rollRegex == null) {
      handleError(rollValue);
    } else {

      if (rollRegex[1] != null) {
        diceNum = Std.parseInt(rollRegex[1]);
      } else {
        handleError(rollValue);
      }
      if (rollRegex[2] != null) {
        rollNum = Std.parseInt(rollRegex[2]);
      }
      if (rollRegex[3] != null) {
        keepNum = Std.parseInt(rollRegex[3]);
      } else {
        handleError(rollValue);
      }

      for (i in 0...diceNum) {
        var roll = rollDie(1, rollNum);
        diceIntGroup.push(roll);
      }

      for (i in 0...diceNum) {
        var roll = rollDie(1, rollNum);
        diceIntGroup.push(roll);
      }

      diceIntGroup.sort(function(a, b) {
          if(a > b) return -1;
          else if(a < b) return 1;
          else return 0;
      });

      diceIntGroup = diceIntGroup.slice(0, keepNum);

      Lambda.map(diceIntGroup, function(value) { 
        rollTotal += value;
      });
      return {diceGroup: diceIntGroup, rollTotal: rollTotal, kept: keepNum};
    }
    return null;
  }

  public function explosiveRoll(rollValue:String):ExplosiveRollObj {
    rollRegex = new RegExp("^([0-9]*)?d([1-8])?x([1-8])$").exec(rollValue);
    diceIntGroup = [];

    if (rollRegex == null) {
      handleError(rollValue);
    } else {

      if (rollRegex[1] != null) {
        diceNum = Std.parseInt(rollRegex[1]);
      } else {
        handleError(rollValue);
      }
      if (rollRegex[2] != null) {
        rollNum = Std.parseInt(rollRegex[2]);
      }
      if (rollRegex[3] != null) {
        explodedNum = Std.parseInt(rollRegex[3]);
      } else {
        handleError(rollValue);
      }

      for (i in 0...diceNum) {
        var roll = rollDie(1, rollNum);
        if(roll < explodedNum) {
          rollTotal += roll;
          diceIntGroup.push(roll);
        } else {
          while(roll > explodedNum) {
            exploded++;
            roll = rollDie(1, rollNum);
          }
          rollTotal += roll;
          diceIntGroup.push(roll);
        }
      }
      return {diceGroup: diceIntGroup, rollTotal: rollTotal, exploded: exploded};
    }
    return null;
  }

  public function literalValue(rollValue:String):LiteralValueObj {
    rollRegex = new RegExp("^([1-8])$").exec(rollValue);
    diceIntGroup = [];
    
    if (rollRegex == null) {
      handleError(rollValue);
    } else {
      if (rollRegex[1] != null) {
        rollNum = Std.parseInt(rollRegex[1]);
      } else {
        handleError(rollValue);
      }
      return {rollValue: rollNum}
    }
    return null;
  }
  
}