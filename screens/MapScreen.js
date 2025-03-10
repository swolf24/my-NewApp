import React from "react";
import { View } from "react-native";
import MapView, { Marker } from "react-native-maps";

const MapScreen = ({ route }) => {
  // Falls kein Standort übergeben wird, verwende Helsinki
  const location = route.params?.location || { lat: 60.1699, lng: 24.9384, name: "Helsinki, Finland" };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: location.lat,
          longitude: location.lng,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <Marker 
          coordinate={{ latitude: location.lat, longitude: location.lng }} 
          title={location.name} 
        />
      </MapView>
    </View>
  );
};

export default MapScreen;
