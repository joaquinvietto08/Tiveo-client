import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    home__servicesList__container: {
            marginVertical: 10,
    },
    home__servicesList__button: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 14,
        marginRight: 10,
        borderWidth: 0.5,
    },
    home__servicesList__activeButton: {
        backgroundColor: "#FF9D00",
        borderColor: "#FF9D00",
    },
    home__servicesList__inactiveButton: {
        borderColor: "#8D8D8D",
        backgroundColor: "rgba(255, 255, 255, 0.69)",
    },
    home__servicesList__activeText: {
        fontFamily: "Inter-Medium",
        color: "#fff",
    },
    home__servicesList__inactiveText: {
        fontFamily: "Inter-Regular",
        color: "#8D8D8D",
    },
    home__servicesList__flatList: {
        paddingHorizontal: 20,
    }
})