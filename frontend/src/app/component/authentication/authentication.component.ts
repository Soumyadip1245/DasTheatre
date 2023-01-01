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
  getEmail: any
  getPassword: any
  passwordmessage:any
  alertmessage:any
  alertclass = 'd-none'
  buttonclass: string = 'd-none'
  emailtext:any
  getpassword :any
  getpassword12 = 'd-none'
  employeeid = 'd-none'
  employeetext :any
  employeedata: any
  employeepassword:any
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
  fetchPassword(){
    this.auth.getForget(this.getEmail).subscribe((res)=>{
      res.map((curr:any)=>{
        if(curr.email==this.getEmail){
          this.emailtext = 'd-none'
          this.getpassword = 'd-none'
          this.employeeid = 'employeeid'
          this.getpassword12='getpassword12'
          this.employeedata = curr._id
          this.employeepassword = curr.password
          this.getEmail = ''
        }
        else{
          this.getEmail = ''
          this.getpassword='getpassword'
        }
      })
         
  })
}
  fetchPassword1(){
    if(this.employeedata == this.employeetext){
      this.alertclass = 'alert alert-warning'
      this.alertmessage = 'Password Generated'
      this.buttonclass = 'btn btn-success'
      this.passwordmessage = "Password: "+this.employeepassword
    }
    else{
      this.alertclass = 'alert alert-warning'
      this.alertmessage = 'Account Not Found For The Details'
    }
    setTimeout(()=>{
      this.alertclass='d-none'
      this.alertmessage=''
      this.employeeid = 'd-none'
      this.employeetext = ''
      this.getpassword12='d-none'
      this.buttonclass = 'd-none'
      this.passwordmessage = ''
      this.emailtext='emailtext'
      this.getpassword='getpassword'
    },4000)
  }
  CloseReset(){
    this.getEmail = ''
  }
}
