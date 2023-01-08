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
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  adminData: any[] = [];
  editform!: FormGroup;
  addform!: FormGroup;
  id: any;
  className = 'd-none';
  message = '';
  checkout: any[] = [];
  normal: any[] = [];
  premium: any[] = [];
  super: any[] = [];
  seatid: any;
  className1 = 'd-none';
  userDetails: any[] = [];
  searchbar: any;
  moviedetail: any[] = [];
  messagearray: any[] = []
  messagenotification: any
  typenotification: any
  typearray: any[] = []
  notificationarray: any[] = []
  constructor(
    private fb: FormBuilder,
    private route: Router,
    private auth: AuthService,
    private router: ActivatedRoute,
    private http: HttpClient,
    private mo: MovieService
  ) {
    this.editform = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      type: ['', Validators.required],
    });
    this.addform = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      type: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    localStorage.removeItem('auth');
    this.auth.adminauthorise().subscribe((data) => {
      this.adminData = data;
    });
    this.checkoutData();
    this.getSeats();
    this.getDetails();
    this.auth.getTypeTokenGet()
    this.getMessage()
    this.getNotification()
  }
  refreshData() {
    this.auth.adminauthorise().subscribe((data) => {
      this.adminData = data;
    });
  }
  togglebutton(data: any) {
    this.auth.FetchdataById(data).subscribe((res: any) => {
      var ob = {
        name: ' ',
        phone: ' ',
        email: ' ',
        authorised: !res.authorised,
      };
      this.auth.updateItem(data, ob).subscribe((a: any) => {
        this.refreshData();
      });
    });
  }
  editForm(data: any) {
    this.auth.FetchdataById(data).subscribe((res: any) => {
      this.editform = this.fb.group({
        id: [res._id, Validators.required],
        name: [res.name, Validators.required],
        phone: [res.phone],
        email: [res.email],
      });
    });
    this.id = data;
  }
  EditChanges() {
    this.auth.editForm(this.id, this.editform.value).subscribe((a: any) => {
      if (a.success) {
        this.className = 'alert alert-success';
        this.message = a.message;
        this.refreshData();
        this.refreshData();
      } else {
        this.className = 'alert alert-danger';
        this.message = a.message;
        this.refreshData();
        this.refreshData();
      }
      setTimeout(() => {
        this.className = 'd-none';
        this.message = '';
      }, 2000);
    });
  }
  deleteForm(data: any) {
    this.auth.deleteForm(data).subscribe((res: any) => {
      if (res.success) {
        this.className = 'alert alert-success';
        this.message = res.message;
        this.refreshData();
        this.refreshData();
      } else {
        this.className = 'alert alert-danger';
        this.message = res.message;
      }
      setTimeout(() => {
        this.className = 'd-none';
        this.message = '';
      }, 2000);
    });
  }
  addForm() {
    this.auth.addForm(this.addform.value).subscribe((data: any) => {
      if (data.success) {
        this.className = 'alert alert-success';
        this.message = data.message;
        this.refreshData();
        this.addform.reset();
      } else {
        this.className = 'alert alert-danger';
        this.message = data.message;
      }
      setTimeout(() => {
        this.className = 'd-none';
        this.message = '';
      }, 2000);
    });
  }
  checkoutData() {
    this.auth.checkoutData().subscribe((res: any) => {
      this.checkout = res;
    });
  }
  approve(data: any) {
    this.auth.getBuyoutBuyId(data).subscribe((res: any) => {
      var ob = {
        buyout: !res.buyout,
      };
      this.auth.updateCheckout(data, ob).subscribe((a: any) => {
        this.checkoutData();
      });
    });
  }
  getSeats() {
    this.mo.getNormal().subscribe((res: any) => {
      this.normal = res;
    });
    this.mo.getPremium().subscribe((res: any) => {
      this.premium = res;
    });
    this.mo.getSuper().subscribe((res: any) => {
      this.super = res;
    });
  }
  seatbook(data: any) {
    this.seatid = data;
    this.mo.getSeat(data).subscribe((res: any) => {
      var ob = {
        available: !res.available,
      };
      this.mo.editAvailable(data, ob).subscribe((a: any) => {
        this.getSeats();
      });
    });
  }
  getDetails() {
    this.mo.getDetails().subscribe((res: any) => {
      this.userDetails = res;
    });
  }
  getMovies(data: any) {
    this.moviedetail = [];
    this.mo.getMovie(data).subscribe((a: any) => {
      this.moviedetail.push(a);
    });
  }
  getMessage() {
    this.auth.getMessage().subscribe((res) => {

      if (res.success) {
        this.messagearray = res.data
      }
      else {
        this.messagearray = []
        // this.getMessage()
      }
    })
  }
  updateMessage(id: any, data: any) {
    var ob = {
      "send": data
    }
    this.auth.markRead(id, ob).subscribe((res) => {
      if (res.success) {
        this.getMessage()
        this.getMessage()
      }
      else {
        this.getMessage()
        this.getMessage()
      }
    })
  }
  sendNotification() {
    var ob = {
      "message": this.messagenotification,
      "type": this.typenotification
    }
    this.auth.sendNotification(ob).subscribe((res) => {
      if (res.success) {
        this.getNotification()
        this.messagenotification = ''
        this.typenotification = ''
      }
      else {
      }
    })
  }
  getNotification() {
    this.auth.getNotification().subscribe((res) => {
      this.typearray = res.data
      this.notificationarray = this.typearray.reverse()
      if (res.success) {
      }
    })
  }
}
