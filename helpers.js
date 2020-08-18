export const aggregateOptions = new Set([
  "count",
  "valid",
  "missing",
  "distinct",
  "sum",
  "product",
  "mean",
  "average",
  "variance",
  "variancep",
  "stdev",
  "stdevp",
  "stderr",
  "median",
  "q1",
  "q3",
  "ci0",
  "ci1",
  "min",
  "max",
]);

export const aggregate = (type = 'sum', axis = 'x') => (config) => {
  if (!aggregateOptions.has(type)) {
    throw new Error('Unknown aggregate type');
  }
  
  if (axis !== 'x' && axis !== 'y') {
    throw new Error('Bad axis value');
  }
  
  config.encoding[axis].aggregate = type;
  
  return config;
}

export const label = (x, y) => (config) => { 
  if (x) {
    config.encoding.x.title = x;
  }
  if (y) {
    config.encoding.y.title = y;
  }
  
  return config;
};
