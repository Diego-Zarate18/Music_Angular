import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SpotifyPlaylistResponse } from '../../interfaces/spotify-api/spotify-playlist-response';
import { CookieStorageService } from '../cookie-storage-service';

@Injectable({
  providedIn: 'root'
})
export class SpotifyPlaylistService {

  constructor(
    private _http: HttpClient,
    private _cookieStorageService: CookieStorageService
  ){ }

  getPlaylist(): Observable<SpotifyPlaylistResponse>{

    return this._http.get<SpotifyPlaylistResponse>(
      "https://api.spotify.com/v1/playlists/3cEYpjA9oz9GiPac4AsH4n",
      {
        headers: {
          'Authorization': "Bearer " + this._cookieStorageService.getCookieValue('access_token')
        }
      }
    )

  }
  
}
