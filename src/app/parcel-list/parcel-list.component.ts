import { Component, OnInit } from '@angular/core';
import { ParcelService } from '../parcel/parcel.service';
import { Parcel } from '../parcel/parcel';

@Component({
  selector: 'app-parcel-list',
  templateUrl: './parcel-list.component.html',
  styleUrls: ['./parcel-list.component.css']
})
export class ParcelListComponent implements OnInit {
  countryFilter = '';
  descriptionFilter = '';
  parcels: Parcel[] = [];

  displayedColumns: string[] = [
    'ParcelSKU',
    'Description',
    'Address',
    'Town',
    'Country',
    'Delivery Date'
  ];

  constructor(private parcelService: ParcelService) {}

  ngOnInit() {
    this.loadParcels();
  }

  loadParcels() {
    this.parcelService.getParcels(this.countryFilter, this.descriptionFilter).subscribe((result: Parcel[]) => {
      this.parcels = result;
    });
  }

  filterParcels() {
    this.loadParcels();
  }
}
