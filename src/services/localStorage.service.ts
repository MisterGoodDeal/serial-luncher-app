/* eslint-disable no-console */
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GGLog } from "../utils/functions";

const store = async (key: string, value: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.warn("CacheService: Failed to put pair " + `[${key}, ${value}]`);
    __DEV__ && console.log(e);
  }
};

const get = async (key: string): Promise<string> => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (e) {
    console.warn("CacheService: Failed to get " + key);
    __DEV__ && console.log(e);
  }
  return "";
};

const clear = async (): Promise<string> => {
  try {
    GGLog("Clearing...");
    await AsyncStorage.clear();
  } catch (error) {
    console.warn("CacheService: Failed to clear");
    __DEV__ && console.log(error);
  }
  return "";
};

const removeItem = async (key: string): Promise<boolean> => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (exception) {
    return false;
  }
};

export const localStorage = {
  store,
  get,
  clear,
  removeItem,
};
