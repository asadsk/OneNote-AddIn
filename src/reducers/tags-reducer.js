import { constants } from "../constants";
const initialState = {
  assetTags: null,
  staticTags: null,
  issuerTags: null,
  selectedAssetTags: null,
  selectedIssuerTags: null,
  selectedStaticTags: null,
  tagToBeDeleted: null,
  noteTemplates: null,
  templateFields: null,
  savedTags: null,
  activePageNoteId: null,
  pushNotesButtonState: null,
  templateId: null
};
export function tags(state = initialState, action) {
  switch (action.type) {
    case constants.LOAD_ASSET_TAGS:
      return {
        ...state,
        assetTags: action.assetTags
      };
    case constants.LOAD_ISSUER_TAGS:
      return {
        ...state,
        issuerTags: action.issuerTags
      };
    case constants.LOAD_STATIC_TAGS:
      return {
        ...state,
        staticTags: action.staticTags
      };
    case constants.ADD_ASSET_TAGS:
      return {
        ...state,
        selectedAssetTags: action.selectedAssetTags
      };
    case constants.ADD_ISSUER_TAGS:
      return {
        ...state,
        selectedIssuerTags: action.selectedIssuerTags
      };
    case constants.ADD_STATIC_TAGS:
      return {
        ...state,
        selectedStaticTags: action.selectedStaticTags
      };
    case constants.DELETE_TAG:
      return {
        ...state,
        tagToBeDeleted: action.tagToBeDeleted
      };
    case constants.SAVE_TEMPLATE_FIELDS:
      return {
        ...state,
        templateFields: action.templateFields
      };
    case constants.LOAD_ALL_TEMPLATES:
      return {
        ...state,
        noteTemplates: action.noteTemplates
      };
    case constants.STORE_SAVED_TAGS:
      return {
        ...state,
        savedTags: action.savedTags
      };
    case constants.SET_ACTIVE_PAGE_NOTE_ID:
      return {
        ...state,
        activePageNoteId: action.activePageNoteId
      };
    case constants.SET_PUSH_NOTES_BUTTON_STATE:
      return {
        ...state,
        pushNotesButtonState: action.pushNotesButtonState
      };
    case constants.SET_SELECTED_TEMPLATE:
      return {
        ...state,
        templateId: action.templateId
      };
    default:
      return state;
  }
}
