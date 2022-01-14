// ESM
import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.23/vue.esm-browser.min.js';

const app = {
  // 資料
  data(){
    return {
      apiUrl: "https://vue3-course-api.hexschool.io/",  // API 網址
      apiPath: "bingbingboom",  // 申請的 API Path
      temp: {},
      products: []
    }
  },

  // 生命週期
  created() {
    // 取出 token
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    // console.log(token);

    // 設定預設夾帶 headers 驗證資訊
    axios.defaults.headers.common['Authorization'] = token;

    // 確認是否登入
    this.checkLogin();

    // 取得產品資料
    this.getData();
  },

  // 方法
  methods: {
    // 確認是否登入
    checkLogin(){
      axios.post(`${this.apiUrl}/v2/api/user/check`)
      .then((res) => {
        console.log(res);
        // 未成功登入
        if(!res.data.success){
          alert(res.data.message);
          // 轉址 - 回到登入頁面
          window.location = "login.html";
        }

      })
      .catch((err) => {
        console.dir(err);
        window.location = "login.html";
      })
    },

    // 取得產品列表
    getData(){
      axios.get(`${this.apiUrl}/v2/api/${this.apiPath}/admin/products`)
        .then((res) => {
          console.log(res.data);
          this.products = res.data.products;
        })
        .catch((err) => {
          console.dir(err);
        })
    },

    // 查看細節
    checkDetails(product){
      this.temp = product;
    },

    // 啟用 未啟用
    changeEnabled(item){
      item.is_enabled = !item.is_enabled;
    }
  }
};

createApp(app).mount('#app');