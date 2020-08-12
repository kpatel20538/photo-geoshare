import * as Location from "expo-location";
import pDebounce from "p-debounce";
import qs from "qs";
import { featureCollection, point } from "@turf/helpers";
import { getCoord } from "@turf/invariant";
import center from "@turf/center";
import { encode, neighbors, decode_bbox } from "ngeohash";
import bboxPolygon from "@turf/bbox-polygon";
import memoize from 'memoize-one';

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
    longitudeStart = 0.05,
    latitudeStart = 0.05,
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
    throw new Error("Location Permission Denied");
  }

  const {
    coords: { longitude, latitude },
  } = await Location.getLastKnownPositionAsync();

  return {
    region: getRegion(point([longitude, latitude])),
    coordinate: { longitude, latitude },
  };
};

const findCeilingIndex = (array, item) => {
  for (let idx = 1; idx < array.length; idx++) {
    if (item > array[idx]) {
      return idx - 1;
    }
  }
  return array.length - 1;
}

const getPrecision = (({ maxPrecision = 12 } = {}) => {
  const latitudeErrors = [];
  const longitudeErrors = []
  for (let precision = 0; precision <= maxPrecision; precision++) {
    const bits = 5 * precision;
    const parity = precision % 2;
    const latitudeError = 3 * 180 * Math.pow(2, -(bits - parity) / 2);
    const longitudeError = 3 * 180 * Math.pow(2, -(bits + parity - 2) / 2);
    latitudeErrors.push(latitudeError);
    longitudeErrors.push(longitudeError);
  }
  return (latitudeDelta, longitudeDelta) => {
    const latitudePrecision = findCeilingIndex(latitudeErrors, latitudeDelta);
    const longitudePrecision = findCeilingIndex(longitudeErrors, longitudeDelta);
    return Math.min(latitudePrecision, longitudePrecision);
  };
})();

const getGeohashNeighbors = memoize((geohash) => [geohash, ...neighbors(geohash)])

export const getGeohashRegion = memoize((region) => {
  if (!region) {
    return [];
  }

  const { latitude, longitude, latitudeDelta, longitudeDelta } = region;
  const precision = getPrecision(latitudeDelta, longitudeDelta);
  const geohash = encode(latitude, longitude, precision);
  return getGeohashNeighbors(geohash);
});

export const getGeohashFeature = (geohashRegion) => {
  return featureCollection(
    geohashRegion
      .map(decode_bbox)
      .map(([minY, minX, maxY, maxX]) => [minX, minY, maxX, maxY])
      .map(bboxPolygon)
  )
}