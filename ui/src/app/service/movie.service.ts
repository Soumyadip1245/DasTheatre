import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }
  getall():Observable<any>{
    return this.http.get<any>('http://localhost:8080/movies/getUserMovieAll')
  }
  getAction():Observable<any>{
    return this.http.get<any>('http://localhost:8080/movies/getUserActionAll')
  }
  getFiction():Observable<any>{
    return this.http.get<any>('http://localhost:8080/movies/getUserFictionAll')
  }
  getBuyout():Observable<any>{
    return this.http.get<any>('http://localhost:8080/movies/getUserBuyoutAll')
  }
}
