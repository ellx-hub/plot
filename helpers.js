export const label = (x, y) => (config) => { 
  if (x) {
    config.encoding.x.title = x;
  }
  if (y) {
    config.encoding.y.title = y;
  }
  
  return config;
};

export const color = (value) => (config) => { 
  const { mark } = config;
  config.mark = { ...(mark || {}), type: mark.type || mark, stroke: value };
   
  return config;
};
