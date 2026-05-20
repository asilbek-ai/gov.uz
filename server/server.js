import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
const app = express();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json({ limit: '50mb' }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ==================== DATABASE ====================
const DB_FILE = path.join(__dirname, 'db.json');

const initDB = () => {
  if (!fs.existsSync(DB_FILE)) {
    const initialData = {
      settings: {
        siteName: "Jondor tumani rasmiy portali",
        siteLogo: "🏛️",
        contactPhone: "+998 65 123-45-67",
        contactEmail: "info@jondor.uz",
        contactAddress: "Jondor tumani, Buxoro viloyati",
        workingHours: "Dushanba-Juma: 09:00 - 18:00",
        socialLinks: {
          telegram: "https://t.me/jondor",
          facebook: "https://facebook.com/jondor",
          instagram: "https://instagram.com/jondor",
          youtube: "https://youtube.com/jondor"
        }
      },
      heroSlides: [
        { id: 1, title: "Buxoro viloyati", subtitle: "Jondor tumani rasmiy portali", description: "Ochiq ma'lumotlar, yangiliklar va davlat xizmatlari — bir joyda", image: "https://images.unsplash.com/photo-1541844053589-346841d0a17f?w=1600", cta1: "Xizmatlar", cta2: "Yangiliklar", order: 1, active: true },
        { id: 2, title: "Yangi maktablar", subtitle: "Zamonaviy ta'lim maskanlari", description: "500 o'rinli zamonaviy maktablar qurilmoqda", image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1600", cta1: "Batafsil", cta2: "Yangiliklar", order: 2, active: true },
        { id: 3, title: "Qishloq xo'jaligi", subtitle: "Yangi texnologiyalar joriy etilmoqda", description: "Mahsulotlar eksporti 25% ga oshdi", image: "https://images.unsplash.com/photo-1530836369250-ef72a3f5c9a8?w=1600", cta1: "Batafsil", cta2: "Statistika", order: 3, active: true }
      ],
      statistics: [
        { id: 1, label: "Aholi soni", value: 218000, icon: "users", suffix: "", prefix: "", color: "blue", order: 1 },
        { id: 2, label: "Mahalla soni", value: 42, icon: "home", suffix: "", prefix: "", color: "green", order: 2 },
        { id: 3, label: "Maktablar", value: 35, icon: "school", suffix: "", prefix: "", color: "purple", order: 3 },
        { id: 4, label: "Tibbiyot muassasalari", value: 12, icon: "hospital", suffix: "", prefix: "", color: "red", order: 4 },
        { id: 5, label: "Korxonalar", value: 156, icon: "factory", suffix: "", prefix: "", color: "orange", order: 5 },
        { id: 6, label: "Fermer xo'jaliklari", value: 320, icon: "tractor", suffix: "", prefix: "", color: "teal", order: 6 }
      ],
      news: [],
      services: [],
      documents: [],
      media: [],
      contacts: [],
      subscribers: [],
      leadership: [
        { id: 1, name: "Alijonov Bahodir", position: "Tuman hokimi", image: "https://randomuser.me/api/portraits/men/1.jpg", phone: "+998 65 123-45-67", email: "hokim@jondor.uz", order: 1 },
        { id: 2, name: "Karimov Rustam", position: "Hokim o'rinbosari", image: "https://randomuser.me/api/portraits/men/3.jpg", phone: "+998 65 123-45-68", email: "rustam@jondor.uz", order: 2 }
      ],
      projects: [
        { id: 1, title: "Yangi avtomobil yo'llari qurilishi", progress: 75, budget: "2.5 mlrd so'm", status: "active", deadline: "2025-12-31", description: "Tuman ichki yo'llarini ta'mirlash" },
        { id: 2, title: "Suv ta'minoti tizimini modernizatsiya qilish", progress: 45, budget: "1.8 mlrd so'm", status: "active", deadline: "2026-06-30", description: "Suv tarmoqlarini yangilash" }
      ],
      vacancies: [
        { id: 1, title: "Maktab o'qituvchisi", department: "Ta'lim bo'limi", deadline: "2025-09-15", salary: "3.5-4.5 mln", requirements: "Oliy ma'lumot", description: "Ingliz tili o'qituvchisi" }
      ],
      faqs: [
        { id: 1, question: "Pasportni qanday muddatda olish mumkin?", answer: "Pasport 10 ish kunida tayyorlanadi. Tezkor xizmat 3 ish kunida." },
        { id: 2, question: "Yer solig'ini qanday to'layman?", answer: "Soliq idorasiga murojaat qiling yoki my.gov.uz orqali onlayn to'lang." }
      ],
      partners: [
        { id: 1, name: "O'zsanoatqurilishbank", icon: "university", url: "https://www.sanoatqurilishbank.uz", order: 1 },
        { id: 2, name: "Uztelecom", icon: "wifi", url: "https://uztelecom.uz", order: 2 }
      ],
      testimonials: [
        { id: 1, name: "Alijonov Bahodir", position: "Tadbirkor", text: "Davlat xizmatlari orqali tez va sifatli xizmat olaman.", rating: 5, image: "https://randomuser.me/api/portraits/men/1.jpg" }
      ],
      gallery: [
        { id: 1, title: "Tuman markazi", image: "https://images.unsplash.com/photo-1541844053589-346841d0a17f?w=800", category: "Shahar", order: 1 },
        { id: 2, title: "Park va bog'lar", image: "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=800", category: "Tabiat", order: 2 }
      ],
      quickLinks: [
        { id: 1, icon: "file-alt", title: "Hujjatlar", link: "/documents", color: "blue", order: 1 },
        { id: 2, icon: "calendar-alt", title: "Tadbirlar", link: "/events", color: "green", order: 2 }
      ],
      announcements: [
        { id: 1, title: "2025-yil 1-sentabrdan yangi o'quv yili boshlanadi", date: "2025-08-20", type: "info", urgent: false }
      ]
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2));
  }
};

const readDB = () => {
  initDB();
  return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
};

const writeDB = (data) => {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
};

// ==================== AUTH ====================
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@jondor.uz';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'Admin123!';
const ADMIN_PASSWORD_HASH = bcrypt.hashSync(ADMIN_PASSWORD, 10);

const authRequired = (req, res, next) => {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ message: 'Unauthorized' });
  try {
    jwt.verify(token, process.env.JWT_SECRET || 'dev_secret');
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (email !== ADMIN_EMAIL) return res.status(401).json({ message: 'Invalid credentials' });
  const ok = bcrypt.compareSync(password, ADMIN_PASSWORD_HASH);
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
  const token = jwt.sign({ email }, process.env.JWT_SECRET || 'dev_secret', { expiresIn: '24h' });
  res.json({ token, user: { email, name: 'Admin' } });
});

