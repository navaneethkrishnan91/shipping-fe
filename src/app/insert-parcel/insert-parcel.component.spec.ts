import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { InsertParcelComponent } from './insert-parcel.component';
import { ParcelService } from '../parcel/parcel.service';
import { Parcel } from '../parcel/parcel';

describe('InsertParcelComponent', () => {
  let component: InsertParcelComponent;
  let fixture: ComponentFixture<InsertParcelComponent>;
  let parcelService: ParcelService;

  const newParcel : Parcel = {
    sku: '12345',
    description: 'Test parcel',
    address: '123 Main St',
    town: 'Anytown',
    country: 'USA',
    deliveryDate: '2023-02-24'
  };

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, HttpClientTestingModule],
      declarations: [InsertParcelComponent],
      providers: [ParcelService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertParcelComponent);
    component = fixture.componentInstance;
    parcelService = TestBed.inject(ParcelService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should reset the newParcel object on form submit', () => {
    spyOn(parcelService, 'checkSkuExists').and.returnValue(of({ exists: false }));
    spyOn(parcelService, 'insertParcel').and.returnValue(of(newParcel));
    component.newParcel = newParcel;
    component.onSubmit();
    expect(component.newParcel).toEqual({
      sku: '',
      description: '',
      address: '',
      town: '',
      country: '',
      deliveryDate: ''
    });
  });

  it('should call insertParcel when form is submitted and SKU does not exist', () => {
    spyOn(parcelService, 'checkSkuExists').and.returnValue(of({ exists: false }));
    spyOn(parcelService, 'insertParcel').and.returnValue(of(newParcel));
    component.newParcel = newParcel;
    component.onSubmit();
    expect(parcelService.insertParcel).toHaveBeenCalledWith(newParcel);
  });

  it('should set skuExists to true when form is submitted and SKU already exists', () => {
    spyOn(parcelService, 'checkSkuExists').and.returnValue(of({ exists: true }));
    component.newParcel = newParcel;
    component.onSubmit();
    expect(component.skuExists).toBe(true);
  });
});
