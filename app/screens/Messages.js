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
import {Thumbnail} from '../components/Thumbnail';
import {CatalogDataService} from '../data-service/catalog-service';
import {GlobalStyles} from '../Styles';
import {EnvironmentConfiguration} from '../EnvironmentConfiguration';
import {LoadingOverlay} from '../components/LoadingOverlay';

export class MessagesScreen extends Component {
  constructor() {
    super();

    focusSubscription = null;

    this.state = {
      messageList: [1, 2, 4],
      isLoading: false,
      isRefreshing: false,
    };
  }

  loadData() {
    dataService = new CatalogDataService();
    dataService
      .getCatalogs()
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

  render() {
    return (
      <View style={styles.container}>
        <Image
          style={styles.backgroundImage}
          source={require('../images/background.jpg')}></Image>
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
              <Text style={styles.messageFrom}>From</Text>
              <Text style={styles.messageContact}>Contact</Text>
              <Text style={styles.message}>
                Message Text Message Text Message Text Message Text Message Text
              </Text>
            </View>
          )}></FlatList>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  messageItem: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderWidth: 0.5,
    borderColor: GlobalStyles.Color.Secondary,
    // borderRadius: 8,
    padding: 8,
  },
  messageFrom: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  messageContact: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  message: {
    fontSize: 18,
    marginBottom: 4,
  },
});
