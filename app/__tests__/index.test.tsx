import * as React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import { Alert } from 'react-native';
import Index from '../index';

jest.spyOn(Alert, 'alert');

describe('Index Screen', () => {
    it('renders correctly', () => {
        render(<Index />);
        expect(screen.getByTestId('image')).toBeTruthy();
        expect(screen.getByPlaceholderText('Type your email here')).toBeTruthy();
        expect(screen.getByPlaceholderText('Type your password here')).toBeTruthy();
        expect(screen.getByText('Submit')).toBeTruthy();
    });
    it('shows alert when fields are empty', () => {
        render(<Index />);
        fireEvent.press(screen.getByText('Submit'));
        expect(Alert.alert).toHaveBeenCalledWith("Validation Result", 'Email and Password cannot be empty.');
    });
    it('shows alert when only email is empty', () => {
        render(<Index />);
        fireEvent.changeText(screen.getByPlaceholderText('Type your password here'), 'ValidPass1!');
        fireEvent.press(screen.getByText('Submit'));
        expect(Alert.alert).toHaveBeenCalledWith("Validation Result", 'Email cannot be empty.');
    });
    it('shows alert when only password is empty', () => {
        render(<Index />);
        fireEvent.changeText(screen.getByPlaceholderText('Type your email here'), 'correo@correo.com');
        fireEvent.press(screen.getByText('Submit'));
        expect(Alert.alert).toHaveBeenCalledWith("Validation Result", "Password cannot be empty.")
    });
    it('has secure text entry for password field', () => {
        render(<Index />);
        expect(screen.getByPlaceholderText('Type your password here')).toHaveProp('secureTextEntry', true);
    });
    it('has correct keyboard type for email field', () => {
        render(<Index />);
        expect(screen.getByPlaceholderText('Type your email here')).toHaveProp('keyboardType', 'email-address');
    });

    describe('Email validation', () => {
        it('accepts valid email formats', () => {
            render(<Index />);
            fireEvent.changeText(screen.getByPlaceholderText('Type your password here'), 'ValidPass1!');
            fireEvent.changeText(screen.getByPlaceholderText('Type your email here'), 'valid@valid.email');
            fireEvent.press(screen.getByText('Submit'));
            expect(Alert.alert).toHaveBeenCalledWith("Validation Result", 'Success!.');
        });
        it('rejects invalid email formats', () => {
            render(<Index />);
            fireEvent.changeText(screen.getByPlaceholderText('Type your password here'), 'ValidPass1!');
            fireEvent.changeText(screen.getByPlaceholderText('Type your email here'), 'invalid@invalid');
            fireEvent.press(screen.getByText('Submit'));
            expect(Alert.alert).toHaveBeenCalledWith("Validation Result", 'Invalid email format.');
        });
    });

    describe('Password Validation', () => {
        it('accepts valid passwords formats', () => {
            render(<Index />);
            fireEvent.changeText(screen.getByPlaceholderText('Type your password here'), 'ValidPass1!');
            fireEvent.changeText(screen.getByPlaceholderText('Type your email here'), 'valid@valid.email');
            fireEvent.press(screen.getByText('Submit'));
            expect(Alert.alert).toHaveBeenCalledWith("Validation Result", 'Success!.');
        });
        it('rejects passwords without uppercase', () => {
            render(<Index />);
            fireEvent.changeText(screen.getByPlaceholderText('Type your password here'), 'nouppercase!');
            fireEvent.changeText(screen.getByPlaceholderText('Type your email here'), 'valid@valid.email');
            fireEvent.press(screen.getByText('Submit'));
            expect(Alert.alert).toHaveBeenCalledWith("Validation Result", 'Password must contain at least one uppercase letter.');
        });
        it('rejects passwords without lowercase', () => {
            render(<Index />);
            fireEvent.changeText(screen.getByPlaceholderText('Type your password here'), 'NOLOWERCASE!');
            fireEvent.changeText(screen.getByPlaceholderText('Type your email here'), 'valid@valid.email');
            fireEvent.press(screen.getByText('Submit'));
            expect(Alert.alert).toHaveBeenCalledWith("Validation Result", 'Password must contain at least one lowercase letter.');
        });
        it('rejects passwords without special characters', () => {
            render(<Index />);
            fireEvent.changeText(screen.getByPlaceholderText('Type your password here'), 'NoSpecialCharacters');
            fireEvent.changeText(screen.getByPlaceholderText('Type your email here'), 'valid@valid.email');
            fireEvent.press(screen.getByText('Submit'));
            expect(Alert.alert).toHaveBeenCalledWith("Validation Result", 'Password must contain at least one special character.');
        });
        it('rejects passwords shorter than 8 characters', () => {
            render(<Index />);
            fireEvent.changeText(screen.getByPlaceholderText('Type your password here'), 'Short!');
            fireEvent.changeText(screen.getByPlaceholderText('Type your email here'), 'valid@valid.email');
            fireEvent.press(screen.getByText('Submit'));
            expect(Alert.alert).toHaveBeenCalledWith("Validation Result", 'Password must be at least 8 characters long.');
        });
        it('rejects passwords with only numbers and special characters', () => {
            render(<Index />);
            fireEvent.changeText(screen.getByPlaceholderText('Type your email here'), 'valid@valid.email');
            fireEvent.changeText(screen.getByPlaceholderText('Type your password here'), '1234567!');
            fireEvent.press(screen.getByText('Submit'));
            expect(Alert.alert).toHaveBeenCalledWith("Validation Result", 'Password must contain at least one uppercase letter.\nPassword must contain at least one lowercase letter.\nPassword must contain at least one letter.');
        });
    })
});


