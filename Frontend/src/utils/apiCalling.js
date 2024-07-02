import { json } from "react-router-dom";
import { siteUrl } from "./config";

export const makeUnauthenticatedPOSTRequest = async (route, body) => {
    console.log(siteUrl+route);
    const response = await fetch(siteUrl+route, {method: 'POST', headers: {'content-type': 'application/json',}, body: JSON.stringify(body),});
    const formattedResponse = await response.json();

    return formattedResponse; 
};

export const makeAuthenticatedPOSTRequest = async (route, body) => {

    // token is saved in cookie so we have to extract it
    const token = getToken();
    console.log(token);

    const response = await fetch(siteUrl+route, {method: 'POST', headers: {'content-type': 'application/json', Authorization: `Bearer ${token}`,}, body: JSON.stringify(body),});

    console.log(response);
    const formattedResponse = await response.json();

    return formattedResponse;
}

export const makeAuthenticatedGETRequest = async (route) => {
    const token = getToken();
    const response = await fetch(siteUrl+route, {method: 'GET', headers: {'content-type': 'application/json', Authorization: `Bearer ${token}`,},});

    const formattedResponse = await response.json();

    return formattedResponse;
} 

function getToken () {
    const accessToken = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,"$1");
    return accessToken;
} 