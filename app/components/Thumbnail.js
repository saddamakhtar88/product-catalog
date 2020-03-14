import React, {Component} from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export function Thumbnail({
  style,
  imageUri,
  label,
  onPress,
  showEditIcon,
  onEditPress,
  onInfoPress,
}) {
  navigation = useNavigation();

  return (
    <View style={[style, styles.container]}>
      <View style={styles.containerBoundary}>
        <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
          <Image style={styles.image} source={imageUri}></Image>
        </TouchableOpacity>

        {showEditIcon ? (
          <TouchableOpacity
            style={styles.editCta}
            activeOpacity={0.8}
            onPress={onEditPress}>
            <Image
              style={styles.editCta}
              source={require('../images/edit.png')}></Image>
          </TouchableOpacity>
        ) : null}
        <TouchableOpacity
          style={styles.bottomBar}
          activeOpacity={0.8}
          onPress={onInfoPress}>
          <Image
            style={styles.cta}
            source={require('../images/info.png')}></Image>
          <Text style={styles.label}>{label}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
  },
  containerBoundary: {
    alignItems: 'center',
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    borderRadius: 8,
    borderColor: 'grey',
    borderWidth: 0.5,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
  bottomBar: {
    flexDirection: 'row-reverse',
    padding: 4,
    backgroundColor: 'white',
    width: '100%',
    height: 34,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
  },
  label: {
    fontSize: 18,
    color: 'black',
    flexGrow: 1,
    lineHeight: 25,
  },
  cta: {
    resizeMode: 'contain',
    height: '100%',
    width: 22,
    marginLeft: 8,
  },
  editCta: {
    position: 'absolute',
    height: 20,
    width: 20,
    margin: 4,
    top: 0,
    right: 0,
  },
});
