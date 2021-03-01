import React, {Component} from 'react';
import {View, Text, Animated, StyleSheet, Easing} from 'react-native';
import SunRed from './SunRed.png';

export default class Circle extends Component {
    constructor() {
        super();
        this.animated = new Animated.Value(0);
        var inputRange = [0, 1];
        var outputRange = ['0deg', '360deg'];
        this.rotate = this.animated.interpolate({inputRange, outputRange});
        outputRange = ['0deg', '-360deg'];
        this.rotateOpposit = this.animated.interpolate({inputRange, outputRange});
    }

    componentDidMount() {
        this.animate();
    }

    animate() {
      Animated.loop(
        Animated.timing(this.animated, {
            toValue: 1,
            duration: 30000,
            easing: Easing.linear,
        }),
      ).start(() => this.animate());
    }
    render() {
        const transform = [{rotate: this.rotate}];
        const transform1 = [{rotate: this.rotateOpposit}];
        return (
          <View style={styles.container}>
            <Animated.View style={[styles.item, {transform}]}>
              <Animated.View >
                <img src={SunRed} className="BYUI"></img>
              </Animated.View>
            </Animated.View>
          </View>
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
        height: 100, // this is the diameter of circle
        bottom: -80,
    }
 });
