import { createSlice } from '@reduxjs/toolkit'

const initialState = {
}

export const spinnerSlice = createSlice({
  name: 'spinnerState',
  initialState,
  reducers: {
    setSpinner: (state,action) => {
        state.spinnerValues = action.payload.value
    },
  },
})

// Action creators are generated for each case reducer function
export const { setSpinner } = spinnerSlice.actions;
export const spinnerSetting = (state)=> state.spinnerState.spinnerValues;
export default spinnerSlice.reducer