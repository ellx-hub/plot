const colors = {
  domain: ['sun', 'fog', 'drizzle', 'rain', 'snow'],
  range: ['#e7ba52', '#a7a7a7', '#aec7e8', '#1f77b4', '#9467bd']
};

export const weather = (root, vl) => root
  .encode(
    vl.color().fieldN('weather').scale(colors).title('Weather'),
    vl.x().timeMD('date').axis({title: 'Date', format: '%b'}),
    vl.y().fieldQ('temp_max').scale({domain: [-5, 40]}).axis({title: 'Maximum Daily Temperature (°C)'})
  )
  .height(300)
  .width(600);

export { default as pretty } from '~ellx-hub/lib/components/Pretty/index.js';
export { default as parseCsv } from '~ellx-hub/lib/utils/csv.js';
