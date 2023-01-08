import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { MovieService } from 'src/app/service/movie.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  movies: any[] = []
  constructor(private router: Router, private auth: AuthService, private mo: MovieService) { }

  ngOnInit(): void {
    this.getMovies()
    var type = this.auth.getTypeTokenGet()
    if (type == "Admin") {
      this.router.navigate(['/admin'])
    }
    else if (type == 'Employee') {
      this.router.navigate(['/employee'])
    }
    else if (type == 'Director') {
      this.router.navigate(['/director'])
    }
    else {
      this.router.navigate(['/welcome'])
    }
  }
  getMovies() {
    this.mo.buyouttrue().subscribe((res: any) => {
      this.movies = res
    })
  }

}
