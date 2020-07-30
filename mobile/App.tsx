import { StatusBar } from 'react-native'
import React from 'react';
import Home from './src/pages/Home'
import { AppLoading } from 'expo'
import Routes from './src/route'

import { Roboto_400Regular, Roboto_500Medium } from '@expo-google-fonts/roboto'
import { Ubuntu_700Bold, useFonts } from '@expo-google-fonts/ubuntu'

export default function App() {
  const [fontsLoads] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Ubuntu_700Bold
  })

  if(!fontsLoads){
    return <AppLoading/>
  }

  return (
    <>
      <StatusBar barStyle='dark-content' backgroundColor='transparent' translucent/>
      <Routes/>
   </>
  );
}