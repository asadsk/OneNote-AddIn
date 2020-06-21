import { constants } from "../constants";
const initialState = {
    assetTags: null,
    staticTags: null,
    issuerTags: null,
    savedTags: null,
    tagToBeDeleted: null
};
export function tags(state = initialState, action) {
    switch (action.type) {
        case constants.SAVE_ASSET_TAGS:
            debugger;
            return {
                ...state,
                assetTags: action.assetTags
            };
        case constants.SAVE_ISSUER_TAGS:
            return {
                ...state,
                issuerTags: action.issuerTags
            };
        case constants.SAVE_STATIC_TAGS:
            return {
                ...state,
                staticTags: action.staticTags
            };
        case constants.ADD_NEW_TAG:
            debugger;
            return {
                ...state,
                savedTags: action.savedTags
            };
        case constants.DELETE_TAG:
            return {
                ...state,
                tagToBeDeleted: action.tagToBeDeleted
            };
        default:
            return state;
    }
}
