import * as React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react-native';
import ArtistList from '@/components/ArtistList';


const artistList = [
    { id: 1, name: 'Artist One', image: 'https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png' },
    { id: 2, name: 'Artist Two', image: 'https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png' }
];

const mockPush = jest.fn();
jest.mock('expo-router', () => ({
    useRouter: () => ({
        push: mockPush,
    }),
}));

jest.mock('@/components/ArtistBox', () => {
    const React = require('react');
    const { Text } = require('react-native');
    return () => <Text>Mocked ArtistBox</Text>;
});

describe('ArtistList Component', () => {
    it('renders a list of artists', () => {
        render(<ArtistList artists={artistList} />);
        expect(screen.getByTestId('artist-box-Artist One')).toBeTruthy();
        expect(screen.getByTestId('artist-box-Artist Two')).toBeTruthy();
    });

    it('navigates to artist detail on press', async () => {
        render(<ArtistList artists={artistList} />);
        const artistOneBox = screen.getByTestId('artist-box-Artist One');
        fireEvent.press(artistOneBox);
        await waitFor(() => {
            expect(mockPush).toHaveBeenCalledWith({
                pathname: "./ArtistDetailView",
                params: { id: 1, name: 'Artist One', image: 'https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png' }
            });
        }); 
    });

    it('renders ArtistBox component for each artist', () => {
        render(<ArtistList artists={artistList} />);
        const artistBoxes = screen.getAllByText('Mocked ArtistBox');
        expect(artistBoxes.length).toBe(2);
    });
});