const formquery = document.querySelector("#loginForm");

let accessToken = null;

formquery.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formdatas = new FormData(formquery);
  const sha256Password = sha256(formdatas.get("currentPassword"));
  formdatas.set("currentPassword", sha256Password);

  const reqres = await fetch("/login", {
    method: "POST",
    body: formdatas,
  });

  if (!reqres.ok) {
    throw new Error(`HTTP error! status: ${reqres.status}`);
  }

  const datas = await reqres.json();

  const msg = document.querySelector(".message");

  accessToken = datas.access_token;

  console.log(accessToken);

  if (reqres.status == 200) {
    msg.innerText = "로그인 되었습니다.";
    msg.style.color = "red";
    const btns = document.createElement("button");
    btns.innerText = "아이템 보기";
    msg.appendChild(btns);

    btns.addEventListener("click", async () => {
      const btnres = await fetch("/items", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const btndata = await btnres.json();
      console.log(btndata);
    });
  } else if (reqres.status === 401) {
    msg.innerText = "로그인에 실패했습니다. 다시 시도하십시오.";
    msg.style.color = "blue";
  }
});
