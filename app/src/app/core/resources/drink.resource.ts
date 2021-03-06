import { ApiResource } from "./api.resource";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { Drink } from '../../shared/models';
import { text } from "@angular/core/src/render3";


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

    deleteDrink(id: number): Observable<Drink> {
        return this.delete('drink/' + id);
    }

    updateDrink(dr: Drink): Observable<Drink> {
        return this.put<Drink>('drink/'+ dr.id, dr);
    }

    filterDrink(dr: string): Observable<Drink[]> {
        return this.get('drink/' + 'filter?filter=' + dr);
    }
    
    uploadDrinkImage(id: number, image: File): Observable<Drink> {
        var formData = new FormData();
        formData.append('image', image, image.name);
        return this.post2('drink/' + id + '/uploadDrinkImage', formData);    
    }
}
