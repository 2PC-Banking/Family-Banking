import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
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

const FILTERS = ['Tất cả', 'Chuyển tiền', 'Thanh toán hóa đơn', 'Nạp tiền'];

const TRANSACTIONS = [
  {
    group: 'Hôm nay',
    items: [
      {
        id: '1',
        title: 'NGUYEN VAN A',
        amount: '- 1,250,000đ',
        txId: 'TXN-9982-A2F0',
        type: 'Chuyển tiền',
        time: '14:35',
        status: 'Thành công',
        icon: 'send',
        iconBg: colors.secondaryContainer,
        iconColor: colors.primary,
        amountColor: colors.onSurface,
      },
      {
        id: '2',
        title: 'Nạp tiền điện thoại',
        amount: '- 100,000đ',
        txId: 'TXN-8821-B4G1',
        type: 'Dịch vụ',
        time: '09:12',
        status: 'Thành công',
        icon: 'smartphone',
        iconBg: colors.tertiaryFixed,
        iconColor: colors.tertiary,
        amountColor: colors.onSurface,
      },
    ],
  },
  {
    group: 'Hôm qua',
    items: [
      {
        id: '3',
        title: 'TRAN THI B',
        amount: '+ 5,000,000đ',
        txId: 'TXN-7734-C9K2',
        type: 'Nhận tiền',
        time: '18:45',
        status: 'Thành công',
        icon: 'padding', // material icon Add Card equivalent visually
        iconBg: '#ecfdf5', // emerald-50
        iconColor: '#047857', // emerald-700
        amountColor: '#059669', // emerald-600
      },
      {
        id: '4',
        title: 'Thanh toán tiền điện',
        amount: '- 845,000đ',
        txId: 'TXN-6645-D1L3',
        type: 'Hóa đơn',
        time: '11:20',
        status: 'Thành công',
        icon: 'bolt',
        iconBg: '#f3f4f5',
        iconColor: '#50606d',
        amountColor: colors.onSurface,
      },
    ],
  },
  {
    group: 'Tuần trước',
    items: [
      {
        id: '5',
        title: 'Shopee Pay',
        amount: '- 320,000đ',
        txId: 'TXN-5556-E8M4',
        type: 'Mua sắm',
        time: '20/10 14:05',
        status: 'Thành công',
        icon: 'shopping-bag',
        iconBg: 'rgba(0, 70, 140, 0.05)', // primary/5
        iconColor: colors.primary,
        amountColor: colors.onSurface,
      },
      {
        id: '6',
        title: 'LE VAN C',
        amount: '2,000,000đ', // Original was positive but color on-surface-variant. We'll follow layout exactly
        txId: 'TXN-4467-F2N5',
        type: 'Chuyển tiền',
        time: '19/10 08:30',
        status: 'Thất bại',
        icon: 'warning',
        iconBg: '#fef2f2', // red-50
        iconColor: '#dc2626', // red-600
        amountColor: colors.onSurfaceVariant,
      },
    ],
  },
];

