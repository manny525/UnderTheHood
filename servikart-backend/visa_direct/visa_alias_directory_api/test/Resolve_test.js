/* ----------------------------------------------------------------------------------------------------------------------
* © Copyright 2018 Visa. All Rights Reserved.
*
* NOTICE: The software and accompanying information and documentation (together, the “Software”) remain the property of
* and are proprietary to Visa and its suppliers and affiliates. The Software remains protected by intellectual property
* rights and may be covered by U.S. and foreign patents or patent applications. The Software is licensed and not sold.
*
* By accessing the Software you are agreeing to Visa's terms of use (developer.visa.com/terms) and privacy policy
* (developer.visa.com/privacy). In addition, all permissible uses of the Software must be in support of Visa products,
* programs and services provided through the Visa Developer Program (VDP) platform only (developer.visa.com).
* THE SOFTWARE AND ANY ASSOCIATED INFORMATION OR DOCUMENTATION IS PROVIDED ON AN “AS IS,” “AS AVAILABLE,” “WITH ALL
* FAULTS” BASIS WITHOUT WARRANTY OR CONDITION OF ANY KIND. YOUR USE IS AT YOUR OWN RISK.
---------------------------------------------------------------------------------------------------------------------- */

'use strict';
var api = require('../src/visa_alias_directory_api').visa_alias_directory_api;
var authCredentials = require('../credentials.json');

var visa_alias_directory_api = new api(authCredentials);

// path invoked is '/visaaliasdirectory/v1/resolve';
const resolve = function(req,cb){
    visa_alias_directory_api.Resolve(getParameters())
    .then(function(result) {
        cb(result.response,undefined)
    })
    .catch(function(error) {
        cb(undefined,error.response)
    });

    function getParameters() {
        var parameters = {
            "x-client-transaction-id": "{enter appropriate value}",
            "Accept": "application/json",
            "Content-Type": "application/json"
        };
        parameters.payload = {
            "alias": req.email,
            "businessApplicationId": "PP"
        }
        return parameters;
    }
}

module.exports = resolve