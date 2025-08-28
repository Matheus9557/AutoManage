import React from 'react';
import { Text, StyleSheet } from 'react-native';

export default function RequiredMessage({ visible }: { visible: boolean }) {
  if (!visible) return null;
  return <Text style={styles.required}>Campos obrigatórios *</Text>;
}

const styles = StyleSheet.create({
  required: { color: 'red', marginTop: 20, fontWeight: 'bold' },
});
