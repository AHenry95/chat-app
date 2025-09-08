import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, TextInput, ImageBackground, TouchableOpacity } from 'react-native';

const Start = ({ navigation }) => {
    const [name, setName] = useState('');
    const [selectedColor, setSelectedColor] = useState();

    const colorOptions = ['#090C08', '#474056', '#8A95A5', '#B9C6AE'];

    useEffect(() => {
        navigation.setOptions({ headerShown:  false })
    }, []);

    return (
        <ImageBackground 
            source={require("../assets/Background_Image.png")}
            style={styles.backgroundImage}
            resizeMode="cover"
        >
            <Text style={styles.title}>Chat App</Text>
            <View style={styles.innerContainer}>
                <TextInput 
                    style={styles.textInput}
                    value={name}
                    onChangeText={setName}
                    placeholder="Your name"
                />
                <View style={styles.colorContainer}>
                    <Text style={styles.colorText}>Choose Background Color:</Text>
                    <View style={styles.colorButtonContainer}>
                            {colorOptions.map((color, index) => (
                                <TouchableOpacity 
                                    key={`color-button__${color}`}
                                    style={[
                                        styles.colorButtons,
                                        { backgroundColor: color },
                                        selectedColor === color && {
                                            borderWidth: 2,
                                            borderColor: '#757083',
                                            padding: 3
                                        }
                                    ]}
                                    onPress={() => setSelectedColor(color)}
                                />              
                            ))}
                    </View>
                </View>
                <View style={styles.chatButtonContainer}>
                    <TouchableOpacity
                        style={styles.chatButton}
                        onPress={() => navigation.navigate('Chat', { 
                            name: name,
                            backgroundColor: selectedColor 
                        })}
                    >
                        <Text style={styles.chatButtonText}>Start Chatting</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground> 
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    title: {
        fontSize: 45,
        fontWeight: '600',
        color: '#ffffff',
    },
    textInput: {
        width: '88%',
        padding: 15,
        borderWidth: 1,
        marginTop: 30,
        marginBottom: 15,
        fontSize: 16,
        fontWeight: '300',
        color: '#757083',
        opacity: 1
    },
    innerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '88%',
        height: '44%',
        backgroundColor: '#ffffff'
    },
    colorContainer: {
        flex: 5,
        width: '88%',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    colorText: {
        fontSize: 16,
        fontWeight: '300',
        color: '#757083',
        opacity: 1,
        marginBottom: 20
    },
    colorButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
    }, 
    colorButtons: {
        width: 50,
        height: 50,
        borderRadius: 25
    },
    chatButtonContainer: {
        flex: 3,
        width: '88%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    chatButton: {
        padding: 20,
        backgroundColor: '#757083',
        width: '100%'
    },
    chatButtonText: {
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
        color: '#ffffff'
    }
});

export default Start;