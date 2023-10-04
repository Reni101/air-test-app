import React from 'react';
import Svg, {Path, SvgProps} from "react-native-svg";

export const Search = (props: SvgProps) => {
    return (
        <Svg
            width={20}
            height={20}
            viewBox="0 0 20 20"
            fill="none"
            {...props}
        >
            <Path
                d="M17.258 16.075l-2.833-2.825a6.6 6.6 0 001.408-4.083 6.667 6.667 0 10-6.666 6.666 6.6 6.6 0 004.083-1.408l2.825 2.833a.833.833 0 001.183 0 .832.832 0 000-1.183zM4.167 9.167a5 5 0 1110 0 5 5 0 01-10 0z"
                fill="#4C4C4C"
            />
        </Svg>
    );
};

