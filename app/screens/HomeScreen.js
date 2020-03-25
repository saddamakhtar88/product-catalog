import React, {Component} from 'react';
import {
  Alert,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  StatusBar,
} from 'react-native';
import {Thumbnail} from '../components/Thumbnail';
import {CatalogDataService} from '../data-service/catalog-service';
import {AuthenticationService} from '../data-service/authentication-service';
import {GlobalStyles} from '../Styles';
import {EnvironmentConfiguration} from '../EnvironmentConfiguration';
import {LoadingOverlay} from '../components/LoadingOverlay';

export class HomeScreen extends Component {
  constructor() {
    super();

    focusSubscription = null;

    this.state = {
      isEditModeEnabled: false,
      catalogList: [],
      isLoading: false,
      isRefreshing: false,
    };
  }

  loadData() {
    dataService = new CatalogDataService();
    dataService
      .getCatalogs()
      .then(catalogs => {
        this.setState(previousState => ({
          catalogList: catalogs,
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
    focusSubscription = this.props.navigation?.addListener('focus', () => {
      if (this.props.route.params?.isFromLoginScreen === true) {
        delete this.props.route.params.isFromLoginScreen;
        this.enableAdminMode(true);
      }
      this.loadData();
    });
  }

  componentWillUnmount() {
    focusSubscription?.remove();
  }

  scrollViewHasReachedEnd(scrollEvent) {
    if (!scrollEvent.nativeEvent) {
      return false;
    }
    return (
      scrollEvent.nativeEvent.layoutMeasurement.width +
        scrollEvent.nativeEvent.contentOffset.x >=
      scrollEvent.nativeEvent.contentSize.width
    );
  }

  enableAdminMode(flag) {
    if (flag === true) {
      authService = new AuthenticationService();
      authService.isAdminUser().then(result => {
        this.setState(previousState => ({
          isEditModeEnabled: result,
        }));
      });
    } else {
      this.setState(previousState => ({
        isEditModeEnabled: false,
      }));
    }
  }

  showGenericErrorMessage() {
    Alert.alert('Error', 'Something went wrong.');
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={GlobalStyles.Color.Primary}
        />
        <Image
          style={styles.backgroundImage}
          source={require('../images/background.jpg')}></Image>
        <FlatList
          numColumns={2}
          data={this.state.catalogList}
          keyExtractor={item => item.id}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this.onRefresh.bind(this)}
            />
          }
          renderItem={({item}) => (
            <Thumbnail
              style={styles.thumbnail}
              imageUri={
                EnvironmentConfiguration.Catalog_Image_Path + item.thumbnail
              }
              label={item.title}
              showEditIcon={this.state.isEditModeEnabled}
              onPress={() => {
                this.props.navigation?.navigate('ImageGallery', item.images);
              }}
              onBottomPress={() => {
                if (this.state.isEditModeEnabled) {
                  this.props.navigation?.navigate('AddOrEdit', item);
                } else {
                  this.props.navigation?.navigate('Info', {
                    ...item,
                    isAdminUser: false,
                  });
                }
              }}></Thumbnail>
          )}></FlatList>
        {this.state.isEditModeEnabled ? (
          <View style={[styles.floatingButton, styles.shadow]}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation?.navigate('AddOrEdit');
              }}>
              <Text style={styles.floatingButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        ) : null}
        <View style={styles.footer}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}></Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            bounces={false}
            pagingEnabled
            style={styles.footerScroll}
            contentContainerStyle={styles.footerScrollContent}
            onMomentumScrollEnd={scrollevent => {
              hasReachedEnd = this.scrollViewHasReachedEnd(scrollevent);
              this.enableAdminMode(hasReachedEnd);
            }}
            onScrollEndDrag={scrollevent => {
              hasReachedEnd = this.scrollViewHasReachedEnd(scrollevent);
              this.enableAdminMode(hasReachedEnd);
            }}>
            <View style={styles.scrollInset}></View>
            <TouchableOpacity
              style={[styles.cta, styles.shadow]}
              activeOpacity={0.8}
              onPress={() => {
                this.props.navigation?.navigate('ContactUs', {
                  isAdminUser: this.state.isEditModeEnabled,
                });
              }}>
              <Image
                style={[styles.contactCTA]}
                source={require('../images/contact-us.png')}></Image>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.cta, styles.shadow]}
              activeOpacity={0.8}
              onPress={() => {
                if (this.state.isEditModeEnabled === false) {
                  this.props.navigation?.navigate('Login');
                }
              }}>
              <Image
                style={[styles.editCTA]}
                source={require('../images/edit_white.png')}></Image>
            </TouchableOpacity>
          </ScrollView>
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
  thumbnail: {
    flex: 1,
    flexGrow: 0.5,
    padding: 4,
  },
  footer: {
    width: '100%',
    height: 60,
    position: 'absolute',
    bottom: 24,
    right: 0,
    // borderColor: 'black',
    // borderWidth: 0.5,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    alignItems: 'flex-end',
  },
  footerScroll: {
    overflow: 'visible',
    width: 132,
  },
  footerScrollContent: {},
  scrollInset: {
    width: 60,
    height: '100%',
  },
  cta: {
    marginRight: 12,
    justifyContent: 'center',
    width: 60,
    height: 50,
    borderRadius: 8,
    borderColor: 'white',
    borderWidth: 1,
    backgroundColor: GlobalStyles.Color.Primary,
  },
  contactCTA: {
    width: 60,
    height: 50,
    resizeMode: 'contain',
  },
  editCTA: {
    alignSelf: 'center',
    height: 34,
    resizeMode: 'contain',
  },
  logoContainer: {
    paddingLeft: 12,
    height: '100%',
    position: 'absolute',
    left: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  logoText: {
    fontSize: 24,
    fontFamily: 'Verdana',
  },
  floatingButton: {
    position: 'absolute',
    width: 60,
    height: 50,
    bottom: 100,
    right: 12,
    backgroundColor: GlobalStyles.Color.Primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    elevation: 3,
  },
  floatingButtonText: {
    fontSize: 42,
    color: 'white',
    textAlign: 'center',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
  },
});
