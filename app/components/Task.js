import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import Rating from './Rating';

export default class Task extends React.Component {

    render() {
        const { index, task } = this.props;

        return (
            <View>
                <Text style={styles.title}>{task.title}</Text>
                <Rating
                    taskIndex={index}
                    ratValue={task.rating}
                    onPressRating={(index, value) => this.props.onPressRating(index, value)} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontFamily: 'Roboto'
    }
});