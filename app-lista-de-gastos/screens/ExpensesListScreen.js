import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Pressable, TextInput, Modal, Button } from 'react-native';
import { Icon } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ExpensesListScreen = ({ route }) => {
  const [expensesList, setExpensesList] = useState([]);
  const [date, setDate] = useState(route.params.date);
  const [selectedCategory, setSelectedCategory] = useState('Todas'); // Estado para el filtro de categoría
  const [modalVisible, setModalVisible] = useState(false); // Estado para mostrar/ocultar el modal de selección de categoría

  useEffect(() => {
    retrieveExpenses();
  }, []);

  const retrieveExpenses = async () => {
    try {
      const storedExpenses = await AsyncStorage.getItem('gastosload');
      if (storedExpenses) {
        const parsedExpenses = JSON.parse(storedExpenses);
        setExpensesList(parsedExpenses);
      }
    } catch (error) {
      console.error('Error retrieving expenses', error);
    }
  };

  const handleDeleteExpense = async (index) => {
    try {
      const newExpensesList = [...expensesList];
      newExpensesList.splice(index, 1);
      await AsyncStorage.setItem('gastosload', JSON.stringify(newExpensesList));
      setExpensesList(newExpensesList);
    } catch (error) {
      console.error('Error deleting expense', error);
    }
  };

  const total = expensesList.reduce((acc, expense) => acc + expense.amount, 0);

  const getCategoryCardStyle = (category) => {
    switch (category) {
      case 'Comida':
        return styles.comidaCard;
      case 'Transporte':
        return styles.transporteCard;
      case 'PagoDeudas':
        return styles.pagodeudasCard;
      case 'Ocio':
        return styles.ocioCard;
      case 'Otros':
        return styles.otrosCard;
      // Agrega más casos según tus categorías y colores deseados aquí
      default:
        return styles.defaultCard;
    }
  };

  // Filtra los gastos según la categoría seleccionada
  const filteredExpenses = selectedCategory === 'Todas' ? expensesList : expensesList.filter((expense) => expense.category === selectedCategory);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={styles.texttitle}>Total gastado: {total} </Text>
        <Pressable onPress={() => setModalVisible(true)}>
          <Icon size={40} name="filter-list" color="black" />
        </Pressable>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text>Filtrar por categoría:</Text>
            <View style={{ flexDirection: 'column', padding: 10 }}>
              <View style={{ padding: 10 }}>
                <Button title="Todas" onPress={() => setSelectedCategory('Todas')} />
              </View>
              <View style={{ padding: 10 }}>
                <Button title="Comida" onPress={() => setSelectedCategory('Comida')} />
              </View>
              <View style={{ padding: 10 }}>
                <Button title="Transporte" onPress={() => setSelectedCategory('Transporte')} />
              </View>
              <View style={{ padding: 10 }}>
                <Button title="Pago Deudas" onPress={() => setSelectedCategory('PagoDeudas')} />
              </View>
              <View style={{ padding: 10 }}>
                <Button title="Ocio" onPress={() => setSelectedCategory('Ocio')} />
              </View>
              <View style={{ padding: 10 }}>
                <Button title="Otros" onPress={() => setSelectedCategory('Otros')} />
              </View>
            </View>
            <Button title="Cerrar" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
      <FlatList
        data={filteredExpenses} // Mostrar gastos filtrados
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={[styles.expenseCard, getCategoryCardStyle(item.category)]}>
            <View style={{ flexDirection: 'row-reverse' }}>
              <Text style={styles.textofecha}> Fecha: {new Date(item.amount3).toLocaleDateString()}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ marginVertical: 10 }}>
                <Text style={styles.textocategoria}>Categoría:</Text>
                <Text style={styles.textocategoria1}>{item.category}</Text>
              </View>
              <View style={{ marginVertical: 10 }}>
                <View>
                  <Text style={styles.monto}>Monto:</Text>
                  <Text style={styles.monto1}> ${item.amount}</Text>
                </View>
              </View>
            </View>
            <View style={{ marginVertical: 1, flexDirection: 'row' }}>
              <Text style={styles.descripcion}>Descripción:</Text>
              <Text style={styles.descripcion1}>{item.amount2}</Text>
            </View>
            <View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row-reverse' }}>
                  <View style={{ padding: 1, margin: 10, backgroundColor: 'white', borderRadius: 10, opacity: 0.8 }}>
                    <Pressable onPress={() => handleDeleteExpense(index)}>
                      <View style={{ padding: 1 }}>
                        <Icon size={40} name="delete" color="red" />
                      </View>
                    </Pressable>
                  </View>
                </View>
              </View>
            </View>
            <View>
              <Text>{"\n"}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: '#F5F5F5',
  },
  
  texttitle: {
    fontSize: 18,
    padding: 5,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'black',
    paddingVertical: 10,
  },

  expenseCard: {
    margin: 10,
    borderRadius: 15,
    padding: 5,
    height: 200,
    marginBottom: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
   
  descripcion1: {
    fontSize: 15,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
    opacity: 0.7
  },

  textofecha: {
    fontSize: 10,
    lineHeight: 15,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },

  comidaCard: {
    backgroundColor: '#7FABF4', // Cambia este color según tus preferencias
  },

  transporteCard: {
    backgroundColor: '#F4AE5C', // Cambia este color según tus preferencias
  },

  pagodeudasCard: {
    backgroundColor: '#A97CF3', // Cambia este color según tus preferencias
  },

  ocioCard: {
    backgroundColor: '#EB6284', // Cambia este color según tus preferencias
  },

  otrosCard: {
    backgroundColor: '#6BE1C1', // Cambia este color según tus preferencias
  },

  defaultCard: {
    backgroundColor: 'gray', // Color predeterminado para categorías no especificadas
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },

  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    justifyContent: 'space-between'
  },
});

export default ExpensesListScreen;

