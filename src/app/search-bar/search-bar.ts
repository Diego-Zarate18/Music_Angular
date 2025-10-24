import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { SpotifySearchService, SearchResult } from '../services/spotify-api/spotify-search-service';
import { PlayerStateService } from '../services/player/player-state.service';
import { SpotifyAlbumService } from '../services/spotify-api/spotify-album-service';

@Component({
  selector: 'app-search-bar',
  standalone: false,
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css'
})
export class SearchBar implements OnInit, OnDestroy {
  private input$ = new Subject<string>();
  private sub?: Subscription;
  results?: SearchResult;
  open = false;

  constructor(
    private search: SpotifySearchService,
    private playerState: PlayerStateService,
    private albumService: SpotifyAlbumService
  ) {}

  ngOnInit(): void {
    this.sub = this.input$
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(q => this.search.search(q))
      )
      .subscribe(r => {
        this.results = r;
        this.open = true;
      });
  }

  onInput(evt: Event) {
    const val = (evt.target as HTMLInputElement).value.trim();
    if (val.length === 0) {
      this.results = undefined;
      this.open = false;
      return;
    }
    this.input$.next(val);
  }

  playTrack(id: string) {
    const track = this.results?.tracks.find(t => t.id === id);
    if (track) {
      this.playerState.play(track);
      this.open = false;
    }
  }

  loadAlbum(id: string) {
    this.albumService.getAlbum(id).subscribe(album => {
      this.playerState.setQueue(album.tracks, album.images?.at(0));
      this.open = false;
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
