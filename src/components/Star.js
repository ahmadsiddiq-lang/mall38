import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { sizeWidth } from '../assets/responsive';

export default class Star extends Component {

    state = {
        starTotal: 5,
        lengthStar: [],
    }


    componentDidMount = () => {
        // ratingStar=()=>{
        let ratings = this.props.ratings;
        // let ratings = 2;
        if (ratings > 0) {
            let star = [];
            for (let x = 1; x <= this.state.starTotal; x++) {
                if (x <= ratings) {
                    star.push('star');
                } else {
                    star.push('star-outline');
                }
            }
            this.setState({ lengthStar: star });
        }
    }

    render() {
        const { lengthStar } = this.state;
        const { sizeStar } = this.props;
        return (
            <View style={styles.Container}>
                {
                    lengthStar.map((item, index) => {
                        return (
                            <Ionicons
                                key={index}
                                name={item}
                                size={sizeStar}
                                color="#FCAE3B"
                                style={{
                                    marginHorizontal: sizeWidth(0.5),
                                }}
                            />
                        );
                    })
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    Container: {
        flexDirection: 'row',
    },
});
