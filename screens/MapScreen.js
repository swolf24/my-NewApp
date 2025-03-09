import React from "react";
import { View } from "react-native";
import MapView, { Marker } from "react-native-maps";

const MapScreen = ({ route }) => {
    const { location } = route.params;
    
    return (
        <View style={{ flex: 1 }}>
            <MapView
                style={{ flex: 1 }}
                initialRegion={{
                    latitude: location.lat || 37.7749,
                    longitude: location.lng || -122.4194,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                }}
            >
                <Marker coordinate={{ latitude: location.lat, longitude: location.lng }} title={location.name} />
            </MapView>
        </View>
    );
};

export default MapScreen;
