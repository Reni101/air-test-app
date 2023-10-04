import React, {useEffect, useRef} from 'react';
import {FlatList, Pressable, StyleSheet, Text, View} from "react-native";
import {useAppDispatch, useAppSelector} from "../../common/hooks/useAppHooks";
import {Chevron} from "../../common/assets/icon/chevron";
import {PostItem} from "../../common/ui/post-item/post-item";
import {selectPosts, selectPostsPerPage, setSortParams} from "../../service/posts-slice";
import {sortType} from "../../api/posts.api";

type propsType = {
    currentPage: number
}


export const Table = ({currentPage}: propsType) => {
    const dispatch = useAppDispatch()
    const listRef = useRef<FlatList<any>>(null);

    const posts = useAppSelector(selectPosts)
    const postsPerPage = useAppSelector(selectPostsPerPage)
    const sort = useAppSelector(state => state.postsSlice.filters._sort)
    const order = useAppSelector(state => state.postsSlice.filters._order)


    const start = (currentPage - 1) * postsPerPage
    const end = start + postsPerPage

    const onPressHeadCellHandler = (id: sortType) => {
        const value = order === 'asc' ? 'desc' : 'asc'
        dispatch(setSortParams({_sort: id, _order: value}))
    };

    useEffect(() => {
        listRef.current?.scrollToOffset({offset: 0, animated: true});
    }, [currentPage]);

    const columHead: { id: sortType, title: string, flex: number }[] = [
        {id: 'id', title: 'ID', flex: 0.15},
        {id: 'title', title: 'Заголовок', flex: 0.35},
        {id: 'body', title: 'Описание', flex: 0.5}
    ]


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                {
                    columHead.map((cell) => {
                        return <Pressable
                            key={cell.id}
                            style={[styles.headerCell, {flex: cell.flex}]}
                            onPress={() => {
                                onPressHeadCellHandler(cell.id)
                            }}
                        >
                            <Text style={[styles.text]}> {cell.title} </Text>
                            <Text>
                                <Chevron
                                    style={(sort === cell.id) && (order === 'desc') && styles.descDirection}/>
                            </Text>
                        </Pressable>
                    })
                }

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
    text: {
        color: '#fff',
    },
    descDirection: {
        transform: [{rotate: '180deg'}]
    },
})
