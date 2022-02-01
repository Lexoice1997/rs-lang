
const initialState = {
    
};

const RegistrationReducer = (state=initialState, action:any)=>{
   switch (action.type) {
       case '':
           return {
               ...state,
               
           };
       default: return state
   }
};

export default RegistrationReducer