import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {RealmProvider} from '@realm/react';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {User, Address, Company, GeoLocation} from './src/realm/table';
import {onMigration} from './src/realm/migatrions';
import {QueryClientProvider, QueryClient} from '@tanstack/react-query';
import {DevToolsBubble} from 'react-native-react-query-devtools';
import {ReactQuery} from './src/components/ReactQuery';
const queryClient = new QueryClient();

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <QueryClientProvider client={queryClient}>
      <RealmProvider
        schema={[User, GeoLocation, Company, Address]}
        onMigration={onMigration}
        schemaVersion={4}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        {/* <Home /> */}
        <ReactQuery />
      </RealmProvider>
      <DevToolsBubble />
    </QueryClientProvider>
  );
}

export default App;
