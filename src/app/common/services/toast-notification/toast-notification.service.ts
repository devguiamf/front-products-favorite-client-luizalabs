import { inject, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

type ToastProps = {
  title: string,
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class ToastNotificationService {

  toastr = inject(ToastrService);

  showSuccess(prop: ToastProps){ 
    this.toastr.success(prop.message, prop.title);
  };

  showError(prop: ToastProps){
    this.toastr.error(prop.message, prop.title);
  };

  showWarning(prop: ToastProps){
    this.toastr.warning(prop.message, prop.title);
  };

  showInfo(prop: ToastProps){
    this.toastr.info(prop.message, prop.title);
  };
}
