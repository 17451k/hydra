import React, { useContext } from "react";
import { StyleSheet, Text, Image, View } from "react-native";

import { ThemeContext } from "../../contexts/SettingsContexts/ThemeContext";
import HydraProFeatureList from "../../components/UI/HydraProFeatureList";

export default function HydraPro() {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <View style={styles.headerContainer}>
        <Image
          source={require("../../assets/images/HydraPro.png")}
          style={styles.proIcon}
          resizeMode="contain"
        />
        <Text
          style={[
            styles.headerText,
            {
              color: theme.text,
            },
          ]}
        >
          Hydra Pro
        </Text>
        <Text
          style={[
            styles.subheaderText,
            {
              color: theme.text,
            },
          ]}
        >
          Unlock the full potential of Hydra
        </Text>
      </View>

      <View style={styles.featuresContainer}>
        <HydraProFeatureList />
      </View>

      <Text style={[styles.noticeText, { color: theme.subtleText }]}>
        In-app purchases are not available in this build. Hydra Pro features are
        disabled. Support the original developer at https://hydraapp.io.
      </Text>
    </>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: "center",
    paddingVertical: 30,
  },
  proIcon: {
    height: 100,
    marginBottom: 15,
  },
  headerText: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subheaderText: {
    fontSize: 16,
    opacity: 0.8,
    marginBottom: 8,
  },
  featuresContainer: {
    paddingHorizontal: 16,
  },
  noticeText: {
    fontSize: 14,
    lineHeight: 20,
    margin: 20,
    textAlign: "center",
  },
});
