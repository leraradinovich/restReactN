import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';

const DetailScreen: React.FC<{ route: any }> = ({ route }) => {
    const { name, description, imageSource } = route.params;

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Image style={styles.image} source={{ uri: imageSource }} />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.description}>{description}</Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    image: {
        width: '100%',
        height: 200,
        marginBottom: 16,
        marginTop: 16,
    },
    textContainer: {
        paddingLeft: 16,
        paddingRight: 16,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    description: {
        fontSize: 16,
        color: '#666',
    },
});

export default DetailScreen;
