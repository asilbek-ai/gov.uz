import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Uploads folder
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use('/uploads', express.static(uploadsDir));

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/jondor_portal';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('✅ MongoDB connected successfully');
}).catch(err => {
  console.error('❌ MongoDB connection error:', err);
  console.log('⚠️ Starting without MongoDB - using fallback data');
});

// ==================== SCHEMAS ====================

const NewsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  titleRu: { type: String },
  content: { type: String, required: true },
  contentRu: { type: String },
  image: { type: String, default: 'https://images.pexels.com/photos/159740/classroom-school-desk-lecture-159740.jpeg?w=800' },
  date: { type: Date, default: Date.now },
  views: { type: Number, default: 0 }
}, { timestamps: true });

const ServiceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  nameRu: { type: String },
  icon: { type: String, default: 'gear' },
  description: { type: String },
  descriptionRu: { type: String },
  department: { type: String }
}, { timestamps: true });

const StatisticSchema = new mongoose.Schema({
  label: { type: String, required: true },
  labelRu: { type: String },
  value: { type: Number, required: true },
  icon: { type: String, default: 'chart-line' },
  color: { type: String, default: 'blue' },
  prefix: { type: String, default: '' },
  suffix: { type: String, default: '' }
}, { timestamps: true });

const OrganizationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  nameRu: { type: String },
  phone: { type: String },
  email: { type: String },
  address: { type: String },
  website: { type: String }
}, { timestamps: true });

const GallerySchema = new mongoose.Schema({
  image: { type: String, required: true },
  title: { type: String },
  titleRu: { type: String }
}, { timestamps: true });

const CarouselSchema = new mongoose.Schema({
  image: { type: String, required: true },
  title: { type: String },
  titleRu: { type: String }
}, { timestamps: true });

const LeadershipSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String },
  positionRu: { type: String },
  image: { type: String },
  phone: { type: String },
  email: { type: String }
}, { timestamps: true });

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  message: { type: String, required: true },
  status: { type: String, default: 'new' }
}, { timestamps: true });

const SubscriberSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true }
}, { timestamps: true });

const AdminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String }
}, { timestamps: true });

const DocumentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  nameRu: { type: String },
  file: { type: String },
  size: { type: String },
  type: { type: String, default: 'PDF' },
  date: { type: Date, default: Date.now }
}, { timestamps: true });

const FaqSchema = new mongoose.Schema({
  question: { type: String, required: true },
  questionRu: { type: String },
  answer: { type: String },
  answerRu: { type: String }
}, { timestamps: true });

// Models
const News = mongoose.model('News', NewsSchema);
const Service = mongoose.model('Service', ServiceSchema);
const Statistic = mongoose.model('Statistic', StatisticSchema);
const Organization = mongoose.model('Organization', OrganizationSchema);
const Gallery = mongoose.model('Gallery', GallerySchema);
const Carousel = mongoose.model('Carousel', CarouselSchema);
const Leadership = mongoose.model('Leadership', LeadershipSchema);
const Contact = mongoose.model('Contact', ContactSchema);
const Subscriber = mongoose.model('Subscriber', SubscriberSchema);
const Admin = mongoose.model('Admin', AdminSchema);
const Document = mongoose.model('Document', DocumentSchema);
const Faq = mongoose.model('Faq', FaqSchema);

// ==================== FILE UPLOAD ====================
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// ==================== AUTH MIDDLEWARE ====================
const auth = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'jondor_secret_key_2024');
    const admin = await Admin.findById(decoded.id).select('-password');
    if (!admin) throw new Error();
    req.admin = admin;
    next();
  } catch (e) {
    res.status(401).json({ error: 'Invalid token.' });
  }
};

// ==================== API ROUTES ====================

// ========== PUBLIC ROUTES ==========

