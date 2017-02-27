package utils;

import js.npm.express.Middleware;
import js.npm.express.Request;
import js.npm.express.Response;
import js.RegExp;
import Lambda;

class MathUtil {
  var res:Response;

  public function new(_res:Response) {
    res = _res;
  }

  public function handleError(rollValue) {
    res.status(500).send("Invalid dice expression - " + rollValue);
    throw "Invalid dice expression: " + rollValue;
  }

  public function rollDie(min:Dynamic, max:Dynamic) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  public function oneDieRoll(rollValue:String):Dynamic {
    var rollRegex = new RegExp("^d([1-8])$").exec(rollValue);
    var rollNum:Int = 0;

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
  
  public function rollDice(rollValue:String):Dynamic {
    var rollRegex = new RegExp("^([0-9]*)?d([1-8])$").exec(rollValue);
    var rollNum:Int = 0;
    var diceNum:Int = 0;
    var diceGroup:Array<Dynamic> = [];
    var rollTotal:Int = 0;

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
        diceGroup.push({rollValue: roll});
      }
      return {diceGroup: diceGroup, rollTotal: rollTotal};
    }
    return {diceGroup: diceGroup, rollTotal: rollTotal};
  }
  
  public function dropLowestRolls(rollValue:String):Dynamic {
    var rollRegex = new RegExp("^([0-9]*)?d([1-8])?d([1-8])$").exec(rollValue);
    var rollNum:Int = 0;
    var diceNum:Int = 0;
    var dropNum:Int = 0;
    var diceIntGroup:Array<Int> = [];
    var rollTotal:Int = 0;

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
    return {diceGroup: diceIntGroup, rollTotal: rollTotal, dropped: dropNum};
  }
  
  public function keepHighestRolls(rollValue:String):Dynamic {
    var rollRegex = new RegExp("^([0-9]*)?d([1-8])?k([1-8])$").exec(rollValue);
    var rollNum:Int = 0;
    var diceNum:Int = 0;
    var keepNum:Int = 0;
    var diceIntGroup:Array<Dynamic> = [];
    var rollTotal:Int = 0;

    var diceIntGroup = [];
    var rollTotal = 0;

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
    return {diceGroup: diceIntGroup, rollTotal: rollTotal, kept: keepNum};
  }

  public function explosiveRoll(rollValue:String):Dynamic {
    var rollRegex = new RegExp("^([0-9]*)?d([1-8])?x([1-8])$").exec(rollValue);
    var rollNum:Int = 0;
    var diceNum:Int = 0;
    var explodedNum:Int = 0;
    var exploded:Int = 0;
    var diceIntGroup:Array<Dynamic> = [];
    var rollTotal:Int = 0;

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
    return {diceGroup: diceIntGroup, rollTotal: rollTotal, exploded: exploded};
  }

  public function literalValue(rollValue:String):Dynamic {
    var rollRegex = new RegExp("^([1-8])$").exec(rollValue);
    var rollNum:Int = 0;
    
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
    return {rollValue: rollNum}
  }
  
}