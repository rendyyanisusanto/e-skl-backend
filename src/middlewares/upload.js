const multer = require('multer');
const path = require('path');
const fs = require('fs');

const createStorage = (subDir) => multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(process.cwd(), process.env.UPLOAD_DIR || 'src/uploads', subDir);
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const { v4: uuidv4 } = require('uuid');
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, `${Date.now()}-${uuidv4()}${ext}`);
  },
});

const pdfFilter = (req, file, cb) => {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Hanya file PDF yang diizinkan.'), false);
  }
};

const maxSizeMB = parseInt(process.env.MAX_FILE_SIZE_MB || '5');

const uploadSKL = multer({
  storage: createStorage('skl'),
  fileFilter: pdfFilter,
  limits: { fileSize: maxSizeMB * 1024 * 1024 },
});

const uploadImport = multer({
  storage: createStorage('imports'),
  limits: { fileSize: 10 * 1024 * 1024 },
});

const uploadLogo = multer({
  storage: createStorage('logos'),
  limits: { fileSize: 2 * 1024 * 1024 },
});

module.exports = { uploadSKL, uploadImport, uploadLogo };
