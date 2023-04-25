import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../servicios/api/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginResponse = true;
  loginForm: FormGroup;
  /**
   *
   */
  constructor(private api: ApiService, private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {  }

  login() {
    this.loginForm.markAllAsTouched()
    if (this.loginForm.valid) {
    
      const form = this.loginForm.value;
      // console.log(form);

      this.api.loginWithEmail(form).subscribe({
        next:
          data => {
              console.log(data);
              // console.log('Funciono el post de autorizacion');
              this.loginResponse = true;
              this.router.navigate(['/adminuser']);
          }
        , error:
          (err) => {
            console.log(err);
            console.log('no funciono');
            
            this.loginResponse = false
          }
      })
    }
  }

}
