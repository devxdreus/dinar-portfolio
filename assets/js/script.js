var domReady = function (callback) {
  document.readyState === "interactive" || document.readyState === "complete"
    ? callback()
    : document.addEventListener("DOMContentLoaded", callback);
};

domReady(function () {
  // Gallery Section
  // init Masonry
  function createMasonary(grid, showBtn) {
    const msnry = new Masonry(grid, {
      itemSelector: ".grid-item",
      gutter: 16,
      percentPosition: true,
      // columnWidth: ".grid-sizer",
    });

    var gridBaseHeight;

    imagesLoaded(grid).on("progress", function () {
      // layout Masonry after each image loads
      msnry.layout();
      // show more
      gridBaseHeight = parseInt(
        grid.style.height.slice(0, grid.style.height.length - 2)
      );

      // grid.style.overflowY = "hidden";
      grid.style.height = gridOpenLength + "px";
      // console.log(gridBaseHeight);
    });

    // Show more event handler
    showBtn.addEventListener("click", () => {
      // cek apakah state sedang show more or less
      if (showBtn.classList.contains("less")) {
        // close
        showBtn.classList.remove("less");
        grid.style.height = gridOpenLength + "px";
        showBtn.innerHTML =
          '<i class="bi bi-plus-circle-dotted"></i> Tampilkan lebih banyak';
      } else {
        // open
        const gridHeight =
          parseInt(grid.style.height.slice(0, grid.style.height.length - 2)) +
          (gridOpenLength * 2);

        if (gridHeight < gridBaseHeight) {
          // open more
          grid.style.height = gridHeight + "px";
        } else {
          // will close
          grid.style.height = gridBaseHeight + "px";
          showBtn.innerHTML =
            '<i class="bi bi-dash-circle-dotted"></i> Tampilkan lebih sedikit';
          showBtn.classList.add("less");
        }
      }
    });
  }

  // masonary variable
  const gridOpenLength = 500;

  // masonary init
  const gridPotrait = document.querySelector(".grid-potrait");
  const showPotrait = document.querySelector(".grid-potrait .show-btn");
  createMasonary(gridPotrait, showPotrait);

  const gridFood = document.querySelector(".grid-food");
  const showFood = document.querySelector(".grid-food .show-btn");
  createMasonary(gridFood, showFood);
});
