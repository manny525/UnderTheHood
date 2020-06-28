const express = require('express')

const api = require('../../visa_direct/funds_transfer_api/src/funds_transfer_api').funds_transfer_api;
const authCredentials = require('../../visa_direct/funds_transfer_api/credentials.json');
const { response } = require('express');

const api_alias = require('../../visa_direct/visa_alias_directory_api/src/visa_alias_directory_api').visa_alias_directory_api;

const visa_alias_directory_api = new api_alias(authCredentials);

const funds_transfer_api = new api(authCredentials);

const router = new express.Router()

const auth = require('./../middleware/auth')

// path invoked is '/visadirect/fundstransfer/v1/pullfundstransactions';
// router.post('/pull', (req, res) => {
//     funds_transfer_api.pullfunds(getParameters())
//         .then(function (result) {
//             res.status(result.response.statusCode).send(result.response)
//         })
//         .catch(function (error) {
//             res.status(error.response.statusCode).send(error.response)
//         });

//     function getParameters() {
//         var parameters = {
//             "x-client-transaction-id": "gv123456tghyfrasdj123",
//             "Accept": "application/json",
//             "Content-Type": "application/json"
//         };
//         parameters.payload = {
//             "businessApplicationId": "AA",
//             "cpsAuthorizationCharacteristicsIndicator": "Y",
//             "senderCardExpiryDate": "2015-10",
//             "amount": "124.02",
//             "acquirerCountryCode": "840",
//             "retrievalReferenceNumber": "330000550000",
//             "cardAcceptor": {
//                 "name": "Acceptor 1",
//                 "terminalId": "TID-9999",
//                 "idCode": "CA-IDCode-77765",
//                 "address": {
//                     "country": "USA",
//                     "state": "CA",
//                     "zipCode": "94404"
//                 },
//             },
//             "acquiringBin": "408999",
//             "systemsTraceAuditNumber": "451001",
//             "nationalReimbursementFee": "11.22",
//             "senderCurrencyCode": "USD",
//             "cavv": "0700100038238906000013405823891061668252",
//             "foreignExchangeFeeTransaction": "11.99",
//             "addressVerificationData": {
//                 "postalCode": "12345",
//                 "street": "XYZ St"
//             },
//             "senderPrimaryAccountNumber": "4895142232120006",
//             "surcharge": "11.99"
//         };
//         parameters.payload.localTransactionDateTime = Date.now();

//         return parameters;
//     }
// })

// router.post('/push', (req, res) => {
//     funds_transfer_api.pushfunds(getParameters())
//         .then(function (result) {
//             res.status(result.response.statusCode).send(result.response)
//         })
//         .catch(function (error) {
//             res.status(error.response.statusCode).send(error.response)
//         });

//     function getParameters() {
//         var parameters = {
//             "x-client-transaction-id": "gv123456tghyfrasdj123",
//             "Accept": "application/json",
//             "Content-Type": "application/json"
//         };
//         parameters.payload = {
//             "systemsTraceAuditNumber": "451000",
//             "retrievalReferenceNumber": "330000550000",
//             "acquiringBin": "408999",
//             "acquirerCountryCode": "840",
//             "senderAccountNumber": "4895142232120006",
//             "senderCountryCode": "124",
//             "transactionCurrencyCode": "USD",
//             "senderName": "Mohammed Qasim",
//             "senderAddress": "901 Metro Center Blvd",
//             "senderCity": "Foster City",
//             "senderStateCode": "CA",
//             "recipientPrimaryAccountNumber": "4761360055652118",
//             "amount": "1200",
//             "merchantCategoryCode": "6012",
//             "businessApplicationId": "AA",
//             "transactionIdentifier": "740379596591403",
//             "sourceOfFundsCode": "05",
//             "cardAcceptor": {
//                 "name": "Acceptor 1",
//                 "terminalId": "TID-9999",
//                 "idCode": "CA-IDCode-77765",
//                 "address": {
//                     "country": "USA",
//                     "state": "CA",
//                     "zipCode": "94404"
//                 },
//             },
//             "recipientName": "rohan",
//             "senderReference": "",
//             "pointOfServiceData": {
//                 "panEntryMode": "90",
//                 "posConditionCode": "0",
//                 "motoECIIndicator": "0"
//             },
//         };
//         parameters.payload.localTransactionDateTime = Date.now();

//         return parameters;
//     }
// })

