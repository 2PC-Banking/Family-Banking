import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,              // Thêm Alert để hiện thông báo lỗi/thành công
  ActivityIndicator,  // Thêm ActivityIndicator để làm icon loading
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../theme/colors";

// IMPORT apiClient để gọi Backend (Nhớ kiểm tra lại đường dẫn import này cho đúng với project của bạn)
import { apiClient } from "../services/apiClient"; 

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
  
  // Thêm state để quản lý trạng thái đang gọi API
  const [isLoading, setIsLoading] = useState(false);

  const onQuickAmount = (val) => {
    setAmount(val.replace(/,/g, ""));
  };

  // HÀM XỬ LÝ KHI BẤM NÚT TIẾP TỤC
  const handleContinue = async () => {
    // 1. Kiểm tra đầu vào (Validation)
    if (!accountNo || !amount) {
      Alert.alert("Thông báo", "Vui lòng nhập đầy đủ số tài khoản và số tiền.");
      return;
    }

    const numericAmount = parseFloat(amount.replace(/,/g, ""));
    if (isNaN(numericAmount) || numericAmount <= 0) {
      Alert.alert("Thông báo", "Số tiền chuyển không hợp lệ.");
      return;
    }

    // 2. Bắt đầu gọi API
    setIsLoading(true);

    try {
      // Gọi API chuyển tiền
      const response = await apiClient("/transfer", {
        method: "POST",
        body: JSON.stringify({
          // Hardcode FromAccount tạm thời khớp với giao diện (phải có trong DB của bạn)
          FromAccount: "091288889999", 
          ToAccount: accountNo,
          Amount: numericAmount
        }),
      });

      // 3. Xử lý thành công
      Alert.alert("Thành công", response.message || "Chuyển tiền thành công!", [
        {
          text: "OK",
          onPress: () => {
            // Gọi onConfirm để báo cho component cha biết chuyển hướng (sang SuccessScreen)
            if (onConfirm) onConfirm(response);
          },
        },
      ]);
    } catch (error) {
      // 4. Xử lý lỗi (Lấy message từ apiClient.js ném ra)
      Alert.alert("Giao dịch thất bại", error.message || "Không thể kết nối đến máy chủ.");
    } finally {
      setIsLoading(false); // Tắt hiệu ứng loading
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.root}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity activeOpacity={0.7} style={styles.backBtn} onPress={onBack}>
            <MaterialIcons name="arrow-back" size={24} color="#003063" />
          </TouchableOpacity>
          <Text style={[styles.headerCenterTitle, { fontFamily: fontFamily.headlineExtraBold }]}>
            Chuyển tiền đến số tài khoản
          </Text>
          <View style={styles.headerSpacer} />
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Breadcrumb */}
          <View style={styles.breadcrumbRow}>
            <View style={[styles.breadcrumbBar, styles.breadcrumbActive]} />
            <View style={styles.breadcrumbBar} />
            <View style={styles.breadcrumbBar} />
          </View>

          {/* Title */}
          <View style={styles.headerTitleRow}>
            <Text style={[styles.headerTitle, { fontFamily: fontFamily.headlineExtraBold }]}>
              Chuyển tiền
            </Text>
            <Text style={[styles.headerSubtitle, { fontFamily: fontFamily.bodyMedium }]}>
              Bước 1: Nhập thông tin giao dịch thụ hưởng
            </Text>
          </View>

          {/* Main Form */}
          <View style={styles.mainContainer}>
            {/* Source Account Card */}
            <LinearGradient
              colors={[colors.primary, colors.primaryContainer]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.sourceCard}
            >
              <View style={styles.sourceCardTop}>
                <Text style={[styles.sourceCardLabel, { fontFamily: fontFamily.bodyBold }]}>
                  Tài khoản nguồn
                </Text>
                <View style={styles.defaultPill}>
                  <Text style={[styles.defaultPillText, { fontFamily: fontFamily.bodyBold }]}>DEFAULT</Text>
                </View>
              </View>

              <View style={styles.sourceCardBottom}>
                <View>
                  <Text style={[styles.sourceAccountNo, { fontFamily: fontFamily.headlineBold, fontSize: 15 }]}>
                    0912 8888 9999
                  </Text>
                  <Text style={[styles.sourceAccountName, { fontFamily: fontFamily.bodyRegular }]}>
                    Signature Savings
                  </Text>
                </View>
                <View style={styles.alignRight}>
                  <Text style={[styles.sourceBalance, { fontFamily: fontFamily.headlineExtraBold, fontSize: 18 }]}>
                    2,450,000,000 ₫
                  </Text>
                  <Text style={[styles.sourceBalanceLabel, { fontFamily: fontFamily.bodyRegular }]}>Khả dụng</Text>
                </View>
              </View>
            </LinearGradient>

            {/* Form Inputs */}
            <View style={styles.formBlock}>
              {/* Target Bank */}
              <View>
                <Text style={[styles.inputLabel, { fontFamily: fontFamily.bodyBold }]}>Ngân hàng thụ hưởng</Text>
                <View style={styles.inputWrapper}>
                  <MaterialIcons name="account-balance" size={18} color={colors.outline} style={styles.inputIcon} />
                  <TouchableOpacity style={styles.fakeSelectWrapper} activeOpacity={0.7}>
                    <Text style={[styles.selectText, { fontFamily: fontFamily.bodySemiBold }]} numberOfLines={1}>
                      {bank}
                    </Text>
                    <MaterialIcons name="expand-more" size={18} color={colors.outline} />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Account Number & Name */}
              <View style={styles.spacerCol1}>
                <View>
                  <Text style={[styles.inputLabel, { fontFamily: fontFamily.bodyBold }]}>Số tài khoản</Text>
                  <View style={[styles.inputWrapper, { borderBottomColor: accountNo ? colors.primary : colors.outlineVariant }]}>
                    <MaterialIcons name="dialpad" size={18} color={accountNo ? "#003063" : colors.outline} style={styles.inputIcon} />
                    <TextInput
                      style={[styles.textInput, { fontFamily: fontFamily.headlineBold }]}
                      placeholder="Nhập số tài khoản"
                      placeholderTextColor="rgba(115, 119, 130, 0.4)"
                      value={accountNo}
                      onChangeText={setAccountNo}
                      keyboardType="numeric"
                    />
                  </View>
                </View>

                <View style={{ marginTop: 16 }}>
                  <Text style={[styles.inputLabel, { fontFamily: fontFamily.bodyBold }]}>Tên người nhận</Text>
                  <View style={styles.inputWrapper}>
                    <MaterialIcons name="verified-user" size={18} color={colors.primary} style={styles.inputIcon} />
                    <TextInput
                      style={[styles.textInput, styles.textInputPrimary, { fontFamily: fontFamily.headlineBold }]}
                      value="NGUYEN VAN A"
                      editable={false}
                    />
                  </View>
                </View>
              </View>

              {/* Amount */}
              <View>
                <Text style={[styles.inputLabel, { fontFamily: fontFamily.bodyBold }]}>Số tiền chuyển</Text>
                <View style={[styles.inputWrapper, { borderBottomColor: amount ? colors.primary : colors.outlineVariant }]}>
                  <MaterialIcons name="payments" size={18} color={amount ? "#003063" : colors.outline} style={styles.inputIcon} />
                  <TextInput
                    style={[styles.amountInput, { fontFamily: fontFamily.headlineExtraBold }]}
                    placeholder="0"
                    placeholderTextColor="rgba(115, 119, 130, 0.2)"
                    value={amount}
                    onChangeText={setAmount}
                    keyboardType="numeric"
                  />
                  <Text style={[styles.currencyLabel, { fontFamily: fontFamily.headlineBold }]}>VND</Text>
                </View>

                {/* Quick Amounts */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.quickAmountsRow}>
                  {["500,000", "1,000,000", "5,000,000", "Hết số dư"].map((aq, idx) => (
                    <TouchableOpacity key={idx} style={styles.quickAmountPill} onPress={() => onQuickAmount(aq)}>
                      <Text style={[styles.quickAmountText, { fontFamily: fontFamily.bodyBold }]}>{aq}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              {/* Note */}
              <View>
                <Text style={[styles.inputLabel, { fontFamily: fontFamily.bodyBold }]}>Nội dung chuyển khoản</Text>
                <View style={[styles.inputWrapper, { borderBottomColor: note ? colors.primary : colors.outlineVariant }]}>
                  <MaterialIcons name="notes" size={18} color={note ? "#003063" : colors.outline} style={[styles.inputIcon, { alignSelf: "flex-start", marginTop: 2 }]} />
                  <TextInput
                    style={[styles.textArea, { fontFamily: fontFamily.bodySemiBold }]}
                    placeholder="Nhập nội dung"
                    placeholderTextColor="rgba(115, 119, 130, 0.4)"
                    value={note}
                    onChangeText={setNote}
                    multiline
                  />
                </View>
              </View>
            </View>

            {/* ACTION BUTTON MỚI */}
            <View style={styles.actionBlock}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={[styles.primaryBtn, isLoading && { opacity: 0.7 }]}
                onPress={handleContinue}
                disabled={isLoading} // Khoá nút khi đang gọi API
              >
                {isLoading ? (
                  <ActivityIndicator color="#ffffff" />
                ) : (
                  <>
                    <Text style={[styles.primaryBtnText, { fontFamily: fontFamily.headlineBold }]}>Tiếp tục</Text>
                    <MaterialIcons name="arrow-forward" size={20} color={colors.onPrimary} />
                  </>
                )}
              </TouchableOpacity>
            </View>
          </View>

          {/* Footer */}
          <View style={styles.securityBadge}>
            <MaterialIcons name="lock" size={12} color={colors.onSurfaceVariant} />
            <Text style={[styles.securityText, { fontFamily: fontFamily.bodyBold }]}>Giao dịch bảo mật Sovereign AES-256</Text>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

// Giữ nguyên toàn bộ Object styles như cũ của bạn ở dưới đây
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.surface },
  root: { flex: 1, backgroundColor: colors.surface },
  header: { height: 64, flexDirection: "row", alignItems: "center", paddingHorizontal: 16, backgroundColor: "rgba(255,255,255,0.8)", shadowColor: "rgba(0, 27, 61, 1)", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.03, shadowRadius: 30, elevation: 4, zIndex: 50 },
  backBtn: { padding: 8, marginLeft: -8, width: 40, height: 40, alignItems: "center", justifyContent: "center" },
  headerCenterTitle: { flex: 1, textAlign: "center", fontSize: 16, color: "#003063", paddingHorizontal: 32 },
  headerSpacer: { width: 40 },
  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 24, paddingTop: 16, paddingBottom: 48 },
  breadcrumbRow: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 16 },
  breadcrumbBar: { flex: 1, height: 4, borderRadius: 4, backgroundColor: colors.surfaceContainerHighest },
  breadcrumbActive: { backgroundColor: colors.primary },
  headerTitleRow: { marginBottom: 16 },
  headerTitle: { fontSize: 24, color: colors.onSurface, letterSpacing: -0.5 },
  headerSubtitle: { fontSize: 11, color: colors.onSurfaceVariant, marginTop: 2 },
  mainContainer: { gap: 12 },
  sourceCard: { padding: 16, borderRadius: 24, borderWidth: 1, borderColor: "rgba(255,255,255,0.05)", shadowColor: colors.primary, shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 15, elevation: 8 },
  sourceCardTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 },
  sourceCardLabel: { fontSize: 10, color: "rgba(255,255,255,0.7)", letterSpacing: 2, textTransform: "uppercase" },
  defaultPill: { backgroundColor: colors.secondaryContainer, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 16 },
  defaultPillText: { fontSize: 10, color: colors.primary },
  sourceCardBottom: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  sourceAccountNo: { fontSize: 16, color: "#ffffff" },
  sourceAccountName: { fontSize: 10, color: "rgba(255,255,255,0.6)" },
  alignRight: { alignItems: "flex-end" },
  sourceBalance: { fontSize: 18, color: "#ffffff" },
  sourceBalanceLabel: { fontSize: 10, color: "rgba(255,255,255,0.6)" },
  formBlock: { backgroundColor: colors.surfaceContainerLow, padding: 20, borderRadius: 32, gap: 16 },
  inputLabel: { fontSize: 10, color: colors.onSurfaceVariant, textTransform: "uppercase", letterSpacing: 1, marginBottom: 4 },
  inputWrapper: { flexDirection: "row", alignItems: "center", gap: 12, paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: colors.outlineVariant },
  inputIcon: { marginRight: 0 },
  fakeSelectWrapper: { flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  selectText: { fontSize: 14, color: colors.onSurface, flex: 1 },
  spacerCol1: {},
  textInput: { flex: 1, fontSize: 16, color: colors.onSurface, padding: 0, margin: 0, includeFontPadding: false },
  textInputPrimary: { color: colors.primary, textTransform: "uppercase" },
  amountInput: { flex: 1, fontSize: 24, color: colors.onSurface, letterSpacing: -0.5, padding: 0, margin: 0, includeFontPadding: false },
  currencyLabel: { fontSize: 16, color: colors.onSurfaceVariant },
  quickAmountsRow: { flexDirection: "row", gap: 8, marginTop: 8, paddingVertical: 4, paddingRight: 20 },
  quickAmountPill: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, backgroundColor: colors.surfaceContainer },
  quickAmountText: { fontSize: 10, color: colors.onSurface },
  textArea: { flex: 1, fontSize: 14, color: colors.onSurface, minHeight: 24, textAlignVertical: "top", padding: 0, margin: 0 },
  actionBlock: { paddingTop: 8 },
  primaryBtn: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8, backgroundColor: colors.primary, paddingVertical: 16, borderRadius: 16, shadowColor: colors.primary, shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.2, shadowRadius: 15, elevation: 8 },
  primaryBtnText: { fontSize: 16, color: colors.onPrimary },
  securityBadge: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6, marginTop: 24, opacity: 0.5 },
  securityText: { fontSize: 9, color: colors.onSurfaceVariant, letterSpacing: 2, textTransform: "uppercase" },
});