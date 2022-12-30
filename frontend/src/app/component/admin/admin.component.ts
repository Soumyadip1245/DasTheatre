import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { MovieService } from 'src/app/service/movie.service';
import { __values } from 'tslib';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  adminData: any[]=[]
  editform!: FormGroup
  addform!: FormGroup
  id:any
  className = 'd-none'
  message = ''
  checkout: any[] = []
  normal: any[]=[]
  premium: any[]=[]
  super:any[]=[]
  seatid: any
  className1 = 'd-none'
  userDetails: any[]= []
  searchbar: any
  constructor(private fb: FormBuilder, private route:Router, private auth : AuthService,  private router: ActivatedRoute, private http: HttpClient,private mo: MovieService) {
    this.editform = this.fb.group({
      'id': [''],
      'name': ['',Validators.required],
      'phone': ['',Validators.required],
      'email': ['',Validators.required],
      'type': ['',Validators.required]
    })
    this.addform = this.fb.group(
      {
      'name': ['',Validators.required],
      'phone': ['',Validators.required],
      'email': ['',Validators.required],
      'password': ['',Validators.required],
      'type': ['',Validators.required]
      }
    )
   }
  ngOnInit(): void {
    this.auth.adminauthorise().subscribe((data)=>{
      this.adminData = data
    })
    this.checkoutData()
    this.getSeats()
    this.getDetails()
  }
  refreshData(){
    this.auth.adminauthorise().subscribe((data)=>{
      this.adminData = data
    })
  }
  togglebutton(data: any) {
    this.auth.FetchdataById(data).subscribe((res:any)=>{
      var ob = {
        "name": " ",
        "phone": " ",
        "email": " ",
        "authorised": !res.authorised
      }
      this.auth.updateItem(data,ob).subscribe((a:any)=>{
        this.refreshData()
        
      })
        })
    }
    editForm(data:any){
      this.auth.FetchdataById(data).subscribe((res:any)=>{
        console.log(res._id)
        this.editform = this.fb.group(
          {
            id : [res._id, Validators.required],
            name: [res.name,Validators.required],
            phone: [res.phone],
            email: [res.email]
          }
        )
      })
      this.id = data
    }
    EditChanges(){
      console.log("A: "+this.editform.value)
      this.auth.editForm(this.id,this.editform.value).subscribe((a:any)=>{
        console.log(a)
        this.refreshData()
        this.className = 'alert alert-success'
          this.message = 'Data Saved'
        setTimeout(()=>{
          this.className = 'd-none'
          this.message = ''
        },2000)
      })
    }
    deleteForm(data:any){
      this.auth.deleteForm(data).subscribe((res:any)=>{
        console.log(res)
        this.refreshData()
      })
    }
    addForm(){
      this.auth.addForm(this.addform.value).subscribe((data:any)=>{
        console.log(data)
        this.refreshData()
        this.className = 'alert alert-success'
        this.message = 'Data Added'
      setTimeout(()=>{
        this.className = 'd-none'
        this.message = ''
      },2000)
      })
    }
    checkoutData(){
      this.auth.checkoutData().subscribe((res:any)=>{
        this.checkout = res
      })
    }
    approve(data:any){
      console.log(data)
      this.auth.getBuyoutBuyId(data).subscribe((res:any)=>{
        console.log("ok: "+res.buyout)
        var ob = {
          "buyout": !res.buyout
        }
        this.auth.updateCheckout(data,ob).subscribe((a:any)=>{
          this.checkoutData()
        })
      })
    }
    getSeats(){
    this.mo.getNormal().subscribe((res:any)=>{
      this.normal = res
    })
    this.mo.getPremium().subscribe((res:any)=>{
      this.premium = res
    })
    this.mo.getSuper().subscribe((res:any)=>{
      this.super = res
    })
  }
  seatbook(data:any){
    this.seatid = data
    this.mo.getSeat(data).subscribe((res:any)=>{
     
      var ob = {
        "available": !res.available
      }
      this.mo.editAvailable(data,ob).subscribe((a:any)=>{
        this.getSeats()
      })
    })
  }
  getDetails(){
    this.mo.getDetails().subscribe((res:any)=>{
      this.userDetails = res
    })
  }
}
