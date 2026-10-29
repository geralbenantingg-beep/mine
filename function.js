document.addEventListener("DOMContentLoaded", function () {

  const loader = document.getElementById("loader");
  const text = document.getElementById("loadingText");

  /* ---------------- LOADER NAVIGATION ---------------- */

  document.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", function (e) {

      const href = this.getAttribute("href");

      if (href && href.includes(".html")) {
        e.preventDefault();

        let pageName = href.replace(".html", "");
        pageName = pageName.charAt(0).toUpperCase() + pageName.slice(1);

        if (loader) {
          loader.style.display = "flex";
          loader.style.opacity = "1";
          loader.style.visibility = "visible";
        }

        if (text) {
          text.innerText = "Loading " + pageName + "...";
        }

        setTimeout(() => {
          window.location.href = href;
        }, 700);
      }
    });
  });

  /* ---------------- HIDE LOADER ON LOAD ---------------- */

  window.addEventListener("load", function () {
    if (loader) {
      setTimeout(() => {
        loader.style.opacity = "0";
        loader.style.visibility = "hidden";

        setTimeout(() => {
          loader.style.display = "none";
        }, 300);

      }, 500);
    }
  });

  /* ---------------- INIT CART ---------------- */

  updateCartCount();
  loadCart();

  /* ---------------- ACCOUNT & CONTACT TOASTS ---------------- */

  function showCustomToast(message) {

    const toastMessage = document.getElementById("toastMessage");
    const toastEl = document.getElementById("liveToast");

    if (toastMessage && toastEl) {

      toastMessage.innerText = message;

      const toast = new bootstrap.Toast(toastEl);

      toast.show();
    }
  }

  // LOGIN FORM
  const loginForm = document.getElementById("loginForm");

  if (loginForm) {

    loginForm.addEventListener("submit", function (e) {

      e.preventDefault();

      showCustomToast("Login Successfully!");

    });

  }

  // LOGOUT BUTTON
  const logoutBtn = document.getElementById("logoutBtn");

  if (logoutBtn) {

    logoutBtn.addEventListener("click", function () {

      showCustomToast("Logout Successfully!");

    });

  }

  // CONTACT FORM
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {

    contactForm.addEventListener("submit", function (e) {

      e.preventDefault();

      showCustomToast("Message Sent Successfully!");

    });

  }

});

/* ---------------- TOAST ---------------- */

function showToast() {
  const toastEl = document.getElementById("cartToast");

  if (toastEl) {
    const toast = new bootstrap.Toast(toastEl);
    toast.show();
  }
}

/* ---------------- CART SYSTEM ---------------- */

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price, image) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  cart.push({ name, price, image });

  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartCount();
  showToast();
}

function updateCartCount() {
  const count = document.getElementById("cartCount");
  if (count) {
    count.innerText = cart.length;
  }
}

function loadCart() {
  const cartList = document.getElementById("cartList");
  if (!cartList) return;

  cartList.innerHTML = "";

  cart.forEach((item, index) => {
    cartList.innerHTML += `
      <div class="card mb-3 p-3">
        <div class="row align-items-center">

          <div class="col-md-3">
            <img src="${item.image}" class="img-fluid rounded" style="height:120px; object-fit:cover;">
          </div>

          <div class="col-md-6 text-start">
            <h5>${item.name}</h5>
            <p class="text-warning fw-bold">₱${item.price}</p>
          </div>

          <div class="col-md-3 text-end">
            <button class="btn btn-danger btn-sm"
              onclick="removeItem(${index})">
              Cancel Order
            </button>
          </div>

        </div>
      </div>
    `;
  });
}

function removeItem(index) {
  cart.splice(index, 1);

  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartCount();
  loadCart();
}