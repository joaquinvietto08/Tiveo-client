import * as React from "react";
import Svg, { G, Mask, Path, Defs, ClipPath } from "react-native-svg";
const Account = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    height={22}
    fill="none"
    {...props}
  >
    <G clipPath="url(#a)">
      <Mask
        id="b"
        width={22}
        height={22}
        x={0}
        y={0}
        maskUnits="userSpaceOnUse"
        style={{
          maskType: "luminance",
        }}
      >
        <Path fill="#fff" d="M21.388.427h-21v21h21v-21Z" />
      </Mask>
      <G mask="url(#b)">
        <Path
          fill="#737373"
          d="M6.704 6.487C6.092 4.204 7.47 1.848 9.78 1.23c2.309-.62 4.68.732 5.293 3.015.611 2.283-.767 4.639-3.077 5.258-2.309.618-4.68-.733-5.292-3.016Zm8.123 4.198c3.01.875 5.58 4.125 5.58 7.97v1.058c0 .584-.474 1.058-1.057 1.058H2.426a1.058 1.058 0 0 1-1.057-1.058v-1.057c0-3.846 2.57-7.096 5.58-7.97.28-.082.653.04.832.27.464.602 1.709 1.258 3.107 1.258 1.398 0 2.643-.656 3.107-1.258a.837.837 0 0 1 .832-.27Z"
        />
      </G>
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M.388.427h21v21h-21z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default Account;
