const defaultData = {
  siteConfig: {
    phone: '1900 123 456',
    email: 'info@gec-duhoc.edu.vn',
    address: '123 Nguyễn Huệ, TP.HCM',
    telegramBotToken: '',
    telegramChatId: '',
    logoUrl: 'https://img.upanhnhanh.com/8810234eeb91bf4e9ffdb38f28e2d106',
    aiApiKey: '',
    aiModel: 'gpt-3.5-turbo',
    socials: {
      zalo: 'https://zalo.me/',
      telegram: 'https://t.me/',
      facebook: 'https://facebook.com/',
      messenger: 'https://m.me/',
      gmail: 'mailto:info@gec-duhoc.edu.vn',
      tiktok: 'https://tiktok.com/'
    },
    aiResponses: {
      'nhật': '🇯🇵 Du học Nhật Bản: Chi phí 180-250 triệu/năm, cần N5.',
      'hàn': '🇰🇷 Du học Hàn Quốc: Chi phí 150-220 triệu, TOPIK 2.',
      'đức': '🇩🇪 Du học Đức: Miễn học phí, chi phí sinh hoạt 120-200 triệu.',
      'học bổng': '🎓 Học bổng MEXT, GKS, DAAD...'
    }
  },
  countries: [
    { name:'Nhật Bản', slug:'nhatban', flag:'🇯🇵', image:'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600', desc:'Du học Nhật Bản với nền giáo dục tiên tiến, cơ hội việc làm cao.', condition:'Tốt nghiệp THPT, tiếng Nhật N5+', cost:'180-250 triệu/năm', scholarship:'MEXT, JASSO' },
    { name:'Hàn Quốc', slug:'hanquoc', flag:'🇰🇷', image:'https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?w=600', desc:'Du học Hàn Quốc với làn sóng Hallyu.', condition:'Tốt nghiệp THPT, TOPIK 2+', cost:'150-220 triệu/năm', scholarship:'GKS' },
    { name:'Đức', slug:'duc', flag:'🇩🇪', image:'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=600', desc:'Du học Đức miễn học phí tại nhiều bang.', condition:'Tốt nghiệp THPT, B1 tiếng Đức', cost:'120-200 triệu/năm', scholarship:'DAAD' },
    { name:'Úc', slug:'uc', flag:'🇦🇺', image:'https://images.unsplash.com/photo-1507692049790-de58290a4334?w=600', desc:'Du học Úc với môi trường sống tuyệt vời.', condition:'Tốt nghiệp THPT, IELTS 5.5+', cost:'400-600 triệu/năm', scholarship:'Chính phủ Úc' },
    { name:'Canada', slug:'canada', flag:'🇨🇦', image:'https://images.unsplash.com/photo-1517935706615-2717063c2225?w=600', desc:'Du học Canada - cửa ngõ định cư.', condition:'Tốt nghiệp THPT, IELTS 6.0+', cost:'350-500 triệu/năm', scholarship:'Vanier' },
    { name:'Mỹ', slug:'my', flag:'🇺🇸', image:'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=600', desc:'Du học Mỹ - nền giáo dục số 1.', condition:'Tốt nghiệp THPT, IELTS 6.5+', cost:'500-800 triệu/năm', scholarship:'Fulbright' },
    { name:'Đài Loan', slug:'dailoan', flag:'🇹🇼', image:'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=600', desc:'Du học Đài Loan chi phí thấp.', condition:'Tốt nghiệp THPT, TOCFL 1+', cost:'80-150 triệu/năm', scholarship:'Bộ GD Đài Loan' },
    { name:'Singapore', slug:'singapore', flag:'🇸🇬', image:'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600', desc:'Du học Singapore - trung tâm châu Á.', condition:'Tốt nghiệp THPT, IELTS 5.5+', cost:'250-400 triệu/năm', scholarship:'ASEAN' }
  ],
  scholarships: [],
  courses: [],
  posts: [],
  students: []
};

let siteData = JSON.parse(localStorage.getItem('gec_site_data')) || defaultData;

async function loadSiteData() {
  if (typeof GistAPI !== 'undefined') {
    const gistData = await GistAPI.load();
    if (gistData) {
      siteData = gistData;
      localStorage.setItem('gec_site_data', JSON.stringify(gistData));
    }
  }
}

function hideLoader() {
  const loader = document.getElementById('loading-screen');
  if (loader) loader.classList.add('hidden');
}

function renderCountries() {
  const grid = document.getElementById('countryGrid');
  if (!grid) return;
  grid.innerHTML = siteData.countries.map(c => `
    <div class="col-md-4 col-sm-6" data-aos="fade-up">
      <a href="${c.slug}.html" class="country-card">
        <img src="${c.image}" alt="${c.name}">
        <div class="country-overlay"><h4>${c.flag} ${c.name}</h4></div>
      </a>
    </div>
  `).join('');
}

