import React, { useState } from "react";

import { Button, Text, TextInput, View } from "react-native";
import ResultImc from "../ResultImc";

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
        <View>
            <View>
                <Text>Altura</Text>
                <TextInput 
                    placeholder="Ex. 1.75"
                    keyboardType="numeric"
                    onChangeText={(e:any) => setAltura(e)}
                    value={altura}
                />
                <Text>Peso</Text>
                <TextInput
                    placeholder="Ex. 75.365"
                    keyboardType="numeric"
                    onChangeText={(e:any) => setPeso(e)}
                    value={peso}
               />

               <Button 
                title={textButton}
                onPress={() => validateImc()}
                />
            </View>
            <ResultImc 
            messageResultImc={messageImc}
            resultImc={imc}
             />
        </View>
    )
}