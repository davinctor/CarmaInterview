import React, {useRef, useMemo, useCallback, useState} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';

import {OptionItem} from './OptionItem';

const options = [
  {
    label: 'Option 1',
    value: 'option1',
  },
  {
    label: 'Option 2',
    value: 'option2',
  },
  {
    label: 'Option 3',
    value: 'option3',
  },
  {
    label: 'Option 4',
    value: 'option4',
  },
];

const Content = ({
  data,
  selectedValues,
  multi,
}: {
  data: Array<{
    label: string;
    value: string;
  }>;
  selectedValues?: string[];
  multi: boolean;
}) => {
  const [activeValues, setActiveValues] = useState(selectedValues || []);

  const onSelect = useCallback(
    (activeOptionValue: string, isSelected: boolean) => {
      if (multi) {
        isSelected
          ? setActiveValues(
              activeValues.filter(value => value !== activeOptionValue),
            )
          : setActiveValues([...activeValues, activeOptionValue]);
      } else {
        isSelected ? setActiveValues([]) : setActiveValues([activeOptionValue]);
      }
    },
    [multi, setActiveValues, activeValues],
  );

  return (
    <View style={contentStyles.container}>
      <Text style={contentStyles.title}>Select one of the options:</Text>
      {data.map(option => (
        <OptionItem
          label={option.label}
          value={option.value}
          selected={activeValues.includes(option.value)}
          onPress={onSelect}
        />
      ))}
    </View>
  );
};

const contentStyles = StyleSheet.create({
  container: {
    width: '100%',
  },
  title: {
    fontSize: 20,
    lineHeight: 30,
    fontWeight: '600',
    color: '#101828',
  },
});

function App(): JSX.Element {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [bottomSheetStateOpened, setBottomSheetOpened] = useState(false);

  const snapPoints = useMemo(() => ['55%', '90%'], []);

  const showBottomSheet = useCallback(() => {
    bottomSheetRef.current?.snapToIndex(0);
  }, [bottomSheetRef]);

  const onCancelPressed = useCallback(() => {
    bottomSheetRef.current?.close();
  }, [bottomSheetRef]);

  const onBottomSheetStateChanged = useCallback(
    (bottomSheetStateIndex: number) => {
      setBottomSheetOpened(bottomSheetStateIndex >= 0);
    },
    [setBottomSheetOpened],
  );

  return (
    <SafeAreaView style={styles.container}>
      <GestureHandlerRootView style={styles.container}>
        <View
          style={StyleSheet.flatten([
            styles.container,
            bottomSheetStateOpened ? styles.dimmed : null,
          ])}>
          <TouchableOpacity onPress={showBottomSheet}>
            <Text>Open BS</Text>
          </TouchableOpacity>
          <BottomSheet
            ref={bottomSheetRef}
            snapPoints={snapPoints}
            handleIndicatorStyle={styles.bottomSheetIndicatorStyle}
            onChange={onBottomSheetStateChanged}>
            <BottomSheetScrollView style={styles.contentContainerStyle}>
              <View style={styles.bottomSheetContentContainer}>
                <View style={styles.ownHandleIndicatorStyle} />
                <Content data={options} multi={false} />
                <View>
                  <TouchableOpacity onPress={onCancelPressed}>
                    <Text>Close</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={onCancelPressed}>
                    <Text>Apply</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </BottomSheetScrollView>
          </BottomSheet>
        </View>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  dimmed: {
    backgroundColor: 'rgba(12, 17, 29, 0.3)',
  },
  contentContainerStyle: {
    paddingTop: 27,
    paddingHorizontal: 24,
    backgroundColor: '#F9FAFB',
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
  },
  bottomSheetContentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomSheetIndicatorStyle: {
    display: 'none',
  },
  ownHandleIndicatorStyle: {
    height: 3,
    width: 40,
    backgroundColor: '#D0D5DD',
  },
});

export default App;
