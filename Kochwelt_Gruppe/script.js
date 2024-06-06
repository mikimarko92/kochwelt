function selectNavItem(divId, navLink) {
    let navItems = ["nav1", "nav2", "nav3", "nav4"];
    let navLinks = ["navLink1", "navLink2", "navLink3", "navLink4"];

    for (let i = 0; i < navItems.length; i++) {
        document.getElementById(`${navLinks[i]}`).classList.remove("color-green");
        document
            .getElementById(`${navItems[i]}`)
            .classList.remove("green-bottom-border");
    }

    document.getElementById(navLink).classList.add("color-green");
    document.getElementById(divId).classList.add("green-bottom-border");
}

/* Inregdients calc */
function calcIngredients() {
    let recipeNumber = localStorage.getItem("toLoadedRecipe");
    let portionNumberInput = document.getElementById("recipe-number");
    let portionNumber = portionNumberInput.value;

    if(portionNumber <= 0) {
        portionNumber = 1
        alert('Die Portionsgrösse darf nicht 0 oder kleiner als 0 sein.');
    }

    for (let i = 0; i < recipes[recipeNumber].amount.length; i++) {
        let amount = recipes[recipeNumber].amount[i];
        let amountForOnePortion = recipes[recipeNumber].amountForOnePortion[i];
        amount = amountForOnePortion * portionNumber;
        recipes[recipeNumber].amount.splice(i, 1, amount);

        renderRecipe(recipeNumber);
    }
}

/* html in html laden */
async function init() {
    await includeHTML();
    document.getElementById("headline").innerHTML = "Hat Funktioniert!";
}

async function includeHTML() {
    let toLoadedDivs = document.querySelectorAll("[w3-include-html]");
    for (let i = 0; i < toLoadedDivs.length; i++) {
        const element = toLoadedDivs[i];
        file = element.getAttribute("w3-include-html");
        let actualData = await fetch(file);
        if (actualData.ok) {
            element.innerHTML = await actualData.text();
        } else {
            element.innerHTML = `Page not found`;
        }
    }
}

/* Mobile nav slide in */
function slideInMobileNav() {
    const mobileNav = document.querySelector(".mobile-nav");
    if (mobileNav.classList.contains("mobile-nav-in")) {
        mobileNav.classList.remove("mobile-nav-in");
        mobileNav.classList.add("display-none");
    } else {
        mobileNav.classList.remove("display-none");
        mobileNav.classList.add("mobile-nav-in");
    }
}

/* senmail funktion */
function sendMail(event) {
    event.preventDefault();
    const data = new FormData(event.target);

    fetch("https://formspree.io/f/xzblonbk", {
        method: "POST",
        body: new FormData(event.target),
        headers: {
            Accept: "application/json",
        },
    })
        .then(() => {
            alert("Deine E-mail wurde gesendet!");
        })
        .catch((error) => {
            console.log(error);
        });
}

/* Rezpt Array */

