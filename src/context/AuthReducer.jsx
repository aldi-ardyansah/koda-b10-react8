
const initialState = {
  user: null,
  accounts: []
};

export function authReducer(state, action) {
  switch (action.type) {
    case "REGISTER":
      return {
        ...state,
        accounts: [...state.accounts, action.payload],
        user: {
          username: action.payload.username,
          photo: action.payload.photo || ""
        }
      };

    case "LOGIN":
      return {
        ...state,
        user: action.payload
      };

    case "UPDATE_PROFILE":
      return {
        ...state,
        accounts: state.accounts.map((account) =>
          account.username === state.user.username
            ? action.payload
            : account
        ),
        user: {
          username: action.payload.username,
          photo: action.payload.photo || ""
        }
      };

    case "LOGOUT":
      return {
        ...state,
        user: null
      };

    default:
      return state;
  }
}

export { initialState };
