import React, { 
	Component, Image, AsyncStorage, StyleSheet, View, Text, TextInput, TouchableHighlight
} from 'react-native';
import { connect } from 'react-redux/native';
import Colors from 'Colors';
import Dimensions from 'Dimensions';
import ExNavigator from '@exponent/react-native-navigator';
import ExRouter from 'ExRouter';
import getCardsToStudy from '../domain/getCardsToStudy';
// import { getCards, getAttempts } from '../storage';
import { loadDeck } from '../redux/deck';
import CurrentDeck from '../components/CurrentDeck';
import Button from '../components/Button';
import Header from '../components/Header';
import DrawerLayout from 'react-native-drawer-layout';
import SidebarNav from '../components/SidebarNav';

class Onboarding extends React.Component {
  componentDidMount() {
    this.props.dispatch(loadDeck(5)); 
  }
  learn() {
    this.props.navigator.push(ExRouter.getLearnRoute());
  }
  openDrawer() {
    this.drawer.openDrawer();
  }
  closeDrawer() {
    this.drawer.closeDrawer();
  }
  render() {
    let {username} = this.props;

    return (
      <DrawerLayout
        ref={(drawer) => { return this.drawer = drawer }}
        drawerWidth={310}
        renderNavigationView={() => <SidebarNav onToggleDraw={this.closeDrawer.bind(this)} />}>
        <View style={styles.contentContainer}>
          <Header onToggleDraw={this.openDrawer.bind(this)} title="Hanzi Gold" />
          <View style={styles.statsContainer}>
            <Text style={styles.leadText}>Hi {username}, Welcome to Hanzi Gold!</Text>
            <Text style={styles.secondText}>Our learn mode will guide you through hanzi with memorable descriptions.</Text> 
            <Text style={styles.secondText}>After seeing the description you will be tested and with each correct answer you will gain points and increase word strength.</Text>
            <Text style={styles.secondText}>Open the menu in the top left to find other learning modes.</Text>
            <View style={{margin: 25}}>
              <Button onPress={this.learn.bind(this)}>Start Learning!</Button>
            </View>
          </View>
        </View>
      </DrawerLayout>
    );
  }
}

export default connect(state => ({
  username: state.user.username,
  points: state.user.points
}))(Onboarding);

var styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: Colors.GREY_BG,
    flexDirection: 'column'
  },
  header: {
    height: 70,
    paddingTop: 10,
    backgroundColor: Colors.GOLD,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerText: {
    color: Colors.WHITE,
    fontSize: 22,
    fontWeight: "bold"
  },
  leadText: {
    color: Colors.BLACK,
    textAlign: 'center',
    marginLeft: 25,
    marginRight: 25,
    marginTop: 30,
    marginBottom: 30,
    fontSize: 28,
    fontWeight: 'bold'
  },
  secondText: {
    color: Colors.BLACK,
    marginLeft: 25,
    marginRight: 25,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 18,
  },
  statsContainer: {
    flex: 0.2,
    margin: 15,
    backgroundColor: '#fff',
    borderRadius: 5,
    flexDirection: 'column'
  },
  learnContainer: {
    flex: 0.8,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 5
  },
  currentDeckWrapper: {
    flex: 0.8
  },
  learnButtonWrapper: {
    marginLeft: 30,
    marginRight: 30,
    flex: 0.2,
    marginTop: 15
  }
}); 