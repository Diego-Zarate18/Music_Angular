import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpotifyLoginService {

  constructor(
    private _http:HttpClient
  ) {  }

  getToken(): Observable<any> {
    const body = new HttpParams()
      .set("grant_type", "client_credentials")
      .set("client_id", "3a4145626a9f452393b936c1c9d01c45")
      .set("client_secret", "d1a08ade30e94a66a21fd22443a491f3");
    return this._http.post<any>(
      "https://accounts.spotify.com/api/token", 
      body.toString(),
      {
        headers: {'Content-Type': "application/x-www-form-urlencoded"}
      }
    );

  }
}
