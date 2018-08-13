import React from 'react';
import { View, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

export default class Rating extends React.Component {

    load_rating = (value) => {
        let result = [];

        for (let i = 0; i < 5; i++) {
            result.push(value > 0 ? 1 : 0);
            value--;
        }

        return result.map((val, i) => {
            return (
                <TouchableOpacity key={i} onPress={() => this.props.onPressRating(this.props.taskIndex, i + 1)}>
                    <Icon name={val === 1 ? "star" : "star-o"} size={20}/>
                </TouchableOpacity>
            )
        });
    }

    render() {
        return (
            <View style={{ flexDirection: 'row'}}>
                {this.load_rating(this.props.ratValue)}
            </View>
        )
    }
}