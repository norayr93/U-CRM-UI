const createReducer = (defaultState, handlers) => (state = defaultState, action) => {
    if (Object.prototype.hasOwnProperty.call(handlers, action.type)) {
        return handlers[action.type](state, action);
    }
    return state;
};

export default createReducer;