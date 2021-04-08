import React from 'react';
import { ImageBackground, Image, StyleSheet, StatusBar, Dimensions, Platform } from 'react-native';
import { Block, Button, Text, theme } from 'galio-framework';

const { height, width } = Dimensions.get('screen');
import { Images, nowTheme } from '../constants/';
import Home from './Home'
import Header from '../components/Header';
var InitialState=false;
export default class Onboarding extends React.Component {
  

  state={
       isLogIn:"",
  }



  handleLogin=()=>{
   
    // if(!this.state.isLogIn){
    //   const newState=!this.state.isLogIn;
    
    //   this.setState({isLogIn:newState})
    //   this.props.navigation.navigate('Home')
    // }else{
    //   const newState=!this.state.isLogIn;
    
    //   this.setState({isLogIn:newState})
    // }
    const newState=!this.state.isLogIn;
    InitialState=!this.state.isLogIn;
    
    this.setState({isLogIn:newState})
  }
  render() {
    
    if(!this.state.isLogIn){
    return (
      <Block flex style={styles.container}>
      <Header name="Home" openDrawer={this.props.navigation.openDrawer}/>
        <StatusBar barStyle="light-content" />
        <Block flex>
          <ImageBackground
            source={Images.Onboarding}
            style={{ flex: 1, height: height+40, width, zIndex: 1 }}
          />
          <Block space="between" style={styles.padded}>
            <Block>
              <Block middle>
                <Image source={Images.Logo} style={{ width: 130, height: 150,left:70, bottom: 150 }} />
              </Block>
              <Block>
                <Block middle>
                  <Text
                    style={{
                       bottom: 50, position: 'absolute', letterSpacing: 2, paddingHorizontal: 20, textAlign: 'center'
                    }}
                    color="white"
                    size={44}
                  >
                    {/* EasyPets */}

                  </Text>
                </Block>
              </Block>
              <Block middle row>
                <Text
                  color="white"
                  size={16}
                  
                >
                  
                </Text>
                {/* <Image
                  source={Images.InvisionLogo}
                  style={{
                    height: 28,
                    width: 91,
                    marginLeft: theme.SIZES.BASE
                  }}
                /> */}
              </Block>
              <Block middle row style={{ marginTop: 15, marginBottom: 30}}>
                {/* <Text
                  color="white"
                  size={16}
                  style={{ fontFamily: 'montserrat-regular' }}
                >
                  Coded by
                </Text>
                <Image
                  source={Images.CreativeTimLogo}
                  style={{
                    height: 29,
                    width: 129,
                    marginLeft: theme.SIZES.BASE
                  }}
                /> */}
              </Block>

              <Block
                row
                style={{
                  marginTop: theme.SIZES.BASE * 2.5,
                  marginBottom: theme.SIZES.BASE * 2
                }}
              >
                {/* <Button
                  shadowless
                  style={styles.button}
                  color={nowTheme.COLORS.PRIMARY}
                  onPress={() => this.handleLogin()}
                >
                  <Text
                    style={{  fontSize: 14 }}
                    color={theme.COLORS.WHITE}
                  >
                    GET STARTED
                  </Text>
                </Button> */}
              </Block>
            </Block>
          </Block>
        </Block>
      </Block>
    );
  }else{
    return <Home navigation={this.props.navigation}/>
  }
}

}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: theme.COLORS.BLACK,
    // marginTop: Platform.OS === 'android' ? -HeaderHeight : 0
    marginTop: 20
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    paddingTop: 500,
    zIndex: 3,
    position: 'absolute',
    bottom: Platform.OS === 'android' ? theme.SIZES.BASE * 2 : theme.SIZES.BASE * 3
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0
  },

  gradient: {
    zIndex: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 66
  }
});
