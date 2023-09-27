import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';

const CustomCheckbox = ({isChecked, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View
          style={{
            height: 24,
            width: 24,
            borderWidth: 2,
            borderColor: '#000',
            borderRadius: 4,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: isChecked ? '#000' : '#fff', // Toggle background color based on isChecked state
          }}>
          {isChecked && <Text style={{color: '#fff'}}>✓</Text>}
        </View>
        <Text style={{marginLeft: 8, fontSize: 16, color: '#000'}}>
          I agree to the terms and conditions
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CustomCheckbox;
