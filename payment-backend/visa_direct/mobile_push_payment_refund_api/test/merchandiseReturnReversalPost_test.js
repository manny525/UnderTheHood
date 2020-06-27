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

// path invoked is '/visadirect/mvisa/v1/mrr';
mobile_push_payment_refund_api.merchandiseReturnReversalPost(getParameters())
    .then(function(result) {
        // Put your custom logic here
        console.log('\n Response: ' + JSON.stringify(result.response));
        console.log('\n Response Status: ' + JSON.stringify(result.response.statusCode));
        console.log('\n--------------- Above product is Visa Direct ---------------');
        console.log('\n--------------- API is Mobile Push Payment Refund Api ---------------');
        console.log('\n--------------- EndPoint is merchandiseReturnReversalPost ---------------');
        console.log('\n\n');
    })
    .catch(function(error) {
        console.log('\n Response: ' + JSON.stringify(error.response));
        console.log('\n Response Status: ' + JSON.stringify(error.response.statusCode));
        console.log('\n--------------- Above product is Visa Direct ---------------');
        console.log('\n--------------- API is Mobile Push Payment Refund Api ---------------');
        console.log('\n--------------- EndPoint is merchandiseReturnReversalPost ---------------');
        console.log('\n\n');
    });

function getParameters() {
    var parameters = {
        "x-client-transaction-id": "{enter appropriate value}",
        "Accept": "application/json",
        "Content-Type": "application/json"
    };
    parameters.payload = {
        "acquiringBin": "830",
        "feeProgramIndicator": "aaa",
        "transactionFeeAmt": "2",
        "merchantVerificationValue": {
            "mvvAcquirerAssigned": "41394644363445313243",
            "mvvVisaAssigned": "41394644363445313243"
        },
        "acquirerCountryCode": "101",
        "transactionIdentifier": "381228649430011",
        "cardAcceptor": {
            "idCode": "VMT200911026070",
            "address": {
                "county": "kolkata",
                "country": "IND",
                "state": "KO",
                "zipCode": "94404"
            },
            "terminalId": "365539",
            "name": "Visa Inc. USA-Foster City"
        },
        "originalDataElements": {
            "acquiringBin": "408999",
            "systemsTraceAuditNumber": "897825",
            "approvalCode": "20304B",
            "transmissionDateTime": "2016-11-30T03:00:37"
        },
        "recipientPrimaryAccountNumber": "4898100000000245",
        "retrievalReferenceNumber": "330000550000",
        "systemsTraceAuditNumber": "451050",
        "senderCurrencyCode": "USD",
        "amount": "24.01"
    };
    parameters.payload.localTransactionDateTime = Date.now();

    return parameters;
}