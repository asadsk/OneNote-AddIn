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

//const ADDIN_URL = "https://cfrms-onenote-uat.azurewebsites.net/api/OneNoteAddIn"
const ADDIN_URL = "https://localhost:5001" 

async function getAllAssetTags() {
  const assetTags = await restApis._getAll(
    `${ADDIN_URL}/GetAllAssetTags`
  );

  return assetTags;
}

async function getAllIssuerTags() {
  const issuerTags = await restApis._getAll(
    `${ADDIN_URL}/GetAllIssuerTags`
  );

  return issuerTags;
}

async function getAllStaticTags() {
  const staticTags = await restApis._getAll(
    `${ADDIN_URL}/GetAllStaticTags`
  );

  return staticTags;
}

async function getAllSavedTags(activePageId) {
  const staticTags = await restApis._get(
    `${ADDIN_URL}/GetAllSavedTags?` +
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
    `${ADDIN_URL}/SaveTags`,
    payload
  );

  return staticTags;
}

async function getAllTemplates() {
  const templates = await restApis._getAll(
    `${ADDIN_URL}/GetAllNoteTemplates`
  );

  return templates;
}

async function getTemplateFields(templateId) {
  const templates = await restApis._get(
    `${ADDIN_URL}/GetTemplateFields?` +
      new URLSearchParams({
        id: templateId
      })
  );

  return templates;
}

async function validateNotebookOwner(notebookId) {
  const result = await restApis._get(
    `${ADDIN_URL}/ValidateNoteBookOwner?` +
      new URLSearchParams({
        notebookId: notebookId
      })
  );

  return result;
}
