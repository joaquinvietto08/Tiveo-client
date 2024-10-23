import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    home__serviceList__container: {
            marginVertical: 10,
    },
    home__serviceList__button: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 14,
        marginRight: 10,
        borderWidth: 0.5,
    },
    home__serviceList__activeButton: {
        backgroundColor: "#FF9D00",
        borderColor: "#FF9D00",
    },
    home__serviceList__inactiveButton: {
        borderColor: "#8D8D8D",
        backgroundColor: "rgba(255, 255, 255, 0.69)",
    },
    home__serviceList__activeText: {
        fontFamily: "Inter-Medium",
        color: "#fff",
    },
    home__serviceList__inactiveText: {
        fontFamily: "Inter-Regular",
        color: "#8D8D8D",
    },
    home__serviceList__flatList: {
        paddingHorizontal: 20,
    }
})