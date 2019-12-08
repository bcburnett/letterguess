export const logger = store => next => action => {
  if (window.process.env.NODE_ENV != 'production') {
    console.group(action.type);
    console.info('dispatching', action);
  }

  const result = next(action);

  if (window.process.env.NODE_ENV != 'production') {
    console.log('next state', store.getState());
    console.groupEnd(action.type);
  }

  return result;
};