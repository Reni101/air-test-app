import React, {useEffect, useState} from 'react';
import {StatusBar, StyleSheet, View} from "react-native";
import {useAppDispatch, useAppSelector} from "../../common/hooks/useAppHooks";
import {getPosts, selectTotalPages, setSearchText} from "../../service/posts-slice";
import {PADDING} from "../../common/constant/constant";
import {TextField} from "../text-field/text-field";
import {Table} from "../table/table";
import {color} from "../../common/style/variables";
import {Pagination} from "../pagination/pagination";
import useDebounce from "../../common/hooks/useDebounce";

export const PostsRoot = () => {
    const dispatch = useAppDispatch()
    const searchText = useAppSelector(state => state.postsSlice.filters.q)
    const totalPosts = useAppSelector(selectTotalPages)
    const sort = useAppSelector(state => state.postsSlice.filters._sort)
    const order = useAppSelector(state => state.postsSlice.filters._order)


    const debouncedValue = useDebounce<string>(searchText ?? "")
    const [page, setPage] = useState<number>(1)

    const onChangeHandler = (text: string) => {
        dispatch(setSearchText(text))
    }

    useEffect(() => {
        dispatch(getPosts())
        setPage(1)
    }, [debouncedValue, sort, order])


    return (
        <View style={styles.container}>
            <StatusBar barStyle={'light-content'}/>
            <TextField placeholder={'search'} value={searchText ?? ''} onChangeText={onChangeHandler}/>
            <Table currentPage={page}/>
            <Pagination currentPage={page} total={totalPosts} changePage={setPage}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.BACKGROUND_COLOR,
        paddingVertical: 50,
        paddingHorizontal: PADDING
    },
})

