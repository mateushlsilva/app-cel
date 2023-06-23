import React, { useState } from "react";

import { 
    Text, 
    TextInput, 
    View, 
    TouchableOpacity,
    Vibration,
    Pressable,
    Keyboard
} from "react-native";
import ResultImc from "../ResultImc";
import styles from "./style";

export default function Form() {

    const [ altura, setAltura ] = useState(null as any)
    const [ peso, setPeso ] = useState(null as any)
    const [ imc, setImc ] = useState(null)
    const [ messageImc, setMessageImc ] = useState("Preencha o peso e altura!")
    const [ textButton, setTextButton ] = useState("Cacular")
    const [ errorMessage, setErrorMessage ] = useState(null as any)

    function imcCalculator() {
        const alturaFormat = altura.replace(",", ".")
        const pesoFormat = peso.replace(",", ".")
        const calculo:any = (pesoFormat/(alturaFormat * alturaFormat)).toFixed(2)
        return setImc(calculo)
    }
    
    function verificationImc() {
        if(altura == null || peso == null){
            Vibration.vibrate();
            setErrorMessage("Campo Obrigatorio*")
        }
    }

    function validateImc() {
        if(altura != null && peso != null){
            imcCalculator()
            setAltura(null)
            setPeso(null)
            setMessageImc("Seu IMC é igual: " )
            setTextButton("Calcular novamente")
            setErrorMessage(null)
            return
        }
        verificationImc()
        setImc(null)
        setTextButton("Calcular")
        setMessageImc("Preencha o peso e altura!")
        
    }

    return(
        <Pressable onPress={Keyboard.dismiss} style={styles.formContext}>
            <View style={styles.form}>
                <Text style={styles.formLabel}>Altura</Text>
                <Text style={styles.errorMessage}>{errorMessage}</Text>
                <TextInput 
                    style={styles.formInput}
                    placeholder="Ex. 1.75"
                    keyboardType="numeric"
                    onChangeText={(e:any) => setAltura(e)}
                    value={altura}
                />
                <Text style={styles.formLabel}>Peso</Text>
                <Text style={styles.errorMessage}>{errorMessage}</Text>
                <TextInput
                    style={styles.formInput}
                    placeholder="Ex. 75.365"
                    keyboardType="numeric"
                    onChangeText={(e:any) => setPeso(e)}
                    value={peso}
               />
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
        </Pressable>
    )
}