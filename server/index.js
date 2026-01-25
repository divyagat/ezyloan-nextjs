// server/index.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// ===== CLOUDINARY SETUP =====
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

// Helper: Extract public_id from Cloudinary URL
const extractPublicIdFromUrl = (url) => {
  try {
    const urlObj = new URL(url);
    const pathParts = urlObj.pathname.split('/');
    const filename = pathParts[pathParts.length - 1];
    const publicId = filename.split('.')[0];
    const folderPath = pathParts.slice(0, -1).join('/').replace('/image/upload', '');
    return folderPath ? `${folderPath}/${publicId}` : publicId;
  } catch (e) {
    const match = url.match(/\/v\d+\/(.+)\.[a-zA-Z]+$/);
    return match ? match[1] : url;
  }
};

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'http://localhost:5174',
  'https://saddlebrown-gorilla-762394.hostingersite.com',
  'http://72.60.204.205',
  'http://ezyloan.co.in',
  'https://ezyloan.co.in',
  'http://srv1050467.hstgr.cloud',
  'https://srv1050467.hstgr.cloud'
].map(origin => origin.trim());

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('CORS policy: Not allowed by server'), false);
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// ===== EMAIL SERVICE =====
const createTransporter = () => {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn('⚠️ Email credentials missing');
    return null;
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
};

const transporter = createTransporter();

if (transporter) {
  transporter.verify((error) => {
    if (error) console.warn('⚠️ Email config issue:', error.message);
    else console.log('✅ Email service ready');
  });
}

// ===== EMAIL FUNCTIONS =====
const sendContactConfirmation = async (contactData) => {
  if (!transporter) return;

  if (contactData.email) {
    const userMail = {
      from: process.env.FROM_EMAIL,
      to: contactData.email,
      subject: 'Thank you for contacting EzyLoan!',
      html: `<h2>Thank you ${contactData.fullName}!</h2>
             <p>We have received your enquiry. Our team will contact you soon.</p>`
    };
    try {
      await transporter.sendMail(userMail);
      console.log('✅ Contact confirmation sent to user');
    } catch (error) {
      console.error('❌ User email error:', error);
    }
  }

  const adminMail = {
    from: process.env.FROM_EMAIL,
    to: [
      'contact@ezyloan.co.in',
      'cbWR9lQS-PZAJZtsu@v1-incoming-leads.privyr.com'
    ],
    subject: `📩 New Contact Form Submission - ${contactData.fullName}`,
    html: `
      <h3>New Contact Submission</h3>
      <p><b>Full Name:</b> ${contactData.fullName}</p>
      <p><b>Email:</b> ${contactData.email}</p>
      <p><b>Phone Number:</b> ${contactData.phoneNumber}</p>
      <p><b>Loan Type:</b> ${contactData.loanType}</p>
      <p><b>Loan Amount:</b> ${contactData.loanAmount}</p>
      <p><b>Message:</b> ${contactData.message || '-'}</p>
      <hr>
      <p>📅 Submitted at: ${new Date().toLocaleString()}</p>
    `
  };
  try {
    await transporter.sendMail(adminMail);
    console.log('✅ Contact notification sent to admin and Privyr');
  } catch (error) {
    console.error('❌ Admin contact email error:', error);
  }
};

const sendLoanApplicationConfirmation = async (loanData) => {
  if (!transporter) return;

  if (loanData.email) {
    const userMail = {
      from: process.env.FROM_EMAIL,
      to: loanData.email,
      subject: 'Loan Application Received',
      html: `<h2>Hello ${loanData.fullName}!</h2>
             <p>We have received your loan application. Our team will get back to you shortly.</p>`
    };
    try {
      await transporter.sendMail(userMail);
      console.log('✅ Loan confirmation sent to user');
    } catch (error) {
      console.error('❌ User loan email error:', error);
    }
  }

  const adminMail = {
    from: process.env.FROM_EMAIL,
    to: [
      'contact@ezyloan.co.in',
      'cbWR9lQS-PZAJZtsu@v1-incoming-leads.privyr.com'
    ],
    subject: `📩 New Loan Application - ${loanData.fullName}`,
    html: `
      <h3>New Loan Application</h3>
      <p><b>Full Name:</b> ${loanData.fullName}</p>
      <p><b>Email:</b> ${loanData.email || '-'}</p>
      <p><b>Phone Number:</b> ${loanData.phoneNumber}</p>
      <p><b>Loan Type:</b> ${loanData.loanType}</p>
      <p><b>Employment Type:</b> ${loanData.employmentType}</p>
      <p><b>City:</b> ${loanData.city}</p>
      <p><b>Pincode:</b> ${loanData.pincode}</p>
      <p><b>CIBIL Score:</b> ${loanData.cibilScore}</p>
      <hr>
      <p>📅 Submitted at: ${new Date().toLocaleString()}</p>
    `
  };
  try {
    await transporter.sendMail(adminMail);
    console.log('✅ Loan notification sent to admin and Privyr');
  } catch (error) {
    console.error('❌ Admin loan email error:', error);
  }
};

