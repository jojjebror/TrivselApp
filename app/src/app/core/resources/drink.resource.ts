import { ApiResource } from "./api.resource";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { Drink } from '../../shared/models';

@Injectable()
export class DrinkResource extends ApiResource {

    constructor(http: HttpClient) {
        super(http);
        
    }

    loadDrinks(): Observable<Drink[]> {
        return this.get('drink');
    }

    loadDrink(id: number): Observable<Drink> {
        return this.get('drink/' + id);
    }

    create(dr: Drink): Observable<Drink> {
        return this.post('drink', dr);
    }
}