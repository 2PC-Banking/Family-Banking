import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

const QUICK_ACTIONS = [
  { icon: 'send',         label: 'Chuyển tiền', route: 'transfer' },
  { icon: 'receipt-long', label: 'Hóa đơn',    route: 'bill' },
  { icon: 'smartphone',   label: 'Nạp tiền',   route: 'topup' },
  { icon: 'savings',      label: 'Tiết kiệm',  route: 'saving' },
  { icon: 'credit-card',  label: 'Thẻ',        route: 'card' },
];

/**
 * QuickActionsCarousel – horizontal scrollable row of quick-action items.
 */
export default function QuickActionsCarousel({ fontFamily, onActionPress }) {
  const headlineBold = fontFamily?.headlineBold ?? 'Manrope_700Bold';
  const bodySemiBold = fontFamily?.bodySemiBold ?? 'Inter_600SemiBold';
  const bodyBold = fontFamily?.bodyBold ?? 'Inter_700Bold';

  return (
    <View style={styles.section}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { fontFamily: headlineBold }]}>Dịch vụ nhanh</Text>
        <TouchableOpacity activeOpacity={0.7}>
          <Text style={[styles.seeAll, { fontFamily: bodyBold }]}>Tất cả</Text>
        </TouchableOpacity>
      </View>

      {/* Scroll row */}
      <View style={styles.scrollWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollRow}
          style={styles.scrollView}
        >
          {QUICK_ACTIONS.map(({ icon, label, route }) => (
            <TouchableOpacity
              key={label}
              style={styles.actionItem}
              activeOpacity={0.75}
              onPress={() => onActionPress?.(route)}
            >
              <View style={styles.actionIconBox}>
                <MaterialIcons name={icon} size={24} color={colors.primary} />
              </View>
              <Text style={[styles.actionLabel, { fontFamily: bodySemiBold }]}>
                {label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 24, // mb-6
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12, // mb-3
  },
  title: {
    fontSize: 18, // text-lg
    color: colors.onSurface,
  },
  seeAll: {
    fontSize: 12, // text-xs
    color: colors.primary,
    textDecorationLine: 'underline',
  },
  scrollWrapper: {
    marginHorizontal: -24, // -mx-6
  },
  scrollView: {
    paddingHorizontal: 24, // px-6
  },
  scrollRow: {
    gap: 16, // gap-4
    paddingBottom: 8, // pb-2
    paddingRight: 48, // space at the end to accommodate extra padding bounds
  },
  actionItem: {
    alignItems: 'center',
    gap: 8, // gap-2
    minWidth: 84, // min-w-[84px]
  },
  actionIconBox: {
    width: 64, // w-16
    height: 64, // h-16
    borderRadius: 24, // rounded-[1.5rem]
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  actionLabel: {
    fontSize: 11, // text-[11px]
    color: colors.onSurfaceVariant,
    textAlign: 'center',
  },
});
