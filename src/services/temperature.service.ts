import { inject, Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TemperatureService {
  private localStor = inject(LocalStorageService);

  public tempInit(): void {
    this.localStor.localStorageInit('temperature');
  }

  public addData(val: string): void {
    this.localStor.addValueToArray('temperature', val);
  }

  public removeData(val: string): void {
    this.localStor.removeValueFromArray('temperature', val);
  }

  public getData(val: string ): string[] {
    return this.localStor.getAllValues(val);
  }

  public removeAllData(): void {
    this.localStor.removeAllValues('temperature')
  }
}
