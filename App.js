// import "react-native-gesture-handler";
// import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import Home from "./screens/Home";
import ShowStudent from "./screens/ShowStudent";
import ShowSport from "./screens/ShowSports";
import ShowSchedule from "./screens/ShowSchedule";
import ShowMonthly from "./screens/ShowMontly";
import ShowActivity from "./screens/ShowActivity";
import Information from "./screens/Information";

export default function App() {
  const Stack = createStackNavigator();

  const screenOptions = {
    headerTitleAlign: "center",
    headerStyle: {
      backgroundColor: "#75b403",
    },
    headerTintColor: "#000000",
    headerTitleStyle: {
      fontWeight: "bold",
    },
  };

  function MyStack() {
    return (
      <Stack.Navigator screenOptions={screenOptions}>
        <Stack.Screen
          name="home"
          component={Home}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="MonthlyStudent"
          component={ShowStudent}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Sport"
          component={ShowSport}
          options={{
            headerTitle: "Deportes",
          }}
        />

        <Stack.Screen
          name="Schedule"
          component={ShowSchedule}
          options={{
            headerTitle: "Horarios",
          }}
        />

        <Stack.Screen
          name="Monthly"
          component={ShowMonthly}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Activity"
          component={ShowActivity}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Information"
          component={Information}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  }

  return (
    <NavigationContainer>
      {/* <View style={styles.container}>
        <Apps />
      </View> */}
      <MyStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
