// Dữ liệu admin toàn cục
let adminData = {
  siteConfig: {
    phone: '', email: '', address: '',
    telegramBotToken: '', telegramChatId: '',
    logoUrl: 'https://img.upanhnhanh.com/8810234eeb91bf4e9ffdb38f28e2d106',
    socials: { zalo:'', telegram:'', facebook:'', messenger:'', gmail:'', tiktok:'' },
    aiResponses: {}
  },
  countries: [],
  scholarships: [],
  courses: [],
  posts: [],
  students: []
};

// ========== LOCAL STORAGE ==========
function loadLocal() {
  const saved = localStorage.getItem('gec_admin_data');
  if (saved) { try { adminData = JSON.parse(saved); } catch(e){} }
}
function saveLocal() {
  localStorage.setItem('gec_admin_data', JSON.stringify(adminData));
}

// ========== GIST ==========
async function loadFromGist() {
  if (!GistAPI.gistId) return;
  try {
    const data = await GistAPI.load();
    if (data) {
      adminData = data;
      saveLocal();
      renderAll();
      fillSettings();
    }
  } catch(e){}
}
async function syncToGist() {
  if (!GistAPI.token || !GistAPI.gistId) return alert('Cần Token và Gist ID');
  try {
    await GistAPI.save(adminData);
    alert('Đồng bộ thành công!');
  } catch(e) { alert('Lỗi: '+e.message); }
}

// ========== RENDER ==========
function renderList(type) {
  const list = document.getElementById(type+'List');
  if (!list) return;
  const items = adminData[type] || [];
  list.innerHTML = items.map((item,i) => `
    <div class="list-group-item">
      <span>${item.name || item.title || '(Không tên)'}</span>
      <div>
        <button class="btn btn-sm btn-outline-secondary edit-btn" data-type="${type}" data-index="${i}"><i class="fas fa-edit"></i></button>
        <button class="btn btn-sm btn-outline-danger delete-btn" data-type="${type}" data-index="${i}"><i class="fas fa-trash"></i></button>
      </div>
    </div>
  `).join('');
}

function renderAll() {
  renderList('countries');
  renderList('scholarships');
  renderList('courses');
  renderList('posts');
  renderList('students');
  // Cập nhật dashboard
  document.getElementById('countryCount').textContent = adminData.countries.length;
  document.getElementById('postCount').textContent = adminData.posts.length;
}

// ========== FORM ==========
function showForm(type, index=null) {
  const form = document.getElementById(type+'Form');
  if (!form) return;
  form.classList.remove('d-none');
  if (index !== null) {
    document.getElementById(type+'Index').value = index;
    const item = adminData[type][index];
    for (let key in item) {
      const el = document.getElementById(type[0] + key.charAt(0).toUpperCase() + key.slice(1));
      if (el) el.value = item[key] || '';
    }
  } else {
    form.reset();
    document.getElementById(type+'Index').value = '';
  }
}

function saveForm(type, e) {
  e.preventDefault();
  const form = e.target;
  const indexEl = form.querySelector('[id$="Index"]');
  const index = indexEl ? indexEl.value : '';
  const newItem = {};
  form.querySelectorAll('input, textarea').forEach(input => {
    if (input.id && !input.id.includes('Index')) {
      let key = input.id.substring(1);
      key = key.charAt(0).toLowerCase() + key.slice(1);
      newItem[key] = input.value;
    }
  });
  if (index !== '') {
    adminData[type][parseInt(index)] = newItem;
  } else {
    adminData[type].push(newItem);
  }
  saveLocal();
  renderAll();
  form.classList.add('d-none');
}

function deleteItem(type, index) {
  if (confirm('Xóa?')) {
    adminData[type].splice(index,1);
    saveLocal();
    renderAll();
  }
}

// ========== CÀI ĐẶT ==========
function fillSettings() {
  const cfg = adminData.siteConfig;
  document.getElementById('setPhone').value = cfg.phone || '';
  document.getElementById('setEmail').value = cfg.email || '';
  document.getElementById('setAddress').value = cfg.address || '';
  document.getElementById('telegramBotToken').value = cfg.telegramBotToken || '';
  document.getElementById('telegramChatId').value = cfg.telegramChatId || '';
  document.getElementById('logoUrl').value = cfg.logoUrl || '';
  document.getElementById('aiResponses').value = JSON.stringify(cfg.aiResponses || {}, null, 2);
  // socials
  const socialsDiv = document.getElementById('socialsContainer');
  if (socialsDiv) {
    socialsDiv.innerHTML = '';
    for (let [key,val] of Object.entries(cfg.socials||{})) {
      socialsDiv.innerHTML += `<div class="col-md-6"><label>${key}</label><input class="form-control social-input" data-key="${key}" value="${val}"></div>`;
    }
  }
}

