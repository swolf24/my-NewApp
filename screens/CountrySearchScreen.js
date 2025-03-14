import React, { useState, useEffect } from "react";
import { View, TextInput, FlatList, Text, Image, StyleSheet } from "react-native";

export default function CountrySearchScreen() {
  const [query, setQuery] = useState("");
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState("");

  const fetchCountries = async () => {
    try {
      const response = await fetch("https://restcountries.com/v3.1/all");
      if (!response.ok) throw new Error("API response not ok");
      const data = await response.json();
      setCountries(data);
      setError("");
    } catch (err) {
      console.error("Error fetching countries:", err);
      setError("Error fetching countries. Please try again.");
      setCountries([]);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const filtered = countries.filter((c) => {
    const lowerQ = query.toLowerCase();
    const countryName = c.name?.common?.toLowerCase() || "";
    const capitalName = c.capital?.[0]?.toLowerCase() || "";
    return countryName.includes(lowerQ) || capitalName.includes(lowerQ);
  });

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter country or capital"
        value={query}
        onChangeText={setQuery}
        style={styles.input}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      {query.length > 0 && filtered.length === 0 ? (
        <Text>No countries found for "{query}".</Text>
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.cca3 || item.name.common}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.itemText}>
                {item.name.common} - {item.capital?.[0] || "No capital"}
              </Text>
              {item.flags && item.flags.png ? (
                <Image source={{ uri: item.flags.png }} style={styles.flagImage} />
              ) : null}
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  input: { borderWidth: 1, marginBottom: 8, padding: 8, borderRadius: 5 },
  errorText: { color: "red", marginVertical: 8 },
  itemContainer: { marginVertical: 4, flexDirection: "row", alignItems: "center" },
  itemText: { flex: 1 },
  flagImage: { width: 50, height: 30, marginLeft: 8 },
});