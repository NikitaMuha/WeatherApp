import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {

  private dataSubject = new BehaviorSubject<string>('');
  private tempSubject = new BehaviorSubject<string>('');

  public curretnTemp$ = this.tempSubject
  public currentData$ = this.dataSubject

  public setData(data: string) {
    this.dataSubject.next(data);
  }

  public setTemperature(data: string) {
    this.tempSubject.next(data);
  }
}
