let all_products = [];

const addProduct = () => {
    let name = prompt("Enter Product Name: ");
    let brand = prompt("Enter your brand Name: ");
    let price = Number(prompt("Enter Product Price: "))
    let discount = Number(prompt("Enter Product Discount: "))

    let product = {
        name: name,
        brand: brand,
        price: price,
        discount: discount
    }

    // array push 
    // db insert
    all_products.push(product);
    // 
    createHtml();
}

const createHtml = () => {
    let product_html = '';
    // db query, all_products populate
    all_products.map((o, i) => {
        let aft_dis = o.price - o.price * o.discount / 100
        // o.after_discount = aft_dis;
        all_products[i].after_discount = aft_dis;
    
        product_html += "<tr>";
        product_html += "<td>"+(i+1)+"</td>";
        product_html += "<td>"+o.name+"</td>";
        product_html += "<td>"+o.brand+"</td>";
        product_html += "<td>"+o.price+"</td>";
        product_html += "<td>"+o.discount+"</td>";
        product_html += "<td>"+aft_dis+"</td>";
        product_html += "</tr>";
    
    })
    
    document.getElementById('product_data').innerHTML = product_html;
    
}

let students = [];
const addScore = () => {
    let name = prompt("Enter student Name: ");
    let email = prompt("Enter Student email: ");
    let phone = prompt("Enter student phone: ");
    let address = prompt("Enter student address: ");
    let marks_obt = Number(prompt("Enter student score: "));

    let per = marks_obt / 500 *100;

    // get division
    let division = getDivision(per);

    let std = {
        name: name,
        email: email,
        phone: phone,
        address: address,
        marks_obt: marks_obt,
        per: per,
        division: division
    }


    students.push(std);

    showStudentList();
}


const showStudentList = () => {
    let std_html = "";
    students.map((o, i) => {
        let cls_name = ''
        if(o.per > 32) {
            cls_name = "pass";
        } else {
            cls_name = "fail";
        }

        std_html += "<tr class='"+cls_name+"'>";
        
        std_html += "<td>"+(i+1)+"</td>";
        std_html += "<td>"+o.name+"</td>";
        std_html += "<td>"+o.address+"</td>";
        std_html += "<td>"+o.email+"</td>";
        std_html += "<td>"+o.phone+"</td>";
        std_html += "<td>"+o.marks_obt+"</td>";
        std_html += "<td>"+o.per+"</td>";
        std_html += "<td>"+o.division+"</td>";
        std_html += "</tr>";
    })

    document.getElementById('std_data').innerHTML = std_html;
}

const getDivision = (per) => {
    if(per >= 80) {
        return "Distinction";
    } else if(per >= 60){
        return "First Division";
    } else if(per >= 45){
        return "Second Division";
    } else  if(per >= 32) {
        return "Third Division";
    } else {
        return "Sorry! Failed";
    }
}