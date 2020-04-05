
import { Base } from './BaseDto';
import { Event } from './EventDto';


/** 
	* Class User generated from Logic.Models.UserDto
	*/
export class User extends Base {
         public email: string;

         public name: string;

         //public office: string;

         public accepted: boolean;
         
         public events?: Event[];
       }


