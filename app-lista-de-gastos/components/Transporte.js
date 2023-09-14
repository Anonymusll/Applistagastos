import React from 'react';
import { StyleSheet, View,  FlatList, Pressable, Text} from 'react-native';
import LottieView from 'lottie-react-native';
import { Icon } from 'react-native-elements';

const Transporte = () => {
  
  const [expensesList, setExpensesList] = useState([]);

  return (
  
          <View style={{ 
    flex: 1, padding: 5, backgroundColor: '#F5F5F5' }}>
            <View  style={ styles.rightMemory }>
            
                <View style={{flexDirection:'row-reverse',}}>   
                  <Text style={styles.textofecha}> Fecha: {date.toString()}</Text>
                </View>

                  <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
                    <View style={{marginVertical: 10}}>
                      <Text style={styles.textocategoria}>Categoría:</Text>
                      <Text style={styles.textocategoria1}>{item.category}</Text>
                    </View>  

                    <View style={{marginVertical: 10,}}>
                      <View>
                        <Text style={styles.monto}>Monto: </Text>
                        <Text style={styles.monto1}> ${item.amount} </Text>
                      </View>
                    </View> 
                  </View>


                <View style={{marginVertical: 1, flexDirection: 'row'}}>  
                  <Text style={styles.descripcion}>Descripcion:</Text>
                  <Text style={styles.descripcion}>{item.amount2}</Text>
                </View>
                <View>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                  <View> 
                    <LottieView
                      autoPlay
                      loop
                      style={styles.animation}
                      source={require('../assets/carro.json')} // Reemplaza con la ubicación de tu archivo JSON
                    />
                  </View>  
               
                <View style={{flexDirection: 'row-reverse', }} >
                  <View style={{padding: 1, margin: 10, backgroundColor: 'white',  borderRadius: 10, opacity: 0.8 }}> 
                    <Pressable onPress={() => handleDeleteExpense(index)}>
                      <View style={{ padding: 1 }}>
                        <Icon size={40} name="delete" color="red" />
                      </View>
                    </Pressable>
                  </View>
                    <View style={{padding:1, margin: 10, backgroundColor:'white',borderRadius: 10,  opacity: 0.8 }}> 
                    <Pressable onPress={""}>
                      <View style={{ padding: 1 }}>
                        <Icon size={40} name="edit" color="black" />
                      </View>
                    </Pressable>
                  </View>
                  </View>
                </View>
                </View>
           
            <View>
              <Text>
                {"\n"}
              </Text>
            </View>
          </View>
        </View>
      
    
    
      
  );
};

const styles = StyleSheet.create({
 container: {
    flex: 1,
    padding: 5,
    backgroundColor: '#F5F5F5'
    
  }, 

 animation : {
   width: 70,
   height: 70
 },



    textocategoria: {
    fontSize: 15,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
    
  },

   textocategoria1: {
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
    opacity: 0.7
  },

   monto: {
    fontSize: 15,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
    
  },

    monto1: {
    fontSize: 30,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
    opacity: 0.7
  },


    descripcion: {
    fontSize: 15,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
    
  },


   textofecha: {
    
    fontSize: 10,
    lineHeight: 15,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },

   rightMemory: {
    margin:10,
     borderRadius: 15,
    padding: 5,
    height: 200,
    marginBottom: 5,
    backgroundColor: '#A489FF',
    shadowColor: "#000", shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5,
  },


})

export default Transporte;