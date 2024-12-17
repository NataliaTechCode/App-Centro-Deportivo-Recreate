import { StyleSheet, Text, View, ScrollView } from "react-native";

// Importación Firebase
import appFirebase from "../firebaseConfig";
import {
  getFirestore,
  collection,
  query,
  getDocs,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import LogoClock from "../components/logo/clock";
import LogoUser from "../components/logo/user";

const db = getFirestore(appFirebase);

export default function ShowSchedule({ route }) {
  const { sportName } = route.params;
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    const getList = async () => {
      try {
        const q = query(
          collection(db, "schedule"),
          where("sport", "==", sportName)
        );
        const querySnapshot = await getDocs(q);
        const docs = [];
        querySnapshot.forEach((doc) => {
          const {
            idschedule,
            coach,
            dayWeek,
            endtime,
            limitStudents,
            sport,
            starttime,
            totalstudents,
          } = doc.data();
          docs.push({
            id: doc.id,
            idschedule,
            coach,
            dayWeek,
            endtime,
            limitStudents,
            sport,
            starttime,
            totalstudents,
          });
        });
        setSchedule(docs);
      } catch (error) {
        console.log(error);
      }
    };
    getList();
  }, [sportName]);

  // Función para formatear hora
  const formatTime = (time) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(new Date(time));
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        {schedule.length > 0 ? (
          schedule.map((schedule) => {
            // Verificar disponibilidad
            const availability =
              schedule.totalstudents >= schedule.limitStudents
                ? "Ocupado"
                : "Disponible";

            return (
              <View key={schedule.id} style={styles.scheduleContainer}>
                <LogoClock style={styles.logoClock}></LogoClock>
                <View style={styles.leftSection}>
                  <View>
                    <Text style={styles.timeText}>
                      {formatTime(schedule.starttime)}
                    </Text>
                    <Text style={styles.timeText}>
                      {formatTime(schedule.endtime)}
                    </Text>
                  </View>
                </View>

                <View style={styles.centerSection}>
                  <LogoUser style={styles.logoUser} />
                  <View style={styles.coachContainer}>
                    <Text style={styles.coachLabel}>Entrenador:</Text>
                    <Text style={styles.coachText}>{schedule.coach}</Text>
                  </View>
                </View>

                <View style={styles.rightSection}>
                  {schedule.dayWeek.map((day, index) => (
                    <Text key={index} style={styles.dayText}>
                      {day}
                    </Text>
                  ))}
                </View>
                <View>
                  <Text
                    style={[
                      styles.availabilityButton,
                      availability === "Ocupado"
                        ? styles.occupiedButton
                        : styles.availableButton,
                    ]}
                  >
                    {availability}
                  </Text>
                </View>
              </View>
            );
          })
        ) : (
          <Text style={styles.noScheduleText}>No hay horarios registrados</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  scheduleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f9dc1c",
    padding: 10,
    marginBottom: 10,
    width: "100%",
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  timeText: {
    marginLeft: 0,
    fontSize: 15,
    fontWeight: "bold",
  },
  centerSection: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start", // Ajustado para que el contenido se alinee más a la izquierda
    flex: 2,
  },
  logoUser: {
    marginRight: 5, // Espaciado para separar el LogoUser de los otros elementos
  },
  coachContainer: {
    marginLeft: 0,
    width: 120,
  },
  coachLabel: {
    fontSize: 14,
    fontWeight: "bold",
  },
  coachText: {
    fontSize: 14,
  },
  rightSection: {
    alignItems: "flex-start",
    flex: 1,
  },
  dayText: {
    fontSize: 15,
    fontWeight: "bold",
  },
  availabilityButton: {
    margin: 5,
    fontSize: 10,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  occupiedButton: {
    backgroundColor: "red",
    color: "white",
  },
  availableButton: {
    backgroundColor: "#188fd1",
    color: "white",
  },
  noScheduleText: {
    textAlign: "center",
    fontSize: 35,
    fontWeight: "bold",
  },
  logoClock: {
    marginRight: 5, // Espaciado entre el logo del reloj y el texto de los horarios
  },
});
