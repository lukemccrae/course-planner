
  export const addStop = (props) => {
    let updatedStops = props.stops;
    
    let newStop = {
      name: "New Stop",
      cals: 200,
      miles: 0,
      id: Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 8),
      comments: ""
    }

      props.updatedStops.push(newStop);
      props.setStops([...props.updatedStops])
  }


  export const delStop = (props) => {
    let updatedStops = props.stops;
    props.updatedStops.splice(props.index, 1)
    props.setStops([...props.updatedStops])
  }