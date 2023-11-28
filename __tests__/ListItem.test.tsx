import 'react-native';
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import ListItem from '../src/screens/ListItem';

const mockNavigation = {
    navigate: jest.fn(),
};

const mockItem = {
    id: '1',
    name: 'Kitty Kat',
    description: 'Purr Purr',
    imageSource: 'https://example.com/cat.jpg',
    children: null
};

test('renders ListItem with correct content', () => {
    const { getByText, getByTestId } = render(<ListItem {...mockItem} navigation={mockNavigation} />);

    expect(getByText('Kitty Kat')).toBeDefined();
});

test('navigates to details screen when pressed', () => {
    const { getByTestId } = render(<ListItem {...mockItem} navigation={mockNavigation} />);

    fireEvent.press(getByTestId('item-touchable'));

    expect(mockNavigation.navigate).toHaveBeenCalledWith('Detail', {
        name: 'Kitty Kat',
        description: 'Purr Purr',
        imageSource: 'https://example.com/cat.jpg',
    });
});
