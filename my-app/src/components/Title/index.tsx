import React from "react";

import { View, Text } from "react-native";

export default function Title({title}:any) {
    return(
        <View>
            <Text>{title}</Text>  
        </View>
    )
}