const sendLoanApprovalEmail = async (loan) => {
  if (!transporter || !loan.email) return;
  const mailOptions = {
    from: process.env.FROM_EMAIL,
    to: loan.email,
    subject: '🎉 Loan Approved!',
    html: `<h2>Congratulations! Your loan is approved!</h2>`
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ Approval email sent');
  } catch (error) {
    console.error('❌ Email error:', error);
  }
};

const sendLoanRejectionEmail = async (loan) => {
  if (!transporter || !loan.email) return;
  const mailOptions = {
    from: process.env.FROM_EMAIL,
    to: loan.email,
    subject: 'Loan Application Update',
    html: `<h2>Thank you for your interest. Unfortunately, your application was not approved at this time.</h2>`
  };
  try {
    await transporter.sendMail(mailOptions);
    console.log('✅ Rejection email sent');
  } catch (error) {
    console.error('❌ Email error:', error);
  }
};

// ===== MODELS =====
const BannerSchema = new mongoose.Schema({
  image: { type: String, required: true },
  page: { 
    type: String, 
    required: true,
    enum: ['home', 'about', 'contact', 'apply', 'car-refinance', 'used-car-refinance', 'car-balance-transfer', 'car-top-up', 'new-car-loan', 'personal-loan', 'property-loan', 'commercial-vehicle-loan']
  },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

const ContactSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  loanType: { type: String, required: true },
  loanAmount: { type: String, required: true },
  message: { type: String }
}, { timestamps: true });

const LoanApplicationSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String },
  phoneNumber: { type: String, required: true },
  loanType: { type: String, required: true },
  employmentType: { type: String, required: true },
  city: { type: String, required: true },
  pincode: { type: String, required: true },
  cibilScore: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'approved', 'rejected'], 
    default: 'pending' 
  }
}, { timestamps: true });

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, { timestamps: true });

UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

UserSchema.methods.comparePassword = async function(password) {
  return bcrypt.compare(password, this.password);
};

const Banner = mongoose.model('Banner', BannerSchema);
const Contact = mongoose.model('Contact', ContactSchema);
const LoanApplication = mongoose.model('LoanApplication', LoanApplicationSchema);
const User = mongoose.model('User', UserSchema);

// ===== AUTH & DB =====
const createDefaultAdmin = async () => {
  try {
    const adminExists = await User.findOne({ username: 'EzyLoan' });
    if (!adminExists) {
      await User.create({
        username: 'EzyLoan',
        password: 'Ezysunday@1'
      });
      console.log('✅ Default admin created');
    }
  } catch (error) {
    if (error.code !== 11000) {
      console.error('❌ Admin error:', error);
    }
  }
};

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      maxPoolSize: 10,
      dbName: 'mydatabase'
    });
    console.log('✅ Connected to MongoDB');
    return true;
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    return false;
  }
};

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Only images allowed'), false);
  },
  limits: { fileSize: 20 * 1024 * 1024 }
});

// ===== ROUTES =====
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    res.json({ token, user: { id: user._id, username: user.username } });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/auth/verify', authenticateToken, (req, res) => {
  res.json({ user: req.user });
});

app.get('/api/banners', async (req, res) => {
  try {
    const { page } = req.query;
    const query = page ? { page } : {};
    const banners = await Banner.find(query).sort({ order: 1, createdAt: -1 });
    res.json(banners);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching banners', error: error.message });
  }
});

