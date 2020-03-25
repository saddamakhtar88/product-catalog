import React, {Component} from 'react';
import {ScrollView, StyleSheet, View, TextInput} from 'react-native';
import {GlobalStyles} from '../Styles';

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
        <ScrollView style={styles.scrollView}>
          <View style={styles.row}>
            <TextInput
              style={styles.rowText}
              placeholder="Title"
              autoCorrect={false}
              maxLength={16}
              editable={this.props.route.params.isAdminUser}
              onChangeText={text => {
                this.props.route.params.title = text;
                this.setState(_ => ({
                  title: text,
                }));
              }}
              value={this.state.title}
            />
          </View>
          <View style={styles.rowdivider}></View>
          <View style={styles.row}>
            <TextInput
              style={[styles.rowText, styles.rowMultilineText]}
              placeholder="Description"
              autoCorrect={false}
              multiline
              editable={this.props.route.params.isAdminUser}
              onChangeText={text => {
                this.props.route.params.description = text;
                this.setState(_ => ({
                  description: text,
                }));
              }}
              value={this.state.description}
            />
          </View>
          <View style={styles.rowdivider}></View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    width: '100%',
    marginLeft: 12,
    marginRight: 12,
    marginTop: 12,
  },
  rowdivider: {
    height: 1,
    marginLeft: 12,
    marginRight: 12,
    backgroundColor: 'rgba(0,0,0,0.4)',
    marginBottom: 12,
  },
  rowText: {
    flex: 1,
    fontSize: 18,
    borderRadius: 4,
    color: GlobalStyles.Color.Text,
  },
  rowMultilineIcon: {
    alignSelf: 'baseline',
  },
  rowMultilineText: {
    // minHeight: 100,
  },
});
