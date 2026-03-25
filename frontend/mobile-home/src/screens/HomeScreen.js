import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import TopAppBar from '../components/TopAppBar';
import BalanceCard from '../components/BalanceCard';
import QuickActionsCarousel from '../components/QuickActionsCarousel';
import BentoGrid from '../components/BentoGrid';
import BottomNav from '../components/BottomNav';
import { colors } from '../theme/colors';

// Shared font map passed down to components for consistency
const fontFamily = {
  headlineExtraBold: 'Manrope_800ExtraBold',
  headlineBold: 'Manrope_700Bold',
  headlineSemiBold: 'Manrope_600SemiBold',
  bodyRegular: 'Inter_400Regular',
  bodyMedium: 'Inter_500Medium',
  bodySemiBold: 'Inter_600SemiBold',
  bodyBold: 'Inter_700Bold',
};

export default function HomeScreen({ onLogout, onNavigate }) {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.root}>
        {/* Sticky header */}
        <TopAppBar fontFamily={fontFamily} />

        {/* Scrollable body */}
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Balance card */}
          <BalanceCard fontFamily={fontFamily} onNavigate={onNavigate} />

          {/* Quick actions */}
          <QuickActionsCarousel fontFamily={fontFamily} onActionPress={(route) => route && onNavigate?.(route)} />

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
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});
