$(document).ready(function(){
    // cart items fetch from local storage and show on ui starts
    let cartArr = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
    let prodArr = localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : [];
    console.log(cartArr);
    console.log(prodArr);
    let totalPrice = 0;
    if(cartArr.length != 0){
    for(let i=0;i<cartArr.length;i++){
        let j=0;
        for(;j<prodArr.length;j++){
            if(cartArr[i].id == prodArr[j].id){
                break;
            }
        }
        console.log(j)
        totalPrice += prodPrice=prodArr[j].price.replace(',',"") * Number(cartArr[i].quantity);
        let txt = `<div id="card-${cartArr[i].id}" class="card mb-3" style="max-width: 540px;">
                    <div class="row g-0">
                    <div class="col-md-4 d-flex justify-content-center">
                        <img src="${prodArr[j].imagePath}" class="img-fluid rounded-start" alt="product-image">
                    </div>
                    <div class="col-md-8 mt-4">
                        <div class="card-body">
                        <h5 class="card-title">${prodArr[j].name}</h5>
                        <p class="card-text m-0"><b>Price: </b><span id="prod-price-${cartArr[i].id}">${prodArr[j].price}</span> * <span id="prod-quan-${cartArr[i].id}" class=".quantity">${cartArr[i].quantity}</span>= <span id="prod-total-price-${cartArr[i].id}" class="productTotalPrice">${prodPrice=prodArr[j].price.replace(',',"") * Number(cartArr[i].quantity)}</span></p>
                        <p class="card-text m-0 my-2 d-inline"><button value="${cartArr[i].id}" type="button" class="decrement">-</button><input class="quantity" type="text" name="quantity" id="quantity-${cartArr[i].id}" value="${cartArr[i].quantity}" disabled/><button value="${cartArr[i].id}" type="button" class="increment">+</button></p>
                        <button id="del-btn" class="del-btn border-0 bg-transparent ms-2" value="${cartArr[i].id}"><img src="images/8848798.png" alt="del-icon" style="height: 40px;"/></button>
                        </div>
                    </div>
                    </div>
                </div>`;
        $("#cards").append(txt);             
    }
    let txt = `<div class="mt-3"><div class="card" style="min-width: 440px;">
                <div class="card-body">
                    <h5 class="card-title text-center">Total Price: <span id="total-price">${totalPrice}</span></h5>
                    <button type="button" id="checkout" class="w-100 btn btn-primary">Checkout</button>
                </div>
            </div></div>`;
    $("#cart").append(txt);    
}
else{
    $("#cards").html("<h1 class='text-center'>Cart is empty. Please buy something from us.</h1>")
}
// cart items fetch from local storage and show on ui ends

    // increment quantity function starts
    $(document).on('click', '.increment', function(){
        let id = $(this).val();
        let val = Number($('#quantity-'+id).val())+1;
        if(val <= 10){
        $('#quantity-'+id).val(val);
        $('#prod-quan-'+id).html(val);
        $('#prod-total-price-'+id).html((Number(prodPrice=$('#prod-price-'+id).html().replace(',',"")) * val));
        totalPrice += Number(prodPrice=$('#prod-price-'+id).html().replace(',',""));
        $("#total-price").html(totalPrice);
        let i=0;
        for(;i<cartArr.length;i++){
            if(cartArr[i].id == id){
                break;
            }
        }
        cartArr[i].quantity= val;
        localStorage.setItem('cart', JSON.stringify(cartArr));
        
        }
        else{
            $("#myToast .toast-body").html("Quantity doesn't greater than 10");
            $("#myToast").toast('show')
            setTimeout(function(){
                $("#myToast").toast('hide');  
            },2000)
        }
    })
    // increment quantity function ends

    // decrement quantity function starts
    $(document).on('click', '.decrement', function(){
        let id = $(this).val();
        console.log($('#quantity-'+id).val())
        let val = Number($('#quantity-'+id).val())-1;
        if(val > 0 && val <= 10){
        $('#quantity-'+id).val(val);
        $('#prod-quan-'+id).html(val);
        $('#prod-total-price-'+id).html((Number(prodPrice=$('#prod-price-'+id).html().replace(',',"")) * val));
        totalPrice -= Number(prodPrice=$('#prod-price-'+id).html().replace(',',""));
        $("#total-price").html(totalPrice);
        let i=0;
        for(;i<cartArr.length;i++){
            if(cartArr[i].id == id){
                break;
            }
        }
        cartArr[i].quantity= val;
        localStorage.setItem('cart', JSON.stringify(cartArr));
        }
        else{
            $("#myToast .toast-body").html("Quantity doesn't be in zero or negative");
            $("#myToast").toast('show');
            setTimeout(function(){
                $("#myToast").toast('hide');  
            },2000)
        }
    }) 
    // decrement quantity function ends

    // checkout button function starts
    $("#checkout").click(function(){
        $("#cart").html(`<div id="cards" class="cards"></div>`);
        localStorage.removeItem('cart');
        cartArr=[];
        $("#orderModal").modal('show');
        $("#cards").html("<h1 class='text-center'>Cart is empty. Please buy something from us.</h1>")
    })
    // checkout button function ends

    // delete button function starts
    $(document).on('click','.del-btn', function(){
        let id = $(this).val();
        let i=0;
            for(;i<cartArr.length;i++){
                if(cartArr[i].id == id){
                    break;
                }
            }
            totalPrice -= (Number(prodPrice=$('#prod-price-'+id).html().replace(',',""))) * cartArr[i].quantity;
            $("#total-price").html(totalPrice);
            cartArr.splice(i,1);
            localStorage.setItem('cart', JSON.stringify(cartArr));
            $("#card-"+id).remove();
            if(cartArr.length == 0){
            $("#cart").html(`<div id="cards" class="cards"></div>`);
            $("#cards").html("<h1 class='text-center'>Cart is empty. Please buy something from us.</h1>")
            }
    })
    // delete button function ends
    
})