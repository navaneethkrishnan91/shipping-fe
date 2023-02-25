import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ParcelListComponent } from './parcel-list/parcel-list.component';
import { InsertParcelComponent } from './insert-parcel/insert-parcel.component';

const routes: Routes = [
  { path: '', redirectTo: '/parcel-list', pathMatch: 'full' },
  { path: 'parcel-list', component: ParcelListComponent },
  { path: 'insert-parcel', component: InsertParcelComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
