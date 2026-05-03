import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../theme/colors";

// Ensure consistent matching of font styling
const fontFamily = {
  headlineExtraBold: "Manrope_800ExtraBold",
  headlineBold: "Manrope_700Bold",
  headlineSemiBold: "Manrope_600SemiBold",
  bodyRegular: "Inter_400Regular",
  bodyMedium: "Inter_500Medium",
  bodySemiBold: "Inter_600SemiBold",
  bodyBold: "Inter_700Bold",
};

export default function TransferScreen({ onBack, onConfirm }) {
  const [bank, setBank] = useState("Vietcombank - NHTMCP Ngoại Thương VN");
  const [accountNo, setAccountNo] = useState("1029384756");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("NGUYEN VAN B chuyen tien");

  const onQuickAmount = (val) => {
    // Keep internal numeric logic as string for input
    setAmount(val.replace(/,/g, ""));
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.root}>
        {/* Custom Transfer Screen Header */}
        <View style={styles.header}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.backBtn}
            onPress={onBack}
          >
            <MaterialIcons name="arrow-back" size={24} color="#003063" />
          </TouchableOpacity>
          <Text
            style={[
              styles.headerCenterTitle,
              { fontFamily: fontFamily.headlineExtraBold },
            ]}
          >
            Chuyển tiền đến số tài khoản
          </Text>
          <View style={styles.headerSpacer} />
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Breadcrumb / Stage Indicator */}
          <View style={styles.breadcrumbRow}>
            <View style={[styles.breadcrumbBar, styles.breadcrumbActive]} />
            <View style={styles.breadcrumbBar} />
            <View style={styles.breadcrumbBar} />
          </View>

          {/* Screen Title Details */}
          <View style={styles.headerTitleRow}>
            <Text
              style={[
                styles.headerTitle,
                { fontFamily: fontFamily.headlineExtraBold },
              ]}
            >
              Chuyển tiền
            </Text>
            <Text
              style={[
                styles.headerSubtitle,
                { fontFamily: fontFamily.bodyMedium },
              ]}
            >
              Bước 1: Nhập thông tin giao dịch thụ hưởng
            </Text>
          </View>

          {/* Main Form Container Wrap */}
          <View style={styles.mainContainer}>
            {/* Source Account Card */}
            <LinearGradient
              colors={[colors.primary, colors.primaryContainer]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.sourceCard}
            >
              <View style={styles.sourceCardTop}>
                <Text
                  style={[
                    styles.sourceCardLabel,
                    { fontFamily: fontFamily.bodyBold },
                  ]}
                >
                  Tài khoản nguồn
                </Text>
                <View style={styles.defaultPill}>
                  <Text
                    style={[
                      styles.defaultPillText,
                      { fontFamily: fontFamily.bodyBold },
                    ]}
                  >
                    DEFAULT
                  </Text>
                </View>
              </View>

              <View style={styles.sourceCardBottom}>
                <View>
                  <Text
                    style={[
                      styles.sourceAccountNo,
                      { fontFamily: fontFamily.headlineBold, fontSize: 16 },
                    ]}
                  >
                    0912 8888 9999
                  </Text>
                  <Text
                    style={[
                      styles.sourceAccountName,
                      { fontFamily: fontFamily.bodyRegular },
                    ]}
                  >
                    Signature Savings
                  </Text>
                </View>
                <View style={styles.alignRight}>
                  <Text
                    style={[
                      styles.sourceBalance,
                      {
                        fontFamily: fontFamily.headlineExtraBold,
                        fontSize: 11,
                      },
                    ]}
                  >
                    2,450,000,000 ₫
                  </Text>
                  <Text
                    style={[
                      styles.sourceBalanceLabel,
                      { fontFamily: fontFamily.bodyRegular },
                    ]}
                  >
                    Khả dụng
                  </Text>
                </View>
              </View>
            </LinearGradient>

            {/* Transfer Form Bento Layout */}
            <View style={styles.formBlock}>
              {/* Target Bank Input Fake Dropdown */}
              <View>
                <Text
                  style={[
                    styles.inputLabel,
                    { fontFamily: fontFamily.bodyBold },
                  ]}
                >
                  Ngân hàng thụ hưởng
                </Text>
                <View style={styles.inputWrapper}>
                  <MaterialIcons
                    name="account-balance"
                    size={18}
                    color={colors.outline}
                    style={styles.inputIcon}
                  />
                  <TouchableOpacity
                    style={styles.fakeSelectWrapper}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        styles.selectText,
                        { fontFamily: fontFamily.bodySemiBold },
                      ]}
                      numberOfLines={1}
                    >
                      {bank}
                    </Text>
                    <MaterialIcons
                      name="expand-more"
                      size={18}
                      color={colors.outline}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Multi-field Grid (1 col in standard RN mobile views mapping directly to grid-cols-1) */}
              <View style={styles.spacerCol1}>
                {/* Account Number Input */}
                <View>
                  <Text
                    style={[
                      styles.inputLabel,
                      { fontFamily: fontFamily.bodyBold },
                    ]}
                  >
                    Số tài khoản
                  </Text>
                  <View
                    style={[
                      styles.inputWrapper,
                      {
                        borderBottomColor: accountNo
                          ? colors.primary
                          : colors.outlineVariant,
                      },
                    ]}
                  >
                    <MaterialIcons
                      name="dialpad"
                      size={18}
                      color={accountNo ? "#003063" : colors.outline}
                      style={styles.inputIcon}
                    />
                    <TextInput
                      style={[
                        styles.textInput,
                        { fontFamily: fontFamily.headlineBold },
                      ]}
                      placeholder="Nhập số tài khoản"
                      placeholderTextColor="rgba(115, 119, 130, 0.4)"
                      value={accountNo}
                      onChangeText={setAccountNo}
                      keyboardType="numeric"
                    />
                  </View>
                </View>

                {/* Recipient Name - ReadOnly simulation */}
                <View style={{ marginTop: 16 }}>
                  <Text
                    style={[
                      styles.inputLabel,
                      { fontFamily: fontFamily.bodyBold },
                    ]}
                  >
                    Tên người nhận
                  </Text>
                  <View style={styles.inputWrapper}>
                    <MaterialIcons
                      name="verified-user"
                      size={18}
                      color={colors.primary}
                      style={styles.inputIcon}
                    />
                    <TextInput
                      style={[
                        styles.textInput,
                        styles.textInputPrimary,
                        { fontFamily: fontFamily.headlineBold },
                      ]}
                      value="NGUYEN VAN A"
                      editable={false}
                    />
                  </View>
                </View>
              </View>

              {/* Amount Entry & Quick Actions */}
              <View>
                <Text
                  style={[
                    styles.inputLabel,
                    { fontFamily: fontFamily.bodyBold },
                  ]}
                >
                  Số tiền chuyển
                </Text>
                <View
                  style={[
                    styles.inputWrapper,
                    {
                      borderBottomColor: amount
                        ? colors.primary
                        : colors.outlineVariant,
                    },
                  ]}
                >
                  <MaterialIcons
                    name="payments"
                    size={18}
                    color={amount ? "#003063" : colors.outline}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={[
                      styles.amountInput,
                      { fontFamily: fontFamily.headlineExtraBold },
                    ]}
                    placeholder="0"
                    placeholderTextColor="rgba(115, 119, 130, 0.2)"
                    value={amount}
                    onChangeText={setAmount}
                    keyboardType="numeric"
                  />
                  <Text
                    style={[
                      styles.currencyLabel,
                      { fontFamily: fontFamily.headlineBold },
                    ]}
                  >
                    VND
                  </Text>
                </View>

                {/* Quick Amounts Ribbon ScrollView */}
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.quickAmountsRow}
                >
                  {["500,000", "1,000,000", "5,000,000", "Hết số dư"].map(
                    (aq, idx) => (
                      <TouchableOpacity
                        key={idx}
                        style={styles.quickAmountPill}
                        onPress={() => onQuickAmount(aq)}
                      >
                        <Text
                          style={[
                            styles.quickAmountText,
                            { fontFamily: fontFamily.bodyBold },
                          ]}
                        >
                          {aq}
                        </Text>
                      </TouchableOpacity>
                    ),
                  )}
                </ScrollView>
              </View>

              {/* Transfer Details / Note textarea */}
              <View>
                <Text
                  style={[
                    styles.inputLabel,
                    { fontFamily: fontFamily.bodyBold },
                  ]}
                >
                  Nội dung chuyển khoản
                </Text>
                <View
                  style={[
                    styles.inputWrapper,
                    {
                      borderBottomColor: note
                        ? colors.primary
                        : colors.outlineVariant,
                    },
                  ]}
                >
                  <MaterialIcons
                    name="notes"
                    size={18}
                    color={note ? "#003063" : colors.outline}
                    style={[
                      styles.inputIcon,
                      { alignSelf: "flex-start", marginTop: 2 },
                    ]}
                  />
                  <TextInput
                    style={[
                      styles.textArea,
                      { fontFamily: fontFamily.bodySemiBold },
                    ]}
                    placeholder="Nhập nội dung"
                    placeholderTextColor="rgba(115, 119, 130, 0.4)"
                    value={note}
                    onChangeText={setNote}
                    multiline
                  />
                </View>
              </View>
            </View>

            {/* Next Action Button */}
            <View style={styles.actionBlock}>
              {/* Added onConfirm instead of onBack! Keep user able to go backwards if they prefer through other means... oh wait, TopAppBar doesn't have a back button in TransferScreen. I will add one manually if I can, but the HTML didn't have one! Let's wire onConfirm here! */}
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.primaryBtn}
                onPress={onConfirm}
              >
                <Text
                  style={[
                    styles.primaryBtnText,
                    { fontFamily: fontFamily.headlineBold },
                  ]}
                >
                  Tiếp tục
                </Text>
                <MaterialIcons
                  name="arrow-forward"
                  size={20}
                  color={colors.onPrimary}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Secure Transact Footer Badge */}
          {/* <View style={styles.securityBadge}>
            <MaterialIcons
              name="lock"
              size={12}
              color={colors.onSurfaceVariant}
            />
            <Text
              style={[styles.securityText, { fontFamily: fontFamily.bodyBold }]}
            >
              Giao dịch bảo mật Sovereign AES-256
            </Text>
          </View> */}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

