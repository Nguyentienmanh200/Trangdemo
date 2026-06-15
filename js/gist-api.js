const GistAPI = {
  token: null,
  gistId: null,

  init() {
    this.token = localStorage.getItem('gec_github_token');
    this.gistId = localStorage.getItem('gec_gist_id');
  },

  async load() {
    this.init();
    if (!this.gistId) return null;
    const headers = {};
    if (this.token) headers['Authorization'] = `token ${this.token}`;
    try {
      const res = await fetch(`https://api.github.com/gists/${this.gistId}`, { headers });
      const data = await res.json();
      if (data.files && data.files['site-data.json']) {
        return JSON.parse(data.files['site-data.json'].content);
      }
    } catch (e) {
      console.warn('Không thể tải từ Gist, dùng dữ liệu local');
    }
    return null;
  },

  async save(jsonData) {
    this.init();
    if (!this.gistId || !this.token) throw new Error('Thiếu Gist ID hoặc token');
    const res = await fetch(`https://api.github.com/gists/${this.gistId}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `token ${this.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        files: {
          'site-data.json': { content: JSON.stringify(jsonData, null, 2) }
        }
      })
    });
    if (!res.ok) throw new Error('Lỗi đồng bộ Gist');
    return res.json();
  }
};
