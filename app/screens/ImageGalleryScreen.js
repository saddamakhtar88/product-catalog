import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import ImageView from 'react-native-image-viewing';
import {EnvironmentConfiguration} from '../EnvironmentConfiguration';

export class ImageGalleryScreen extends Component {
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
      <ImageView
        images={data}
        imageIndex={0}
        visible={true}
        presentationStyle="overFullScreen"
        onRequestClose={() => this.props.navigation?.goBack()}
      />
    );
  }
}
