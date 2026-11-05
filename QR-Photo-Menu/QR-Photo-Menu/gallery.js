const gallery = document.getElementById("gallery");
const categories = document.getElementById("categories");
const modal = document.getElementById("modal");

document.getElementById("business-name").textContent =
    MENU_CONFIG.businessName;

document.title = MENU_CONFIG.businessName + " | Menu";

// CREATE CATEGORY BUTTONS

const categoryList = [
    "All",
    ...new Set(MENU_CONFIG.products.map(p => p.category))
];

function createCategories() {

    categories.innerHTML = "";

    categoryList.forEach(category => {

        const button = document.createElement("button");

        button.className = "category-btn";

        if (category === "All") {
            button.classList.add("active");
        }

        button.textContent = category;

        button.onclick = () => {

            document.querySelectorAll(".category-btn")
                .forEach(btn => btn.classList.remove("active"));

            button.classList.add("active");

            displayProducts(category);
        };

        categories.appendChild(button);

    });
}

// DISPLAY PRODUCTS

function displayProducts(selectedCategory = "All") {

    gallery.innerHTML = "";

    const filtered = MENU_CONFIG.products.filter(product =>
        selectedCategory === "All" ||
        product.category === selectedCategory
    );

    filtered.forEach(product => {

        const card = document.createElement("div");

        card.className = "product-card";

        const image = document.createElement("img");
        image.src = product.image;
        image.alt = product.name;
        image.loading = "lazy";

        const info = document.createElement("div");
        info.className = "product-info";

        const category = document.createElement("span");
        category.className = "product-category";
        category.textContent = product.category;

        const name = document.createElement("h3");
        name.textContent = product.name;

        const description = document.createElement("p");
        description.textContent = product.description;

        const price = document.createElement("span");
        price.className = "product-price";
        price.textContent = MENU_CONFIG.currency + product.price;

        info.append(category, name, description, price);

        card.append(image, info);

        card.onclick = () => showProduct(product);

        gallery.appendChild(card);

    });

    if (filtered.length === 0) {
        gallery.textContent = "No products available.";
    }

}

// PRODUCT IMAGE POPUP

function showProduct(product) {

    document.getElementById("modal-image").src =
        product.image;

    document.getElementById("modal-image").alt =
        product.name;

    document.getElementById("modal-category").textContent =
        product.category;

    document.getElementById("modal-name").textContent =
        product.name;

    document.getElementById("modal-description").textContent =
        product.description;

    document.getElementById("modal-price").textContent =
        MENU_CONFIG.currency + product.price;

    modal.classList.add("show");

}

// CLOSE POPUP

document.getElementById("close-modal").onclick = () => {
    modal.classList.remove("show");
};

modal.onclick = (event) => {
    if (event.target === modal) {
        modal.classList.remove("show");
    }
};

// START

createCategories();
displayProducts();