// React Native stylesheet matched to Tailwind variables in HTML
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  root: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  header: {
    height: 64, // h-16
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16, // px-4
    backgroundColor: "rgba(255,255,255,0.8)", // bg-white/80
    shadowColor: "rgba(0, 27, 61, 1)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 30,
    elevation: 4,
    zIndex: 50,
  },
  backBtn: {
    padding: 8, // p-2
    marginLeft: -8, // -ml-2
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  headerCenterTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 16, // text-base
    color: "#003063",
    paddingHorizontal: 32, // px-8
  },
  headerSpacer: {
    width: 40, // w-10
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24, // px-6
    paddingTop: 16, // pt-4
    paddingBottom: 48, // pb-12
  },
  breadcrumbRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8, // gap-2
    marginBottom: 16, // mb-4
  },
  breadcrumbBar: {
    flex: 1,
    height: 4, // h-1
    borderRadius: 4, // rounded-full
    backgroundColor: colors.surfaceContainerHighest,
  },
  breadcrumbActive: {
    backgroundColor: colors.primary,
  },
  headerTitleRow: {
    marginBottom: 16, // mb-4
  },
  headerTitle: {
    fontSize: 24, // text-2xl
    color: colors.onSurface,
    letterSpacing: -0.5, // tracking-tight
  },
  headerSubtitle: {
    fontSize: 11, // text-[11px]
    color: colors.onSurfaceVariant,
    marginTop: 2,
  },
  mainContainer: {
    gap: 12, // space-y-3
  },

  // 1) Source Account Card styling -> mapped
  sourceCard: {
    padding: 16, // p-4
    borderRadius: 24, // rounded-3xl
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)", // border-white/5
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1, // shadow-primary/10
    shadowRadius: 15,
    elevation: 8,
  },
  sourceCardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8, // mb-2
  },
  sourceCardLabel: {
    fontSize: 10, // text-[10px]
    color: "rgba(255,255,255,0.7)",
    letterSpacing: 2, // tracking-widest
    textTransform: "uppercase",
  },
  defaultPill: {
    backgroundColor: colors.secondaryContainer,
    paddingHorizontal: 8, // px-2
    paddingVertical: 2, // py-0.5
    borderRadius: 16, // rounded-full
  },
  defaultPillText: {
    fontSize: 10, // text-[10px]
    color: colors.primary,
  },
  sourceCardBottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sourceAccountNo: {
    fontSize: 16, // text-base
    color: "#ffffff",
  },
  sourceAccountName: {
    fontSize: 10, // text-[10px]
    color: "rgba(255,255,255,0.6)",
  },
  alignRight: {
    alignItems: "flex-end",
  },
  sourceBalance: {
    fontSize: 18, // text-lg
    color: "#ffffff",
  },
  sourceBalanceLabel: {
    fontSize: 10, // text-[10px]
    color: "rgba(255,255,255,0.6)",
  },

  // 2) Form Container styling block
  formBlock: {
    backgroundColor: colors.surfaceContainerLow,
    padding: 20, // p-5
    borderRadius: 32, // rounded-[2rem]
    gap: 16, // space-y-4
  },
  inputLabel: {
    fontSize: 10, // text-[10px]
    color: colors.onSurfaceVariant,
    textTransform: "uppercase",
    letterSpacing: 1, // tracking-wider
    marginBottom: 4, // mb-1
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12, // gap-3
    paddingVertical: 8, // py-2
    borderBottomWidth: 1,
    borderBottomColor: colors.outlineVariant,
  },
  inputIcon: {
    marginRight: 0,
  },
  fakeSelectWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  selectText: {
    fontSize: 14, // text-sm
    color: colors.onSurface,
    flex: 1,
  },
  spacerCol1: {
    // Acts as container mapping for "grid grid-cols-1 gap-4"
  },
  textInput: {
    flex: 1,
    fontSize: 16, // text-base
    color: colors.onSurface,
    padding: 0,
    margin: 0,
    includeFontPadding: false,
  },
  textInputPrimary: {
    color: colors.primary,
    textTransform: "uppercase",
  },
  amountInput: {
    flex: 1,
    fontSize: 24, // text-2xl
    color: colors.onSurface,
    letterSpacing: -0.5, // tracking-tighter
    padding: 0,
    margin: 0,
    includeFontPadding: false,
  },
  currencyLabel: {
    fontSize: 16, // text-base
    color: colors.onSurfaceVariant,
  },
  quickAmountsRow: {
    flexDirection: "row",
    gap: 8, // gap-2
    marginTop: 8, // mt-2
    paddingVertical: 4, // py-1
    paddingRight: 20,
  },
  quickAmountPill: {
    paddingHorizontal: 12, // px-3
    paddingVertical: 6, // py-1.5
    borderRadius: 20, // rounded-full
    backgroundColor: colors.surfaceContainer,
  },
  quickAmountText: {
    fontSize: 10, // text-[10px]
    color: colors.onSurface,
  },
  textArea: {
    flex: 1,
    fontSize: 14, // text-sm
    color: colors.onSurface,
    minHeight: 24,
    textAlignVertical: "top",
    padding: 0,
    margin: 0,
  },

  // 3) Action Button styling
  actionBlock: {
    paddingTop: 8, // pt-2
  },
  primaryBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8, // gap-2
    backgroundColor: colors.primary,
    paddingVertical: 16, // py-4
    borderRadius: 16, // rounded-2xl
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2, // shadow-primary/20
    shadowRadius: 15,
    elevation: 8,
  },
  primaryBtnText: {
    fontSize: 16, // text-base
    color: colors.onPrimary,
  },

  // 4) Trust/Security Badge Footer
  securityBadge: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6, // gap-1.5
    marginTop: 24, // mt-6
    opacity: 0.5,
  },
  securityText: {
    fontSize: 9, // text-[9px]
    color: colors.onSurfaceVariant,
    letterSpacing: 2, // tracking-widest
    textTransform: "uppercase",
  },
});
