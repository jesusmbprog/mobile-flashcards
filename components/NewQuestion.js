import React, { Component } from 'react';
import { KeyboardAvoidingView, StyleSheet, TextInput, View } from 'react-native';
import { postCard } from '../utils/api';
import { connect } from "react-redux";
import { addCardToDeck } from "../actions";
import TextButton from './TextButton';

class NewQuestion extends Component {

    state = {
        question: '',
        answer: '',
    }

    handleChangeAnswer = (input) => {
        this.setState({answer: input});
    }

    handleChangeQuestion = (input) => {
        this.setState({question: input});
    }

    handleSubmit = () => {
        const { question, answer } = this.state;
        if (question && question !== '' && answer && answer !== '') {
            const { navigation, dispatch, route } = this.props;
            const deckName = route.params.deck;
            const card = {
                question,
                answer,
            };
    
            dispatch(addCardToDeck(deckName, card));
            navigation.goBack();
            postCard(deckName, card);
        }
    }

    render() {
        const { question, answer } = this.state;

        return (
            <KeyboardAvoidingView style={styles.container}>
                <View>
                    <TextInput
                        value={question}
                        style={styles.input}
                        placeholder={'Question'}
                        onChangeText={(input) => this.handleChangeQuestion(input)}
                    />
                </View>
                <View>
                    <TextInput
                        value={answer}
                        style={styles.input}
                        placeholder={'Answer'}
                        onChangeText={(input) => this.handleChangeAnswer(input)}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <TextButton
                        text='Submit'
                        onPress={this.handleSubmit}
                    />
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
    },
    input: {
        padding: 12,
        margin: 20,
        borderBottomWidth: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        textAlign: 'center'
    },
    buttonContainer: {
        flex: 2,
        justifyContent: 'flex-end',
        marginBottom: 24
    }
});

export default connect()(NewQuestion);