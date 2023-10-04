import React from 'react';
import {View, Text, StyleSheet, ListRenderItem} from "react-native";
import {Post} from "../../../api/type";

export const PostItem: ListRenderItem<Post> = ({item}) => {
    return (
        <View style={styles.body_row} key={item.id}>
            <Text style={[styles.bodyCell, styles.text, {flex: 0.15}]}>{item.id}</Text>
            <Text style={[styles.bodyCell, styles.text, {flex: 0.35}]}>{item.title}</Text>
            <Text style={[styles.bodyCell, styles.text, {flex: 0.5}]}>{item.body}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    body_row: {
        flexDirection: 'row',
        flex: 1,
        borderBottomColor: '#333',
        borderBottomWidth: 2,
    },
    bodyCell: {
        minHeight: 50,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderBottomColor: '#333',
        borderBottomWidth: 1,
    },
    text: {
        color: '#fff',
    },
})