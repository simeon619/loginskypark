import { configureStore, createSlice  } from '@reduxjs/toolkit';

const incriptionSlice = createSlice({
  name: 'inscription',
  initialState: {},
  reducers: {
    addInfo: (state : any, action) => {
      const newInfo = { ...action.payload };
      state.infoPerso = newInfo;
      console.log(state, 'store');
    },
    set_statut: (state: any, action) => {
      state.etat = action.payload
      console.log(state);
      
    },
  },
});

// const statutSlice = createSlice({
//   name: 'statut',
//   initialState: {},
//   reducers: {
//     getStaut: (state) => {
//       return state;
//     },
//     set_statut: (state: any, action) => {
//       state.etat = action.payload
//       console.log(state);
      
//     },
//   },
// });

export const store = configureStore({
  reducer: {
    incription: incriptionSlice.reducer,
  },
});

export const { addInfo , set_statut} = incriptionSlice.actions;
export type RootState = ReturnType<typeof store.getState>;
