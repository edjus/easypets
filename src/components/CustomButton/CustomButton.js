import React from 'react';
import { TouchableHighlight, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

export default class CustomButton extends React.Component {
  render() {
    return (
      <TouchableHighlight underlayColor='rgba(73,182,77,0.9)' onPress={this.props.onPress}>
        <View style={styles.container}>
          <Text style={styles.text}>{this.props.title}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

CustomButton.propTypes = {
  onPress: PropTypes.func,
  title: PropTypes.string
};
