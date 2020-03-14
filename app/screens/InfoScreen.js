import React, {Component} from 'react';
import {StyleSheet, View, TextInput} from 'react-native';

export class InfoScreen extends Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <View style={styles.screenContainer}>
        <TextInput
          autoFocus={true}
          style={{
            backgroundColor: 'white',
            height: 44,
            borderColor: 'grey',
            borderWidth: 1,
            marginTop: 8,
            marginLeft: 8,
            marginRight: 8,
            padding: 4,
            borderRadius: 4,
          }}
          placeholder="Title"
          onChangeText={text => {
            this.props.route.params.title = text;
          }}
          value={this.props.route.params.title}></TextInput>
        <TextInput
          style={{
            backgroundColor: 'white',
            height: 80,
            borderColor: 'grey',
            borderWidth: 1,
            marginTop: 8,
            marginLeft: 8,
            marginRight: 8,
            padding: 4,
            borderRadius: 4,
          }}
          placeholder="Description"
          multiline
          numberOfLines={8}
          onChangeText={text => {
            this.props.route.params.description = text;
          }}
          value={this.props.route.params.description}></TextInput>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  textBox: {
    backgroundColor: 'white',
    height: 24,
    borderColor: 'black',
    borderWidth: 1,
  },
  titleText: {
    color: 'white',
  },
  descriptionText: {},
});
