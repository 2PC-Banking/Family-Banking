import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

/**
 * PillInput – rounded pill-shaped text input with a left icon
 * and an optional right action icon (e.g. visibility toggle).
 */
export default function PillInput({
  iconName,
  rightIconName,
  onRightIconPress,
  fontFamily,
  ...inputProps
}) {
  return (
    <View style={styles.container}>
      {/* Left icon */}
      <MaterialIcons
        name={iconName}
        size={22}
        color={colors.outline}
        style={styles.leftIcon}
      />

      {/* Input */}
      <TextInput
        style={[styles.input, { fontFamily }]}
        placeholderTextColor={colors.outline + '99'}
        autoCorrect={false}
        autoComplete="off"
        importantForAutofill="no"
        underlineColorAndroid="transparent"
        {...inputProps}
      />

      {/* Right icon (optional) */}
      {rightIconName && (
        <TouchableOpacity onPress={onRightIconPress} style={styles.rightIconBtn}>
          <MaterialIcons
            name={rightIconName}
            size={22}
            color={colors.outline}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainerLow,
    borderRadius: 50,
    paddingVertical: 4,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  leftIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 15,
    color: colors.onSurface,
  },
  rightIconBtn: {
    padding: 4,
    marginLeft: 4,
  },
});