app.post('/api/banners', upload.single('image'), async (req, res) => {
  try {
    if (!req.file || !req.body.page) {
      return res.status(400).json({ message: 'Image and page required' });
    }
    const streamUpload = (buffer) => {
      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: 'banners', resource_type: 'image' },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        uploadStream.end(buffer);
      });
    };
    const result = await streamUpload(req.file.buffer);
    const banner = new Banner({
      image: result.secure_url,
      page: req.body.page,
      order: req.body.order || 0,
      isActive: req.body.isActive !== undefined ? req.body.isActive : true
    });
    await banner.save();
    res.status(201).json(banner);
  } catch (error) {
    console.error('Banner error:', error);
    res.status(500).json({ message: 'Error creating banner', error: error.message });
  }
});

app.delete('/api/banners/:id', async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);
    if (!banner) return res.status(404).json({ message: 'Banner not found' });
    try {
      const publicId = extractPublicIdFromUrl(banner.image);
      await cloudinary.uploader.destroy(publicId);
      console.log('✅ Deleted image from Cloudinary');
    } catch (cloudinaryError) {
      console.warn('⚠️ Cloudinary delete failed:', cloudinaryError.message);
    }
    await Banner.findByIdAndDelete(req.params.id);
    res.json({ message: 'Banner deleted' });
  } catch (error) {
    console.error('Delete banner error:', error);
    res.status(500).json({ message: 'Error deleting banner', error: error.message });
  }
});

app.put('/api/banners/:id/order', async (req, res) => {
  try {
    const banner = await Banner.findByIdAndUpdate(
      req.params.id,
      { order: req.body.order },
      { new: true }
    );
    res.json(banner);
  } catch (error) {
    res.status(500).json({ message: 'Error updating order', error: error.message });
  }
});

app.get('/api/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contacts', error: error.message });
  }
});

app.post('/api/contacts', async (req, res) => {
  try {
    const { fullName, email, phoneNumber, loanType, loanAmount } = req.body;
    if (!fullName || !email || !phoneNumber || !loanType || !loanAmount) {
      return res.status(400).json({ message: 'All fields required' });
    }
    const contact = new Contact(req.body);
    await contact.save();
    await sendContactConfirmation(req.body);
    res.status(201).json({ message: 'Contact submitted', contact });
  } catch (error) {
    console.error('Contact error:', error);
    res.status(500).json({ message: 'Error submitting contact', error: error.message });
  }
});

app.delete('/api/contacts/:id', async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: 'Contact deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting contact', error: error.message });
  }
});

app.get('/api/loans', async (req, res) => {
  try {
    const loans = await LoanApplication.find().sort({ createdAt: -1 });
    res.json(loans);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching loans', error: error.message });
  }
});

app.post('/api/loans', async (req, res) => {
  try {
    const { fullName, phoneNumber, loanType, employmentType, city, pincode, cibilScore } = req.body;
    if (!fullName || !phoneNumber || !loanType || !employmentType || !city || !pincode || !cibilScore) {
      return res.status(400).json({ message: 'All fields required' });
    }
    const loanApplication = new LoanApplication(req.body);
    await loanApplication.save();
    await sendLoanApplicationConfirmation(req.body);
    res.status(201).json({ message: 'Loan submitted', loanApplication });
  } catch (error) {
    console.error('Loan error:', error);
    res.status(500).json({ message: 'Error submitting loan', error: error.message });
  }
});

app.put('/api/loans/:id/status', async (req, res) => {
  try {
    const loan = await LoanApplication.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (req.body.status === 'approved') {
      await sendLoanApprovalEmail(loan);
    } else if (req.body.status === 'rejected') {
      await sendLoanRejectionEmail(loan);
    }
    res.json(loan);
  } catch (error) {
    res.status(500).json({ message: 'Error updating status', error: error.message });
  }
});

app.delete('/api/loans/:id', async (req, res) => {
  try {
    await LoanApplication.findByIdAndDelete(req.params.id);
    res.json({ message: 'Loan deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting loan', error: error.message });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server running' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).json({ 
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// ✅ CORRECT 404 HANDLER — NO PATH STRING
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// ===== START SERVER =====
const startServer = async () => {
  let connected = false;
  let attempts = 0;
  const maxAttempts = 3;
  
  while (!connected && attempts < maxAttempts) {
    attempts++;
    console.log(`🔄 Attempting MongoDB connection (attempt ${attempts}/${maxAttempts})...`);
    connected = await connectDB();
    if (!connected && attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
  
  if (!connected) {
    console.error('❌ Failed to connect to MongoDB after multiple attempts');
    process.exit(1);
  }
  
  await createDefaultAdmin();
  
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
  });
};

startServer();