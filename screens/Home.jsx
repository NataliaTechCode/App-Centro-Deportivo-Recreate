import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Apps from "../components/Images";
import SvgSport from "../components/logo/sport";
import SvgCalendar from "../components/logo/calendar";
import SvgNotices from "../components/logo/notices";
import LogoInformation from "../components/logo/information";

export default function Inicio(props) {
  return (
    <View style={styles.container}>
      {/* Barra superior con fondo verde */}
      {/* <View style={styles.header}>
        <Text style={styles.headerText}>Centro Deportivo Recreate</Text>
      </View> */}

      {/* Contenido principal con botones */}
      <View style={styles.container}>
        <Apps />
      </View>
      <View style={styles.content}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => props.navigation.navigate("Sport")}
          >
            <SvgSport style={styles.logo} />
            <Text style={styles.buttonText}>Deportes</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => props.navigation.navigate("Monthly")}
          >
            <SvgCalendar style={styles.logomonthly} />
            <Text style={styles.buttonText}>Mensualidad</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => props.navigation.navigate("Activity")}
          >
            <SvgNotices style={styles.logo} />
            <Text style={styles.buttonText}>Avisos</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => props.navigation.navigate("Information")}
          >
            <LogoInformation style={styles.logo} />
            <Text style={styles.buttonText}>Sobre Nosotros</Text>
          </TouchableOpacity>
        </View>
        <StatusBar style="light" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#75B403",
    width: "100%",
    height: 100,
    paddingTop: 40,
    paddingBottom: 10,
    alignItems: "center",
  },
  headerText: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 10,
  },
  button: {
    backgroundColor: "#FFD391",
    width: 160,
    height: 160,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    margin: 5,
  },
  buttonText: {
    position: "absolute",
    bottom: 10,
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    width: "100%",
  },
  logo: {
    position: "absolute",
    top: 15,
    textAlign: "center",
  },

  logomonthly: {
    position: "absolute",
    top: -35,
    textAlign: "center",
  },
});
