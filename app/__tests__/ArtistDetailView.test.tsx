import * as React from 'react';
import { render, screen, waitFor } from '@testing-library/react-native';
import ArtistDetailView from '../ArtistDetailView';


const mockParams = jest.fn();
jest.mock('expo-router', () => ({
    useGlobalSearchParams: () => ({
        id: 1,
        name: 'Test Artist',
        image: 'https://example.com/image.jpg',
    })
}));

describe('Artist detail view render', () => {
    it('renders correctly', () => {
        render(<ArtistDetailView />)
        expect(screen.getByTestId('artist-image')).toBeTruthy();
        expect(screen.getByText('Test Artist')).toBeTruthy();
    })
});