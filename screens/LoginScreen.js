import { useState } from "react";
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            await AsyncStorage.setItem("user", JSON.stringify(userCredential.user));
            navigation.replace("Home");
        } catch (err) {
            setError("Invalid login credentials.");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>

            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={setEmail}
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#999"
                secureTextEntry
                autoCapitalize="none"
                onChangeText={setPassword}
            />

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text style={{ marginTop: 10, color: "#007AFF" }}>Don't have an account? Sign up</Text>
            </TouchableOpacity>
            </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f4f4f4",
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#333",
    },
    input: {
        width: "90%",
        height: 50,
        backgroundColor: "#fff",
        marginBottom: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
        fontSize: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 2,
    },
    errorText: {
        color: "red",
        fontSize: 14,
        marginBottom: 10,
    },
    button: {
        backgroundColor: "#007AFF",
        width: "90%",
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
});

export default LoginScreen;
