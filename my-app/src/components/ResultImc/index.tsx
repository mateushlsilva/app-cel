import React from "react";

import { View, Text, TouchableOpacity, Share } from "react-native";
import styles from "./style";

export default function ResultImc(props:any) {

    const onShare = async () => {
        const result = await Share.share({
            message: "Meu IMC hoje é: " + props.resultImc
        })
    }

    return(
        <View style={styles.resultImc}>
            <View style={styles.boxSharebutton}>
                { props.resultImc != null ?
                    <TouchableOpacity 
                    onPress={onShare}
                    style={styles.share}>
                        <Text style={styles.sharedText}>Compartilhar</Text>
                    </TouchableOpacity>
                :
                    <View/>
                }
            </View>
            <Text style={styles.infomation}>{props.messageResultImc}</Text>  
            <Text style={styles.numberImc}>{props.resultImc}</Text>  
        </View>
    )
}