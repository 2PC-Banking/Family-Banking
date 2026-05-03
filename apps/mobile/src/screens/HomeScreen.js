import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  RefreshControl, // Import thêm RefreshControl để làm tính năng kéo làm mới
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import TopAppBar from "../components/TopAppBar";
import BalanceCard from "../components/BalanceCard";
import QuickActionsCarousel from "../components/QuickActionsCarousel";
import BentoGrid from "../components/BentoGrid";
import BottomNav from "../components/BottomNav";
import { colors } from "../theme/colors";

// Import API
import { getBalanceAPI } from "../services/apiService";

// Shared font map passed down to components for consistency
const fontFamily = {
  headlineExtraBold: "Manrope_800ExtraBold",
  headlineBold: "Manrope_700Bold",
  headlineSemiBold: "Manrope_600SemiBold",
  bodyRegular: "Inter_400Regular",
  bodyMedium: "Inter_500Medium",
  bodySemiBold: "Inter_600SemiBold",
  bodyBold: "Inter_700Bold",
};

export default function HomeScreen({ onLogout, onNavigate }) {
  const [activeTab, setActiveTab] = useState("home");

  // State lưu trữ dữ liệu thực tế
  const [userInfo, setUserInfo] = useState({
    name: "Khách hàng",
    accountnumber: "---",
  });
  const [balance, setBalance] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  // Hàm tải dữ liệu người dùng và số dư
  const loadUserData = async () => {
    try {
      // Lấy thông tin đã lưu lúc Login
      const userStr = await AsyncStorage.getItem("userData");
      if (userStr) {
        const user = JSON.parse(userStr);
        setUserInfo({ name: user.name, accountnumber: user.accountnumber });

        // Gọi API lấy số dư mới nhất
        const balanceData = await getBalanceAPI(user.accountnumber);
        setBalance(balanceData.balance);
      }
    } catch (error) {
      console.log("Lỗi tải dữ liệu Home:", error);
    }
  };

  // Chạy lần đầu tiên khi mở màn hình
  useEffect(() => {
    loadUserData();
  }, []);

  // Xử lý khi người dùng kéo màn hình xuống để refresh
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadUserData();
    setRefreshing(false);
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.root}>
        {/* Sticky header - Truyền thêm props userName để component con hiển thị */}
        <TopAppBar fontFamily={fontFamily} userName={userInfo.name} />

        {/* Scrollable body có tích hợp Kéo để làm mới */}
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={colors.primary}
              colors={[colors.primary]} // Cho Android
            />
          }
        >
          {/* Balance card - Truyền dữ liệu thật xuống */}
          <BalanceCard
            fontFamily={fontFamily}
            balance={balance}
            accountnumber={userInfo.accountnumber}
            onNavigate={onNavigate}
          />

          {/* Quick actions */}
          <QuickActionsCarousel
            fontFamily={fontFamily}
            onActionPress={(route) => route && onNavigate?.(route)}
          />

          {/* Bento info grid */}
          <BentoGrid fontFamily={fontFamily} />
        </ScrollView>

        {/* Bottom navigation (absolutely positioned inside root) */}
        <View style={styles.navBar}>
          <BottomNav
            activeTab={activeTab}
            onTabChange={setActiveTab}
            fontFamily={fontFamily}
          />
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
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24, // px-6
    paddingTop: 16, // pt-4
    paddingBottom: 128, // pb-32 (space for bottom nav)
  },
  navBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
});
