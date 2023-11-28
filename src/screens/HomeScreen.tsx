import React, { useState, useEffect } from 'react';
import { FlatList, SafeAreaView, View, Button, ActivityIndicator, Text, StyleSheet } from 'react-native';

import ListItem from '../screens/ListItem';
import { Item } from '../interfaces/Item';


const mockApiUrl = 'https://api.unsplash.com/search/photos?page=1&query=cat&client_id=9xqZ9lUmthQleB0eoOh3sOK2P0ZH8VIdkEBlihGayCw&per_page=20';

const fetchMockData = async () => {
    try {
        const response = await fetch(mockApiUrl);
        const data = await response.json();
        return data.results;
    } catch (error) {
        throw new Error('Error fetching data from the API');
    }
};

const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
    const [items, setItems] = useState<Item[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchMockData()
            .then((data) => {
                setItems(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
        navigation.setOptions({});
    }, []);

    const addItem = (newItem: Item) => {
        setItems((prevItems) => [
            ...prevItems,
            {
                id: (prevItems.length + 1).toString(),
                ...newItem,
            },
        ]);
    };

    const removeItem = (id: string) => {
        setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <Button
                    title="Add New Item"
                    onPress={() => navigation.navigate('AddItem', { onAddItem: addItem })}
                />
            </View>
            {loading ? (
                <ActivityIndicator testID={'loading-indicator'} size="large" color="#000" style={styles.indicator} />
            ) : error ? (
                <View style={styles.view}>
                    <Text>Error: {error}</Text>
                </View>
            ) : (
                <FlatList
                    data={items}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <ListItem
                            name={item.user.name}
                            navigation={navigation}
                            description={item.user.bio}
                            imageSource={item.urls.regular}
                        >
                            <Button title="Remove" onPress={() => removeItem(item.id)} />
                        </ListItem>
                    )}
                />
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        padding: 16,
    },
    view: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    indicator: {
        flex: 1,
        justifyContent: 'center',
    },
});

export default HomeScreen;

