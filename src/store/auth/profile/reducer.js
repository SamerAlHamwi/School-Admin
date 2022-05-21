import { REFRESH_HEADER } from './actionTypes'

const initialState = {
  fullname : 'Admin',
  avatar : '',
  isLogin : false
};

const profile = (state = initialState, action) => {
  console.log("token",action)
  switch (action.type) {
    case REFRESH_HEADER:
      if(action.payload.error) return { fullname : 'Admin', avatar : '', isLogin : false }
      return {
        fullname : action.payload.displayName,
        avatar : action.payload.image||"",
        isLogin : true
      }
      break;

  }
  return state;
};

export default profile;
