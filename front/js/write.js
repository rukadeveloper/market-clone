const forms = document.getElementById("write-form");

const handleSubmitForm = async (e) => {
  e.preventDefault();
  const body = new FormData(forms);
  body.append("timestamp", new Date().getTime());
  try {
    const ress = await fetch("/items", {
      method: "POST",
      body,
    });
    const data = await ress.json();
    if (data === "200") window.location.pathname = "/";
  } catch (error) {
    console.log(error);
  }
};

forms.addEventListener("submit", handleSubmitForm);
