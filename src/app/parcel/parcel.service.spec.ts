import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ParcelService } from './parcel.service';
import { Parcel } from './parcel';

describe('ParcelService', () => {
  let service: ParcelService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ ParcelService ]
    });
    service = TestBed.inject(ParcelService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should insert a new parcel', () => {
    const newParcel: Parcel = {
      sku: '123',
      description: 'Test parcel',
      address: '123 Main St',
      town: 'Testville',
      country: 'USA',
      deliveryDate: '2023-03-01'
    };

    service.insertParcel(newParcel).subscribe(parcel => {
      expect(parcel).toEqual(newParcel);
    });

    const req = httpMock.expectOne(`${service.apiUrl}/parcels`);
    expect(req.request.method).toEqual('POST');
    req.flush(newParcel);
  });

  it('should get parcels by country and description', () => {
    const parcels: Parcel[] = [
      {
        sku: '123',
        description: 'Test parcel 1',
        address: '123 Main St',
        town: 'Testville',
        country: 'USA',
        deliveryDate: '2023-03-01'
      },
      {
        sku: '456',
        description: 'Test parcel 2',
        address: '456 Main St',
        town: 'Testville',
        country: 'USA',
        deliveryDate: '2023-03-02'
      }
    ];

    service.getParcels('USA', 'Test parcel').subscribe(results => {
      expect(results).toEqual(parcels);
    });

    const req = httpMock.expectOne(`${service.apiUrl}/parcels?country=USA&description=Test%20parcel`);
    expect(req.request.method).toEqual('GET');
    req.flush(parcels);
  });

  it('should check if an SKU exists', () => {
    const sku = '123';
    const existsResponse = { exists: true };

    service.checkSkuExists(sku).subscribe(result => {
      expect(result).toEqual(existsResponse);
    });

    const req = httpMock.expectOne(`${service.apiUrl}/parcels/skus/${sku}`);
    expect(req.request.method).toEqual('GET');
    req.flush(existsResponse);
  });
});
