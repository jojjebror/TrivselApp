import { Base } from './BaseDto';

/**
 * Class User generated from Logic.Models.UserDto
 */
export class User extends Base {
  public name: string;

  public email: string;

  public credit: number;

  public admin: boolean;

  public status: string;

  public office: string;
}
