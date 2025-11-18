import * as React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react-native';
import { Alert } from 'react-native';
import Register from '../register';

jest.spyOn(Alert, 'alert');

const mockPush = jest.fn();
jest.mock('expo-router', () => ({
    useRouter: () => ({
        push: mockPush,
    }),
}));

describe('Register Screen', () => {
    it('renders correctly', () => {
        render(<Register />);
        expect(screen.getByTestId('image')).toBeTruthy();
        expect(screen.getByPlaceholderText('Type your email here')).toBeTruthy();
        expect(screen.getByPlaceholderText('Type your password here')).toBeTruthy();
        expect(screen.getByPlaceholderText('Type your username here')).toBeTruthy();
        expect(screen.getByPlaceholderText('Confirm your password here')).toBeTruthy();
        expect(screen.getByText('Submit')).toBeTruthy();
    });
    it('shows alert when fields are empty', () => {
        render(<Register />);
        fireEvent.press(screen.getByText('Submit'));
        expect(Alert.alert).toHaveBeenCalledWith("Validation Result", 'Email, Password, Password Confirmation, and Username cannot be empty.');
    });
    it('shows alert when only email is empty', () => {
        render(<Register />);
        fireEvent.changeText(screen.getByPlaceholderText('Type your password here'), 'ValidPass1!');
        fireEvent.changeText(screen.getByPlaceholderText('Confirm your password here'), 'ValidPass1!');
        fireEvent.changeText(screen.getByPlaceholderText('Type your username here'), 'ValidUser');
        fireEvent.press(screen.getByText('Submit'));
        expect(Alert.alert).toHaveBeenCalledWith("Validation Result", 'Email cannot be empty.');
    });
    it('shows alert when only password is empty', () => {
        render(<Register />);
        fireEvent.changeText(screen.getByPlaceholderText('Type your email here'), 'correo@correo.com');
        fireEvent.changeText(screen.getByPlaceholderText('Type your username here'), 'ValidUser');
        fireEvent.changeText(screen.getByPlaceholderText('Confirm your password here'), 'ValidPass1!');
        fireEvent.press(screen.getByText('Submit'));
        expect(Alert.alert).toHaveBeenCalledWith("Validation Result", "Password cannot be empty.")
    });
    it('shows alert when only password confirmation is empty', () => {
        render(<Register />);
        fireEvent.changeText(screen.getByPlaceholderText('Type your email here'), 'correo@correo.com');
        fireEvent.changeText(screen.getByPlaceholderText('Type your username here'), 'ValidUser');
        fireEvent.changeText(screen.getByPlaceholderText('Type your password here'), 'ValidPass1!');
        fireEvent.press(screen.getByText('Submit'));
        expect(Alert.alert).toHaveBeenCalledWith("Validation Result", "Password Confirmation cannot be empty.")
    });
    it('shows alert when only username is empty', () => {
        render(<Register />);
        fireEvent.changeText(screen.getByPlaceholderText('Type your email here'), 'correo@correo.com');
        fireEvent.changeText(screen.getByPlaceholderText('Type your password here'), 'ValidPass1!');
        fireEvent.changeText(screen.getByPlaceholderText('Confirm your password here'), 'ValidPass1!');
        fireEvent.press(screen.getByText('Submit'));
        expect(Alert.alert).toHaveBeenCalledWith("Validation Result", "Username cannot be empty.")
    });
    it('has secure text entry for password field', () => {
        render(<Register />);
        expect(screen.getByPlaceholderText('Type your password here')).toHaveProp('secureTextEntry', true);
    });
    it('has secure text entry for password confirmation field', () => {
        render(<Register />);
        expect(screen.getByPlaceholderText('Confirm your password here')).toHaveProp('secureTextEntry', true);
    });
    it('has correct keyboard type for email field', () => {
        render(<Register />);
        expect(screen.getByPlaceholderText('Type your email here')).toHaveProp('keyboardType', 'email-address');
    });

    describe('Email validation', () => {
        it('accepts valid email formats', async () => {
            render(<Register />);
            fireEvent.changeText(screen.getByPlaceholderText('Type your password here'), 'ValidPass1!');
            fireEvent.changeText(screen.getByPlaceholderText('Type your username here'), 'ValidUser');
            fireEvent.changeText(screen.getByPlaceholderText('Confirm your password here'), 'ValidPass1!');
            fireEvent.changeText(screen.getByPlaceholderText('Type your email here'), 'valid@valid.email');
            fireEvent.press(screen.getByText('Submit'));
            await waitFor(() => {
                expect(mockPush).toHaveBeenCalledWith({ pathname: "./index" });
            });
        });
        it('rejects invalid email formats', () => {
            render(<Register />);
            fireEvent.changeText(screen.getByPlaceholderText('Type your password here'), 'ValidPass1!');
            fireEvent.changeText(screen.getByPlaceholderText('Type your username here'), 'ValidUser');
            fireEvent.changeText(screen.getByPlaceholderText('Confirm your password here'), 'ValidPass1!');
            fireEvent.changeText(screen.getByPlaceholderText('Type your email here'), 'invalid@invalid');
            fireEvent.press(screen.getByText('Submit'));
            expect(Alert.alert).toHaveBeenCalledWith("Validation Result", 'Invalid email format.');
        });
    });

    describe('Password Validation', () => {
        it('accepts matching passwords', async () => {
            render(<Register />);
            fireEvent.changeText(screen.getByPlaceholderText('Type your password here'), 'ValidPass1!');
            fireEvent.changeText(screen.getByPlaceholderText('Confirm your password here'), 'ValidPass1!');
            fireEvent.changeText(screen.getByPlaceholderText('Type your username here'), 'ValidUser');
            fireEvent.changeText(screen.getByPlaceholderText('Type your email here'), 'valid@valid.email');
            fireEvent.press(screen.getByText('Submit'));
            await waitFor(() => {
                expect(mockPush).toHaveBeenCalledWith({ pathname: "./index" });
            });
        });
        it('rejects non-matching passwords', () => {
            render(<Register />);
            fireEvent.changeText(screen.getByPlaceholderText('Type your password here'), 'ValidPass1!');
            fireEvent.changeText(screen.getByPlaceholderText('Confirm your password here'), 'DifferentPass1!');
            fireEvent.changeText(screen.getByPlaceholderText('Type your username here'), 'ValidUser');
            fireEvent.changeText(screen.getByPlaceholderText('Type your email here'), 'valid@valid.email');
            fireEvent.press(screen.getByText('Submit'));
            expect(Alert.alert).toHaveBeenCalledWith("Validation Result", 'Passwords do not match.');
        });
        it('accepts valid passwords formats', async () => {
            render(<Register />);
            fireEvent.changeText(screen.getByPlaceholderText('Type your password here'), 'ValidPass1!');
            fireEvent.changeText(screen.getByPlaceholderText('Confirm your password here'), 'ValidPass1!');
            fireEvent.changeText(screen.getByPlaceholderText('Type your username here'), 'ValidUser');
            fireEvent.changeText(screen.getByPlaceholderText('Type your email here'), 'valid@valid.email');
            fireEvent.press(screen.getByText('Submit'));
            await waitFor(() => {
                expect(mockPush).toHaveBeenCalledWith({ pathname: "./index" });
            });
        });
        it('rejects passwords without uppercase', () => {
            render(<Register />);
            fireEvent.changeText(screen.getByPlaceholderText('Type your password here'), 'nouppercase!');
            fireEvent.changeText(screen.getByPlaceholderText('Confirm your password here'), 'nouppercase!');
            fireEvent.changeText(screen.getByPlaceholderText('Type your username here'), 'ValidUser');
            fireEvent.changeText(screen.getByPlaceholderText('Type your email here'), 'valid@valid.email');
            fireEvent.press(screen.getByText('Submit'));
            expect(Alert.alert).toHaveBeenCalledWith("Validation Result", 'Password must contain at least one uppercase letter.');
        });
        it('rejects passwords without lowercase', () => {
            render(<Register />);
            fireEvent.changeText(screen.getByPlaceholderText('Type your password here'), 'NOLOWERCASE!');
            fireEvent.changeText(screen.getByPlaceholderText('Confirm your password here'), 'NOLOWERCASE!');
            fireEvent.changeText(screen.getByPlaceholderText('Type your username here'), 'ValidUser');
            fireEvent.changeText(screen.getByPlaceholderText('Type your email here'), 'valid@valid.email');
            fireEvent.press(screen.getByText('Submit'));
            expect(Alert.alert).toHaveBeenCalledWith("Validation Result", 'Password must contain at least one lowercase letter.');
        });
        it('rejects passwords without special characters', () => {
            render(<Register />);
            fireEvent.changeText(screen.getByPlaceholderText('Type your password here'), 'NoSpecialCharacters');
            fireEvent.changeText(screen.getByPlaceholderText('Confirm your password here'), 'NoSpecialCharacters');
            fireEvent.changeText(screen.getByPlaceholderText('Type your username here'), 'ValidUser');
            fireEvent.changeText(screen.getByPlaceholderText('Type your email here'), 'valid@valid.email');
            fireEvent.press(screen.getByText('Submit'));
            expect(Alert.alert).toHaveBeenCalledWith("Validation Result", 'Password must contain at least one special character.');
        });
        it('rejects passwords shorter than 8 characters', () => {
            render(<Register />);
            fireEvent.changeText(screen.getByPlaceholderText('Type your password here'), 'Short!');
            fireEvent.changeText(screen.getByPlaceholderText('Confirm your password here'), 'Short!');
            fireEvent.changeText(screen.getByPlaceholderText('Type your username here'), 'ValidUser');
            fireEvent.changeText(screen.getByPlaceholderText('Type your email here'), 'valid@valid.email');
            fireEvent.press(screen.getByText('Submit'));
            expect(Alert.alert).toHaveBeenCalledWith("Validation Result", 'Password must be at least 8 characters long.');
        });
        it('rejects passwords with only numbers and special characters', () => {
            render(<Register />);
            fireEvent.changeText(screen.getByPlaceholderText('Type your email here'), 'valid@valid.email');
            fireEvent.changeText(screen.getByPlaceholderText('Type your password here'), '1234567!');
            fireEvent.changeText(screen.getByPlaceholderText('Confirm your password here'), '1234567!');
            fireEvent.changeText(screen.getByPlaceholderText('Type your username here'), 'ValidUser');
            fireEvent.press(screen.getByText('Submit'));
            expect(Alert.alert).toHaveBeenCalledWith("Validation Result", 'Password must contain at least one uppercase letter.\nPassword must contain at least one lowercase letter.\nPassword must contain at least one letter.');
        });
    })
});