import { Component, input } from '@angular/core';
import { Song } from '../interfaces/song';
import { Track } from '../interfaces/track';
import { Image } from '../interfaces/image';
import { PlayerStateService } from '../services/player/player-state.service';

@Component({
  selector: 'app-playlist',
  standalone: false,
  templateUrl: './playlist.html',
  styleUrl: './playlist.css'
})
export class Playlist {

  playlist = input.required<Track[] | undefined>();
  cover = input.required<Image | undefined>();

  constructor(private player: PlayerStateService) {}

  onSelect(track: Track){
    this.player.play(track);
  }

}
