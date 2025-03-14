import { useState } from "react";
import { View, TextInput, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!email || !password) {
      setError("❌ Pleas add an Mailadress or Password");
      return;
    }
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigation.replace("Login");
    } catch (err) {
      setError("❌ Regestration failed" + err.message);
      console.error("Sign-Up fail:", err.code, err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Email" 
        autoCapitalize="none" 
        onChangeText={setEmail} 
      />
      <TextInput 
        style={styles.input} 
        placeholder="Password" 
        secureTextEntry 
        autoCapitalize="none" 
        onChangeText={setPassword} 
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" />
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    backgroundColor: "#f4f4f4", 
    padding: 20 
  },
  title: { 
    fontSize: 28, 
    fontWeight: "bold", 
    marginBottom: 20, 
    color: "#333" 
  },
  input: { 
    width: "90%", 
    height: 50, 
    backgroundColor: "#fff", 
    marginBottom: 10, 
    paddingHorizontal: 15, 
    borderRadius: 8, 
    fontSize: 16 
  },
  errorText: { 
    color: "red", 
    fontSize: 14, 
    marginBottom: 10 
  },
  button: { 
    backgroundColor: "#007AFF", 
    width: "90%", 
    height: 50, 
    justifyContent: "center", 
    alignItems: "center", 
    borderRadius: 8 
  },
  buttonText: { 
    color: "#fff", 
    fontSize: 18, 
    fontWeight: "bold" 
  },
});

export default SignUpScreen;