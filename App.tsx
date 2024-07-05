import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {RealmProvider} from '@realm/react';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {User, Address, Company, GeoLocation} from './src/realm/table';
import {onMigration} from './src/realm/migatrions';
import {QueryClientProvider, QueryClient} from '@tanstack/react-query';
import {DevToolsBubble} from 'react-native-react-query-devtools';
import {ReactQuery} from './src/components/ReactQuery';
import {NavigationContainer} from '@react-navigation/native';
import {Home} from './src/components/Home';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: Infinity,
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 10 * 60 * 60000,
    },
  },
});

export type RootStackParamList = {
  Home: undefined;
  ReactQuery: {id: number};
};

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <RealmProvider
      schema={[User, GeoLocation, Company, Address]}
      onMigration={onMigration}
      schemaVersion={4}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="ReactQuery" component={ReactQuery} />
          </Stack.Navigator>
          <DevToolsBubble />
        </NavigationContainer>
      </QueryClientProvider>
    </RealmProvider>
  );
}

export default App;
