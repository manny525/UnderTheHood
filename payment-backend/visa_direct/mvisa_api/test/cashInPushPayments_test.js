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
var api = require('../src/mvisa_api').mvisa_api;
var authCredentials = require('../credentials.json');

var mvisa_api = new api(authCredentials);

// path invoked is '/visadirect/mvisa/v1/cashinpushpayments';
mvisa_api.cashInPushPayments(getParameters())
    .then(function(result) {
        // Put your custom logic here
        console.log('\n Response: ' + JSON.stringify(result.response));
        console.log('\n Response Status: ' + JSON.stringify(result.response.statusCode));
        console.log('\n--------------- Above product is Visa Direct ---------------');
        console.log('\n--------------- API is Mvisa Api ---------------');
        console.log('\n--------------- EndPoint is cashInPushPayments ---------------');
        console.log('\n\n');
    })
    .catch(function(error) {
        console.log('\n Response: ' + JSON.stringify(error.response));
        console.log('\n Response Status: ' + JSON.stringify(error.response.statusCode));
        console.log('\n--------------- Above product is Visa Direct ---------------');
        console.log('\n--------------- API is Mvisa Api ---------------');
        console.log('\n--------------- EndPoint is cashInPushPayments ---------------');
        console.log('\n\n');
    });

function getParameters() {
    var parameters = {
        "x-client-transaction-id": "{enter appropriate value}",
        "Accept": "application/json",
        "Content-Type": "application/json"
    };
    parameters.payload = {
        "senderAccountNumber": "4541237895236",
        "businessApplicationId": "CI",
        "merchantCategoryCode": "6012",
        "transactionCurrencyCode": "840",
        "acquiringBin": "400171",
        "acquirerCountryCode": "643",
        "retrievalReferenceNumber": "430000367618",
        "senderReference": "1234",
        "cardAcceptor": {
            "idCode": "ID-Code123",
            "name": "Test Merchant",
            "address": {
                "country": "IN",
                "city": "Bangalore"
            }
        },
        "recipientPrimaryAccountNumber": "4123640062698797",
        "systemsTraceAuditNumber": "313042",
        "amount": "124.05",
        "senderName": "Mohammed Qasim"
    };
    parameters.payload.localTransactionDateTime = Date.now();

    return parameters;
}