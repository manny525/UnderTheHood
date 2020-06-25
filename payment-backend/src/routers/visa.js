const express = require('express')

const api = require('../../visa_direct/funds_transfer_api/src/funds_transfer_api').funds_transfer_api;
const authCredentials = require('../../visa_direct/funds_transfer_api/credentials.json');

const api_alias = require('../../visa_direct/visa_alias_directory_api/src/visa_alias_directory_api').visa_alias_directory_api;

const visa_alias_directory_api = new api_alias(authCredentials);

const funds_transfer_api = new api(authCredentials);

const router = new express.Router()

// path invoked is '/visadirect/fundstransfer/v1/pullfundstransactions';
router.post('/pull', (req, res) => {
    funds_transfer_api.pullfunds(getParameters())
        .then(function (result) {
            // Put your custom logic here
            res.status(result.response.statusCode).send(result.response)
        })
        .catch(function (error) {
            res.status(error.response.statusCode).send(error.response)
        });

    function getParameters() {
        var parameters = {
            "x-client-transaction-id": "{enter appropriate value}",
            "Accept": "application/json",
            "Content-Type": "application/json"
        };
        parameters.payload = {
            "systemsTraceAuditNumber": "451001",
            "retrievalReferenceNumber": "330000550000",
            "acquiringBin": "408999",
            "acquirerCountryCode": "840",
            "senderPrimaryAccountNumber": "4895142232120006",
            "senderCardExpiryDate": "2015-10",
            //card cvv2
            "amount": "124.02",
            "cardAcceptor": {
                "idCode": "ABCD1234ABCD123",
                "address": {
                    "county": "081",
                    "country": "USA",
                    "state": "CA",
                    "zipCode": "94404"
                },
                "terminalId": "ABCD1234",
                "name": "Visa Inc. USA-Foster City"
            },
            "businessApplicationId": "AA",
            "senderCurrencyCode": "USD",
            "cavv": "0700100038238906000013405823891061668252",
            "addressVerificationData": {
                "postalCode": "12345",
                "street": "XYZ St"
            }
        };
        parameters.payload.localTransactionDateTime = Date.now();

        return parameters;
    }
})

router.post('/push', (req, res) => {
    funds_transfer_api.pushfunds(getParameters())
        .then(function (result) {
            res.status(result.response.statusCode).send(result.response)
        })
        .catch(function (error) {
            res.status(error.response.statusCode).send(error.response)
        });

    function getParameters() {
        var parameters = {
            "x-client-transaction-id": "{enter appropriate value}",
            "Accept": "application/json",
            "Content-Type": "application/json"
        };
        parameters.payload = {
            "systemsTraceAuditNumber": "451018",
            "retrievalReferenceNumber": "412770451018",
            "acquiringBin": "408999",
            "acquirerCountryCode": "840",
            "transactionCurrencyCode": "USD",
            "recipientPrimaryAccountNumber": "4957030420210496",
            "amount": "124.05",
            "businessApplicationId": "AA",
            "merchantCategoryCode": "6012",
            "transactionIdentifier": "381228649430015",
            "sourceOfFundsCode": "05",
            "cardAcceptor": {
                "idCode": "CA-IDCode-77765",
                "address": {
                    "county": "San Mateo",
                    "country": "USA",
                    "state": "CA",
                    "zipCode": "94404"
                },
                "terminalId": "TID-9999",
                "name": "Visa Inc. USA-Foster City"
            },
            "pointOfServiceData": {
                "posConditionCode": "00",
                "panEntryMode": "90",
                "motoECIIndicator": "0"
            },
            "senderName": "Mohammed Qasim",
            "senderStateCode": "CA",
            "senderAccountNumber": "4653459515756154",
            "senderCity": "Foster City",
            "senderCountryCode": "124"
        };
        parameters.payload.localTransactionDateTime = Date.now();

        return parameters;
    }
})

router.post('/createAlias', (req, res) => {
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
            "recipientMiddleName": "M",
            "city": "Nairobi",
            "recipientFirstName": "Jamie",
            "address1": "Street 1",
            "address2": "Region 1",
            "consentDateTime": "2018-03-01 01:02:03",
            "recipientPrimaryAccountNumber": "4895140000066666",
            "alias": "254711333888",
            "cardType": "Visa Classic",
            "recipientLastName": "Bakari",
            "country": "KE",
            "postalCode": "00111",
            "issuerName": "Test Bank 1",
            "guid": "574f4b6a4c2b70472f306f300099515a789092348832455975343637a4d3170",
            "aliasType": "01"
        };

        return parameters;
    }
})

router.post('/getAlias', (req, res) => {
    visa_alias_directory_api.GetAlias(getParameters())
    .then(function (result) {
        res.status(result.response.statusCode).send(result.response.body)
    })
    .catch(function (error) {
        res.status(error.response.statusCode).send(error.response.body)
    });

    function getParameters() {
        var parameters = {

            "Accept": "application/json",
            "Content-Type": "application/json"
        };
        parameters.payload = {
            "guid": "2e126c28f09c76ed17944660f8bf593c1663909ac0291e4249d99372a71a0143"
        };

        return parameters;
    }
})

module.exports = router