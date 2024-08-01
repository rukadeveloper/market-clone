<script>
  import Header from "./pages/Header.svelte";
  import Login from "./pages/Login.svelte";
  import Main from "./pages/Main.svelte";
  import NotFound from "./pages/NotFound.svelte";
  import Signup from "./pages/Signup.svelte";
  import Write from "./pages/Write.svelte";
  import Router from "svelte-spa-router";
  import Footer from "./pages/Footer.svelte";

  const routes = {
    "/": Main,
    "/login": Login,
    "/signup": Signup,
    "/write": Write,
    "*": NotFound,
  };
</script>

<Header />
<Router {routes} />
<Footer />

<style>
</style>