function applyLogo() {
  const logoUrl = siteData.siteConfig.logoUrl;
  document.querySelectorAll('.logo-img').forEach(img => img.src = logoUrl);
  const favicon = document.getElementById('dynamicFavicon');
  if (favicon) favicon.href = logoUrl;
}

async function sendAIMessage(msg) {
  const apiKey = siteData.siteConfig.aiApiKey;
  const model = siteData.siteConfig.aiModel || 'gpt-3.5-turbo';
  if (apiKey) {
    try {
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
        body: JSON.stringify({ model, messages: [{ role: 'user', content: msg }] })
      });
      const data = await res.json();
      return data.choices[0].message.content;
    } catch (e) { return 'Lỗi AI, thử lại sau.'; }
  } else {
    let reply = `Cảm ơn bạn, gọi ${siteData.siteConfig.phone} để được tư vấn.`;
    const lower = msg.toLowerCase();
    for (let [k, v] of Object.entries(siteData.siteConfig.aiResponses)) {
      if (lower.includes(k)) { reply = v; break; }
    }
    return reply;
  }
}

function initAI() {
  const toggle = document.getElementById('aiChatToggle');
  const close = document.getElementById('aiChatClose');
  const send = document.getElementById('aiChatSend');
  const input = document.getElementById('aiChatInput');
  const messages = document.getElementById('aiChatMessages');
  const windowChat = document.getElementById('aiChatWindow');
  if (!toggle || !close || !send || !input || !messages || !windowChat) return;
  toggle.onclick = () => windowChat.classList.toggle('open');
  close.onclick = () => windowChat.classList.remove('open');
  send.onclick = async () => {
    const msg = input.value.trim();
    if (!msg) return;
    messages.innerHTML += `<div class="ai-message user">${msg}</div>`;
    input.value = '';
    const reply = await sendAIMessage(msg);
    messages.innerHTML += `<div class="ai-message bot">${reply}</div>`;
    messages.scrollTop = messages.scrollHeight;
  };
}

function initDock() {
  const dockToggle = document.getElementById('dockToggle');
  const dockMenu = document.getElementById('dockMenu');
  if (!dockToggle || !dockMenu) return;
  const s = siteData.siteConfig.socials;
  dockMenu.innerHTML = `
    <a href="${s.zalo}" target="_blank" class="dock-item" style="background:#0068ff"><i class="fas fa-comment-dots"></i></a>
    <a href="${s.telegram}" target="_blank" class="dock-item" style="background:#0088cc"><i class="fab fa-telegram-plane"></i></a>
    <a href="${s.facebook}" target="_blank" class="dock-item"><i class="fab fa-facebook-f"></i></a>
    <a href="${s.messenger}" target="_blank" class="dock-item" style="background:#0084ff"><i class="fab fa-facebook-messenger"></i></a>
    <a href="${s.gmail}" class="dock-item" style="background:#ea4335"><i class="fas fa-envelope"></i></a>
    <a href="${s.tiktok}" target="_blank" class="dock-item"><i class="fab fa-tiktok"></i></a>
  `;
  dockToggle.onclick = () => dockMenu.classList.toggle('open');
}

function initRegisterForm() {
  const form = document.getElementById('registerForm');
  if (!form) return;
  form.onsubmit = async (e) => {
    e.preventDefault();
    const entry = {
      name: document.getElementById('regName')?.value || '',
      phone: document.getElementById('regPhone')?.value || '',
      email: document.getElementById('regEmail')?.value || '',
      country: document.getElementById('regCountry')?.value || '',
      note: document.getElementById('regNote')?.value || '',
      timestamp: new Date().toISOString()
    };
    const botToken = siteData.siteConfig.telegramBotToken;
    const chatId = siteData.siteConfig.telegramChatId;
    if (botToken && chatId) {
      fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: `📩 Đăng ký mới:\n👤 ${entry.name}\n📞 ${entry.phone}\n📧 ${entry.email}\n🌍 ${entry.country}\n📝 ${entry.note}`
        })
      }).catch(() => {});
    }
    let regs = JSON.parse(localStorage.getItem('gec_registrations') || '[]');
    regs.push(entry);
    localStorage.setItem('gec_registrations', JSON.stringify(regs));
    form.style.display = 'none';
    document.getElementById('registerSuccess').classList.remove('d-none');
    setTimeout(() => {
      form.style.display = 'block';
      document.getElementById('registerSuccess').classList.add('d-none');
      form.reset();
    }, 3000);
  };
}

async function init() {
  await loadSiteData();
  renderCountries();
  applyLogo();
  initAI();
  initDock();
  initRegisterForm();
  hideLoader();
  fetch('https://api.countapi.xyz/hit/gec-duhoc/visits').catch(() => {});
  if (typeof AOS !== 'undefined') AOS.init({ duration: 800, once: true });
}

window.addEventListener('DOMContentLoaded', init);
