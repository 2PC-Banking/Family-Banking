import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

/**
 * BentoGrid – a 2-column bento-style info grid:
 *   Row 1 (full width): Heritage loyalty points
 *   Row 2 (two halves): Smart OTP | Support 24/7
 */
export default function BentoGrid({ fontFamily }) {
  const headlineBold = fontFamily?.headlineBold ?? 'Manrope_700Bold';
  const bodyRegular = fontFamily?.bodyRegular ?? 'Inter_400Regular';
  const bodyBold = fontFamily?.bodyBold ?? 'Inter_700Bold';

  return (
    <View style={styles.grid}>
      {/* Full-width: loyalty points */}
      <TouchableOpacity style={styles.loyaltyCard} activeOpacity={0.8}>
        <View style={styles.loyaltyLeft}>
          <View style={styles.loyaltyIcon}>
            <MaterialIcons name="loyalty" size={24} color={colors.tertiary} />
          </View>
          <View>
            <Text style={[styles.loyaltyTitle, { fontFamily: bodyBold }]}>
              Điểm thưởng Heritage
            </Text>
            <Text style={[styles.loyaltyPoints, { fontFamily: bodyRegular }]}>
              2,450 points
            </Text>
          </View>
        </View>
        <MaterialIcons name="chevron-right" size={24} color={colors.outline} />
      </TouchableOpacity>

      {/* Half-width row */}
      <View style={styles.halfRow}>
        {/* Smart OTP */}
        <TouchableOpacity style={[styles.halfCard, styles.otpCard]} activeOpacity={0.8}>
          <View style={styles.halfIcon}>
            <MaterialIcons name="security" size={20} color={colors.primary} />
          </View>
          <View style={styles.halfTextWrapper}>
            <Text style={[styles.halfTitle, { fontFamily: bodyBold }]}>Smart OTP</Text>
            <Text style={[styles.halfSub, { fontFamily: bodyRegular }]}>Đang kích hoạt</Text>
          </View>
        </TouchableOpacity>

        {/* Support 24/7 */}
        <TouchableOpacity style={[styles.halfCard, styles.supportCard]} activeOpacity={0.8}>
          <View style={styles.halfIcon}>
            <MaterialIcons name="support-agent" size={20} color={colors.primary} />
          </View>
          <View style={styles.halfTextWrapper}>
            <Text style={[styles.halfTitle, { fontFamily: bodyBold }]}>Hỗ trợ 24/7</Text>
            <Text style={[styles.halfSub, { fontFamily: bodyRegular }]}>Gặp chuyên viên</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    gap: 16, // gap-4
    marginBottom: 24,
  },

  // Loyalty row
  loyaltyCard: {
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 24, // rounded-3xl
    padding: 20, // p-5
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  loyaltyLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16, // gap-4
  },
  loyaltyIcon: {
    width: 48, // w-12
    height: 48, // h-12
    borderRadius: 16, // rounded-2xl
    backgroundColor: colors.tertiaryFixed,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loyaltyTitle: {
    fontSize: 14, // text-sm
    color: colors.onSurface,
  },
  loyaltyPoints: {
    fontSize: 12, // text-xs
    color: colors.onSurfaceVariant,
    marginTop: 2,
  },

  // Half cards row
  halfRow: {
    flexDirection: 'row',
    gap: 16, // gap-4
  },
  halfCard: {
    flex: 1,
    borderRadius: 24, // rounded-3xl
    padding: 20, // p-5
    flexDirection: 'column',
    gap: 12, // gap-3
  },
  otpCard: {
    backgroundColor: 'rgba(208, 226, 241, 0.3)', // bg-secondary-container/30
  },
  supportCard: {
    backgroundColor: 'rgba(214, 227, 255, 0.2)', // bg-primary-fixed/20
  },
  halfIcon: {
    width: 40, // w-10
    height: 40, // h-10
    borderRadius: 12, // rounded-xl
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  halfTextWrapper: {
    flexDirection: 'column',
  },
  halfTitle: {
    fontSize: 12, // text-xs
    color: colors.onSurface,
  },
  halfSub: {
    fontSize: 10, // text-[10px]
    color: colors.onSurfaceVariant,
  },
});
