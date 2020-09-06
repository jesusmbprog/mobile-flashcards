import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import TextButton from './TextButton';
import { deleteDeck } from '../actions';

class Deck extends Component {

    render() {
        const { deck, navigation } = this.props;
        const totalQuestions = deck.questions.length;

        return (
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}>{deck.title}</Text>
                    <Text style={styles.subtitle}>{`${totalQuestions} cards`}</Text>
                </View>
                <View>
                    <View style={styles.containerButton}>
                        <TextButton
                            text='Add Card'
                            onPress={() => navigation.navigate('Add Card', {deck: deck.title})}
                        />
                    </View>
                    {totalQuestions > 0 &&
                    <View style={styles.containerButton}>
                        <TextButton
                            text='Start Quiz'
                            onPress={() => navigation.navigate('Quiz', {deck: deck.title})}
                        />
                    </View>
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "space-around",
        marginTop: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        marginVertical: 8
    },
    subtitle: {
        textAlign: 'center',
    },
    containerButton: {
        alignSelf: 'stretch',
        marginTop: 20,
        marginBottom: 20,
    }
});

function mapStateToProps(decks, props) {
    const { route } = props;
    const deckName = route.params.deck;

    return {
        deck: decks[deckName],
    };
}

export default connect(mapStateToProps)(Deck);