import AsyncStorage from "@react-native-community/async-storage";

const STORAGE_KEY = 'visitor';

export const fetchData = async () => {
  try {
    let existingData = await AsyncStorage.getItem(STORAGE_KEY);
    if (existingData === null) {
      return [];
    }

    return parseExistingData(existingData);
  } catch (err) {
    console.log('Error Fetching Visitor Data', err);
  }
};

const parseExistingData = (data) => {
  // JSON.parse(data).map((item) => {
  //   item.createdAt = new Date(item.createdAt);
  //   return data;
  // });
  return JSON.parse(data);
}
export const mergeData = (existingData, data) => {
  // existingData = parseExistingData(existingData);

  // const eData = {
  //   key: data.date,
  //   date: data.date,
  //   name: data.name,
  //   id: data.id,
  //   person: data.person,
  //   purpose: data.purpose,
  //   idNo: data.idNo,
  //   host: data.host,
  //   createdAt: new Date().toDateString,
  // };

  return [...existingData, data];
};

export const saveData = (data) => {
  AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};
