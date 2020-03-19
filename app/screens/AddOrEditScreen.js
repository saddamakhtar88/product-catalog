import React, {Component} from 'react';
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {LoadingOverlay} from '../components/LoadingOverlay';
import {CatalogDataService} from '../data-service/catalog-service';
import {ImageUploadService} from '../data-service/image-upload-service';
import {GlobalStyles} from '../Styles';
import {EnvironmentConfiguration} from '../EnvironmentConfiguration';

export class AddOrEditScreen extends Component {
  constructor(props) {
    super();

    NewItemCellId = 'add-new-item-cell';
    catalogItem = null;
    if (props.route.params == null) {
      catalogItem = {
        title: null,
        description: null,
        thumbnailUrl: null,
        images: [],
      };
    } else {
      catalogItem = JSON.parse(JSON.stringify(props.route.params));
    }

    this.insertAddImageCellItem();
    this.state = {
      catalogItem: catalogItem,
      isLoading: false,
    };
  }

  addImageInTheList(image) {
    newImage = {
      path: image.path,
      imageOnDevice: image,
    };
    catalogItem.images[catalogItem.images.length - 1] = newImage;
    this.insertAddImageCellItem();
    this.setState(previousState => ({
      catalogItem: catalogItem,
    }));
  }

  removeImageFromTheList(image, index) {
    catalogItem = this.state.catalogItem;
    catalogItem.images.splice(index, 1);
    this.setState(previousState => ({
      catalogItem: catalogItem,
    }));
  }

  insertAddImageCellItem() {
    catalogItem.images.push({id: NewItemCellId});
  }

  onSavePress() {
    if (catalogItem.images.length > 1) {
      this.setState(previousState => ({
        isLoading: true,
      }));
      catalogItemCopy = JSON.parse(JSON.stringify(catalogItem));
      catalogItemCopy.images.pop();
      catalogItemCopy.thumbnail = catalogItem.images[0].path;
      if (catalogItemCopy.id == null) {
        this.addCatalog(catalogItemCopy);
      } else {
        this.updateCatalog(catalogItemCopy);
      }
    } else {
      Alert.alert('Info', 'Please add at least one image !!!');
    }
  }

  onDeletePress() {
    this.deleteCatalog(catalogItem.id);
  }

  addCatalog(catalog) {
    this.uploadImages(catalog.images)
      .then(success => {
        catalog.thumbnail = catalog.images[0].path;
        dataService = new CatalogDataService();
        dataService
          .addCatalog(catalog)
          .then(_ => {
            this.props.navigation?.goBack();
          })
          .catch(error => {
            this.setState(previousState => ({
              isLoading: false,
            }));
            this.showGenericErrorMessage();
          });
      })
      .catch(error => {
        this.setState(previousState => ({
          isLoading: false,
        }));
        this.showGenericErrorMessage();
      });
  }

  updateCatalog(catalog) {
    imagesToUpload = catalog.images.filter(image => {
      return image.imageOnDevice;
    });

    if (imagesToUpload) {
      this.uploadImages(imagesToUpload)
        .then(success => {
          catalog.thumbnail = catalog.images[0].path;
          dataService = new CatalogDataService();
          dataService
            .updateCatalog(catalog)
            .then(_ => {
              this.props.navigation?.goBack();
            })
            .catch(error => {
              this.setState(previousState => ({
                isLoading: false,
              }));
              this.showGenericErrorMessage();
            });
        })
        .catch(error => {
          this.setState(previousState => ({
            isLoading: false,
          }));
          this.showGenericErrorMessage();
        });
    } else {
      dataService = new CatalogDataService();
      dataService
        .updateCatalog(catalog)
        .then(_ => {
          this.props.navigation?.goBack();
        })
        .catch(error => {
          this.setState(previousState => ({
            isLoading: false,
          }));
          this.showGenericErrorMessage();
        });
    }
  }

  deleteCatalog(catalogId) {
    this.setState(previousState => ({
      isLoading: true,
    }));
    dataService = new CatalogDataService();
    dataService
      .deleteCatalog(catalogId)
      .then(_ => {
        this.props.navigation?.goBack();
      })
      .catch(error => {
        this.showGenericErrorMessage();
      });
  }

  uploadImages(images) {
    imageUploadService = new ImageUploadService();
    return Promise.all(
      images.map(image => {
        return imageUploadService
          .uploadImage(image.imageOnDevice)
          .then(fileName => {
            image.path = fileName;
            delete image.imageOnDevice;
          });
      }),
    );
  }

  showGenericErrorMessage() {
    Alert.alert('Error', 'Something went wrong.');
  }

