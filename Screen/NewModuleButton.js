import React from 'react';
import {
  NativeModules,
  Button,
  TouchableOpacity,
  Text,
  Image,
  View,
} from 'react-native';

const {BatterySaverModule} = NativeModules;

const NewModuleButton = () => {
  const [mode, setmode] = React.useState(true);
  const onPress = () => {
    BatterySaverModule.isBatterySaverModeEnabled()
      .then(isEnabled => {
        console.log('Battery saver mode is enabled:', isEnabled);
        setmode(isEnabled);
      })
      .catch(error => {
        console.error('Error checking battery saver mode:', error);
      });
  };
  React.useEffect(() => {
    onPress();
  });

  return (
    // <Button
    //   title="Click to invoke your native module!"
    //   color="#841584"
    //   onPress={onPress}
    // />
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingRight: 30,
        marginTop: 10,
      }}>
      <TouchableOpacity
        onPress={onPress}
        style={{
          backgroundColor: 'green',

          alignItems: 'center',
          justifyContent: 'center',
          padding: 10,
          width: '50%',
        }}>
        <Text style={{color: '#fff'}}>
          Click to check PowerSave Mode Status
        </Text>
      </TouchableOpacity>
      <View style={{width: 30, height: 30}}>
        {mode ? (
          <Image
            resizeMode="contain"
            style={{width: '100%', height: '100%'}}
            source={require('../Assets/car-battery.png')}
          />
        ) : (
          <Image
            resizeMode="contain"
            style={{width: '100%', height: '100%'}}
            source={require('../Assets/battery.png')}
          />
        )}
      </View>
      <Text style={{color: mode ? 'green' : 'red', fontWeight: 'bold'}}>
        {mode ? 'ON' : 'OFFededede'}
      </Text>
    </View>
  );
};

export default NewModuleButton;
