import {
  StyleSheet,
  Dimensions,
} from 'react-native';

const _totalWidth = Dimensions.get('window').width;
const _totalheight = Dimensions.get('window').height;

const isAndroid = Platform.OS == "android";

const variable = {
  width: 0.8 * _totalWidth, 
  textInputBorderRadius: 4,
  touchableBorderRadius: 7,
  fontSize: 14,
  backgroundColor: 'rgba(255, 255, 255, 1)',
  BGColorGrey: 'rgba(247, 247, 247, 0.4)',
  borderColor: 'rgba(204, 204, 204, 1)',
  buttonBGColor: 'rgba(244, 123, 49, 0.7)',
  copyrightColor: 'rgba(162, 153, 163, 1)',
  textInputHeight: 50,
  textAlignVertical: isAndroid ? "top" : 'auto',
  borderWidth: 1,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  todoContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    
  },
  homeContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignContent: 'stretch',
    backgroundColor: variable.BGColorGrey,
  },
  logoContainer: {
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  settingsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  formContainer: {
    flex: 1,
  },
  images: {
    width: 100,
    height: 100,
  },
  logoText: {
    paddingTop: 20,
    fontSize: 24,
    color: 'rgba(0,0,0,0.7)',
  },
  textInput: {
    textAlign: 'left',
    borderRadius: variable.textInputBorderRadius,
    width: variable.width,
    marginVertical: 5,
    fontSize: variable.fontSize,
    backgroundColor: variable.backgroundColor,
    height: variable.textInputHeight,
    borderColor: variable.borderColor,
    borderWidth: variable.borderWidth,
  },
  detailInput: {
    // textAlignVertical : "top",
    textAlignVertical: variable.textAlignVertical,
    width: variable.width,
    // marginBottom: 20,
    backgroundColor: variable.backgroundColor,
    borderRadius: variable.textInputBorderRadius,
    fontSize: variable.fontSize,
    borderColor: variable.borderColor,
    borderWidth: variable.borderWidth,
  },
  touchable:{
    textAlign: 'center',
    backgroundColor: variable.buttonBGColor,
    // width: ( width * 0.8 ),
    width: variable.width,
    fontSize: variable.fontSize,
    borderRadius: variable.touchableBorderRadius,
    marginVertical: 5,
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  clock:{
    padding: 10,
  },
  errText:{
    color: 'red',
  },
  copyright: {
    color: variable.copyrightColor,
  },
});

// module.exports = styles;
export default styles;