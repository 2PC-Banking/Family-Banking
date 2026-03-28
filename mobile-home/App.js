import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import {
  useFonts,
  Manrope_400Regular,
  Manrope_600SemiBold,
  Manrope_700Bold,
  Manrope_800ExtraBold,
} from "@expo-google-fonts/manrope";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";

import LoginScreen from "./src/screens/LoginScreen";
import HomeScreen from "./src/screens/HomeScreen";
import TransferScreen from "./src/screens/TransferScreen";
import OTPScreen from "./src/screens/OTPScreen";
import SuccessScreen from "./src/screens/SuccessScreen";
import HistoryScreen from "./src/screens/HistoryScreen";
import TransactionDetailScreen from "./src/screens/TransactionDetailScreen";
import { colors } from "./src/theme/colors";

export default function App() {
  const [screen, setScreen] = useState("home"); // 'login' | 'home' | 'transfer' | 'otp' | 'success' | 'history' | 'tx_detail'

  const [fontsLoaded] = useFonts({
    Manrope_400Regular,
    Manrope_600SemiBold,
    Manrope_700Bold,
    Manrope_800ExtraBold,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <>
      <StatusBar style="dark" />
      {screen === "login" && <LoginScreen onLogin={() => setScreen("home")} />}
      {screen === "home" && (
        <HomeScreen
          onLogout={() => setScreen("login")}
          onNavigate={(s) => setScreen(s)}
        />
      )}
      {screen === "transfer" && (
        <TransferScreen
          onBack={() => setScreen("home")}
          onConfirm={() => setScreen("otp")}
        />
      )}
      {screen === "otp" && (
        <OTPScreen
          onBack={() => setScreen("transfer")}
          onConfirm={() => setScreen("success")}
        />
      )}
      {screen === "success" && (
        <SuccessScreen
          onNewTransaction={() => setScreen("transfer")}
          onHome={() => setScreen("home")}
        />
      )}
      {screen === "history" && (
        <HistoryScreen
          onBack={() => setScreen("home")}
          onNavigate={(s) => setScreen(s)}
        />
      )}
      {screen === "tx_detail" && (
        <TransactionDetailScreen
          onBack={() => setScreen("history")}
          onNewTransaction={() => setScreen("transfer")}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f8f9fa",
  },
});
