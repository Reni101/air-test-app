import {sortType} from "../../../api/posts.api";
import {Pressable, StyleSheet, Text, View} from "react-native";
import {selectOrder, selectSort, setSortParams} from "../../../service/posts-slice";
import {useAppDispatch, useAppSelector} from "../../../common/hooks/useAppHooks";
import {color} from "../../../common/style/variables";
import {Chevron} from "../../../common/icons/chevron";

const columHead: { id: sortType, title: string, flex: number }[] = [
    {id: 'id', title: 'ID', flex: 0.15},
    {id: 'title', title: 'Заголовок', flex: 0.35},
    {id: 'body', title: 'Описание', flex: 0.5}
]

export const TableHead = () => {
    const dispatch = useAppDispatch()

    const sort = useAppSelector(selectSort)
    const order = useAppSelector(selectOrder)


    const onPressHeadCellHandler = (sortId: sortType) => {
        const value = order === 'asc' ? 'desc' : 'asc'
        dispatch(setSortParams({_sort: sortId, _order: value}))
    };

    return (
        <View style={styles.header}>
            {columHead.map((cell) => {

                const isSorted = sort === cell.id

                return <Pressable
                    key={cell.id}
                    style={[styles.headerCell, {flex: cell.flex}]}
                    onPress={() => {
                        onPressHeadCellHandler(cell.id)
                    }}
                >
                    <Text style={[styles.text, isSorted && styles.sorted]}> {cell.title} </Text>
                    <Text>
                        <Chevron
                            color={isSorted ? '#8C61FF' : 'none'}
                            style={isSorted && (order === 'desc') && styles.descDirection}/>
                    </Text>
                </Pressable>
            })}
        </View>
    );
};


const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        backgroundColor: color.GRAY,
        borderRadius: 4,
    },
    headerCell: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: color.BACKGROUND_COLOR
    },
    sorted: {
        color: color.VIOLET,
    },
    text: {
        color: color.WHITE,
    },
    descDirection: {
        transform: [{rotate: '180deg'}]
    },
})