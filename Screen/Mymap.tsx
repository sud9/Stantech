import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  PermissionsAndroid,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import MapView, {Marker, Polyline, PROVIDER_GOOGLE} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Geolocation from 'react-native-geolocation-service';
import NewModuleButton from './NewModuleButton';
export default function Mymap() {
  const customMapStyle = [
    {
      featureType: 'all',
      elementType: 'geometry',
      stylers: [
        {color: '#f5f5f5'}, // Light gray for map background
      ],
    },
    {
      featureType: 'poi.business',
      elementType: 'labels.text',
      stylers: [
        {visibility: 'off'}, // Hide business labels
      ],
    },
    {
      featureType: 'road',
      elementType: 'labels.icon',
      stylers: [
        {visibility: 'off'}, // Hide road icons
      ],
    },
    {
      featureType: 'transit',
      elementType: 'labels.icon',
      stylers: [
        {visibility: 'off'}, // Hide transit icons
      ],
    },
  ];

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'Cool Photo App needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the Location');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  const [currentLocation, setCurrentLocation] = useState(null);

  const [mylat, setmylat] = useState(26.799368874693386);
  const [mylong, setmylong] = useState(82.19452598663962);
  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        console.log(position);
        // setState({...state,pickupCord:})
        setmylat(position.coords.latitude);
        setmylong(position.coords.longitude);
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  useEffect(() => {
    requestLocationPermission();
  }, []);
  const customMarkerIcon = require('../Assets/mark.png');
  const [state, setState] = useState({
    pickupCord: {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0.5,
      longitudeDelta: 0.5,
    },
    droplocationCors: {
      latitude: 28.817482779574974,
      longitude: 77.5653899,
      latitudeDelta: 0.5,
      longitudeDelta: 0.5,
    },
  });
  const mapRef = useRef();
  return (
    <View style={{}}>
      <MapView
        provider={PROVIDER_GOOGLE}
        mapType="terrain"
        customMapStyle={customMapStyle}
        ref={mapRef}
        style={{width: '100%', height: '85%'}}
        initialRegion={{
          latitude: mylat,
          longitude: mylong,
          latitudeDelta: 0.5,
          longitudeDelta: 0.5,
        }}>
        <Marker
          coordinate={{latitude: mylat, longitude: mylong}} // Specify marker coordinate
          title="Custom Marker"
          description="This is a custom marker">
          <View>
            <Image source={customMarkerIcon} style={{width: 25, height: 25}} />
          </View>
        </Marker>
        {/* 
        <Marker
          coordinate={state.droplocationCors} // Specify marker coordinate
          title="Custom Marker"
          description="This is a custom marker">
          <View>
            <Image source={customMarkerIcon} style={{width: 25, height: 25}} />
          </View>
        </Marker> */}
        {/* <Polyline
          coordinates={state.pickupCord}
          strokeColor="#FF0000" // route line color
          strokeWidth={2} // route line width
        /> */}
        <MapViewDirections
          origin={state.pickupCord}
          destination={state.droplocationCors}
          apikey="AIzaSyBo8Ug_NpcG6KAUO3C0ZiMlPH6TeqtTh4E"
          strokeWidth={3}
          strokeColor="hotpink"
          optimizeWaypoints={true}
          onReady={result => {
            mapRef.current.fitToCoordinate(result.coordinates, {
              edgePadding: {
                right: 30,
                bottom: 300,
                left: 30,
                top: 100,
              },
            });
          }}
        />
      </MapView>
      <TouchableOpacity
        onPress={() => getCurrentLocation()}
        style={{backgroundColor: 'green', padding: 4}}>
        <Text style={{color: '#fff', fontSize: 19}}>
          {mylat} {mylong}
        </Text>
      </TouchableOpacity>
      <NewModuleButton />
    </View>
  );
}