function saveSettings() {
  const cfg = adminData.siteConfig;
  cfg.phone = document.getElementById('setPhone').value;
  cfg.email = document.getElementById('setEmail').value;
  cfg.address = document.getElementById('setAddress').value;
  cfg.telegramBotToken = document.getElementById('telegramBotToken').value;
  cfg.telegramChatId = document.getElementById('telegramChatId').value;
  cfg.logoUrl = document.getElementById('logoUrl').value;
  try {
    cfg.aiResponses = JSON.parse(document.getElementById('aiResponses').value);
  } catch(e) { alert('AI Responses không đúng JSON'); return; }
  document.querySelectorAll('.social-input').forEach(input => {
    cfg.socials[input.dataset.key] = input.value;
  });
  saveLocal();
  alert('Đã lưu cài đặt!');
}

// ========== ĐẾM LƯỢT TRUY CẬP ==========
async function fetchVisitCount() {
  try {
    const res = await fetch('https://api.countapi.xyz/get/gec-duhoc/visits');
    const data = await res.json();
    document.getElementById('visitCount').textContent = data.value || 0;
  } catch(e) {
    document.getElementById('visitCount').textContent = 'Lỗi';
  }
}

// ========== SỰ KIỆN KHỞI TẠO ==========
document.addEventListener('DOMContentLoaded', ()=>{
  loadLocal();
  // Nếu chưa có dữ liệu, khởi tạo mặc định
  if (!adminData.countries.length && !localStorage.getItem('gec_admin_data')) {
    adminData = {
      siteConfig: {
        phone: '1900 123 456', email: 'info@gec-duhoc.edu.vn', address: '123 Nguyễn Huệ',
        telegramBotToken: '', telegramChatId: '',
        logoUrl: 'https://img.upanhnhanh.com/8810234eeb91bf4e9ffdb38f28e2d106',
        socials: { zalo:'https://zalo.me/', telegram:'https://t.me/', facebook:'https://fb.com/', messenger:'https://m.me/', gmail:'mailto:info@gec-duhoc.edu.vn', tiktok:'https://tiktok.com/' },
        aiResponses: { 'nhật':'🇯🇵 Du học Nhật...', 'hàn':'🇰🇷 Du học Hàn...' }
      },
      countries: [
        { name:'Nhật Bản', slug:'nhatban', flag:'🇯🇵', image:'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600', desc:'...', condition:'N5', cost:'180-250 triệu', scholarship:'MEXT' }
      ],
      scholarships: [],
      courses: [],
      posts: [],
      students: []
    };
    saveLocal();
  }
  renderAll();
  fillSettings();
  fetchVisitCount();
  if (GistAPI.token && GistAPI.gistId) loadFromGist();
});

// Nút đồng bộ
document.getElementById('syncGistBtn').addEventListener('click', syncToGist);
document.getElementById('exportBtn').addEventListener('click', ()=>{
  const blob = new Blob([JSON.stringify(adminData, null, 2)], {type:'application/json'});
  const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'gec-backup.json'; a.click();
});
document.getElementById('importFile').addEventListener('change', function(e){
  const file = e.target.files[0]; if(!file) return;
  const reader = new FileReader();
  reader.onload = function(ev){
    try {
      const imported = JSON.parse(ev.target.result);
      if (imported.siteConfig) {
        adminData = imported; saveLocal(); renderAll(); fillSettings(); alert('Đã nhập!');
      } else alert('File không hợp lệ');
    } catch(ex) { alert('Lỗi đọc file'); }
  };
  reader.readAsText(file);
});
document.getElementById('refreshVisits').addEventListener('click', fetchVisitCount);
document.getElementById('saveSettingsBtn').addEventListener('click', saveSettings);

// Thêm/sửa/xóa cho từng loại
['country', 'scholarship', 'course', 'post', 'student'].forEach(type => {
  document.getElementById('add'+type.charAt(0).toUpperCase()+type.slice(1)+'Btn')?.addEventListener('click', ()=>showForm(type));
  document.getElementById(type+'Form')?.addEventListener('submit', e=>saveForm(type, e));
});

document.body.addEventListener('click', function(e){
  if (e.target.closest('.edit-btn')) {
    const btn = e.target.closest('.edit-btn');
    showForm(btn.dataset.type, parseInt(btn.dataset.index));
  }
  if (e.target.closest('.delete-btn')) {
    const btn = e.target.closest('.delete-btn');
    deleteItem(btn.dataset.type, parseInt(btn.dataset.index));
  }
});
