import React from 'react';
import {styles} from "./ServicesListStyles";
import {getIcon} from "../../../../utils/getIcons";
import {Pressable, Text, View} from "react-native";
import {servicesData} from "../../../../utils/servicesData";
import { translateService } from '../../../../utils/formatHelpers';

const ServiceButton = ({ item }) => {
    const IconComponent = getIcon(item.name);
    return (
        <View style={styles.services__servicesList__buttonView}>
            <Pressable
                android_ripple={{ color: "#E2E2E2", borderless: true }}
                style={styles.services__servicesList__button}
            >
                <IconComponent style={styles.services__servicesList__icon} />
                <Text style={styles.services__servicesList__name}>{item.name}</Text>
            </Pressable>
        </View>
    );
};

const ServiceButton2 = ({ item }) => {
    const IconComponent = getIcon(item.name);
    const firstServiceButtons = services
        .slice(0, 18)
        .map((item) => <ServiceButton key={item.key} item={item} />);

    const secondServiceButtons = services
        .slice(18)
        .map((item) => <ServiceButton2 key={item.key} item={item} />);

    return (
        <View style={styles.services__servicesList__buttonView2}>
            <Pressable
                android_ripple={{ color: "#E2E2E2", borderless: true }}
                style={styles.services__servicesList__button2}
            >
                <IconComponent style={styles.services__servicesList__icon} />
                <Text style={styles.services__servicesList__name}>{translateService(item.name)}</Text>
            </Pressable>
        </View>
    );
};

const ServicesList = () => {
    const firstServiceButtons = servicesData
        .slice(0, 18)
        .map((item) => <ServiceButton key={item.key} item={item} />);

    const secondServiceButtons = servicesData
        .slice(18)
        .map((item) => <ServiceButton2 key={item.key} item={item} />);

    return (
        <View style={styles.services__servicesList__mainContainer}>
            <Text style={{ fontSize: 22, fontFamily: "Inter-SemiBold" }}>
                Servicios
            </Text>
            <View style={styles.services__servicesList__container}>{firstServiceButtons}</View>
            <View style={styles.services__servicesList__container2}>{secondServiceButtons}</View>
        </View>
    )
}

export default ServicesList;