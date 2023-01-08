import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Data } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authenticationvalue: boolean = true
  constructor(private http: HttpClient) { }
  signup(data: any): Observable<any> {
    return this.http.post('http://localhost:8080/auth/register', data)
  }
  login(data: any): Observable<any> {
    return this.http.post('http://localhost:8080/auth/login', data)
  }
  profile(): Observable<any> {
    let headers = {
      'Authorization': "Bearer " + localStorage.getItem('token')
    }
    return this.http.get<any>("http://localhost:8080/auth/profile", { headers: headers })

  }
  adminauthorise() {
    return this.http.get<any>('http://localhost:8080/auth/admin')
  }
  FetchdataById(id: any) {
    return this.http.get<any>('http://localhost:8080/auth/toggle/' + id)
  }
  updateItem(id: any, data: any) {
    return this.http.put('http://localhost:8080/auth/update/' + id, data)
  }
  editForm(id: any, data: any) {
    return this.http.put('http://localhost:8080/auth/editUser/' + id, data)
  }
  deleteForm(id: any) {
    return this.http.delete('http://localhost:8080/auth/deleteUser/' + id)
  }
  addForm(data: any) {
    return this.http.post('http://localhost:8080/auth/postdata', data)
  }
  checkoutData() {
    return this.http.get<any>('http://localhost:8080/movies/checkout')
  }
  getBuyoutBuyId(id: any) {
    return this.http.get<any>('http://localhost:8080/movies/toggle/' + id)
  }
  updateCheckout(id: any, data: any) {
    return this.http.put('http://localhost:8080/movies/update/' + id, data)
  }
  getMovieById(data: any) {
    return this.http.get<any>('http://localhost:8080/movies/toggle/' + data)
  }
  forget(data: any): Observable<any> {
    return this.http.post('http://localhost:8080/auth/forgetemail', data)
  }
  resetPassword(id: any, data: any): Observable<any> {
    return this.http.put('http://localhost:8080/auth/editPassword/' + id, data)
  }
  LoggedIn() {
    return !localStorage.getItem("token")
  }
  getTypeTokenGet() {
    var Token = localStorage.getItem("token") || ''
    var split = Token.split('.')[1]
    var value = atob(split)
    var jsontype = JSON.parse(value)
    return jsontype.type
  }
  getMessage(): Observable<any> {
    return this.http.get<any>('http://localhost:8080/auth/getMessage')
  }
  markRead(id: any, data: any): Observable<any> {
    return this.http.put('http://localhost:8080/auth/readMessage/' + id, data)
  }
  sendNotification(data: any): Observable<any> {
    return this.http.post('http://localhost:8080/auth/postNotification', data)
  }
  getNotification(): Observable<any> {
    return this.http.get<any>('http://localhost:8080/auth/getNotification')
  }
}