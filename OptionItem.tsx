import React, {useCallback, useMemo} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';

import CheckIcon from './CheckIcon';

export type TOptionItemProps = {
  selected: boolean;
  value: string;
  label: string;
  onPress: (value: string, isSelected: boolean) => void;
};

export const OptionItem = ({
  selected,
  value,
  label,
  onPress,
}: TOptionItemProps) => {
  const [containerStyle, labelStyle] = useMemo(
    () => [
      StyleSheet.flatten([
        styles.container,
        selected ? styles.containerSelected : null,
      ]),
      StyleSheet.flatten([
        styles.label,
        selected ? styles.labelSelected : null,
      ]),
    ],
    [selected],
  );
  const onItemPress = useCallback(
    () => onPress(value, selected),
    [onPress, value, selected],
  );

  return (
    <TouchableOpacity style={containerStyle} onPress={onItemPress}>
      <Text style={labelStyle}>{label}</Text>
      <View style={styles.checkStatusContainer}>
        {selected && <CheckIcon style={styles.checkStatusIcon} />}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 12,
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  containerSelected: {
    borderWidth: 2,
    borderColor: '#FF6600',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
    color: '#344054',
  },
  labelSelected: {
    color: '#BA4008',
  },
  checkStatusContainer: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  checkStatusIcon: {
    position: 'absolute',
    right: 0,
    left: 0,
    top: 0,
    bottom: 0,
  },
});
