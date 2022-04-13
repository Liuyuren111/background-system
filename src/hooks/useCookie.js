import Cookies from "js-cookie";

export function useCookie() {
  const setCookie = (val) => {
    if (val.checkbox) {
      Cookies.set("checkbox", true, { expires: 7 });
      Cookies.set("unit", val.unit, { expires: 7 }); //单位
      Cookies.set("username", val.username, { expires: 7 }); //账号
      Cookies.set("password", val.password, { expires: 7 }); //密码
    }
  };

  const getCookie = (val,val1,val2,val3,val4) =>{
    if(Cookies.get(val1)){
        val.checkbox = JSON.parse(Cookies.get(val1))
      }
      val.unit = Cookies.get(val2) || ''
      val.username = Cookies.get(val3) || ''
      val.password = Cookies.get(val4) || ''
  }

  const removeCookie = () => {
    Cookies.remove("checkbox");
    Cookies.remove("unit");
    Cookies.remove("username");
    Cookies.remove("password");
  };

  return {
    setCookie,
    removeCookie,
    getCookie
  };
}
