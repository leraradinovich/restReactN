import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

interface ListItemProps {
    id: string;
    title: string;
    description: string;
    imageSource: string;
    navigation: any;
}

const ListItem: React.FC<ListItemProps> = React.memo(({ name, description, imageSource, navigation, children }) => {
    const navigateToDetails = (name: string, description: string, imageSource: string ) => {
        navigation.navigate('Detail', { name, description, imageSource });
    };

    return (
        <TouchableOpacity testID={'item-touchable'} onPress={() => navigateToDetails(name, description, imageSource )} style={styles.container}>
            <View style={styles.contentContainer}>
                <Image testID={'item-image'} style={styles.image} source={{ uri: imageSource }} />
                <View style={styles.textContainer}>
                    <Text style={styles.name}>{name}</Text>
                </View>
            </View>
            <View style={styles.buttonContainer}>{children}</View>
        </TouchableOpacity>
    );
});

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    image: {
        width: 80,
        height: 80,
        marginRight: 10,
        resizeMode: 'cover',
        borderRadius: 8,
    },
    contentContainer: {
        flexDirection: 'row',
    },
    textContainer: {
        flex: 1,
        flexDirection: 'column',
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 14,
        color: '#666',
    },
    buttonContainer: {
        flex: 1,
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: 'row',
        justifyContent: 'flex-end',
    }
});

export default ListItem;