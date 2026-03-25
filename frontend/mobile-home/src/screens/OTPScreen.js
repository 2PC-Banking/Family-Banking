import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../theme/colors";

const fontFamily = {
  headlineExtraBold: "Manrope_800ExtraBold",
  headlineBold: "Manrope_700Bold",
  headlineSemiBold: "Manrope_600SemiBold",
  bodyRegular: "Inter_400Regular",
  bodyMedium: "Inter_500Medium",
  bodySemiBold: "Inter_600SemiBold",
  bodyBold: "Inter_700Bold",
};

export default function OTPScreen({ onBack, onConfirm }) {
  const [otp, setOtp] = useState(["5", "8", "", "", "", ""]);

  const handleKeyPress = (key) => {
    if (key === "backspace") {
      const lastFilledIndex = otp.map((v) => v !== "").lastIndexOf(true);
      if (lastFilledIndex >= 0) {
        const newOtp = [...otp];
        newOtp[lastFilledIndex] = "";
        setOtp(newOtp);
      }
    } else if (key === "fingerprint") {
      // Biometric trigger simulation mapping exactly to HTML visual
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
              Mã OTP đã được gửi đến số điện thoại{"\n"}
              <Text
                style={{
                  fontFamily: fontFamily.bodyBold,
                  color: colors.onSurface,
                }}
              >
                0912****99
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

          {/* Action Button */}
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={onConfirm}
            style={styles.confirmBtnWrapper}
          >
            <LinearGradient
              colors={[colors.primary, colors.primaryContainer]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.confirmBtn}
            >
              <Text
                style={[
                  styles.confirmBtnText,
                  { fontFamily: fontFamily.headlineBold },
                ]}
              >
                Xác nhận
              </Text>
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
    alignItems: "center", // HTML standard sets body to flex flex-col items-center
  },

  // Header
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24, // px-6
    paddingVertical: 16, // py-4
    backgroundColor: "#f8f9fa",
  },
  backBtn: {
    width: 40, // w-10
    height: 40, // h-10
    borderRadius: 20, // rounded-full
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 18, // text-lg
    color: "#003063",
    letterSpacing: -0.5, // tracking-tight
  },
  headerSpacer: {
    width: 40, // w-10
  },
  headerDivider: {
    width: "100%",
    height: 1, // h-[1px]
    backgroundColor: "#edeeef",
  },

  // Main Auth Flow Content Wrapper
  mainContent: {
    flex: 1,
    width: "100%",
    maxWidth: 448, // max-w-md
    paddingHorizontal: 24, // px-6
    paddingTop: 48, // pt-12
    alignItems: "center",
  },

  // Messages and Text Formatting
  messageSection: {
    alignItems: "center",
    marginBottom: 40, // mb-10
  },
  iconCircle: {
    width: 64, // w-16
    height: 64, // h-16
    borderRadius: 32, // rounded-full
    backgroundColor: colors.secondaryContainer,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24, // mb-6
  },
  messageText: {
    color: colors.onSurfaceVariant,
    fontSize: 14, // Implicit body size assumed 14
    textAlign: "center",
    lineHeight: 22, // leading-relaxed equivalent roughly
  },

  // OTP Inputs Flex Config
  otpContainer: {
    flexDirection: "row",
    gap: 12, // gap-3
    justifyContent: "center",
    marginBottom: 32, // mb-8
  },
  otpInputBox: {
    width: 48, // w-12
    height: 56, // h-14
    borderRadius: 12, // rounded-xl
    backgroundColor: "#ffffff", // bg-surface-container-lowest
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(194, 198, 210, 0.2)", // ring-1 ring-outline-variant/20 tracking HTML definition
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  otpInputFocused: {
    borderColor: colors.primary, // focus:ring-primary map
    borderWidth: 2, // focus:ring-2
  },
  otpDigit: {
    fontSize: 20, // text-xl
    color: colors.onSurface,
  },
  otpPlaceholder: {
    fontSize: 20, // text-xl
    color: "rgba(0,0,0,0.3)",
  },

  // Timer Section Constraints
  timerSection: {
    alignItems: "center",
    gap: 8, // gap-2
    marginBottom: 48, // mb-12
  },
  timerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8, // gap-2
  },
  timerText: {
    color: colors.primary,
    fontSize: 14,
  },
  resendText: {
    color: colors.onSurfaceVariant,
    fontSize: 14, // text-sm
    opacity: 0.5,
  },

  // Gradient Confirm Action Block Overlay
  confirmBtnWrapper: {
    width: "100%",
    borderRadius: 12,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2, // shadow-primary/20
    shadowRadius: 15,
    elevation: 8,
  },
  confirmBtn: {
    width: "100%",
    paddingVertical: 16, // py-4
    borderRadius: 12, // rounded-xl
    alignItems: "center",
    justifyContent: "center",
  },
  confirmBtnText: {
    color: "#ffffff",
    fontSize: 16, // React Native standard match for button bold sizing
  },

  // Phase Footer
  phaseNoteRow: {
    marginTop: "auto", // mt-auto
    paddingVertical: 32, // py-8
    alignItems: "center",
  },
  phasePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8, // gap-2
    paddingHorizontal: 16, // px-4
    paddingVertical: 8, // py-2
    backgroundColor: colors.surfaceContainer,
    borderRadius: 16, // rounded-full
  },
  pulseDot: {
    width: 8, // w-2
    height: 8, // h-2
    borderRadius: 4, // rounded-full
    backgroundColor: colors.tertiary,
    // HTML defines animate-pulse. Requires Reanimated/Animated in full build, static simulated here
  },
  phaseText: {
    fontSize: 11, // text-[11px]
    color: colors.onSurfaceVariant,
    letterSpacing: 0.3, // tracking-wide
  },

  // Custom Bottom Pin Keypad Grid Settings
  keypadContainer: {
    width: "100%",
    maxWidth: 448, // max-w-md
    backgroundColor: colors.surfaceContainerLow,
    paddingTop: 5, // pt-4
    paddingBottom: 32, // pb-8
    paddingHorizontal: 24, // px-6
    borderTopLeftRadius: 40, // rounded-t-[2.5rem]
    borderTopRightRadius: 40,
    // Custom Shadow Implementation
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
    width: "30%", // Grid-cols-3 minus gap 4
    aspectRatio: 1.5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12, // rounded-xl
  },
  keyText: {
    fontSize: 24, // text-2xl
    color: colors.onSurface,
  },
});
