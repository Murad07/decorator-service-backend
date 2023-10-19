"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceStatus = exports.category = exports.location = exports.bookFilterableFields = exports.bookSearchableFields = void 0;
exports.bookSearchableFields = ['title', 'category', 'location'];
exports.bookFilterableFields = [
    'searchTerm',
    'title',
    'category',
    'location',
    'serviceStatus',
];
exports.location = [
    'Dhaka',
    'Chattogram',
    'Barishal',
    'Rajshahi',
    'Sylhet',
    'Comilla',
    'Rangpur',
    'Mymensingh',
];
exports.category = ['Sound', 'Light', 'Interior', 'Studio', 'Others'];
exports.serviceStatus = ['Available', 'Not Available', 'Upcoming'];
