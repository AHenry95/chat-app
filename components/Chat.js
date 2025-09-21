import { useEffect, useState } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import MapView from 'react-native-maps';
import { collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomActions from './CustomActions';

/**
 * Chat screen where users can send and receive messages
 * 
 * @param {Object} route - Navigation route object containing passed parameters
 * @param {Object} navigation - Navigation object for screen transitions
 * @param {Object} db - Firestore database
 * @param {boolean} isConnected - Network connection status 
 */

const Chat = ({ route, navigation, db, isConnected, storage }) => {
    // State to hold all chat messages
    const [messages, setMessages] = useState([]);

    // Data passed from the Start screen
    const { name, backgroundColor, userID } = route.params;

    /**
     * Adds new messages to Firestore message database
     * @param {Array} newMessages - Array of new message objects from GiftedChat
     */
    const onSend = (newMessages) => {
        addDoc(collection(db, 'messages'), newMessages[0]);
    };

    // Variable for storing the unsubscribe function for the Firestore listener
    let unsubMessages;

    // Function that handles real-time message loading, as well as offline caches
    useEffect(() => {
        // Condition checks for connection to the internet
        if (isConnected === true) {

            // Clears existing listener to prevent memory leak
            if(unsubMessages) unsubMessages();
            unsubMessages = null;

            // Sets the navigation header to the entered username on from the Start screen
            navigation.setOptions({ title: name });

            // Creates a query to get messages from the database, ordered by creation time (newest first)
            const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));

            // Sets up a real-time listener for updates to the message database
            unsubMessages = onSnapshot(q, (docs) => {
                let newMessages = [];
                docs.forEach(doc => {
                    newMessages.push({ 
                        _id: doc.id, 
                        ... doc.data(),
                        createdAt: new Date(doc.data().createdAt.toMillis())
                    })
                });

                //Caches loaded messages for offline use
                cacheMessages(newMessages);

                // Updates the message state with the messages pulled from the updated databse 
                setMessages(newMessages);
            });
        // Loads messages from the local cache if there is no active internet connection
        } else loadCachedMessages();

        // Cleanup function to unsubscribe from the Firestore listener when the component unmounts
        return () => {
            if (unsubMessages) unsubMessages();
        }
    }, [isConnected]);

      /**
     * Caches messages to AsyncStorage for offline access
     * @param {Array} messagesToCache - Array of message objects to store locally
     */
    const cacheMessages = async (messagesToCache) => {
        try {
            await AsyncStorage.setItem('messages', JSON.stringify(messagesToCache));
        } catch(error) {
            console.log(error);
        }
    }

    /**
    * Loads the messages saved to the local cache by AsyncStorage, or a blank array if the messages item does not exist
    */ 
    const loadCachedMessages = async () => {
        const cachedMessages = await AsyncStorage.getItem('messages') || [];
        setMessages(JSON.parse(cachedMessages));
    };
    
    /**
     * Custom bubble renderer for chat messages
     * Customizes the appearance of message bubbles
     * @param {Object} props - Props passed from GiftedChat
     */
    const renderBubble = (props) => {
        return (
            <Bubble 
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: '#007AFF'
                    },
                    left: {
                        backgroundColor: '#FFF'
                    }
                }}
            />
        );
    };

     /**
     * Custom input toolbar renderer
     * Shows input only when connected to prevent sending messages while offline
     * @param {Object} props - Props passed from GiftedChat
     */
    const renderInputToolbar = (props) => {
        if (isConnected) return <InputToolbar {...props} />;
        else return null;
    };

    const renderCustomActions = (props) => {
        return <CustomActions 
            storage={storage}
            userID={userID}
            onSend={onSend}
            {...props} />;
    }

    const renderCustomView = (props) => {
        const {currentMessage} = props;
        if (currentMessage.location) {
            return (
                <MapView
                    style={{
                        width: 150,
                        height: 100,
                        borderRadius: 13,
                        margin: 3
                    }}
                    region={{
                        latitude: currentMessage.location.latitude,
                        longitude: currentMessage.location.longitude,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421
                    }}
                />
            );
        }
        return null;
    }

    return (
        <View style={[styles.container, { backgroundColor: backgroundColor }]}>
            <GiftedChat
                messages={messages}
                renderBubble={renderBubble}
                renderInputToolbar={renderInputToolbar}
                onSend={messages => onSend(messages)}
                renderActions={renderCustomActions}
                renderCustomView={renderCustomView}
                user={{
                    _id: userID,
                    name: name
                }}
            />
            {/* Prevents keyboard from covering text input area on Android devices */}
            { Platform.OS === 'android' 
                ? <KeyboardAvoidingView behavior="height" />
                : null
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default Chat;