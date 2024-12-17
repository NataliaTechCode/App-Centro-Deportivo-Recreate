// eslint-disable-next-line import/namespace
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import LogoCalendar from "../components/logo/calendar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Alert } from "react-native";
import appFirebase from "../firebaseConfig";
import {
  getFirestore,
  collection,
  query,
  getDocs,
  where,
} from "firebase/firestore";

const db = getFirestore(appFirebase);

export default function ShowMonthly(props) {
  const initialState = { CI: "" };
  const [state, setState] = useState(initialState);

  const handleChangeText = (value, name) => {
    setState({ ...state, [name]: value });
  };

  // Función para validar el CI en Firebase
  const validateCIAndNavigate = async () => {
    const CIString = state.CI.toString();
    if (!CIString) {
      Alert.alert(
        "El estudiante no está inscrito",
        "Verifica los datos o intenta nuevamente. Consulta los horarios de los deportes y contáctanos para completar la inscripción."
      );
      return;
    }

    try {
      // Consulta a Firebase
      const q = query(collection(db, "monthly"), where("ci", "==", CIString));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        // Si no hay resultados
        Alert.alert(
          "El estudiante no está inscrito",
          "Verifica los datos o intenta nuevamente. Consulta los horarios de los deportes y contáctanos para completar la inscripción."
        );
      } else {
        // Si hay datos, realiza la navegación
        props.navigation.navigate("MonthlyStudent", { CI: state.CI });
      }
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Error",
        "Hubo un problema al buscar el CI. Intenta más tarde."
      );
    }
  };

  return (
    <ImageBackground
      source={require("../assets/fondo.jpeg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Mensualidad</Text>
        <LogoCalendar />

        <View style={styles.card}>
          <Text style={styles.label}>CI:</Text>

          <TextInput
            style={styles.input}
            placeholder="CI"
            placeholderTextColor="#8D8D8D"
            keyboardType="numeric"
            onChangeText={(value) => {
              const numericValue = value.replace(/[^0-9]/g, "");
              handleChangeText(
                numericValue === "" ? "" : Number(numericValue),
                "CI"
              );
            }}
            value={state.CI.toString()}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={validateCIAndNavigate}
          >
            <Text style={styles.buttonText}>Ingresar</Text>
          </TouchableOpacity>
        </View>

        <StatusBar style="auto" />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    color: "#8D8D8D",
    marginBottom: 10,
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#8D8D8D",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: "#000",
  },
  button: {
    width: "100%",
    height: 40,
    backgroundColor: "#188fd1",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});
