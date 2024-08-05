import * as React from "react";
import Svg, { G, Mask, Path, Defs, ClipPath } from "react-native-svg";
const Home = (props) => (
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
        <Path fill="#fff" d="M21.388.927h-21v21h21v-21Z" />
      </Mask>
      <G mask="url(#b)">
        <Path
          fill="#FFCB13"
          d="M14.512 21.064h5.24c.543 0 .982-.44.98-.983l-.035-9.416c-.001-.362-.223-.85-.494-1.088L11.647 2.06a1.155 1.155 0 0 0-1.479-.003L1.536 9.58c-.273.238-.493.724-.492 1.085l.035 9.417a.988.988 0 0 0 .986.983h5.241c.543 0 .983-.44.983-.983v-4.258c0-.361.293-.655.655-.655h3.93c.362 0 .655.294.655.655v4.258c0 .543.44.983.983.983Z"
        />
      </G>
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M.388.927h21v21h-21z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default Home;
