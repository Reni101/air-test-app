import {StyleSheet, TextInput, TextInputProps, View} from "react-native";
import {useState} from "react";
import {Search} from "../../assets/icon/search";
import {color} from "../../style/variables";

export const TextField = (props: Omit<TextInputProps, 'selectionColor' | 'style'>) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <View style={styles.searchSection}>
            <TextInput
                {...props}
                placeholder={'search'}
                placeholderTextColor={"#8C61FF"}
                selectionColor={'#2F68CC'}
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
        borderColor: color.GREY,
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

