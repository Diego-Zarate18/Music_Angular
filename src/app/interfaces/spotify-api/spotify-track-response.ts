export interface SpotifyTrackResponse {

    id: string;
    name: string;
    artists: [
        {
            id: string;
            href: string;
            name: string;
        }
    ],
    duration_ms: number;
    track_number: number;
}