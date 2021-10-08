const container = document.querySelector(".display-container");

function createCard(file) {
  const type = file.mimetype.split("/")[0];

  const preview = type === "image" ? file.path : "./file_icon.png";
  return `<div class="card" style="width: 18rem; margin-bottom: 2rem;" id=${file._id}>
              <img src="${preview}" class="card-img-top">
              <div class="card-body">
                <h6 class="card-text">File name: ${file.originalname}</h6>
                <a href="#" class="card-link delete-file">Delete</a>
                <a href="${file.path}" class="card-link download-file" download>Download</a>
              </div>
          </div>`;
}

function deleteCardListener() {
  document.querySelectorAll(".delete-file").forEach((deleteFileBtn) => {
    deleteFileBtn.addEventListener("click", async (e) => {
      const fileId = e.target.parentElement.parentElement.id;

      const response = await fetch(`/files/${fileId}`, { method: "DELETE" });

      if (response.status === 204) {
        e.target.parentElement.parentElement.remove();
      }
    });
  });
}

async function showMessage() {
  container.style.color = "red";
  container.innerHTML = "Files not Found";

  setTimeout(() => {
    container.innerHTML = "";
    container.style.color = "black";
  }, 1500);
}

export { createCard, deleteCardListener, showMessage };