  render() {
    return (
      <View style={styles.screenContainer}>
        <Image
          style={styles.backgroundImage}
          source={require('../images/background.jpg')}></Image>
        <FlatList
          style={styles.list}
          numColumns={2}
          data={this.state.catalogItem.images}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => {
            if (item.id != NewItemCellId) {
              return (
                <View style={styles.listItem}>
                  <View style={styles.listItemOutline}>
                    <Image
                      style={styles.addedImage}
                      source={{
                        uri: item.imageOnDevice
                          ? item.path
                          : EnvironmentConfiguration.Catalog_Image_Path +
                            item.path,
                      }}></Image>
                    <TouchableOpacity
                      style={styles.deleteCta}
                      activeOpacity={0.2}
                      onPress={() => {
                        this.removeImageFromTheList(item, index);
                      }}>
                      <Image
                        style={styles.deleteCtaImage}
                        source={require('../images/delete_white.png')}></Image>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }
            return (
              <View style={styles.listItem}>
                <View style={styles.listItemOutline}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                    }}>
                    <TouchableOpacity
                      activeOpacity={0.2}
                      onPress={() => {
                        ImagePicker.openCamera({
                          width: 300,
                          height: 400,
                          cropping: true,
                        }).then(image => {
                          this.addImageInTheList(image);
                        });
                      }}>
                      <Image
                        style={[styles.cameraCTA]}
                        source={require('../images/camera.png')}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity
                      activeOpacity={0.2}
                      onPress={() => {
                        ImagePicker.openPicker({
                          width: 300,
                          height: 400,
                          cropping: true,
                        }).then(image => {
                          this.addImageInTheList(image);
                        });
                      }}>
                      <Image
                        style={[styles.cameraCTA]}
                        source={require('../images/gallery.png')}></Image>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.divider}></View>
                  <Text
                    style={{
                      alignSelf: 'center',
                      fontSize: 18,
                      color: 'white',
                      fontWeight: 'bold',
                    }}>
                    Choose to Add
                  </Text>
                  <View style={styles.divider}></View>
                </View>
              </View>
            );
          }}></FlatList>
        <TouchableOpacity
          style={[styles.floatingButton, styles.infoButton]}
          activeOpacity={0.8}
          onPress={() => {
            this.props.navigation?.navigate('Info', catalogItem);
          }}>
          <Image
            style={[styles.floatingButtonImage]}
            source={require('../images/info.png')}></Image>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.floatingButton, styles.saveButton]}
          activeOpacity={0.8}
          onPress={() => {
            this.onSavePress();
          }}>
          <Image
            style={[styles.floatingButtonImage]}
            source={require('../images/ok.png')}></Image>
        </TouchableOpacity>
        {this.props.route.params != null ? (
          <TouchableOpacity
            style={[styles.floatingButton, styles.deleteButton]}
            activeOpacity={0.6}
            onPress={() => {
              this.onDeletePress();
            }}>
            <Image
              style={[styles.floatingButtonImage]}
              source={require('../images/delete_white.png')}></Image>
          </TouchableOpacity>
        ) : null}
        {this.state.isLoading == true ? (
          <LoadingOverlay></LoadingOverlay>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screenContainer: {
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
  list: {
    alignSelf: 'stretch',
  },
  listItem: {
    flex: 1,
    flexGrow: 0.5,
    aspectRatio: 1,
  },
  listItemOutline: {
    flex: 1,
    justifyContent: 'space-evenly',
    margin: 4,
    backgroundColor: GlobalStyles.Color.Secondary,
    borderWidth: 1.0,
    borderStyle: 'dashed',
    borderColor: 'white',
    borderRadius: 8,
  },
  addedImage: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: 8,
  },
  deleteCta: {
    position: 'absolute',
    height: 24,
    width: 24,
    margin: 4,
    top: 0,
    right: 0,
    backgroundColor: 'red',
    justifyContent: 'center',
    borderRadius: 4,
    borderWidth: 0.5,
    borderStyle: 'dashed',
    borderColor: 'white',
  },
  deleteCtaImage: {
    height: 20,
    width: 20,
    alignSelf: 'center',
  },
  cameraCTA: {
    resizeMode: 'contain',
    width: 60,
    height: 60,
    alignSelf: 'center',
    borderWidth: 2.0,
    borderColor: 'white',
    borderRadius: 8,
  },
  divider: {
    height: 1,
    marginLeft: 8,
    marginRight: 8,
    backgroundColor: 'white',
  },
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
  saveButton: {
    bottom: 34,
    right: 12,
  },
  infoButton: {
    bottom: 50 + 34 + 18,
    right: 12,
    backgroundColor: 'white',
    borderColor: GlobalStyles.Color.Primary,
    borderWidth: 2,
  },
  deleteButton: {
    bottom: 34,
    left: 12,
    backgroundColor: 'red',
  },
});
