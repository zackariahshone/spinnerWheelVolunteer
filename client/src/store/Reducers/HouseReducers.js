import { createSlice } from '@reduxjs/toolkit'

const initialState = {
}

export const houseSlice = createSlice({
  name: 'houseConfig',
  initialState,
  reducers: {
    setNewHouse: (state,action) => {
        state.isLoggedIn = action.payload.value
    },
    deleteHouse: (state,action) => {
        state.isLoggedIn = action.payload.value
        state.userData = null;
    },
    editHouse:(state,action)=>{
        state.userData = action.payload
    },
    setCurrentHouse:(state, action)=>{
        console.log(action);
        state.currentHouse = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setNewHouse, deleteHouse, editHouse, setCurrentHouse } = houseSlice.actions;
export const currentHouse = (state)=> state.houseState.currentHouse;
export default houseSlice.reducer