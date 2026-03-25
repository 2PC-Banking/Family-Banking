import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

const fontFamily = {
  headlineExtraBold: 'Manrope_800ExtraBold',
  headlineBold: 'Manrope_700Bold',
  headlineSemiBold: 'Manrope_600SemiBold',
  bodyRegular: 'Inter_400Regular',
  bodyMedium: 'Inter_500Medium',
  bodySemiBold: 'Inter_600SemiBold',
  bodyBold: 'Inter_700Bold',
};

export default function TransactionDetailScreen({ onBack, onNewTransaction }) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.root}>
        
        {/* TopAppBar */}
        <View style={styles.header}>
          <View style={styles.headerTitleGroup}>
            <TouchableOpacity activeOpacity={0.7} style={styles.iconBtn} onPress={onBack}>
              <MaterialIcons name="arrow-back" size={24} color="#003063" />
            </TouchableOpacity>
            <Text style={[styles.headerTitle, { fontFamily: fontFamily.headlineBold }]}>
              Chi tiết giao dịch
            </Text>
          </View>
          <TouchableOpacity activeOpacity={0.7} style={styles.iconBtn}>
            <MaterialIcons name="share" size={24} color="#003063" />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Section 1: Header (Status & Amount) */}
          <View style={styles.statusSection}>
            <View style={styles.successOuterCircle}>
              <View style={styles.successInnerCircle}>
                <MaterialIcons name="check" size={30} color="#ffffff" />
              </View>
            </View>
            
            <View style={styles.amountContainer}>
              <Text style={[styles.amountText, { fontFamily: fontFamily.headlineExtraBold }]}>
                -1,250,000 VND
              </Text>
              <View style={styles.statusPill}>
                <View style={styles.statusDot} />
                <Text style={[styles.statusText, { fontFamily: fontFamily.bodySemiBold }]}>
                  Giao dịch thành công
                </Text>
              </View>
            </View>
          </View>

          {/* Section 2: Transaction Details Table */}
          <View style={styles.detailsTableSection}>
            <View style={styles.detailsTableBox}>
              
              {/* Row 1 */}
              <View style={styles.detailRow}>
                <Text style={[styles.detailLabel, { fontFamily: fontFamily.bodyMedium }]}>Tên người nhận</Text>
                <Text style={[styles.detailValue, { fontFamily: fontFamily.bodySemiBold }]}>NGUYEN VAN A</Text>
              </View>

              {/* Row 2 */}
              <View style={styles.detailRow}>
                <Text style={[styles.detailLabel, { fontFamily: fontFamily.bodyMedium }]}>Ngân hàng thụ hưởng</Text>
                <View style={styles.detailValueCol}>
                  <Text style={[styles.detailValue, { fontFamily: fontFamily.bodySemiBold }]}>Vietcombank</Text>
                  <Text style={[styles.detailSubtext, { fontFamily: fontFamily.bodyRegular }]}>VCB - Ngân hàng TMCP Ngoại Thương</Text>
                </View>
              </View>

              {/* Row 3 */}
              <View style={styles.detailRow}>
                <Text style={[styles.detailLabel, { fontFamily: fontFamily.bodyMedium }]}>Số tài khoản</Text>
                <View style={styles.detailValueRow}>
                  <Text style={[styles.detailValue, { fontFamily: fontFamily.bodySemiBold }]}>1029384756</Text>
                  <TouchableOpacity activeOpacity={0.6}>
                    <MaterialIcons name="content-copy" size={16} color={colors.primary} />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Row 4 */}
              <View style={styles.detailRow}>
                <Text style={[styles.detailLabel, { fontFamily: fontFamily.bodyMedium }]}>Thời gian</Text>
                <Text style={[styles.detailValue, { fontFamily: fontFamily.bodySemiBold }]}>14:35 - 24 Tháng 05, 2024</Text>
              </View>

              {/* Row 5 */}
              <View style={styles.detailRow}>
                <Text style={[styles.detailLabel, { fontFamily: fontFamily.bodyMedium }]}>Nội dung</Text>
                <Text style={[styles.detailValue, { fontFamily: fontFamily.bodySemiBold }]}>NGUYEN VAN B chuyen tien</Text>
              </View>

              {/* Row 6 */}
              <View style={styles.detailRow}>
                <Text style={[styles.detailLabel, { fontFamily: fontFamily.bodyMedium }]}>Mã giao dịch (TXN ID)</Text>
                <Text style={[styles.detailValue, { fontFamily: fontFamily.bodySemiBold, flex: 1, textAlign: 'right' }]} numberOfLines={2}>
                  TXN-9982-A2F0-PH2
                </Text>
              </View>

              {/* Row 7 */}
              <View style={styles.detailRow}>
                <Text style={[styles.detailLabel, { fontFamily: fontFamily.bodyMedium }]}>Phương thức xác thực</Text>
                <View style={styles.detailValueRow}>
                  <MaterialIcons name="verified-user" size={14} color={colors.primary} />
                  <Text style={[styles.detailValue, { fontFamily: fontFamily.bodySemiBold }]}>Smart OTP</Text>
                </View>
              </View>

            </View>
          </View>

          {/* Section 3: Actions */}
          <View style={styles.actionsSection}>
            <TouchableOpacity activeOpacity={0.8} style={styles.primaryBtnWrapper} onPress={onNewTransaction}>
              <LinearGradient
                colors={[colors.primary, colors.primaryContainer]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.primaryBtn}
              >
                <Text style={[styles.primaryBtnText, { fontFamily: fontFamily.headlineBold }]}>
                  Thực hiện giao dịch mới
                </Text>
                <MaterialIcons name="arrow-forward" size={18} color="#ffffff" />
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.7} style={styles.secondaryBtn}>
              <MaterialIcons name="ios-share" size={18} color={colors.primary} />
              <Text style={[styles.secondaryBtnText, { fontFamily: fontFamily.headlineBold }]}>
                Chia sẻ biến động
              </Text>
            </TouchableOpacity>
          </View>

          {/* Footer */}
          <View style={styles.footerSection}>
            <View style={styles.footerBrandRow}>
              <MaterialIcons name="lock" size={14} color="rgba(66, 71, 81, 0.6)" />
              <Text style={[styles.footerText, { fontFamily: fontFamily.bodyMedium }]}>
                Giao dịch được bảo mật bởi Heritage Digital
              </Text>
            </View>
            <View style={styles.footerAccentArea}>
              <View style={styles.footerAccentBar} />
            </View>
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
  
  // Header
  header: {
    height: 64, // h-16
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16, // px-4
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(226, 232, 240, 0.2)', // border-slate-200/20 approx
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    zIndex: 50,
  },
  headerTitleGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12, // gap-3
  },
  iconBtn: {
    padding: 8,
    marginLeft: -8, // matching active scale logic offset space visually
  },
  headerTitle: {
    fontSize: 18, // text-lg
    color: '#003063',
    letterSpacing: -0.5, // tracking-tight
  },

  // Main Tracking
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 48, // pb-12
    alignItems: 'center',
  },

  // Section 1: Hero
  statusSection: {
    width: '100%',
    paddingHorizontal: 24, // px-6
    paddingTop: 40, // pt-10
    paddingBottom: 32, // pb-8
    alignItems: 'center',
  },
  successOuterCircle: {
    width: 80, // w-20
    height: 80, // h-20
    borderRadius: 40,
    backgroundColor: '#f0fdf4', // bg-green-50
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16, // mb-4
    shadowColor: '#22c55e',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2, // shadow-xl / success-glow mapped
    shadowRadius: 20,
    elevation: 10,
  },
  successInnerCircle: {
    width: 56, // w-14
    height: 56, // h-14
    borderRadius: 28,
    backgroundColor: '#22c55e', // bg-green-500
    alignItems: 'center',
    justifyContent: 'center',
  },
  amountContainer: {
    alignItems: 'center',
  },
  amountText: {
    fontSize: 40, // text-[2.5rem]
    color: colors.onSurface,
    letterSpacing: -1, // tracking-tight roughly
    marginBottom: 4, // mb-1
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0fdf4', // bg-green-50
    paddingHorizontal: 12, // px-3
    paddingVertical: 4, // py-1
    borderRadius: 16, // rounded-full
  },
  statusDot: {
    width: 6, // w-1.5
    height: 6, // h-1.5
    borderRadius: 3,
    backgroundColor: '#22c55e', // bg-green-500
    marginRight: 8, // mr-2
  },
  statusText: {
    fontSize: 14, // text-sm
    color: '#15803d', // text-green-700
  },

  // Section 2: Details Table
  detailsTableSection: {
    width: '100%',
    maxWidth: 512, // max-w-lg from HTML
    paddingHorizontal: 16, // px-4
  },
  detailsTableBox: {
    backgroundColor: '#ffffff', // bg-surface-container-lowest
    borderRadius: 12, // rounded-xl
    padding: 20, // p-5
    gap: 20, // space-y-5
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 16, // gap-4
  },
  detailLabel: {
    flexShrink: 0,
    fontSize: 14, // text-sm
    color: colors.onSurfaceVariant,
  },
  detailValueCol: {
    alignItems: 'flex-end',
    flexShrink: 1,
  },
  detailValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8, // gap-2
    flexShrink: 1,
  },
  detailValue: {
    fontSize: 14, // text-sm
    color: colors.onSurface,
    textAlign: 'right',
  },
  detailSubtext: {
    fontSize: 12, // text-xs
    color: colors.onSurfaceVariant,
    textAlign: 'right',
    marginTop: 2,
  },

  // Section 3: Actions
  actionsSection: {
    width: '100%',
    maxWidth: 512,
    paddingHorizontal: 16, // px-4
    marginTop: 32, // mt-8
    gap: 12, // space-y-3
  },
  primaryBtnWrapper: {
    width: '100%',
    borderRadius: 8, // rounded-lg
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1, // shadow-primary/10
    shadowRadius: 15,
    elevation: 8,
  },
  primaryBtn: {
    width: '100%',
    height: 48, // h-12
    borderRadius: 8, // rounded-lg
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8, // gap-2
  },
  primaryBtnText: {
    fontSize: 14, // text-sm
    color: '#ffffff',
  },
  secondaryBtn: {
    width: '100%',
    height: 48, // h-12
    borderRadius: 8, // rounded-lg
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8, // gap-2
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'rgba(194,198,210,0.3)', // outline-variant/30
  },
  secondaryBtnText: {
    fontSize: 14, // text-sm
    color: colors.primary,
  },

  // Footer
  footerSection: {
    marginTop: 48, // mt-12
    paddingHorizontal: 24, // px-6
    alignItems: 'center',
    width: '100%',
  },
  footerBrandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8, // gap-2
  },
  footerText: {
    fontSize: 11, // text-[11px]
    color: 'rgba(66, 71, 81, 0.6)', // text-on-surface-variant/60
    letterSpacing: 0.5, // tracking-wide roughly
  },
  footerAccentArea: {
    marginTop: 32, // mt-8
    opacity: 0.1, // opacity-10
  },
  footerAccentBar: {
    width: 64, // w-16
    height: 4, // h-1
    backgroundColor: colors.primary,
    borderRadius: 2, // rounded-full
  },
});
