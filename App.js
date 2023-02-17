import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { Picker } from '@react-native-picker/picker';
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Contador from './Contador';

export default function App() {
  const [segundos,setarSegundos] = useState(1);
  const [minutos,setarMinutos] = useState(0);
  const [estado,setarEstado] = useState('selecionar');
  
  const [alarmeSound,setarAlarmeSound] = useState([
    { 
      id: 1,
      selecionado: true,
      som: 'alarme 1',
      file: require('./assets/alarme1.mp3'),
    },
    ,
    {
      id: 2,
      selecionado: false,
      som: 'alarme 2',
      file: require('./assets/alarme2.mp3'),
    },
    {
      id: 3,
      selecionado: false,
      som: 'alarme 3',
      file: require('./assets/alarme3.mp3'),
    }
  ]);

  var numeros = [];
  for(var i = 1; i <= 60; i++){
    numeros.push(i);
  }

  function setarAlarme(id){

     var alarmesTemp = alarmeSound.map(function(val){

      if(id != val.id) 
        val.selecionado = false;
     else
        val.selecionado = true;
        return val; 
    
    }) 

    setarAlarmeSound(alarmesTemp);
  }

  if(estado == 'selecionar'){
  return (
    <View style={styles.container}>
     <StatusBar style="auto" />
      <LinearGradient 
      //color gradient props
      colors={['rgba(59, 29, 105, 1)','rgba(59, 29, 105, 0.6)']}
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%'
      }}
       
       />
       <Text style={{color:'white', fontSize: 30}}>Selecione seu tempo:</Text>
       <View style={{flexDirection:'row'}}>
       <Text style={{color: 'white',paddingTop:16}}>Min:</Text>
            <Picker 
                selectedValue={minutos}
                onValueChange={(itemValue, itemIndex) =>
                 setarMinutos(itemValue)}
              style={{height: 50, width:100, color:'#fff'}}>
                <Picker.Item label='0' value='0' />
              {
               numeros.map(function(val){
                 return(<Picker.Item label={val.toString()} value={val.toString()} />);
               }) 
              
              }
            </Picker>

            <Text style={{color: 'white',paddingTop:16}}>Seg:</Text>
            <Picker 
             selectedValue={segundos}
             onValueChange={(itemValue, itemIndex) =>
              setarSegundos(itemValue)}
              style={{height: 50, width:100, color: '#fff' }}>
              
              
              {
               numeros.map(function(val){
                 return(<Picker.Item label={val.toString()} value={val.toString()} />);
               }) 
              
              }
            </Picker>
        </View>

        <View style={{flexDirection: 'row'}}>
          {
           alarmeSound.map(function(val){
          
             if(val.selecionado){
              return(<TouchableOpacity onPress={()=> setarAlarme(val.id)} style={styles.btnEscolherSelecionado}>
                <Text style={{color: 'white'}}>{val.som}</Text>
                </TouchableOpacity>);

              }else{

                return(<TouchableOpacity onPress={()=> setarAlarme(val.id)} style={styles.btnEscolher}>
                  <Text style={{color: 'white'}}>{val.som}</Text>
                  </TouchableOpacity>);

              }
            })
          }
          </View>
          <TouchableOpacity onPress={()=>setarEstado('iniciar')} style={styles.btnInicial}><Text style={{textAlign:'center', paddingTop: 30,color: 'white',fontSize:20}}>Iniciar</Text></TouchableOpacity>
    </View>
  );
  }else if(estado == 'iniciar') {
    //todo logica na proxima aula do timer
    return(
       <Contador alarmes={alarmeSound} setarMinutos={setarMinutos} setarSegundos={setarSegundos} setarEstado={setarEstado} minutos={minutos} segundos={segundos}> </Contador>
    );   
  }
}

const styles = StyleSheet.create({
  btnInicial: {
    backgroundColor: 'rgba(116, 67, 191, 1)',
    width: 100,
    height:100,
    borderRadius: 50,
    marginTop: 30,
    borderColor: 'white',
    borderWidth: 2
  },
  container: {
    flex: 1,
    backgroundColor: 'rgb(66, 66, 245)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnEscolher:{
    marginRight:10,
    padding: 10,
    backgroundColor: 'rgba(116, 67, 191, 1)'
  },
  btnEscolherSelecionado: {
    marginRight:10,
    padding: 10,
    backgroundColor: 'rgba(116, 67, 191, 0.3)',
    borderColor: 'white',
    borderWidth: 2
  }
});