let recipes = [
    {
        name: "Lammkoteletts auf Karottenpüree, serviert mit Kartoffelstampf und herbstlichem Gemüse",
        img: "./img/lamb-chops.png",
        ingredients: [
            "stk. Lammkoteletts",
            "Brise Salz/Pfeffer",
            "gr Karotten",
            "ml Gemüsebrühe",
            "ml Sahne",
            "Brise Salz/Pfeffer",
            "gr Kartoffel",
            "Brise Salz/Pfeffer",
            "Brise Muskatnuss",
            "gr Kastanien",
            "gr Kürbis",
            "gr Lauch",
        ],
        amount: [1, 1, 150, 150, 20, 1, 200, 1, 1, 50, 80, 30],
        amountForOnePortion: [1, 1, 150, 150, 20, 1, 200, 1, 1, 50, 80, 30],
        description: [
            "Lammkotletts: Lammkotletts portionieren, mit Salz/Pfeffer würzen und beidseitig anbraten. Bei 160c Heissluft auf Kerntemperatur von ca 54c bringen. <br><br>",

            "Karottenpürree: Karotten in Matignon schneiden und andünsten. Gemüsebrühe zu den Karotten geben und köcheln lassen bis die Karotten weich sind. Mit einem Mixstab oder Standmixer pürrieren. Mit Salz und Pfeffer abschmecken. Mit der Sahne verfeinern. <br><br>",

            "Kartoffelstampf: Kartoffeln in grobe Würfel schneiden. Kartoffelwürfel mit einer Nelke zusammen Kochen. Kartoffeln ausdämpfen lassen und anschliessend mit einer Lochkelle oder ähnlichem, zerstampfen. Mit Salz/Pfeffer und Muskatnuss abschmecken. <br><br>",

            "Herbstgemüse: Kastanien, Kürbis und Lauch in gleich grosse Stücke schneiden, anschliessend in einem Topf andünsten und mit Salz/Pfeffer würzen. Mit Deckel, weich kochen.",
        ],
        time: "60 Min.",
        difficulty: "Erfahren",
        date: "30.10.2023",
        profileName: "Andre",
        profilePicture: "./img/andre.jpg",
    },
    {
        name: "Panniertes Schweinsschnitzel",
        img: "./img/schnitzel.png",
        ingredients: [
            "gr Schweinsnierstück oder Huft",
            "Brise Salz/Pfeffer",
            "Ei",
            "gr Mehl",
            "gr Panniermehl",
        ],
        amount: [200, 1, 1, 100, 100],
        amountForOnePortion: [200, 1, 1, 100, 100],
        description: [
            "Schweinefleisch in Scheiben schneiden und anschliessend flach klopfen. <br><br>",

            "Mit Salz und Pfeffer würzen. <br><br>",

            "Im mehl wenden und abklopfen, anschliessend durch das aufgeschlagene Ei ziehen und in das Panniermehl geben. <br><br>",

            "Pannierte Schnitzel in einer Bratpfanne mit Öl goldbraun sautieren.",
        ],
        time: "15 Min.",
        difficulty: "Anfänger",
        date: "31.10.2023",
        profileName: "Andre",
        profilePicture: "./img/andre.jpg",
    },
    {
        name: "Französische Croissants",
        img: "./img/croissant.jpg",
        ingredients: [
            "gr Salz",
            "ml Milch",
            "gr Mehl (zusätzlich, Type 550)",
            "gr Mehl (Type 550)",
            "gr Frischhefe",
            "gr Butter",
            "ml Wasser",
            "gr Zucker",
        ],
        amount: [12, 125, 50, 500, 25, 250, 200, 40],
        amountForOnePortion: [12, 125, 50, 500, 25, 250, 200, 40],
        description: [
            "1. Ca. 1 Stunde vor Beginn, Hefe und Butter bei Zimmertemperatur aufwärmen lassen. 500 g Mehl mit Salz vermischen.<br><br>",

            "2. Wasser, Milch und Zucker in der Mikrowelle erwärmen (Trinktemperatur). Danach die Hefe darin auflösen.<br><br>",

            "3. Eine Vertiefung ins Mehl drücken und die Flüssigkeit unter Rühren langsam dazuschütten.<br><br>",

            "4. Das Mehl von innen nach außen unterarbeiten, bis eine Teigkugel entsteht.<br><br>",

            "5. Schüssel zudecken und den Teig 30 Minuten gehen lassen.<br><br>",

            "6. Währenddessen 250g weiche Butter mit 50g Mehl verrühren.<br><br>",

            "<h3>Nach 30 Minuten:</h3>",

            "Teig noch einmal durchkneten, dann aus der Schüssel nehmen und in 4 Kugeln teilen. Butter ebenfalls in 4 gleiche Portionen aufteilen.<br><br>",

            "Ein Arbeitsbrett gut einmehlen und eine Teigportion darauf ausrollen - sollte ca. DIN A4-Größe ergeben - Zwischendurch immer wieder wenden und neu einmehlen<br><br>",

            "Eine Portion Butter in die Mitte setzen und auf ca. Postkartengröße grob verstreichen.<br><br>",

            "Danach die verstrichene Butter in den Teig einpacken. Dazu den Teig sehr leicht anfeuchten und zuerst die langen Kanten umschlagen und danach die kurzen Seiten übereinanderschlagen. Das verhindert, daß die Butter in den folgenden Arbeitsschritten aus dem Teig tritt.<br><br>",

            "Das Teigpäckchen in Frischhaltefolie einwickeln und in den Kühlschrank verfrachten. Dasselbe für die anderen Portionen wiederholen. Der Teig muss mindestens(!) 4 Stunden im Kühlschrank bleiben.<br><br>",

            "<h3>4 (oder mehr) Stunden später:</h3>",

            "Arbeitsplatte gut einmehlen, eine Portion Teig aus dem Kühlschrank holen und in eine längliche Form ausrollen.<br><br>",

            "Man kann diese Teigpakete ganz großartig einfrieren. Möchte man sie verwenden, kann man sie über Nacht im Kühlschrank(!) auftauen lassen und dann ganz normal ausrollen.",
            "Nach dem letzten Ausrollen wird die Teigplatte am besten mit einem Pizzaschneider oder Nudelrädchen in Dreicke zerteilt - und zwar so:<br>",
            'Die halben Dreiecke am Rand werden zerpflückt, zu kleinen Würsten gedreht. Diese legt man als "Kern" an den Anfang (eine breite Seite) jeden Dreiecks. Der Teig wird angefeuchtet und aufgerollt - und zwar von der breiten Seite hin zur Spitze.<br><br>',

            "Man kann auch ein wenig experimentieren und den Teig anstatt mit Wasser dünn mit Marmelade bestreichen oder Schokostückchen dazwischen streuen.<br><br>",

            "Die Croissants werden mit viel Platz auf einem Backblech angeordnet.<br><br>",

            "Wer möchte kann sie mit einer Mischung aus Eigelb und Milch bestreichen - das gibt eine schöne Farbe (wird aber auch schneller braun, wenn man nicht aufpaßt).<br><br>",

            "Dann schiebt man sie bei 190° (vorgeheizt) für 15-20 Minuten in den Ofen - entweder bei Unterhitze oder bei Umluft auf eine der untersten Stufen, sonst werden sie zu schnell braun und verbrennen. Man kann sie aber auch nach 10 Minuten mit einem Backpapier abdecken.",
        ],
        time: "300 Min.",
        difficulty: "Anfänger",
        date: "3.11.2023",
        profileName: "Mihailo",
        profilePicture: "./img/mihailo.JPG",
    },
    {
        name: "Spaghetti Carbonara",
        img: "./img/carbonara.jpg",
        ingredients: [
            "gr Spaghetti",
            "Schinken",
            "Eigelb",
            "gr Butter",
            "Salz und Pfeffer",
            "Prise Muskat",
            "Parmesan",
        ],
        amount: [100, 50, 1, 12, 1, 1, 1],
        amountForOnePortion: [100, 50, 1, 12, 1, 1, 1],
        description: [
            "Die Pasta in reichlich Salzwasser bissfest kochen. Den Schinken in Würfel schneiden und in wenig Butter anbraten.<br><br>",

            "Eigelb in einer großen Schüssel mit Salz, Pfeffer und Muskat verquirlen. Die Butter schaumig rühren und gut unter das Eigelb mischen. Die Schinkenwürfel und den geriebenen Käse gründlich unterrühren.<br><br>",

            "Wenn die Nudeln gar sind, abgießen, sofort zu der Mischung in die Schüssel geben, nochmal alles gründlich durchmischen, dann sogleich servieren.<br><br>",
        ],
        time: "20 Min.",
        difficulty: "Anfänger",
        date: "02.11.2023",
        profileName: "Björn",
        profilePicture: "./img/bjoern.jpg",
    },
];

