window.addEventListener("load", function(){
    const discount = document.getElementById("discountedPrice");
    const retail = parseFloat(document.getElementById("retailPrice").textContent.replace(/\s/g, '').replace(/\$/g, '')); 
    const sale = parseFloat(document.getElementById("savingPrice").textContent.replace(/\s/g, '').replace(/\$/g, ''));

    // retail.replace(/\s/g, '');
    // sale.replace(/\s/g, ''); you save 

    var saved = (retail - sale).toFixed(2);
    console.log(saved);

    discount.innerHTML = `You Save &#36;${saved}`
    // console.log(retail);
    // console.log(sale);
});