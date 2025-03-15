import express, { Request, Response } from "express";
import multer from 'multer';
import dotenv from 'dotenv';
import eventRoute from './routes/eventRoute';
import cors from 'cors';
dotenv.config();

import { uploadFile } from './services/uploadFileService';
const app = express();
const allowedOrigins = ['http://localhost:5173', '713-2024-frontend-example-alpha.vercel.app'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};

// Then pass these options to cors:
app.use(cors(options));
app.use(express.json());
app.use('/events', eventRoute);
const port = process.env.PORT || 3000;

const upload = multer({ storage: multer.memoryStorage() });

app.post('/upload', upload.single('file'), async (req: any, res: any) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).send('No file uploaded.');
    }

    const bucket = process.env.SUPABASE_BUCKET_NAME;
    const filePath = process.env.UPLOAD_DIR;

    if (!bucket || !filePath) {
      return res.status(500).send('Bucket name or file path not configured.');
    }
    const ouputUrl = await uploadFile(bucket, filePath, file);

    res.status(200).send(ouputUrl);
  } catch (error) {
    res.status(500).send('Error uploading file.');
  }
});

app.get('/events', async (req: Request, res: Response) => {
  try {
    const result = await getEvents(); // Assuming getEvents is a function that fetches events
    res.setHeader("x-total-count", result.count.toString());
    res.setHeader("Access-Control-Expose-Headers", "x-total-count");
    res.json(result.events);
  } catch (error) {
    res.status(500).send('Error fetching events.');
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

async function getEvents() {
  // Mock implementation, replace with actual logic to fetch events
  return {
    count: 10,
    events: [
      { id: 1, name: 'Event 1' },
      { id: 2, name: 'Event 2' }
    ]
  };
}
