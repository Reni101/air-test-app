import React from 'react';
import {Pressable, StyleSheet, View} from "react-native";
import {usePagination} from "./usePagination";
import {Chevron} from "../../common/assets/icon/chevron";
import {PageButtonsForRender} from "../../common/ui/page-buttons-for-render/page-buttons-for-render";

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
        count: props.total,
        page: props.currentPage,
        onChange,
    })

    return (
        <View style={styles.container}>

            <Pressable onPress={handlePreviousPageClicked} disabled={isFirstPage} hitSlop={10}>
                <Chevron color={isFirstPage ? '#808080' : '#fff'} style={styles.chevronLeft}/>
            </Pressable>

            <PageButtonsForRender
                currentPage={props.currentPage}
                handleMainPageClicked={handleMainPageClicked}
                paginationRange={paginationRange}
            />

            <Pressable onPress={handleNextPageClicked} disabled={isLastPage}>
                <Chevron color={isLastPage ? '#808080' : '#fff'} style={styles.chevronRight}/>
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
    },
    chevronLeft: {
        transform: [{rotate: '90deg'}]
    },
    chevronRight: {
        transform: [{rotate: '270deg'}]
    }
})