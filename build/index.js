"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var alpaca_trade_api_1 = __importDefault(require("@alpacahq/alpaca-trade-api"));
var alpaca = new alpaca_trade_api_1.default({
    keyId: 'AKFZXJH121U18SHHDRFO',
    secretKey: 'pnq4YHlpMF3LhfLyOvmdfLmlz6BnASrTPQIASeiU',
    paper: true,
});
