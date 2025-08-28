import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';

export default function ConfirmButton({ onPress }: { onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>CONFIRMAR</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '90%',
    height: 50,
    backgroundColor: '#34d399',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 40 : 20, // distância da borda inferior
    alignSelf: 'center',
    zIndex: 10,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
