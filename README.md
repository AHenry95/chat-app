# Chat App

A real-time React Native chat application built with with Expo, Firebase, and React Native.

## Features
- Real-time messaging
- Anonymous authentication
- Image sharing from the camera or device image library (with user permission)
- Location sharing
- Offline message caching
- Custom background colors (From a suite of provided options)

## Prerequisites
- **Node.js** (v18 or later)
- **npm**
- **Expo Go** (can be downloaded on mobile devices from iOS App Store or Google Play Store)

## Devlopment Environment Setup

### 1. Install Expo CLI
```bash
npm install -g expo-cli
```

### 2. Clone the Repository
```bash
git clone https://github.com/AHenry95/chat-app/
cd chat-app
```

### 3. Install Dependencies
```bash
npm install
```

Please note that due to some compatability issues with Expo/Expo Go many dependencies currently included in this project are not included in the mot up-to-date version.

## Database Configuration 

### Setting Up Firebase

#### 1. Create a Firebase Project
- Go to [Firebase Console] (https://console.firebase.google.com)
- Sign in with a Google account
- Click "Get started by setting up a Firebase project" and follow the setup instrutions
  - Give the project a name
  - Accept the terms
  - Accpet/Decline Google's offerings (Gemini, Google Analytics, etc.) at your discretion
  - Create Project
- The project may automatically open, if not, open the new project  

#### 2. Enable Firestore Database
- In your Firebase Project, open the **Build** dropdown on the left side of the page, and select **Firestore Database**
- Click "Create database"
- Select "Standard edition"
- Pick the location where you would like your data to be stored from the dropdown
- Select "Start in production mode"
- Click **Create**
- Under the **Database** heading, click **Rules**
- In line 6 of the provided rules, change ```if false``` to ```if true```
- Click **Publish**

#### 3. Enable Firebase Storage
- Once again open the **Build** dropdown, and this time click **Storage**
- To use storage you will need to setup a blaze account and like a Google billing account. There is no need to actually pay anything up front for the service needed for this project. Follow the instruction provided by Google to set this up.
- Once the payment account is set up, click "Get started"
- Select the preferred data storage loction from either the "No cost location" or "All locations" dropdowns
- Select "Start in production mode"
- Under the **Storage** heading, click **Rules**
- In line 6 of the provided rules, change `if false` to `if true`
- Click **Publish**

#### 4. Enable Anonymous Authentication
- Once again open the **Build** dropdown, and this time click **Authentication**
- Click "Get Started"
- Under "Native providers", click **Anonymous**
- Enable Anonymous Authentication and click Save

#### 5. Get Your Firebase Configuration
- Click the gear icon next to "Project Overview" on the left side of the page, and click "Project settings"
- Scroll down to the "Your apps" section
- Click the web icon "</>"
- In the window that opens, give your app a name and click "Register App"
- Copy the `firebaseConfig` object
- In the projects App.js file, replace the `firebaseConfig` object with the one copied:
```javascript
const firebaseConfig = {
  apiKey: " YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appID: "YOUR_ADD_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
};
```

## Required Libraries 

All necessary dependencies listed in `package.json, and their purpose.
| Library | Purpose |
|---------|---------|
|`@react-navigation/native`| Navigation Framework |
|`@react-navigation/native-stack`| Stack navigator |
|`firebase`| Backend services (Firestore, data storage, authentication) |
|`react-native-gifted-chat`| Chat UI components |
|`@react-native-async-storage`| Offline message storage |
|`@react-native-community.netinfo`| Network connectivity monitoring |
|`expo-image-picker`| Camera and image library access |
|`expo-location`| Location services |
|`expo-media-library`| Saving photos to device |
|`react-native-maps`| Map display for location messages |

Each of these are automatically installed when `npm install` is run.

## Running the Application 

### Start the Development Server
```bash
npm start
```

Or
```bash
npx expo start
```

### Run the App on Your Device

#### Option 1: Using Expo Go

1. Install the **Expo Go** app on your iOS or Android device
2. Scan the QR code displayed in the terminal
3. The app will load in the **Expo Go** app

#### Option 2: Using an Emulator/Simulator

- **Android**: Press 'a' in the terminal, or click "Run on Android device/emulator"
- **iOS** (Mac only): Press 'i' in the terminal or click "Run on iOS" simulator

## How to Use the App

1. **Start Screen**: Enter your name for messaging, and choose a background color
2. **Start Chatting**: Tap the "Start Chatting" button to switch to the chat screen
3. **Send Messages**: Type messages in the input field and press send
4. **Send Images**: Tap the `+` button to choose images from the library or take a photo to be sent in the chat (user permission needed to access library or camera)
5. **Share Location**: Tap the `+` button and select "Send Location" (user permission needed to access location)
6. **Offline Mode**: Messages are cached locally and cached messages are displayed if app is not connected to internet.
 
