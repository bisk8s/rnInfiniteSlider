import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import ImageSlider from './ImageSlider';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ImageSlider />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
