import * as React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react-native';
import ArtistBox from '@/components/ArtistBox';

describe('ArtistBox Component', () => {
    const mockArtist = {
        id: 1,
        name: 'Test Artist',
        image: 'https://example.com/image.jpg',
    };

    it('renders artist information correctly', () => {
        render(<ArtistBox artist={mockArtist} />);
        expect(screen.getByText('Test Artist')).toBeTruthy();
        expect(screen.getByTestId('artist-image')).toHaveProp('source', { uri: 'https://example.com/image.jpg' });
    });
});