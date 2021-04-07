const tokenReducer = (state = false, action) => {
    switch(action.type) {
        case 'STORE':
            console.log("storing token")
            return state;
        case 'REMOVE':
            console.log("removing token")
        case 'SEE':
            console.log("TOKENTOKEN")
        default:
            return state;
    }
}

export default tokenReducer;