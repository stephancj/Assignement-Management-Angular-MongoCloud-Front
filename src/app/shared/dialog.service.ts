import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private dialogCloseSource = new Subject<void>();
  dialogClose$ = this.dialogCloseSource.asObservable();

  closeDialog(): void {
    this.dialogCloseSource.next();
  }
}
