import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TemperatureService } from '../../../services/temperature.service';
import { DataSharingService } from '../../../services/data-sharing.service';
import { LocationService } from '../../../services/location.service';
import { Router } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  private temperatureService = inject(TemperatureService);
  private dataSharing = inject(DataSharingService);
  private fb = inject(FormBuilder);
  private locationService = inject(LocationService);
  private router = inject(Router);

  temperature!: FormGroup;

  ngOnInit(): void {
    this.temperatureService.tempInit();
    this.dataCheck();
  }
  
  public onControlChange(val: string): void {
    this.temperatureService.removeAllData();
    this.temperatureService.addData(val);
    this.dataSharing.setTemperature(val)
  }

private dataCheck() {
  const data = this.temperatureService.getData('temperature');
  if(data.length == 0) {
    this.temperature = this.fb.group({
      tempControl: ['Celsius']
    });
    this.temperatureService.addData(this.temperature.get("tempControl")?.value)
    this.dataSharing.setTemperature(this.temperature.get("tempControl")?.value)
  } 
  else {
    this.temperature = this.fb.group({
      tempControl: [data[0]]
  });
  this.dataSharing.setTemperature(data[0])
}
}

public defineLocation() {
  const location$ = this.locationService.getLocation();

  location$.pipe(
    map((value: any) => value.city) 
  ).subscribe(city => {
    this.router.navigate(['/weather', city]); 
  });
}
}