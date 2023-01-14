import { Component } from '@angular/core';
import { MovieService } from './service/movie.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  action: any[]=[]
  all: any[]=[]
  buyout: any[]=[]
  fiction: any[]=[]
  constructor(private mo: MovieService){

  }
  ngOnInit(): void {
    this.getAll()
    this.getBuyout()
    this.getAction()
    this.getFiction()
  }
  getAll(){
    this.mo.getall().subscribe((res)=>{
      this.all = res.data
    })
  }
  getAction(){
    this.mo.getAction().subscribe((res)=>{
      this.action = res.data
    })
  }
  getFiction(){
    this.mo.getFiction().subscribe((res)=>{
      
      this.fiction = res.data
    })
  }
  getBuyout(){
    this.mo.getBuyout().subscribe((res)=>{
      this.buyout = res.data
    })
  }
}