export default function HistoryScreen({ onBack, onNavigate }) {
  const [activeFilter, setActiveFilter] = useState('Tất cả');

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.root}>
        
        {/* TopAppBar Section */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <TouchableOpacity activeOpacity={0.7} style={styles.iconBtn} onPress={onBack}>
              <MaterialIcons name="arrow-back" size={24} color="#003063" />
            </TouchableOpacity>
            <Text style={[styles.headerTitle, { fontFamily: fontFamily.headlineBold }]}>
              Lịch sử giao dịch
            </Text>
          </View>
          <TouchableOpacity activeOpacity={0.7} style={styles.iconBtn}>
            <MaterialIcons name="tune" size={24} color={colors.onSurfaceVariant} />
          </TouchableOpacity>
        </View>
        <View style={styles.headerDivider} />

        {/* Visual Background Enhancements Simulation. 
            Note: React Native doesn't easily support massive blurred background circles like CSS blur-[120px] 
            without external libraries like @react-native-community/blur or complex shaders.
            We simulate the tint effect statically, but keep it mostly clean based on Surface color. */}

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Search & Quick Filters */}
          <View style={styles.filterSection}>
            <View style={styles.searchBox}>
              <MaterialIcons name="search" size={20} color={colors.onSurfaceVariant} style={styles.searchIcon} />
              <TextInput
                style={[styles.searchInput, { fontFamily: fontFamily.bodySemiBold }]}
                placeholder="Tìm kiếm giao dịch"
                placeholderTextColor={colors.onSurfaceVariant}
              />
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
              {FILTERS.map(f => {
                const isActive = activeFilter === f;
                return (
                  <TouchableOpacity
                    key={f}
                    activeOpacity={0.8}
                    style={[styles.filterChip, isActive && styles.filterChipActive]}
                    onPress={() => setActiveFilter(f)}
                  >
                    <Text style={[
                      styles.filterChipText, 
                      { fontFamily: isActive ? fontFamily.bodyBold : fontFamily.bodySemiBold },
                      isActive && styles.filterChipTextActive
                    ]}>
                      {f}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>

          {/* Transaction List */}
          <View style={styles.listSection}>
            {TRANSACTIONS.map((group, idx) => (
              <View key={idx} style={styles.groupBlock}>
                <Text style={[styles.groupTitle, { fontFamily: fontFamily.headlineExtraBold }]}>
                  {group.group}
                </Text>
                
                <View style={styles.groupItemsContainer}>
                  {group.items.map(item => {
                    const isSuccess = item.status === 'Thành công';
                    return (
                      <TouchableOpacity key={item.id} activeOpacity={0.7} style={styles.txItem} onPress={() => onNavigate?.('tx_detail')}>
                        <View style={[styles.txIconBox, { backgroundColor: item.iconBg }]}>
                          <MaterialIcons name={item.icon} size={20} color={item.iconColor} />
                        </View>
                        
                        <View style={styles.txContent}>
                          <View style={styles.txRowTop}>
                            <Text style={[styles.txRefTitle, { fontFamily: fontFamily.bodyBold }]} numberOfLines={1}>
                              {item.title}
                            </Text>
                            <Text style={[styles.txAmount, { fontFamily: fontFamily.bodyBold, color: item.amountColor }]}>
                              {item.amount}
                            </Text>
                          </View>
                          
                          <View style={styles.txRowBottom}>
                            <View style={styles.txDetailsCol}>
                              <Text style={styles.txId}>
                                {item.txId}
                              </Text>
                              <Text style={[styles.txTimeInfo, { fontFamily: fontFamily.bodyMedium }]}>
                                {item.type} • {item.time}
                              </Text>
                            </View>
                            
                            <View style={[styles.statusBadge, isSuccess ? styles.statusSuccess : styles.statusFailed]}>
                              <Text style={[styles.statusText, isSuccess ? styles.statusTextSuccess : styles.statusTextFailed, { fontFamily: fontFamily.bodyBold }]}>
                                {item.status}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            ))}
          </View>

          {/* Pagination */}
          <View style={styles.paginationBlock}>
            <TouchableOpacity activeOpacity={0.7} style={styles.paginationBtn}>
              <Text style={[styles.paginationText, { fontFamily: fontFamily.bodyBold }]}>
                Xem thêm giao dịch cũ hơn
              </Text>
            </TouchableOpacity>
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
    alignItems: 'center',
  },
  
  // Header Shell
  header: {
    width: '100%',
    height: 64, // h-16
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16, // px-4 offset matching html flex-row
    backgroundColor: '#f8f9fa',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20, // rounded-full
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18, // text-lg
    color: '#003063',
    letterSpacing: -0.5,
  },
  headerDivider: {
    width: '100%',
    height: 1, // h-[1px]
    backgroundColor: colors.surfaceContainerLow, // #f3f4f5
  },

  // Main Scroll
  scroll: {
    flex: 1,
    width: '100%',
    maxWidth: 448, // max-w-md
  },
  scrollContent: {
    paddingBottom: 48, // pb-12
  },

  // Filters Area
  filterSection: {
    paddingHorizontal: 24, // px-6
    paddingVertical: 16, // py-4
    gap: 16, // space-y-4
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48, // h-12
    backgroundColor: '#ffffff', // bg-surface-container-lowest
    borderRadius: 16, // rounded-ROUND_FOUR
    paddingHorizontal: 16, // pl-12 pr-4 rough match
    // Shadow simulation
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: colors.onSurface,
  },
  filterRow: {
    flexDirection: 'row',
    gap: 8, // gap-2
    paddingBottom: 8, // pb-2
    paddingRight: 24,
  },
  filterChip: {
    paddingHorizontal: 20, // px-5
    paddingVertical: 10, // py-2.5
    backgroundColor: '#ffffff', // bg-surface-container-lowest
    borderRadius: 16, // rounded-ROUND_FOUR
    borderWidth: 1,
    borderColor: 'rgba(194, 198, 210, 0.1)', // border-outline-variant/10
  },
  filterChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1, // shadow-primary/10
    shadowRadius: 6,
    elevation: 4,
  },
  filterChipText: {
    fontSize: 14, // text-sm
    color: colors.onSurfaceVariant,
  },
  filterChipTextActive: {
    color: colors.onPrimary,
  },

  // List Area
  listSection: {
    paddingHorizontal: 24, // px-6
    gap: 24, // space-y-6
  },
  groupBlock: {
    gap: 12, // mb-3 -> mapped with space-y-2 logic
  },
  groupTitle: {
    fontSize: 10, // text-[10px]
    color: colors.onSurfaceVariant,
    textTransform: 'uppercase',
    letterSpacing: 1.5, // tracking-[0.15em]
    paddingHorizontal: 4, // px-1
  },
  groupItemsContainer: {
    gap: 8, // space-y-2
  },

  // Item Card
  txItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16, // gap-4
    padding: 12, // p-3
    backgroundColor: '#ffffff', // bg-surface-container-lowest
    borderRadius: 16, // rounded-ROUND_FOUR
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02, // shadow-[0_2px_8px_rgba(0,0,0,0.02)]
    shadowRadius: 8,
    elevation: 2,
  },
  txIconBox: {
    width: 44, // w-11
    height: 44, // h-11
    borderRadius: 16, // rounded-2xl
    alignItems: 'center',
    justifyContent: 'center',
  },
  txContent: {
    flex: 1,
    minWidth: 0,
  },
  txRowTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4, // mb-0.5
  },
  txRefTitle: {
    flex: 1,
    fontSize: 14, // text-sm
    color: colors.onSurface,
  },
  txAmount: {
    fontSize: 14, // text-sm
    marginLeft: 8, // ml-2
  },
  txRowBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  txDetailsCol: {
    flexDirection: 'col', // default
  },
  txId: {
    fontFamily: 'monospace',
    fontSize: 9, // text-[9px]
    color: colors.onSurfaceVariant,
    textTransform: 'uppercase',
    letterSpacing: -0.5, // tracking-tighter
    marginBottom: 2,
  },
  txTimeInfo: {
    fontSize: 10, // text-[10px]
    color: colors.onSurfaceVariant,
  },
  
  // Status Indicator
  statusBadge: {
    paddingHorizontal: 8, // px-2
    paddingVertical: 2, // py-0.5
    borderRadius: 12, // rounded-full
    borderWidth: 1,
  },
  statusSuccess: {
    backgroundColor: '#f0fdf4', // green-50
    borderColor: 'rgba(220, 252, 231, 0.5)', // green-100/50
  },
  statusFailed: {
    backgroundColor: '#fef2f2', // red-50
    borderColor: 'rgba(254, 226, 226, 0.5)', // red-100/50
  },
  statusText: {
    fontSize: 10, // text-[10px]
  },
  statusTextSuccess: {
    color: '#15803d', // green-700
  },
  statusTextFailed: {
    color: '#b91c1c', // red-700
  },

  // Pagination Element
  paginationBlock: {
    marginTop: 32, // mt-8
    alignItems: 'center',
  },
  paginationBtn: {
    paddingHorizontal: 24, // px-6
    paddingVertical: 8, // py-2
    borderRadius: 24, // rounded-full (approximated for hover:bg-primary/5 mapping visually)
  },
  paginationText: {
    color: colors.primary,
    fontSize: 12, // text-xs
    textTransform: 'uppercase',
    letterSpacing: 2, // tracking-widest
  },
});
