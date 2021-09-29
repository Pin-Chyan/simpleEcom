function toggleFilter() {
    var filterBlock = document.getElementById("filter");
    var arrow = document.getElementById('arrow');
    if (filterBlock.style.display === "none") {
        filterBlock.style.display = "block";
        console.log("show");
        arrow.classList.remove("fa-arrow-up");
        arrow.classList.add("fa-arrow-down");
    } else {
        console.log("hide");
        filterBlock.style.display = "none";
        arrow.classList.remove("fa-arrow-down");
        arrow.classList.add("fa-arrow-up");
    }
}
