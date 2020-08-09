import qs from "qs";
import pDebounce from "p-debounce";
import { featureCollection } from "@turf/helpers";

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
