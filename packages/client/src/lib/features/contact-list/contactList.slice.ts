import { createSlice } from "@reduxjs/toolkit";
import { contactListAPIs } from "./contactListApis";

interface ContactList {
  name: string;
  description: string;
  email_type: string;
  email_opt_in: string;
  template_id: string;
  first_name: string;
  last_name: string;
  updated_at: Date;
  created_at: string;
}
interface ContactI {}

interface ContactListSlice {
  contactList: ContactList | null;
  contacts: ContactI[];
}

const initialState: ContactListSlice = {
  contactList: null,
  contacts: [],
};

const contactListSlice = createSlice({
  name: "contact-list",
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addMatcher(
      contactListAPIs.endpoints.getAContactLists.matchFulfilled,
      (state, action) => {
        state.contactList = action.payload;
      }
    ),
      builder.addMatcher(
        contactListAPIs.endpoints.updateContactList.matchFulfilled,
        (state, action) => {
          state.contactList = action.payload;
        }
      );
    builder.addMatcher(
      contactListAPIs.endpoints.getContacts.matchFulfilled,
      (state, action) => {
        state.contacts = action.payload;
      }
    );
    builder.addMatcher(
      contactListAPIs.endpoints.addNewContact.matchFulfilled,
      (state, action) => {
        state.contacts = [action.payload, ...state.contacts];
      }
    );
  },
});

export default contactListSlice.reducer;
