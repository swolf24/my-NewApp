import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebaseConfig'; // adjust the path if needed

const UserScreen = () => {
  const navigation = useNavigation();
  const userEmail = auth.currentUser ? auth.currentUser.email : "No Email";

  return (
    <View style={styles.container}>
      <Text style={styles.emailText}>Email: {userEmail}</Text>
      <Button title="Back to Main" onPress={() => navigation.navigate("Home")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: '#fff'
  },
  emailText: { 
    fontSize: 24, 
    marginBottom: 20 
  },
});

export default UserScreen;
