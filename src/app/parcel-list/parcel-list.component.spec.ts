import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';

import { ParcelListComponent } from './parcel-list.component';
import { ParcelService, Parcel } from '../parcel.service';

describe('ParcelListComponent', () => {
  let component: ParcelListComponent;
  let fixture: ComponentFixture<ParcelListComponent>;
  let parcelService: jasmine.SpyObj<ParcelService>;

  beforeEach(async () => {
    const parcelServiceSpy = jasmine.createSpyObj('ParcelService', ['getParcels']);
    await TestBed.configureTestingModule({
      declarations: [ ParcelListComponent ],
      imports: [ MatTableModule, MatInputModule, MatButtonModule, FormsModule ],
      providers: [
        { provide: ParcelService, useValue: parcelServiceSpy }
      ]
    })
    .compileComponents();

    parcelService = TestBed.inject(ParcelService) as jasmine.SpyObj<ParcelService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParcelListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load parcels', () => {
    const parcels: Parcel[] = [
      { sku: '123', description: 'Test Parcel', address: '123 Main St', town: 'Anytown', country: 'USA', deliveryDate: new Date().toISOString() }
    ];
    parcelService.getParcels.and.returnValue(of(parcels));
    component.ngOnInit();
    expect(component.parcels).toEqual(parcels);
  });

  it('should filter parcels', () => {
    const parcels: Parcel[] = [
      { sku: '123', description: 'Test Parcel', address: '123 Main St', town: 'Anytown', country: 'USA', deliveryDate: new Date().toISOString() },
      { sku: '456', description: 'Another Parcel', address: '456 Oak St', town: 'Anytown', country: 'Canada', deliveryDate: new Date().toISOString() }
    ];
    parcelService.getParcels.and.callFake((countryFilter: string, descriptionFilter: string) => {
      const filteredParcels = parcels.filter(parcel => {
        if (countryFilter && parcel.country.toLowerCase().indexOf(countryFilter.toLowerCase()) === -1) {
          return false;
        }
        if (descriptionFilter && parcel.description.toLowerCase().indexOf(descriptionFilter.toLowerCase()) === -1) {
          return false;
        }
        return true;
      });
      return of(filteredParcels);
    });
    component.countryFilter = 'USA';
    component.descriptionFilter = 'Test';
    component.filterParcels();
    expect(component.parcels).toEqual([parcels[0]]);
  });     
});
