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

async function getAllAssetTags() {
  const assetTags = await restApis._getAll("https://localhost:5001/api/OneNoteAddIn/GetAllAssetTags");

  return assetTags;
}

async function getAllIssuerTags() {
  const issuerTags = await restApis._getAll("https://localhost:5001/api/OneNoteAddIn/GetAllIssuerTags");

  return issuerTags;
}

async function getAllStaticTags() {
  const staticTags = await restApis._getAll("https://localhost:5001/api/OneNoteAddIn/GetAllStaticTags");

  return staticTags;
}

async function getAllSavedTags(activePageId) {
  const staticTags = await restApis._get(
    "https://localhost:5001/api/OneNoteAddIn/GetAllSavedTags?" +
      new URLSearchParams({
        noteId: activePageId
      })
  );

  return staticTags;
}

async function saveTags(tags, webUrl, title) {
  const payload = {
    tags: tags,
    noteLink: webUrl,
    title: title
  };
  const staticTags = await restApis._post("https://localhost:5001/api/OneNoteAddIn/SaveTags", payload);

  return staticTags;
}

async function getAllTemplates() {
  const templates = await restApis._getAll("https://localhost:5001/api/OneNoteAddIn/GetAllNoteTemplates");

  return templates;
}

async function getTemplateFields(templateId) {
  const templates = await restApis._get(
    "https://localhost:5001/api/OneNoteAddIn/GetTemplateFields?" +
      new URLSearchParams({
        id: templateId
      })
  );

  return templates;
}

async function validateNotebookOwner(notebookId) {
  const result = await restApis._get(
    "https://localhost:5001/api/OneNoteAddIn/ValidateNoteBookOwner?" +
      new URLSearchParams({
        notebookId: notebookId
      })
  );

  return result;
}
