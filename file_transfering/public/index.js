const form = document.querySelector(".upload-form");
const input = document.querySelector(".upload-input");
const container = document.querySelector(".display-container");
const deleteAllFilesBtn = document.querySelector(".delete-all");

document.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch("/files");

  if (response.status === 404) {
    container.innerHTML = "There are no files";
    return;
  }

  const files = await response.json();

  const html = files
    .map(
      (file) => `<div>
      <img src="${file.path}" />
      <button class="delete">Delete</button>
      <button class="download">Download</button>
    </div>`
    )
    .join(" ");

  container.innerHTML += html;
});

deleteAllFilesBtn.addEventListener("click", async () => {
  await fetch("/files", {
    method: "DELETE",
  });

  container.innerHTML = "";
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const file = input.files[0];
  const data = new FormData();

  data.append("file", file);

  const response = await fetch("/files", {
    method: "POST",
    body: data,
  });

  const fileFromServer = await response.json();

  const html = `<div>
      <img src="${fileFromServer.path}" />
      <button class="delete">Delete</button>
      <button class="download">Download</button>
    </div>`;

  container.innerHTML += html;
});
