import { Component, OnInit } from '@angular/core';
import { SpotifyAlbumService } from '../services/spotify-api/spotify-album-service';
import { Observable } from 'rxjs';
import { PlayerStateService } from '../services/player/player-state.service';
import { Track } from '../interfaces/track';
import { Image } from '../interfaces/image';
import { SpotifySearchService } from '../services/spotify-api/spotify-search-service';

@Component({
  selector: 'app-player',
  standalone: false,
  templateUrl: './player.html',
  styleUrl: './player.css'
})
export class Player implements OnInit{
  currentTrack$: Observable<Track | null>;
  queue$: Observable<Track[]>;
  cover$: Observable<Image | undefined>;

  constructor(
    private _spotifyAlbum: SpotifyAlbumService,
    private player: PlayerStateService,
    private _search: SpotifySearchService
  ){
    this.currentTrack$ = this.player.currentTrack$;
    this.queue$ = this.player.queue$;
    this.cover$ = this.player.cover$;
  }

  ngOnInit(): void {
    this._search.search('Circles Mac Miller').subscribe(res => {
      const album = (res.albums ?? []).find(a => a.name?.toLowerCase() === 'circles' && (a.artists ?? []).some(ar => ar.name?.toLowerCase() === 'mac miller'));
      const id = album?.id;
      if (id) {
        this._spotifyAlbum.getAlbum(id).subscribe(a => {
          if (a?.tracks) this.player.setQueue(a.tracks, a.images?.at(0));
        });
      }
    });
  }
}
