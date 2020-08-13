import * as vega from 'vega';
import * as lite from 'vega-lite';
import { default as embed } from 'vega-embed';

function config(data = [], mark = 'point', transformers = []) {
  const values = data.map(([x, y]) => ({ x, y }));
  
  const withDefaults = {
    data: { values },
    mark,
    width: 400,
    height: 200,
    encoding: {
      x: {
        field: 'x',
        type: 'quantitative',
      },
      y: {
        field: 'y',
        type: 'quantitative',
      }
    },
  };
  
  return transformers.reduce((conf, fn) => fn(conf), withDefaults);
}

class Plot {
  constructor(props) {
    this.chart = document.createElement('div');
    this.update(props);
  }
  
  update({ data, mapping = 'point', transformers }) {
    this.spec = {
      $schema: 'https://vega.github.io/schema/vega-lite/v4.json',
      ...config(data, mapping, transformers),
    };
    
    embed(this.chart, this.spec);
  }
  
  render(node) {
    node.appendChild(this.chart);
  }
}

export const plot = props => ({
  ...props,
  __EllxMeta__: {
    component: Plot,
    operator: {
      binary: {
        '+': (l, r) => {
          l.transformers = [...(l.transformers || []), r];
          
          return l;
        }
      }
    }
  }
});

export const label = (x, y) => (config) => { 
  if (x) {
    config.encoding.x.title = x;
  }
  if (y) {
    config.encoding.y.title = y;
  }
  
  return config;
};