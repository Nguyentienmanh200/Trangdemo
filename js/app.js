const defaultData = {
  siteConfig: {
    phone: '1900 123 456', email: 'info@gec-duhoc.edu.vn', address: '123 Nguyễn Huệ, TP.HCM',
    telegramBotToken: '', telegramChatId: '',
    logoUrl: 'https://img.upanhnhanh.com/8810234eeb91bf4e9ffdb38f28e2d106',
    socials: { zalo:'https://zalo.me/', telegram:'https://t.me/', facebook:'https://fb.com/', messenger:'https://m.me/', gmail:'mailto:info@gec-duhoc.edu.vn', tiktok:'https://tiktok.com/' },
    aiResponses: { 'nhật':'🇯🇵 Du học Nhật...', 'hàn':'🇰🇷 Du học Hàn...', 'đức':'🇩🇪 Du học Đức...' }
  },
  countries: [
    { name:'Nhật Bản', slug:'nhatban', flag:'🇯🇵', image:'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600', desc:'...', condition:'N5', cost:'180-250 triệu', scholarship:'MEXT' },
    { name:'Hàn Quốc', slug:'hanquoc', flag:'🇰🇷', image:'https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?w=600', desc:'...', condition:'TOPIK2', cost:'150-220 triệu', scholarship:'GKS' },
    { name:'Đức', slug:'duc', flag:'🇩🇪', image:'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=600', desc:'...', condition:'B1', cost:'120-200 triệu', scholarship:'DAAD' },
    { name:'Úc', slug:'uc', flag:'🇦🇺', image:'https://images.unsplash.com/photo-1507692049790-de58290a4334?w=600', desc:'...', condition:'IELTS5.5', cost:'400-600 triệu', scholarship:'Chính phủ' },
    { name:'Canada', slug:'canada', flag:'🇨🇦', image:'https://images.unsplash.com/photo-1517935706615-2717063c2225?w=600', desc:'...', condition:'IELTS6.0', cost:'350-500 triệu', scholarship:'Vanier' },
    { name:'Mỹ', slug:'my', flag:'🇺🇸', image:'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=600', desc:'...', condition:'IELTS6.5', cost:'500-800 triệu', scholarship:'Fulbright' },
    { name:'Đài Loan', slug:'dailoan', flag:'🇹🇼', image:'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=600', desc:'...', condition:'TOCFL1', cost:'80-150 triệu', scholarship:'Bộ GD' },
    { name:'Singapore', slug:'singapore', flag:'🇸🇬', image:'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600', desc:'...', condition:'IELTS5.5', cost:'250-400 triệu', scholarship:'ASEAN' }
  ],
  scholarships: [],
  courses: [],
  posts: [],
  students: []
};
let siteData = JSON.parse(localStorage.getItem('gec_site_data')) || defaultData;
async function loadSiteData() {
  if (typeof GistAPI !== 'undefined') {
    const d = await GistAPI.load(); if (d) { siteData = d; localStorage.setItem('gec_site_data', JSON.stringify(d)); }
  }
}
function renderCountries() {
  const g = document.getElementById('countryGrid'); if (!g) return;
  g.innerHTML = siteData.countries.map(c => `<div class="col-md-4 col-sm-6" data-aos="fade-up"><a href="${c.slug}.html" class="country-card"><img src="${c.image}" alt="${c.name}"><div class="country-overlay"><h4>${c.flag} ${c.name}</h4></div></a></div>`).join('');
}
// ... (các render khác rút gọn, chỉ cần renderCountries cho index)
function applyLogo() {
  const url = siteData.siteConfig.logoUrl;
  document.querySelectorAll('.logo-img').forEach(img => img.src = url);
  const fav = document.getElementById('dynamicFavicon'); if (fav) fav.href = url;
}
function initAll() {
  document.getElementById('loading-screen')?.classList.add('hidden');
  renderCountries();
  applyLogo();
  // AI chat, dock, form như trước (rút gọn)
}
window.addEventListener('DOMContentLoaded', async () => {
  await loadSiteData(); initAll(); AOS?.init({ duration: 800 });
});
