// Dữ liệu quản trị toàn cục (được tải từ localStorage hoặc Gist)
let adminData = {
  siteConfig: {
    phone: '',
    email: '',
    address: '',
    telegramBotToken: '',
    telegramChatId: '',
    logoBase64: '',
    socials: {
      zalo: '',
      telegram: '',
      facebook: '',
      messenger: '',
      gmail: '',
      tiktok: ''
    },
    aiResponses: {}
  },
  countries: [],
  scholarships: [],
  courses: [],
  posts: [],
  students: []
};

// Biến tạm cho logo upload
let tempLogoBase64 = null;

// ========== LOCAL STORAGE ==========
function loadFromLocal() {
  const saved = localStorage.getItem('gec_admin_data');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      adminData = parsed;
    } catch (e) {}
  }
}

function saveToLocal() {
  localStorage.setItem('gec_admin_data', JSON.stringify(adminData));
}

// ========== GIST ==========
async function loadFromGist() {
  const gistId = localStorage.getItem('gec_gist_id');
  if (!gistId) return;
  try {
    const data = await GistAPI.load();
    if (data) {
      adminData = data;
      saveToLocal();
      renderAll();
      fillSettingsForm();
    }
  } catch (e) {}
}

async function syncToGist() {
  if (!GistAPI.token || !GistAPI.gistId) {
    alert('Vui lòng nhập GitHub Token và Gist ID');
    return;
  }
  try {
    await GistAPI.save(adminData);
    alert('Đồng bộ thành công!');
  } catch (e) {
    alert('Lỗi đồng bộ: ' + e.message);
  }
}

