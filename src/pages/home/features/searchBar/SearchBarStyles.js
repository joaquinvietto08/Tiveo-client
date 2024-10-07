import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    home__search__container: {
        width: "100%",
        paddingHorizontal: 20,
        justifyContent: "center",
        paddingTop: 20,
    },
    home__search__subContainer: {
        flexDirection: "row",
        height: 50,
        backgroundColor: "#fff",
        borderRadius: 40,
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 1,
        justifyContent: "space-between",
        paddingRight: 7,
        alignItems: "center",
    },
    home__search__button: {
        flex: 1,
        height: "100%",
        borderRadius: 40,
        flexDirection: "row",
        paddingLeft: 20,
        alignItems: "center",
    },
    home__search__text:{
        marginLeft: 10,
        fontSize: 16,
        fontFamily: "Inter-Regular",
    }
})