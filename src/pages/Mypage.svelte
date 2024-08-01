<script>
  import { user$ } from "../store";
  import Footer from "./Footer.svelte";

  const logout = () => {
    user$.set(null);
    localStorage.removeItem("token");
  };
</script>

<div class="mypage">
  <h2>나의 당근 (회원정보)</h2>
  <div class="logout_btn">
    <button on:click={logout}>
      <span>로그아웃</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
        />
      </svg>
    </button>
  </div>
</div>
<Footer location="my" />

<style lang="scss">
  .mypage {
    padding: 0 20px;
    > h2 {
      letter-spacing: -1px;
    }
    > .logout_btn {
      button {
        width: 100%;
        display: flex;
        flex-direction: row-reverse;
        justify-content: flex-end;
        align-items: center;
        border: none;
        background-color: #fff;
        cursor: pointer;
        span {
          margin-left: 0.8rem;
        }
        svg {
          width: 1.2em;
        }
      }
    }
  }
</style>
