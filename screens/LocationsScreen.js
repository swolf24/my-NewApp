import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const LocationsScreen = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = auth.currentUser;
  const navigation = useNavigation();

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, "locations"), where("uid", "==", user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const locs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setLocations(locs);
      setLoading(false);
    }, (error) => {
      console.log("Error fetching locations: ", error);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [user]);

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {locations.length === 0 ? (
        <Text style={styles.emptyText}>No locations added yet.</Text>
      ) : (
        <FlatList
          data={locations}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.itemContainer}
              onPress={() => navigation.navigate("LocationMap", { location: item })}
            >
              <View style={styles.itemHeader}>
                <Text style={styles.itemTitle}>{item.city}</Text>
                <View style={styles.starsRow}>
                  {[1, 2, 3, 4, 5].map(i => (
                    <Ionicons
                      key={i}
                      name={i <= Number(item.rating) ? "star" : "star-outline"}
                      size={16}
                      color="#FFD700"
                    />
                  ))}
                </View>
              </View>
              {item.description && (
                <Text style={styles.itemDescription}>{item.description}</Text>
              )}
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#f4f4f4" 
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#666"
  },
  itemContainer: {
    backgroundColor: "#fff",
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  starsRow: {
    flexDirection: "row",
  },
  itemDescription: {
    marginTop: 4,
    color: "#555",
  },
});

export default LocationsScreen;