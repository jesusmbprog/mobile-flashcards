import React, {Component} from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import TextButton from './TextButton';
import { connect } from "react-redux";
import { clearLocalNotification, setLocalNotification } from '../utils/helpers';

class Quiz extends Component {

    state = {
        currentQuestion: 0,
        correct: 0,
        incorrect: 0,
        showAnswer: false,
        finished: false,
    };


    restartQuiz = () => {
        this.setState({
            currentQuestion: 0,
            correct: 0,
            incorrect: 0,
            showAnswer: false,
            finished: false,
        });
    }

    flipCard = () => {
        this.setState({
            showAnswer: !this.state.showAnswer,
        })
    }

    handleAnswerQuestion = (value) => {
        const { currentQuestion, correct, incorrect } = this.state;
        const { deck } = this.props;
        const totalQuestions = deck.questions.length;
        value ?
            this.setState({
                correct: correct + 1
            }) :
            this.setState({
                incorrect: incorrect + 1
            });

        if (currentQuestion + 1  === totalQuestions) {
            this.setState({finished: true});
            clearLocalNotification();
            setLocalNotification();
        } else {
            this.setState({currentQuestion: currentQuestion + 1});
        }
    }

    render() {
        const { currentQuestion, correct, incorrect, showAnswer, finished } = this.state;
        const { navigation, deck } = this.props;
        const totalQuestions = deck.questions.length;
        const percent = Math.round(correct / (correct + incorrect) * 100);

        return (
            <View style={styles.container}>
                {finished
                    ? <View>
                        <Text style={styles.title}> Results </Text>
                        <Text style={styles.result}>
                            {`You have answered correctly ${percent}% of the questions`}
                        </Text>
                        <View>
                            <View style={styles.containerButton}>
                                <TextButton text='Restart' onPress={this.restartQuiz}/>
                            </View>
                            <View style={styles.containerButton}>
                                    <TextButton text='Back to Deck' onPress={() => navigation.navigate('Deck', {deck: deck.title})} />
                            </View>
                        </View>
                    </View>
                    : <View>
                        <Text>
                            {`${currentQuestion + 1}/${totalQuestions}`}
                        </Text>
                        <View>
                            <Text style={styles.title}>
                                {showAnswer
                                    ? deck.questions[currentQuestion].answer
                                    : deck.questions[currentQuestion].question}
                            </Text>

                            <TouchableOpacity onPress={this.flipCard}>
                                <Text style={styles.redText}>
                                    {showAnswer ? 'Question' : 'Answer'}
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View>
                            <View style={styles.containerButton}>
                                <TextButton  buttonStyle={{backgroundColor: 'green'}}
                                                text='Correct'
                                                onPress={() => this.handleAnswerQuestion(true)}/>
                            </View>
                            <View style={styles.containerButton}>
                                    <TextButton buttonStyle={{backgroundColor: 'red'}}
                                                text='Incorrect'
                                                onPress={() => this.handleAnswerQuestion(false)}/>
                            </View>
                        </View>
                    </View>}
            </View>)
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        marginVertical: 8,
        textAlign: 'center'
    },
    subtitle: {
        textAlign: 'center'
    },
    result: {
        marginVertical: 100,
        fontSize: 24,
        fontWeight: '700',
        color: 'green',
        textAlign: 'center'
    },  
    redText: {
        color: 'red',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '700',
        marginVertical: 16
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

export default connect(mapStateToProps)(Quiz);