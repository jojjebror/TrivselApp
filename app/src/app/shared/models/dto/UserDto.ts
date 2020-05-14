import { Base } from './BaseDto';

/**
 * Class User generated from Logic.Models.UserDto
 */
export class User extends Base {
  public email: string;

  public name: string;

  public status: string;

  public credit: number;

  public office: string;
}
export class Offices extends Base {
  public name: string;
  public adress: string;
  public swishNumber: string;
  public info: string;
}
