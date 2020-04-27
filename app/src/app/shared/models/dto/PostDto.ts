import { Base } from './BaseDto';

export class Post extends Base {
  public content: string;
  public created: Date;
  public creatorId: number;
  public eventId: number;
  public creatorName: string;
}
