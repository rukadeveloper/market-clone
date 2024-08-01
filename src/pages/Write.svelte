<script>
  import { getDatabase, ref, set, push } from "firebase/database";
  import {
    getStorage,
    ref as refImage,
    uploadBytes,
    getDownloadURL,
  } from "firebase/storage";

  let title;
  let price;
  let description;
  let place;

  function writeUserData(imgurl) {
    const db = getDatabase();
    push(ref(db, "items/"), {
      title,
      price,
      description,
      place,
      timestamp: new Date().getTime(),
      imgurl,
    });
    window.location.hash = "/";
  }

  const storage = getStorage();

  let files;

  const uploadFile = async () => {
    const file = files[0];
    const name = file.name;
    const res = await uploadBytes(refImage(storage, name), file);
    const url = await getDownloadURL(refImage(storage, name));
    return url;
  };

  const handleSubmits = async () => {
    const url = await uploadFile();
    writeUserData(url);
  };
</script>

<form action="" id="write-form" on:submit|preventDefault={handleSubmits}>
  <div class="img_form">
    <label for="image">이미지</label>
    <input type="file" id="image" name="image" bind:files />
  </div>

  <div class="title_form">
    <label for="title">제목</label>
    <input type="text" id="title" name="title" bind:value={title} />
  </div>

  <div class="price_form">
    <label for="price">가격</label>
    <input type="number" id="price" name="price" bind:value={price} />
  </div>

  <div class="desc_form">
    <label for="desc">설명</label>
    <input type="text" id="desc" name="description" bind:value={description} />
  </div>

  <div class="place_form">
    <label for="place">장소</label>
    <input type="text" id="place" name="place" bind:value={place} />
  </div>
  <div class="submit_btn">
    <button type="submit">제출</button>
  </div>
</form>