/* href recipes */
function setToLoadedRecipe(recipeNumber) {
    localStorage.setItem("toLoadedRecipe", `${recipeNumber}`);
}

/* render recipe functions */
function loadRecipe() {
    let recipeNumber = localStorage.getItem("toLoadedRecipe");
    renderRecipe(recipeNumber);
}

function renderRecipe(recipeNumber) {
    document.getElementById("ingredientFrame").innerHTML = ``;
    loadDishname(recipeNumber);
    loadDishImage(recipeNumber);
    loadRequirements(recipeNumber);
    loadIngredients(recipeNumber);
    loadTimReq(recipeNumber);
    loadDishDescription(recipeNumber);
    loadDishProfileImage(recipeNumber);
}

function loadDishProfileImage(recipeNumber) {
    document.getElementById("dishProfileImage").src =
        recipes[recipeNumber].profilePicture;
    document.getElementById(
        "profileName"
    ).innerHTML = `${recipes[recipeNumber].profileName}`;
}

function loadDishDescription(recipeNumber) {
    document.getElementById("dishDescription").innerHTML = ""; // Clear previous description
    
    for (let i = 0; i < recipes[recipeNumber].description.length; i++) {
        document.getElementById("dishDescription").innerHTML += `${recipes[recipeNumber].description[i]}`;
    }
}

function loadTimReq(recipeNumber) {
    document.getElementById(
        "timeReq"
    ).innerHTML = `${recipes[recipeNumber].time}`;
}

function loadIngredients(recipeNumber) {
    for (let i = 0; i < recipes[recipeNumber].ingredients.length; i++) {
        if (i % 2) {
            document.getElementById("ingredientFrame").innerHTML +=
                generateIngredientHTML(recipeNumber, i);
            document
                .getElementById(`ingredient${i}`)
                .classList.remove("background-rgba-grey");
        } else {
            document.getElementById("ingredientFrame").innerHTML +=
                generateIngredientHTML(recipeNumber, i);
        }
    }
}

function generateIngredientHTML(recipeNumber, i) {
    let html = `
        <div id="ingredient${i}" class="ingredient width100 background-rgba-grey" style="padding: 12px;">
            <p class="font-normal no-margin">${recipes[recipeNumber].amount[i]} ${recipes[recipeNumber].ingredients[i]}</p>
        </div>
    `;
    return html;
}

function loadRequirements(recipeNumber) {
    document.getElementById("req1").innerHTML = `${recipes[recipeNumber].time}`;
    document.getElementById(
        "req2"
    ).innerHTML = `${recipes[recipeNumber].difficulty}`;
    document.getElementById("req3").innerHTML = `${recipes[recipeNumber].date}`;
}

function loadDishname(recipeNumber) {
    document.getElementById(
        "dishName"
    ).innerHTML = `${recipes[recipeNumber].name}`;
}

function loadDishImage(recipeNumber) {
    let img = document.getElementById("dishImage");
    img.src = recipes[recipeNumber].img;
}
