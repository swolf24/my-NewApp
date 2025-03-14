import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { auth } from '../firebaseConfig';
import { useNavigation } from '@react-navigation/native';

/*
  Displays the current user's email.
  Includes a button to navigate back to the Home screen.
*/
const UserScreen = () => {
  const navigation = useNavigation();
  const userEmail = auth.currentUser ? auth.currentUser.email : "No Email";

  return (
    <View style={styles.container}>
      <Text style={styles.emailText}>Email: {userEmail}</Text>
      <Button title="Back to Main" onPress={() => navigation.navigate('Home')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  emailText: { fontSize: 24, marginBottom: 20 },
});

export default UserScreen;

