import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  registerForm: FormGroup;





  constructor(private authService: AuthService, private snackBar: MatSnackBar) {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)] ),
      passwordAgain: new FormControl('', Validators.required, )
    },
      {
        validators: this.passwordMatch('password','passwordAgain')
      }
  
    );
  }

  send(form: FormGroup) {
    this.registerForm.markAllAsTouched();
    this.authService.registerUser({ ...form.value, role: 'user' })
    form.reset();

    this.snackBar.open('Regitráció sikeres!', 'Bezárás', {
      duration: 5000,
    });
  }

  passwordMatch(password: string, confirmPassword: string): ValidatorFn {
    return (formGroup: AbstractControl): { [key: string]: any } | null => {
      const passwordControl = formGroup.get(password);
      const confirmPasswordControl = formGroup.get(confirmPassword);

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }
      if (
        confirmPasswordControl.errors &&
        !confirmPasswordControl.errors['passwordMismatch']
      ) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
        return { passwordMismatch: true };
      } else {
        confirmPasswordControl.setErrors(null);
        return null;
      }
    };
  }

  }



