import React, {Component} from 'react';
import {View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import styles from '.././styles/styles';
import LogoScreen from '.././components/logo';
import FormScreen from '.././components/form';
import ClockScreen from '.././components/clock';
import CopyrightScreen from '.././components/copyright';
import {fetchData} from '../storage/database';

class Home extends Component {
  constructor(props) {
    super(props);
    // this.navigationEvent = this.navigationEvent.bind(this);
    // navigationEvent = navigationEvent.bind(this);

    this.state = {
      DATA: [],
    };
    this._isMounted = false;
  }

  getData = async () => {
    await fetchData().then(DATA => this.setState({DATA}));
    this.setPause();
  };

  setPause = () => {
    setInterval(() => {
      this.setState({
        isLoading: true,
      });
    }, 3000);
    this.setState({isLoading: false});
  };

  componentDidMount() {

    this._isMounted = true;
    this._isMounted && this.getData();
  }

  componentWillUnmount() {
    this.navigationEvent.remove();
    this._isMounted = false;
  }

  navigationEvent = this.props.navigation.addListener('willFocus', () => {
    this.getData();
  });

  _scrollToInput(reactNode: any) {
    // Add a 'scroll' ref to your ScrollView
    this.scroll.props.scrollToFocusedInput(reactNode);
  }

  render() {
    return (
      <KeyboardAwareScrollView
        innerRef={ref => {
          this.scroll = ref;
        }}
        extraHeight={1}
        extraScrollHeight={1}
        automaticallyAdjustContentInsets={false}>
        <View style={styles.homeContainer}>
          <LogoScreen />
          <ClockScreen />
          <FormScreen state={this.state} data={[...this.state.DATA]} />
          <CopyrightScreen />
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default Home;
