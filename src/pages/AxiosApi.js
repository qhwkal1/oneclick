import axios from "axios";
const KH_DOMAIN = "http://localhost:8111"; 

const AxiosApi = { 
  // 로그인 구현
  memberLogin: async(id, pw) => {
    const login = {  // 자바에서 map 사용 하는 것과 같음
      id: id,
      pwd: pw
    };

    return await axios.post(KH_DOMAIN + "/login", login); // "http://localhost:8111/login" 에 있는 login 바디에 붙인다
  },
}

export default AxiosApi;