const defaultData = {
  siteConfig: {
    phone: '1900 123 456',
    email: 'info@gec-duhoc.edu.vn',
    address: '123 Nguyễn Huệ, Q.1, TP.HCM',
    telegramBotToken: '',
    telegramChatId: '',
    socials: {
      zalo: 'https://zalo.me/',
      telegram: 'https://t.me/',
      facebook: 'https://facebook.com/',
      messenger: 'https://m.me/',
      gmail: 'mailto:info@gec-duhoc.edu.vn',
      tiktok: 'https://tiktok.com/'
    },
    aiResponses: {
      'nhật': '🇯🇵 Du học Nhật Bản: Chi phí 180-250 triệu/năm, cần tiếng Nhật N5+. G-E-C có khóa đào tạo tiếng Nhật từ cơ bản.',
      'hàn': '🇰🇷 Du học Hàn Quốc: Chi phí 150-220 triệu/năm, cần TOPIK 2+. Nhiều học bổng GKS hấp dẫn.',
      'đức': '🇩🇪 Du học Đức: Miễn học phí tại nhiều bang! Chi phí sinh hoạt 120-200 triệu/năm. Cần B1 tiếng Đức.',
      'úc': '🇦🇺 Du học Úc: Chất lượng giáo dục top, chi phí 400-600 triệu/năm, IELTS 5.5+. Cơ hội định cư cao.',
      'canada': '🇨🇦 Du học Canada: Chi phí 350-500 triệu/năm, IELTS 6.0+. Chính sách định cư thuận lợi.',
      'mỹ': '🇺🇸 Du học Mỹ: Nền giáo dục số 1, chi phí 500-800 triệu/năm. Nhiều học bổng Fulbright.',
      'đài loan': '🇹🇼 Du học Đài Loan: Chi phí thấp 80-150 triệu/năm, gần Việt Nam. Học bổng phong phú.',
      'singapore': '🇸🇬 Du học Singapore: Trung tâm châu Á, 250-400 triệu/năm. Môi trường quốc tế.',
      'học bổng': '🎓 Các học bổng: MEXT (Nhật), GKS (Hàn), DAAD (Đức), ASEAN (Singapore)...',
      'đăng ký': '📝 Bạn có thể đăng ký tư vấn miễn phí bằng cách điền form hoặc để lại SĐT tại đây!'
    }
  },
  countries: [
    { name:'Nhật Bản', slug:'nhatban', flag:'🇯🇵', image:'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600', desc:'Du học Nhật Bản với nền giáo dục tiên tiến, cơ hội việc làm cao.', condition:'Tốt nghiệp THPT, tiếng Nhật N5+', cost:'180-250 triệu/năm', scholarship:'MEXT, JASSO' },
    { name:'Hàn Quốc', slug:'hanquoc', flag:'🇰🇷', image:'https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?w=600', desc:'Du học Hàn Quốc với làn sóng văn hóa Hallyu.', condition:'Tốt nghiệp THPT, TOPIK 2+', cost:'150-220 triệu/năm', scholarship:'GKS' },
    { name:'Đức', slug:'duc', flag:'🇩🇪', image:'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=600', desc:'Du học Đức miễn học phí tại nhiều bang.', condition:'Tốt nghiệp THPT, B1 tiếng Đức', cost:'120-200 triệu/năm', scholarship:'DAAD' },
    { name:'Úc', slug:'uc', flag:'🇦🇺', image:'https://images.unsplash.com/photo-1507692049790-de58290a4334?w=600', desc:'Du học Úc môi trường sống tuyệt vời.', condition:'Tốt nghiệp THPT, IELTS 5.5+', cost:'400-600 triệu/năm', scholarship:'Chính phủ Úc' },
    { name:'Canada', slug:'canada', flag:'🇨🇦', image:'https://images.unsplash.com/photo-1517935706615-2717063c2225?w=600', desc:'Du học Canada - cửa ngõ định cư.', condition:'Tốt nghiệp THPT, IELTS 6.0+', cost:'350-500 triệu/năm', scholarship:'Vanier' },
    { name:'Mỹ', slug:'my', flag:'🇺🇸', image:'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=600', desc:'Du học Mỹ - nền giáo dục số 1.', condition:'Tốt nghiệp THPT, IELTS 6.5+', cost:'500-800 triệu/năm', scholarship:'Fulbright' },
    { name:'Đài Loan', slug:'dailoan', flag:'🇹🇼', image:'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=600', desc:'Du học Đài Loan chi phí thấp.', condition:'Tốt nghiệp THPT, TOCFL 1+', cost:'80-150 triệu/năm', scholarship:'Bộ GD Đài Loan' },
    { name:'Singapore', slug:'singapore', flag:'🇸🇬', image:'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600', desc:'Du học Singapore - trung tâm châu Á.', condition:'Tốt nghiệp THPT, IELTS 5.5+', cost:'250-400 triệu/năm', scholarship:'ASEAN' }
  ],
  scholarships: [
    { name:'MEXT Nhật Bản', country:'Nhật Bản', value:'Toàn phần', deadline:'30/06/2026' },
    { name:'GKS Hàn Quốc', country:'Hàn Quốc', value:'Toàn phần', deadline:'15/09/2026' }
  ],
  courses: [
    { name:'Tiếng Nhật N5-N3', duration:'6 tháng', price:'12 triệu' },
    { name:'Tiếng Hàn TOPIK 1-4', duration:'8 tháng', price:'15 triệu' },
    { name:'Tiếng Đức A1-B1', duration:'9 tháng', price:'18 triệu' },
    { name:'IELTS 5.5-7.0', duration:'4 tháng', price:'16 triệu' }
  ],
  posts: [
    { title:'Cơ hội du học Nhật 2026', excerpt:'Nhật Bản tiếp tục mở cửa...', date:'2026-05-20', image:'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400', category:'Du học' }
  ],
  students: [
    { name:'Nguyễn Minh Anh', country:'Nhật Bản', quote:'G-E-C giúp em đỗ ĐH Tokyo.', avatar:'https://i.pravatar.cc/150?img=1', achievement:'ĐH Tokyo' }
  ]
};

