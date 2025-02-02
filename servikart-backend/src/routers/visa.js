const express = require('express')

const api = require('../../visa_direct/funds_transfer_api/src/funds_transfer_api').funds_transfer_api;
const authCredentials = require('../../visa_direct/funds_transfer_api/credentials.json');
const { response } = require('express');

const api_alias = require('../../visa_direct/visa_alias_directory_api/src/visa_alias_directory_api').visa_alias_directory_api;
const visa_alias_directory_api = new api_alias(authCredentials);
const funds_transfer_api = new api(authCredentials);
const router = new express.Router()
const auth = require('./../middleware/auth')
const inquiry = require('./../../funds_transfer_attributes_inquiry_api/test/fundstransferinquiry_test')
const randomize = require('randomatic')

const createAlias = async (req, res, next) => {
    console.log(req.body)
    try {
        const username = req.body.merchantName.split(" ")
        var data = undefined
        inquiry({ pan: req.body.pan }, function (data, e) {
            if (e) {
                res.status(500).send({ error: e })
            }
            visa_alias_directory_api.CreateAlias(getParameters())
                .then(function (result) {
                    console.log(result.body)
                    next()
                })
                .catch(function (error) {
                    console.log(error.response)
                    res.status(error.response.statusCode).send(error.response.body)
                });
            function getParameters() {
                const random = randomize('a0', 60)
                var parameters = {
                    "x-client-transaction-id": "{enter appropriate value}",
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                };
                parameters.payload = {
                    "recipientFirstName": username[0],
                    "consentDateTime": "2018-03-01 01:02:03",
                    "recipientPrimaryAccountNumber": req.body.pan,
                    "alias": req.body.email,
                    "cardType": data.body.visaNetworkInfo[0].cardTypeCode,
                    "recipientLastName": username[1],
                    "country": "IND",
                    "issuerName": data.body.visaNetworkInfo[0].issuerName,
                    "guid": random,
                    "aliasType": "02"
                };
                return parameters;
            }
        })
    } catch (e) {
        res.status(500).send({ error: e })
    }
}


const getAlias = function (req, cb) {
    visa_alias_directory_api.GetAlias(getParameters())
        .then(function (result) {
            cb(result.response.body, undefined)
        })
        .catch(function (error) {
            cb(undefined, error.response)
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

const pullFunds = function (req, cb) {
    funds_transfer_api.pullfunds(getParameters())
        .then(function (result) {
            cb(result.response, undefined)
            // res.status(result.response.statusCode).send(result.response)
        })
        .catch(function (error) {
            console.log(error.response)
            cb(undefined, error.response)
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
            "senderCardExpiryDate": "2020-03",
            "amount": "100",
            // "124.02",
            "acquirerCountryCode": "840",
            "retrievalReferenceNumber": "330000550000",
            "cardAcceptor": {
                "name": "Acceptor 9",
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
            //  "4895142232120006",
            "surcharge": "11.99"
        };
        parameters.payload.localTransactionDateTime = Date.now();

        return parameters;
    }

}

const pushFunds = function (req, cb) {
    console.log(req.body)
    funds_transfer_api.pushfunds(getParameters())
        .then(function (result) {
            cb(result.response, undefined)
            // res.status(result.response.statusCode).send(result.response)
        })
        .catch(function (error) {
            cb(undefined, error.response)
            // res.status(error.response.statusCode).send(error.response)
        });

    function getParameters() {
        var parameters = {
            "x-client-transaction-id": "gv123456tghyfasdgft123grt",
            "Accept": "application/json",
            "Content-Type": "application/json"
        };
        parameters.payload = {
            "businessApplicationId": "AA",
            "transactionIdentifier": "381228649430015",
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
            "senderAddress": "901 Metro Center Blvd",
            "sourceOfFundsCode": "05",
            "recipientName": "rohan",
            "senderName": "Mohammed Qasim",
            "senderStateCode": "CA",
            "merchantCategoryCode": "6012",
            "acquirerCountryCode": "840",
            "senderReference": "",
            "recipientPrimaryAccountNumber": "4957030420210496",
            "retrievalReferenceNumber": "412770451018",
            "senderAccountNumber": "4653459515756154",
            "transactionCurrencyCode": "USD",
            "acquiringBin": "408999",
            "pointOfServiceData": {
                "posConditionCode": "00",
                "panEntryMode": "90",
                "motoECIIndicator": "0"
            },
            "senderCity": "Foster City",
            "amount": "124.05",
            "systemsTraceAuditNumber": "451018",
            "senderCountryCode": "124"
        };
        parameters.payload.localTransactionDateTime = Date.now();

        return parameters;
    }
}

const Resolve = function (req, cb) {

}

module.exports = {
    getAlias,
    pullFunds,
    pushFunds,
    createAlias,
}

// 2e126c28f09c76ed17944660f8bf593c1663909ac0291e4249d99372a71a0143


