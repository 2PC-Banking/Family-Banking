import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { useEffect } from "react"; // Nhớ import useEffect ở trên cùng

// Import API chuyển tiền
import { transferAPI } from "../services/apiService";

const fontFamily = {
  headlineExtraBold: "Manrope_800ExtraBold",
  headlineBold: "Manrope_700Bold",
  headlineSemiBold: "Manrope_600SemiBold",
  bodyRegular: "Inter_400Regular",
  bodyMedium: "Inter_500Medium",
  bodySemiBold: "Inter_600SemiBold",
  bodyBold: "Inter_700Bold",
};

export default function OTPScreen({ onBack, onConfirm, transferData }) {
  // Reset lại mảng trống (Không để sẵn "5" và "8" nữa)
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);

  // ... (bên trong component OTPScreen)
  useEffect(() => {
    // Nếu mảng otp không còn ô nào trống ("") thì tự động gọi API
    if (!otp.includes("") && !isLoading) {
      handleFinalConfirm();
    }
  }, [otp]); // Lắng nghe mỗi khi mảng otp thay đổi

  // Tạo string hiển thị sdt/số tài khoản bị che (Ví dụ: 0912****99)
  const maskedAccount = transferData?.FromAccount
    ? transferData.FromAccount.slice(0, 4) +
      "****" +
      transferData.FromAccount.slice(-2)
    : "0912****99";

  const handleKeyPress = (key) => {
    if (key === "backspace") {
      const lastFilledIndex = otp.map((v) => v !== "").lastIndexOf(true);
      if (lastFilledIndex >= 0) {
        const newOtp = [...otp];
        newOtp[lastFilledIndex] = "";
        setOtp(newOtp);
      }
    } else if (key === "fingerprint") {
      // Biometric trigger simulation
    } else {
      const firstEmptyIndex = otp.findIndex((v) => v === "");
      if (firstEmptyIndex >= 0) {
        const newOtp = [...otp];
        newOtp[firstEmptyIndex] = key;
        setOtp(newOtp);
      }
    }
  };

  const getFocusedIndex = () => {
    return otp.findIndex((v) => v === "");
  };

  // GỌI API CHUYỂN TIỀN KÈM OTP
  const handleFinalConfirm = async () => {
    if (otp.includes("")) {
      Alert.alert("Lỗi", "Vui lòng nhập đủ 6 số OTP");
      return;
    }

    if (!transferData) {
      Alert.alert("Lỗi", "Không có dữ liệu giao dịch.");
      return;
    }

    setIsLoading(true);
    try {
      const otpString = otp.join("");

      const response = await transferAPI(
        transferData.FromAccount,
        transferData.ToAccount,
        transferData.Amount,
        otpString,
        transferData.Note || "Chuyen tien",
      );

      if (onConfirm) {
        onConfirm({ ...transferData, serverResponse: response });
      }
    } catch (error) {
      Alert.alert("Giao dịch thất bại", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.root}>
        {/* TopAppBar Custom */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backBtn}
            activeOpacity={0.8}
            onPress={onBack}
          >
            <MaterialIcons name="arrow-back" size={24} color={colors.primary} />
          </TouchableOpacity>
          <Text
            style={[
              styles.headerTitle,
              { fontFamily: fontFamily.headlineBold },
            ]}
          >
            Xác thực giao dịch
          </Text>
          <View style={styles.headerSpacer} />
        </View>
        <View style={styles.headerDivider} />

        <View style={styles.mainContent}>
          {/* Message Section */}
          <View style={styles.messageSection}>
            <View style={styles.iconCircle}>
              <MaterialIcons
                name="phonelink-lock"
                size={30}
                color={colors.primary}
              />
            </View>
            <Text
              style={[
                styles.messageText,
                { fontFamily: fontFamily.bodyMedium },
              ]}
            >
              Mã OTP đã được gửi đến thiết bị của{"\n"}
              <Text
                style={{
                  fontFamily: fontFamily.bodyBold,
                  color: colors.onSurface,
                }}
              >
                TK {maskedAccount}
              </Text>
            </Text>
          </View>

          {/* OTP Inputs Grid Row */}
          <View style={styles.otpContainer}>
            {otp.map((digit, index) => {
              const isFocused = getFocusedIndex() === index;
              return (
                <View
                  key={index}
                  style={[
                    styles.otpInputBox,
                    isFocused && styles.otpInputFocused,
                  ]}
                >
                  {digit ? (
                    <Text
                      style={[
                        styles.otpDigit,
                        { fontFamily: fontFamily.headlineBold },
                      ]}
                    >
                      {digit}
                    </Text>
                  ) : (
                    <Text
                      style={[
                        styles.otpPlaceholder,
                        { fontFamily: fontFamily.headlineBold },
                      ]}
                    >
                      ·
                    </Text>
                  )}
                </View>
              );
            })}
          </View>

          {/* Timer Section */}
          <View style={styles.timerSection}>
            <View style={styles.timerRow}>
              <MaterialIcons name="schedule" size={16} color={colors.primary} />
              <Text
                style={[
                  styles.timerText,
                  { fontFamily: fontFamily.headlineSemiBold },
                ]}
              >
                01:59
              </Text>
            </View>
            <TouchableOpacity disabled>
              <Text
                style={[
                  styles.resendText,
                  { fontFamily: fontFamily.bodyMedium },
                ]}
              >
                Gửi lại mã
              </Text>
            </TouchableOpacity>
          </View>

          {/* Action Button CÓ LOADING*/}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleFinalConfirm}
            style={styles.confirmBtnWrapper}
            disabled={isLoading}
          >
            <LinearGradient
              colors={[colors.primary, colors.primaryContainer]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.confirmBtn}
            >
              {isLoading ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <Text
                  style={[
                    styles.confirmBtnText,
                    { fontFamily: fontFamily.headlineBold },
                  ]}
                >
                  Xác nhận
                </Text>
              )}
            </LinearGradient>
          </TouchableOpacity>

          {/* Phase Note */}
          <View style={styles.phaseNoteRow}>
            <View style={styles.phasePill}>
              <View style={styles.pulseDot} />
              <Text
                style={[
                  styles.phaseText,
                  { fontFamily: fontFamily.bodyMedium },
                ]}
              >
                Giao dịch đang ở trạng thái chờ xử lý (Phase 1)
              </Text>
            </View>
          </View>
        </View>

        {/* Numeric Keypad Component */}
        <View style={styles.keypadContainer}>
          <View style={styles.keypadGrid}>
            {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((num) => (
              <TouchableOpacity
                key={num}
                style={styles.keyBtn}
                activeOpacity={0.6}
                onPress={() => handleKeyPress(num)}
              >
                <Text
                  style={[
                    styles.keyText,
                    { fontFamily: fontFamily.headlineSemiBold },
                  ]}
                >
                  {num}
                </Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              style={styles.keyBtn}
              activeOpacity={0.6}
              onPress={() => handleKeyPress("fingerprint")}
            >
              <MaterialIcons
                name="fingerprint"
                size={28}
                color={colors.onSurfaceVariant}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.keyBtn}
              activeOpacity={0.6}
              onPress={() => handleKeyPress("0")}
            >
              <Text
                style={[
                  styles.keyText,
                  { fontFamily: fontFamily.headlineSemiBold },
                ]}
              >
                0
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.keyBtn}
              activeOpacity={0.6}
              onPress={() => handleKeyPress("backspace")}
            >
              <MaterialIcons
                name="backspace"
                size={28}
                color={colors.onSurface}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  root: {
    flex: 1,
    backgroundColor: colors.surface,
    alignItems: "center",
  },
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: "#f8f9fa",
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18,
    color: "#003063",
    letterSpacing: -0.5,
  },
  headerSpacer: {
    width: 40,
  },
  headerDivider: {
    width: "100%",
    height: 1,
    backgroundColor: "#edeeef",
  },
  mainContent: {
    flex: 1,
    width: "100%",
    maxWidth: 448,
    paddingHorizontal: 24,
    paddingTop: 48,
    alignItems: "center",
  },
  messageSection: {
    alignItems: "center",
    marginBottom: 40,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.secondaryContainer,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  messageText: {
    color: colors.onSurfaceVariant,
    fontSize: 14,
    textAlign: "center",
    lineHeight: 22,
  },
  otpContainer: {
    flexDirection: "row",
    gap: 12,
    justifyContent: "center",
    marginBottom: 32,
  },
  otpInputBox: {
    width: 48,
    height: 56,
    borderRadius: 12,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(194, 198, 210, 0.2)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  otpInputFocused: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  otpDigit: {
    fontSize: 20,
    color: colors.onSurface,
  },
  otpPlaceholder: {
    fontSize: 20,
    color: "rgba(0,0,0,0.3)",
  },
  timerSection: {
    alignItems: "center",
    gap: 8,
    marginBottom: 48,
  },
  timerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  timerText: {
    color: colors.primary,
    fontSize: 14,
  },
  resendText: {
    color: colors.onSurfaceVariant,
    fontSize: 14,
    opacity: 0.5,
  },
  confirmBtnWrapper: {
    width: "100%",
    borderRadius: 12,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 8,
  },
  confirmBtn: {
    width: "100%",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  confirmBtnText: {
    color: "#ffffff",
    fontSize: 16,
  },
  phaseNoteRow: {
    marginTop: "auto",
    paddingVertical: 32,
    alignItems: "center",
  },
  phasePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: colors.surfaceContainer,
    borderRadius: 16,
  },
  pulseDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.tertiary,
  },
  phaseText: {
    fontSize: 11,
    color: colors.onSurfaceVariant,
    letterSpacing: 0.3,
  },
  keypadContainer: {
    width: "100%",
    maxWidth: 448,
    backgroundColor: colors.surfaceContainerLow,
    paddingTop: 5,
    paddingBottom: 32,
    paddingHorizontal: 24,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.04,
    shadowRadius: 24,
    elevation: 16,
  },
  keypadGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  keyBtn: {
    width: "30%",
    aspectRatio: 1.5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
  },
  keyText: {
    fontSize: 24,
    color: colors.onSurface,
  },
});
