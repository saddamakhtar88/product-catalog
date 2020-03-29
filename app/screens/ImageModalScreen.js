import React, {Component} from 'react';
import {
  Alert,
  View,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  StatusBar,
  Share,
} from 'react-native';
import {EnvironmentConfiguration} from '../EnvironmentConfiguration';
import ImageZoom from 'react-native-image-pan-zoom';
import FastImage from 'react-native-fast-image';
import {TouchableOpacity} from 'react-native-gesture-handler';

export class ImageModalScreen extends Component {
  constructor(props) {
    super();
    currentPageIndex = 0;
    data = [];
    imageItems = props.route.params;
    imageItems.forEach(function(item, index) {
      data.push({
        uri: EnvironmentConfiguration.Catalog_Image_Path + item.path,
      });
    });
  }

  onScrollEnd(scrollEvent) {
    if (scrollEvent.nativeEvent.contentOffset.x == 0) {
      this.onPageChange(0);
    } else {
      pageIndex =
        scrollEvent.nativeEvent.layoutMeasurement.width /
        scrollEvent.nativeEvent.contentOffset.x;
      this.onPageChange(pageIndex);
    }
  }

  onPageChange(index) {
    currentPageIndex = index;
  }

  onShare = async content => {
    console.log(content);
    try {
      const result = await Share.share({
        message: content,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong.');
    }
  };

  render() {
    return (
      <View style={Styles.modal}>
        <StatusBar hidden></StatusBar>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          data={data}
          keyExtractor={item => item.uri}
          renderItem={({item}) => (
            <ImageZoom
              cropWidth={Dimensions.get('window').width}
              cropHeight={Dimensions.get('window').height}
              imageWidth={Dimensions.get('window').width}
              imageHeight={Dimensions.get('window').height}>
              <FastImage style={Styles.image} source={item} />
            </ImageZoom>
          )}
          onMomentumScrollEnd={scrollevent => {
            this.onScrollEnd(scrollevent);
          }}></FlatList>
        <View style={Styles.shareButtonContainer}>
          <TouchableOpacity
            style={Styles.shareButton}
            onPress={() => {
              this.onShare(data[currentPageIndex].uri);
            }}
            activeOpacity={0.8}>
            <Image
              style={Styles.shareButtonImage}
              source={require('../images/share.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  modal: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: 'black',
  },
  image: {
    flex: 1,
    resizeMode: 'center',
  },
  shareButtonContainer: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
  },
  shareButton: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  shareButtonImage: {
    alignSelf: 'center',
    width: '50%',
    height: '50%',
    resizeMode: 'contain',
  },
});
