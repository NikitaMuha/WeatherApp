import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogComponent {
  readonly dialogRef = inject(MatDialogRef<DialogComponent>);

  public onConfirm(): void {
    this.dialogRef.close(true); 
  }

  public onCancel(): void {
    this.dialogRef.close(false); 
  }
}
