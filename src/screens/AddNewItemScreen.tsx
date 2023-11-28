import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, TouchableOpacity, Image, Text } from 'react-native';
import { launchImageLibrary, ImagePickerResponse } from 'react-native-image-picker';
import { nanoid } from 'nanoid/non-secure';

interface AddItemScreenProps {
    navigation: any;
    route: any;
}

const AddNewItemScreen: React.FC<AddItemScreenProps> = ({ navigation, route }) => {
    const [newItem, setNewItem] = useState({
        id: nanoid(),
        user: {
            name: '',
            bio: '',
        },
        urls: {
            regular: '',
        },
    });

    const onAddItem = route.params?.onAddItem;

    const handleAddItem = () => {
        if (onAddItem && newItem.id && newItem.user.name && newItem.user.bio && newItem.urls.regular) {
            onAddItem(newItem);
            setNewItem({
                id: nanoid(),
                user: {
                    name: '',
                    bio: '',
                },
                urls: {
                    regular: '',
                },
            });
            navigation.goBack();
        }
    };

    const handleImagePicker = async () => {
        try {
            const response: ImagePickerResponse = await new Promise((resolve, reject) => {
                launchImageLibrary({ mediaType: 'photo' }, (response) => {
                    if (response) {
                        resolve(response);
                    } else {
                        reject('Image picker response is undefined');
                    }
                });
            });

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorMessage) {
                console.log('ImagePicker Error: ', response.errorMessage);
            } else if (response.didCancel) {
                console.log('User cancelled image picker');
            } else {
                setNewItem((prev) => ({ ...prev, urls: { ...prev.urls, regular: response.assets?.[0]?.uri || '' } }))
            }
        } catch (error) {
            console.error('Error in handleImagePicker:', error);
        }
    };

    const isAddButtonDisabled = !(newItem.user.name && newItem.user.bio && newItem.urls.regular);

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="User Name"
                value={newItem.user.name}
                onChangeText={(text) => setNewItem((prev) => ({ ...prev, user: { ...prev.user, name: text } }))}
            />
            <TextInput
                style={styles.input}
                placeholder="User Bio"
                value={newItem.user.bio}
                onChangeText={(text) => setNewItem((prev) => ({ ...prev, user: { ...prev.user, bio: text } }))}
            />
            {newItem.urls.regular ? (
                <Image source={{ uri: newItem.urls.regular }} style={styles.image} />
            ) : (
                <TouchableOpacity style={styles.imagePicker} onPress={handleImagePicker}>
                    <Text>Pick an Image</Text>
                </TouchableOpacity>
            )}
            <Button title="Add Item"
                    onPress={handleAddItem}
                    disabled={isAddButtonDisabled}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
        borderRadius: 8,
    },
    image: {
        width: '100%',
        height: 200,
        marginBottom: 10,
        resizeMode: 'cover',
        borderRadius: 8,
    },
    imagePicker: {
        width: '100%',
        height: 200,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eee',
        borderRadius: 8,
    },
});

export default AddNewItemScreen;
