import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    Platform
} from 'react-native';

const { width, height } = Dimensions.get('window');

export class Fancy extends Component {
    render () {
        return (
            <View style={[styles.container, {backgroundColor: 'lightblue'}]}>
                <View style={styles.box}/>
                <Text style={styles.text}>OS: {Platform.OS}, V: {Platform.Version}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : 'red',
        padding: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    box : {
        backgroundColor: 'yellow',
        width: width / 2,
        height: height / 3,
        position: 'absolute',
        top: 20,
        left: 30,
        borderRadius: 30
    },
    text : {
        color: 'white',
        fontSize: 34,
        fontWeight: 'bold'
    }
});
