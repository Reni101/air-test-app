import React from 'react';
import {Pressable, View, StyleSheet, Text} from "react-native";
import {color} from "../../../common/style/variables";

type PropsType = {
    paginationRange: Array<string | number>
    currentPage: number
    handleMainPageClicked: (page: number) => () => void
}

export const PageButtonsForRender = (props: PropsType) => {
        return (
            <View style={styles.container}>
                {props.paginationRange.map((page: number | string, index) => {
                    const isSelected = page === props.currentPage
                    const selectedStyle = isSelected ? styles.selected : null

                    if (typeof page === 'string') {
                        return (
                            <Text key={index} style={styles.text}> ... </Text>
                        )
                    } else {
                        return (
                            <Pressable
                                key={index}
                                style={[styles.button, selectedStyle]}
                                onPress={props.handleMainPageClicked(+page)}>
                                <Text style={[styles.text, selectedStyle]}>  {page}</Text>
                            </Pressable>
                        )
                    }
                })}
            </View>
        );
    }
;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 10,
    },
    button: {
        width: 32,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
    },
    selected: {
        backgroundColor: color.WHITE,
        color: color.BACKGROUND_COLOR
    },
    text: {
        marginLeft: -4,
        color: color.WHITE
    },
})

