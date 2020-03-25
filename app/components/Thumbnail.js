import React, {Component} from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {GlobalStyles} from '../Styles';
import FastImage from 'react-native-fast-image';

export function Thumbnail({
  style,
  imageUri,
  label,
  onPress,
  showEditIcon,
  onBottomPress,
}) {
  navigation = useNavigation();

  return (
    <View style={[style, styles.container]}>
      <View style={styles.containerBoundary}>
        <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
          <FastImage
            style={styles.image}
            source={{uri: imageUri, priority: FastImage.priority.normal}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomBar}
          activeOpacity={0.8}
          onPress={onBottomPress}>
          {showEditIcon ? (
            <Image
              style={styles.editCtaImage}
              source={require('../images/edit.png')}></Image>
          ) : (
            <Image
              style={styles.cta}
              source={require('../images/info.png')}></Image>
          )}
          <Text style={styles.label}>{label}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  containerBoundary: {
    alignItems: 'center',
    borderRadius: 8,
    borderColor: 'rgba(0,0,0,0.2)',
    borderWidth: 1,
    backgroundColor: 'white',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: GlobalStyles.Color.Secondary,
  },
  bottomBar: {
    flexDirection: 'row-reverse',
    padding: 4,
    width: '100%',
    height: 30,
  },
  label: {
    fontSize: 14,
    color: 'grey',
    flexGrow: 1,
    lineHeight: 22,
  },
  cta: {
    resizeMode: 'contain',
    height: '100%',
    width: 22,
    marginLeft: 8,
  },
  editCtaImage: {
    height: 20,
    width: 20,
    alignSelf: 'center',
  },
});
