import { Base } from './BaseDto';
import { User } from './UserDto';

export class Receipt extends Base {
    public image: string;
    public date: Date;
    public creatorId: number;
    public users?: User[];
    public creatorName: string;
}
