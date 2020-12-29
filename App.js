import React,{useRef, useState} from 'react';
import { StyleSheet, Text, View, Image, TextInput, Animated, TouchableOpacity, FlatList } from 'react-native';


export default function App() {
  const animate = useRef(new Animated.Value(0)).current;
  const fade = useRef(new Animated.Value(0)).current
  const [gc,setGC] = useState(false);
  
  const open_gc =()=> {
    Animated.timing(animate,{
      toValue: -460,
      duration: 2000,
      useNativeDriver: false,
    }).start(()=>{
      Animated.timing(fade,{
        toValue: 1,
        duration: 1000,
        useNativeDriver: false,
      }).start(()=>setGC(true))
    });
  }

  return (
    <View style={styles.container}>
      <TopView animate={animate} fade={fade}/>
      { !gc ? <Animated.View opacity={fade.interpolate({inputRange:[0,1], outputRange:[1,0]})} position='absolute' bottom={20} alignSelf='center'>
        <TouchableOpacity onPress={open_gc}>  
          <Text style={{alignSelf:'center', color: '#0EA541', fontWeight: 'bold', fontSize: 17, marginTop: 20}}>Pumasok</Text>
        </TouchableOpacity>
      </Animated.View> : 
      
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', zIndex: -1}}>
        <FlatList
          data={[{user: true},{user: true},{user: true},{user: false},{user: true},{user: true},{user: true},{user: false},{user: true},{user: true},{user: true},{user: false},{user: true},{user: true},{user: true},{user: false},{user: true},{user: true},{user: true},{user: false}]}
          renderItem={({item})=><Item item={item}/>}
          inverted
          keyExtractor={(item,index)=>index.toString()}
          
          style={{position: 'absolute', bottom: 100, width: '100%',height:'100%',}}
        
        />
        <View style={{position: 'absolute', bottom: 25, flexDirection: 'row'}}>

        <TextInput
              placeholder='Ilagay ang Pangalan'
              style={{borderWidth: 1, width: '80%', height: 40, marginTop: 3,
              borderColor:'#BEBEBE',
              paddingLeft: 15  
              ,backgroundColor: 'white'
              ,borderRadius: 100}}
        />

       <TouchableOpacity>
         <Image source={require('./assets/images/send.png')}
          style={{resizeMode: 'contain', height: 45, width: 45, marginLeft: 10
          }}
         />
       </TouchableOpacity>
        </View>
        
      </View>
      }
    </View>
  );
}

function Item(props){
  const{item} = props;
  return(
    <View style={{width: '100%', flexDirection:  !item.user ? 'row' : 'row-reverse', marginBottom: 30}}>
      <Image
        source={require('./assets/images/1.png')}
        style={{resizeMode: 'contain', height: 70, width: 70, marginRight: 15}}
      />
      <View style={{backgroundColor:'#D0DAFF', borderRadius: 20, padding: 10, maxWidth: '70%'}}>
        <Text style={{color: '#8B8B8B', fontSize: 12}}>Berto Magdangal</Text>
        <Text style={{color: '#797373', fontSize: 13}}>Maayos naman ang kalagayan namin ngunit, nakakabahala lang ang mga nangyayare sa mundo, hindi matapos matapos na pandemya at kawalan ng makakain ng maraming tao</Text>
      </View>
    </View>

    
  )
}

function TopView(props){
  const { animate, fade } = props;

  return (
    <Animated.View style={[styles.topView,{transform:[{translateY: animate}]}]}>
      <Animated.View style={{flex: 1,alignItems: 'center', opacity: animate.interpolate({
        inputRange: [-300,0],
        outputRange: [0,1],
        extrapolate: 'clamp'
      })}}> 
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop:100}}>       
          <Image
            source={require('./assets/images/logo.png')}
            style={{height: 90, width: 90}}
            resizeMode='contain'
          />
          <Text style={styles.title_text}>Mabuhay</Text>
          <Text style={[styles.title_text,{fontWeight: 'normal'}]}>Ayusin ang iyong tauhan</Text>
        </View>
        <View style={{flexDirection: 'row', flex: 2, paddingTop: 20}}>
          <View style={styles.circle}>
            <Image
              source={require('./assets/images/1.png')}
              style={{height: '65%', width: '65%'}}
              resizeMode='contain'
            />
          </View>
          <View style={styles.circle}>
            <Image
              source={require('./assets/images/2.png')}
              style={{height: '65%', width: '65%'}}
              resizeMode='contain'
            />
          </View>
          <View style={styles.circle}>
            <Image
              source={require('./assets/images/3.png')}
              style={{height: '65%', width: '65%'}}
              resizeMode='contain'
            />
          </View>
        </View>
        
        <TextInput
              placeholder='Ilagay ang Pangalan'
              style={styles.input}
        />
      </Animated.View>
      
      <Animated.View style={{position:'absolute', bottom: 40, alignSelf: 'center', alignItems: 'center',
        opacity: fade
        }}>
          <Image
            source={require('./assets/images/logo.png')}
            style={{height: 90, width: 90}}
            resizeMode='contain'
          />
          
          <Text style={[styles.title_text,{fontSize: 20}]}>Algo Filipino</Text>

      </Animated.View>

    </Animated.View>
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  input:{
    position: 'absolute',
    bottom: 100,
    backgroundColor: 'white',
    height: '6%',
    width: '65%',
    textAlign:'center',
    borderColor:'#BCBCBC',
    borderWidth: 1.8,
    fontSize: 18,
    borderRadius: 100,
  },
  circle:{
    backgroundColor: 'white',
    height: 100,
    width: 100,
    borderRadius: 100/2,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  title_text:{
    fontSize: 20,
    fontWeight: 'bold', 
    color: 'white'
  },
  topView:{
    position: 'absolute',
    backgroundColor: '#9FA3FF',
    borderColor: '#EDEEFF',
    borderWidth: 5,
    height: '90%',
    width: '115%',
    marginLeft: -26,
    transform:[{translateY: -10}],
    borderBottomEndRadius: 200,
    borderBottomStartRadius: 200,
  }
});
