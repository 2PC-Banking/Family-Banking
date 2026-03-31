import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";

// IMPORT ASYNC STORAGE ĐỂ LƯU DỮ LIỆU ĐĂNG NHẬP
import AsyncStorage from "@react-native-async-storage/async-storage";

import GlassCard from "../components/GlassCard";
import PillInput from "../components/PillInput";
import BiometricButton from "../components/BiometricButton";
import { colors } from "../theme/colors";

// Import API (Đảm bảo file apiService.js đã được tạo như hướng dẫn trước)
import { loginAPI } from "../services/apiService";

const { width } = Dimensions.get("window");

export default function LoginScreen({ onLogin }) {
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setUsername] = useState("");
  const [pass, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // HÀM XỬ LÝ ĐĂNG NHẬP ĐÃ ĐƯỢC CẬP NHẬT
  const handleLogin = async () => {
    if (!phone || !pass) {
      setError("Vui lòng nhập tên đăng nhập và mật khẩu");
      return;
    }
    setLoading(true);
    setError("");

    try {
      // Gọi API lên C#
      const response = await loginAPI(phone, pass);

      console.log("Đăng nhập thành công:", response);

      // LƯU THÔNG TIN VÀO BỘ NHỚ ĐIỆN THOẠI
      // Để các màn hình Home, Transfer, History có thể lấy ra dùng
      await AsyncStorage.setItem(
        "userData",
        JSON.stringify({
          name: response.name,
          accountnumber: response.accountnumber,
          customerId: response.customerId,
        }),
      );

      onLogin(); // Navigate sang màn hình Home
    } catch (err) {
      setError(err.message || "Đăng nhập thất bại. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const bodyRegular = "Inter_400Regular";
  const bodySemiBold = "Inter_600SemiBold";
  const headlineBold = "Manrope_700Bold";
  const headlineExtraBold = "Manrope_800ExtraBold";

  return (
    <View style={styles.root}>
      {/* ── Background gradient blob ── */}
      <LinearGradient
        colors={[colors.primaryFixed + "66", "transparent"]}
        style={styles.blobGradient}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        pointerEvents="none"
      />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="always"
        >
          {/* ── HEADER ── */}
          <View style={styles.header}>
            {/* Logo */}
            <View style={styles.logoBox}>
              <MaterialIcons
                name="account-balance"
                size={36}
                color={colors.onPrimary}
              />
            </View>
            <Text style={[styles.appTitle, { fontFamily: headlineExtraBold }]}>
              Heritage Digital
            </Text>
            <Text style={[styles.appSubtitle, { fontFamily: bodySemiBold }]}>
              THE SOVEREIGN TRUST
            </Text>
          </View>

          {/* ── GLASS CARD ── */}
          <GlassCard style={styles.card}>
            <View style={styles.cardInner}>
              <Text style={[styles.welcomeText, { fontFamily: headlineBold }]}>
                Chào mừng bạn trở lại
              </Text>

              {/* Username */}
              <View style={styles.fieldGroup}>
                <Text style={[styles.fieldLabel, { fontFamily: bodySemiBold }]}>
                  Tên đăng nhập
                </Text>
                <PillInput
                  iconName="person"
                  placeholder="Nhập tên đăng nhập"
                  autoCapitalize="none"
                  fontFamily={bodyRegular}
                  value={phone}
                  onChangeText={setUsername}
                />
              </View>

              {/* Password */}
              <View style={styles.fieldGroup}>
                <View style={styles.passwordLabelRow}>
                  <Text
                    style={[styles.fieldLabel, { fontFamily: bodySemiBold }]}
                  >
                    Mật khẩu
                  </Text>
                  <TouchableOpacity activeOpacity={0.7}>
                    <Text
                      style={[styles.forgotText, { fontFamily: bodySemiBold }]}
                    >
                      Quên mật khẩu?
                    </Text>
                  </TouchableOpacity>
                </View>
                <PillInput
                  iconName="lock"
                  rightIconName={showPassword ? "visibility-off" : "visibility"}
                  onRightIconPress={() => setShowPassword(!showPassword)}
                  placeholder="••••••••"
                  secureTextEntry={!showPassword}
                  fontFamily={bodyRegular}
                  value={pass}
                  onChangeText={setPassword}
                />
              </View>

              {/* Error message */}
              {error ? (
                <Text style={[styles.errorText, { fontFamily: bodyRegular }]}>
                  {error}
                </Text>
              ) : null}

              {/* ── Login button ── */}
              <View style={styles.actionsGroup}>
                <TouchableOpacity
                  activeOpacity={0.88}
                  style={styles.loginBtnWrapper}
                  onPress={handleLogin}
                  disabled={loading}
                >
                  <LinearGradient
                    colors={[colors.primary, colors.primaryContainer]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.loginBtn}
                  >
                    <Text
                      style={[
                        styles.loginBtnText,
                        { fontFamily: headlineBold },
                      ]}
                    >
                      {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>

                {/* Divider */}
                <View style={styles.dividerRow}>
                  <View style={styles.dividerLine} />
                  <Text
                    style={[styles.dividerText, { fontFamily: bodySemiBold }]}
                  >
                    hoặc
                  </Text>
                  <View style={styles.dividerLine} />
                </View>

                {/* Biometric buttons */}
                <View style={styles.biometricRow}>
                  <BiometricButton
                    iconName={
                      Platform.OS === "ios" ? "face-retouching-natural" : "face"
                    }
                    label="FaceID"
                    fontFamily={bodySemiBold}
                  />
                  <BiometricButton
                    iconName="fingerprint"
                    label="Vân tay"
                    fontFamily={bodySemiBold}
                  />
                </View>
              </View>
            </View>
          </GlassCard>

          {/* ── Open account ── */}
          <TouchableOpacity style={styles.openAccountBtn} activeOpacity={0.8}>
            <MaterialIcons name="person-add" size={20} color={colors.primary} />
            <Text
              style={[styles.openAccountText, { fontFamily: headlineBold }]}
            >
              Mở tài khoản mới
            </Text>
          </TouchableOpacity>

          {/* ── Quick links ── */}
          <View style={styles.quickLinks}>
            {[
              { icon: "support-agent", label: "Hỗ trợ" },
              { icon: "location-on", label: "Chi nhánh" },
              { icon: "language", label: "Ngôn ngữ" },
            ].map(({ icon, label }) => (
              <TouchableOpacity
                key={label}
                style={styles.quickLinkItem}
                activeOpacity={0.7}
              >
                <MaterialIcons
                  name={icon}
                  size={22}
                  color={colors.onSurfaceVariant}
                />
                <Text
                  style={[styles.quickLinkLabel, { fontFamily: bodySemiBold }]}
                >
                  {label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* ── Footer ── */}
          <View style={styles.footer}>
            <Text style={[styles.footerText, { fontFamily: bodyRegular }]}>
              © 2024 The Sovereign Trust. Bản quyền thuộc về Ngân hàng Heritage
              Digital.{"\n"}
              Được bảo mật bởi tiêu chuẩn quốc tế PCI DSS.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.surface,
  },

  errorText: {
    color: colors.error || "#d32f2f",
    fontSize: 14,
    textAlign: "center",
    marginTop: 8,
  },

  // ── Gradient blob ──
  blobGradient: {
    position: "absolute",
    top: -80,
    left: -width * 0.3,
    width: width * 1.6,
    height: 420,
    borderRadius: 999,
    zIndex: 0,
  },

  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },

  // ── Header ──
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  logoBox: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  appTitle: {
    fontSize: 22,
    letterSpacing: -0.5,
    color: colors.primary,
  },
  appSubtitle: {
    fontSize: 11,
    letterSpacing: 2,
    color: colors.onSurfaceVariant,
    marginTop: 4,
    textTransform: "uppercase",
  },

  // ── Glass Card ──
  card: {
    marginBottom: 32,
  },
  cardInner: {
    padding: 28,
  },
  welcomeText: {
    fontSize: 20,
    color: colors.onSurface,
    marginBottom: 28,
  },

  // ── Form fields ──
  fieldGroup: {
    marginBottom: 20,
    gap: 8,
  },
  fieldLabel: {
    fontSize: 11,
    color: colors.onSurfaceVariant,
    marginLeft: 4,
    letterSpacing: 0.3,
  },
  passwordLabelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 0,
    marginLeft: 4,
    marginRight: 4,
  },
  forgotText: {
    fontSize: 11,
    color: colors.primary,
  },

  // ── Actions ──
  actionsGroup: {
    marginTop: 12,
    gap: 20,
  },
  loginBtnWrapper: {
    borderRadius: 50,
    overflow: "hidden",
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 6,
  },
  loginBtn: {
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
  },
  loginBtnText: {
    color: colors.onPrimary,
    fontSize: 16,
    letterSpacing: 0.3,
  },

  // Divider
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.outlineVariant + "4D",
  },
  dividerText: {
    fontSize: 12,
    color: colors.outline,
  },

  // Biometrics
  biometricRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 40,
  },

  // ── Open Account ──
  openAccountBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    alignSelf: "center",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 50,
    backgroundColor: colors.primary + "0D", // 5% opacity
    borderWidth: 1,
    borderColor: colors.primary + "1A", // 10% opacity
    marginBottom: 28,
  },
  openAccountText: {
    fontSize: 14,
    color: colors.primary,
  },

  // ── Quick links ──
  quickLinks: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 40,
    marginBottom: 28,
  },
  quickLinkItem: {
    alignItems: "center",
    gap: 4,
  },
  quickLinkLabel: {
    fontSize: 11,
    color: colors.onSurfaceVariant,
  },

  // ── Footer ──
  footer: {
    alignItems: "center",
  },
  footerText: {
    fontSize: 10,
    color: colors.outline,
    textAlign: "center",
    lineHeight: 16,
  },
});