let siteData = JSON.parse(localStorage.getItem('gec_site_data')) || defaultData;

async function loadSiteData() {
  const gistData = await GistAPI.load();
  if (gistData) {
    siteData = gistData;
    localStorage.setItem('gec_site_data', JSON.stringify(gistData));
  }
}

// ========== RENDER FUNCTIONS ==========
function renderCountries() {
  const grid = document.getElementById('countryGrid');
  if (!grid) return;
  grid.innerHTML = siteData.countries.map(c => `
    <div class="col-md-4 col-sm-6" data-aos="fade-up">
      <a href="${c.slug}.html" class="country-card glass-card">
        <img src="${c.image}" alt="${c.name}">
        <div class="country-overlay"><h4>${c.flag} ${c.name}</h4></div>
      </a>
    </div>
  `).join('');
}

function renderScholarships() {
  const grid = document.getElementById('scholarshipGrid');
  if (!grid || !siteData.scholarships.length) return;
  grid.innerHTML = siteData.scholarships.map(s => `
    <div class="col-md-4"><div class="glass-card p-4"><span class="badge" style="background:var(--brown)">${s.country}</span><h5>${s.name}</h5><p>${s.value} - ${s.deadline}</p></div></div>
  `).join('');
}

function renderCourses() {
  const grid = document.getElementById('courseGrid');
  if (!grid || !siteData.courses.length) return;
  grid.innerHTML = siteData.courses.map(c => `
    <div class="col-md-3"><div class="glass-card p-4 text-center"><h5>${c.name}</h5><p>${c.duration} - ${c.price}</p></div></div>
  `).join('');
}

function renderPosts() {
  const grid = document.getElementById('newsGrid');
  if (!grid || !siteData.posts.length) return;
  grid.innerHTML = siteData.posts.map(p => `
    <div class="col-md-4"><div class="glass-card"><img src="${p.image}" style="width:100%;height:200px;object-fit:cover"><div class="p-3"><h5>${p.title}</h5><small>${p.date}</small></div></div></div>
  `).join('');
}

function renderStudents() {
  const slider = document.getElementById('studentSlider');
  if (!slider || !siteData.students.length) return;
  slider.innerHTML = siteData.students.map(s => `
    <div class="swiper-slide"><div class="glass-card p-4 text-center"><img src="${s.avatar}" style="width:80px;height:80px;border-radius:50%"><h5>${s.name}</h5><p>"${s.quote}"</p></div></div>
  `).join('');
  if (window.swiper && window.swiper.update) window.swiper.update();
}

