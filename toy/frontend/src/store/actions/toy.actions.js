import { toyService } from "../../services/toy-service.js";

export function loadToys(filterBy, sortBy) {
console.log("🚀 ~ file: toy.actions.js ~ line 4 ~ loadToys ~ sortBy", sortBy)
console.log("🚀 ~ file: toy.actions.js ~ line 4 ~ loadToys ~ filterBy", filterBy)
  
  return (dispatch) => {
    // dispatch({ type: 'LOADING_TOYS', isLoading: true })
    return toyService.query(filterBy, sortBy)
      .then((toys) => {
        // console.log ('toys =',toys)
        const action = {
          type: "SET_TOYS",
          toys,
        };
        dispatch(action);
      })
      .catch((err) => {
        dispatch({ type: "TOY_ERR", err });
      });
  };
}
export function addToy(toy) {
  return (dispatch) => {
    return toyService.save(toy)
      .then((toy) => {
        const action = {
          type: "ADD_TOY",
          toy,
        };
        dispatch(action);
      })
      .catch((err) => {
        dispatch({ type: "TOY_ERR", err });
      });
  };
}
export function removeToy(id) {
  console.log("id =", id);
  return (dispatch) => {
    return toyService.remove(id)
      .then(() => {
        const action = {
          type: "REMOVE_TOY",
          id,
        };
        dispatch(action);
      })
      .catch((err) => {
        dispatch({ type: "TOY_ERR", err });
      });
  };
}

export function updateToy(updatedToy) {
  console.log('action will update toy')
  return (dispatch) => {
    return toyService.save(updatedToy)
      .then((toy) => {
        const action = {
          type: "UPDATE_TOY",
          toy,
        };
        dispatch(action);
      })
      .catch((err) => {
        dispatch({ type: "TOY_ERR", err });
      });
  };

}


export function toggleFavourite(id) {
  // console.log("id =", id);
  return (dispatch) => {
    return toyService.toggleFavourite(id)
      .then((toy) => {
        console.log ('toy =',toy)
        const action = {
          type: "UPDATE_TOY",
          toy,
        };
        dispatch(action);
      })
      .catch((err) => {
        dispatch({ type: "TOY_ERR", err });
      });
  };
}
