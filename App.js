import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import { useAssets } from 'expo-asset';
import {ThemedButton} from "react-native-really-awesome-button";

export default function App() {
  return (
    <View style={styles.container}>
        <LinearGradient
            colors={['#0042D9', '#0093FF', '#0078FF']}
            style={styles.background}
        >
            <PlayButton />
        </LinearGradient>

    </View>
  );
}


const PlayButton = () => {
    const [sound, setSound] = React.useState();
    const [isPlaying, setPlaying] = React.useState(false);
    const assetsList = [
        require('./assets/1.wav'),
        require('./assets/2.wav'),
        require('./assets/3.wav'),
    ]
    const [soundAssets] = useAssets(assetsList)

    const getSound = () => {

        console.log({soundAssets})
        const index = Math.floor(Math.random() * (assetsList.length) + 0);

        return soundAssets[index];
    }

    async function playSound() {
        console.log('Loading Sound', getSound());
        const soundAsset = getSound();
        const { sound } = await Audio.Sound.createAsync(soundAsset);
        setSound(sound);

        console.log('Playing Sound');
        try {
            setPlaying(true)
            await sound.playAsync().then(({isPlaying}) => {
                setPlaying(isPlaying)
            });
        } catch (error) {
            setPlaying(false)
            console.error(error)
        }

      }

    React.useEffect(() => {
    return sound
        ? () => {
            console.log('Unloading Sound');
            sound.unloadAsync();
        }
        : undefined;
    }, [sound]);

    return (
        <View style={styles.playButton}>
            <ThemedButton
                name="cartman"
                type="secondary"
                height={200}
                borderRadius={200}
                onPress={playSound}
                disabled={isPlaying}
                raiseLevel={5}
                >
                Жми
            </ThemedButton>
        </View>
    )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
  playButton: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    marginLeft: '-25%',
    marginTop: -100
  },
  image_shadows: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 10,
    height: 280
  }
});
