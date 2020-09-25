import * as vega from 'vega@5.14';
import * as vegaLite from 'vega-lite@4.14.1';
import * as vlApi from 'vega-lite-api@0.11.0';
import * as vegaTooltip from 'vega-tooltip@0.23.2';
import eq from 'fast-deep-equal';

const options = {
  config: {
    // Vega-Lite default configuration
  },
  init: (view) => {
    // initialize tooltip handler
    view.tooltip(new vegaTooltip.Handler().call);
  },
  view: {
    // view constructor options
    renderer: 'canvas',
  },
};

// register vega and vega-lite with the API
vlApi.register(vega, vegaLite, options);

class Plot {
  constructor(props) {
    this.update(props);
  }

  update({ vl }) {
    this.vl = vl;
    const { data, ...spec } = vl.toJSON();

    if (this.chart) {
      const view = this.chart.value;  // Vega Lite view object (https://vega.github.io/vega-lite/docs/spec.html)
      if (!view) {
        console.error('Vega Lite view is missing on the chart node');
        return;
      }

      if (!eq(spec, this.spec)) {
        // Spec has changed, need to re-render
        const container = this.chart.parentNode;
        container.removeChild(this.chart);

        view.finalize();
        this.chart = null;

        this.render(container);
      }
      else {
        // A "streaming" update, preserving the view
        view.data('source', data.values).run();
      }
    }
    this.spec = spec;
  }

  async render(node) {
    const promise = this.rendering = this.vl.render();
    const chart = await promise;
    if (promise === this.rendering) {
      node.appendChild(this.chart = chart);
    }
  }

  dispose() {
    this.rendering = null;
    const view = this.chart && this.chart.value;
    if (view && 'function' === typeof view.finalize) view.finalize();
  }
}

export const vlDefault = (root, vl) => {
  const { data: { values } } = root.toJSON();
  const keys = Object.keys(values[0]);

  return root.mark({ type: 'point', filled: true })
    .encode(
      vl.x().fieldQ(keys[0]),
      vl.y().fieldQ(keys[1]),
    )
    .width(400)
    .height(200)
}

export const plot = (values, mapping = r => r) => {
  const root = vlDefault(vlApi.data({ values, name: 'source' }), vlApi);
  return {
    vl: mapping(root, vlApi),
    __EllxMeta__: { component: Plot }
  };
}

export { vlApi }
export { default as pretty } from '~ellx-hub/lib/components/Pretty/index.js';
export { default as parseCsv } from '~ellx-hub/lib/utils/csv.js';
export { weather } from './examples.js';
