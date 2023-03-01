var to = 0;
async function saveToLocalStorage(event) {
    try {
        event.preventDefault();
        const ProductName = event.target.product.value;
        const SellingPrice = event.target.selling.value;

        const obj = {
            ProductName,
            SellingPrice
        }

        const response = await axios.post("https://crudcrud.com/api/73149eebdd1a4e208615e0ba6d010887/seller", obj)

        showUserOnScreen(response.data)
    }
    
        catch (err) {
        document.body.innerHTML = document.body.innerHTML + "<h4>Something Went Wrong</h4>"
        console.log(err);
    }

}
window.addEventListener("DOMContentLoaded", () => {
    async function reload(){
        try{
           const response = await axios.get("https://crudcrud.com/api/73149eebdd1a4e208615e0ba6d010887/seller")
            for (var i = 0; i < response.data.length; i++) {
                showUserOnScreen(response.data[i]);
                console.log(response)
            }
        }
        catch(err)  {
            document.body.innerHTML = document.body.innerHTML + "<h4>Something Went Wrong</h4>"
            console.log(err);
        }

    }
    reload();

    

})
function showUserOnScreen(obj) {
    
    const total = document.getElementById('l')
    const parentElem = document.getElementById('listofitems');
    const childElem = document.createElement('li');
    childElem.textContent = obj.ProductName + '-' + obj.SellingPrice;

    to += parseInt(obj.SellingPrice)
    total.textContent = `Total Value Worth of Product=Rs.${to}`

    //delete
    const deleteButton = document.createElement('input');
    deleteButton.type = "button";
    deleteButton.value = "Delete Product";


    deleteButton.onclick = async () => {

        try {
            to = to - parseInt(obj.SellingPrice)
            total.textContent = `Total Value Worth of Product=Rs.${to}`
            await axios.delete(`https://crudcrud.com/api/73149eebdd1a4e208615e0ba6d010887/seller/${obj._id}`)
            parentElem.removeChild(childElem)
        }

        catch (err) {
            document.body.innerHTML = document.body.innerHTML + "<h4>Something Went Wrong</h4>"
            console.log(err);
        }





    }

    childElem.appendChild(deleteButton);
    parentElem.appendChild(childElem);
}