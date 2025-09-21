import { useEffect } from 'react';
import { Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Start from './components/Start';
import Chat from './components/Chat';
import { initializeApp } from 'firebase/app';
import { getFirestore, disableNetwork, enableNetwork } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { useNetInfo } from '@react-native-community/netinfo';

// Create a stack navigator for handling screen navigation 
const Stack = createNativeStackNavigator();

/**
 * Main App component that handles Firebase initialization, 
 * network monitoring, and navigation setup
 */
const App = () => {
  
  // Firebase configuration object containing project-specific settings
  const firebaseConfig = {
    apiKey: "AIzaSyDrHFr-mxPp7OcbM-g99GYTNu0RSNVpou0",
    authDomain: "chatapp-498b5.firebaseapp.com",
    projectId: "chatapp-498b5",
    storageBucket: "chatapp-498b5.firebasestorage.app",
    messagingSenderId: "991839020388",
    appId: "1:991839020388:web:254123d0c3fc8f09744671",
    measurementId: "G-H0FV59NG6L"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  
  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);
  const storage = getStorage(app);

  // Hook to monitor network connectivity status
  const connectionStatus = useNetInfo();

  // Hook to handle network connectivity changes, runs whenever connectionStatus value changes
  useEffect(() => {
    if(connectionStatus.isConnected === false) {
      Alert.alert('Connection lost!');
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  // Render NavigationContainer, which wraps the entire app and enables navigation
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat" >
          {props => <Chat 
            isConnected= {connectionStatus.isConnected} 
            db={db}
            storage={storage} 
            {...props} 
          />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
