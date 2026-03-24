/**
 * Argon - Task Organizer App
 * CIE-2 : Mobile Application Development
 */

import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeScreen from './src/screens/HomeScreen';
import CreateAccountScreen from './src/screens/CreateAccountScreen';

type Screen = 'Home' | 'CreateAccount';

function App(): React.JSX.Element {
  const [currentScreen, setCurrentScreen] = useState<Screen>('Home');

  return (
    <SafeAreaProvider>
      {currentScreen === 'Home' ? (
        <HomeScreen onGetStarted={() => setCurrentScreen('CreateAccount')} />
      ) : (
        <CreateAccountScreen onBack={() => setCurrentScreen('Home')} />
      )}
    </SafeAreaProvider>
  );
}

export default App;
