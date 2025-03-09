import { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

const SignUpScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSignUp = async () => {
        try {
            if (!email || !password) {
                setError("Please enter both email and password.");
                return;
            }
    
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            console.log("User created successfully:", userCredential.user);
            navigation.replace("Login"); // Redirect to login after successful sign-up
        } catch (err) {
            console.error("Sign-Up Error:", err.code, err.message); // Debugging log
    
            if (err.code === "auth/email-already-in-use") {
                setError("This email is already in use. Try logging in instead.");
            } else if (err.code === "auth/weak-password") {
                setError("Password should be at least 6 characters.");
            } else if (err.code === "auth/invalid-email") {
                setError("Please enter a valid email address.");
            } else if (err.code === "auth/network-request-failed") {
                setError("Network error. Please check your internet connection.");
            } else {
                setError("Sign-up failed: " + err.message); // Show full Firebase error
            }
        }
    };
    
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign Up</Text>
            <TextInput style={styles.input} placeholder="Email" autoCapitalize="none" onChangeText={setEmail} />
            <TextInput style={styles.input} placeholder="Password" secureTextEntry autoCapitalize="none" onChangeText={setPassword} />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#f4f4f4", padding: 20 },
    title: { fontSize: 28, fontWeight: "bold", marginBottom: 20, color: "#333" },
    input: { width: "90%", height: 50, backgroundColor: "#fff", marginBottom: 10, paddingHorizontal: 15, borderRadius: 8, fontSize: 16 },
    errorText: { color: "red", fontSize: 14, marginBottom: 10 },
    button: { backgroundColor: "#007AFF", width: "90%", height: 50, justifyContent: "center", alignItems: "center", borderRadius: 8 },
    buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});

export default SignUpScreen;
