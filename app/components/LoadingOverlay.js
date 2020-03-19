import React, {Component} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {GlobalStyles} from '../Styles';
export class LoadingOverlay extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={GlobalStyles.Color.Primary} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
});
