import { createSlice } from "@reduxjs/toolkit";
import { emailTemplateAPIs } from "./emailTemplateApis";
import { resetDocument } from "@/components/email-builder/documents/editor/EditorContext";

type SearchResult = {
  name: string;
  id: string;
};

interface IinitialState {
  name: string | null;
  description: string | null;
  template_id: string | null;
  searchResults: SearchResult[];
}

const initialState: IinitialState = {
  name: null,
  description: null,
  template_id: null,
  searchResults: [],
};

const templateSlice = createSlice({
  name: "email-template",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addMatcher(
      emailTemplateAPIs.endpoints.getAnEmailTemplate.matchFulfilled,
      (state, action) => {
        state.description = action.payload.description;
        state.name = action.payload.name;
        state.template_id = action.payload.id;
        resetDocument(action.payload.json);
      }
    );
    builder.addMatcher(
      emailTemplateAPIs.endpoints.searchForTemplate.matchFulfilled,
      (state, action) => {
        state.searchResults = action.payload;
      }
    );
  },
});

export default templateSlice.reducer;
