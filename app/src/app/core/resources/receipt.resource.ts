import { ApiResource } from "./api.resource";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { Receipt } from '../../shared/models';
import { text } from "@angular/core/src/render3";



@Injectable()
export class ReceiptResource extends ApiResource {

    constructor(http: HttpClient) {
        super(http);
    }

   
    loadReceipts(): Observable<Receipt[]> {
        return this.get('Receipt')
    }

    loadCurrentReceipts(id: number): Observable<Receipt[]> {
        return this.get('Receipt/' + id)
    }

    createReceipt(re: Receipt): Observable<Receipt> {
        return this.post('Receipt/createReceipt', re);
    }

    deleteReceipt(id: number): Observable<Receipt> {
        return this.delete('receipt/' + id);
    }

    uploadImageReceipt(id: number, image: File): Observable<Receipt> {
        var formData = new FormData();
        formData.append('image', image, image.name);
        return this.post2('receipt/' + id + '/uploadImageReceipt', formData);
    }

}