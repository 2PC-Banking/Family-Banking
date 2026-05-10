import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
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

export default function SuccessScreen({ transactionData, onNewTransaction, onHome }) {
  const response = transactionData?.serverResponse || {};
  const amount = response.amount ?? transactionData?.Amount ?? 0;
  const recipientName = transactionData?.RecipientName || "Nguoi nhan";
  const toAccount = response.toAccount || transactionData?.ToAccount || "---";
  const destinationBank = response.destinationBank || transactionData?.DestinationBank || "Heritage Digital Bank";
  const transactionId = response.transactionId || response.transaction_id || transactionData?.ClientTxId || "---";
  const timestamp = response.timestamp ? new Date(response.timestamp) : new Date();
  const status = response.status || (transactionData?.IsInterbank2pc ? "PROCESSING" : "COMMITTED");
  const phase = response.phase || (status === "COMMITTED" ? "DONE" : "PENDING");
  const decision = response.decision || (status === "COMMITTED" ? "COMMIT" : "WAITING");
  const isCommitted = status === "COMMITTED" || !transactionData?.IsInterbank2pc;
  const isAborted = status === "ABORTED";
  const heroTitle = isAborted ? "Giao dich bi huy" : isCommitted ? "Giao dich thanh cong" : "Giao dich dang xu ly";
  const participants = Array.isArray(response.participants) ? response.participants : [];
  const participantSummary = participants.length
    ? participants.map((p) => `${p.name || p.Name}: ${p.prepareVote || p.PrepareVote || "?"}/${p.decisionAck || p.DecisionAck || "?"}`).join(" | ")
    : `${phase} / ${decision}`;
  const formatCurrency = (value) => Number(value || 0).toLocaleString("vi-VN");
  const formatTime = (value) => value.toLocaleTimeString("vi-VN", { hour12: false });
  const formatDate = (value) => value.toLocaleDateString("vi-VN");

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.root}>
        {/* TopAppBar Shell */}
        <View style={styles.header}>
          <Text
            style={[
              styles.headerTitle,
              { fontFamily: fontFamily.headlineBold },
            ]}
          >
            Trạng thái giao dịch
          </Text>
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Success State Hero */}
          <View style={styles.heroSection}>
            <View style={styles.iconCircle}>
              <MaterialIcons
                name={isAborted ? "error" : isCommitted ? "check-circle" : "hourglass-top"}
                size={32}
                color={colors.onPrimary}
              />
            </View>
            <Text
              style={[
                styles.heroTitle,
                { fontFamily: fontFamily.headlineExtraBold },
              ]}
            >
              {heroTitle}
            </Text>
            <Text
              style={[
                styles.heroSubtitle,
                { fontFamily: fontFamily.bodySemiBold },
              ]}
            >
              {transactionData?.IsInterbank2pc ? `${phase} - ${decision} - 2PC Protocol` : "Chuyen tien noi bo"}
            </Text>
          </View>

          {/* Transaction Details Bento */}
          <View style={styles.detailsBlock}>
            {/* Amount Section */}
            <LinearGradient
              colors={[colors.primary, colors.primaryContainer]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.amountCard}
            >
              <View style={styles.amountIconBg}>
                <MaterialIcons
                  name="verified-user"
                  size={100}
                  color="rgba(255,255,255,0.1)"
                />
              </View>
              <View style={styles.amountContentGroup}>
                <Text
                  style={[
                    styles.amountLabel,
                    { fontFamily: fontFamily.bodyMedium },
                  ]}
                >
                  SỐ TIỀN CHUYỂN
                </Text>
                <View style={styles.amountValueRow}>
                  <Text
                    style={[
                      styles.amountValue,
                      {
                        fontFamily: fontFamily.headlineExtraBold,
                        fontsize: 10,
                      },
                    ]}
                  >
                    {formatCurrency(amount)}
                  </Text>
                  <Text
                    style={[
                      styles.amountCurrency,
                      { fontFamily: fontFamily.bodySemiBold },
                    ]}
                  >
                    VND
                  </Text>
                </View>
              </View>
            </LinearGradient>

            {/* Info Grid */}
            <View style={styles.infoGrid}>
              {/* Recipient Info */}
              <View style={styles.infoRow}>
                <View style={styles.infoIconBox}>
                  <MaterialIcons
                    name="person"
                    size={24}
                    color={colors.primary}
                  />
                </View>
                <View>
                  <Text
                    style={[
                      styles.infoValue,
                      { fontFamily: fontFamily.bodyBold },
                    ]}
                  >
                    {recipientName}
                  </Text>
                  <Text
                    style={[
                      styles.infoLabel,
                      { fontFamily: fontFamily.bodyRegular },
                    ]}
                  >
                    {destinationBank} - {toAccount}
                  </Text>
                </View>
              </View>

              {/* Timing Info */}
              <View style={styles.infoRow}>
                <View style={styles.infoIconBox}>
                  <MaterialIcons
                    name="schedule"
                    size={24}
                    color={colors.primary}
                  />
                </View>
                <View>
                  <Text
                    style={[
                      styles.infoValue,
                      { fontFamily: fontFamily.bodyBold },
                    ]}
                  >
                    {formatTime(timestamp)}
                  </Text>
                  <Text
                    style={[
                      styles.infoLabel,
                      { fontFamily: fontFamily.bodyRegular },
                    ]}
                  >
                    {formatDate(timestamp)}
                  </Text>
                </View>
              </View>

              {/* Transaction ID (Compact) */}
              <View style={styles.txIdRow}>
                <View style={styles.txIdLeft}>
                  <MaterialIcons
                    name="fingerprint"
                    size={18}
                    color={colors.primary}
                  />
                  <Text
                    style={[
                      styles.txIdLabel,
                      { fontFamily: fontFamily.bodyBold },
                    ]}
                  >
                    Mã định danh 2PC
                  </Text>
                </View>
                <View style={styles.txIdRight}>
                  <Text
                    style={[
                      styles.txIdValue,
                      { fontFamily: fontFamily.bodyBold },
                    ]}
                  >
                    {transactionId}
                  </Text>
                  <TouchableOpacity activeOpacity={0.6}>
                    <MaterialIcons
                      name="content-copy"
                      size={16}
                      color="rgba(0,48,99,0.6)"
                    />
                  </TouchableOpacity>
                </View>
              </View>
              {transactionData?.IsInterbank2pc && (
                <View style={styles.infoRow}>
                  <View style={styles.infoIconBox}>
                    <MaterialIcons
                      name="account-tree"
                      size={24}
                      color={colors.primary}
                    />
                  </View>
                  <View style={styles.infoTextCol}>
                    <Text
                      style={[
                        styles.infoValue,
                        { fontFamily: fontFamily.bodyBold },
                      ]}
                    >
                      {status} / {phase} / {decision}
                    </Text>
                    <Text
                      style={[
                        styles.infoLabel,
                        { fontFamily: fontFamily.bodyRegular },
                      ]}
                    >
                      {participantSummary}
                    </Text>
                  </View>
                </View>
              )}
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actionsBlock}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.primaryBtn}
              onPress={onNewTransaction}
            >
              <Text
                style={[
                  styles.primaryBtnText,
                  { fontFamily: fontFamily.headlineBold },
                ]}
              >
                Thực hiện giao dịch mới
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.secondaryBtn}
              onPress={onHome}
            >
              <Text
                style={[
                  styles.secondaryBtnText,
                  { fontFamily: fontFamily.headlineBold },
                ]}
              >
                Về trang chủ
              </Text>
            </TouchableOpacity>
          </View>

          {/* Trust Indicator */}
          <View style={styles.trustIndicator}>
            <MaterialIcons
              name="lock"
              size={12}
              color="rgba(66, 71, 81, 0.4)"
            />
            <Text
              style={[styles.trustText, { fontFamily: fontFamily.bodyBold }]}
            >
              THE SOVEREIGN VAULT ENGINE SECURED
            </Text>
          </View>
        </ScrollView>
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
  },

  // Header Shell
  header: {
    height: 64, // h-16
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16, // px-4
    backgroundColor: "rgba(255,255,255,0.8)", // bg-white/80
    shadowColor: "rgba(0, 27, 61, 1)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03, // shadow-[0_4px_30px_rgba(0,27,61,0.03)]
    shadowRadius: 30,
    elevation: 4,
    zIndex: 50,
  },
  headerTitle: {
    fontSize: 18, // text-lg
    color: colors.primary,
  },

  // Main Tracking
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24, // px-6
    paddingTop: 24, // pt-6
    paddingBottom: 48, // pb-12
    alignItems: "center",
  },

  // Hero Section State
  heroSection: {
    alignItems: "center",
    marginBottom: 24, // mb-6
  },
  iconCircle: {
    width: 64, // w-16
    height: 64, // h-16
    borderRadius: 32, // rounded-full
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16, // mb-4
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2, // shadow-primary/20
    shadowRadius: 15,
    elevation: 8,
  },
  heroTitle: {
    fontSize: 24, // text-2xl
    color: colors.onSurface,
    letterSpacing: -0.5, // tracking-tight
  },
  heroSubtitle: {
    marginTop: 4, // mt-1
    fontSize: 11, // text-[11px]
    color: colors.onSurfaceVariant,
    textTransform: "uppercase",
    letterSpacing: 1, // tracking-wider
  },

  // Bento Block
  detailsBlock: {
    width: "100%",
    maxWidth: 448, // max-w-md
    gap: 16, // space-y-4
  },

  // Amount Card Focus
  amountCard: {
    position: "relative",
    overflow: "hidden",
    borderRadius: 32, // rounded-[2rem]
    padding: 24, // p-6
    alignItems: "center",
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
  },
  amountIconBg: {
    position: "absolute",
    top: 4, // p-4 roughly logic combined with absolute
    right: 4,
  },
  amountContentGroup: {
    zIndex: 10, // relative z-10
    alignItems: "center",
  },
  amountLabel: {
    color: "rgba(214, 227, 255, 0.7)", // text-primary-fixed/70
    fontSize: 12, // text-xs
    letterSpacing: 1, // tracking-wide
    marginBottom: 4, // mb-1
  },
  amountValueRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 8, // gap-2
  },
  amountValue: {
    fontSize: 36, // text-4xl
    color: "#ffffff",
    letterSpacing: -0.5, // tracking-tight
  },
  amountCurrency: {
    fontSize: 16, // base mapped to robust layout match
    color: colors.primaryFixed,
  },

  // Details Info Grid Elements
  infoGrid: {
    gap: 16, // gap-4
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16, // gap-4
    backgroundColor: colors.surfaceContainerLow,
    padding: 20, // p-5
    borderRadius: 24, // rounded-3xl
    borderWidth: 1,
    borderColor: "rgba(194,198,210,0.1)", // border-outline-variant/10
  },
  infoIconBox: {
    width: 48, // w-12
    height: 48, // h-12
    borderRadius: 16, // rounded-2xl
    backgroundColor: colors.secondaryContainer,
    alignItems: "center",
    justifyContent: "center",
  },
  infoTextCol: {
    flex: 1,
  },
  infoValue: {
    fontSize: 14, // text-sm
    color: colors.onSurface,
  },
  infoLabel: {
    fontSize: 12, // text-xs
    color: colors.onSurfaceVariant,
    marginTop: 2,
  },

  txIdRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(208, 226, 241, 0.3)", // bg-secondary-container/30
    paddingHorizontal: 16, // px-4
    paddingVertical: 12, // py-3
    borderRadius: 16, // rounded-2xl
  },
  txIdLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8, // gap-2
  },
  txIdLabel: {
    fontSize: 10, // text-[10px]
    color: colors.onSurfaceVariant,
    textTransform: "uppercase",
    letterSpacing: -0.5, // tracking-tighter
  },
  txIdRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8, // gap-2
  },
  txIdValue: {
    fontFamily: "monospace", // font-mono
    fontSize: 10, // text-[10px]
    color: colors.primary,
    letterSpacing: -0.5, // tracking-tight
  },

  // Action Buttons Matrix
  actionsBlock: {
    width: "100%",
    maxWidth: 448, // max-w-md
    marginTop: 32, // mt-8
    gap: 12, // gap-3
  },
  primaryBtn: {
    width: "100%",
    height: 56, // h-14
    borderRadius: 16, // rounded-2xl
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2, // shadow-primary/20
    shadowRadius: 15,
    elevation: 8,
  },
  primaryBtnText: {
    fontSize: 16, // text-base
    color: "#ffffff",
  },
  secondaryBtn: {
    width: "100%",
    height: 56, // h-14
    borderRadius: 16, // rounded-2xl
    backgroundColor: colors.surfaceContainerHigh,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryBtnText: {
    fontSize: 16, // text-base
    color: colors.primary,
  },

  // Trust Indicator
  trustIndicator: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8, // gap-2
    marginTop: 32, // mt-8
    marginBottom: 16, // mb-4
  },
  trustText: {
    fontSize: 9, // text-[9px]
    color: "rgba(66, 71, 81, 0.4)", // text-on-surface-variant/40
    textTransform: "uppercase",
    letterSpacing: 1.5, // tracking-[0.15em] -> equivalent px value approx
  },
});
