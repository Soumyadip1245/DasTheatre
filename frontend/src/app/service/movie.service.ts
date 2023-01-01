import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }
  getAllMovies(){
    return this.http.get<any>('https://theatre-backend.vercel.app/movies/movies')
  }
  getMovieById(id:any){
    return this.http.get<any>('https://theatre-backend.vercel.app/movies/toggle/'+id)
  }
  updateCheckout(id:any,data:any){
    return this.http.put('https://theatre-backend.vercel.app/movies/updateCheckout/'+id,data)
  }
  deleteMovie(data:any){
    return this.http.delete('https://theatre-backend.vercel.app/movies/delete/'+data)
  }
  addMovies(data:any){
    return this.http.post('https://theatre-backend.vercel.app/movies/addmovies',data)
  }
  updateMovie(id:any,data:any){
    return this.http.put('https://theatre-backend.vercel.app/movies/edit/'+id,data)
  }
  buyouttrue(){
    return this.http.get<any>('https://theatre-backend.vercel.app/movies/sort')
  }
  getNormal(){
    return this.http.get<any>('https://theatre-backend.vercel.app/movies/normal')
  }
  getPremium(){
    return this.http.get<any>('https://theatre-backend.vercel.app/movies/premium')
  }
  getSuper(){
    return this.http.get<any>('https://theatre-backend.vercel.app/movies/super')
  }
  editAvailable(id: any,data: any){
    return this.http.put('https://theatre-backend.vercel.app/movies/updateAvailable/'+id,data)
  }
  resetAvailable(id: any,data: any){
    return this.http.put('https://theatre-backend.vercel.app/movies/resetAvailable/'+id,data)
  }
  getSeat(id:any){
    return this.http.get<any>('https://theatre-backend.vercel.app/movies/seat/'+id)
  }
  getDetails(){
    return this.http.get<any>('https://theatre-backend.vercel.app/movies/details')
  }
  addDetails(data:any){
    return this.http.post('https://theatre-backend.vercel.app/movies/addDetails',data)
  }
  searchBar(name:any){
    return this.http.get<any>('https://theatre-backend.vercel.app/movies/searchbar/'+name)
  }
  sendMail(ob:any){
    return this.http.post('https://theatre-backend.vercel.app/movies/sendmails',ob)
  }
}
