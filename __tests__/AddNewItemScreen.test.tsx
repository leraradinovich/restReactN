import 'react-native';
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import AddNewItemScreen from '../src/screens/AddNewItemScreen';

jest.mock('react-native-image-picker', () => ({
    launchImageLibrary: jest.fn(),
}));

const mockNavigation = {
    navigate: jest.fn(),
    goBack: jest.fn(),
};

const mockRoute = {
    params: {
        onAddItem: jest.fn(),
    },
};

describe('AddNewItemScreen', () => {
    it('renders correctly', () => {
        const { getByPlaceholderText, getByText } = render(
            <AddNewItemScreen navigation={mockNavigation} route={mockRoute} />
        );

        expect(getByPlaceholderText('User Name')).toBeDefined();
        expect(getByPlaceholderText('User Bio')).toBeDefined();
        expect(getByText('Pick an Image')).toBeDefined();
        expect(getByText('Add Item')).toBeDefined();
    });

    it('handles text input changes', () => {
        const { getByPlaceholderText } = render(
            <AddNewItemScreen navigation={mockNavigation} route={mockRoute} />
        );

        fireEvent.changeText(getByPlaceholderText('User Name'), 'Kitty Kat');
        fireEvent.changeText(getByPlaceholderText('User Bio'), 'Meow');

    });

    describe('AddNewItemScreen', () => {
        it('handles image picker', async () => {
            const mockImagePickerResponse = {
                didCancel: false,
                errorMessage: null,
                assets: [{uri: 'https://example.com/cat.jpg'}],
            };

            require('react-native-image-picker').launchImageLibrary.mockImplementation(
                (options, callback) => {
                    callback(mockImagePickerResponse);
                }
            );

            const {getByText} = render(
                <AddNewItemScreen navigation={mockNavigation} route={mockRoute}/>
            );

            fireEvent.press(getByText('Pick an Image'));

            await waitFor(() => {
                expect(require('react-native-image-picker').launchImageLibrary).toHaveBeenCalled();
            });

            require('react-native-image-picker').launchImageLibrary.mockReset();
        });
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });
});
