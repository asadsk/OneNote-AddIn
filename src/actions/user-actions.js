import { constants } from "../constants";
import { userService } from "../services";
import { alertActions } from "./";
import { history } from "../helpers";

export const userActions = {
    saveAssetTags,
    saveIssuerTags,
    saveStaticTags,
    addNewTag,
    deleteTag
};
function saveAssetTags(assetTags) {
    return ({ type: constants.SAVE_ASSET_TAGS, assetTags })
}

function saveIssuerTags(issuerTags) {
    return ({ type: constants.SAVE_ISSUER_TAGS, issuerTags })
}

function saveStaticTags(staticTags) {
    return ({ type: constants.SAVE_STATIC_TAGS, staticTags })
}

function addNewTag(savedTags) {
    return ({ type: constants.ADD_NEW_TAG, savedTags })
}

function deleteTag(tagToBeDeleted) {
    return ({ type: constants.DELETE_TAG, tagToBeDeleted })
}

