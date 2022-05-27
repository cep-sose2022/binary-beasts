let level1 = require('../pdfDocuments/level1.pdf');
let level2 = require('../pdfDocuments/level2.pdf');
let level3 = require('../pdfDocuments/level3.pdf');
let level4 = require('../pdfDocuments/level4.pdf');
let level5 = require('../pdfDocuments/level5.pdf');
let level6 = require('../pdfDocuments/level6.pdf');
let level7 = require('../pdfDocuments/level7.pdf');
let level8 = require('../pdfDocuments/level8.pdf');
let level9 = require('../pdfDocuments/level9.pdf');
let level10 = require('../pdfDocuments/level10.pdf');

const docs = {};

docs.getPdfDoc = (level) => {
    if(level === 'level1') return level1;
    else if (level === 'level2') return level2;
    else if (level === 'level3') return level3;
    else if (level === 'level4') return level4;
    else if (level === 'level5') return level5;
    else if (level === 'level6') return level6;
    else if (level === 'level7') return level7;
    else if (level === 'level8') return level8;
    else if (level === 'level9') return level9;
    else if (level === 'level10') return level10;
};

module.exports = docs;