import AsyncStorage from '@react-native-async-storage/async-storage';

class AuthStorage {
  constructor(namespace = 'auth') {
    this.namespace = namespace;
  }

  async getAccessToken() {
    const key = `${this.namespace}:accessToken`;
    return await AsyncStorage.getItem(key);
  }

  async setAccessToken(accessToken) {
    const key = `${this.namespace}:accessToken`;
    await AsyncStorage.setItem(key, accessToken);
  }

  async removeAccessToken() {
    const key = `${this.namespace}:accessToken`;
    await AsyncStorage.removeItem(key);
  }
}

export default AuthStorage;
