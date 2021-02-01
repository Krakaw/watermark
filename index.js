require('dotenv').config();
const express = require('express')
const app = express()
const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';

const fs = require('fs');
const path = require('path');
const { PDFDocument } = require('pdf-lib');
// app.get('/',  (req, res) => {
//     res.send('Hello World!')
// })
//
// app.listen(port, host, () => {
//     console.log(`Example app listening at http://localhost:${port}`)
// })
const run = async ({ pathToPDF, pathToImage }) => {
    const pdfDoc = await PDFDocument.load(fs.readFileSync(pathToPDF));
    const img = await pdfDoc.embedPng(fs.readFileSync(pathToImage));
    for (let i = 0; i < pdfDoc.getPageCount(); i++) {
        let imagePage='';
        imagePage = pdfDoc.getPage(i);
        console.log(i+1)
        console.log(imagePage.getWidth())
        let xx=imagePage.getWidth()
        console.log(imagePage.getHeight())
        let yy=imagePage.getHeight()
        imagePage.drawImage(img, {
            x: 0,
            y: 0,
            width: xx,
            height: yy

        });
    }
    // const imagePage = pdfDoc.insertPage(0);
    // imagePage.drawImage(img, {
    //     x: 0,
    //     y: 0,
    //     width: imagePage.getWidth(),
    //     height: imagePage.getHeight()
    // });
    const pdfBytes = await pdfDoc.save();
    const newFilePath = `${path.basename(pathToPDF, '.pdf')}-result.pdf`;
    fs.writeFileSync(newFilePath, pdfBytes);
};

run({pathToPDF: 'public/test.pdf', pathToImage: 'public/test.png'}).then(r => {

})
