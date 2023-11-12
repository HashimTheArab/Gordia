import { useEffect } from "react";
import { Image, StyleSheet, TouchableOpacity, View, Text } from "react-native";

export default function Solution({navigation, route}){
    const {image} = route.params;
    useEffect(() => {
        console.log('image found', image);
        // todo: send image to backend to process
    });
    return (
        <View>
            <Image style={styles.image} source={{ uri: image }} />
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Start Solving</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Pause</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    image: {
        width: 200,
        height: 200
    },
    buttonText: {
        fontSize: 18,
      color: '#FFF',
    },
    button: {

    },
});