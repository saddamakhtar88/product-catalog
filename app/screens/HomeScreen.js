import React, {Component} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  StatusBar,
} from 'react-native';
import {Thumbnail} from '../components/Thumbnail';
import {CatalogDataService} from '../data-service/catalog-service';
import {GlobalStyles} from '../Styles';

export class HomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      isEditModeEnabled: false,
      catalogList: [],
    };
  }

  loadData() {
    dataService = new CatalogDataService();
    dataService
      .getCatalogs()
      .then(catalogs => {
        this.setState(previousState => ({
          catalogList: catalogs,
        }));
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.loadData();
    const unsubscribe = this.props.navigation?.addListener('focus', () => {
      {
        this.loadData();
      }
    });
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
          renderItem={({item}) => (
            <Thumbnail
              style={styles.thumbnail}
              imageUri={{uri: item.thumbnail}}
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
                    isEditable: false,
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
              this.setState(previousState => ({
                isEditModeEnabled: hasReachedEnd,
              }));
            }}
            onScrollEndDrag={scrollevent => {
              hasReachedEnd = this.scrollViewHasReachedEnd(scrollevent);
              this.setState(previousState => ({
                isEditModeEnabled: hasReachedEnd,
              }));
            }}>
            <View style={styles.scrollInset}></View>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                // this.props.navigation?.navigate('ImageGallery', item.images);
              }}>
              <Image
                style={[styles.cta, styles.contactCTA, styles.shadow]}
                source={require('../images/contact-us.png')}></Image>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                // this.props.navigation?.navigate('ImageGallery', item.images);
              }}>
              <Image
                style={[styles.cta, styles.editCTA, styles.shadow]}
                source={require('../images/edit.png')}></Image>
            </TouchableOpacity>
          </ScrollView>
        </View>
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
    padding: 4,
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 60,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 8,
    borderColor: GlobalStyles.Color.Primary,
    borderWidth: 2,
  },
  contactCTA: {},
  editCTA: {},
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
