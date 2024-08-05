import * as React from "react";
import Svg, { Path } from "react-native-svg";
const Services = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={26}
    height={26}
    fill="none"
    {...props}
  >
    <Path
      fill="#737373"
      d="M11.326 5.115h-6.25v6.25h6.25v-6.25ZM20.7 5.115h-6.25v6.25h6.25v-6.25ZM11.326 14.49h-6.25v6.25h6.25v-6.25ZM20.7 14.49h-6.25v6.25h6.25v-6.25Z"
    />
    <Path
      stroke="#737373"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M20.7 14.49h-6.25v6.25h6.25v-6.25ZM11.326 5.115h-6.25v6.25h6.25v-6.25ZM20.7 5.115h-6.25v6.25h6.25v-6.25ZM11.326 14.49h-6.25v6.25h6.25v-6.25Z"
    />
  </Svg>
);
export default Services;