// ========== RENDER DANH SÁCH ==========
function renderList(type) {
  const listEl = document.getElementById(type + 'List');
  if (!listEl) return;
  const items = adminData[type];
  if (!items) return;
  listEl.innerHTML = items.map((item, i) => `
    <div class="list-group-item d-flex justify-content-between align-items-center">
      <span>${item.name || item.title || item.name || '(Không tên)'}</span>
      <div>
        <button class="btn btn-sm btn-outline-info edit-btn" data-type="${type}" data-index="${i}"><i class="fas fa-edit"></i></button>
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
}

// ========== HIỂN THỊ FORM ==========
function showForm(type, index = null) {
  const form = document.getElementById(type + 'Form');
  if (!form) return;
  form.classList.remove('d-none');
  if (index !== null) {
    document.getElementById(type + 'Index').value = index;
    const item = adminData[type][index];
    // Tự động điền các trường
    for (let key in item) {
      const el = document.getElementById(type[0] + key.charAt(0).toUpperCase() + key.slice(1));
      if (el) el.value = item[key] || '';
    }
  } else {
    form.reset();
    document.getElementById(type + 'Index').value = '';
  }
}

// ========== LƯU FORM ==========
function saveForm(type, e) {
  e.preventDefault();
  const form = e.target;
  const indexEl = form.querySelector('[id$="Index"]');
  const index = indexEl ? indexEl.value : '';
  const newItem = {};
  // Lấy tất cả input/textarea trong form, ánh xạ tên trường
  form.querySelectorAll('input, textarea').forEach(input => {
    if (input.id && !input.id.includes('Index')) {
      // Chuyển đổi id thành key (vd: cName -> name, cDesc -> desc)
      let key = input.id.substring(1); // bỏ ký tự đầu tiên (c, s, co, p, st)
      key = key.charAt(0).toLowerCase() + key.slice(1); // viết thường chữ cái đầu
      newItem[key] = input.value;
    }
  });
  if (index !== '') {
    adminData[type][parseInt(index)] = newItem;
  } else {
    adminData[type].push(newItem);
  }
  saveToLocal();
  renderAll();
  form.classList.add('d-none');
}

// ========== XÓA ==========
function deleteItem(type, index) {
  if (confirm('Bạn có chắc muốn xóa?')) {
    adminData[type].splice(index, 1);
    saveToLocal();
    renderAll();
  }
}

// ========== CÀI ĐẶT CHUNG ==========
function fillSettingsForm() {
  const cfg = adminData.siteConfig;
  document.getElementById('setPhone').value = cfg.phone || '';
  document.getElementById('setEmail').value = cfg.email || '';
  document.getElementById('setAddress').value = cfg.address || '';
  document.getElementById('telegramBotToken').value = cfg.telegramBotToken || '';
  document.getElementById('telegramChatId').value = cfg.telegramChatId || '';
  document.getElementById('aiResponses').value = JSON.stringify(cfg.aiResponses || {}, null, 2);
  // Hiển thị logo nếu có
  if (cfg.logoBase64) {
    document.getElementById('logoPreview').src = cfg.logoBase64;
    document.getElementById('logoPreview').style.display = 'block';
  }
  // Socials
  const container = document.getElementById('socialsContainer');
  if (container) {
    container.innerHTML = '';
    for (let [key, value] of Object.entries(cfg.socials || {})) {
      container.innerHTML += `
        <div class="col-md-6"><label>${key.charAt(0).toUpperCase()+key.slice(1)}</label><input class="form-control social-input" data-key="${key}" value="${value}"></div>
      `;
    }
  }
}

function saveSettings() {
  adminData.siteConfig.phone = document.getElementById('setPhone').value;
  adminData.siteConfig.email = document.getElementById('setEmail').value;
  adminData.siteConfig.address = document.getElementById('setAddress').value;
  adminData.siteConfig.telegramBotToken = document.getElementById('telegramBotToken').value;
  adminData.siteConfig.telegramChatId = document.getElementById('telegramChatId').value;
  try {
    adminData.siteConfig.aiResponses = JSON.parse(document.getElementById('aiResponses').value);
  } catch (e) {
    alert('AI Responses không đúng định dạng JSON');
    return;
  }
  // Lưu socials
  document.querySelectorAll('.social-input').forEach(input => {
    const key = input.dataset.key;
    adminData.siteConfig.socials[key] = input.value;
  });
  // Logo
  if (tempLogoBase64) {
    adminData.siteConfig.logoBase64 = tempLogoBase64;
  }
  saveToLocal();
  alert('Đã lưu cài đặt!');
}

// ========== SỰ KIỆN ==========
document.addEventListener('DOMContentLoaded', () => {
  loadFromLocal();
  // Nếu chưa có dữ liệu, tạo mặc định tối thiểu
  if (!adminData.countries.length && !localStorage.getItem('gec_admin_data')) {
    // Tải từ defaultData nếu có (có thể import từ app.js, nhưng ta tự tạo)
    adminData = {
      siteConfig: {
        phone: '1900 123 456',
        email: 'info@gec-duhoc.edu.vn',
        address: '123 Nguyễn Huệ, Q.1',
        telegramBotToken: '',
        telegramChatId: '',
        logoBase64: '',
        socials: {
          zalo: 'https://zalo.me/',
          telegram: 'https://t.me/',
          facebook: 'https://facebook.com/',
          messenger: 'https://m.me/',
          gmail: 'mailto:info@gec-duhoc.edu.vn',
          tiktok: 'https://tiktok.com/'
        },
        aiResponses: { 'nhật': '🇯🇵 ...', 'hàn': '🇰🇷 ...' }
      },
      countries: [
        { name:'Nhật Bản', slug:'nhatban', flag:'🇯🇵', image:'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600', desc:'...', condition:'N5', cost:'180-250 triệu', scholarship:'MEXT' }
      ],
      scholarships: [],
      courses: [],
      posts: [],
      students: []
    };
    saveToLocal();
  }
  renderAll();
  fillSettingsForm();

  // Tự động load từ Gist nếu có token
  if (localStorage.getItem('gec_github_token') && localStorage.getItem('gec_gist_id')) {
    loadFromGist();
  }
});

// Nút đồng bộ
document.getElementById('syncGistBtn').addEventListener('click', syncToGist);

// Export JSON
document.getElementById('exportBtn').addEventListener('click', () => {
  const blob = new Blob([JSON.stringify(adminData, null, 2)], {type: 'application/json'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'gec-backup.json';
  a.click();
});

// Import JSON
document.getElementById('importFile').addEventListener('change', function(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(ev) {
    try {
      const imported = JSON.parse(ev.target.result);
      if (imported.siteConfig && imported.countries) {
        adminData = imported;
        saveToLocal();
        renderAll();
        fillSettingsForm();
        alert('Đã nhập dữ liệu!');
      } else {
        alert('File JSON không đúng cấu trúc');
      }
    } catch (ex) {
      alert('Lỗi đọc file');
    }
  };
  reader.readAsText(file);
});

// Xử lý thêm/sửa/xóa cho từng loại
['country', 'scholarship', 'course', 'post', 'student'].forEach(type => {
  document.getElementById('add' + type.charAt(0).toUpperCase()+type.slice(1)+'Btn')?.addEventListener('click', () => showForm(type));
  document.getElementById(type + 'Form')?.addEventListener('submit', e => saveForm(type, e));
});

// Sự kiện toàn cục cho nút sửa/xóa
document.body.addEventListener('click', function(e) {
  if (e.target.closest('.edit-btn')) {
    const btn = e.target.closest('.edit-btn');
    const type = btn.dataset.type;
    const index = parseInt(btn.dataset.index);
    showForm(type, index);
  }
  if (e.target.closest('.delete-btn')) {
    const btn = e.target.closest('.delete-btn');
    const type = btn.dataset.type;
    const index = parseInt(btn.dataset.index);
    deleteItem(type, index);
  }
});

// Logo upload
document.getElementById('logoFileInput').addEventListener('change', function(e) {
  const file = e.target.files[0];
  if (!file) return;
  if (file.size > 200000) return alert('Ảnh quá lớn');
  const reader = new FileReader();
  reader.onload = function(ev) {
    tempLogoBase64 = ev.target.result;
    document.getElementById('logoPreview').src = tempLogoBase64;
    document.getElementById('logoPreview').style.display = 'block';
  };
  reader.readAsDataURL(file);
});

// Lưu cài đặt
document.getElementById('saveSettingsBtn').addEventListener('click', saveSettings);
