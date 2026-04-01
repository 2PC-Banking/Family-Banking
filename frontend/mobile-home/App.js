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
  const [screen, setScreen] = useState("login"); // 'login' | 'home' | 'transfer' | 'otp' | 'success' | 'history' | 'tx_detail'

  // 1. State lưu dữ liệu luồng chuyển tiền (Transfer -> OTP -> Success)
  const [transferPayload, setTransferPayload] = useState(null);

  // 2. State lưu dữ liệu chi tiết của 1 giao dịch khi xem từ Lịch sử (History)
  const [selectedTx, setSelectedTx] = useState(null);

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
          onConfirm={(payload) => {
            // Hứng dữ liệu người dùng vừa nhập và chuyển sang OTP
            setTransferPayload(payload);
            setScreen("otp");
          }}
        />
      )}

      {screen === "otp" && (
        <OTPScreen
          transferData={transferPayload} // Truyền dữ liệu chuyển tiền vào OTP
          onBack={() => setScreen("transfer")}
          onConfirm={(result) => {
            // Cập nhật lại dữ liệu (có thêm transactionId từ server) và qua Success
            setTransferPayload(result);
            setScreen("success");
          }}
        />
      )}

      {screen === "success" && (
        <SuccessScreen
          transactionData={transferPayload} // Truyền dữ liệu vào màn Success hiển thị
          onNewTransaction={() => {
            setTransferPayload(null); // Xóa data cũ
            setScreen("transfer");
          }}
          onHome={() => {
            setTransferPayload(null); // Xóa data cũ
            setScreen("home");
          }}
        />
      )}

      {screen === "history" && (
        <HistoryScreen
          onBack={() => setScreen("home")}
          onNavigate={(s, params) => {
            // Nếu bấm vào 1 giao dịch, lưu thông tin giao dịch đó lại
            if (s === "tx_detail") {
              setSelectedTx(params);
            }
            setScreen(s);
          }}
        />
      )}

      {screen === "tx_detail" && (
        <TransactionDetailScreen
          transaction={selectedTx} // Truyền dữ liệu vào màn Chi tiết hiển thị
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
