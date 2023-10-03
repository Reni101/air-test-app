import React, {useEffect, useRef} from 'react';
import {ScrollView, StyleSheet, Text, View} from "react-native";
import {useAppSelector} from "../../hooks/useAppHooks";
import {Chevron} from "../../assets/icon/chevron";

type propsType = {
    currentPage: number
}

export const Table = ({currentPage}: propsType) => {
    const scrollViewRef = useRef<ScrollView>(null);

    const posts = useAppSelector(state => state.postsSlice.posts)

    const itemsPerPage = 10

    const start = (currentPage - 1) * itemsPerPage
    const end = start + itemsPerPage

    useEffect(() => {
        scrollViewRef?.current?.scrollTo({x: 0, y: 0, animated: true});
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

            <ScrollView bounces={false} style={styles.body} ref={scrollViewRef}>

                {posts.slice(start, end).map((el) => {
                    return <View style={styles.body_row} key={el.id}>
                        <Text style={[styles.bodyCell, styles.text, {flex: 0.15}]}>{el.id}</Text>
                        <Text style={[styles.bodyCell, styles.text, {flex: 0.35}]}>{el.title}</Text>
                        <Text style={[styles.bodyCell, styles.text, {flex: 0.5}]}>{el.body}</Text>
                    </View>
                })}
            </ScrollView>


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
        borderBottomWidth: 2,
    },
    text: {
        color: '#fff',
    },
})
