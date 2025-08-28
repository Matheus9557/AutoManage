import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import CadastroCliente from '../screens/CadastroCliente';
import EditarCliente from '../screens/EditarCliente';
import ListaClientes from '../screens/ListagemClientes';
import MapaCliente from '../screens/MapaCliente';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="ListagemClientes" component={ListaClientes} />
        <Stack.Screen name="CadastroCliente" component={CadastroCliente} />
        <Stack.Screen name="EditarCliente" component={EditarCliente} />
        <Stack.Screen name="MapaCliente" component={MapaCliente} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
