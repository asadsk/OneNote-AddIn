import { restApis } from "./rest-apis";

export const userService = {
  getAllAssetTags,
  getAllIssuerTags,
  getAllStaticTags,
  saveTags,
  getAllTemplates,
  getTemplateFields,
  getAllSavedTags,
  validateNotebookOwner
};

//UAT
const ADDIN_URL = "https://cfrms-onenote-uat.azurewebsites.net"

//PROD
//const ADDIN_URL = "https://cfrms-onenote.azurewebsites.net"

//LOCAL
//const ADDIN_URL = "https://localhost:5001" 

async function getAllAssetTags() {
  const assetTags = await restApis._getAll(
    `${ADDIN_URL}/api/OneNoteAddIn/GetAllAssetTags`
  );

  return assetTags;
}

async function getAllIssuerTags() {
  const issuerTags = await restApis._getAll(
    `${ADDIN_URL}/api/OneNoteAddIn/GetAllIssuerTags`
  );

  return issuerTags;
}

async function getAllStaticTags() {
  const staticTags = await restApis._getAll(
    `${ADDIN_URL}/api/OneNoteAddIn/GetAllStaticTags`
  );

  return staticTags;
}

async function getAllSavedTags(activePageId) {
  const staticTags = await restApis._get(
    `${ADDIN_URL}/api/OneNoteAddIn/GetAllSavedTags?` +
      new URLSearchParams({
        noteId: activePageId
      })
  );

  return staticTags;
}

async function saveTags(tags, webUrl, title, noteId) {
  const payload = {
    tags: tags,
    noteLink: webUrl,
    title: title,
    pageId: noteId
  };
  const staticTags = await restApis._post(
    `${ADDIN_URL}/api/OneNoteAddIn/SaveTags`,
    payload
  );

  return staticTags;
}

async function getAllTemplates() {
  const templates = await restApis._getAll(
    `${ADDIN_URL}/api/OneNoteAddIn/GetAllNoteTemplates`
  );

  return templates;
}

async function getTemplateFields(templateId) {
  const templates = await restApis._get(
    `${ADDIN_URL}/api/OneNoteAddIn/GetTemplateFields?` +
      new URLSearchParams({
        id: templateId
      })
  );

  return templates;
}

async function validateNotebookOwner(notebookId) {
  const result = await restApis._get(
    `${ADDIN_URL}/api/OneNoteAddIn/ValidateNoteBookOwner?` +
      new URLSearchParams({
        notebookId: notebookId
      })
  );

  return result;
}
