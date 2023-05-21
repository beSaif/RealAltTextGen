(async () => {
  console.log("Generating alt text");
  var doc = document;

  // find all the images on the page
  var images = doc.getElementsByTagName("img");
  function toDataUrl(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var reader = new FileReader();
      reader.onloadend = function () {
        callback(reader.result);
        return reader.result;
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.send();
  }

  async function fetchAltText(images) {
    for (let i = 0; i < images.length; i++) {
      console.log(images[i].src);
      const myBase64 = await toDataUrl(images[i].src);
      console.log("Fetching alt text");
      console.log(myBase64);
      const response = await fetch(
        "https://ofa-sys-ofa-image-caption.hf.space/run/predict",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            data: [myBase64],
          }),
        }
      );

      const data = await response.json();
      console.log("data" + data);
      console.log(data.data[0]);
      images[i].alt = data.data[0];
    }
  }

  async function toDataUrl(src) {
    // Implement your toDataUrl logic here and return a promise
    // Example using the FileReader API:
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        const reader = new FileReader();
        reader.onloadend = function () {
          resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(xhr.response);
      };
      xhr.onerror = reject;
      xhr.open("GET", src);
      xhr.responseType = "blob";
      xhr.send();
    });
  }

  fetchAltText(images);

})();
