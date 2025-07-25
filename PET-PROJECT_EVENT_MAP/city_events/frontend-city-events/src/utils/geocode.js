export async function getCoordsByAddress(address) {
  const apiKey = import.meta.env.VITE_YANDEX_MAP_API_KEY;
  const response = await fetch(
    `https://geocode-maps.yandex.ru/1.x/?format=json&apikey=${apiKey}&geocode=${encodeURIComponent(address)}`
  );

  const data = await response.json();
  const geoObject = data.response.GeoObjectCollection.featureMember[0];

  if (!geoObject) throw new Error('Адрес не найден');

  const [lon, lat] = geoObject.GeoObject.Point.pos.split(' ').map(Number);
  return [lat, lon];
}
