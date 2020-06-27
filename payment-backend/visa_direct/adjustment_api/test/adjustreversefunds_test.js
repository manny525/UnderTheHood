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
var api = require('../src/adjustment_api').adjustment_api;
var authCredentials = require('../credentials.json');

var adjustment_api = new api(authCredentials);

// path invoked is '/visadirect/v1/adjustment';
adjustment_api.adjustreversefunds(getParameters())
    .then(function(result) {
        // Put your custom logic here
        console.log('\n Response: ' + JSON.stringify(result.response));
        console.log('\n Response Status: ' + JSON.stringify(result.response.statusCode));
        console.log('\n--------------- Above product is Visa Direct ---------------');
        console.log('\n--------------- API is Adjustment Api ---------------');
        console.log('\n--------------- EndPoint is adjustreversefunds ---------------');
        console.log('\n\n');
    })
    .catch(function(error) {
        console.log('\n Response: ' + JSON.stringify(error.response));
        console.log('\n Response Status: ' + JSON.stringify(error.response.statusCode));
        console.log('\n--------------- Above product is Visa Direct ---------------');
        console.log('\n--------------- API is Adjustment Api ---------------');
        console.log('\n--------------- EndPoint is adjustreversefunds ---------------');
        console.log('\n\n');
    });

function getParameters() {
    var parameters = {
        "x-client-transaction-id": "{enter appropriate value}",
        "Accept": "application/json",
        "Content-Type": "application/json"
    };
    parameters.payload = {
        "businessApplicationId": "AA",
        "senderCardExpiryDate": "2021-10",
        "retrievalReferenceNumber": "330019459216",
        "acquirerCountryCode": "840",
        "transactionIdentifier": "682147731933215",
        "systemsTraceAuditNumber": "459216",
        "cardAcceptor": {
            "idCode": "ABCD1234ABCD123",
            "address": {
                "county": "San Mateo",
                "country": "USA",
                "state": "CA",
                "zipCode": "94404"
            },
            "terminalId": "ABCD1234",
            "name": "Visa Inc."
        },
        "acquiringBin": "408999",
        "amount": "124.01",
        "senderCurrencyCode": "USD",
        "pointOfServiceData": {
            "posConditionCode": "0",
            "panEntryMode": "01",
            "motoECIIndicator": "0"
        },
        "senderPrimaryAccountNumber": "4485610000000127",
        "surcharge": "21.99"
    };
    parameters.payload.localTransactionDateTime = Date.now();

    return parameters;
}