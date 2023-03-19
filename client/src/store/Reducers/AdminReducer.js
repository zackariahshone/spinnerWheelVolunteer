import { createSlice } from '@reduxjs/toolkit'



export const adminSlice = createSlice({
  name: 'AdminState',
  initialState:{},
  reducers: {
    setAdminDashBoard: (state,action) => {
        console.log(action)
        state.adminData = action.payload.data
    },
  },
})

// Action creators are generated for each case reducer function
export const { setAdminDashBoard } = adminSlice.actions;
export const adminDataSet = (state)=> state?.adminState?.adminData;
export default adminSlice.reducer