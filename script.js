(() => {
  const imageInput = document.querySelector("#image-input");
  const imagePreview = document.querySelector("#image-preview");
  const uploadButton = document.querySelector("#upload-button");
  const searchResults = document.querySelector("#search-results");
  let imageSrc;

  imageInput.addEventListener("change", () => {
    const file = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener("load", () => {
      const img = new Image();
      img.src = reader.result;
      imagePreview.innerHTML = "";
      imagePreview.appendChild(img);
      imageSrc = reader.result;
    });

    reader.readAsDataURL(file);
  });

  uploadButton.addEventListener("click", async () => {
    const response = await fetch("https://search.pavankumar.live/", {
      method: "POST",
      body: JSON.stringify({
        imgSrc: imageSrc,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (data.list_img) {
      if (data.list_img.length > 0) {
        data.list_img.forEach((result) => {
          const resultContainer = document.createElement("div");
          resultContainer.classList.add("result-container");
          const resultTitle = document.createElement("h3");
          resultTitle.classList.add("result-title");
          resultTitle.innerHTML = result.Brand;
          const resultImage = document.createElement("img");
          resultImage.classList.add("result-image");
          resultImage.src = result.AWS_LINK_1;
          resultContainer.appendChild(resultTitle);
          resultContainer.appendChild(resultImage);
          searchResults.appendChild(resultContainer);
        });
      }
    }
  });
})();
