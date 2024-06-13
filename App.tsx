import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import {RealmProvider} from '@realm/react';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {User, Address, Company, GeoLocation} from './src/realm/table';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <RealmProvider schema={[User, GeoLocation, Company, Address]}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
      </RealmProvider>
    </SafeAreaView>
  );
}

export default App;
