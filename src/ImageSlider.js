import React, {useEffect, useState, useRef} from 'react';
import {Text, View, Image, StyleSheet, PanResponder} from 'react-native';
import axios from 'axios';

const ImageSlider = () => {
  const [images, setImages] = useState([]);
  const [posX, setPosX] = useState(0);

  const fetchImages = async () => {
    try {
      const url = 'https://picsum.photos/v2/list?limit=100';
      const response = await axios.get(url);
      setImages(response.data);
    } catch (error) {
      console.log('Error fetching images:', error);
    }
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gestureState) => {
        const {dx} = gestureState;
        const direction = Math.abs(dx) / dx;
        const move = direction * 10;
        if (!isNaN(move)) {
          setPosX(x => clamp(-90 * 50, (x += move), 0));
        }
      },
    }),
  ).current;

  useEffect(() => {
    fetchImages();
    // Add event listeners
    panResponder.panHandlers.onStartShouldSetResponder = () => true;
    panResponder.panHandlers.onMoveShouldSetResponder = () => true;

    return () => {
      // Clean up event listeners
      panResponder.panHandlers.onStartShouldSetResponder = null;
      panResponder.panHandlers.onMoveShouldSetResponder = null;
    };
  }, [panResponder]);

  return (
    <>
      <View>
        <Text>Total de Imagens: {images.length}</Text>
      </View>
      <View style={[styles.content]} {...panResponder.panHandlers}>
        {images.map((item, index) => {
          const left = posX + index * 50;
          const key = item.download_url + index;

          if (left + 50 >= 0 && left <= 500) {
            return (
              <Image
                key={key}
                style={[styles.image, {left}]}
                source={{uri: item.download_url}}
              />
            );
          } else {
            return <React.Fragment key={key} />;
          }
        })}
      </View>
    </>
  );
};

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: '#0003',
    overflow: 'hidden',
    height: 100,
    width: 500,
    position: 'relative',
  },
  image: {
    height: 100,
    width: 50,
    marginHorizontal: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    pointerEvents: 'none',
  },
});

export default ImageSlider;
