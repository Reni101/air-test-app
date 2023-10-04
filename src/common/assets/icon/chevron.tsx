import * as React from "react"
import Svg, {Path, SvgProps} from "react-native-svg"

export const Chevron=(props:SvgProps & {color?:string})=> {
    return (
        <Svg
            width={24}
            height={24}
            viewBox="0 0 24 21"
            fill="none"
            {...props}
        >
            <Path
                d="M5.514 9.458a1 1 0 011.64-.77l5.36 4.48 5.37-4.32a1 1 0 011.41.15 1 1 0 01-.15 1.46l-6 4.83a1 1 0 01-1.27 0l-6-5a1 1 0 01-.36-.83z"
                fill={props.color ?? '#fff'}
            />
        </Svg>
    )
}
