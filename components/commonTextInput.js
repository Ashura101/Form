import React from 'react';
import { TextInput, StyleSheet, View, Text } from 'react-native';
import COLORS from '../constants/colors';

export function CommonTextInput({
  placeholder,
  label,
  onChange,
  onChangeText,
  value,
  secureTextEntry,
  autoCaps,
  editable,
  keyboardType,
  maxLength,
  editablestyle,
  type,
  textInputStyle,
}) {
  return (
    <View style={styles.mainstyle}>
      <Text style={styles.labelstyle}>{label} </Text>
      <TextInput
        style={[styles.inputstyle, textInputStyle, editablestyle]}
        placeholder={placeholder}
        onChange={onChange}
        onChangeText={onChangeText}
        value={value}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCaps}
        editable={editable}
        keyboardType={keyboardType}
        maxLength={maxLength}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  mainstyle: {
    marginHorizontal: 20,
  },
  inputstyle: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'black',
    height: 40,
    borderRadius: 8,
    paddingLeft: 8,
    fontSize: 16,
    backgroundColor: COLORS.WHITE,
  },
  labelstyle: {
    color: COLORS.BLACK,
    fontSize: 18,
    // fontFamily: FONTS.REGULAR,
    marginTop: 15,
    fontWeight: '400',
    fontStyle: 'normal',
    fontWeight: 'bold',
  },
});
