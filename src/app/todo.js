import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

export class Todo extends Component {
    constructor () {
        super();
        this.state = {
            todos: [],
            newTodo: ''
        }
    }

    componentWillMount() {
        fetch('http://192.168.178.28:3000/todos', {
            headers: {
                'Accept': 'application/json'
            }
        }).then(res => res.json())
            .then(todos => this.setState({todos}));
    }

    handleChange(text){
        this.setState({
            newTodo: text
        })
    }

    handlePress(){
        fetch('http://192.168.178.28:3000/todos', {
            method: 'POST',
            body: JSON.stringify({
                name: this.state.newTodo
            }),
            headers: {
                'Content-Type' : 'application/json'
            }
        }).then(res => res.json())
            .then(todo => {
                const todos = [todo, ...this.state.todos];
                this.setState({todos, newTodo: ''});
            })

        ;

        // const todos = [...this.state.todos, this.state.newTodo];
        // this.setState({todos, newTodo: ''});
    }

    render () {
        return (
            <View style={styles.container}>
                <View style={styles.form}>
                    <TextInput
                        style={styles.input}
                        value={this.state.newTodo}
                        onChangeText={this.handleChange.bind(this)}>
                    </TextInput>
                    <TouchableOpacity style={styles.button}>
                        <Text
                            style={styles.buttonText}
                            onPress={this.handlePress.bind(this)}
                        >
                            Make
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.todos}>{this.state.todos.map((todo, i) => (
                    <View key={i} style={styles.todo}>
                        <Text style={styles.todoText}>{todo.name}</Text>
                    </View>
                ))}</View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    form: {
        //by default its column
        flexDirection: 'row'
    },
    input: {
        flex: 0.7,
        fontSize: 24
    },
    button: {
        flex: 0.3,
        borderWidth: 1,
        height: 50,
        borderColor: 'blue',
        borderRadius: 3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    todos: {
        marginTop: 60
    },
    todo: {
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'lightgrey'
    },
    todoText: {
        fontSize: 24
    }
});