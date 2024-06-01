const serverURL = "http://localhost:4000";
const dessertsPreview = document.getElementById("desserts-preview");
const dessertsSection = document.getElementById("desserts-display");
const submitBtn = document.getElementsByClassName("btn-form")[0];

document.addEventListener("DOMContentLoaded", await getDesserts());
submitBtn.addEventListener("click", submitQuestion);

async function submitQuestion(event) {
    if (event) {
        event.preventDefault();
    }

    const name = document.getElementById("name");
    const number = document.getElementById("number");
    const email = document.getElementById("email");
    const question = document.getElementById("question");

    const requestBody = {
        full_name: name.value,
        phone_number: number.value,
        email: email.value,
        question: question.value,
    };

    const httpHeaders = {
        method: "POST",
        body: JSON.stringify(requestBody),
    };

    await fetch(`${serverURL}/form_submissions`, httpHeaders)
        .then(() => {
            console.log(httpHeaders.body);
            name.value = "";
            number.value = "";
            email.value = "";
            question.value = "";
        })
        .catch(() => alert("Something went wrong"));
}

async function getDesserts(event) {
    if (event) {
        event.preventDefault();
    }

    await fetch(`${serverURL}/desserts`)
        .then((desserts) => desserts.json())
        .then((desserts) => {
            for (const dessert of desserts) {
                addDessertShort(dessert);
                addDessertFull(dessert);
            }
        })
        .catch(() => alert("Something went wrong!"));
}

function addDessertShort(dessert) {
    const { id, name, description_short, image } = dessert;

    const article = document.createElement("article");
    article.className = "dessert-preview";

    const picture = document.createElement("picture");
    const picImg = document.createElement("img");
    picImg.src = `/${image}`;
    picImg.className = "img-dessert-preview";
    picture.appendChild(picImg);

    const divider = document.createElement("picture");
    const dividerImg = document.createElement("img");
    dividerImg.src = `/divider.svg`;
    divider.appendChild(dividerImg);

    const txt = document.createElement("div");
    txt.className = "txt-dessert-preview";

    const title = document.createElement("h2");
    title.className = "title-dessert-preview";
    title.textContent = name;
    txt.appendChild(title);

    const description = document.createElement("p");
    description.className = "description-dessert-preview";
    description.textContent = description_short;
    txt.appendChild(description);

    const info = document.createElement("a");
    info.href = `#image-${id}`;
    info.className = "info-dessert-preview";
    info.textContent = "НАУЧЕТЕ ПОВЕЧЕ";

    article.appendChild(picture);
    article.appendChild(divider);
    article.appendChild(txt);
    article.appendChild(info);

    dessertsPreview.appendChild(article);
}

function addDessertFull(dessert) {
    const { id, name, description_long, image, ingredients_text, nutrition } =
        dessert;

    const article = document.createElement("article");
    article.className = "dessert";
    article.id = `dessert-${id}`;

    const picture = document.createElement("picture");
    const picImg = document.createElement("img");
    picImg.src = `/${image}`;
    picImg.className = "img-dessert";
    picture.appendChild(picImg);

    const info = document.createElement("div");
    info.className = "info-dessert";

    const title = document.createElement("h1");
    title.className = "title-dessert";
    title.textContent = name;
    info.appendChild(title);

    const description = document.createElement("p");
    description.textContent = description_long;
    info.appendChild(description);

    const ingredients = document.createElement("p");
    ingredients.innerHTML = `<b>Основни съставки:</b> ${ingredients_text}.`;
    info.appendChild(ingredients);

    const nutritions = document.createElement("div");
    nutritions.className = "dessert-nutritions";
    for (const n of Object.entries(nutrition)) {
        nutritions.appendChild(createDessertNutrition(n));
    }

    article.appendChild(picture);
    article.appendChild(info);
    article.appendChild(nutritions);

    dessertsSection.appendChild(article);
}

function createDessertNutrition([key, value]) {
    const container = document.createElement("div");

    const name = document.createElement("p");
    name.className = "nutrition-name";
    switch (key) {
        case "calories":
            name.textContent = "Калории: ";
            break;
        case "totalFat":
            name.textContent = "Общо мазнини: ";
            break;
        case "saturatedFat":
            name.textContent = "Наситени мазнини: ";
            break;
        case "totalCarbs":
            name.textContent = "Общо въглехидрати: ";
            break;
        case "protein":
            name.textContent = "Протеин: ";
            break;
        case "sugars":
            name.textContent = "Захари: ";
            break;
        case "sodium":
            name.textContent = "Натрий:";
            break;
        case "cholesterol":
            name.textContent = "Холестерол: ";
            break;
    }

    const amount = document.createElement("p");
    amount.className = "nutrition-amount";
    switch (key) {
        case "calories":
            amount.textContent = value;
            break;
        case "totalFat":
            amount.textContent = `${value}g`;
            break;
        case "saturatedFat":
            amount.textContent = `${value}g`;
            break;
        case "totalCarbs":
            amount.textContent = `${value}g`;
            break;
        case "protein":
            amount.textContent = `${value}g`;
            break;
        case "sugars":
            amount.textContent = `${value}g`;
            break;
        case "sodium":
            amount.textContent = `${value}mg`;
            break;
        case "cholesterol":
            amount.textContent = `${value}mg`;
            break;
    }

    container.appendChild(name);
    container.appendChild(amount);

    return container;
}
