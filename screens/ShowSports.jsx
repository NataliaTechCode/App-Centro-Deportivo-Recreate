import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";

// Importación Firebase
import appFirebase from "../firebaseConfig";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

const db = getFirestore(appFirebase);

export default function ShowSport() {
  const [sport, setSport] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    const getSport = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "sport"));
        const docs = [];
        querySnapshot.forEach((doc) => {
          const { idsport, namesport, imageUrl } = doc.data();
          docs.push({
            id: doc.id,
            idsport,
            namesport,
            imageUrl,
          });
        });
        setSport(docs);
      } catch (error) {
        console.log(error);
      }
    };
    getSport();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.sportContainer}>
        {sport.map((item) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Schedule", { sportName: item.namesport })
            }
            key={item.id}
            style={styles.card}
          >
            <Image
              source={{
                uri:
                  item.imageUrl ||
                  "https://img.freepik.com/free-photo/sports-tools_53876-138077.jpg",
              }}
              style={styles.image}
            />
            <Text style={styles.cardText}>{item.namesport}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  Boton: {
    backgroundColor: "cyan",
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    marginBottom: 20,
  },
  TextBoton: {
    fontSize: 18,
  },
  TextoTitulo: {
    textAlign: "center",
    marginTop: 10,
    marginBottom: 20,
    fontSize: 18,
    fontWeight: "bold",
  },
  sportContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  card: {
    backgroundColor: "#FFD391",
    borderRadius: 10,
    marginBottom: 20,
    overflow: "hidden",
    width: 350,
    height: 160,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "70%",
  },
  cardText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    padding: 5,
  },
});
