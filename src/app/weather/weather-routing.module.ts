import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WeatherComponent } from './weather.component';
import { FavoriteResolverService } from '../../resolvers/favorite-resolver.service';

const routes: Routes = [
  { path: '', component: WeatherComponent },
  { path: ':city', component: WeatherComponent, resolve: {
    'city': FavoriteResolverService
  }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WeatherRoutingModule { }

