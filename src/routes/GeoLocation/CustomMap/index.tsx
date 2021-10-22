import "./styles.ts";
import {
  GoogleMap,
  Marker,
  withGoogleMap,
  withScriptjs,
} from "react-google-maps";
import React from "react";

const CustomMap = withScriptjs(
  withGoogleMap((props: any) => {
    const [location, setLocation] = React.useState<{
      lat: number;
      lng: number;
    }>({
      lat: props.position.coords.latitude,
      lng: props.position.coords.longitude,
    });

    React.useEffect(() => {}, []);

    const mapClicked = (e: any) => {
      setLocation({ lat: e.latLng.lat(), lng: e.latLng.lng() });
      props.setClickedMap(true);
      props.setClickedLocation(location);
    };

    if (!location) {
      return <></>;
    }

    return (
      <GoogleMap
        defaultZoom={8}
        defaultCenter={{
          lat: location.lat,
          lng: location.lng,
        }}
        onClick={mapClicked}
      >
        <Marker
          position={{
            lat: location.lat,
            lng: location.lng,
          }}
        />
      </GoogleMap>
    );
  })
);

export default CustomMap;
