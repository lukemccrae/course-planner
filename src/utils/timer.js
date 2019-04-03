export function addTimer() {
    const {
      timerName,
      timerLength
    } = this.state;

    const token = JSON.parse(localStorage.the_main_app).token;

    this.setState({
      isLoading: true,
    })

    fetch(`/timer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: timerName,
        length: timerLength,
        token: token
      })
    })
      .then(res => res.json())
      .then(json => {
        if(json.success) {
          this.setState({
            signUpError: json.message,
            isLoading: false,
            timerName: 'New Timer',
            timerLength: 60
          })
        } else {
          this.setState({
            timerError: json.message,
            isLoading: false
          })
        }
      });
}
