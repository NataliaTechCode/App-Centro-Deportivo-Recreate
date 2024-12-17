// eslint-disable-next-line import/namespace
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import LogoInformation from "../components/logo/information";

export default function Information() {
  return (
    <ImageBackground
      source={require("../assets/fondo.jpeg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <View style={{ marginBottom: 20 }}>
          <Text style={styles.title}>Información</Text>
          {/* Cuadro con la información */}
          <LogoInformation></LogoInformation>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Dirección</Text>
          <Text style={styles.infoText}>
            B/San Geronimo C/Bernardo Bilbao #655, Tarija, Bolivia
          </Text>
          <View style={styles.line} />
          <Text style={styles.infoTitle}>Teléfono</Text>
          <Text style={styles.infoText}>76183836</Text>
          <View style={styles.line} />
          <Text style={styles.infoTitle}>Email</Text>
          <Text style={styles.infoText}>claudia_tss@hotmail.com</Text>
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
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 20,
    textAlign: "center",
  },
  infoBox: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    color: "#000",
    marginBottom: 20,
  },
  line: {
    borderBottomWidth: 1,
    borderColor: "#615D5D", // Gris claro
    marginVertical: 0, // Espacio arriba y abajo
    width: "100%",
  },
});
