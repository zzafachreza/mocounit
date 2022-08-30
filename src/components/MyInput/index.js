import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon, ListItem, Button } from 'react-native-elements';
import { colors } from '../../utils/colors';
import { fonts } from '../../utils/fonts';
import { TextInput } from 'react-native-gesture-handler';

export default function MyInput({
  onFocus,
  label,
  iconname,
  onChangeText,
  value,
  keyboardType,
  secureTextEntry,
  styleInput,
  placeholder,
  autoFocus,
  tinggi,
  multiline,
  maxLength,
  label2,
  styleLabel,
  colorIcon = colors.white,
}) {
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 3,
        }}>
        <Icon type="ionicon" name={iconname} color={colorIcon} size={16} />
        <Text
          style={{
            fontFamily: fonts.secondary[600],
            color: colors.white,
            left: 0,
            fontSize: 14,
            ...styleLabel,
          }}>
          {label}
        </Text>
      </View>
      {label2 && (
        <Text
          style={{
            fontFamily: fonts.secondary[600],
            color: colors.primary,
            left: 10,
            fontSize: 14,
            ...styleLabel,
          }}>
          {label2}
        </Text>
      )}
      <TextInput
        maxLength={maxLength}
        multiline={multiline}
        autoFocus={autoFocus}
        onFocus={onFocus}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        value={value}
        onChangeText={onChangeText}
        autoCapitalize="none"
        style={{
          borderColor: colors.border,
          borderRadius: 5,
          height: tinggi,
          borderWidth: 1,
          backgroundColor: colors.white,
          paddingLeft: 10,
          color: colors.black,
          fontSize: 12,
          fontFamily: fonts.primary[400],
          ...styleInput,
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({});
