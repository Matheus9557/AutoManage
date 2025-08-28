import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import ClienteItem from '../components/ClienteItem';
import SubHeader from '../components/SubHeader';
import Header from '../components/Header';
import { useNavigation } from '@react-navigation/native';
import ConfirmButton from '../components/ConfirmButton';

export default function ListaClientes() {
  const [clientes, setClientes] = useState<any[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    try {
      const res = await fetch('https://us-central1-automanage-2db06.cloudfunctions.net/api/clientes');
      const data = await res.json();
      setClientes(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditar = (cliente: any) => {
    navigation.navigate('EditarCliente', { cliente });
  };

  const handleRemover = async (clienteId: string) => {
  try {
    const res = await fetch(`https://us-central1-automanage-2db06.cloudfunctions.net/api/clientes/${clienteId}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      // Remove da lista localmente após remoção no servidor
      setClientes((prevClientes) => prevClientes.filter((c) => c.id !== clienteId));
    } else {
      console.error('Erro ao remover cliente:', await res.text());const handleRemover = (clienteId: string) => {
    // código de remoção continua igual
  };
    }
  } catch (err) {
    console.error('Erro de rede ao remover cliente:', err);
  }
};

  return (
    <View style={{ flex: 1 }}>
      <Header title="Lista de Clientes" />
      <SubHeader title="Lista de Clientes" />

      <FlatList
        contentContainerStyle={{ paddingBottom: 120 }} // deixa espaço para o botão
        data={clientes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ClienteItem
            cliente={item}
            onEditar={() => handleEditar(item)}
            onRemover={() => handleRemover(item.id)}
          />
        )}
      />

      {/* Botão fixo na parte inferior */}
      <View style={{ position: 'absolute', bottom: 20, left: 0, right: 0 }}>
        <ConfirmButton onPress={() => navigation.navigate('CadastroCliente')} />
      </View>
    </View>
  );
}
