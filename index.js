import * as vega from 'vega';
import * as lite from 'vega-lite';
import { default as embed } from 'vega-embed';

function config(data = [], mapping = () => {}) {
  const values = data.map(([x, y]) => ({ x, y }));
  
  const withDefaults = {
    data: { values },
    mark: typeof mapping === 'string' ? mapping : 'point',
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

  return typeof mapping === 'function'
  	? mapping(withDefaults)
  	: withDefaults;
}

class Plot {
  constructor(props) {
    this.chart = document.createElement('div');
    this.update(props);
  }
  
  update({ data, mapping = 'point' }) {
    this.spec = {
      $schema: 'https://vega.github.io/schema/vega-lite/v4.json',
      ...config(data, mapping),
    };
    
    embed(this.chart, this.spec);
  }
  
  render(node) {
    node.appendChild(this.chart);
  }
}

export const plot = props => ({ ...props, __EllxMeta__: { component: Plot } });
