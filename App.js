import React,{useRef, useState, useEffect} from 'react';
import { StyleSheet, Text, View, Image, TextInput, Animated, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { firebase_add_message, firebase_listen_message, InitializeFirebase, test_ter } from './Firebase';


const {height} = Dimensions.get('window')
export default function App() {
  const animate = useRef(new Animated.Value(0)).current;
  const fade = useRef(new Animated.Value(0)).current
  const [gc,setGC] = useState(false);
  const [currentuser, setCurrentUser] = useState('Pedro Makiling');
  const [userimage, setUserImage] = useState(0);
  const [data, setData] = useState([]);
  const [message, setMessage ] = useState('');
  
  const open_gc =()=> {
    Animated.timing(animate,{
      toValue: -height*.62,
      duration: 2000,
      useNativeDriver: false,
    }).start(()=>{
      Animated.timing(fade,{
        toValue: 1,
        duration: 1000,
        useNativeDriver: false,
      }).start(()=>{ setGC(true)})
    });
  }

  useEffect(()=>{
    InitializeFirebase();
    firebase_listen_message('Messages', (result)=>{
      setData(result)
    });
  },[]);

  return (
    <View style={styles.container}>
      <TopView animate={animate} fade={fade}
        state={{
          userimage, 
          setUserImage,
          currentuser,
          setCurrentUser
        }}
      />
      { !gc ? <Animated.View opacity={fade.interpolate({inputRange:[0,1], outputRange:[1,0]})} position='absolute' bottom={20} alignSelf='center'>
        <TouchableOpacity onPress={open_gc}>  
          <Text style={{alignSelf:'center', color: '#0EA541', fontWeight: 'bold', fontSize: 17, marginTop: 20}}>Pumasok</Text>
        </TouchableOpacity>
      </Animated.View> : 
      
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', zIndex: -1}}>
        <FlatList
          data={data}
          renderItem={({item})=><Item item={item} currentuser={currentuser}/>}
          inverted
          keyExtractor={(item,index)=>index.toString()}
          
          style={{position: 'absolute', bottom: 70, width: '100%',height:'100%',}}
          contentContainerStyle={{flexDirection: 'column-reverse'}}
        
        />
        <View style={{position: 'absolute', bottom: 25, flexDirection: 'row'}}>

        <TextInput
              placeholder='Maglagay ng mensahe'
              value={message}
              onChangeText={text=>setMessage(text)}
              style={{borderWidth: 1, width: '80%', height: 40, marginTop: 3,
              borderColor:'#BEBEBE',
              paddingLeft: 15  
              ,backgroundColor: 'white'
              ,borderRadius: 100}}
              clearButtonMode='always'
        />

       <TouchableOpacity onPress={
         ()=>{
           firebase_add_message('Messages',{
             name: currentuser,
             image: userimage,
             message
           })
           setMessage('');
         }
       }>
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
  const{item, currentuser} = props;
  let image = 0;
  let user = currentuser == item.name ? true : false;

  if(item.image == 0)
    image = require('./assets/images/1.png')
  if(item.image == 1)
    image = require('./assets/images/2.png')
  if(item.image == 2)
    image = require('./assets/images/3.png')
  return(
    <View style={{width: '100%', flexDirection:  !user ? 'row' : 'row-reverse', marginBottom: 30}}>
      <Image
        source={image}
        marginRight={5}
        marginLeft={5}
        style={{resizeMode: 'contain', height: 50, width: 50}}
      />
      <View style={{backgroundColor: user ? '#FDD6D6':'#D0DAFF' , borderRadius: 20, padding: 10, maxWidth: '70%'}}>
        <Text style={{color: '#8B8B8B', fontSize: 12}}>{item.name}</Text>
        <Text style={{color: '#797373', fontSize: 13}}>{item.message}</Text>
      </View>
    </View>

    
  )
}

function TopView(props){
  const { animate, fade, state} = props;
  const { currentuser, setCurrentUser, userimage, setUserImage } = state
  return (
    <Animated.View style={[styles.topView,{transform:[{translateY: animate}]}]}>
      <Animated.View style={{ flex: 1, alignItems: 'center', opacity: animate.interpolate({
        inputRange: [-300,0],
        outputRange: [0,1],
        extrapolate: 'clamp'
      })}}> 
        <View style={{justifyContent: 'center', alignItems: 'center', paddingTop:20}}>       
          <Image
            source={require('./assets/images/logo.png')}
            style={{height: 90, width: 90}}
            resizeMode='contain'
          />
          <Text style={styles.title_text}>Mabuhay</Text>
          <Text style={[styles.title_text,{fontWeight: 'normal'}]}>Ayusin ang iyong tauhan</Text>
        </View>
        
        <View style={{flexDirection: 'row', paddingTop: 20}}>
          <TouchableOpacity  onPress={()=>setUserImage(0)}>
            <View style={[styles.circle,{backgroundColor: userimage == 0 ? '#FFF96A' : 'white'}]}>
              <Image
                source={require('./assets/images/1.png')}
                style={{height: '65%', width: '65%'}}
                resizeMode='contain'
              />
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity  onPress={()=>setUserImage(1)}>
            <View style={[styles.circle,{backgroundColor: userimage == 1 ? '#FFF96A' : 'white'}]}>
              <Image
                source={require('./assets/images/2.png')}
                style={{height: '65%', width: '65%'}}
                resizeMode='contain'
              />
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity  onPress={()=>setUserImage(2)}>
            
            <View style={[styles.circle,{backgroundColor: userimage == 2 ? '#FFF96A' : 'white'}]}>
            <Image
              source={require('./assets/images/3.png')}
              style={{height: '65%', width: '65%'}}
              resizeMode='contain'
            />
          </View>
        </TouchableOpacity>
        </View>
        <View style={{flex: 1, justifyContent:'center'}}>
          
        <TextInput
              placeholder='Ilagay ang Pangalan'
              onChangeText={text => setCurrentUser(text)}
              value={currentuser}
              style={styles.input}
        />
        </View>
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
    backgroundColor: 'white',
    height: 35,
    width: 250,
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
