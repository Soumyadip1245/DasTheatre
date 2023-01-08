import { HttpClient } from '@angular/common/http';
import { IfStmt, ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css'],
})
export class AuthenticationComponent implements OnInit {
  loginform!: FormGroup;
  registerform!: FormGroup;
  message: string = '';
  isProcess: boolean = false;
  className = 'd-none';
  className1 = 'd-none';
  author: boolean = false;
  type: string = '';
  getEmail: any;
  getPassword: any;
  passwordmessage: any;
  alertmessage: any;
  alertclass = 'd-none';
  buttonclass: string = 'd-none';
  emailtext: any;
  alertforget = 'd-none';
  forgetmessage = '';
  passwordneww = 'd-none';
  passwordtext = '';
  passwordid: any;
  validatebutton = 'btn btn-primary';
  passwordbutton = 'd-none';
  employeetext: any
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.loginform = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.registerform = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      type: ['', Validators.required],
      image: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }
  login() {
    this.auth.login(this.loginform.value).subscribe((res) => {
      if (res.success) {
        localStorage.setItem('token', res.token);
        this.getProfile();
      } else {
        this.className = 'alert alert-danger';
        this.message = res.message;
        setTimeout(() => {
          this.className = 'd-none';
          this.message = '';
        }, 2000);
      }
    });
    this.loginform.reset();
  }
  getProfile() {
    this.auth.profile().subscribe((res) => {
      if (res.data.type == 'Director' && res.data.authorised == true) {
        this.className = 'alert alert-success';
        this.message = res.message;
        setTimeout(() => {
          this.router.navigate(['/director']);
        }, 2000);
      } else if (res.data.type == 'Employee' && res.data.authorised == true) {
        this.className = 'alert alert-success';
        this.message = res.message;
        setTimeout(() => {
          this.router.navigate(['/employee']);
        }, 2000);
      } else if (res.data.type == 'Admin' && res.data.authorised == true) {
        this.className = 'alert alert-success';
        this.message = res.message;
        setTimeout(() => {
          this.router.navigate(['/admin']);
        }, 2000);
      } else {
        this.router.navigate(['/authentication']);
        this.className = 'alert alert-warning';
        this.message = 'Wait for Authorization From Admin';
      }
    });
    setTimeout(() => {
      this.className = 'd-none';
      this.message = '';
    }, 4000);
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('auth');
  }
  register() {
    this.isProcess = true;
    this.auth.signup(this.registerform.value).subscribe((res) => {
      if (res.success) {
        this.message = res.message;
        this.className = 'alert alert-success';
      } else {
        this.message = res.message;
        this.className = 'alert alert-danger';
      }

      this.registerform.reset();
      setTimeout(() => {
        this.className = 'd-none';
      }, 2000);
    });
  }
  validateemail() {
    var ob = {
      "id": this.emailtext,
    };
    this.auth.forget(ob).subscribe((res) => {
      if (res.success) {
        this.alertforget = 'alert alert-success';
        this.forgetmessage = res.message;
        this.passwordneww = 'form-outline';
        this.passwordid = res.value._id;
        this.validatebutton = 'd-none';
        this.passwordbutton = 'btn btn-primary';
      } else {
        this.alertforget = 'alert alert-danger';
        this.forgetmessage = res.message;
        this.emailtext = '';
      }
    });
    setTimeout(() => {
      this.alertforget = 'd-none';
      this.message = '';
    }, 2000);
  }
  CloseReset() {
    this.getEmail = '';
  }
  newpassword() {
    var ob = {
      password: this.passwordtext,
    };
    this.auth.resetPassword(this.passwordid, ob).subscribe((res) => {
      if (res.success) {
        this.alertforget = 'alert alert-success';
        this.forgetmessage = res.message;
      } else {
        this.alertforget = 'alert alert-warning';
        this.forgetmessage = res.message;
      }
    });
    setTimeout(() => {
      this.passwordid = '';
      this.passwordtext = '';
      this.passwordneww = 'd-none';
      this.alertforget = 'd-none';
      this.forgetmessage = '';
      this.validatebutton = 'btn btn-primary';
      this.passwordbutton = 'd-none';
      this.emailtext = '';
    }, 2000);
  }
  closeButton() {
    this.passwordid = '';
    this.passwordtext = '';
    this.passwordneww = 'd-none';
    this.alertforget = 'd-none';
    this.forgetmessage = '';
    this.validatebutton = 'btn btn-primary';
    this.passwordbutton = 'd-none';
    this.emailtext = '';
  }
}
