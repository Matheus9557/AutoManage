import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface ClienteItemProps {
  cliente: {
    id: string;
    nome: string;
    cpf: string;
    endereco?: string;
    [key: string]: any;
  };
  onEditar: () => void;
  onRemover: () => void;
}

export default function ClienteItem({ cliente, onEditar, onRemover }: ClienteItemProps) {
  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Text style={styles.nome}>{cliente.nome}</Text>
        <Text style={styles.cpf}>{cliente.cpf}</Text>
        {cliente.endereco && <Text style={styles.endereco}>{cliente.endereco}</Text>}
      </View>
      <View style={styles.botoes}>
        <TouchableOpacity style={styles.botaoEditar} onPress={onEditar}>
          <Text style={styles.textoBotao}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botaoRemover} onPress={onRemover}>
          <Text style={styles.textoBotao}>Remover</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  info: {
    marginBottom: 8,
  },
  nome: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cpf: {
    fontSize: 14,
    color: '#555',
  },
  endereco: {
    fontSize: 14,
    color: '#555',
  },
  botoes: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  botaoEditar: {
    marginRight: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#4caf50',
    borderRadius: 4,
  },
  botaoRemover: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#f44336',
    borderRadius: 4,
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
