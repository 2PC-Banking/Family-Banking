import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../theme/colors";

export default function BalanceCard({ fontFamily, onNavigate, balance = 0, accountnumber = "---" }) {
  const headlineExtraBold = fontFamily?.headlineExtraBold ?? "Manrope_800ExtraBold";
  const bodySemiBold = fontFamily?.bodySemiBold ?? "Inter_600SemiBold";
  const bodyMedium = fontFamily?.bodyMedium ?? "Inter_500Medium";
  const bodyRegular = fontFamily?.bodyRegular ?? "Inter_400Regular";

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={[colors.primary, colors.primaryContainer]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.card}
      >
        {/* Decorative shield watermark */}
        <View style={styles.watermark} pointerEvents="none">
          <MaterialIcons name="shield" size={120} color="rgba(255,255,255,0.10)" />
        </View>

        <View style={styles.content}>
          {/* Balance row */}
          <View style={styles.balanceLabelRow}>
            <Text style={[styles.balanceLabel, { fontFamily: bodyMedium }]}>
              Số dư khả dụng
            </Text>
            <MaterialIcons name="visibility" size={20} color="rgba(214,227,255,0.8)" />
          </View>

          <View style={styles.balanceValueRow}>
            {/* Hiển thị số dư thực tế được truyền từ HomeScreen xuống */}
            <Text style={[styles.balanceValue, { fontFamily: headlineExtraBold }]}>
              {balance.toLocaleString("vi-VN")}
            </Text>
            <Text style={[styles.currency, { fontFamily: bodySemiBold }]}>VND</Text>
          </View>

          {/* Account number block */}
          <View style={styles.accountRow}>
            <View style={styles.accountBox}>
              <Text style={[styles.accountBoxLabel, { fontFamily: bodySemiBold }]}>
                Số tài khoản
              </Text>
              {/* Hiển thị số tài khoản thực tế */}
              <Text style={[styles.accountNumber, { fontFamily: bodyRegular }]}>
                {accountnumber}
              </Text>
            </View>
            <TouchableOpacity style={styles.copyBtn} activeOpacity={0.8}>
              <MaterialIcons name="content-copy" size={24} color={colors.primary} />
            </TouchableOpacity>
          </View>

          {/* History button */}
          <View style={styles.historyContainer}>
            <TouchableOpacity
              style={styles.historyBtn}
              activeOpacity={0.8}
              onPress={() => onNavigate?.("history")}
            >
              <MaterialIcons name="history" size={14} color="white" />
              <Text style={[styles.historyText, { fontFamily: bodySemiBold }]}>
                Lịch sử
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

// Giữ nguyên phần styles của bạn
const styles = StyleSheet.create({
  container: { marginBottom: 24 },
  card: { borderRadius: 32, padding: 32, overflow: "hidden", shadowColor: colors.primary, shadowOffset: { width: 0, height: 25 }, shadowOpacity: 0.2, shadowRadius: 50, elevation: 12 },
  watermark: { position: "absolute", top: 0, right: 0, padding: 16 },
  content: { position: "relative", zIndex: 10 },
  balanceLabelRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 8 },
  balanceLabel: { color: "rgba(214,227,255,0.7)", fontSize: 14, letterSpacing: 0.05 },
  balanceValueRow: { flexDirection: "row", alignItems: "baseline", gap: 8 },
  balanceValue: { fontSize: 36, color: "#ffffff", letterSpacing: -1 },
  currency: { fontSize: 14, color: colors.primaryFixed },
  accountRow: { flexDirection: "row", alignItems: "center", gap: 16, marginTop: 32 },
  accountBox: { flex: 1, backgroundColor: "rgba(255,255,255,0.10)", borderRadius: 16, padding: 12, borderWidth: 1, borderColor: "rgba(255,255,255,0.10)" },
  accountBoxLabel: { fontSize: 10, color: "rgba(255,255,255,0.6)", letterSpacing: -0.5, textTransform: "uppercase" },
  accountNumber: { fontSize: 14, color: "#ffffff", letterSpacing: 1.5 },
  copyBtn: { width: 48, height: 48, borderRadius: 16, backgroundColor: colors.secondaryContainer, alignItems: "center", justifyContent: "center", shadowColor: "#000", shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 15, elevation: 10 },
  historyContainer: { marginTop: 16, flexDirection: "row", justifyContent: "flex-start" },
  historyBtn: { flexDirection: "row", alignItems: "center", gap: 8, paddingVertical: 8, paddingHorizontal: 16, borderRadius: 12, backgroundColor: "rgba(255,255,255,0.10)", borderWidth: 1, borderColor: "rgba(255,255,255,0.10)" },
  historyText: { fontSize: 12, color: "#ffffff", letterSpacing: 1, textTransform: "uppercase" },
});