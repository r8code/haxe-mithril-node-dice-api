package models;

enum RollTypes {
  ONE_DIE_ROLL;
  DICE_ROLL;
  DROP_LOWEST_ROLLS;
  KEEP_HIGHEST_ROLLS;
  EXPLOSIVE_ROLL;
  LITERAL_VALUE;
}

class RollType
{
  public static var rollType:RollTypes = ONE_DIE_ROLL;
}