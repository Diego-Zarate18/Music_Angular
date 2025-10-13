import { SpotifyImageResponse } from './spotify-img-response';
import { SpotifyTrackResponse } from './spotify-track-response';
export interface SpotifyPlaylistResponse {

    id: string;
    name: string;
    description: string;
    href: string;
    images: SpotifyImageResponse[];
    tracks: {
        items: {
            track: SpotifyTrackResponse[];
        }
    }


}