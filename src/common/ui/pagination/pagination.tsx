import React from 'react';
import {Pressable, StyleSheet, View} from "react-native";
import {usePagination} from "./usePagination";
import {Chevron} from "../../assets/icon/chevron";

type PropsType = {
    currentPage: number,
    total: number
    changePage: (page: number) => void
}

export const Pagination = (props: PropsType) => {

    const onChange = (pageNumber: number) => {
        props.changePage(pageNumber)
    }

    const {
        isFirstPage,
        isLastPage,
        paginationRange,
        handlePreviousPageClicked,
        handleNextPageClicked,
        handleMainPageClicked,
    } = usePagination({
        count: props.total / 10,
        page: props.currentPage,
        onChange,
    })

    return (
        <View style={styles.container}>

            <Pressable onPress={handlePreviousPageClicked} disabled={isFirstPage}>
                <Chevron color={isFirstPage ? 'red' : '#fff'} style={{transform: [{rotate: '90deg'}],}}/>
            </Pressable>


            <Pressable onPress={handleNextPageClicked} disabled={isLastPage}>
                <Chevron style={{transform: [{rotate: '270deg'}]}}/>
            </Pressable>


        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 40,
        marginTop: 10,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: '#fff'
    }
})