// ========== AI CHAT ==========
function initAIChat() {
  const toggle = document.getElementById('aiChatToggle');
  const close = document.getElementById('aiChatClose');
  const send = document.getElementById('aiChatSend');
  const input = document.getElementById('aiChatInput');
  const messages = document.getElementById('aiChatMessages');
  if (!toggle) return;
  toggle.onclick = () => document.getElementById('aiChatWindow').classList.toggle('open');
  close.onclick = () => document.getElementById('aiChatWindow').classList.remove('open');
  send.onclick = () => {
    const msg = input.value.trim();
    if (!msg) return;
    messages.innerHTML += `<div class="ai-message user">${msg}</div>`;
    input.value = '';
    const lower = msg.toLowerCase();
    let reply = `Cảm ơn bạn, hãy gọi hotline ${siteData.siteConfig.phone}`;
    for (let [k, v] of Object.entries(siteData.siteConfig.aiResponses)) {
      if (lower.includes(k)) { reply = v; break; }
    }
    setTimeout(() => {
      messages.innerHTML += `<div class="ai-message bot">${reply}</div>`;
      messages.scrollTop = messages.scrollHeight;
    }, 500);
  };
}

// ========== DOCK ==========
function initDock() {
  const menu = document.getElementById('dockMenu');
  if (!menu) return;
  const s = siteData.siteConfig.socials;
  menu.innerHTML = `
    <a href="${s.zalo}" target="_blank" class="dock-item" style="background:#0068ff"><i class="fas fa-comment-dots"></i></a>
    <a href="${s.telegram}" target="_blank" class="dock-item" style="background:#0088cc"><i class="fab fa-telegram-plane"></i></a>
    <a href="${s.facebook}" target="_blank" class="dock-item"><i class="fab fa-facebook-f"></i></a>
    <a href="${s.messenger}" target="_blank" class="dock-item" style="background:#0084ff"><i class="fab fa-facebook-messenger"></i></a>
    <a href="${s.gmail}" class="dock-item" style="background:#ea4335"><i class="fas fa-envelope"></i></a>
    <a href="${s.tiktok}" target="_blank" class="dock-item"><i class="fab fa-tiktok"></i></a>
  `;
  document.getElementById('dockToggle').onclick = () => menu.classList.toggle('open');
}

// ========== FORM ĐĂNG KÝ ==========
function initRegisterForm() {
  const form = document.getElementById('registerForm');
  if (!form) return;
  form.onsubmit = async (e) => {
    e.preventDefault();
    const entry = {
      name: document.getElementById('regName').value,
      phone: document.getElementById('regPhone').value,
      email: document.getElementById('regEmail').value,
      country: document.getElementById('regCountry').value,
      note: document.getElementById('regNote').value,
      timestamp: new Date().toISOString()
    };
    // Gửi Telegram
    const botToken = siteData.siteConfig.telegramBotToken;
    const chatId = siteData.siteConfig.telegramChatId;
    if (botToken && chatId) {
      const text = `📩 Đăng ký mới:\n👤 ${entry.name}\n📞 ${entry.phone}\n📧 ${entry.email}\n🌍 ${entry.country}\n📝 ${entry.note}`;
      fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ chat_id: chatId, text })
      }).catch(() => {});
    }
    // Lưu local
    let regs = JSON.parse(localStorage.getItem('gec_registrations')||'[]');
    regs.push(entry);
    localStorage.setItem('gec_registrations', JSON.stringify(regs));
    form.style.display='none';
    document.getElementById('registerSuccess').classList.remove('d-none');
    setTimeout(() => {
      form.style.display='block';
      document.getElementById('registerSuccess').classList.add('d-none');
      form.reset();
    }, 3000);
  };
}

// ========== KHỞI TẠO ==========
(async function() {
  await loadSiteData();
  renderCountries();
  renderScholarships();
  renderCourses();
  renderPosts();
  renderStudents();
  initAIChat();
  initDock();
  initRegisterForm();
  if (typeof AOS !== 'undefined') AOS.init({ duration: 800, once: true });
  if (typeof Swiper !== 'undefined' && document.querySelector('.studentSwiper')) {
    window.swiper = new Swiper('.studentSwiper', {
      slidesPerView: 1, spaceBetween: 20, loop: true,
      autoplay: { delay: 4000 },
      pagination: { el: '.swiper-pagination', clickable: true },
      navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
      breakpoints: { 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }
    });
  }
  setTimeout(() => document.getElementById('loading-screen')?.classList.add('hidden'), 1500);
})();
