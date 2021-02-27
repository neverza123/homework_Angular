import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddStockComponent } from './add-stock/add-stock.component';
import { DeleteComponent } from './delete/delete.component';
import { StockComponent } from './stock/stock.component';


const routes: Routes = [
  { path: 'stock' ,component:  StockComponent , },
  { path: 'add-stock',component: AddStockComponent},
  { path: 'delete',component: DeleteComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
