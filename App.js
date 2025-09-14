import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Start from './components/Start';
import Chat from './components/Chat';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const Stack = createNativeStackNavigator();

const App = () => {
  
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

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat" >
          {props => <Chat db={db} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
