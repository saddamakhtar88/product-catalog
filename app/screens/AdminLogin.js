import React, {Component} from 'react';
import {Alert, StyleSheet, View, Button, TextInput} from 'react-native';
import {LoadingOverlay} from '../components/LoadingOverlay';
import {GlobalStyles} from '../Styles';
import {AuthenticationService} from '../data-service/authentication-service';

export class AdminLoginScreen extends Component {
  constructor() {
    super();

    this.state = {
      password: '',
      isLoading: false,
    };
  }

  onSubmit(password) {
    this.state = {
      isLoading: true,
    };

    authService = new AuthenticationService();
    authService
      .authenticate(password)
      .then(result => {
        this.setState(previousState => ({
          isLoading: false,
        }));
        if (result === true) {
          this.props.navigation.navigate('Home', {isFromLoginScreen: true});
          //   this.props.navigation?.goBack();
        } else {
          Alert.alert('Error', 'Incorrect password !!!');
        }
      })
      .catch(_ => {
        this.setState(previousState => ({
          isLoading: false,
        }));
        Alert.alert('Error', 'Something went wrong.');
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.box}>
          <View style={styles.row}>
            <TextInput
              style={styles.rowText}
              placeholder="Enter Password"
              autoCorrect={false}
              maxLength={16}
              onChangeText={text => {
                this.setState(_ => ({
                  password: text,
                }));
              }}
              value={this.state.password}
            />
          </View>
          <View style={styles.rowdivider}></View>
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button
                title="Cancel"
                color={GlobalStyles.Color.Primary}
                onPress={() => {
                  this.props.navigation?.goBack();
                }}
              />
            </View>
            <View style={styles.button}>
              <Button
                title="Submit"
                color={GlobalStyles.Color.Primary}
                onPress={() => {
                  this.onSubmit(this.state.password);
                }}
              />
            </View>
          </View>
        </View>
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
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
  box: {
    height: 130,
    width: '90%',
    margin: 12,
    backgroundColor: 'white',
    borderColor: GlobalStyles.Color.Secondary,
    borderRadius: 4,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 12,
  },
  button: {
    flex: 1,
    margin: 8,
  },
});
