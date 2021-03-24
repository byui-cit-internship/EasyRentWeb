import React, { Component } from 'react';
import { View, Text, Animated, StyleSheet, Easing } from 'react-native';
import SunRed from './SunRed.png';
import Moon from './Moon.png'
import Context from './services/context';

export default class Circle extends Component {

  constructor() {
    super();

    this.animated = new Animated.Value(0);
    var inputRange = [0, 1];
    var outputRange = ['0deg', '360deg'];
    this.rotate = this.animated.interpolate({ inputRange, outputRange });
    outputRange = ['0deg', '-360deg'];
    this.rotateOpposit = this.animated.interpolate({ inputRange, outputRange });
  }

  componentDidMount() {
    this.animate();
  }

  animate(props) {
    Animated.loop(
      Animated.timing(this.animated, {
        toValue: 1,
        duration: 30000,
        easing: Easing.linear,
      }),
    ).start(() => this.animate());
  }

  render() {
    const transform = [{ rotate: this.rotate }];
    const transform1 = [{ rotate: this.rotateOpposit }];

    return (
      <Context.Consumer>
        {(context) => (
          <View style={styles.container}>
            <Animated.View style={[styles.item, { transform }]}>
              <Animated.View >
                {context.toggle === 'returned'
                  ? <img src={SunRed} className="BYUI"></img>
                  : <img src={Moon} className="BYUI"></img>}
              </Animated.View>
            </Animated.View>
          </View>
        )}
      </Context.Consumer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    position: 'absolute',
    width: 102,
    height: 100,
    bottom: -80,
  }
});
