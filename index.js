let axios = require('axios');
let fs = require("fs");
let express = require("express");
let app = express();

function hacerHTML(response) {
    let html =
        `
    <html>
    <head> <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
    
    <!-- jQuery library -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    
    <!-- Popper JS -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
    
    <!-- Latest compiled JavaScript -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
    </head>
    <body>
    <div class="accordion" id="accordionExample">
    `;
    for (i in response) {
        html +=
            `<div class="card">
            <div class="card-header" id="heading${i}">
              <h2 class="mb-0">
                <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse${i}" aria-expanded="false" aria-controls="collapse${i}">
                  ${response[i].name}
                </button>
              </h2>
            </div>
        
            <div id="collapse${i}" class="collapse show" aria-labelledby="heading${i}" data-parent="#accordionExample">
            <div class = "card-body">
            `;
        
    let products = response[i].products;
    for (objeto of response[i].products) {
        html +=
            `
            <div class = "card">
            <img class = "card-img-top" src="${objeto.image}">
            <h3 class = "card-title">${objeto.name} <strong>[${objeto.price}]</strong></h3>
            <p class = "card-text">${objeto.description}</p>
            <button type = "button">
                Add to cart
            </button>
            </div>
            `;
    }
        html += `</div> </div>`
        html +=
            `</div></div>
          </div> `;
          
    }
    html += `</body></html>`;
    return html;
}

app.get("/", (req, res) => {
    let url = 'https://gist.githubusercontent.com/josejbocanegra/c6c2c82a091b880d0f6062b0a90cce88/raw/abb6016942f7db2797846988b039005c6ea62c2f/categories.json';
    axios.get(url).then((response) => {
        let html = hacerHTML(response.data);
        fs.writeFile("index.html", html, () => {
            fs.readFile("index.html", (err, data) => {
                if (err) throw err;
                res.send(data.toString());
            });
        })
    });
});

app.listen(8081);