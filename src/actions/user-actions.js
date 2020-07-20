import { constants } from "../constants";
import { userService } from "../services";
import { alertActions } from "./";
import { history } from "../helpers";

export const userActions = {
  loadAssetTags,
  loadIssuerTags,
  loadStaticTags,
  addAssetTags,
  addIssuerTags,
  addStaticTags,
  deleteTag,
  loadAllNoteTemplates,
  saveTemplateFields,
  storeSavedTags,
  setActivePageNoteId,
  setPushNotesButtonState
};
function loadAssetTags(assetTags) {
  return { type: constants.LOAD_ASSET_TAGS, assetTags };
}

function loadIssuerTags(issuerTags) {
  return { type: constants.LOAD_ISSUER_TAGS, issuerTags };
}

function loadStaticTags(staticTags) {
  return { type: constants.LOAD_STATIC_TAGS, staticTags };
}

function addAssetTags(selectedAssetTags) {
  return { type: constants.ADD_ASSET_TAGS, selectedAssetTags };
}

function addIssuerTags(selectedIssuerTags) {
  return { type: constants.ADD_ISSUER_TAGS, selectedIssuerTags };
}

function addStaticTags(selectedStaticTags) {
  return { type: constants.ADD_STATIC_TAGS, selectedStaticTags };
}

function deleteTag(tagToBeDeleted) {
  return { type: constants.DELETE_TAG, tagToBeDeleted };
}

function loadAllNoteTemplates(noteTemplates) {
  return { type: constants.LOAD_ALL_TEMPLATES, noteTemplates };
}

function saveTemplateFields(templateFields) {
  return { type: constants.SAVE_TEMPLATE_FIELDS, templateFields };
}

function storeSavedTags(savedTags) {
  return { type: constants.STORE_SAVED_TAGS, savedTags };
}

function setActivePageNoteId(noteId) {
  return { type: constants.SET_ACTIVE_PAGE_NOTE_ID, noteId };
}

function setPushNotesButtonState(pushNotesButtonState) {
  return { type: constants.SET_PUSH_NOTES_BUTTON_STATE, pushNotesButtonState };
}
