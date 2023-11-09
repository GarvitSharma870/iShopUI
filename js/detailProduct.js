$(document).ready(function(){
    let prodExist = false;
    let cartArr = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
    // product details fetch from local storage and show on ui starts
    let prodArr = localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : [];
    let id = localStorage.getItem('key');
    if(id != null){
    let i=0;
    for(;i<prodArr.length;i++){
        if(prodArr[i].id == id){
            break;
        }
    }
    for(let i=0;i<cartArr.length;i++){
        if(cartArr[i].id == id){
            prodExist = true;
        }
    }
    let detailProd = `<div class="card" style="width: 30rem;">
    <img src="${prodArr[i].imagePath}" class="card-img-top" alt="product-image">
    <div class="card-body">
      <h5 class="card-title">${prodArr[i].name}</h5>
      <p class="card-text m-0"><b>Price: </b>Rs. ${prodArr[i].price}/-</p>
      <p class="card-text m-0"><b>Description: </b>${prodArr[i].desc}</p>
      <label for="quantity"><b>Quantity: </b></label>
      <input type="number" value="1" class="my-2" name="quantity" id="quantity" min="1" max="10" />
      <button id="add-to-cart" class="d-block btn btn-primary w-100">${prodExist ? "Already in Cart" : "Add to Cart"}</button>
    </div>
  </div>`;
    $("#detailProduct").html(detailProd);
    }
    else{
        $("#detailProduct").html("<h1 class='text-center'>Very Chalaak bro you try to access product without selecting </h1>");
    }
    // product details fetch from local storage and show on ui ends

    // add to cart functionality starts
    $("#add-to-cart").click(function(){
        let quantity = $("#quantity").val();
        if(quantity > 0 && quantity <=10){
            for(let i=0;i<cartArr.length;i++){
                if(cartArr[i].id == id){
                    prodExist = true;
                }
            }
            console.log(prodExist)
            if(!prodExist){
            cartArr.push({id: id, quantity: quantity});
            console.log(id);
            console.log(quantity);
            localStorage.setItem('cart', JSON.stringify(cartArr));
            $("#myToast .toast-body").html("Product is Added to Cart Successfully");
            $("#myToast").toast('show');
            setTimeout(function(){
                $("#myToast").toast('hide');  
            },2000)
            $("#add-to-cart").html("Already in Cart")
            }
            else{
                $("#myToast .toast-body").html("OOPS! Product is Already in Cart");
                $("#myToast").toast('show');
                setTimeout(function(){
                    $("#myToast").toast('hide');  
                },2000)
            }
        }
        else if(quantity > 10){
            $("#myToast .toast-body").html("OOPS! Quantity values does not greater than 10.");
                $("#myToast").toast('show');
                setTimeout(function(){
                    $("#myToast").toast('hide');  
                },2000)
        }
        else{
            $("#myToast .toast-body").html("OOPS! Quantity value doesn't be 0 or negative.");
                $("#myToast").toast('show');
                setTimeout(function(){
                    $("#myToast").toast('hide');  
                },2000)
        }
        
    })

    // add to cart functionality ends
    
})