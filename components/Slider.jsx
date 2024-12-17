import React, { useEffect, useCallback, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Animated,
  Dimensions,
} from "react-native";
import { data } from "../data/information";

const { width } = Dimensions.get("window");

export default function AnimatedSlider() {
  const [active, setActive] = useState(0);
  const animatedValues = {
    topAnimation: useRef(new Animated.Value(-50)).current,
    bottomAnimation: useRef(new Animated.Value(50)).current,
    scale: useRef(new Animated.Value(0)).current,
  };

  const { topAnimation, bottomAnimation, scale } = animatedValues;
  const images = data;

  useEffect(() => {
    topAnimation.setValue(-50);
    bottomAnimation.setValue(50);
    scale.setValue(0);
    handleAnimated();
  }, [topAnimation, bottomAnimation, scale, handleAnimated]);

  const handleAnimated = useCallback(() => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 1,
        friction: 5,
        delay: 0.98,
        useNativeDriver: true,
      }),
      Animated.timing(topAnimation, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(bottomAnimation, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, [scale, topAnimation, bottomAnimation]);

  useEffect(() => {
    topAnimation.setValue(-50);
    bottomAnimation.setValue(50);
    scale.setValue(0);
    handleAnimated();
  }, [topAnimation, bottomAnimation, scale, handleAnimated]);

  const onSlide = ({ nativeEvent }) => {
    const slide = Math.ceil(
      nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
    );
    setActive(slide);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.sliderContainer}>
        <ScrollView
          pagingEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={onSlide}
          style={styles.scrollView}
        >
          {images.map((item, i) => (
            <View key={item.id} style={styles.slide}>
              <Animated.View
                style={[
                  styles.headerContent,
                  { transform: [{ translateY: topAnimation }] },
                  { opacity: active === i ? 1 : 0 },
                ]}
              >
                <Text style={styles.headerTitle}>{item.title}</Text>
              </Animated.View>
              <Animated.View
                style={[
                  styles.imageContent,
                  { transform: [{ scale: scale }] },
                  { opacity: active === i ? 1 : 0 },
                ]}
              >
                <Image source={{ uri: item.url }} style={styles.image} />
              </Animated.View>
              <Animated.View
                style={[
                  styles.footerContent,
                  { transform: [{ translateY: bottomAnimation }] },
                  { opacity: active === i ? 1 : 0 },
                ]}
              >
                <Text style={styles.footerSubtitle}>{item.subtitle}</Text>
              </Animated.View>
            </View>
          ))}
        </ScrollView>
        <View style={styles.pagination}>
          {images.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                {
                  backgroundColor: i === active ? "#4392D3" : "#DADADA",
                },
              ]}
            />
          ))}
        </View>
        <TouchableOpacity style={styles.continueButton}>
          <Text
            style={[
              styles.continueText,
              { color: active === images.length - 1 ? "#4392D3" : "#DADADA" },
            ]}
          >
            Continuar
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "#fff",
  },
  sliderContainer: {
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  scrollView: {
    flexGrow: 1,
  },
  slide: {
    width,
    alignItems: "center",
  },
  headerContent: {
    marginVertical: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#383838",
    textAlign: "center",
  },
  imageContent: {
    marginVertical: 20,
    alignItems: "center",
  },
  image: {
    width: 275,
    height: 275,
    resizeMode: "contain",
  },
  footerContent: {
    marginVertical: 10,
  },
  footerSubtitle: {
    fontSize: 18,
    color: "#383838",
    textAlign: "center",
  },
  pagination: {
    flexDirection: "row",
    position: "absolute",
    bottom: 50,
    alignItems: "center",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  continueButton: {
    position: "absolute",
    bottom: 10,
    alignSelf: "center",
  },
  continueText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
