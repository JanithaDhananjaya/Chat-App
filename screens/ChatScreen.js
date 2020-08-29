import React,{Component} from "react";
import {View, Text, StyleSheet} from "react-native";

export default class ChatScreen extends Component{
    render() {
        return(
            <View style={style.container}>
                <Text>Screen</Text>
            </View>
        );
    }
}


const style = StyleSheet.create({
    container :{
        flex:1,
        justifyContent: "center",
        alignItems: "center"
    }
});
