import { Component, computed, Input, input } from '@angular/core';

@Component({
  selector: 'app-info-song',
  standalone: false,
  templateUrl: './info-song.html',
  styleUrl: './info-song.css'
})
export class InfoSong {

  @Input({required: true})
  song: any;

  /*
  song_input = input();
  song = computed(() => this.song_input);
  */
  /*

  constructor(){
    this.song = {
      name: "cancion por codigo",
      artist: "artista medio de codigo",
      url: "https://picsum.photos/200"
    };
  }

  */
}