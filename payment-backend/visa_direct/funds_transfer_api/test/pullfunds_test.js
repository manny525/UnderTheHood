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
var api = require('../src/funds_transfer_api').funds_transfer_api;
var authCredentials = require('../credentials.json');

var funds_transfer_api = new api(authCredentials);

// path invoked is '/visadirect/fundstransfer/v1/pullfundstransactions';
funds_transfer_api.pullfunds(getParameters())
    .then(function(result) {
        console.log('\n Response: ' + JSON.stringify(result.response.body));
        console.log('\n Response Status: ' + JSON.stringify(result.response.statusCode));
    })
    .catch(function(error) {
        console.log('\n Response: ' + JSON.stringify(error.response.body));
        console.log('\n Response Status: ' + JSON.stringify(error.response.statusCode));
    });

function getParameters() {
    var parameters = {
        "x-client-transaction-id": "gv123456tghyfrasdj123",
        "Accept": "application/json",
        "Content-Type": "application/json"
    };
    parameters.payload = {
        "businessApplicationId": "AA",
        "cpsAuthorizationCharacteristicsIndicator": "Y",
        "senderCardExpiryDate": "2015-10",
        "amount": "124.02",
        "acquirerCountryCode": "840",
        "retrievalReferenceNumber": "330000550000",
        "cardAcceptor": {
            "name": "Acceptor 1",
            "terminalId": "TID-9999",
            "idCode": "CA-IDCode-77765",
            "address": {
                "country": "USA",
                "state": "CA",
                "zipCode": "94404"
            },
        },
        "acquiringBin": "408999",
        "systemsTraceAuditNumber": "451001",
        "nationalReimbursementFee": "11.22",
        "senderCurrencyCode": "USD",
        "cavv": "0700100038238906000013405823891061668252",
        "foreignExchangeFeeTransaction": "11.99",
        "addressVerificationData": {
            "postalCode": "12345",
            "street": "XYZ St"
        },
        "senderPrimaryAccountNumber": "4895142232120006",
        "surcharge": "11.99"
    };
    parameters.payload.localTransactionDateTime = Date.now();

    return parameters;
}