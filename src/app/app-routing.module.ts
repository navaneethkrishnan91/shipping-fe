import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ParcelListComponent } from './parcel-list/parcel-list.component';
import { InsertParcelComponent } from './insert-parcel/insert-parcel.component';
import { ParcelTestComponent } from './parcel-test/parcel-test.component';

const routes: Routes = [
  { path: '', redirectTo: '/parcel-list', pathMatch: 'full' },
  { path: 'parcel-list', component: ParcelListComponent },
  { path: 'insert-parcel', component: InsertParcelComponent },
  { path: 'parcel-test', component: ParcelTestComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
