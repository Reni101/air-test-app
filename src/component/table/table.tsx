import React, {useEffect, useRef} from 'react';
import {FlatList, StyleSheet, View} from "react-native";
import {useAppSelector} from "../../common/hooks/useAppHooks";
import {PostItem} from "./post-item/post-item";
import {selectPosts, selectPostsPerPage} from "../../service/posts-slice";
import {TableHead} from "./table-head/table-head";

type propsType = {
    currentPage: number
}


export const Table = ({currentPage}: propsType) => {

    const listRef = useRef<FlatList<any>>(null);

    const posts = useAppSelector(selectPosts)
    const postsPerPage = useAppSelector(selectPostsPerPage)


    const start = (currentPage - 1) * postsPerPage
    const end = start + postsPerPage


    useEffect(() => {
        listRef.current?.scrollToOffset({offset: 0, animated: true});
    }, [currentPage]);


    return (
        <View style={styles.container}>

            <TableHead/>

            <FlatList
                ref={listRef}
                data={posts.slice(start, end)}
                renderItem={PostItem}
                bounces={false}/>

        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        flex: 1,
    },
})
