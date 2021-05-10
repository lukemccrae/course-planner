export const signIn = () => {
    return {
        type: 'SIGN_IN'
    }
}

export const signOut = () => {
    return {
        type: 'SIGN_OUT'
    }
}

export const storeToken = (token) => {
    console.log(token)
    return {
        type: 'STORE_TOKEN'
    }
}

export const seeToken = () => {
    return {
        type: 'SEE_TOKEN'
    }
}

export const removeToken = () => {
    return {
        type: 'REMOVE_TOKEN'
    }
}

export const getTimers = () => {
    return {
        type: 'GET_TIMERS'
    } 
}

export const setEmail = (e) => {
    console.log(e)
    return {
        type: 'SET_EMAIL',
        val: e
    }
}

export const setPassword = (e) => {
    console.log(e)
    return {
        type: 'SET_PASSWORD'
    }
}

export const storeData = (e) => {
    console.log(e)
    return {
        type: 'STORE_DATA'
    }
}