import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';

/**
 * GlassCard – a frosted-glass container matching the HTML `.glass-card`
 * Uses expo-blur for the backdrop blur effect.
 */
export default function GlassCard({ children, style }) {
  return (
    <View style={[styles.wrapper, style]}>
      <BlurView intensity={60} tint="light" style={StyleSheet.absoluteFill} />
      <View style={styles.overlay} />
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 32,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
    // Shadow (iOS)
    shadowColor: '#003063',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.08,
    shadowRadius: 50,
    // Elevation (Android)
    elevation: 10,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.75)',
  },
});
