import * as vega from 'vega';
import * as vegaLite from 'vega-lite';
import * as vlApi from 'vega-lite-api';
import * as vegaTooltip from 'vega-tooltip';
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
    renderer: "canvas",
  },
};

// register vega and vega-lite with the API
vlApi.register(vega, vegaLite, options);

export const vlDefault = vlApi.markPoint({filled: true})
	.encode(
    vlApi.x().fieldQ('0'),
    vlApi.y().fieldQ('1'),
  )
	.width(400)
  .height(200);

class Plot {
  constructor(props) {
    this.update(props);
  }
  
  update({ vl }) {
    this.vl = vl;
    const { data, ...spec } = vl.toJSON();
    
    if (this.canvas) {
      const view = this.canvas.value;
      if (!view) {
        console.error('Vega Lite view is missing on the canvas node');
        return;
      }

      if (!eq(spec, this.spec)) {
        view.finalize();
        this.render(this.canvas.parentNode);
        
        this.canvas.parentNode.removeChild(this.canvas);
        this.canvas = null;
      }
      else {
        console.log('LIGHT UODATE');
        view.data('source', data.values).run();
      }
    }
    this.spec = spec;    
  }
  
  async render(node) {
    this.canvas = await this.vl.render();
    node.appendChild(this.canvas);
  }
  
  dispose() {
    const view = this.canvas && this.canvas.value;
    if (view) view.finalize();
  }
}

export const plot = (values, mapping = i => i) => ({
  vl: mapping(vlDefault.data({ name: 'source', values })),
  __EllxMeta__: {
    component: Plot
  }
});

export const markOptions = [
  "area", "bar", "circle", "line", "point", "rect", "rule", "square", "text", "tick"
];
