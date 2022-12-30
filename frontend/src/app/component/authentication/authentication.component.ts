import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup,Validators,} from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css'],
})
export class AuthenticationComponent implements OnInit {
  loginform!: FormGroup;
  registerform!: FormGroup
  message: string = ""
  isProcess:boolean = false
  className  = 'd-none'
  className1 = 'd-none'
  author:boolean = false
  type:string = ''
  constructor(private fb: FormBuilder, private auth: AuthService, private route:ActivatedRoute,private router:Router) {
    this.loginform = this.fb.group({
      'email': ['', Validators.required],
      'password': ['',Validators.required]
    });
    this.registerform = this.fb.group({
      'name': ['',Validators.required],
      'phone': ['',Validators.required],
      'email': ['',Validators.required],
      'password': ['',Validators.required],
      'type': ['',Validators.required]
    })
  }

  ngOnInit(): void {
    console.log(this.author)
  }
  login(){
    const details = this.loginform.value
    this.auth.login().subscribe((res)=>{
      console.log(res)
      const user = res.find((a:any)=>{
        this.author = a.authorised
        this.type = a.type
        return a.email === details.email && a.password === details.password
      })
      if(user){                       
          this.className = 'd-none';
          if(details.email === "Admin"){
            this.loginform.reset()
              this.message = "Login Successful"
              this.className = 'alert alert-success'
              this.className1 = 'd-flex justify-content-center'
              this.auth.setValue(true)
            setTimeout(()=>{            
              this.className = 'd-none'
              this.className1 = 'd-none'
              this.router.navigate(['/admin'])

          }, 2000);
            
          }
          else if (this.author == true){
            if(this.type == 'Director')
            {
              this.loginform.reset()
              this.message = "Login Successful"
              this.className = 'alert alert-success'
              this.className1 = 'd-flex justify-content-center'
              this.auth.setValue(true)
              setTimeout(()=>{            
                this.className = 'd-none'
                this.className1 = 'd-none'
                this.router.navigate(['/director'])
            }, 2000);
            }
            else{
              this.loginform.reset()
              this.message = "Login Successful"
              this.className = 'alert alert-success'
              this.className1 = 'd-flex justify-content-center'
              this.auth.setValue(true)
              setTimeout(()=>{            
                this.className = 'd-none'
                this.className1 = 'd-none'
                this.router.navigate(['/employee'])
            }, 2000);
            }
           
          }
          else{
            this.loginform.reset()
            this.message = "Wait For Admin Authorization"
            this.className = 'alert alert-warning'
            this.className1 = 'd-flex justify-content-center'
            setTimeout(()=>{
              this.className = 'd-none'
              this.className1 = 'd-none'
            }, 4000)
          }
      }
      else{
        this.message = "Try Again"
        this.className = 'alert alert-danger'
        this.loginform.reset()
        setTimeout(()=>{                          
          this.className = 'd-none';
      }, 2000);
      }
    })
  }
  register(){
    this.isProcess = true
    this.auth.signup(this.registerform.value).subscribe(res=>{
        this.isProcess = false
        this.message = "Account Registered"
        this.className = 'alert alert-success'
        this.registerform.reset()
        setTimeout(()=>{                          
          this.className = 'd-none';
      }, 2000);
    })
  }
}
