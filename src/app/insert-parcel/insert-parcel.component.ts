import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ParcelService } from '../parcel/parcel.service';

@Component({
  selector: 'app-insert-parcel',
  templateUrl: './insert-parcel.component.html',
  styleUrls: ['./insert-parcel.component.css']
})
export class InsertParcelComponent {
  newParcel = {
    sku: '',
    description: '',
    address: '',
    town: '',
    country: '',
    deliveryDate: ''
  };
  skuExists = false;

  @ViewChild('insertParcelForm') insertParcelForm: NgForm | undefined;

  constructor(private parcelService: ParcelService) {}

  onSubmit() {
    this.parcelService.checkSkuExists(this.newParcel.sku).subscribe(result => {
      if (result.exists) {
        this.skuExists = true;
      } else {
        this.skuExists = false;
        this.parcelService.insertParcel(this.newParcel).subscribe();
        this.insertParcelForm?.resetForm();
        this.newParcel = {
          sku: '',
          description: '',
          address: '',
          town: '',
          country: '',
          deliveryDate: ''
        };
      }
    });
  }
}
