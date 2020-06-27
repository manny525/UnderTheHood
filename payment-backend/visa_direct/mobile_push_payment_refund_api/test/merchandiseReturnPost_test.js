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
var api = require('../src/mobile_push_payment_refund_api').mobile_push_payment_refund_api;
var authCredentials = require('../credentials.json');

var mobile_push_payment_refund_api = new api(authCredentials);

// path invoked is '/visadirect/mvisa/v1/mr';
mobile_push_payment_refund_api.merchandiseReturnPost(getParameters())
    .then(function(result) {
        // Put your custom logic here
        console.log('\n Response: ' + JSON.stringify(result.response));
        console.log('\n Response Status: ' + JSON.stringify(result.response.statusCode));
        console.log('\n--------------- Above product is Visa Direct ---------------');
        console.log('\n--------------- API is Mobile Push Payment Refund Api ---------------');
        console.log('\n--------------- EndPoint is merchandiseReturnPost ---------------');
        console.log('\n\n');
    })
    .catch(function(error) {
        console.log('\n Response: ' + JSON.stringify(error.response));
        console.log('\n Response Status: ' + JSON.stringify(error.response.statusCode));
        console.log('\n--------------- Above product is Visa Direct ---------------');
        console.log('\n--------------- API is Mobile Push Payment Refund Api ---------------');
        console.log('\n--------------- EndPoint is merchandiseReturnPost ---------------');
        console.log('\n\n');
    });

function getParameters() {
    var parameters = {
        "x-client-transaction-id": "{enter appropriate value}",
        "Accept": "application/json",
        "Content-Type": "application/json"
    };
    parameters.payload = {
        "recipientPrimaryAccountNumber": "4761360055652118",
        "merchantCategoryCode": "6012",
        "systemsTraceAuditNumber": "313223",
        "transactionCurrencyCode": "USD",
        "acquirerCountryCode": "643",
        "cardAcceptor": {
            "idCode": "ID-Code123",
            "name": "CA123",
            "address": {
                "country": "IND",
                "city": "Bangalore"
            }
        },
        "acquiringBin": "400171",
        "retrievalReferenceNumber": "430000367722",
        "amount": "124.05"
    };
    parameters.payload.localTransactionDateTime = Date.now();

    return parameters;
}