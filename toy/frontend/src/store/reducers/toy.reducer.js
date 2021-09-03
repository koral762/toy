const initialState = {
  toys: [],
};

export function toyReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_TOYS':
      // console.log ('reducer =',action.toys)
      return { ...state, toys: action.toys, isLoading: false };
    case 'ADD_TOY':
      return {...state, toys: [action.toy, ...state.toys]};
    case 'UPDATE_TOY':
        console.log ('action =',action)
      return {...state, toys: state.toys.map((toy)=> toy._id === action.toy._id? action.toy: toy )}

    case 'REMOVE_TOY':
        // console.log ('action =',action)
      return {...state, toys: state.toys.filter((toy) => toy._id !== action.id)};
    default:
      return state;
  }
}