// News
app.get('/api/news', async (req, res) => {
  try {
    const news = await News.find().sort({ date: -1 });
    res.json(news);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/news/:id', async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (news) {
      news.views += 1;
      await news.save();
    }
    res.json(news);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Services
app.get('/api/services', async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Statistics
app.get('/api/statistics', async (req, res) => {
  try {
    const stats = await Statistic.find();
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Organizations
app.get('/api/organizations', async (req, res) => {
  try {
    const orgs = await Organization.find();
    res.json(orgs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Gallery
app.get('/api/gallery', async (req, res) => {
  try {
    const gallery = await Gallery.find();
    res.json(gallery);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Carousel
app.get('/api/carousel', async (req, res) => {
  try {
    const carousel = await Carousel.find();
    res.json(carousel);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Leadership
app.get('/api/leadership', async (req, res) => {
  try {
    const leaders = await Leadership.find();
    res.json(leaders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Documents
app.get('/api/documents', async (req, res) => {
  try {
    const docs = await Document.find().sort({ date: -1 });
    res.json(docs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// FAQs
app.get('/api/faqs', async (req, res) => {
  try {
    const faqs = await Faq.find();
    res.json(faqs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Contact
app.post('/api/contact', async (req, res) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.json({ success: true, message: 'Message sent successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Subscribe
app.post('/api/subscribe', async (req, res) => {
  try {
    const existing = await Subscriber.findOne({ email: req.body.email });
    if (existing) {
      return res.json({ success: true, message: 'Already subscribed' });
    }
    const subscriber = new Subscriber({ email: req.body.email });
    await subscriber.save();
    res.json({ success: true, message: 'Subscribed successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ========== ADMIN ROUTES ==========

// Auth
app.post('/api/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    const isValid = await bcrypt.compare(password, admin.password);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
    const token = jwt.sign(
      { id: admin._id, username: admin.username },
      process.env.JWT_SECRET || 'jondor_secret_key_2024',
      { expiresIn: '7d' }
    );
    res.json({
      success: true,
      token,
      admin: { id: admin._id, username: admin.username, name: admin.name }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// News CRUD
app.post('/api/news', auth, async (req, res) => {
  try {
    const news = new News(req.body);
    await news.save();
    res.json(news);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/news/:id', auth, async (req, res) => {
  try {
    const news = await News.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(news);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/news/:id', auth, async (req, res) => {
  try {
    await News.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Services CRUD
app.post('/api/services', auth, async (req, res) => {
  try {
    const service = new Service(req.body);
    await service.save();
    res.json(service);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/services/:id', auth, async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Statistics CRUD
app.post('/api/statistics', auth, async (req, res) => {
  try {
    const stat = new Statistic(req.body);
    await stat.save();
    res.json(stat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/statistics/:id', auth, async (req, res) => {
  try {
    await Statistic.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Organizations CRUD
app.post('/api/organizations', auth, async (req, res) => {
  try {
    const org = new Organization(req.body);
    await org.save();
    res.json(org);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/organizations/:id', auth, async (req, res) => {
  try {
    await Organization.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Gallery CRUD
app.post('/api/gallery', auth, async (req, res) => {
  try {
    const item = new Gallery(req.body);
    await item.save();
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/gallery/:id', auth, async (req, res) => {
  try {
    await Gallery.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Carousel CRUD
app.post('/api/carousel', auth, async (req, res) => {
  try {
    const item = new Carousel(req.body);
    await item.save();
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/carousel/:id', auth, async (req, res) => {
  try {
    await Carousel.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Leadership CRUD
app.post('/api/leadership', auth, async (req, res) => {
  try {
    const leader = new Leadership(req.body);
    await leader.save();
    res.json(leader);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/leadership/:id', auth, async (req, res) => {
  try {
    await Leadership.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Documents CRUD
app.post('/api/documents', auth, async (req, res) => {
  try {
    const doc = new Document(req.body);
    await doc.save();
    res.json(doc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/documents/:id', auth, async (req, res) => {
  try {
    await Document.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// FAQs CRUD
app.post('/api/faqs', auth, async (req, res) => {
  try {
    const faq = new Faq(req.body);
    await faq.save();
    res.json(faq);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/faqs/:id', auth, async (req, res) => {
  try {
    await Faq.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Contacts (Admin only)
app.get('/api/contacts', auth, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/contacts/:id', auth, async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Subscribers (Admin only)
app.get('/api/subscribers', auth, async (req, res) => {
  try {
    const subscribers = await Subscriber.find().sort({ createdAt: -1 });
    res.json(subscribers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Dashboard Stats
app.get('/api/admin/stats', auth, async (req, res) => {
  try {
    const newsCount = await News.countDocuments();
    const servicesCount = await Service.countDocuments();
    const contactsCount = await Contact.countDocuments();
    const subscribersCount = await Subscriber.countDocuments();
    const organizationsCount = await Organization.countDocuments();
    const galleryCount = await Gallery.countDocuments();
    res.json({
      newsCount,
      servicesCount,
      contactsCount,
      subscribersCount,
      organizationsCount,
      galleryCount
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// File Upload
app.post('/api/upload', auth, upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    const fileUrl = `http://localhost:5000/uploads/${req.file.filename}`;
    res.json({ url: fileUrl });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ==================== INIT DEFAULT DATA ====================
const initData = async () => {
  try {
    // Create default admin
    const adminExists = await Admin.findOne({ username: 'admin' });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await Admin.create({
        username: 'admin',
        password: hashedPassword,
        name: 'Super Admin'
      });
      console.log('✅ Default admin created: admin / admin123');
    }

    // Create default statistics if none exist
    const statsCount = await Statistic.countDocuments();
    if (statsCount === 0) {
      await Statistic.create([
        { label: 'Aholi soni', labelRu: 'Численность населения', value: 128500, icon: 'users', color: 'blue' },
        { label: 'Maktablar', labelRu: 'Школы', value: 42, icon: 'school', color: 'green' },
        { label: 'Kasalxonalar', labelRu: 'Больницы', value: 3, icon: 'hospital', color: 'red' },
        { label: 'Tadbirkorlar', labelRu: 'Предприниматели', value: 1250, icon: 'briefcase', color: 'purple' }
      ]);
      console.log('✅ Default statistics created');
    }

    // Create default carousel if none exist
    const carouselCount = await Carousel.countDocuments();
    if (carouselCount === 0) {
      await Carousel.create([
        { image: 'https://images.pexels.com/photos/154801/pexels-photo-154801.jpeg?w=1600', title: 'Jondor tumaniga xush kelibsiz', titleRu: 'Добро пожаловать в Джондорский район' },
        { image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?w=1600', title: 'Yangi investitsiyalar', titleRu: 'Новые инвестиции' }
      ]);
      console.log('✅ Default carousel created');
    }

    // Create default services if none exist
    const servicesCount = await Service.countDocuments();
    if (servicesCount === 0) {
      await Service.create([
        { name: 'Fuqarolik holati aktlari', nameRu: 'Акты гражданского состояния', icon: 'id-card', description: 'Tug\'ilish, nikoh va vafot hujjatlarini rasmiylashtirish', department: 'ZAGS' },
        { name: 'Yer uchastkasi', nameRu: 'Земельный участок', icon: 'map-marked-alt', description: 'Yer uchastkasini ajratish va rasmiylashtirish', department: 'Yer resurslari' }
      ]);
      console.log('✅ Default services created');
    }

    // Create default news if none exist
    const newsCount = await News.countDocuments();
    if (newsCount === 0) {
      await News.create([
        { title: 'Jondor tumanida yangi maktab ochildi', titleRu: 'Новая школа открылась в Джондорском районе', content: '600 oʻrinli zamonaviy maktab foydalanishga topshirildi.', date: new Date(), image: 'https://images.pexels.com/photos/159740/classroom-school-desk-lecture-159740.jpeg?w=800' },
        { title: 'Investitsiya forumida shartnomalar imzolandi', titleRu: 'На инвестиционном форуме подписаны контракты', content: '15 ta xorijiy kompaniya bilan hamkorlik o\'rnatildi.', date: new Date(), image: 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?w=800' }
      ]);
      console.log('✅ Default news created');
    }

    // Create default organizations if none exist
    const orgsCount = await Organization.countDocuments();
    if (orgsCount === 0) {
      await Organization.create([
        { name: 'Jondor tuman hokimligi', nameRu: 'Хокимият Джондорского района', phone: '+998 65 380-00-00', email: 'info@jondor.uz', address: 'Jondor shahri, Mustaqillik ko\'chasi, 1' }
      ]);
      console.log('✅ Default organizations created');
    }

  } catch (err) {
    console.error('Error initializing data:', err);
  }
};

initData();

// ==================== START SERVER ====================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}/api`);
});