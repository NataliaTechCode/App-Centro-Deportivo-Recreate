// eslint-disable-next-line import/namespace
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ImageBackground } from "react-native";
import appFirebase from "../firebaseConfig";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import LogoNotices from "../components/logo/notices";

const db = getFirestore(appFirebase);

export default function ShowActivity() {
  const [activity, setActivity] = useState([]);

  useEffect(() => {
    const getSport = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "activity"));
        const docs = [];
        querySnapshot.forEach((doc) => {
          const { dateActivity, description, idactivity, nameactivity } =
            doc.data();
          docs.push({
            id: doc.id,
            dateActivity,
            description,
            idactivity,
            nameactivity,
          });
        });
        setActivity(docs); // Actualiza el estado con los datos correctos
      } catch (error) {
        console.log(error);
      }
    };
    getSport();
  }, []);

  return (
    <ImageBackground
      source={require("../assets/fondo.jpeg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.title}>Avisos</Text>
        <LogoNotices></LogoNotices>
        {activity.length > 0 ? (
          activity.map((activityItem) => (
            <View key={activityItem.id} style={styles.activityCard}>
              <Text style={styles.nameActivity}>
                {activityItem.nameactivity}
              </Text>
              <Text style={styles.description}>{activityItem.description}</Text>
            </View>
          ))
        ) : (
          <Text>No activities available</Text>
        )}
        <StatusBar style="auto" />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "black",
  },
  activityCard: {
    width: "80%",
    padding: 20,
    marginVertical: 10,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  nameActivity: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#f9a11b",
  },
  description: {
    fontSize: 16,
    marginTop: 10,
    color: "black",
  },
});
