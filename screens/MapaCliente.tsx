import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, Alert, Platform, SafeAreaView } from 'react-native';
import * as Location from 'expo-location';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';

export default function MapaCliente() {
  const navigation = useNavigation();
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [selected, setSelected] = useState<{ latitude: number; longitude: number } | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão necessária', 'Habilite a permissão para obter localização!');
        return;
      }
      let loc = await Location.getCurrentPositionAsync({});
      setLocation({ latitude: loc.coords.latitude, longitude: loc.coords.longitude });
      setSelected({ latitude: loc.coords.latitude, longitude: loc.coords.longitude });
    })();
  }, []);

  const handleConfirm = () => {
    if (!selected) {
      Alert.alert('Erro', 'Selecione uma localização primeiro.');
      return;
    }
    navigation.navigate('CadastroCliente', {
      latitude: selected.latitude,
      longitude: selected.longitude,
    });
  };

  const mapHTML = location
    ? `
      <!DOCTYPE html>
      <html>
      <head>
        <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0">
        <style> html, body, #map { height: 100%; margin: 0; } </style>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
      </head>
      <body>
        <div id="map"></div>
        <script>
          var map = L.map('map').setView([${location.latitude}, ${location.longitude}], 16);
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
          }).addTo(map);
          var marker = L.marker([${location.latitude}, ${location.longitude}]).addTo(map);

          function updateMarker(e) {
            marker.setLatLng(e.latlng);
            window.ReactNativeWebView.postMessage(JSON.stringify({
              latitude: e.latlng.lat,
              longitude: e.latlng.lng
            }));
          }

          map.on('click', updateMarker);
        </script>
      </body>
      </html>
      `
    : '<html><body>Carregando mapa...</body></html>';

  return (
    <SafeAreaView style={styles.container}>
      {location && (
        <WebView
          originWhitelist={['*']}
          source={{ html: mapHTML }}
          style={styles.map}
          onMessage={(event) => {
            const coords = JSON.parse(event.nativeEvent.data);
            setSelected(coords);
          }}
        />
      )}
      <View style={styles.buttonContainer}>
        <Button title="Confirmar localização" onPress={handleConfirm} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  buttonContainer: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 70 : 50, // botão seguro acima da barra
    left: 20,
    right: 20,
  },
});
