import React from 'react';
import { StyleSheet, Text, View, Picker } from 'react-native';
import { Icon, ListItem, Button } from 'react-native-elements';
import { colors } from '../../utils/colors';
import { fonts } from '../../utils/fonts';
import { TextInput } from 'react-native-gesture-handler';

export default function MyPicker({
  label,
  iconname,
  onValueChange,
  onChangeText,
  value,
  keyboardType,
  secureTextEntry,
  styleInput,
  placeholder,
  label2,
  styleLabel,
  colorIcon = colors.white,
  data = [],
}) {
  return (

    <>
      <Text
        style={{
          fontFamily: fonts.secondary[600],
          color: colors.white,
          fontSize: 12,
          marginBottom: 5,
          ...styleLabel,
        }}>
        {label}
      </Text>
      <View style={{
        // borderWidth: 1,
        // margin: 5,
        borderRadius: 5,
        backgroundColor: colors.white
      }}>

        <Picker multiline={true}
          numberOfLines={2} selectedValue={value} onValueChange={onValueChange}>
          {data.map(item => {
            return <Picker.Item multiline={true}
              numberOfLines={2} value={item.value} label={item.label} />;
          })}
        </Picker>
      </View>
    </>
  );
}

const styles = StyleSheet.create({});
