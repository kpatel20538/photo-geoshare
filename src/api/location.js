import qs from "qs";
import pDebounce from "p-debounce";
import { featureCollection, point } from "@turf/helpers";
import { getCoord } from "@turf/invariant";
import center from "@turf/center";
import * as Location from "expo-location";

export const fetchGeoSearch = pDebounce(async (options) => {
  if (!options.q || options.q.length < 4) {
    return featureCollection([]);
  }
  const response = await fetch(
    `https://photon.komoot.de/api?${qs.stringify(options)}`
  );
  return response.json();
}, 250);

export const fetchGeoReverse = pDebounce(
  async (options) => {
    const response = await fetch(
      `https://photon.komoot.de/reverse?${qs.stringify(options)}`
    );
    return response.json();
  },
  250,
  { leading: true }
);

export const getRegion = (geoFeature) => {
  const [longitude, latitude] = getCoord(center(geoFeature));
  const [
    longitudeStart = 0.25,
    latitudeStart = 0.25,
    longitudeEnd = 0,
    latitudeEnd = 0,
  ] = geoFeature.properties.extent || [];
  return {
    longitude,
    latitude,
    longitudeDelta: Math.abs(longitudeStart - longitudeEnd),
    latitudeDelta: Math.abs(latitudeStart - latitudeEnd),
  };
};

export const getCurrentRegion = async () => {
  const { granted } = await Location.requestPermissionsAsync();
  if (!granted) {
    return null;
  }

  const {
    coords: { longitude, latitude },
  } = await Location.getCurrentPositionAsync();
  return getRegion(point([longitude, latitude]));
};