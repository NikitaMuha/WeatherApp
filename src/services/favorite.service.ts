import { inject, Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
private localStor = inject(LocalStorageService);

public favoriteInit(val: string): void {
  this.localStor.localStorageInit(val);
}

public addData(val: string): void {
  this.localStor.addValueToArray('favorite', val);
}

public removeData(val: string): void {
  this.localStor.removeValueFromArray('favorite', val);
}

public getData(val: string ): string[] {
  return this.localStor.getAllValues(val);
}
}
