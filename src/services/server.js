import { restApis } from "./rest-apis";

export const userService = {
  getAllAssetTags,
  getAllIssuerTags,
  getAllStaticTags,
  SaveNoteInfo,
  getAllTemplates,
  getTemplateFields,
  getAllSavedTags,
  validateNotebookOwner,
  saveTemplateNoteMap
};

async function getAllAssetTags() {
  const assetTags = await restApis._getAll(
    "https://cfrms-onenote-uat.azurewebsites.net/api/OneNoteAddIn/GetAllAssetTags"
  );

  return assetTags;
}

async function getAllIssuerTags() {
  const issuerTags = await restApis._getAll(
    "https://cfrms-onenote-uat.azurewebsites.net/api/OneNoteAddIn/GetAllIssuerTags"
  );

  return issuerTags;
}

async function getAllStaticTags() {
  const staticTags = await restApis._getAll(
    "https://cfrms-onenote-uat.azurewebsites.net/api/OneNoteAddIn/GetAllStaticTags"
  );

  return staticTags;
}

async function getAllSavedTags(activePageId) {
  const savedTags = await restApis._get(
    "https://cfrms-onenote-uat.azurewebsites.net/api/OneNoteAddIn/GetAllSavedTags?" +
      new URLSearchParams({
        noteId: activePageId
      })
  );

  return savedTags;
}

async function SaveNoteInfo(tags, webUrl, title, noteId, templateId) {
  const payload = {
    tags: tags,
    noteLink: webUrl,
    title: title,
    pageId: noteId,
    templateId: templateId
  };
  const savedTags = await restApis._post(
    "https://cfrms-onenote-uat.azurewebsites.net/api/OneNoteAddIn/SaveNoteInfo",
    payload
  );

  return savedTags;
}

async function getAllTemplates() {
  const templates = await restApis._getAll(
    "https://cfrms-onenote-uat.azurewebsites.net/api/OneNoteAddIn/GetAllNoteTemplates"
  );

  return templates;
}

async function getTemplateFields(templateId) {
  const templates = await restApis._get(
    "https://cfrms-onenote-uat.azurewebsites.net/api/OneNoteAddIn/GetTemplateFields?" +
      new URLSearchParams({
        id: templateId
      })
  );

  return templates;
}

async function validateNotebookOwner(notebookId) {
  const result = await restApis._get(
    "https://cfrms-onenote-uat.azurewebsites.net/api/OneNoteAddIn/ValidateNoteBookOwner?" +
      new URLSearchParams({
        notebookId: notebookId
      })
  );

  return result;
}

async function saveTemplateNoteMap(templateId, noteId) {
  const payload = {
    templateId: templateId,
    noteId: noteId
  };
  await restApis._post("https://cfrms-onenote-uat.azurewebsites.net/api/OneNoteAddIn/SaveTemplateNoteMap", payload);
}
