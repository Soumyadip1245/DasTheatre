import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }
  getAllMovies(){
    return this.http.get<any>('http://localhost:8080/movies/movies')
  }
  getMovieById(id:any){
    return this.http.get<any>('http://localhost:8080/movies/toggle/'+id)
  }
  updateCheckout(id:any,data:any){
    return this.http.put('http://localhost:8080/movies/updateCheckout/'+id,data)
  }
  deleteMovie(data:any){
    return this.http.delete('http://localhost:8080/movies/delete/'+data)
  }
  addMovies(data:any){
    return this.http.post('http://localhost:8080/movies/addmovies',data)
  }
  updateMovie(id:any,data:any){
    return this.http.put('http://localhost:8080/movies/edit/'+id,data)
  }
  buyouttrue(){
    return this.http.get<any>('http://localhost:8080/movies/sort')
  }
  getNormal(){
    return this.http.get<any>('http://localhost:8080/movies/normal')
  }
  getPremium(){
    return this.http.get<any>('http://localhost:8080/movies/premium')
  }
  getSuper(){
    return this.http.get<any>('http://localhost:8080/movies/super')
  }
  editAvailable(id: any,data: any){
    return this.http.put('http://localhost:8080/movies/updateAvailable/'+id,data)
  }
  resetAvailable(id: any,data: any){
    return this.http.put('http://localhost:8080/movies/resetAvailable/'+id,data)
  }
  getSeat(id:any){
    return this.http.get<any>('http://localhost:8080/movies/seat/'+id)
  }
  getDetails(){
    return this.http.get<any>('http://localhost:8080/movies/details')
  }
  addDetails(data:any){
    return this.http.post('http://localhost:8080/movies/addDetails',data)
  }
  searchBar(name:any){
    return this.http.get<any>('http://localhost:8080/movies/searchbar/'+name)
  }
  sendMail(ob:any){
    return this.http.post('http://localhost:8080/movies/sendmails',ob)
  }
  getMovie(id:any){
    return this.http.get<any>('http://localhost:8080/movies/viewMovie/'+id)
  }
}
