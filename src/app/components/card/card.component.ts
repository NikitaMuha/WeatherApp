import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import { trigger, state, style, animate, transition, keyframes } from '@angular/animations';


import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

import { CurrentInterface, LocationInterface } from '../../../interfaces/weather.interface';

import { FavoriteService } from '../../../services/favorite.service';
import { ToastrService } from 'ngx-toastr';
import { take, takeUntil, tap } from 'rxjs';
import { DataSharingService } from '../../../services/data-sharing.service';
import { Unsubscribe } from '../../../services/unsubscribe';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('tadaAnimation', [
      state('inactive', style({})),
      state('active', style({})),
      transition('inactive => active', [
        animate('1s', keyframes([
          style({ transform: 'scale3d(1, 1, 1)', offset: 0 }),
          style({ transform: 'scale3d(0.9, 0.9, 0.9) rotate(-3deg)', offset: 0.1 }),
          style({ transform: 'scale3d(0.9, 0.9, 0.9) rotate(3deg)', offset: 0.2 }),
          style({ transform: 'scale3d(1.1, 1.1, 1.1) rotate(-3deg)', offset: 0.3 }),
          style({ transform: 'scale3d(1.1, 1.1, 1.1) rotate(3deg)', offset: 0.4 }),
          style({ transform: 'scale3d(1.1, 1.1, 1.1) rotate(-3deg)', offset: 0.5 }),
          style({ transform: 'scale3d(1.1, 1.1, 1.1) rotate(3deg)', offset: 0.6 }),
          style({ transform: 'scale3d(1.1, 1.1, 1.1) rotate(-3deg)', offset: 0.7 }),
          style({ transform: 'scale3d(1.1, 1.1, 1.1) rotate(3deg)', offset: 0.8 }),
          style({ transform: 'scale3d(1, 1, 1)', offset: 1 }),
        ]))
      ])
    ]),
    trigger('fillAnimation', [
      state('empty', style({})),
      state('filled', style({})),
      transition('empty => filled', [
        animate('2s ease-in', keyframes([
          style({ clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)', offset: 0 }), 
          style({ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', offset: 1 }) 
        ]))
      ])
    ])
  ]
  
  
})
export class CardComponent extends Unsubscribe implements OnInit {
  private dialog = inject(MatDialog);
  private toast = inject(ToastrService)
  private favService = inject(FavoriteService);
  private dataSharing = inject(DataSharingService);
  private cdr = inject(ChangeDetectorRef);

  @Input() locationWeather : LocationInterface | null = null;
  @Input() displayWeather : CurrentInterface |  null = null;
  @Input() isFavorite: boolean = false;

  @Output() favoriteEvent = new EventEmitter<boolean>();
  

  public favCities: string[] = [];
  public isCelsius: boolean = true;
  public animationState: boolean = false;
  public fillState: boolean = true;

  private tempFormat$ = this.dataSharing.curretnTemp$

constructor () {
  super();
}

ngOnInit(): void {
  this.favService.favoriteInit('favorite');
  this.tempFormat$
  .pipe(
    tap((data) => {
      this.cdr.markForCheck();
      if(data == 'Celsius') {
        this.isCelsius = true;
      } else {
        this.isCelsius = false;
      }
    }),
    takeUntil(this.$destroy)
    )
    .subscribe();
}

private addFavoriteCard(val: string): void {
  this.favService.addData(val);
}

private removeFavoriteCard(val: string): void {
  this.favService.removeData(val);
}

public handleFavorite(val: string): void {
  this.animationState = true;
  this.fillState = true;
  setTimeout(() => this.animationState = false, 1000); 
  this.favCities = this.favService.getData('favorite')
  if(this.isFavorite) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '300px',
    });
    dialogRef.afterClosed()
    .pipe(take(1))
    .subscribe((res) => {
      res == true ? this.handleConfirmedRemoval(val) : null;
    });
  } else if (!this.isFavorite && this.favCities.length > 4) {
      this.toast.error("Only five places can be added to favorites", "Error");
      throw new Error("Exceeded maximum number of favorite places. Execution stopped.");
    } else if(!this.isFavorite) {
      this.addFavoriteCard(val);
      this.toast.success("City added to favorites", "Success");
      this.favoriteEvent.emit(!this.isFavorite);
      return;
    }
  }

private handleConfirmedRemoval(val: string): void {
  this.removeFavoriteCard(val);
  this.toast.success("City removed from favorites", "Success");
  this.favoriteEvent.emit(this.isFavorite);
}
}





