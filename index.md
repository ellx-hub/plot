# Simple Ellx plot

Here's plot API:
```
plot({ data, mapping })
```

For initial take we accept 2d array for `data` and Vega's own point types for `mapping` or a transformer function which accepts Vega lite default config and returns desired config.

It is through this transformer function that we can provide versatile and simple API for different plotting options (like aggregation functions).

We should consider operator overloading for adding layers ggplot style where `+` would naturally perform Vega lite's view composition (see [https://vega.github.io/vega-lite/docs/facet.html](https://vega.github.io/vega-lite/docs/facet.html)).

```
{ data = range(50).map(() => [Math.random(), Math.random()]) }
```

<div class="text-xs font-mono py-8 bg-gray-100 px-4">

##### Random data points
{ data = range(50).map(() => [Math.random(), Math.random()]) }
  
</div>

#### Default plot

{ plot({ data }) }

```
{ plot({ data }) }
```

#### Line

{ plot({ data, mapping: 'line' }) }

```
{ plot({ data, mapping: 'line' }) }
```

#### Area

{ plot({ data, mapping: 'area' }) }

```
{ plot({ data, mapping: 'area' }) }
```

#### Bar

{ plot({ data, mapping: 'bar' }) }

```
{ plot({ data, mapping: 'bar' }) }
```

#### Circle

{ plot({ data, mapping: 'circle' }) }

```
{ plot({ data, mapping: 'circle' }) }
```

#### Square

{ plot({ data, mapping: 'square' }) }

```
{ plot({ data, mapping: 'square' }) }
```

#### Tick

{ plot({ data, mapping: 'tick' }) }

```
{ plot({ data, mapping: 'tick' }) }
```

#### Composition

{ plot({ data, mapping: 'tick' }) + label('rnddd', 'drnnn') }

```
{ plot({ data, mapping: 'tick' }) + label('rnddd', 'drnnn') }
```