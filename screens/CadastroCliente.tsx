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

type RootStackParamList = {
  CadastroCliente: { latitude?: number; longitude?: number };
  MapaCliente: undefined;
};

export default function CadastroCliente() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, 'CadastroCliente'>>();

  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [endereco, setEndereco] = useState('');
  const [dataCadastro, setDataCadastro] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  const [errors, setErrors] = useState({
    nome: false,
    cpf: false,
    endereco: false,
    dataCadastro: false,
    location: false,
  });

  // Atualiza latitude/longitude ao voltar do mapa
  useEffect(() => {
    if (route.params?.latitude && route.params?.longitude) {
      setLatitude(route.params.latitude);
      setLongitude(route.params.longitude);
      navigation.setParams({ latitude: undefined, longitude: undefined });
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
      const response = await fetch(
        'https://us-central1-automanage-2db06.cloudfunctions.net/api/clientes',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nome,
            cpf,
            endereco,
            dataCadastro,
            latitude,
            longitude,
          }),
        }
      );

      if (!response.ok) throw new Error('Erro ao cadastrar cliente');

      Alert.alert('Sucesso', 'Cliente cadastrado com sucesso!');
      // Limpar campos
      setNome('');
      setCpf('');
      setEndereco('');
      setDataCadastro('');
      setLatitude(null);
      setLongitude(null);
      setErrors({
        nome: false,
        cpf: false,
        endereco: false,
        dataCadastro: false,
        location: false,
      });
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Não foi possível cadastrar o cliente.');
    }
  };

  const abrirMapa = () => navigation.navigate('MapaCliente');

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
        <Header title="Cadastro de Cliente" />
        <SubHeader title="Cadastro de Cliente" />

        <InputField value={nome} onChangeText={setNome} placeholder="Nome" error={errors.nome} />
        <RequiredMessage visible={errors.nome} />

        <InputField value={cpf} onChangeText={setCpf} placeholder="CPF" error={errors.cpf} mask="cpf" />
        <RequiredMessage visible={errors.cpf} />

        <InputField value={endereco} onChangeText={setEndereco} placeholder="Endereço" error={errors.endereco} />
        <RequiredMessage visible={errors.endereco} />

        <SelectableField
          value={dataCadastro}
          placeholder="Selecionar data de cadastro"
          onPress={() => setShowDatePicker(true)}
          error={errors.dataCadastro}
        />
        <RequiredMessage visible={errors.dataCadastro} />

        {showDatePicker && (
          <DateTimePicker
            value={new Date()}
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
        />
        <RequiredMessage visible={errors.location} />
      </ScrollView>

      <View style={styles.buttonContainer}>
        <ConfirmButton onPress={handleSubmit} />
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
