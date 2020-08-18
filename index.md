# Simple Ellx plot

This is a simple plotting library built on top of [Vega-Lite](https://vega.github.io/vega-lite/) inspired by [ggplot's API](https://ggplot2.tidyverse.org/reference/ggplot.html).

The API itself:
```
plot({ data, mapping }) / transformerFn() + plot({ mapping })
```

This simple API allows for quick and simple way to plot 2d data like this:

```
{ plot({ data }) }
```

{ plot({ data }) }

Layer plots by adding them together ggplot style:

```
{ plot({ data }) + plot({ mapping: 'line' }) }
```

{ plot({ data }) + plot({ mapping: 'line' }) }

And modify plots by using simple functional composition:

```
{
plot({ data, mapping: 'line' }) / label('Extraordinary green line') / color('green') 
}
```

{
plot({ data, mapping: 'circle' }) / label('My custom X') / color('green') 
}

## Data

<small>

`Array<Tuple>`
  
</small>

For simplicity sake ATM plot accepts 2d array for `data` parameter:


```
[[0, 1], [1, 3], [5, 4]]
```

In future we consider something akin to [pandas.DataFrame](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.html) but it may prove to be too similar to d3's data transforms so we might as well stick to simple functional approach expecting user to process their data before passing it to plot.

## Mapping

<small>

`string: area|bar|circle|line|point|rect|rule|square|text|tick`
`Array<TransformerFn>`

</small>

`Mapping` 

```
{ data = range(50).map(() => [Math.random(), Math.random()]) }
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

#### Layering

{
plot({ data, mapping: 'line' }) + plot({ data, mapping: 'square'}) 
}

```
{
plot({ data, mapping: 'line' }) + plot({ data, mapping: 'square'}) 
}
```

#### Composition

{
plot({ data, mapping: 'line' }) / label('line-x') / color('green') + plot({ data, mapping: 'square' }) / label('x square', 'y square') / color('purple')
}

```
{
plot({ data, mapping: 'line' }) / label('line-x') / color('green') + plot({ data, mapping: 'square' }) / label('x square', 'y square') / color('purple')
}
```