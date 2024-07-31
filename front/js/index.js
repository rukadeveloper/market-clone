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

const renderData = (data) => {
  const ul = document.querySelector("ul.write-lists");
  data.reverse().forEach(async (obj) => {
    const listsItems = document.createElement("li");
    listsItems.className = "lists-items";

    const listsItemsImg = document.createElement("div");
    listsItemsImg.className = "lists-items__img";
    listsItems.appendChild(listsItemsImg);

    const img = document.createElement("img");
    const imgres = await fetch(`/images/${obj.id}`);
    const blob = await imgres.blob();
    const imgurl = URL.createObjectURL(blob);
    img.src = imgurl;
    img.alt = "dddd";
    listsItemsImg.appendChild(img);

    const listsItemsDesc = document.createElement("div");
    listsItemsDesc.className = "lists-items__desc";
    listsItems.appendChild(listsItemsDesc);

    const listsItemsDescTitle = document.createElement("div");
    listsItemsDescTitle.className = "lists-items__desc-title";
    listsItemsDescTitle.innerText = obj.title;
    listsItemsDesc.appendChild(listsItemsDescTitle);

    const listsItemsDescMeta = document.createElement("div");
    listsItemsDescMeta.className = "list-items__desc-meta";
    listsItemsDesc.appendChild(listsItemsDescMeta);

    const listsItemsDescMetaSpan1 = document.createElement("span");
    listsItemsDescMetaSpan1.innerText = obj.place;
    listsItemsDescMeta.appendChild(listsItemsDescMetaSpan1);

    const listsItemsDescMetaSpan2 = document.createElement("span");
    listsItemsDescMetaSpan2.innerText = calcTime(obj.timestamp);
    listsItemsDescMeta.appendChild(listsItemsDescMetaSpan2);

    const listsItemsDescPrice = document.createElement("div");
    listsItemsDescPrice.className = "lists-items__desc-price";
    listsItemsDescPrice.innerText = obj.price;
    listsItemsDesc.appendChild(listsItemsDescPrice);

    ul.appendChild(listsItems);
  });
};

const fetchList = async () => {
  const res = await fetch("/items");
  const data = await res.json();
  renderData(data);
};

fetchList();
