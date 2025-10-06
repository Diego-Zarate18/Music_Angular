import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('EXAMPLE_APP');
nextSongs: any[] = [
   {
      name: "Amar como tú",
      artist: "Steven",
      url: "https://picsum.photos/200",
      song: "/media/Amar.mp3"
  },
   {
      name: "Science",
      artist: "Arctic Monkeys",
      url: "https://picsum.photos/200",
      song: "/media/science.mp3"
  },
  {
      name: "Surf",
      artist: "Mac Miller",
      url: "https://picsum.photos/200",
      song: "/media/Surf.mp3"
  },
]
lastSongs: any[] = []
actualSong: any | undefined = undefined;


 changeSong(value: boolean){
  if(value){
    this.lastSongs.push(this.actualSong);
    this.actualSong = this.nextSongs.pop();
  }else{
    this.nextSongs.push(this.actualSong);
    this.actualSong = this.lastSongs.pop();
  }
 }

}