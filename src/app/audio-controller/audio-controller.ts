import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { PlayerStateService } from '../services/player/player-state.service';

@Component({
  selector: 'app-audio-controller',
  standalone: false,
  templateUrl: './audio-controller.html',
  styleUrl: './audio-controller.css'
})
export class AudioController implements OnInit, OnDestroy {
  @ViewChild('audioEl', { static: true }) audioRef!: ElementRef<HTMLAudioElement>;
  @ViewChild('rangeRef', { static: true }) rangeRef!: ElementRef<HTMLInputElement>;
  private sub?: Subscription;
  isPlaying = false;

  constructor(private player: PlayerStateService) {}

  ngOnInit(): void {
    this.sub = this.player.currentTrack$.subscribe(track => {
      const audio = this.audioRef.nativeElement;
      if (!track || !track.preview_url) {
        audio.pause();
        this.isPlaying = false;
        return;
      }
      audio.src = track.preview_url;
      audio.load();
      audio.play().then(() => (this.isPlaying = true)).catch(() => (this.isPlaying = false));
    });

    const audio = this.audioRef.nativeElement;
    audio.addEventListener('ended', () => this.next());
    audio.addEventListener('timeupdate', () => {
      if (!this.rangeRef) return;
      const progress = (audio.currentTime / (audio.duration || 1)) * 100;
      this.rangeRef.nativeElement.value = String(isNaN(progress) ? 0 : progress);
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  toggle() {
    const audio = this.audioRef.nativeElement;
    if (audio.paused) {
      audio.play();
      this.isPlaying = true;
    } else {
      audio.pause();
      this.isPlaying = false;
    }
  }

  next() { this.player.next(); }
  prev() { this.player.prev(); }

  onSeek(event: Event){
    const audio = this.audioRef.nativeElement;
    const value = Number((event.target as HTMLInputElement).value);
    audio.currentTime = (value / 100) * (audio.duration || 0);
  }

}
