import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";

import { ThemeContext } from "../../contexts/SettingsContexts/ThemeContext";
import FontAwesome6 from "@react-native-vector-icons/fontawesome6";

export default function TipJar() {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <View style={styles.headerContainer}>
        <FontAwesome6
          name="heart"
          style={styles.headerEmoji}
          color={theme.text}
        />
        <Text style={[styles.headerText, { color: theme.text }]}>Tip Jar</Text>
        <Text style={[styles.subheaderText, { color: theme.text }]}>
          Hydra is a labor of love maintained by a solo developer. Your
          contributions are what allow Hydra to exist. Thank you so much for
          using and supporting Hydra!
        </Text>
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
    paddingHorizontal: 20,
  },
  headerEmoji: {
    fontSize: 60,
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
    textAlign: "center",
  },
  noticeText: {
    fontSize: 14,
    lineHeight: 20,
    margin: 20,
    textAlign: "center",
  },
});
