import { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Navigation from "./Navigation";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);


useEffect(() => {
  const checkLoginStatus = async () => {
      try {
          const user = await AsyncStorage.getItem("user");
          setIsLoggedIn(!!user); // Converts to true if user exists
      } catch (error) {
          console.error("Error fetching login status", error);
      }
      setIsLoading(false);
  };
  checkLoginStatus();
}, []);

if (isLoading) {
  return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="#0000ff" />
      </View>
  );
}
return <Navigation isLoggedIn={isLoggedIn} />;
};
export default App;