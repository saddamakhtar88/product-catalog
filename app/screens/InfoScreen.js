import React, {Component} from 'react';
import {StyleSheet, View, TextInput} from 'react-native';

export class InfoScreen extends Component {
  constructor(props) {
    super();

    this.state = {
      title: props.route.params.title,
      description: props.route.params.description,
    };
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
          editable={this.props.route.params.isEditable}
          placeholder="Title"
          autoCorrect={false}
          maxLength={16}
          onChangeText={text => {
            this.props.route.params.title = text;
            this.setState(_ => ({
              title: text,
            }));
          }}
          value={this.state.title}></TextInput>
        <TextInput
          style={{
            backgroundColor: 'white',
            minHeight: 100,
            borderColor: 'grey',
            borderWidth: 1,
            marginTop: 8,
            marginLeft: 8,
            marginRight: 8,
            padding: 4,
            borderRadius: 4,
          }}
          editable={this.props.route.params.isEditable}
          placeholder="Description"
          autoCorrect={false}
          multiline
          numberOfLines={8}
          onChangeText={text => {
            this.props.route.params.description = text;
            this.setState(_ => ({
              description: text,
            }));
          }}
          value={this.state.description}></TextInput>
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
