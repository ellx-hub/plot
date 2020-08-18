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

Mapping maybe a string name of a mark type. This is useful for fast prototyping. Try different marks on the same data set with this select:
  
{ mapping = select({ options: ['--', ...markOptions]}) }

{ plot({ data, mapping }) }

Another more powerful option is to pass `mapping` an array of transformer functions:
  
```
{ plot({ data, mapping: [label('my x', 'my y'), color('red')]})}
```
  
{ plot({ data, mapping: [label('my x', 'my y'), color('red')]})}

This is where power of Ellx' operator overloading comes into play. Passing all these transformer functions will soon become unwieldy and unreadable so Plot uses `/` operator to add a function to the mapping list.

So this:
```
{ plot({ data, mapping: [label('my x', 'my y'), color('red')]}) }
```

equals this:
```
{ plot({ data }) / label('my x', 'my y') / color('red') }
```
  
Signature of transformer function is trivial:
  
```
const transformer = (value) => (config) => { 
  config.someParameter.value = value;
  
  // config is a Vega-Lite config object
  return config;
};
```

#### Composition
  
Operator precedence is preserved so functional composition by `/` and plot layering can be easily combined:

```
{
plot({ data, mapping: 'line' })
  / label('line-x')
  / color('green') +
plot()
  / label('x square', 'y square') 
  / color('purple')
}
```
  
{
plot({ data, mapping: 'line' })
  / label('line-x')
  / color('green') +
plot()
  / label('x square', 'y square') 
  / color('purple')
}
  
Note that any additional plot layers will reuse first layer's data if it wasn't passed.

```
{
plot({ data, mapping: 'line' }) + plot({ data: otherData })
}
```

{
plot({ data, mapping: 'line' }) + plot({ data: otherData })
}
