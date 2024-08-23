import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";
const Facebook = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path
        fill="#0866FF"
        d="M24 12c0-6.627-5.373-12-12-12S0 5.373 0 12c0 5.628 3.875 10.35 9.101 11.647v-7.98H6.627V12H9.1v-1.58c0-4.084 1.849-5.978 5.859-5.978.76 0 2.072.15 2.608.298v3.324c-.283-.03-.775-.044-1.386-.044-1.967 0-2.728.745-2.728 2.683V12h3.92l-.673 3.667h-3.247v8.245C19.396 23.195 24 18.135 24 12Z"
      />
      <Path
        fill="#fff"
        d="M16.7 15.667 17.374 12h-3.92v-1.297c0-1.938.76-2.683 2.728-2.683.61 0 1.103.015 1.386.044V4.74c-.537-.149-1.849-.298-2.609-.298-4.01 0-5.858 1.894-5.858 5.978V12H6.626v3.667h2.475v7.98a12.021 12.021 0 0 0 4.352.265v-8.245H16.7Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default Facebook;
