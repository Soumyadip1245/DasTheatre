import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  profiledata: any[] = []
  className = 'btn btn-primary'
  className2 = 'd-none'
  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
  }
  close() {
    this.profiledata = []
    this.className = 'btn btn-primary'
  }
  profileGet() {

    this.className = 'd-none'
    this.auth.profile().subscribe((a) => {
      if (a.success) {
        this.profiledata.push(a.data)
      }
      else {
      }
    })
  }
  logout() {
    localStorage.clear()
    this.router.navigate(['/authentication'])
  }
}
