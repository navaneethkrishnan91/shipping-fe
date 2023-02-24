import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ParcelService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  insertParcel(parcel: any): Observable<Parcel> {
    return this.http.post<Parcel>(this.apiUrl + '/parcels', parcel);
  }

  getParcels(country?: string, description?: string): Observable<Parcel[]> {
    let params = new HttpParams();

    if (country) {
      params = params.set('country', country);
    }

    if (description) {
      params = params.set('description', description);
    }

    return this.http.get<Parcel[]>(`${this.apiUrl}/parcels`, { params });
  }

  checkSkuExists(sku: string): Observable<{ exists: boolean }> {
    return this.http.get<{ exists: boolean }>(`${this.apiUrl}/parcels/skus/${sku}`);
  }
}

export interface Parcel {
  sku: string;
  description: string;
  address: string;
  town: string;
  country: string;
  deliveryDate: string;
}
