import { DefaultTheme, NavigationContainer, useTheme } from "@react-navigation/native";
import { TouchableOpacity, StyleSheet, } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./screens/Home";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Solution from "./screens/Solution";

const Stack = createNativeStackNavigator();

const Theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#fff',
      card: '#fff',
    },
  };

export default function Navigation() {
    return (
        <NavigationContainer theme={Theme}>
            <Stack.Navigator>
                <Stack.Screen name="Maze Solver" component={Home} />
                <Stack.Screen name="Solution" component={Solution} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}


const styles = StyleSheet.create({
    background: {
        backgroundColor: '#6b7280',
        alignItems: 'center',
        justifyContent: 'center',
    },
});