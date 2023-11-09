$(document).ready(async function(){
    let prodArr = localStorage.getItem('products') ? JSON.parse(localStorage.getItem('products')) : [];
    if(prodArr.length == 0){
    await $.get("json/products.json",function(data, status){
        console.log(data)
        prodArr = data;
        localStorage.setItem('products', JSON.stringify(prodArr))
    })
}
    localStorage.removeItem('key');
    $("#form").validate({
        rules:{
            name:{
                required: true,
                minlength: 3
            },
            price: {
                required: true,
                number: true,
            },
            desc:{
                required: true,
                maxlength: 50,
            }

        },
        messages:{
            name:{
                pattern: "Please enter letter first afterwards number follows"
            }
        }
    });
    // add button navbar js starts
    $("#add-btn-modal").click(function(){
        $("#name").val('');
        $("#url").val('');
        $("price").val('');
        $("#desc").val('');
    })
    // add button navbar js ends

    // add button modal js starts
    $("#add-btn").click(function(){
        if($("#form").valid()){
        let id= prodArr.length + 1;
        let name = $("#name").val();
        let url = $("#url").val();
        let price = $("#price").val();
        let desc = $("#desc").val();

        let prodObj = {id: id, name: name, imagePath: url, price: price, desc: desc};
        prodArr.push(prodObj);
        localStorage.setItem('products', JSON.stringify(prodArr));
        addProductToUI(prodObj);
        $("#addModal").modal('hide');
        $("#myToast").toast('show');
        setTimeout(function(){
            $("#myToast").toast('hide');
        },3000)
        }
    })
    // add button modal js ends

    // show all products on ui
    prodArr.forEach((obj)=>{
        let text = `<div class="col-12 col-sm-6 col-md-4 col-lg-3 my-2 d-flex justify-content-center">
        <div class="card myCard p-2" style="width: 18rem;">
            <img src="${obj.imagePath}" class="card-img-top" alt="product-image">
            <div class="card-body">
              <h5 class="card-title">${obj.name}</h5>
              <p class="card-text"><b>Price: </b>Rs. ${obj.price}/-</p>
              <a href="detailProduct.html" data-value="${obj.id}" class="btn btn-outline-dark buy-now">Buy Now</a>
            </div>
          </div>
    </div>`;
    $("#cards").append(text);
    })

    // add product to ui function starts
    function addProductToUI(obj){
        let text = `<div class="col-12 col-sm-6 col-md-4 col-lg-3 my-2 d-flex justify-content-center">
        <div class="card myCard p-2" style="width: 18rem;">
            <img src="${obj.imagePath}" class="card-img-top" alt="product-image">
            <div class="card-body">
              <h5 class="card-title">${obj.name}</h5>
              <p class="card-text"><b>Price: </b>Rs. ${obj.price}/-</p>
              <a href="detailProduct.html" data-value=${obj.id} class="btn btn-outline-dark buy-now">Buy Now</a>
            </div>
          </div>
    </div>`;
        $("#cards").append(text);
    }
    // add product to ui function ends

    // buy-now button js starts
    $(document).on('click', '.buy-now', function(){
        localStorage.setItem('key', $(this).attr('data-value'));
    })
    // buy-now button js ends


    
})