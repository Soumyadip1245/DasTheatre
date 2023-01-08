import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';
import { MovieService } from 'src/app/service/movie.service';

@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrls: ['./director.component.css'],
})
export class DirectorComponent implements OnInit {
  Movies: any[] = [];
  id: any;
  addform!: FormGroup;
  editform!: FormGroup;
  messageform!: FormGroup
  moviedata: any;
  message: any
  className = 'd-none'
  className1 = 'd-none'
  message1 = ''
  constructor(
    private auth: AuthService,
    private mo: MovieService,
    private fb: FormBuilder
  ) {
    this.messageform = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      message: ['', Validators.required]
    })
    this.addform = this.fb.group({
      name: ['', Validators.required],
      image: ['', Validators.required],
      age: ['', Validators.required],
      release: ['', Validators.required],
      amount: ['', Validators.required],
      type: ['', Validators.required],
      description: ['', Validators.required],
    });
    this.editform = this.fb.group({
      name: ['', Validators.required],
      image: ['', Validators.required],
      age: ['', Validators.required],
      release: ['', Validators.required],
      amount: ['', Validators.required],
      type: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    localStorage.removeItem('auth');
    this.getAll();
  }
  getAll() {
    this.mo.getAllMovies().subscribe((res: any) => {
      this.Movies = res;
    });
  }
  Checkout(data: any) {
    this.mo.getMovieById(data).subscribe((a: any) => {
      var ob = {
        checkout: !a.checkout,
      };
      this.mo.updateCheckout(data, ob).subscribe((b: any) => {
        this.getAll();
      });
    });
  }

  getDatabycard(data: any) {
    this.mo.getMovieById(data).subscribe((res: any) => {
      this.id = res._id;
      this.moviedata = res;
    });
  }
  deleteMovie() {
    this.mo.deleteMovie(this.id).subscribe((a) => {
      if (a.success) {
        this.getAll();
        this.className = 'alert alert-success'
        this.message = a.message
      }
      else {
        this.getAll();
        this.className = 'alert alert-warning'
        this.message = a.message
      }
    });
    setTimeout(() => {
      this.className = 'd-none'
      this.message = ''
      this.getAll();
      this.moviedata = ' ';
      this.id = ' ';
    }, 2000)
  }
  addMovies() {
    this.mo.addMovies(this.addform.value).subscribe((res) => {
      if (res.success) {
        this.className = 'alert alert-success'
        this.message = res.message
        this.addform.reset()
        this.getAll()
      }
      else {
        this.className = 'alert alert-danger'
        this.message = res.message
        this.addform.reset()
        this.getAll()

      }
    })
    setTimeout(() => {
      this.className = 'd-none'
      this.message = ''
    }, 2000)
  }
  editMovies() {
    this.editform = this.fb.group({
      name: [this.moviedata.name, Validators.required],
      image: [this.moviedata.image, Validators.required],
      age: [this.moviedata.age, Validators.required],
      release: [this.moviedata.release, Validators.required],
      type: [this.moviedata.type, Validators.required],
      amount: [this.moviedata.amount, Validators.required],
      description: [this.moviedata.description, Validators.required],
    });
  }
  savemovie() {
    this.mo.updateMovie(this.id, this.editform.value).subscribe((res) => {
      if (res.success) {
        this.getAll();
        this.editform.reset();
        this.className = 'alert alert-success'
        this.message = res.message
      }
      else {
        this.getAll();
        this.editform.reset();
        this.className = 'alert alert-warning'
        this.message = res.message
      }
      setTimeout(() => {

        this.moviedata = ' ';
        this.id = ' ';
        this.className = 'd-none'
        this.editform.reset();
      }, 2000)

    });
  }
  sendMessage() {
    this.mo.sendMessage(this.messageform.value).subscribe((res) => {
      if (res.success) {
        this.className1 = 'alert alert-success'
        this.message1 = res.message
        setTimeout(() => {
          this.className1 = 'd-none'
          this.message = ''
        }, 2000)
        this.messageform.reset()
      }
      else {
        this.className1 = 'alert alert-warning'
        this.message1 = res.message
        setTimeout(() => {
          this.className1 = 'd-none'
          this.message = ''
        }, 2000)
      }
    })
  }
}
