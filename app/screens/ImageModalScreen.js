import React, {Component} from 'react';
import {
  View,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  StatusBar,
  Text,
} from 'react-native';
import {EnvironmentConfiguration} from '../EnvironmentConfiguration';
import ImageZoom from 'react-native-image-pan-zoom';
import FastImage from 'react-native-fast-image';
import {TouchableOpacity} from 'react-native-gesture-handler';

export class ImageModalScreen extends Component {
  constructor(props) {
    super();
    data = [];
    imageItems = props.route.params;
    imageItems.forEach(function(item, index) {
      data.push({
        uri: EnvironmentConfiguration.Catalog_Image_Path + item.path,
      });
    });
  }

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
          )}></FlatList>
        <View style={Styles.closeButtonContainer}>
          <TouchableOpacity
            style={Styles.closeButton}
            onPress={() => {
              this.props.navigation?.goBack();
            }}
            activeOpacity={0.8}>
            <Text style={Styles.closeButtonLabel}>X</Text>
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
  closeButtonContainer: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignContent: 'center',
  },
  closeButton: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  closeButtonLabel: {
    alignSelf: 'center',
    color: 'white',
    fontSize: 18,
  },
});
