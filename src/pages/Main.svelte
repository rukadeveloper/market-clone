<script>
  import { link } from "svelte-spa-router";

  import Footer from "./Footer.svelte";

  import { getDatabase, ref, onValue } from "firebase/database";
  import { onMount } from "svelte";

  const calcTime = (timestamp) => {
    const curTime = new Date().getTime() - 9 * 60 * 60 * 1000;
    const durtime = new Date(curTime - timestamp);
    const hour = durtime.getHours();
    const minute = durtime.getMinutes();
    const second = durtime.getSeconds();

    if (hour > 0) return `${hour}시간 전`;
    else if (minute > 0) return `${minute}분 전`;
    else if (second >= 0) return `${second}초 전`;
    else return "방금 전";
  };

  $: items = [];

  const db = getDatabase();
  onMount(() => {
    const itemsRef = ref(db, "items/");
    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      items = Object.values(data);
    });
  });
</script>

<main>
  <div class="media">
    <span>화면을 줄여주세요.</span>
  </div>
  <ul class="write-lists">
    {#each items as item}
      <li class="lists-items">
        <div class="lists-items__img">
          <img src={item.imgurl} alt={item.title} />
        </div>
        <div class="lists-items__desc">
          <div class="lists-items__desc-title">{item.title}</div>
          <div class="lists-items__desc-meta">
            <span>{item.place}</span>
            <span>{calcTime(item.timestamp)}</span>
          </div>
          <div class="lists-items__desc-price">
            {item.price}
          </div>
          <div class="lists-items__desc-descs">
            {item.description}
          </div>
        </div>
      </li>
    {/each}
  </ul>
  <a use:link href="/write" class="write_btn">글쓰기</a>
</main>
<Footer location="home" />

<style>
  main {
    padding: 0 20px;
  }

  main .media {
    display: none;
  }

  main ul.write-lists {
  }

  ul.write-lists .lists-items {
    display: flex;
    align-items: center;
    margin: 20px 0;
  }

  ul.write-lists .lists-items .lists-items__img {
    width: 150px;
    height: 150px;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 4px;
    margin-right: 10px;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  ul.write-lists .lists-items .lists-items__img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  ul.write-lists .lists-items .lists-items__desc .lists-items__desc-title {
    font-size: 18px;
  }

  ul.write-lists .lists-items .lists-items__desc .lists-items__desc-meta {
    display: flex;
    align-items: center;
    margin-top: 20px;
    gap: 6px;
  }

  ul.write-lists .lists-items .lists-items__desc .lists-items__desc-meta span {
    font-size: 14px;
    color: #ccc;
  }

  ul.write-lists .lists-items .lists-items__desc .lists-items__desc-price {
    font-weight: 800;
    margin-top: 15px;
    font-size: 20px;
  }

  a.write_btn {
    position: fixed;
    bottom: 110px;
    right: 50px;
    width: 100px;
    padding: 15px 0;
    display: block;
    background-color: orange;
    text-align: center;
    text-decoration: none;
    color: #fff;
    border-radius: 30px;
  }

  @media (min-width: 650px) {
    main {
      padding: 0;
    }
    main .media {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: red;
      width: 100%;
      height: 100vh;
    }
    main .media span {
      font-size: 18px;
      color: #fff;
    }
    ul.write-lists {
      display: none;
    }

    a.write_btn {
      display: none;
    }
  }
</style>
