import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import { TodoForm } from './TodoForm';
import {connect} from 'react-redux';
import { CREATE_TODO, SET_TODOS } from './reducers';


export class _Todo extends Component {
    constructor () {
        super();
        this.state = {newTodo: ''}
    }

    componentDidMount() {
        fetch('http://192.168.178.28:3000/todos', {
            headers: {
                'Accept': 'application/json'
            }
        }).then(res => res.json())
            .then(todos => {this.props.setTodos(todos);});
    }

    handleChange(text){
        this.setState({
            newTodo: text
        })
    }

    handlePress(){
        // this.props.createTodo(this.state.newTodo);

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
                // const todos = [todo, ...this.state.todos];
                // this.setState({todos, newTodo: ''});

                this.props.createTodo(todo);
                this.setState({newTodo: ''});
            })

        ;

        // const todos = [...this.state.todos, this.state.newTodo];
        // this.setState({todos, newTodo: ''});
    }

    render () {
        return (
            <View style={styles.container}>
                <TodoForm
                    handlePress={this.handlePress.bind(this)}
                    handleChange={this.handleChange.bind(this)}
                    value={this.state.newTodo}
                />
                <View style={styles.todos}>{this.props.todos.map((todo, i) => (
                    <View key={i} style={styles.todo}>
                        <Text style={styles.todoText}>{todo.name}</Text>
                    </View>
                ))}</View>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    todos: state.todos
});

const mapActionsToProps= (dispatch) => ({
    createTodo(todo) {
        dispatch({type: CREATE_TODO, payload: todo})
    },
    setTodos(todos) {
        dispatch({type: SET_TODOS, payload: todos})
    }
});

export const Todo = connect(mapStateToProps, mapActionsToProps)(_Todo);

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