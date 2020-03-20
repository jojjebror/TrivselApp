import { Base } from './BaseDto';
import { User } from './UserDto'

export class Event extends Base {
  public title: string;
  public description: string;
  public image: string;
  public location: string;
  public startDate: Date;
  public startTime: Date;
  public endDate?: Date;
  public endTime?: Date;
  public createDate: Date;
  public creatorId: number;
  public Users?: User[];
}
