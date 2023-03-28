import { createSlice } from '@reduxjs/toolkit'

// deletUser, deleteHouse

export const adminSlice = createSlice({
  name: 'AdminState',
  initialState:{},
  reducers: {
    setAdminDashBoard: (state,action) => {
        state.adminData = action.payload.data
    },
    deleteUser:(state,action)=>{
      state.adminData = action.payload.data
    },
    deleteHouse:(state,action)=>{
      state.adminData = action.payload.data
    }
  },
})

// Action creators are generated for each case reducer function
export const { setAdminDashBoard,deleteHouse,deleteUser } = adminSlice.actions;
export const adminDataSet = (state)=> state?.adminState?.adminData;
export default adminSlice.reducer