import { siteUrl } from "./config";

export const makeUnauthenticatedPOSTRequest = async (route, body) => {
    const response = await fetch(siteUrl+route, {method: 'POST', headers: {'content-type': 'application/json',}, body: JSON.stringify(body),});
    const formattedResponse = await response.json();

    return formattedResponse; 
};