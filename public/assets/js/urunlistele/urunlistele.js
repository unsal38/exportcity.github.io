$(()=>{
    function search() {
        let searchText = $(this).val().toLowerCase();
        let urunsearch = $("section.lattest-product-area div.product-details .search").text().toLowerCase()
        console.log(urunsearch);
    }
    $("form#search input").on("keyup", search);
}) // SEARCH BAR 