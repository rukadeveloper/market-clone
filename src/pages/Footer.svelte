<script>
  export let location;

  const goHome = () => {
    window.location.hash = "/";
  };

  const goMypage = () => {
    window.location.hash = "/mypage";
  };
</script>

<footer>
  <div class="footer-block">
    <button class="footer-block__icons" on:click={goHome}>
      {#if location === "home"}
        <img src="./assets/homeFill.svg" alt="home" />
      {:else}
        <img src="./assets/home.svg" alt="homenot" />
      {/if}
      <span>홈</span>
    </button>
    <div class="footer-block__icons">
      <img src="./assets/map.svg" alt="map" />
      <span>위치</span>
    </div>
    <div class="footer-block__icons">
      <img src="./assets/chat.svg" alt="chat" />
      <span>채팅</span>
    </div>
    <div class="footer-block__icons">
      <img src="./assets/document.svg" alt="document" />
      <span>문서</span>
    </div>
    <button class="footer-block__icons" on:click={goMypage}>
      {#if location === "my"}
        <img src="./assets/userFill.svg" alt="userFill" />
      {:else}
        <img src="./assets/user.svg" alt="user" />
      {/if}
      <span>나의 당근</span>
    </button>
  </div>
</footer>

<style>
  footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
  }

  footer .footer-block {
    padding: 10px 20px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    border-top: 1px solid rgb(237, 237, 239);
    background-color: #fff;
  }

  footer .footer-block button.footer-block__icons {
    background: transparent;
    border: none;
    cursor: pointer;
  }

  footer .footer-block button.footer-block__icons {
    padding: 0 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  footer .footer-block .footer-block__icons img {
    width: 30px;
    display: block;
  }

  footer .footer-block .footer-block__icons span {
    display: block;
    text-align: center;
    font-size: 12px;
    margin-top: 10px;
  }
</style>
