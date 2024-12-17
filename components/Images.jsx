import React from "react";
import { View, FlatList, Image, StyleSheet } from "react-native";

const Apps = () => {
  const images = [
    { id: 1, src: require("../assets/Image_1.jpeg") },
    { id: 2, src: require("../assets/Image_2.jpeg") },
    { id: 3, src: require("../assets/Image_3.jpeg") },
    { id: 4, src: require("../assets/Image_4.jpeg") },
  ];

  return (
    <View style={styles.container}>
      {/* Cabecera con texto y línea verde */}
      <View style={styles.header}>
        {/* <Text style={styles.headerText}>Centro Deportivo Recreate</Text> */}
        <Image
          source={require("../assets/LogoRecreate.png")}
          style={styles.image}
        />
      </View>
      <View style={styles.greenLine} />

      <FlatList
        horizontal
        data={images}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Image
            source={item.src}
            style={styles.slider}
            resizeMode="stretch" // Asegura que no se recorte la imagen
          />
        )}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 0, // Asegura que no haya margen
  },
  header: {
    backgroundColor: "#75B403", // Fondo verde
    width: 450, // Asegura que el encabezado cubra todo el ancho
    height: 140, // Ajusta la altura del encabezado
    justifyContent: "center",
    alignItems: "center", // Centra el texto
  },
  greenLine: {
    width: "100%", // Asegura que la línea verde cubra todo el ancho
    height: 3, // Altura de la línea
    // backgroundColor: "#75B403", // Línea verde
  },
  slider: {
    width: 400, // Ancho fijo
    height: 300, // Alto fijo
    margin: 10, // Espaciado entre imágenes
  },
  image: {
    width: 400, // Ancho fijo
    height: 200, // Alto fijo
    marginTop: 20,
  },
});

export default Apps;
