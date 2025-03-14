import React, { useState, useCallback } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, ActivityIndicator, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { addDoc, collection } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const AddLocationScreen = () => {
  const [city, setCity] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState('');
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [loadingGeo, setLoadingGeo] = useState(false);
  const navigation = useNavigation();

  // Clear form fields when the screen is focused.
  useFocusEffect(
    useCallback(() => {
      setCity('');
      setDescription('');
      setRating('');
      setLat(null);
      setLng(null);
    }, [])
  );

  // Get coordinates using Nominatim API
  const getCoordinates = async (cityName) => {
    try {
      setLoadingGeo(true);
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(cityName)}&format=json`
      );
      const data = await response.json();
      setLoadingGeo(false);
      if (data && data.length > 0) {
        return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
      } else {
        return { lat: null, lng: null };
      }
    } catch (error) {
      console.error("Geocoding error:", error);
      setLoadingGeo(false);
      return { lat: null, lng: null };
    }
  };

  // Update coordinates when the city input changes
  const handleCityChange = async (text) => {
    setCity(text);
    if (text.length > 2) {
      const coords = await getCoordinates(text);
      setLat(coords.lat);
      setLng(coords.lng);
    } else {
      setLat(null);
      setLng(null);
    }
  };
  
  // Add a new location to Firestore and navigate to the Locations overview
  const handleAddLocation = async () => {
    Keyboard.dismiss();
    Alert.alert("Successfully location added");
    
    if (!city || !rating || lat === null || lng === null) {
      Alert.alert("Please fill in all fields and ensure a valid city is provided.");
      return;
    }
    try {
      const user = auth.currentUser;
      if (!user) {
        Alert.alert("User not logged in");
        return;
      }
      await addDoc(collection(db, "locations"), {
        city,
        description,
        rating: Number(rating),
        lat,
        lng,
        uid: user.uid,
      });
      
      // Reset input fields
      setCity('');
      setDescription('');
      setRating('');
      setLat(null);
      setLng(null);
      
      
    } catch (error) {
      console.error("Error adding location:", error);
      Alert.alert("Error adding location", error.message);
    }
  };
  

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.header}>Add New Location</Text>
          <TextInput
            style={styles.input}
            placeholder="City"
            value={city}
            onChangeText={handleCityChange}
          />
          {loadingGeo && (
            <ActivityIndicator size="small" color="#000" style={{ marginVertical: 8 }} />
          )}
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
          />
          <TextInput
            style={styles.input}
            placeholder="Rating (1-5)"
            value={rating}
            onChangeText={setRating}
            keyboardType="numeric"
          />
          <Button title="Add Location" onPress={handleAddLocation} />
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: "#f4f4f4",
    justifyContent: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    marginBottom: 12,
    borderRadius: 6,
    borderColor: "#ccc",
    borderWidth: 1,
  },
});

export default AddLocationScreen;