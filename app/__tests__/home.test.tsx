import * as React from 'react';
import { render, screen, waitFor } from '@testing-library/react-native';
import Home from '../home';

jest.mock('../api-client', () => ({
    getMusicData: jest.fn().mockResolvedValue([
        { id: 1, name: 'Artist One', image: 'https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png' },
        { id: 2, name: 'Artist Two', image: 'https://lastfm.freetls.fastly.net/i/u/34s/2a96cbd8b46e442fc41c2b86b821562f.png' }
    ])
}));

jest.mock('@/components/ArtistList', () => {
  const React = require('react');
  const { Text } = require('react-native');
  return () => <Text>Mocked ArtistList</Text>;
});



describe('Home Screen', () => {
    it('renders a list of artists', async () => {
        render(<Home />);
        await waitFor(() => {
            expect(screen.getByText('Mocked ArtistList')).toBeTruthy();
        });
    });
});