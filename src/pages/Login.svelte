<script>
  import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
  import { user$ } from "../store";

  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      user$.set(user);
      localStorage.setItem("token", token);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
    }
  };

  let isFocused = false;
  let isFocuspw = false;

  const focusing = () => {
    isFocused = true;
  };

  const focusingPw = () => {
    isFocuspw = true;
  };

  const focusOut = () => {
    isFocused = false;
  };

  const blurPw = () => {
    isFocuspw = false;
  };
</script>

<form action="/login" id="loginForm">
  <h2>로그인</h2>
  <div id="login">
    <div id="idp" class={isFocused ? "idfc" : ""}>
      <label for="id">아이디</label>
      <input
        type="text"
        id="id"
        name="id"
        on:focus={focusing}
        on:blur={focusOut}
      />
    </div>
    <div id="pwp" class={isFocuspw ? "pwfc" : ""}>
      <label for="password">비밀번호</label>
      <input
        type="text"
        id="password"
        name="password"
        on:focus={focusingPw}
        on:blur={blurPw}
      />
    </div>
    <div class="submit_button">
      <button type="submit">로그인</button>
      <button on:click|preventDefault={loginWithGoogle}
        >Google로 로그인하기</button
      >
    </div>
  </div>
</form>

<style>
  #loginForm {
    width: 100%;
  }

  #loginForm h2,
  #loginForm #login {
    text-align: center;
  }

  #loginForm #login {
    padding: 30px;
    width: 400px;
    margin: 0 auto;
    border: 1px solid rgba(0, 0, 0, 0.25);
    border-radius: 10px;
  }

  #loginForm #login > div:not(.submit_button) {
    width: 320px;
    margin: 0 auto;
    position: relative;
    padding: 15px 10px;
    box-sizing: border-box;
  }

  #loginForm #login > div#idp {
    border: 1px solid rgba(0, 0, 0, 0.25);
    border-radius: 6px 6px 0 0;
    overflow: hidden;
  }

  #loginForm #login > div#idp.idfc {
    border: 2px solid rgb(73, 170, 92);
  }

  #loginForm #login > div#idp.idfc label {
    position: static;
    font-size: 14px;
    text-align: left;
    display: block;
    width: 100%;
  }

  #loginForm #login > div#pwp {
    border: 1px solid rgba(0, 0, 0, 0.25);
    border-radius: 0 0 6px 6px;
    overflow: hidden;
    margin-top: -1px;
  }

  #loginForm #login > div#pwp.pwfc {
    border: 2px solid rgb(73, 170, 92);
  }

  #loginForm #login > div#pwp.pwfc label {
    position: static;
    font-size: 14px;
    text-align: left;
    display: block;
    width: 100%;
  }

  #loginForm #login > div input {
    width: 100%;
    border: none;
    outline: none;
  }

  #loginForm #login > div label {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 12px;
    opacity: 0.4;
    transition: all 0.4s;
  }

  #loginForm #login > div.submit_button {
    width: 100%;
    margin-top: 30px;
  }

  #loginForm #login > div.submit_button button {
    width: 100%;
    border: none;
    background-color: rgb(73, 170, 92);
    padding: 15px 0;
    border-radius: 5px;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
  }

  #loginForm #login > div.submit_button button:first-child {
    margin-bottom: 15px;
  }

  #loginForm #login > div.submit_button button:last-child {
    background-color: rgb(74, 57, 226);
  }

  #loginForm #login > div.submit_button button:last-child:hover {
    background-color: rgb(106, 93, 219);
  }
</style>
