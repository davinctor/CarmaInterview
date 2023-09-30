import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {ViewProps} from 'react-native';

export type TCheckIconProps = ViewProps & {
  xmlns?: string;
};

function CheckIcon(props: TCheckIconProps) {
  return (
    <Svg
      width={10}
      height={10}
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M8.333 2.5L3.75 7.083 1.667 5"
        stroke="#fff"
        strokeWidth={1.66667}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default CheckIcon;
