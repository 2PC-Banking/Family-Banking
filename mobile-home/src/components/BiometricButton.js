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
 * BiometricButton – circle button with icon + label beneath.
 * Mirrors the FaceID / Fingerprint buttons in the original HTML.
 */
export default function BiometricButton({ iconName, label, onPress, fontFamily }) {
  return (
    <TouchableOpacity
      style={styles.wrapper}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.circle}>
        <MaterialIcons name={iconName} size={30} color={colors.primary} />
      </View>
      <Text style={[styles.label, { fontFamily }]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    gap: 8,
  },
  circle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.secondaryContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.2,
    color: colors.onSurfaceVariant,
    textTransform: 'uppercase',
  },
});
