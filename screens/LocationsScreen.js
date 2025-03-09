import { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

const LocationsScreen = ({ navigation }) => {
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        const fetchLocations = async () => {
            const querySnapshot = await getDocs(collection(db, "locations"));
            setLocations(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        };
        fetchLocations();
    }, []);
    
    const handleLogout = async () => {
        await AsyncStorage.removeItem("user");
        navigation.replace("Login");
    };

    return (
        <View>
            <FlatList
                data={locations}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate("Map", { location: item })}>
                        <Text>{item.name} - {item.rating}/5</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

export default LocationsScreen;
