import React, {Component} from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {GlobalStyles} from '../Styles';
import {ContactService} from '../data-service/contact-service';
import {LoadingOverlay} from '../components/LoadingOverlay';

export class ContactUsScreen extends Component {
  constructor() {
    super();

    this.state = {
      contact: {
        phoneNumber: '',
        emailID: '',
        additionalInfo: '',
      },
      isLoading: false,
    };
  }

  componentDidMount() {
    this.setState(previousState => ({
      isLoading: true,
    }));
    this.loadData();
  }

  loadData() {
    dataService = new ContactService();
    dataService
      .getContact()
      .then(contact => {
        if (!contact) {
          contact = this.state.contact;
        }
        this.setState(previousState => ({
          contact: contact,
          isLoading: false,
        }));
      })
      .catch(error => {
        this.setState(previousState => ({
          isLoading: false,
          isRefreshing: false,
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
        {/* <Image
          style={styles.backgroundImage}
          source={require('../images/background.jpg')}
        /> */}
        <View style={styles.row}>
          <Image
            style={styles.rowIcon}
            source={require('../images/phone.png')}
          />
          <TextInput
            style={styles.rowText}
            placeholder="Phone No."
            autoCorrect={false}
            editable={false} //{this.props.route.params.isAdminUser}
            value={this.state.contact.phoneNumber}
          />
        </View>
        <View style={styles.rowdivider}></View>
        <View style={styles.row}>
          <Image
            style={styles.rowIcon}
            source={require('../images/email.png')}></Image>
          <TextInput
            style={styles.rowText}
            placeholder="Email Address"
            autoCorrect={false}
            editable={false} //{this.props.route.params.isAdminUser}
            value={this.state.contact.emailID}
          />
        </View>
        <View style={styles.rowdivider}></View>
        <View style={styles.row}>
          <Image style={[styles.rowIcon, styles.rowMultilineIcon]}></Image>
          <TextInput
            style={[styles.rowText, styles.rowMultilineText]}
            placeholder="Additional Information"
            autoCorrect={false}
            multiline
            editable={false} //{this.props.route.params.isAdminUser}
            value={this.state.contact.additionalInfo}
          />
        </View>
        <View style={styles.rowdivider}></View>
        <TouchableOpacity
          style={[styles.floatingButton, styles.messageButton]}
          activeOpacity={0.8}
          onPress={() => {
            if (this.props.route.params.isAdminUser) {
              this.props.navigation?.navigate('Messages');
            } else {
              this.props.navigation?.navigate('MessageUs');
            }
          }}>
          <Image
            style={[styles.floatingButtonImage]}
            source={require('../images/send_message.png')}></Image>
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
    marginTop: 12,
  },
  rowdivider: {
    height: 1,
    marginLeft: 12,
    marginRight: 12,
    backgroundColor: 'rgba(0,0,0,0.2)',
    marginTop: 12,
    // marginBottom: 12,
  },
  rowIcon: {
    height: 28,
    width: 44,
    marginRight: 8,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  rowText: {
    flex: 1,
    marginRight: 8,
    fontSize: 18,
    fontWeight: 'bold',
    borderRadius: 4,
    color: 'black',
    // backgroundColor: 'red',
  },
  rowMultilineIcon: {
    alignSelf: 'baseline',
  },
  rowMultilineText: {},
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
