import { useEffect } from "react";
import { Image, StyleSheet, TouchableOpacity, View, Text } from "react-native";
import Svg, { Path } from "react-native-svg";

export default function Solution({navigation, route}){
    const {image} = route.params;
    useEffect(() => {
        // todo: send image to backend to process
    });
    return (
        <View style={styles.container}>
            <View style={styles.image}>
                <Svg viewBox="0 0 500 500">
                    {/* {renderMaze(mazeData)} */}
                    {renderPath({})}
                </Svg>
            </View>
            <View style={{}}>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Start Solving</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Pause</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const renderPath = (path) => {
    const cellSize = 3;
    let pathD = `M ${path[0].x * cellSize + cellSize / 2} ${path[0].y * cellSize + cellSize / 2}`;
    path.forEach((point, index) => {
      if (index > 0) {
        pathD += ` L ${point.x * cellSize + cellSize / 2} ${point.y * cellSize + cellSize / 2}`;
      }
    });
  
    return <Path d={pathD} stroke="red" strokeWidth="2" fill="none" />;
  };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 20,
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '70%',
        backgroundColor: '#94a3b866',
        borderColor: 'gray',
        borderWidth: 2,
    },
    buttonText: {
        fontSize: 18,
        color: '#FFF',
    },
    button: {
        paddingHorizontal: 35,
        paddingVertical: 8,
        marginTop: 10,
        backgroundColor: '#007bff',
        borderRadius: 5,
        alignItems: 'center',
    },
});