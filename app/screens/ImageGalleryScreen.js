import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
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
      <SafeAreaView style={styles.container}>
        <ImageView
          images={data}
          imageIndex={0}
          visible={true}
          onRequestClose={() => this.props.navigation?.goBack()}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'flex-end',
  },
  closeButton: {
    width: 64,
    height: 64,
  },
});
