import React, {Component} from 'react';
import {
  Alert,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {CatalogDataService} from '../data-service/catalog-service';
import {GlobalStyles} from '../Styles';
import {LoadingOverlay} from '../components/LoadingOverlay';
import {MessageService} from '../data-service/message-service';

export class MessagesScreen extends Component {
  constructor() {
    super();

    focusSubscription = null;

    this.state = {
      messageList: [],
      isLoading: false,
      isRefreshing: false,
    };
  }

  loadData() {
    dataService = new MessageService();
    dataService
      .getMessages()
      .then(messages => {
        this.setState(previousState => ({
          messageList: messages,
          isLoading: false,
          isRefreshing: false,
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

  onRefresh() {
    this.setState(_ => ({
      isRefreshing: true,
    }));
    this.loadData();
  }

  componentDidMount() {
    this.setState(previousState => ({
      isLoading: true,
    }));
    this.loadData();
  }

  componentWillUnmount() {}

  showGenericErrorMessage() {
    Alert.alert('Error', 'Something went wrong.');
  }

  getFormattedDataStr(dataTimeStr) {
    date = new Date(dataTimeStr);
    return (
      date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.messageList}
          keyExtractor={item => item.id}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this.onRefresh.bind(this)}
            />
          }
          renderItem={({item}) => (
            <View style={styles.messageItem}>
              <Text style={styles.messageFrom}>{item.name}</Text>
              {item.emailID ? (
                <Text style={styles.messageContact}>{item.emailID}</Text>
              ) : null}
              {item.phoneNumber ? (
                <Text style={styles.messageContact}>{item.phoneNumber}</Text>
              ) : null}
              <Text style={styles.message}>{item.messageText}</Text>
              <Text style={styles.messagePostedOn}>
                {this.getFormattedDataStr(item.postedDate)}
              </Text>
            </View>
          )}></FlatList>
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
  },
  messageItem: {
    flex: 1,
    // backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderWidth: 0.5,
    borderColor: 'rgba(0,0,0,0.2)',
    padding: 8,
  },
  messageFrom: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: GlobalStyles.Color.Text,
  },
  messageContact: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color: GlobalStyles.Color.Text,
  },
  message: {
    fontSize: 18,
    marginBottom: 4,
    marginTop: 8,
    color: GlobalStyles.Color.Text,
  },
  messagePostedOn: {
    fontSize: 16,
    alignSelf: 'flex-end',
    marginTop: 16,
    color: GlobalStyles.Color.Text,
  },
});
