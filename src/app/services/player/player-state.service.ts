import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Track } from '../../interfaces/track';
import { Image } from '../../interfaces/image';

@Injectable({ providedIn: 'root' })
export class PlayerStateService {
  private queueSubject = new BehaviorSubject<Track[]>([]);
  private currentTrackSubject = new BehaviorSubject<Track | null>(null);
  private coverSubject = new BehaviorSubject<Image | undefined>(undefined);

  queue$ = this.queueSubject.asObservable();
  currentTrack$ = this.currentTrackSubject.asObservable();
  cover$ = this.coverSubject.asObservable();

  setQueue(tracks: Track[], cover?: Image) {
    this.queueSubject.next(tracks ?? []);
    this.coverSubject.next(cover);
    if (tracks && tracks.length > 0) {
      this.currentTrackSubject.next(tracks[0]);
    }
  }

  play(track: Track) {
    this.currentTrackSubject.next(track);
  }

  next() {
    const queue = this.queueSubject.getValue();
    const current = this.currentTrackSubject.getValue();
    if (!current || queue.length === 0) return;
    const idx = queue.findIndex(t => t.id === current.id);
    const next = queue[(idx + 1) % queue.length];
    this.currentTrackSubject.next(next);
  }

  prev() {
    const queue = this.queueSubject.getValue();
    const current = this.currentTrackSubject.getValue();
    if (!current || queue.length === 0) return;
    const idx = queue.findIndex(t => t.id === current.id);
    const prev = queue[(idx - 1 + queue.length) % queue.length];
    this.currentTrackSubject.next(prev);
  }
}
