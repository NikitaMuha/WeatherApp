import {Injectable, OnDestroy} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Unsubscribe implements OnDestroy {
   public $destroy = new Subject<void>();

  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
  }
}