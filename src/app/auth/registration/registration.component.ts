import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormControl, FormGroup } from '@angular/forms';
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
      email: new FormControl('',),
      password: new FormControl('',),
      passwordAgain: new FormControl('',)
    });
  }

  send(form: FormGroup) {
    this.registerForm.markAllAsTouched();
    this.authService.registerUser({ ...form.value, })
    form.reset();
    
    this.snackBar.open('Regitráció sikeres!', 'Bezárás',{
      duration: 5000,
    });

  }


}
