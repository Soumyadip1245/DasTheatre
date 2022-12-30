import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MovieService } from 'src/app/service/movie.service';

@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrls: ['./director.component.css']
})
export class DirectorComponent implements OnInit {
  Movies: any[]=[]
  id: any
  addform!:FormGroup
  editform!: FormGroup
  moviedata:any
  constructor(private mo: MovieService, private fb: FormBuilder) {
    this.addform = this.fb.group({
      name: ['',Validators.required],
      image: ['',Validators.required],
      age: ['',Validators.required],
      release: ['',Validators.required],
      amount: ['',Validators.required],
      type: ['',Validators.required],
      description: ['',Validators.required],
    })
    this.editform = this.fb.group({
      name: ['',Validators.required],
      image: ['',Validators.required],
      age: ['',Validators.required],
      release: ['',Validators.required],
      amount: ['',Validators.required],
      type: ['',Validators.required],
      description: ['',Validators.required],
    })
   }

  ngOnInit(): void {
    this.getAll()
  }
  getAll(){
    this.mo.getAllMovies().subscribe((res:any)=>{
      this.Movies = res
    })
  }
  Checkout(data:any){
    this.mo.getMovieById(data).subscribe((a:any)=>{
      console.log(a.checkout)
      var ob = {
        "checkout": !a.checkout
      }
      this.mo.updateCheckout(data,ob).subscribe((b:any)=>{
        console.log(b)
        this.getAll()
      })
    })
  }
  
  getDatabycard(data:any){
    this.mo.getMovieById(data).subscribe((res:any)=>{
      this.id = res._id
      this.moviedata = res
    })
  }
  deleteMovie(){
    this.mo.deleteMovie(this.id).subscribe((a:any)=>{
      console.log(a)
      this.getAll()
      this.moviedata = " "
      this.id = " "
    })
  }
  addMovies(){
    this.mo.addMovies(this.addform.value).subscribe((res:any)=>{
      console.log(res)
      this.getAll()
    })
  }
  editMovies(){
    this.editform = this.fb.group({
      name: [this.moviedata.name,Validators.required],
      image: [this.moviedata.image,Validators.required],
      age: [this.moviedata.age,Validators.required],
      release: [this.moviedata.release,Validators.required],
      type: [this.moviedata.type,Validators.required],
      amount: [this.moviedata.amount,Validators.required],
      description: [this.moviedata.description,Validators.required]
    })
    
  }
  savemovie()
  {
    this.mo.updateMovie(this.id,this.editform.value).subscribe((res:any)=>{
      console.log(res)
      this.getAll()
      this.moviedata = " "
      this.id = " "
      this.editform.reset()
    })
  }
}
