import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

/**
 * BottomNav – fixed bottom tab bar:
 *   Left: Home (active state), Center: prominent QR button, Right: Settings
 */
export default function BottomNav({ activeTab = 'home', onTabChange, fontFamily }) {
  const bodySemiBold = fontFamily?.bodySemiBold ?? 'Inter_600SemiBold';

  return (
    <View style={styles.bar}>
      {/* Home */}
      <TouchableOpacity
        style={[styles.navItem, activeTab === 'home' && styles.navItemActive]}
        onPress={() => onTabChange?.('home')}
        activeOpacity={0.8}
      >
        <MaterialIcons
          name="home"
          size={24}
          color={activeTab === 'home' ? '#003063' : '#94a3b8'}
          style={{ ...(activeTab === 'home' && { fontVariant: ['tabular-nums'] }) }}
        />
        <Text
          style={[
            styles.navLabel,
            { fontFamily: bodySemiBold },
            activeTab === 'home' && styles.navLabelActive,
          ]}
        >
          Trang chủ
        </Text>
      </TouchableOpacity>

      {/* QR Scanner – Center floating button */}
      <View style={styles.qrWrapper}>
        <TouchableOpacity
          style={styles.qrBtn}
          onPress={() => onTabChange?.('qr')}
          activeOpacity={0.85}
        >
          <MaterialIcons name="qr-code-scanner" size={30} color="#ffffff" />
        </TouchableOpacity>
        <Text style={[styles.qrLabel, { fontFamily: bodySemiBold }]}>Quét QR</Text>
      </View>

      {/* Settings */}
      <TouchableOpacity
        style={[styles.navItem, activeTab === 'settings' && styles.navItemActive]}
        onPress={() => onTabChange?.('settings')}
        activeOpacity={0.8}
      >
        <MaterialIcons
          name="settings"
          size={24}
          color={activeTab === 'settings' ? '#003063' : '#94a3b8'}
        />
        <Text
          style={[
            styles.navLabel,
            { fontFamily: bodySemiBold },
            activeTab === 'settings' && styles.navLabelActive,
          ]}
        >
          Cài đặt
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bar: {
    height: 96, // h-24
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 48, // px-12
    paddingBottom: Platform.OS === 'ios' ? 24 : 12,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderTopLeftRadius: 32, // rounded-t-[32px]
    borderTopRightRadius: 32, // rounded-t-[32px]
    // shadow-[0_-8px_32px_rgba(0,27,61,0.06)]
    shadowColor: 'rgba(0, 27, 61, 1)',
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.06,
    shadowRadius: 32,
    elevation: 24,
    borderTopWidth: 0,
    width: '100%',
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8, // py-2
    paddingHorizontal: 16, // px-4
    borderRadius: 16, // rounded-2xl
    gap: 4, // mt-1
  },
  navItemActive: {
    backgroundColor: 'rgba(208, 226, 241, 0.5)', // bg-[#d0e2f1]/50
  },
  navLabel: {
    fontSize: 11, // text-[11px]
    color: '#94a3b8',
    letterSpacing: 0.025, // tracking-wide
  },
  navLabelActive: {
    color: '#003063',
  },

  // QR
  qrWrapper: {
    alignItems: 'center',
    marginTop: -48, // -top-6 + centering offset adjustment
  },
  qrBtn: {
    width: 64, // w-16
    height: 64, // h-16
    borderRadius: 32, // rounded-full
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4, // shadow-primary/40
    shadowRadius: 20,
    elevation: 12,
    marginBottom: 8,
  },
  qrLabel: {
    position: 'absolute',
    bottom: -24, // -bottom-6
    fontSize: 11, // text-[11px]
    color: colors.primary,
    whiteSpace: 'nowrap',
  },
});