router.post('/createAlias',auth,(req, res) => {
    const username = req.user.merchantName.split(" ")
    visa_alias_directory_api.CreateAlias(getParameters())
        .then(function (result) {
            res.status(result.response.statusCode).send(result.response.body)
        })
        .catch(function (error) {
            res.status(error.response.statusCode).send(error.response.body)
        });

    function getParameters() {
        var parameters = {
            "x-client-transaction-id": "{enter appropriate value}",
            "Accept": "application/json",
            "Content-Type": "application/json"
        };
        parameters.payload = {
            "recipientMiddleName":username[1], 
            // "M",
            "city": "Nairobi",
            "recipientFirstName":username[0], 
            // "Jamie",
            "address1": req.user.location.lat,
            "address2": req.user.location.lon,
            "consentDateTime": "2018-03-01 01:02:03",
            "recipientPrimaryAccountNumber": req.body.recipientPrimaryAccountNumber,
            // "4895140000066666",
            "alias": "254711333888",
            "cardType":req.body.cardType, 
            // "Visa Classic",
            "recipientLastName":username[2], 
            // "Bakari",
            "country": "KE",
            "postalCode":req.user.location.postalCode, 
            // "00111",
            "issuerName":req.body.issuerName, 
            // "Test Bank 1",
            "guid":"574f4b6a4c2b70472f306f300099515a789092348832455975343637a4d3170",
            // req.user.email, 
            // 
            "aliasType": "01"
        };

        return parameters;
    }
})

// router.post('/getAlias', (req, res) => {
//     visa_alias_directory_api.GetAlias(getParameters())
//         .then(function (result) {
//             res.status(result.response.statusCode).send(result.response.body)
//         })
//         .catch(function (error) {
//             res.status(error.response.statusCode).send(error.response.body)
//         });

//     function getParameters() {
//         var parameters = {

//             "Accept": "application/json",
//             "Content-Type": "application/json"
//         };
//         parameters.payload = {
//             "guid": "2e126c28f09c76ed17944660f8bf593c1663909ac0291e4249d99372a71a0143"
//         };

//         return parameters;
//     }
// })

const getAlias = function(req,cb){
    visa_alias_directory_api.GetAlias(getParameters())
        .then(function (result) {
            cb(result.response.body,undefined)
        })
        .catch(function (error) {
            cb(undefined,error.response)
        });

    function getParameters() {
        var parameters = {
            "Accept": "application/json",
            "Content-Type": "application/json"
        };
        parameters.payload = {
            guid: req.guid
        };

        return parameters;
    }

}

const pullFunds = function(req,cb){
    funds_transfer_api.pullfunds(getParameters())
        .then(function (result) {
            cb(result.response,undefined)
            // res.status(result.response.statusCode).send(result.response)
        })
        .catch(function (error) {
            cb(undefined,error.response)
            // res.status(error.response.statusCode).send(error.response)
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

}

const pushFunds = function(req,cb){
    funds_transfer_api.pushfunds(getParameters())
        .then(function (result) {
            cb(result.response,undefined)
            // res.status(result.response.statusCode).send(result.response)
        })
        .catch(function (error) {
            cb(undefined,error.response)
            // res.status(error.response.statusCode).send(error.response)
        });

    function getParameters() {
        var parameters = {
            "x-client-transaction-id": "gv123456tghyfrasdj123",
            "Accept": "application/json",
            "Content-Type": "application/json"
        };
        parameters.payload = {
            "systemsTraceAuditNumber": "451000",
            "retrievalReferenceNumber": "330000550000",
            "acquiringBin": "408999",
            "acquirerCountryCode": "840",
            "senderAccountNumber":req.senderAccountNumber,
            //  "4895142232120006",
            "senderCountryCode": "124",
            "transactionCurrencyCode": "USD",
            "senderName":req.senderName,
            //  "Mohammed Qasim",
            "senderAddress": "901 Metro Center Blvd",
            "senderCity": "Foster City",
            "senderStateCode": "CA",
            "recipientPrimaryAccountNumber": req.recipientPrimaryAccountNumber,
            // "4761360055652118",
            "amount":req.amount, 
            // "1200",
            "merchantCategoryCode": "6012",
            "businessApplicationId": "AA",
            "transactionIdentifier": "740379596591403",
            "sourceOfFundsCode": "05",
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
            "recipientName":req.recipientName,
            //  "rohan",
            "senderReference": "",
            "pointOfServiceData": {
                "panEntryMode": "90",
                "posConditionCode": "0",
                "motoECIIndicator": "0"
            },
        };
        parameters.payload.localTransactionDateTime = Date.now();

        return parameters;
    }
}

module.exports = {
    getAlias,
    pullFunds,
    pushFunds,
    router,
}

// 2e126c28f09c76ed17944660f8bf593c1663909ac0291e4249d99372a71a0143


 