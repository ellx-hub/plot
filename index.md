# Ellx plot

This is a simple Ellx wrapper around [Vega Lite Javascript API](https://github.com/vega/vega-lite-api/).

The wrapper layer is very thin and exposes the full power of [Vega Lite](https://vega.github.io/vega-lite/) under the hood.

```
plot(data, mapping = (spec, vl) => spec)
```
where `data`, following the Vega data model, is a vector of records,
e.g.
```
data = range(50)
  .map(() => Math.random())
  .map(arg => ({ arg, f: arg * arg }))
```
The default schema is using the first two fields as `x` and `y`. This allows you to have a quick look at your quantitative data without worrying too much about the visualization schema.

```
plot(data)
```
{ defaultPlot = plot(data) }

and the default generated Vega Lite schema is

{ pretty(defaultPlot.vl.toJSON()) }

Customize the schema by passing a `mapping` to `plot`: a transformer function, taking two parameters:
- `spec`: Vega Lite API wrapped root spec
- `vl`: Vega Lite API itself

It should return the transformed `spec`. Vega Lite API's dot-chainable functions simplify the task.

```
plot(data, spec => spec.markLine())
```

{ plot(data, spec => spec.markLine()) }

[Vega Lite API reference](https://vega.github.io/vega-lite-api/api/)

### More examples
Vega Lite allows for some really sophisticated visualizations. We define a custom mapping here that we call `weather`

```
const colors = {
  domain: ['sun', 'fog', 'drizzle', 'rain', 'snow'],
  range: ['#e7ba52', '#a7a7a7', '#aec7e8', '#1f77b4', '#9467bd']
};

export const weather = (root, vl) => root
  .encode(
    vl.color().fieldN('weather').scale(colors).title('Weather'),
    vl.x().timeMD('date')
      .axis({title: 'Date', format: '%b'}),
    vl.y().fieldQ('temp_max')
      .scale({domain: [-5, 40]})
      .axis({title: 'Maximum Daily Temperature (°C)'})
  )
  .height(300)
  .width(600);
```

Then we pass it to `plot`
```
plot(weatherData, examples.weather)
```
{ plot(weatherData, examples.weather) }
