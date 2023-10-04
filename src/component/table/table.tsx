import React, {useEffect, useRef} from 'react';
import {FlatList, StyleSheet, Text, View} from "react-native";
import {useAppSelector} from "../../common/hooks/useAppHooks";
import {Chevron} from "../../common/assets/icon/chevron";
import {PostItem} from "../../common/ui/post-item/post-item";
import {selectPosts, selectPostsPerPage} from "../../service/posts-slice";

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
            <View style={styles.header}>

                <View style={[styles.headerCell, {flex: 0.15}]}>
                    <Text style={[styles.text]}> ID </Text>
                    <Text> <Chevron/></Text>
                </View>

                <View style={[styles.headerCell, {flex: 0.35}]}>
                    <Text style={[styles.text]}> Заголовок </Text>
                    <Text> <Chevron/></Text>
                </View>

                <View style={[styles.headerCell, {flex: 0.5}]}>
                    <Text style={[styles.text]}>Описание </Text>
                    <Text><Chevron/></Text>
                </View>

            </View>

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
    header: {
        flexDirection: 'row',
        backgroundColor: '#333',
    },
    headerCell: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#fff',
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: '#000'
    },
    body: {
        flex: 1,
    },
    body_row: {},
    bodyCell: {},
    text: {
        color: '#fff',
    },
})
