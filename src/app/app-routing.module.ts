import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HoldingsComponent } from './components/holdings/holdings.component';
import { SearchComponent } from './components/search/search.component';

const routes: Routes = [
  { path: 'holdings', component: HoldingsComponent},
  { path: 'search', component: SearchComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
