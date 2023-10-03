import React, {useEffect, useState} from 'react';
import {StatusBar, StyleSheet, View} from "react-native";
import {useAppDispatch, useAppSelector} from "../../common/hooks/useAppHooks";
import {getPosts, setSearchText} from "../../service/posts-slice";
import {PADDING} from "../../common/constant/constant";
import {TextField} from "../../common/ui/text-field/text-field";
import {Table} from "../../common/ui/table/table";
import {color} from "../../common/style/variables";
import {Pagination} from "../../common/ui/pagination/pagination";
import useDebounce from "../../common/hooks/useDebounce";

export const Posts = () => {
    const dispatch = useAppDispatch()



    const searchText = useAppSelector(state => state.postsSlice.filters.q)
    const postsLength = useAppSelector(state => state.postsSlice.posts.length)

    const debouncedValue = useDebounce<string>(searchText ?? "")
    const [page, setPage] = useState<number>(1)

    const onChangeHandler = (text: string) => {
        dispatch(setSearchText(text))
    }

    useEffect(() => {
        dispatch(getPosts())
        setPage(1)
    }, [debouncedValue])


    return (
        <View style={styles.container}>
            <StatusBar barStyle={'light-content'}/>
            <TextField value={searchText ?? ''} onChangeText={onChangeHandler}/>
            <Table currentPage={page}/>
            <Pagination currentPage={page} total={postsLength} changePage={setPage}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.BACKGROUND_COLOR,
        paddingTop: 50,
        paddingHorizontal: PADDING
    },
})

