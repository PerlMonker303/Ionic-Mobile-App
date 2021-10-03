import "./styles.ts";
import { Geoposition } from "ionic-native";
import { Map, Marker, GoogleApiWrapper } from "google-maps-react";

type Props = {
  google: any;
  location: Geoposition;
};

const CustomMap = (props: Props) => {
  const { google, location } = props;

  return (
    <>
      <Map
        google={google}
        initialCenter={{
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        }}
      >
        <Marker />
      </Map>
    </>
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY!,
})(CustomMap);
