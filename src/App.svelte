<script>
  import Header from "./pages/Header.svelte";
  import Login from "./pages/Login.svelte";
  import Main from "./pages/Main.svelte";
  import NotFound from "./pages/NotFound.svelte";
  import Signup from "./pages/Signup.svelte";
  import Write from "./pages/Write.svelte";
  import Router from "svelte-spa-router";
  import Footer from "./pages/Footer.svelte";
  import Mypage from "./pages/Mypage.svelte";
  import Loading from "./pages/Loading.svelte";
  import {
    GoogleAuthProvider,
    signInWithCredential,
    getAuth,
  } from "firebase/auth";
  import { user$ } from "./store";
  import { onMount } from "svelte";

  let isLoading = true;

  const auth = getAuth();

  const checkLogin = async () => {
    const token = localStorage.getItem("token");
    if (!token) return (isLoading = false);

    const credential = GoogleAuthProvider.credential(null, token);
    const result = await signInWithCredential(auth, credential);
    const user = result.user;
    user$.set(user);
    isLoading = false;
  };

  const routes = {
    "/": Main,
    "/login": Login,
    "/signup": Signup,
    "/write": Write,
    "/mypage": Mypage,
    "*": NotFound,
  };

  onMount(() => {
    checkLogin();
  });
</script>

<Header />
{#if isLoading}
  <Loading />
{:else if !$user$}
  <Login />
{:else}
  <Router {routes} />
{/if}

<style>
</style>
