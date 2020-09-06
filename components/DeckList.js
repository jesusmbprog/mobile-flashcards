import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchDecks } from '../utils/api';
import { getDecks } from "../actions";
import { FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';


class DeckList extends Component {

    componentDidMount() {
        const { dispatch } = this.props;
        fetchDecks()
            .then((decks) => dispatch(getDecks(decks)));
    }

    renderItem = ({ item }) => {
        const { title, questions } = item;
        const totalQuestions = questions.length;
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <TouchableOpacity 
                    key={item}
                    onPress={() => navigate('Deck', { deck: title })}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.subtitle}>{`${totalQuestions} cards`}</Text>
                </TouchableOpacity> 
            </View>
        ) 
    }

    render () {

        const { decks } = this.props;

        return (
            <View style={styles.container}>
            <FlatList
                data={Object.values(decks)}
                renderItem={this.renderItem}
                keyExtractor={(item) => item.title}
            />
        </View>
        );

    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        marginVertical: 8
    },
    subtitle: {
        textAlign: 'center',
    }
  })

function mapStateToProps(decks) {
    return {
        decks
    };
}

export default connect(mapStateToProps)(DeckList);