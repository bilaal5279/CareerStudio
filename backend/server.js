const express = require("express");
const multer = require("multer");
const mammoth = require("mammoth");
const pdfParse = require("pdf-parse");
const { Configuration, OpenAIApi } = require("openai");
const getStream = require("get-stream");
const { Storage } = require("@google-cloud/storage");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const cors = require('cors');
const { v4: uuidv4 } = require("uuid");
const app = express();
const upload = multer();
const configuration = new Configuration({
  apiKey: apiKey,
});
const puppeteer = require('puppeteer');
const path = require('path')

const storage = new Storage({
  keyFilename: "./serviceAccountKey.json",
  projectId: "creatorstudio-fa3f6",
});

var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'creatorstudio-fa3f6.appspot.com'

});
bucket = admin.storage().bucket();
let jobDescriptionText = "";
let uploadText = "";
let resumeUrl = "";
let coverLetterUrl = "";
let browser;
let page;

async function generateCoverLetter() {
  if (jobDescriptionText && uploadText) {
    const openai = new OpenAIApi(configuration);

    const prompt = `Write a cover letter based upon the following use the information from the resume for some information that is needed. Job Description : ${jobDescriptionText} Resume: ${uploadText}`;

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.6,
    });

    const coverLetterText = response.data.choices[0].message.content.replace(/\\n/g, "\n");
    const filename = `cover-letter-${uuidv4()}.pdf`;
    const doc = new PDFDocument();
    doc.text(coverLetterText);
    doc.pipe(fs.createWriteStream(filename));
    doc.end();

    const bucketName = "creatorstudio-fa3f6.appspot.com";
    const coverLetterRef = storage.bucket(bucketName).file(`optimizedcoverletters/${filename}`);
    const coverLetterBuffer = await getStream.buffer(doc);

    try {
      await coverLetterRef.save(coverLetterBuffer, { contentType: "application/pdf" });
      console.log("Uploaded cover letter!");
      coverLetterUrl = coverLetterRef.publicUrl();
      return coverLetterUrl;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to upload cover letter");
    }
  } else {
    console.log("Job description and/or upload text is not available yet");
    return null;
  }
}

async function generateResume() {
  if (jobDescriptionText && uploadText) {
    const openai = new OpenAIApi(configuration);

     const prompt = `Given a job description and a resume, Create a FULL Resume for the same individual based upon the job and previous resume use mostly everything in the previous resume add All previous experience fully and skills addd them to the new one just add or edit in believeable information to the summary to make it more optimal for the job and to some of the previous jobs do not add any more jobs keep the information believeable and add information such as a few new skillswhich will make the candidate more likely to get the job do this in tailwind CSS and Html, make it look Proffesional, clean and aesthetic format it with enough space between each sections ONLY RESPOND WITH THE HTML AND TAILWIND CSS DO NOT SAY ANYTHING ELSE. Here is the information Job Description : ${jobDescriptionText} Resume: ${uploadText} (ONLY RESPOND WITH THE RESPONSE REQUESTED (html and css) NO OTHER MESSAGE!!!) `   
    const response = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.9,
    });

    const resumeText = response.data.choices[0].message.content.replace(/\\n/g, "\n");
    
    // use a single try-catch block for the whole function
    try {
      // create different filenames for html and pdf files
      const htmlFilename = `output-${uuidv4()}.html`;
      const pdfFilename = `output-${uuidv4()}.pdf`;

      // create a html file from the resume text synchronously
      fs.writeFileSync(htmlFilename, resumeText);
      console.log('Saved output.html!');

      // launch puppeteer browser
      browser = await puppeteer.launch({ headless: false }); // run in headful mode
      console.log('Launched browser!');

      // create a new page and go to your local html file
      // create a new page
      page = await browser.newPage();
      console.log('Created new page!');

      // go to your local html file using a string url
      const htmlFilePath = path.resolve(htmlFilename)
      await page.goto('file://' + htmlFilePath) // use template literal
      console.log('Went to local html file!');

      // take a screenshot of the webpage and save it as a pdf file
     
      // use page.pdf() method instead of page.screenshot()
      await page.pdf({ path: pdfFilename });
      console.log('Saved resume.pdf!');

      // close the browser
      await browser.close();
      console.log('Closed browser!');

      // upload resume.pdf to firebase storage
      // use the same method as generateCoverLetter
      const bucketName = "creatorstudio-fa3f6.appspot.com";
      const resumeRef = storage.bucket(bucketName).file(`optimizedresumes/${pdfFilename}`);
      const resumeBuffer = fs.readFileSync(pdfFilename); // read the pdf file as a buffer

      await resumeRef.save(resumeBuffer, { contentType: "application/pdf" });
      console.log("Uploaded resume.pdf!");
      

      resumeUrl = resumeRef.publicUrl();
        return resumeUrl;
      
      
    } catch (err) {
      // catch any errors that occur in any of the steps
      console.error('Failed to generate resume!', err);
      return null;
    }
  } else {
    console.log("Job description and/or upload text is not available yet");
    return null;
  }
}


app.post("/api/convert/resume", upload.single("resume"), async (req, res) => {
  try {
    const fileData = req.file.buffer;
    const fileType = req.file.mimetype;
    let text;

    if (fileType === "application/pdf") {
      text = (await pdfParse(fileData)).text;
    } else {
      text = (await mammoth.extractRawText({ buffer: fileData })).value;
    }

    uploadText = text;

    res.send({ text });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to convert resume file" });
  }
});

app.post("/api/convert/jobDescription", upload.single("jobDescription"), async (req, res) => {
  try {
    const fileData = req.file.buffer;
    const fileType = req.file.mimetype;
    let text;

    if (fileType === "application/pdf") {
      text = (await pdfParse(fileData)).text;
    } else {
      text = (await mammoth.extractRawText({ buffer: fileData })).value;
    }

    jobDescriptionText = text;

    const coverLetterUrl = await generateCoverLetter();
    const resumeUrl = await generateResume();
    res.send({ text, coverLetterUrl, resumeUrl });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to convert job description file" });
  }
});

app.get("/api/convert/getUrls", (req, res) => {
  res.send({ resumeUrl, coverLetterUrl });
  console.log(resumeUrl, coverLetterUrl);
});

app.use(cors({ origin: 'http://localhost:3000' }));

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
