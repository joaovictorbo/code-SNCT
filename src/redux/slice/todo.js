import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Action
export const fetchTodos = createAsyncThunk("fetchTodos", async ( selectedPolo) => {
  if ((!!selectedPolo) && !(selectedPolo == -1 )){
    const response = await fetch("http://192.168.7.132:8000/Turma/" + `?serch=${selectedPolo}`);
    return response.json();

  }else{
    const response = await fetch("http://192.168.7.132:8000/Turma/");
    return response.json();

  }
});

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    isLoading: false,
    data: null,
    isError: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchTodos.rejected, (state, action) => {
      console.log("Error", action.payload);
      state.isError = true;
    });
  },
});

export default todoSlice.reducer;
