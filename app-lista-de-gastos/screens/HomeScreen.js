import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import CategorySelector from '../components/CategorySelector';
import AsyncStorage from '@react-native-async-storage/async-storage';


const HomeScreen = ({ navigation }) => {
  const [expense, setExpense] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Comida');
  const [showComponent, setShowComponent] = useState(false);
  const [date, setDate] = useState(new Date());
  const [totalExpense, setTotalExpense] = useState(0); // Nuevo estado para almacenar el gasto total

  useEffect(() => {
    // Calcular el gasto total cada vez que se agregue un nuevo gasto
    const calculateTotalExpense = async () => {
      try {
        const storedExpenses = await AsyncStorage.getItem('gastosload');
        const expensesList = storedExpenses ? JSON.parse(storedExpenses) : [];
        const total = expensesList.reduce((acc, expense) => acc + expense.amount, 0);
        setTotalExpense(total);
        
      } catch (error) {
        console.error('Error calculating total expenses', error);
      }
    };

    calculateTotalExpense();
  }, [showComponent]); // Se ejecuta cada vez que showComponent cambia

  const handleSaveExpense = async () => {
    if (expense && selectedCategory && descripcion && date) {
      const newExpense = {
        category: selectedCategory,
        amount: parseFloat(expense),
        amount2: descripcion,
        amount3 : date
      };

      try {
        const storedExpenses = await AsyncStorage.getItem('gastosload');
        const expensesList = storedExpenses ? JSON.parse(storedExpenses) : [];
        const newExpensesList = [...expensesList, newExpense];

        await AsyncStorage.setItem('gastosload', JSON.stringify(newExpensesList));
        
        // Actualizar el gasto total después de guardar
        setTotalExpense(totalExpense + parseFloat(expense));

        setExpense('');
        setDescripcion('');
        setSelectedCategory('Comida');
        
        setShowComponent(true);
      } catch (error) {
        console.error('Error saving expenses', error);
      }
    }
  };

  return (
    <View style={styles.contenedor}>
      
    
        
    
      
      <View style={styles.cuadro1}>
        <Text style={styles.text2}>Ingrese el gasto:</Text>
        <TextInput
        style={styles.input}
        value={expense}
        onChangeText={setExpense}
        placeholder="Monto del gasto"
        keyboardType="numeric"
      />
      </View>

      <View style={styles.cuadro2}>
          <Text style={styles.text2}>Elige la categoría:</Text>
          <CategorySelector
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
      </View>

      <View style={styles.cuadro2}>
          <Text style={styles.text2}>Descripción del gasto:</Text>
          <TextInput
            style={styles.input}
            value={descripcion}
            onChangeText={setDescripcion}
            placeholder="Descripción del gasto"
          />
      </View>

      <Pressable style={styles.guardarbtn} onPress={handleSaveExpense}>
        <Text style={styles.text}>Guardar</Text>
      </Pressable>

      <Pressable
        style={styles.listabtn}
        onPress={() => navigation.navigate('Lista de Gastos',{ date: date })}>
        <Text style={styles.text}>Ver Lista de Gastos</Text>
      </Pressable>

  
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    padding: 10,
    backgroundColor: '#E7E7E7'
  },
  text2: {
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
    marginHorizontal: 0,
    padding: 5
  },
  input: {
    borderWidth: 1,
    borderColor: 'white',
    padding: 5,
    marginBottom: 20,
    borderRadius: 15,
    backgroundColor: 'white'
  },
  guardarbtn: {
    backgroundColor: '#ac92ec',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
    margin: 10
  },
  listabtn: {
    backgroundColor: '#41BBFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    margin: 10
  },
  text: {
    color: 'white',
  },
texto: {
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'black',
    marginHorizontal: 0,
    padding: 5
  },



cuadro1: {
  backgroundColor: '#41BBFF',
  borderRadius: 10,
  height: 100,
  padding: 5,
  shadowColor: "#000", shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5,
margin: 10
},

cuadro2: {
  backgroundColor: '#41BBFF',
  borderRadius: 10,
  height: 100,
  padding: 5,
  shadowColor: "#000", shadowOffset: { width: 0, height: 2, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5,
margin: 10
}


});

export default HomeScreen;

