import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParcelTestComponent } from './parcel-test.component';

describe('ParcelTestComponent', () => {
  let component: ParcelTestComponent;
  let fixture: ComponentFixture<ParcelTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParcelTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParcelTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
