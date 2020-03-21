import AsyncStorage from '@react-native-community/async-storage';
import {Cache} from 'react-native-cache';

export const DataCache = new Cache({
  namespace: 'ProductCatalog',
  policy: {
    maxEntries: 500,
  },
  backend: AsyncStorage,
});
