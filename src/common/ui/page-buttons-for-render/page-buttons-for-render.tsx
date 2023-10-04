import React from 'react';
import {Pressable, View, StyleSheet, Text} from "react-native";

type PropsType = {
    paginationRange: Array<string | number>
    currentPage: number
    handleMainPageClicked: (page: number) => () => void
}

export const PageButtonsForRender = (props: PropsType) => {
        return (
            <View style={styles.container}>
                {props.paginationRange.map((page: number | string) => {
                    const isSelected = page === props.currentPage
                    const selectedStyle = isSelected ? styles.selected : null

                    if (typeof page === 'string') {
                        return (
                            <Text style={styles.text}> ... </Text>
                        )
                    } else {
                        return (
                            <Pressable
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
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
        borderRadius: 4,
    },
    selected: {
        backgroundColor: '#fff',
        color: '#000'
    },
    text: {
        marginLeft: -5,
        color: '#fff'
    },
})

