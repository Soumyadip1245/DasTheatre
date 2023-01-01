import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
authenticationValue: boolean = false
  constructor(private http: HttpClient) { }
  signup(data:any):Observable<any>{
    return this.http.post('https://theatre-backend.vercel.app/auth/register',data)
  }
  login(){
    return this.http.get<any>('https://theatre-backend.vercel.app/auth/login')
  }
  adminauthorise(){
    return this.http.get<any>('https://theatre-backend.vercel.app/auth/admin')
  }
  FetchdataById(id:any){
    return this.http.get<any>('https://theatre-backend.vercel.app/auth/toggle/'+id)
  }
  updateItem(id:any,data:any){
    return this.http.put('https://theatre-backend.vercel.app/auth/update/'+id,data)
  }
  editForm(id:any,data:any){
    return this.http.put('https://theatre-backend.vercel.app/auth/edit/'+id,data)
  }
  deleteForm(id:any){
    return this.http.delete('https://theatre-backend.vercel.app/auth/delete/'+id)
  }
  addForm(data:any){
    return this.http.post('https://theatre-backend.vercel.app/auth/additem',data)
  }
  checkoutData(){
    return this.http.get<any>('https://theatre-backend.vercel.app/movies/checkout')
  }
  getBuyoutBuyId(id:any){
    return this.http.get<any>('https://theatre-backend.vercel.app/movies/toggle/'+id)
  }
  updateCheckout(id:any,data:any){
    return this.http.put('https://theatre-backend.vercel.app/movies/update/'+id,data)
  }
  getMovieById(data:any){
    return this.http.get<any>('https://theatre-backend.vercel.app/movies/toggle/'+data)
  }
  setValue(value: boolean){
    this.authenticationValue = value
  }
  getValue(){
    return this.authenticationValue
  }
  getForget(data:any){
    console.log(data)
    return this.http.get<any>('https://theatre-backend.vercel.app/auth/forget/'+data)
  }
}