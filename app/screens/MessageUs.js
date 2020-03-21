import React, {Component} from 'react';
import {
  Image,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {GlobalStyles} from '../Styles';

export class MessageUsScreen extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.backgroundImage}
          source={require('../images/background.jpg')}></Image>
        <View style={styles.row}>
          <TextInput
            style={styles.rowText}
            placeholder="Name"
            autoCorrect={false}></TextInput>
        </View>
        <View style={styles.rowdivider}></View>
        <View style={styles.row}>
          <TextInput
            style={styles.rowText}
            placeholder="Email / Phone No."
            autoCorrect={false}></TextInput>
        </View>
        <View style={styles.rowdivider}></View>
        <View style={styles.row}>
          <TextInput
            style={[styles.rowText, styles.rowMultilineText]}
            placeholder="Write your Message here"
            autoCorrect={false}
            multiline
            numberOfLines={8}></TextInput>
        </View>
        <View style={styles.rowdivider}></View>
        <TouchableOpacity
          style={[styles.floatingButton, styles.messageButton]}
          activeOpacity={0.8}
          onPress={() => {}}>
          <Image
            style={[styles.floatingButtonImage]}
            source={require('../images/ok.png')}></Image>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 12,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    resizeMode: 'repeat',
    opacity: 0.2,
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    marginLeft: 12,
    marginRight: 12,
    marginTop: 12,
  },
  rowdivider: {
    height: 0.5,
    marginLeft: 12,
    marginRight: 12,
    backgroundColor: GlobalStyles.Color.Secondary,
    marginTop: 4,
    marginBottom: 12,
  },
  rowText: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: 4,
  },
  rowMultilineIcon: {
    alignSelf: 'baseline',
  },
  rowMultilineText: {
    minHeight: 100,
  },
  floatingButton: {
    position: 'absolute',
    width: 60,
    height: 50,
    backgroundColor: GlobalStyles.Color.Primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    elevation: 3,
  },
  floatingButtonImage: {
    resizeMode: 'contain',
    flex: 1,
    margin: 8,
    alignSelf: 'center',
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  messageButton: {
    bottom: 34,
    right: 12,
  },
});
