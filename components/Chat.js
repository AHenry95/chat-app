import { useEffect, useState } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { getDocs, collection, addDoc, onSnapshot, query, orderBy } from 'firebase/firestore';

const Chat = ({ route, navigation, db }) => {
    const [messages, setMessages] = useState([]);
    const { name, backgroundColor, userID } = route.params;

    const onSend = (newMessages) => {
        addDoc(collection(db, 'messages'), newMessages[0]);
    };

    useEffect(() => {
        navigation.setOptions({ title: name });
        const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
        const unsubMessages = onSnapshot(q, (docs) => {
            let newMessages = [];
            docs.forEach(doc => {
                newMessages.push({ 
                    _id: doc.id, 
                    ... doc.data( ),
                    createdAt: new Date(doc.data().createdAt.toMillis())
                })
            });
            setMessages(newMessages)
        });

        return () => {
            if (unsubMessages) unsubMessages();
        }
    }, []);

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

    return (
        <View style={[styles.container, { backgroundColor: backgroundColor }]}>
            <GiftedChat
                messages={messages}
                renderBubble={renderBubble}
                onSend={messages => onSend(messages)}
                user={{
                    _id: userID,
                    name: name
                }}
            />
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