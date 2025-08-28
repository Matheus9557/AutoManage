import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // ícones de seta

export default function Header({ title }: { title?: string }) {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      {navigation.canGoBack() && (
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000000ff" />
        </TouchableOpacity>
      )}
      {title && <Text style={styles.headerTitle}>{title}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 60,
    backgroundColor: '#d4d4d4',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    color: '#000000ff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
