import {StyleSheet, TextInput, TextInputProps, View} from "react-native";
import {useState} from "react";
import {Search} from "../../common/assets/icon/search";
import {color} from "../../common/style/variables";

export const TextField = (props: Omit<TextInputProps, 'selectionColor' | 'style'>) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View style={styles.searchSection}>
            <TextInput
                {...props}
                placeholderTextColor={color.VIOLET}
                selectionColor={color.BLUE}
                style={[
                    styles.input,
                    isFocused ? styles.inputFocused : null,
                ]}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}

            />
            <Search style={[styles.searchIcon]}/>
        </View>
    );
};

const styles = StyleSheet.create({
    searchSection: {
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    input: {
        height: 40,
        fontSize: 18,
        width: '100%',
        borderWidth: 2,
        borderRadius: 4,
        borderColor: color.GRAY,
        color: color.VIOLET,
        paddingHorizontal: 10,
    },
    inputFocused: {
        borderColor: color.BLUE,
    },
    searchIcon: {
        position: 'absolute',
        right: 10,
    },
})

