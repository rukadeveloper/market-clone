const forms = document.querySelector("#signup-form");

const passwordChk = () => {
  const Formdata = new FormData(forms);
  const pw1 = Formdata.get("newPassword");
  const pw2 = Formdata.get("newPasswordChk");

  if (pw1 === pw2) return true;
  else return false;
};

const handleSubmit = async (e) => {
  e.preventDefault();
  const Formdata = new FormData(forms);
  const sha256Password = sha256(Formdata.get("newPassword"));
  console.log(sha256Password);
  Formdata.set("newPassword", sha256Password);

  if (passwordChk()) {
    const res = await fetch("/signup", {
      method: "post",
      body: Formdata,
    });
    alert("회원가입에 성공했습니다...!!");
    window.location.pathname = "/login.html";
  } else {
    alert("비밀번호가 서로 다릅니다.");
  }
};

forms.addEventListener("submit", handleSubmit);
