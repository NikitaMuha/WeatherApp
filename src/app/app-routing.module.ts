import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [

  { 
    path: 'weather', 
    loadChildren: () => import('./weather/weather.module').then(m => m.WeatherModule) 
  },
  
  { 
    path: 'favorite', 
    loadChildren: () => import('./favorite/favorite.module').then(m => m.FavoriteModule) 
  },


  { 
    path: '**', 
    redirectTo: '/weather' 
  }, 

  { 
    path: '', 
    redirectTo: '/weather', 
    pathMatch: 'full' 
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
