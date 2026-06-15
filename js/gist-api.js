const GistAPI = {
  token: null, gistId: null,
  init() {
    this.token = localStorage.getItem('gec_github_token');
    this.gistId = localStorage.getItem('gec_gist_id');
  },
  async load() {
    this.init(); if (!this.gistId) return null;
    try {
      const res = await fetch(`https://api.github.com/gists/${this.gistId}`);
      const d = await res.json();
      if (d.files?.['site-data.json']) return JSON.parse(d.files['site-data.json'].content);
    } catch (e) {}
    return null;
  },
  async save(json) {
    this.init(); if (!this.gistId || !this.token) throw new Error('Thiếu Gist ID/Token');
    await fetch(`https://api.github.com/gists/${this.gistId}`, {
      method: 'PATCH',
      headers: { Authorization: `token ${this.token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ files: { 'site-data.json': { content: JSON.stringify(json, null, 2) } } })
    });
  }
};
