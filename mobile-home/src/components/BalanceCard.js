import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../theme/colors";

/**
 * BalanceCard – the hero gradient card showing the account balance,
 * account number with copy action, and a history shortcut.
 */
export default function BalanceCard({ fontFamily, onNavigate }) {
  const headlineExtraBold =
    fontFamily?.headlineExtraBold ?? "Manrope_800ExtraBold";
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
          <MaterialIcons
            name="shield"
            size={120}
            color="rgba(255,255,255,0.10)"
          />
        </View>

        <View style={styles.content}>
          {/* Balance row */}
          <View style={styles.balanceLabelRow}>
            <Text style={[styles.balanceLabel, { fontFamily: bodyMedium }]}>
              Số dư khả dụng
            </Text>
            <MaterialIcons
              name="visibility"
              size={20}
              color="rgba(214,227,255,0.8)"
            />
          </View>

          <View style={styles.balanceValueRow}>
            <Text
              style={[
                styles.balanceValue,
                { fontFamily: headlineExtraBold, fontSize: 18 },
              ]}
            >
              1,284,500,000
            </Text>
            <Text style={[styles.currency, { fontFamily: bodySemiBold }]}>
              VND
            </Text>
          </View>

          {/* Account number block */}
          <View style={styles.accountRow}>
            <View style={styles.accountBox}>
              <Text
                style={[styles.accountBoxLabel, { fontFamily: bodySemiBold }]}
              >
                Số tài khoản
              </Text>
              <Text style={[styles.accountNumber, { fontFamily: bodyRegular }]}>
                8888 6666 9999
              </Text>
            </View>
            <TouchableOpacity style={styles.copyBtn} activeOpacity={0.8}>
              <MaterialIcons
                name="content-copy"
                size={24}
                color={colors.primary}
              />
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

const styles = StyleSheet.create({
  container: {
    marginBottom: 24, // mb-6
  },
  card: {
    borderRadius: 32, // rounded-[2rem]
    padding: 32, // p-8
    overflow: "hidden",
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 25 }, // shadow-2xl
    shadowOpacity: 0.2, // shadow-primary/20
    shadowRadius: 50,
    elevation: 12,
  },
  watermark: {
    position: "absolute",
    top: 0,
    right: 0,
    padding: 16,
  },
  content: {
    position: "relative",
    zIndex: 10,
  },
  balanceLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8, // mb-2
  },
  balanceLabel: {
    color: "rgba(214,227,255,0.7)", // text-primary-fixed/70
    fontSize: 14, // text-sm
    letterSpacing: 0.05, // tracking-wide
  },
  balanceValueRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 8, // gap-2
  },
  balanceValue: {
    fontSize: 36, // text-4xl
    color: "#ffffff",
    letterSpacing: -1, // tracking-tight
  },
  currency: {
    fontSize: 14, // font-semibold standard sizes
    color: colors.primaryFixed,
  },

  // Account box
  accountRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16, // gap-4
    marginTop: 32, // mt-8
  },
  accountBox: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.10)",
    borderRadius: 16, // rounded-2xl
    padding: 12, // p-3
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
  },
  accountBoxLabel: {
    fontSize: 10, // text-[10px]
    color: "rgba(255,255,255,0.6)",
    letterSpacing: -0.5, // tracking-tighter
    textTransform: "uppercase",
  },
  accountNumber: {
    fontSize: 14, // text-sm
    color: "#ffffff",
    letterSpacing: 1.5, // tracking-widest
  },
  copyBtn: {
    width: 48, // w-12
    height: 48, // h-12
    borderRadius: 16, // rounded-2xl
    backgroundColor: colors.secondaryContainer,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1, // shadow-lg approx
    shadowRadius: 15,
    elevation: 10,
  },

  // History
  historyContainer: {
    marginTop: 16, // mt-4
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  historyBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8, // gap-2
    paddingVertical: 8, // py-2
    paddingHorizontal: 16, // px-4
    borderRadius: 12, // rounded-xl
    backgroundColor: "rgba(255,255,255,0.10)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.10)",
  },
  historyText: {
    fontSize: 12, // text-xs
    color: "#ffffff",
    letterSpacing: 1, // tracking-wider
    textTransform: "uppercase",
  },
});
