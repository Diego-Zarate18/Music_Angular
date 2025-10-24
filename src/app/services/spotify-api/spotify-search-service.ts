import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Track } from '../../interfaces/track';
import { Image } from '../../interfaces/image';

export interface SimpleImage { url: string; }
export interface SearchTrackItem { id: string; name: string; artist: string; image?: string; duration_ms?: number; preview_url?: string; }
export interface SearchArtistItem { id: string; name: string; image?: string; }
export interface SearchAlbumItem { id: string; name: string; image?: string; artist?: string; }
export interface SearchResult {
  tracks: SearchTrackItem[];
  artists: SearchArtistItem[];
  albums: SearchAlbumItem[];
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
        const tracks: SearchTrackItem[] = (res.tracks?.items ?? []).map((t: any) => ({
          id: t.id,
          name: t.name,
          artist: (t.artists?.[0]?.name ?? ''),
          image: t.album?.images?.[0]?.url,
          duration_ms: t.duration_ms,
          preview_url: t.preview_url,
        }));
        const artists: SearchArtistItem[] = (res.artists?.items ?? []).map((a: any) => ({
          id: a.id,
          name: a.name,
          image: a.images?.[0]?.url
        }));
        const albums: SearchAlbumItem[] = (res.albums?.items ?? []).map((a: any) => ({
          id: a.id,
          name: a.name,
          image: a.images?.[0]?.url,
          artist: a.artists?.[0]?.name
        }));
        return { tracks, artists, albums } as SearchResult;
      })
    );
  }
}
