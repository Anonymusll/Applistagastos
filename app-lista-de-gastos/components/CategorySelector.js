import React from 'react';
import { Picker } from '@react-native-picker/picker';
import { StyleSheet, } from 'react-native';

const CategorySelector = ({ selectedCategory, onSelectCategory }) => {
  const categories = [
    'Comida', 'Transporte', 'PagoDeudas', 'Ocio', 'Otros'
  ];

  return (
    <Picker
      selectedValue={selectedCategory}
      onValueChange={(itemValue) => onSelectCategory(itemValue)}
      style={styles.input2}
    >
    
      {categories.map(category => (
        <Picker.Item key={category} label={category} value={category} />
      ))}
    </Picker>
  );
};

const styles = StyleSheet.create({

  input2: {
    height: 40,
    
    borderWidth: 2,
    padding: 1,
    borderRadius: 10,
    borderColor: 'white',
    paddingVertical: 10
  },

})

export default CategorySelector;
