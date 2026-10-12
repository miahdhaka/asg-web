// [name, lat, lon, weight 1-10]
export type City = { name: string; lat: number; lon: number; w: number };

const raw: [string, number, number, number][] = [
  // Europe
  ["London", 51.5, -0.12, 10], ["Paris", 48.85, 2.35, 9], ["Madrid", 40.4, -3.7, 7],
  ["Barcelona", 41.39, 2.17, 6], ["Lisbon", 38.72, -9.14, 5], ["Rome", 41.9, 12.5, 7],
  ["Milan", 45.46, 9.19, 7], ["Berlin", 52.52, 13.4, 8], ["Munich", 48.14, 11.58, 6],
  ["Frankfurt", 50.11, 8.68, 6], ["Hamburg", 53.55, 9.99, 5], ["Amsterdam", 52.37, 4.9, 7],
  ["Brussels", 50.85, 4.35, 6], ["Zurich", 47.37, 8.54, 5], ["Vienna", 48.21, 16.37, 6],
  ["Prague", 50.08, 14.43, 5], ["Warsaw", 52.23, 21.01, 6], ["Budapest", 47.5, 19.04, 5],
  ["Copenhagen", 55.68, 12.57, 5], ["Stockholm", 59.33, 18.07, 5], ["Oslo", 59.91, 10.75, 4],
  ["Helsinki", 60.17, 24.94, 4], ["Dublin", 53.35, -6.26, 5], ["Manchester", 53.48, -2.24, 6],
  ["Athens", 37.98, 23.73, 5], ["Bucharest", 44.43, 26.1, 5], ["Istanbul", 41.01, 28.98, 9],
  ["Kyiv", 50.45, 30.52, 5], ["Moscow", 55.76, 37.62, 9], ["St Petersburg", 59.93, 30.34, 5],
  // North America
  ["New York", 40.71, -74.0, 10], ["Boston", 42.36, -71.06, 6], ["Washington", 38.9, -77.04, 6],
  ["Philadelphia", 39.95, -75.17, 6], ["Atlanta", 33.75, -84.39, 6], ["Miami", 25.76, -80.19, 6],
  ["Chicago", 41.88, -87.63, 8], ["Detroit", 42.33, -83.05, 5], ["Dallas", 32.78, -96.8, 7],
  ["Houston", 29.76, -95.37, 7], ["Denver", 39.74, -104.99, 5], ["Phoenix", 33.45, -112.07, 5],
  ["Los Angeles", 34.05, -118.24, 9], ["San Diego", 32.72, -117.16, 5], ["San Francisco", 37.77, -122.42, 7],
  ["Seattle", 47.61, -122.33, 6], ["Portland", 45.52, -122.68, 4], ["Las Vegas", 36.17, -115.14, 4],
  ["Minneapolis", 44.98, -93.27, 4], ["St Louis", 38.63, -90.2, 4], ["Nashville", 36.16, -86.78, 3],
  ["Toronto", 43.65, -79.38, 8], ["Montreal", 45.5, -73.57, 6], ["Vancouver", 49.28, -123.12, 5],
  ["Calgary", 51.05, -114.07, 4], ["Mexico City", 19.43, -99.13, 9], ["Guadalajara", 20.66, -103.35, 5],
  ["Monterrey", 25.69, -100.32, 5], ["Panama City", 8.98, -79.52, 3], ["Havana", 23.11, -82.37, 3],
  // South America
  ["Sao Paulo", -23.55, -46.63, 9], ["Rio de Janeiro", -22.91, -43.17, 7], ["Buenos Aires", -34.6, -58.38, 8],
  ["Santiago", -33.45, -70.67, 6], ["Lima", -12.05, -77.04, 6], ["Bogota", 4.71, -74.07, 6],
  ["Caracas", 10.48, -66.9, 4], ["Brasilia", -15.79, -47.88, 4], ["Quito", -0.18, -78.47, 3],
  // Africa
  ["Cairo", 30.04, 31.24, 8], ["Lagos", 6.52, 3.38, 8], ["Nairobi", -1.29, 36.82, 5],
  ["Johannesburg", -26.2, 28.05, 6], ["Cape Town", -33.92, 18.42, 5], ["Casablanca", 33.57, -7.59, 5],
  ["Accra", 5.6, -0.19, 4], ["Addis Ababa", 9.03, 38.74, 4], ["Algiers", 36.75, 3.06, 4],
  ["Dar es Salaam", -6.79, 39.28, 4], ["Kinshasa", -4.44, 15.27, 4], ["Tunis", 36.81, 10.18, 3],
  // Middle East
  ["Dubai", 25.2, 55.27, 8], ["Abu Dhabi", 24.45, 54.38, 5], ["Riyadh", 24.71, 46.68, 6],
  ["Jeddah", 21.49, 39.19, 4], ["Doha", 25.29, 51.53, 4], ["Tel Aviv", 32.08, 34.78, 5],
  ["Tehran", 35.69, 51.39, 6], ["Baghdad", 33.31, 44.36, 4], ["Kuwait City", 29.38, 47.99, 3],
  // South Asia
  ["Dhaka", 23.81, 90.41, 9], ["Chittagong", 22.36, 91.78, 5], ["Sylhet", 24.89, 91.87, 3],
  ["Delhi", 28.61, 77.21, 10], ["Mumbai", 19.08, 72.88, 10], ["Bengaluru", 12.97, 77.59, 8],
  ["Hyderabad", 17.39, 78.49, 7], ["Chennai", 13.08, 80.27, 7], ["Kolkata", 22.57, 88.36, 8],
  ["Ahmedabad", 23.02, 72.57, 6], ["Pune", 18.52, 73.86, 6], ["Jaipur", 26.91, 75.79, 4],
  ["Lucknow", 26.85, 80.95, 4], ["Karachi", 24.86, 67.0, 8], ["Lahore", 31.55, 74.34, 7],
  ["Islamabad", 33.68, 73.05, 4], ["Colombo", 6.93, 79.86, 4], ["Kathmandu", 27.72, 85.32, 4],
  // East & Southeast Asia
  ["Tokyo", 35.68, 139.69, 10], ["Osaka", 34.69, 135.5, 7], ["Nagoya", 35.18, 136.91, 5],
  ["Seoul", 37.57, 126.98, 9], ["Busan", 35.18, 129.08, 5], ["Beijing", 39.9, 116.4, 9],
  ["Shanghai", 31.23, 121.47, 10], ["Guangzhou", 23.13, 113.26, 8], ["Shenzhen", 22.54, 114.06, 8],
  ["Chengdu", 30.57, 104.07, 6], ["Wuhan", 30.59, 114.3, 6], ["Hong Kong", 22.32, 114.17, 8],
  ["Taipei", 25.03, 121.57, 7], ["Singapore", 1.35, 103.82, 9], ["Kuala Lumpur", 3.14, 101.69, 7],
  ["Bangkok", 13.76, 100.5, 8], ["Jakarta", -6.21, 106.85, 9], ["Surabaya", -7.25, 112.75, 5],
  ["Manila", 14.6, 120.98, 8], ["Ho Chi Minh City", 10.82, 106.63, 7], ["Hanoi", 21.03, 105.85, 6],
  ["Yangon", 16.84, 96.17, 4], ["Phnom Penh", 11.56, 104.92, 3],
  // Oceania
  ["Sydney", -33.87, 151.21, 8], ["Melbourne", -37.81, 144.96, 7], ["Brisbane", -27.47, 153.03, 5],
  ["Perth", -31.95, 115.86, 4], ["Auckland", -36.85, 174.76, 5], ["Wellington", -41.29, 174.78, 3],
  // Central Asia / misc
  ["Almaty", 43.24, 76.89, 4], ["Tashkent", 41.3, 69.24, 4], ["Novosibirsk", 55.01, 82.93, 3],
  ["Baku", 40.41, 49.87, 3], ["Tbilisi", 41.72, 44.79, 3],
];

export const CITIES: City[] = raw.map(([name, lat, lon, w]) => ({ name, lat, lon, w }));
