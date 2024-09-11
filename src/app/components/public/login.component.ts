import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { catchError } from 'rxjs';
import { MdInputModule } from 'src/app/lib/mdinput/mdinput.module';
import { AuthService } from '../../auth/auth.service';
import { AuthState } from '../../auth/auth.state';
import { Config } from '../../config';
import { TranslatePipe } from '../../lib/pipes/translate.pipe';
import { Toast } from '../../lib/toast/toast.state';
@Component({

  templateUrl: './login.html'
  , changeDetection: ChangeDetectionStrategy.OnPush
  , standalone: true
  , imports: [CommonModule, RouterModule, MdInputModule, TranslatePipe]
})
export class PublicLoginComponent implements OnInit {
  loginForm: FormGroup;
  forceValidation: boolean;
  constructor(private toast: Toast,
    private fb: FormBuilder,
    private router: Router,
    private authState: AuthState,
    private authService: AuthService) {
  }
  ngOnInit(): void {
    //
    this.loginForm = this.fb.group({
      username: [],
      password: [],
    });
  }


  login(): void {
    // stage 2: normal login
    this.forceValidation = false;
    this.toast.Hide();


    if (this.loginForm.valid) {

      const _user = this.loginForm.value;

      this.authService.Login(_user.username, _user.password).pipe(
        catchError(error => this.toast.HandleUiError(error))
      ).subscribe({
        next: (result: any) => {
          _attn(result);
          if (result) {
            // navigate her
            this.router.navigateByUrl(this.authState.redirectUrl || Config.Basic.defaultRoute);
          }
        }
      });

    }
    else {
      this.forceValidation = true;
      this.toast.ShowError('INVALID_FORM', { extracss: 'error' });
    }

  }
}
