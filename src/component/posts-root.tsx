import {useEffect} from 'react';
import {StatusBar, StyleSheet, View} from "react-native";
import {useAppDispatch, useAppSelector} from "../common/hooks/useAppHooks";
import {getPosts, selectOrder, selectSort, setPage, setSearchText} from "../service/posts-slice";
import {PADDING} from "../common/constant/constant";
import {TextField} from "./text-field/text-field";
import {Table} from "./table/table";
import {color} from "../common/style/variables";
import {Pagination} from "./pagination/pagination";
import useDebounce from "../common/hooks/useDebounce";

export const PostsRoot = () => {
    const dispatch = useAppDispatch()
    const searchText = useAppSelector(state => state.postsSlice.queries.q)

    const sort = useAppSelector(selectSort)
    const order = useAppSelector(selectOrder)


    const debouncedValue = useDebounce<string>(searchText ?? "")


    const onChangeHandler = (text: string) => {
        dispatch(setSearchText(text))
    }

    useEffect(() => {
        dispatch(getPosts())
        dispatch(setPage(1))
    }, [debouncedValue, sort, order])


    return (
        <View style={styles.container}>
            <StatusBar barStyle={'light-content'}/>
            <TextField placeholder={'поиск'} value={searchText ?? ''} onChangeText={onChangeHandler}/>
            <Table/>
            <Pagination/>
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

