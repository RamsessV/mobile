import { ArtistResource } from "@/types/artist";

const api_key = 'ba786db75ce954fd31cfda0f796cfad7';
const url = `http://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=spain&api_key=${api_key}&format=json`;

export function getMusicData() {
    return fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(data => data.topartists.artist)
    .then(artists => artists.map((artist: ArtistResource) => {
        return {
            id: artist.mbid,
            name: artist.name,
            image: artist.image[0]['#text']
        }
    }))
}


