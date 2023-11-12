import { StyleSheet, TouchableOpacity, View, Text, Image, Alert, Linking } from "react-native";
import { Path, Svg } from "react-native-svg";
import * as ImagePicker from 'expo-image-picker';
import { useState } from "react";

export default function Home({navigation}){
    const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });
  
      if(!result.canceled){
        navigation.navigate('Solution', {image: result.assets[0].uri});
      }
    };

    const captureImage = async () => {
        const perms = await ImagePicker.requestCameraPermissionsAsync();
        if(!perms.granted){
            if(perms.canAskAgain){
                captureImage();
                return;
            }
            Alert.alert(
                "Camera Permission Required",
                "This app requires camera access to capture images. Go to settings and click Permissions > Camera > Allow.",
                [
                    { text: "No thanks" },
                    { text: "Go to Settings", onPress: Linking.openSettings }
                ]
            );
            return;
        }

        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if(!result.canceled){
            navigation.navigate('Solution', {image: result.assets[0].uri});
        }
    }
    
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Maze Solver</Text>
        
        <TouchableOpacity
          style={styles.button}
          onPress={captureImage}>
            <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <Path stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 16C13.6569 16 15 14.6569 15 13C15 11.3431 13.6569 10 12 10C10.3431 10 9 11.3431 9 13C9 14.6569 10.3431 16 12 16Z"/>
                <Path stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M3 16.8V9.2C3 8.0799 3 7.51984 3.21799 7.09202C3.40973 6.71569 3.71569 6.40973 4.09202 6.21799C4.51984 6 5.0799 6 6.2 6H7.25464C7.37758 6 7.43905 6 7.49576 5.9935C7.79166 5.95961 8.05705 5.79559 8.21969 5.54609C8.25086 5.49827 8.27836 5.44328 8.33333 5.33333C8.44329 5.11342 8.49827 5.00346 8.56062 4.90782C8.8859 4.40882 9.41668 4.08078 10.0085 4.01299C10.1219 4 10.2448 4 10.4907 4H13.5093C13.7552 4 13.8781 4 13.9915 4.01299C14.5833 4.08078 15.1141 4.40882 15.4394 4.90782C15.5017 5.00345 15.5567 5.11345 15.6667 5.33333C15.7216 5.44329 15.7491 5.49827 15.7803 5.54609C15.943 5.79559 16.2083 5.95961 16.5042 5.9935C16.561 6 16.6224 6 16.7454 6H17.8C18.9201 6 19.4802 6 19.908 6.21799C20.2843 6.40973 20.5903 6.71569 20.782 7.09202C21 7.51984 21 8.0799 21 9.2V16.8C21 17.9201 21 18.4802 20.782 18.908C20.5903 19.2843 20.2843 19.5903 19.908 19.782C19.4802 20 18.9201 20 17.8 20H6.2C5.0799 20 4.51984 20 4.09202 19.782C3.71569 19.5903 3.40973 19.2843 3.21799 18.908C3 18.4802 3 17.9201 3 16.8Z"/>
            </Svg>
          <Text style={styles.buttonText}>Capture Maze</Text>
        </TouchableOpacity>
  
        <TouchableOpacity
          style={styles.button}
          onPress={pickImage}>
          <Text style={styles.buttonText}>Upload Maze</Text>
        </TouchableOpacity>
  
        <View style={styles.footer}>
          <TouchableOpacity onPress={() => navigation.navigate('HistoryScreen')}>
            <Text style={styles.footerText}>History</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('HelpScreen')}>
            <Text style={styles.footerText}>Help</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('SettingsScreen')}>
            <Text style={styles.footerText}>Settings</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    width: '80%',
    padding: 20,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007bff',
    borderRadius: 5,
    flexDirection: 'row',
    gap: 4,
  },
  buttonText: {
    fontSize: 18,
    color: '#FFF',
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  footerText: {
    padding: 10,
    fontSize: 16,
  },
});