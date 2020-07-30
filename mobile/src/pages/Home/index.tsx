import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ImageBackground, Image, Picker } from 'react-native';
import { RectButton } from 'react-native-gesture-handler'
import { Feather as Icon } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios'


interface IBGEUFResponse{
  sigla: string;
}

interface IBGECITYResponse{
  nome: string;
}


const Home = () =>{
  const [ufs,setUfs] = useState<string[]>([])
  const [cities,setCities] = useState<string[]>([])
  const [selectedUf, setSelectedUf] = useState('0')
  const [selectedCity, setSelectedCity] = useState('0')

  const placeholderUf = {
    label: 'Selecione o estado',
    value: null,
    color: 'black'
  };

  const placeholderCity = {
    label: 'Selecione a cidade',
    value: null,
    color: 'black'
  };

  const navigation = useNavigation()

  function handleRouteNavigationToPoints(uf: string, city: string){
    navigation.navigate('Points', {uf: uf, city: city});
  }

  useEffect(()=>{
    axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
    .then(response =>{
        const ufInitials = response.data.map(uf => uf.sigla)

        setUfs(ufInitials)
    })
}, [])

useEffect(()=>{
  axios.get<IBGECITYResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
  .then(response =>{
      const cityName = response.data.map(city => city.nome)

      setCities(cityName)
  })
}, [selectedUf])




    return(
        <ImageBackground 
            source={require('../../assets/home-background.png')} 
            style={styles.container}
            imageStyle={{width: 274, height: 368}}
            >
            
           <View style={styles.main}>
                <Image source={require('../../assets/logo.png')} ></Image>
                <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
                <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente</Text>
           </View>

           <View style={styles.footer}>
               <RectButton style={styles.button} onPress={() => handleRouteNavigationToPoints(selectedUf, selectedCity)}>
                    <View style={styles.buttonIcon}>
                       <Icon name='arrow-right' color='#fff' size={24}></Icon>
                    </View>
                    <Text style={styles.buttonText}>
                        Entrar
                    </Text>
                </RectButton>
           </View >
          
           <View style={styles.selectContainer}>
              <RNPickerSelect  
                placeholder = {placeholderUf}
                onValueChange={(itemValue) => {
                    setSelectedUf(itemValue)
                }}
                value={selectedUf}
                items={ufs.map(item =>{
                return  {label:item, value: item, color: 'black', key: item}
                })}
              />
           </View>

           <View style={styles.selectContainer}>
              <RNPickerSelect
                placeholder = {placeholderCity}
                onValueChange={(itemValue) => {
                  setSelectedCity(itemValue)
              }}
                items={cities.map(item =>{
                return  {label:item, value: item, color: 'black'}
                })}
              />
           </View>
        </ImageBackground>
    )
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 32,
    },
  
    main: {
      flex: 1,
      justifyContent: 'center',
    },
  
    title: {
      color: '#322153',
      fontSize: 32,
      fontFamily: 'Ubuntu_700Bold',
      maxWidth: 260,
      marginTop: 64,
    },
  
    description: {
      color: '#6C6C80',
      fontSize: 16,
      marginTop: 16,
      fontFamily: 'Roboto_400Regular',
      maxWidth: 260,
      lineHeight: 24,
    },
  
    footer: {},
  
    select: {},
  
    input: {
      height: 60,
      backgroundColor: '#FFF',
      borderRadius: 10,
      marginBottom: 8,
      paddingHorizontal: 24,
      fontSize: 16,
    },
  
    button: {
      backgroundColor: '#34CB79',
      height: 60,
      flexDirection: 'row',
      borderRadius: 10,
      overflow: 'hidden',
      alignItems: 'center',
      marginTop: 8,
    },
  
    buttonIcon: {
      height: 60,
      width: 60,
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      justifyContent: 'center',
      alignItems: 'center'
    },
  
    buttonText: {
      flex: 1,
      justifyContent: 'center',
      textAlign: 'center',
      color: '#FFF',
      fontFamily: 'Roboto_500Medium',
      fontSize: 16,
    },

    selectContainer: {
      width:330,
      height: 50,
      borderWidth: 1,
      marginTop: 20,
      backgroundColor: '#fff',
      borderRadius: 8
    },

  });
export default Home;