// ==================== CRUD GENERATOR ====================
const createCRUD = (resource) => {
  app.get(`/api/${resource}`, (req, res) => {
    const db = readDB();
    const { q } = req.query;
    let items = db[resource] || [];
    if (q) {
      items = items.filter(item => 
        (item.title && item.title.toLowerCase().includes(q.toLowerCase())) ||
        (item.name && item.name.toLowerCase().includes(q.toLowerCase()))
      );
    }
    res.json(items);
  });
  
  app.get(`/api/${resource}/:id`, (req, res) => {
    const db = readDB();
    const item = (db[resource] || []).find(i => i.id == req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json(item);
  });
  
  app.post(`/api/${resource}`, authRequired, (req, res) => {
    const db = readDB();
    const newId = Date.now();
    const newItem = { ...req.body, id: newId, _id: newId.toString(), createdAt: new Date().toISOString() };
    if (!db[resource]) db[resource] = [];
    db[resource].unshift(newItem);
    writeDB(db);
    res.status(201).json(newItem);
  });
  
  app.put(`/api/${resource}/:id`, authRequired, (req, res) => {
    const db = readDB();
    const index = (db[resource] || []).findIndex(i => i.id == req.params.id);
    if (index === -1) return res.status(404).json({ message: 'Not found' });
    db[resource][index] = { ...db[resource][index], ...req.body };
    writeDB(db);
    res.json(db[resource][index]);
  });
  
  app.delete(`/api/${resource}/:id`, authRequired, (req, res) => {
    const db = readDB();
    if (db[resource]) {
      db[resource] = db[resource].filter(i => i.id != req.params.id);
      writeDB(db);
    }
    res.json({ success: true });
  });
};

// Create all CRUD endpoints
createCRUD('news');
createCRUD('services');
createCRUD('documents');
createCRUD('media');
createCRUD('statistics');
createCRUD('leadership');
createCRUD('projects');
createCRUD('vacancies');
createCRUD('faqs');
createCRUD('partners');
createCRUD('testimonials');
createCRUD('gallery');
createCRUD('quickLinks');
createCRUD('announcements');

// ==================== SETTINGS ====================
app.get('/api/settings', (req, res) => {
  const db = readDB();
  res.json(db.settings);
});

app.put('/api/settings', authRequired, (req, res) => {
  const db = readDB();
  db.settings = { ...db.settings, ...req.body };
  writeDB(db);
  res.json(db.settings);
});

// ==================== HERO SLIDES ====================
app.get('/api/heroSlides', (req, res) => {
  const db = readDB();
  res.json(db.heroSlides.filter(s => s.active).sort((a, b) => a.order - b.order));
});

app.post('/api/heroSlides', authRequired, (req, res) => {
  const db = readDB();
  const newId = Date.now();
  const newSlide = { ...req.body, id: newId, _id: newId.toString() };
  db.heroSlides.push(newSlide);
  writeDB(db);
  res.status(201).json(newSlide);
});

app.put('/api/heroSlides/:id', authRequired, (req, res) => {
  const db = readDB();
  const index = db.heroSlides.findIndex(s => s.id == req.params.id);
  if (index === -1) return res.status(404).json({ message: 'Not found' });
  db.heroSlides[index] = { ...db.heroSlides[index], ...req.body };
  writeDB(db);
  res.json(db.heroSlides[index]);
});

app.delete('/api/heroSlides/:id', authRequired, (req, res) => {
  const db = readDB();
  db.heroSlides = db.heroSlides.filter(s => s.id != req.params.id);
  writeDB(db);
  res.json({ success: true });
});

// ==================== SUBSCRIBERS ====================
app.post('/api/subscribe', (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email required' });
  const db = readDB();
  if (!db.subscribers.find(s => s.email === email)) {
    db.subscribers.push({ id: Date.now(), email, subscribedAt: new Date().toISOString() });
    writeDB(db);
  }
  res.json({ success: true });
});

app.get('/api/subscribers', authRequired, (req, res) => {
  const db = readDB();
  res.json(db.subscribers);
});

app.delete('/api/subscribers/:id', authRequired, (req, res) => {
  const db = readDB();
  db.subscribers = db.subscribers.filter(s => s.id != req.params.id);
  writeDB(db);
  res.json({ success: true });
});

// ==================== CONTACT ====================
app.post('/api/contact', (req, res) => {
  const db = readDB();
  const newMsg = { ...req.body, id: Date.now(), createdAt: new Date().toISOString(), status: 'new' };
  db.contacts.unshift(newMsg);
  writeDB(db);
  res.status(201).json({ success: true });
});

app.get('/api/contact', authRequired, (req, res) => {
  const db = readDB();
  res.json(db.contacts);
});

app.put('/api/contact/:id', authRequired, (req, res) => {
  const db = readDB();
  const index = db.contacts.findIndex(c => c.id == req.params.id);
  if (index !== -1) {
    db.contacts[index] = { ...db.contacts[index], ...req.body };
    writeDB(db);
    res.json(db.contacts[index]);
  } else {
    res.status(404).json({ message: 'Not found' });
  }
});

app.delete('/api/contact/:id', authRequired, (req, res) => {
  const db = readDB();
  db.contacts = db.contacts.filter(c => c.id != req.params.id);
  writeDB(db);
  res.json({ success: true });
});

// ==================== STATISTICS DASHBOARD ====================
app.get('/api/dashboard-stats', authRequired, (req, res) => {
  const db = readDB();
  res.json({
    newsCount: db.news.length,
    servicesCount: db.services.length,
    documentsCount: db.documents.length,
    mediaCount: db.media.length,
    contactsCount: db.contacts.length,
    subscribersCount: db.subscribers.length,
    projectsCount: db.projects.length,
    vacanciesCount: db.vacancies.length
  });
});

// ==================== HEALTH ====================
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`🔐 Admin: ${ADMIN_EMAIL} / ${ADMIN_PASSWORD}`);
});