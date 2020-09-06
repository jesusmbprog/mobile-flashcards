import React, { Component } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, View } from 'react-native';
import { postDeck } from '../utils/api';
import { saveDeckTitle } from "../actions";
import { connect } from "react-redux";
import TextButton from './TextButton';

class NewDeck extends Component {
    
    state = {
        input: ''
    }

    handleSubmit = () => {
        const { input } = this.state;
        const { navigation, dispatch } = this.props;
        const title = input;

        if(input && input !== '') {
            const deck = {
                [input]: {
                    title: input,
                    questions: [],
                },
            };
            dispatch(saveDeckTitle(deck));
            postDeck(title);
            navigation.navigate('Deck', {deck: title});
        }
    }

    handleChange = (input) => {
        this.setState({ input });
    }

    render() {
        const { input } = this.state;

        return (
            <KeyboardAvoidingView style={styles.container}>
                <Text style={styles.title}> What is the name of your new deck? </Text>
                <View>
                    <TextInput
                        value={input}
                        style={styles.inputText}
                        placeholder={'Deck Title'}
                        onChangeText={(input) => this.handleChange(input)}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <TextButton text="Create Deck" onPress={this.handleSubmit}>
                    </TextButton>
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
    title: {
        fontSize: 24,
        fontWeight: '700',
        textAlign: 'center'
    },
    inputText: {
        padding: 12,
        borderBottomWidth: 1,
    },
    buttonContainer: {
        flex: 2,
        justifyContent: 'flex-end',
        marginBottom: 24
    }
});


function mapStateToProps(decks ) {
    return {
        decks,
    };
}

export default connect(mapStateToProps)(NewDeck);