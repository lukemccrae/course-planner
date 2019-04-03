export function getFromStorage(key) {
  if(!key) {
    return null;
  }

  try {
    const valueStr = localStorage.getItem(key);
    if(valueStr) {
      return JSON.parse(valueStr);
    }
    return null;
  } catch(err) {
    return null;
  }

}

export function logout(hey) {
  console.log('hihihi');
  this.setState({
    isLoading: true
  })
  const obj = getFromStorage('the_main_app');
  if(obj && obj.token) {
    //verify token
    fetch('/api/account/logout?token=' + obj.token)
      .then(res => res.json())
      .then(json => {
        if(json.success) {
          this.setState({
            token: '',
            isLoading: false
          })
        } else {
          this.setState({
            isLoading: false
          })
        }
      });
  } else {
    this.setState({
      isLoading: false,
    })
  }
}

export function setInStorage(key, obj) {
  if(!key) {
    console.error('error: key is missing');
  }
  try {
    localStorage.setItem(key, JSON.stringify(obj))
  } catch(err) {
    console.error(err)
  }
}
