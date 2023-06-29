import React, { useState } from "react";

import { 
    Text, 
    TextInput, 
    View, 
    TouchableOpacity,
    Vibration,
    Pressable,
    Keyboard,
    FlatList
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
    const [imcList, setImcList] = useState([] as any)


    function imcCalculator() {
        const alturaFormat = altura.replace(",", ".")
        const pesoFormat = peso.replace(",", ".")
        let calculo:any = (pesoFormat/(alturaFormat * alturaFormat)).toFixed(2)
        setImcList((arr:any) => [...arr, {
            id: new Date().getTime(),
            imc: calculo
        }])
        setImc(calculo)
    }
    
    function verificationImc() {
        if(imc == null){
            Vibration.vibrate();
            setErrorMessage("Campo Obrigatorio*")
        }
    }

    function validateImc() {
        console.log(imcList);
        
        if(altura != null && peso != null){
            imcCalculator()
            setAltura(null)
            setPeso(null)
            setMessageImc("Seu IMC é igual: " )
            setTextButton("Calcular novamente")
            setErrorMessage(null)
        }
        else{
            verificationImc()
            setImc(null)
            setTextButton("Calcular")
            setMessageImc("Preencha o peso e altura!")
        }
        
    }

    return(
        
        <View style={styles.formContext}>
            {imc == null ? 
                <Pressable onPress={Keyboard.dismiss} style={styles.form}>
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
                </Pressable>
            :
                <View style={styles.exhibitionResult}>
                    <ResultImc 
                        messageResultImc={messageImc}
                        resultImc={imc}
                    />
                    <TouchableOpacity
                    style={styles.buttonCalculator}
                    onPress={() => {validateImc()}}
                    >
                        <Text style={styles.textButtonCalculator}>{textButton}</Text>
                    </TouchableOpacity>
                </View>
            }
            <FlatList
                showsVerticalScrollIndicator={false}
                style={styles.listImcs}
                data={imcList.reverse()}
                renderItem={({item}) => {
                    return(
                        <Text style={styles.resultImcItem}>
                            <Text style={styles.textResultItemList}>Resultado IMC = </Text>
                            {item.imc}
                        </Text>
                    )
                }}
                keyExtractor={(item):any => {
                    item.id
                }}
            />
        </View>
    )
}