import React, { useState, useEffect } from 'react';
import { ScrollView, Alert, StyleSheet, Platform, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';

import Header from '../components/Header';
import SubHeader from '../components/SubHeader';
import InputField from '../components/InputField';
import ConfirmButton from '../components/ConfirmButton';
import RequiredMessage from '../components/RequiredMessage';
import SelectableField from '../components/SelectableField';

type Cliente = {
  id: string;
  nome: string;
  cpf: string;
  endereco: string;
  dataCadastro: string;
  latitude?: number;
  longitude?: number;
};

type RootStackParamList = {
  EditarCliente: { cliente: Cliente };
  MapaCliente: undefined;
};

export default function EditarCliente() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'EditarCliente'>>();

  const cliente = route.params.cliente;

  const [nome, setNome] = useState(cliente.nome);
  const [cpf, setCpf] = useState(cliente.cpf);
  const [endereco, setEndereco] = useState(cliente.endereco);
  const [dataCadastro, setDataCadastro] = useState(cliente.dataCadastro);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [latitude, setLatitude] = useState<number | null>(cliente.latitude ?? null);
  const [longitude, setLongitude] = useState<number | null>(cliente.longitude ?? null);

  const [errors, setErrors] = useState({
    nome: false,
    cpf: false,
    endereco: false,
    dataCadastro: false,
    location: false,
  });

  useEffect(() => {
    if (route.params?.cliente.latitude && route.params?.cliente.longitude) {
      setLatitude(route.params.cliente.latitude);
      setLongitude(route.params.cliente.longitude);
    }
  }, [route.params]);

  const validarFormulario = () => {
    const newErrors = {
      nome: nome.trim() === '',
      cpf: cpf.trim() === '',
      endereco: endereco.trim() === '',
      dataCadastro: dataCadastro.trim() === '',
      location: latitude === null || longitude === null,
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(e => e);
  };

  const handleSubmit = async () => {
    if (!validarFormulario()) return;

    try {
      await fetch(`https://us-central1-automanage-2db06.cloudfunctions.net/api/clientes/${cliente.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, cpf, endereco, dataCadastro, latitude, longitude }),
      });
      Alert.alert('Sucesso', 'Cliente atualizado com sucesso!');
      navigation.goBack();
    } catch (err) {
      console.error(err);
      Alert.alert('Erro', 'Não foi possível atualizar o cliente.');
    }
  };

  const abrirMapa = () => {
    navigation.navigate('MapaCliente');
  };

  const onChangeDate = (event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      const formatted = `${selectedDate.getDate().toString().padStart(2, '0')}/${(selectedDate.getMonth() + 1)
        .toString()
        .padStart(2, '0')}/${selectedDate.getFullYear()}`;
      setDataCadastro(formatted);
    }
  };

  return (
    <View style={styles.screen}>
      <ScrollView contentContainerStyle={styles.container}>
        <Header title="Editar Cliente" />
        <SubHeader title="Editar Cliente" />

        <InputField
          value={nome}
          onChangeText={setNome}
          placeholder="Nome"
          error={errors.nome}
          style={{ backgroundColor: '#E0E0E0' }}
        />
        <RequiredMessage visible={errors.nome} />

        <InputField
          value={cpf}
          onChangeText={setCpf}
          placeholder="CPF"
          error={errors.cpf}
          mask="cpf"
          style={{ backgroundColor: '#E0E0E0' }}
        />
        <RequiredMessage visible={errors.cpf} />

        <InputField
          value={endereco}
          onChangeText={setEndereco}
          placeholder="Endereço"
          error={errors.endereco}
          style={{ backgroundColor: '#E0E0E0' }}
        />
        <RequiredMessage visible={errors.endereco} />

        <SelectableField
          value={dataCadastro}
          placeholder="Selecionar data de cadastro"
          onPress={() => setShowDatePicker(true)}
          error={errors.dataCadastro}
          style={{ backgroundColor: '#E0E0E0' }}
        />
        <RequiredMessage visible={errors.dataCadastro} />

        {showDatePicker && (
          <DateTimePicker
            value={new Date(dataCadastro.split('/').reverse().join('-')) || new Date()}
            mode="date"
            display="default"
            onChange={onChangeDate}
            maximumDate={new Date()}
          />
        )}

        <SelectableField
          value={latitude && longitude ? 'Localização selecionada ✅' : ''}
          placeholder="Selecionar localização no mapa"
          onPress={abrirMapa}
          error={errors.location}
          style={{ backgroundColor: '#E0E0E0' }}
        />
        <RequiredMessage visible={errors.location} />
      </ScrollView>

      <View style={styles.buttonContainer}>
        <ConfirmButton onPress={handleSubmit} title="Confirmar" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  container: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingBottom: 100, // espaço para botão fixo
  },
  buttonContainer: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 70 : 50,
    left: 20,
    right: 20,
  },
});
