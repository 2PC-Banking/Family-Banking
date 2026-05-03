import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  Modal, 
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Import API (Bổ sung thêm requestOtpAPI)
import { getBalanceAPI, getAccountInfoAPI, requestOtpAPI } from "../services/apiService"; 

const fontFamily = {
  headlineExtraBold: "Manrope_800ExtraBold",
  headlineBold: "Manrope_700Bold",
  headlineSemiBold: "Manrope_600SemiBold",
  bodyRegular: "Inter_400Regular",
  bodyMedium: "Inter_500Medium",
  bodySemiBold: "Inter_600SemiBold",
  bodyBold: "Inter_700Bold",
};

const BANKS = [
  "Heritage Digital Bank (Nội bộ)",
  "Vietcombank - NHTMCP Ngoại Thương VN",
  "Techcombank - NHTMCP Kỹ Thương VN",
  "MBBank - NHTMCP Quân Đội",
  "BIDV - NHTMCP Đầu tư và Phát triển VN"
];

export default function TransferScreen({ onBack, onConfirm }) {
  const [bank, setBank] = useState(BANKS[0]);
  const [isBankModalVisible, setBankModalVisible] = useState(false); 

  const [accountNo, setAccountNo] = useState("");
  const [recipientName, setRecipientName] = useState(""); 
  const [isFetchingName, setIsFetchingName] = useState(false);

  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("Chuyen tien");
  
  const [myAccount, setMyAccount] = useState({ accountnumber: "---", balance: 0 });
  const [isLoading, setIsLoading] = useState(false); // State quản lý loading khi bấm nút

  useEffect(() => {
    const fetchMyData = async () => {
      const userStr = await AsyncStorage.getItem("userData");
      if (userStr) {
        const { accountnumber } = JSON.parse(userStr);
        try {
            const data = await getBalanceAPI(accountnumber);
            setMyAccount({ accountnumber: data.accountnumber, balance: data.balance });
        } catch (error) {
            console.log("Không thể lấy số dư, có thể tài khoản chưa tồn tại trong DB.");
        }
      }
    };
    fetchMyData();
  }, []);

  useEffect(() => {
    const fetchRecipientName = async () => {
      if (accountNo.length >= 5) {
        setIsFetchingName(true);
        if (bank === "Heritage Digital Bank (Nội bộ)") {
          try {
            const res = await getAccountInfoAPI(accountNo);
            setRecipientName(res.customerName);
          } catch (error) {
            setRecipientName("KHÔNG TÌM THẤY TÀI KHOẢN");
          }
        } else {
          setRecipientName("NGUYEN VAN A (Liên ngân hàng)");
        }
        setIsFetchingName(false);
      } else {
        setRecipientName("");
      }
    };

    const delayDebounceFn = setTimeout(() => {
      fetchRecipientName();
    }, 800);

    return () => clearTimeout(delayDebounceFn);
  }, [accountNo, bank]);

  const onQuickAmount = (val) => setAmount(val.replace(/,/g, ""));

  const handleContinue = async () => {
    if (!myAccount.accountnumber || myAccount.accountnumber === "---") {
        Alert.alert("Lỗi bảo mật", "Tài khoản của bạn chưa được thiết lập số tài khoản thẻ. Vui lòng liên hệ CSKH.");
        return;
    }

    const numericAmount = parseFloat(amount.replace(/,/g, ""));
    if (!accountNo || isNaN(numericAmount) || numericAmount <= 0) {
      Alert.alert("Lỗi", "Vui lòng nhập số liệu hợp lệ.");
      return;
    }
    if (recipientName === "KHÔNG TÌM THẤY TÀI KHOẢN" || recipientName === "") {
      Alert.alert("Lỗi", "Số tài khoản nhận không hợp lệ.");
      return;
    }
    if (numericAmount > myAccount.balance) {
      Alert.alert("Lỗi", "Số dư không đủ để thực hiện giao dịch.");
      return;
    }

    // GỌI API YÊU CẦU GỬI OTP TRƯỚC KHI CHUYỂN TRANG
    setIsLoading(true);
    try {
        await requestOtpAPI(myAccount.accountnumber); 
        
        const payload = {
          FromAccount: myAccount.accountnumber,
          ToAccount: accountNo,
          Amount: numericAmount,
          Note: note,
          RecipientName: recipientName, 
        };
        
        if (onConfirm) onConfirm(payload); 
    } catch (error) {
        Alert.alert("Lỗi", error.message || "Không thể yêu cầu mã OTP");
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.root}>
        <View style={styles.header}>
          <TouchableOpacity activeOpacity={0.7} style={styles.backBtn} onPress={onBack}>
            <MaterialIcons name="arrow-back" size={24} color="#003063" />
          </TouchableOpacity>
          <Text style={[styles.headerCenterTitle, { fontFamily: fontFamily.headlineExtraBold }]}>Chuyển tiền</Text>
          <View style={styles.headerSpacer} />
        </View>

        <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.mainContainer}>
            <LinearGradient colors={[colors.primary, colors.primaryContainer]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.sourceCard}>
              <View style={styles.sourceCardTop}>
                <Text style={[styles.sourceCardLabel, { fontFamily: fontFamily.bodyBold }]}>Tài khoản nguồn</Text>
                <View style={styles.defaultPill}><Text style={[styles.defaultPillText, { fontFamily: fontFamily.bodyBold }]}>DEFAULT</Text></View>
              </View>
              <View style={styles.sourceCardBottom}>
                <View>
                  <Text style={[styles.sourceAccountNo, { fontFamily: fontFamily.headlineBold }]}>{myAccount.accountnumber}</Text>
                  <Text style={[styles.sourceAccountName, { fontFamily: fontFamily.bodyRegular }]}>Tài khoản thanh toán</Text>
                </View>
                <View style={styles.alignRight}>
                  <Text style={[styles.sourceBalance, { fontFamily: fontFamily.headlineExtraBold }]}>{myAccount.balance.toLocaleString('vi-VN')} ₫</Text>
                  <Text style={[styles.sourceBalanceLabel, { fontFamily: fontFamily.bodyRegular }]}>Khả dụng</Text>
                </View>
              </View>
            </LinearGradient>

            <View style={styles.formBlock}>
              <View>
                <Text style={[styles.inputLabel, { fontFamily: fontFamily.bodyBold }]}>Ngân hàng thụ hưởng</Text>
                <View style={styles.inputWrapper}>
                  <MaterialIcons name="account-balance" size={18} color={colors.outline} style={styles.inputIcon} />
                  <TouchableOpacity style={styles.fakeSelectWrapper} activeOpacity={0.7} onPress={() => setBankModalVisible(true)}>
                    <Text style={[styles.selectText, { fontFamily: fontFamily.bodySemiBold }]} numberOfLines={1}>
                      {bank}
                    </Text>
                    <MaterialIcons name="expand-more" size={18} color={colors.outline} />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={styles.spacerCol1}>
                <View>
                  <Text style={[styles.inputLabel, { fontFamily: fontFamily.bodyBold }]}>Số tài khoản</Text>
                  <View style={[styles.inputWrapper, { borderBottomColor: accountNo ? colors.primary : colors.outlineVariant }]}>
                    <MaterialIcons name="dialpad" size={18} color={accountNo ? "#003063" : colors.outline} style={styles.inputIcon} />
                    <TextInput style={[styles.textInput, { fontFamily: fontFamily.headlineBold }]} placeholder="Nhập số tài khoản" placeholderTextColor="rgba(115, 119, 130, 0.4)" value={accountNo} onChangeText={setAccountNo} keyboardType="numeric" />
                  </View>
                </View>

                <View style={{ marginTop: 16 }}>
                  <Text style={[styles.inputLabel, { fontFamily: fontFamily.bodyBold }]}>Tên người nhận</Text>
                  <View style={[styles.inputWrapper, { backgroundColor: 'rgba(0,0,0,0.02)', borderRadius: 8, paddingHorizontal: 8, borderBottomWidth: 0, marginTop: 4 }]}>
                    <MaterialIcons name="verified-user" size={18} color={colors.primary} style={styles.inputIcon} />
                    {isFetchingName ? (
                        <ActivityIndicator size="small" color={colors.primary} style={{ marginLeft: 10 }} />
                    ) : (
                        <TextInput 
                            style={[styles.textInput, styles.textInputPrimary, { fontFamily: fontFamily.headlineBold, color: recipientName.includes("KHÔNG") ? 'red' : colors.primary }]} 
                            value={recipientName || "Vui lòng nhập Số TK"} 
                            editable={false} 
                        />
                    )}
                  </View>
                </View>
              </View>

              <View>
                <Text style={[styles.inputLabel, { fontFamily: fontFamily.bodyBold }]}>Số tiền chuyển</Text>
                <View style={[styles.inputWrapper, { borderBottomColor: amount ? colors.primary : colors.outlineVariant }]}>
                  <TextInput style={[styles.amountInput, { fontFamily: fontFamily.headlineExtraBold }]} placeholder="0" placeholderTextColor="rgba(115, 119, 130, 0.2)" value={amount} onChangeText={setAmount} keyboardType="numeric" />
                  <Text style={[styles.currencyLabel, { fontFamily: fontFamily.headlineBold }]}>VND</Text>
                </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.quickAmountsRow}>
                  {["500,000", "1,000,000", "5,000,000"].map((aq, idx) => (
                    <TouchableOpacity key={idx} style={styles.quickAmountPill} onPress={() => onQuickAmount(aq)}>
                      <Text style={[styles.quickAmountText, { fontFamily: fontFamily.bodyBold }]}>{aq}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
              
              <View>
                <Text style={[styles.inputLabel, { fontFamily: fontFamily.bodyBold }]}>Nội dung</Text>
                <View style={[styles.inputWrapper, { borderBottomColor: note ? colors.primary : colors.outlineVariant }]}>
                  <TextInput style={[styles.textArea, { fontFamily: fontFamily.bodySemiBold }]} placeholder="Nhập nội dung" value={note} onChangeText={setNote} multiline />
                </View>
              </View>
            </View>

            <View style={styles.actionBlock}>
              <TouchableOpacity activeOpacity={0.8} style={[styles.primaryBtn, isLoading && { opacity: 0.7 }]} onPress={handleContinue} disabled={isLoading}>
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
        </ScrollView>

        <Modal visible={isBankModalVisible} animationType="slide" transparent={true}>
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    <View style={styles.modalHeader}>
                        <Text style={[styles.modalTitle, { fontFamily: fontFamily.headlineBold }]}>Chọn ngân hàng</Text>
                        <TouchableOpacity onPress={() => setBankModalVisible(false)}>
                            <MaterialIcons name="close" size={24} color={colors.onSurfaceVariant} />
                        </TouchableOpacity>
                    </View>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {BANKS.map((item, index) => (
                            <TouchableOpacity 
                                key={index} 
                                style={[styles.bankItem, bank === item && styles.bankItemActive]}
                                onPress={() => { setBank(item); setBankModalVisible(false); }}
                            >
                                <Text style={[styles.bankItemText, { fontFamily: fontFamily.bodySemiBold }]}>{item}</Text>
                                {bank === item && <MaterialIcons name="check-circle" size={20} color={colors.primary} />}
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            </View>
        </Modal>

      </View>
    </SafeAreaView>
  );
}

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
  
  // Style Modal
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: colors.surface, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, maxHeight: '60%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  modalTitle: { fontSize: 18, color: colors.onSurface },
  bankItem: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: colors.surfaceContainerHighest },
  bankItemActive: { backgroundColor: 'rgba(0, 48, 99, 0.05)', borderRadius: 12, paddingHorizontal: 12, borderBottomWidth: 0 },
  bankItemText: { fontSize: 15, color: colors.onSurface },
});