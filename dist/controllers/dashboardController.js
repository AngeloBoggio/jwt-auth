"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboard = void 0;
const dashboard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const dashboardData = {
        message: "Welcome to the Admin Dashboard!",
        stats: {
            totalUsers: 100,
            activeSessions: 25,
            lastUpdated: new Date().toISOString(),
        },
    };
    res.status(200).json(dashboardData);
});
exports.dashboard = dashboard;
