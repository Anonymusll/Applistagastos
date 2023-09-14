import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

const LoadingScreen = () => {
  const animationRef = useRef(null);
  const [loadingText, setLoadingText] = useState('Cargando...');
  const [showAnimation, setShowAnimation] = useState(true); // Agregamos el estado para controlar la visibilidad de la animación

  useEffect(() => {
    // Inicia la animación cuando se monta el componente
    animationRef.current.play();

    // Detiene la animación y oculta después de 2 segundos
    const animationTimer = setTimeout(() => {
      animationRef.current.pause();
      setLoadingText('Carga completa');
      setShowAnimation(false);
    }, 2000);

    // Limpia el temporizador cuando se desmonta el componente
    return () => clearTimeout(animationTimer);
  }, []);

  return (
    <View style={styles.container}>
      {showAnimation && ( // Renderizamos la animación solo si showAnimation es verdadero
        <LottieView
          ref={animationRef}
          style={styles.animation}
          source={require('../assets/cargando.json')} // Reemplaza con la ubicación de tu archivo JSON
        />
      )}
      <Text style={styles.loadingText}>{loadingText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: 200,
    height: 200,
  },
  loadingText: {
    marginTop: 20,
    fontSize: 18,
  },
});

export default LoadingScreen;

