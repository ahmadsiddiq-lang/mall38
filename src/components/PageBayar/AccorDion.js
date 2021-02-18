/* eslint-disable react-native/no-inline-styles */
import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Accordion from 'react-native-collapsible/Accordion';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { sizeFont, sizeWidth } from '../../assets/responsive';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { color } from '../../assets/colors/Index';

class AccordionView extends Component {
    state = {
        activeSections: [],
    };

    // _renderSectionTitle = section => {
    //     return (
    //         <View style={styles.content}>
    //             <Text>{section.content}</Text>
    //         </View>
    //     );
    // };

    _renderHeader = section => {
        return (
            <View style={styles.header}>
                <Text style={styles.headerText}>{section.title}</Text>
                <Ionicons name="caret-down" color={color.mainColor} size={sizeFont(4)} />
            </View>
        );
    };

    _renderContent = section => {
        return (
            <View style={styles.content}>
                {
                    section.content.map((item, index) => {
                        return (
                            <View style={styles.itemContent} key={index}>
                                <View style={{
                                    width: sizeWidth(5),
                                    height: sizeWidth(5),
                                    borderRadius: sizeWidth(5),
                                    backgroundColor: color.mainColor,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginTop: 3,
                                }}><Text style={{
                                    fontSize: sizeFont(3.5),
                                    color: color.fontWhite,
                                    marginTop: 5,
                                }}>{item.no}</Text></View>
                                <Text style={styles.textContent}>{item.text}</Text>
                            </View>
                        );
                    })
                }
            </View>
        );
    };

    _updateSections = activeSections => {
        this.setState({ activeSections });
    };

    render() {
        return (
            <View style={styles.container}>
                <Accordion
                    sections={this.props.dataPetunjuk}
                    activeSections={this.state.activeSections}
                    // renderSectionTitle={this._renderSectionTitle}
                    renderHeader={this._renderHeader}
                    renderContent={this._renderContent}
                    onChange={this._updateSections}
                    underlayColor="white"
                />
            </View>
        );
    }
}

export default AccordionView;

const styles = StyleSheet.create({
    container: {
        // borderWidth: 1,
        paddingTop: hp(2),
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: hp(2),
        borderBottomWidth: 0.5,
        borderColor: color.border2,
        paddingHorizontal: sizeWidth(5),
    },
    headerText: {
        fontSize: sizeFont(3.8),
    },
    content: {
        backgroundColor: color.bgBlack4,
        padding: sizeWidth(2),
        paddingHorizontal: sizeWidth(5),
    },
    itemContent: {
        flexDirection: 'row',
        marginVertical: hp(1),
    },
    textContent: {
        marginLeft: sizeWidth(3),
        fontSize: sizeFont(3),
        flex: 1,
    },
});
