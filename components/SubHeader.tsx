import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SubHeader({ title }: { title: string }) {
  return (
    <View style={styles.subHeader}>
      <Text style={styles.subHeaderText}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  subHeader: {
    width: '100%',
    height: 48,
    backgroundColor: '#d4d4d4',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  subHeaderText: { fontSize: 20, color: '#000', fontWeight: '500' },
});
