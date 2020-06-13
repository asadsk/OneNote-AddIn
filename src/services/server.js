import { restApis } from "./rest-apis";

export const userService = {
  getAllAssetTags,
  getAllIssuerTags,
  getAllStaticTags,
  getOneNote
};

async function getAllAssetTags() {
  debugger;
  const assetTags = await restApis._getAll(
    "https://localhost:44329/api/OneNoteAddIn/FilteredPages"
  );

  return assetTags;
}

async function getAllIssuerTags() {
  debugger;
  const issuerTags = await restApis._getAll(
    "https://localhost:44329/api/OneNoteAddIn/FilteredPages"
  );

  return issuerTags;
}

async function getAllStaticTags() {
  debugger;
  const staticTags = await restApis._getAll(
    "https://localhost:44329/api/OneNoteAddIn/FilteredPages"
  );

  return staticTags;
}



async function getOneNote() {
  debugger;
  var payload = {
    Section: null,
    SectionGroup: null,
    NoteBook: null,
    Page: null
  };
  return await restApis._getAll(
    "https://localhost:44329/api/OneNote/FilteredPages"
  );
}
