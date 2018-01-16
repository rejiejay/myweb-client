class Config {
  basicUrl: string;

  constructor() {
    if (process.env.NODE_ENV === 'development') {
      this.basicUrl = 'http://localhost:3000';
    } else {
      this.basicUrl = 'https://rejiejay.cn/server';
    }
  }
}

export let config = new Config()
