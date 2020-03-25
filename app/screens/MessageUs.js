import React, {Component} from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {GlobalStyles} from '../Styles';
import {LoadingOverlay} from '../components/LoadingOverlay';
import {MessageService} from '../data-service/message-service';

export class MessageUsScreen extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      messageText: '',
      emailID: '',
      phoneNumber: '',
      isLoading: false,
    };
  }

  sendMessage(message) {
    if (!message.phoneNumber && !message.emailID) {
      Alert.alert('Error', 'Please enter your phone no. or email.');
      return;
    } else if (!message.messageText) {
      Alert.alert('Error', 'Please enter a message.');
      return;
    }

    this.setState(previousState => ({
      isLoading: true,
    }));
    dataService = new MessageService();
    dataService
      .addMessage(message)
      .then(_ => {
        Alert.alert('Message Sent', 'Somebody will shortly contact you !!!', [
          {text: 'OK', onPress: () => this.props.navigation?.goBack()},
        ]);
      })
      .catch(error => {
        this.setState(previousState => ({
          isLoading: false,
        }));
        this.showGenericErrorMessage();
      });
  }

  showGenericErrorMessage() {
    Alert.alert('Error', 'Something went wrong.');
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.row}>
            <TextInput
              style={styles.rowText}
              placeholder="Name"
              autoCorrect={false}
              onChangeText={text => {
                this.setState(_ => ({
                  name: text,
                }));
              }}
              value={this.state.name}
            />
          </View>
          <View style={styles.rowdivider}></View>
          <View style={styles.row}>
            <TextInput
              style={styles.rowText}
              placeholder="Email"
              autoCorrect={false}
              onChangeText={text => {
                this.setState(_ => ({
                  emailID: text,
                }));
              }}
              value={this.state.emailID}
            />
          </View>
          <View style={styles.rowdivider}></View>
          <View style={styles.row}>
            <TextInput
              style={styles.rowText}
              placeholder="Phone No."
              autoCorrect={false}
              onChangeText={text => {
                this.setState(_ => ({
                  phoneNumber: text,
                }));
              }}
              value={this.state.phoneNumber}
            />
          </View>
          <View style={styles.rowdivider}></View>
          <View style={styles.row}>
            <TextInput
              style={[styles.rowText, styles.rowMultilineText]}
              placeholder="Write your Message here"
              autoCorrect={false}
              multiline
              onChangeText={text => {
                this.setState(_ => ({
                  messageText: text,
                }));
              }}
              value={this.state.messageText}
            />
          </View>
          <View style={styles.rowdivider}></View>
        </ScrollView>
        <TouchableOpacity
          style={[styles.floatingButton, styles.messageButton]}
          activeOpacity={0.8}
          onPress={() => {
            message = {
              name: this.state.name,
              messageText: this.state.messageText,
              emailID: this.state.emailID,
              phoneNumber: this.state.phoneNumber,
            };
            this.sendMessage(message);
          }}>
          <Image
            style={[styles.floatingButtonImage]}
            source={require('../images/ok.png')}></Image>
        </TouchableOpacity>
        {this.state.isLoading == true ? (
          <LoadingOverlay></LoadingOverlay>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 12,
  },
  scrollView: {},
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
    color: GlobalStyles.Color.Text,
    borderRadius: 4,
  },
  rowMultilineIcon: {
    alignSelf: 'baseline',
  },
  rowMultilineText: {
    // minHeight: 100,
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
