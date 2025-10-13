import { HttpClient, HttpParams } from '@angular/common/http';
import { HtmlParser } from '@angular/compiler';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpotifyLoginService {
  private token: string = "";

  constructor(
    private _http:HttpClient
  ){

  }
  
  getToken():string{
    const body = new HttpParams()
      .set("grant_type", "")
      .set("client_id", "")
      .set("client_secret", "");

    this._http.post<any>("",body.toString(),{
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).subscribe((data) =>{
      this.token = data.access_token;
      console.log(this.token);

      return this.token;

    }
    );
    return this.token;

  }
    


}