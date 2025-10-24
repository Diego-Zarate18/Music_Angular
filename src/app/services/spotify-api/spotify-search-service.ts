import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Track } from '../../interfaces/track';
import { Image } from '../../interfaces/image';

export interface SimpleImage { url: string; }
export interface SimpleArtist { id: string; name: string; }
export interface SimpleAlbum { id: string; name: string; images?: SimpleImage[]; artists?: SimpleArtist[]; }
export interface SearchResult {
  tracks: Track[];
  artists: SimpleArtist[];
  albums: SimpleAlbum[];
}

@Injectable({ providedIn: 'root' })
export class SpotifySearchService {
  constructor(private http: HttpClient) {}

  search(query: string): Observable<SearchResult> {
    const url = `${environment.API_URL}/search`;
    const params = {
      q: query,
      type: 'track,artist,album',
      limit: 5
    } as any;

    return this.http.get<any>(url, { params }).pipe(
      map(res => {
        const tracks: Track[] = (res.tracks?.items ?? []).map((t: any) => ({
          id: t.id,
          name: t.name,
          duration_ms: t.duration_ms,
          href: t.href,
          preview_url: t.preview_url,
          artists: (t.artists ?? []).map((a: any) => ({ id: a.id, name: a.name }))
        }));
        const artists: SimpleArtist[] = (res.artists?.items ?? []).map((a: any) => ({
          id: a.id,
          name: a.name,
          images: a.images
        }));
        const albums: SimpleAlbum[] = (res.albums?.items ?? []).map((a: any) => ({
          id: a.id,
          name: a.name,
          images: a.images,
          artists: (a.artists ?? []).map((ar: any) => ({ id: ar.id, name: ar.name }))
        }));
        return { tracks, artists, albums } as SearchResult;
      })
    );
  }
}
