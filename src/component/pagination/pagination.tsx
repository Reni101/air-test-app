import {Pressable, StyleSheet, View} from "react-native";
import {usePagination} from "./usePagination";
import {PageButtonsForRender} from "./page-buttons-for-render/page-buttons-for-render";
import {color} from "../../common/style/variables";
import {Chevron} from "../../common/icons/chevron";
import {useAppDispatch, useAppSelector} from "../../common/hooks/useAppHooks";
import {selectPage, selectTotalPages, setPage} from "../../service/posts-slice";

export const Pagination = () => {
    const dispatch = useAppDispatch()
    const currentPage = useAppSelector(selectPage)
    const totalPages = useAppSelector(selectTotalPages)

    const onChange = (pageNumber: number) => {
        dispatch(setPage(pageNumber))
    }

    const {
        isFirstPage,
        isLastPage,
        paginationRange,
        handlePreviousPageClicked,
        handleNextPageClicked,
        handleMainPageClicked,
    } = usePagination({
        count: totalPages,
        page: currentPage,
        onChange,
    })

    return (
        <View style={styles.container}>

            <Pressable onPress={handlePreviousPageClicked} disabled={isFirstPage} hitSlop={10}>
                <Chevron color={isFirstPage ? color.GRAY : color.WHITE} style={styles.chevronLeft}/>
            </Pressable>

            <PageButtonsForRender
                currentPage={currentPage}
                handleMainPageClicked={handleMainPageClicked}
                paginationRange={paginationRange}
            />

            <Pressable onPress={handleNextPageClicked} disabled={isLastPage} hitSlop={10}>
                <Chevron color={isLastPage ? color.GRAY : color.WHITE} style={styles.chevronRight}/>
            </Pressable>


        </View>
    );
};

const styles = StyleSheet.create({
    container: {

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