import { deleteCardListener, createCard, showMessage } from "./helpers.js";

const form = document.querySelector(".upload-form");
const input = document.querySelector(".upload-input");
const container = document.querySelector(".display-container");
const deleteAllFilesBtn = document.querySelector(".delete-all");

document.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch("/files");
  const data = await response.json();

  if (response.status === 404) return await showMessage();

  let html = "";
  data.forEach((file) => {
    html += createCard(file);
  });
  container.innerHTML = html;

  deleteCardListener();
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const upFile = input.files[0];
  if (!upFile) return;
  input.value = null;

  const data = new FormData();
  data.append("file", upFile);

  const response = await fetch("/files", {
    method: "POST",
    body: data,
  });

  const file = await response.json();
  container.innerHTML += createCard(file);
  deleteCardListener();
});

deleteAllFilesBtn.addEventListener("click", async () => {
  const response = await fetch("/files", { method: "DELETE" });
  if (response.status === 404) return await showMessage();
  container.innerHTML = "";
});
