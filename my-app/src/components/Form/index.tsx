import React, { useState } from "react";

import { Button, Text, TextInput, View, TouchableOpacity } from "react-native";
import ResultImc from "../ResultImc";
import styles from "./style";

export default function Form() {

    const [ altura, setAltura ] = useState(null as any)
    const [ peso, setPeso ] = useState(null as any)
    const [ imc, setImc ] = useState(null)
    const [ messageImc, setMessageImc ] = useState("Preencha o peso e altura!")
    const [ textButton, setTextButton ] = useState("Cacular")
    
    function imcCalculator() {
        const calculo:any = (peso/(altura * altura)).toFixed(2)
        return setImc(calculo)
    }
    
    function validateImc() {
        if(altura != null && peso != null){
            imcCalculator()
            setAltura(null)
            setPeso(null)
            setMessageImc("Seu IMC é igual: " )
            setTextButton("Calcular novamente")
            return
        }
        setImc(null)
        setTextButton("Calcular")
        setMessageImc("Preencha o peso e altura!")
    }

    return(
        <View style={styles.formContext}>
            <View style={styles.form}>
                <Text style={styles.formLabel}>Altura</Text>
                <TextInput 
                    style={styles.formInput}
                    placeholder="Ex. 1.75"
                    keyboardType="numeric"
                    onChangeText={(e:any) => setAltura(e)}
                    value={altura}
                />
                <Text style={styles.formLabel}>Peso</Text>
                <TextInput
                    style={styles.formInput}
                    placeholder="Ex. 75.365"
                    keyboardType="numeric"
                    onChangeText={(e:any) => setPeso(e)}
                    value={peso}
               />

               {/* <Button 
                
                title={textButton}
                onPress={() => validateImc()}
                /> */}
                <TouchableOpacity
                style={styles.buttonCalculator}
                onPress={() => {validateImc()}}
                >
                    <Text style={styles.textButtonCalculator}>{textButton}</Text>
                </TouchableOpacity>
            </View>
            <ResultImc 
            messageResultImc={messageImc}
            resultImc={imc}
             />
        </View>
    )
}