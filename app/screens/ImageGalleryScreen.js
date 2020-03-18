import React, {Component} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  View,
  Dimensions,
  Button,
  Text,
} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import Gallery from 'react-native-photo-gallery';

export class ImageGalleryScreen extends Component {
  constructor(props) {
    super();
    data = [];
    imageItems = props.route.params;
    imageItems.forEach(function(item, index) {
      data.push({
        id: item.id,
        image: {uri: item.path},
        thumb: {uri: item.path},
      });
    });
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Button
          style={styles.closeButton}
          color="white"
          title="X"
          onPress={() => this.props.navigation?.goBack()}
        />
        <Gallery data={data} />
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
