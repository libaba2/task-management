let initState = {
    loading: false
}

exports.reducer = (state = initState, action) => {
    switch (action.type) {
        case 'SET_REQLOADING':
            return {
                ...state,
                kk: false,
                loading: action.value
            }
        default:
            return state;
    }
}