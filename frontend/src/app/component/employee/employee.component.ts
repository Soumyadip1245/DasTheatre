import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/service/movie.service';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import { AuthService } from 'src/app/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  movies: any[] = []

  className = "d-none"
  namevalue: any
  name: any
  normal: any[] = []
  premium: any[] = []
  seat: any[] = []
  seatid: any
  seatcount: any
  grandTotal: number = 0
  total: any[] = []
  super: any[] = []
  contact: any
  email: any
  payment: any
  className1 = 'd-none'
  className2 = 'd-none'
  uniqid: any
  userDetails: any[] = []
  searchbar: string = ""
  searchedData: any[] = []
  message: any = ''
  movie: any
  totalprice: any
  // messagearray: any[] = []
  typearray: any[] = []
  notificationarray: any[] = []
  constructor(private auth: AuthService, private mo: MovieService, private router: Router) { }

  ngOnInit(): void {
    localStorage.removeItem("auth")
    this.buyouttrue()
    this.getSeats()
    this.seatcount
    this.getDetails()


  }
  buyouttrue() {
    this.mo.buyouttrue().subscribe((res: any) => {
      this.movies = res
    })
  }
  getData(data: any) {
    this.mo.getMovieById(data).subscribe((a: any) => {
      this.namevalue = a.name
      this.className = 'alert alert-success text-center'
    })
    setTimeout(() => {
      this.className = 'd-none'
    }, 2000)
  }
  getSeats() {
    this.mo.getNormal().subscribe((res: any) => {
      this.normal = res
    })
    this.mo.getPremium().subscribe((res: any) => {
      this.premium = res
    })
    this.mo.getSuper().subscribe((res: any) => {
      this.super = res
    })
  }
  seatbook(data: any) {
    this.seatid = data
    this.mo.getSeat(data).subscribe((res: any) => {
      if (res.available == true) {
        this.className1 = 'alert alert-info'
        this.message = 'Seat made available again'
        setTimeout(() => {
          this.className1 = 'd-none'
          this.message = ''
        }, 2000)
      }
      var ob = {
        "available": !res.available
      }
      this.mo.editAvailable(data, ob).subscribe((a: any) => {
        this.getSeats()
      })
      this.seat.push(res.Seat)
      this.seatcount = this.seat.length
      this.total.push(res.price)

    })


  }
  resetSeat() {
    this.className1 = 'alert alert-success'
    this.message = 'Seat Booked'
    let result = this.total.map(Number)
    result.map((a: any) => {
      this.grandTotal = this.grandTotal + a
    })
    setTimeout(() => {
      this.className1 = 'd-none'
      this.message = ''
    }, 2000)
  }
  onSubmit() {

    this.className2 = 'alert alert-primary'
    var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
    this.uniqid = randLetter + Date.now();
    var ob = {
      name: this.name,
      movie: this.namevalue,
      contact: this.contact,
      email: this.email,
      payment: this.payment,
      seat: this.seat,
      total: this.grandTotal,
      order: this.uniqid

    }
    this.mo.sendMail(ob).subscribe(() => {
    })
    this.addDetails()
    setTimeout(() => {
      this.className2 = 'd-none'
    }, 4000)
  }
  getDetails() {
    this.mo.getDetails().subscribe((res: any) => {
      this.userDetails = res
    })
  }
  addDetails() {
    var ob = {
      name: this.name,
      movie: this.namevalue,
      contact: this.contact,
      email: this.email,
      payment: this.payment,
      seat: this.seat,
      total: this.grandTotal,
      order: this.uniqid

    }
    this.mo.addDetails(ob).subscribe((res: any) => {
    })
  }
  searchBar() {
    if (this.searchbar == '') {

    }
    this.mo.searchBar(this.searchbar).subscribe((a: any) => {
      this.searchedData = a
      this.searchbar = ''
    })
  }
  printPdf() {
    html2canvas(document.getElementById("table")!).then(canvas => {
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p', 'mm', 'a2');
      var width = pdf.internal.pageSize.getWidth();
      var height = canvas.height * width / canvas.width;
      pdf.addImage(contentDataURL, 'PNG', 0, 0, width, height)
      pdf.save('ticket.pdf');
    });
    setTimeout(() => {
      this.className2 = 'd-none'
      this.grandTotal = 0
      this.seat = []
      this.total = []
      this.seatcount = 0
      this.name = ''
      this.namevalue = ''
      this.contact = ''
      this.email = ''
      this.payment = ''
      this.uniqid = ''
      this.getDetails()
    }, 4000)
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
