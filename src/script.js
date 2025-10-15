// Login Guard
// if a user is logged in and tries to access login.html, redirect them to the main page.
if (localStorage.getItem("islogin") === "true" && window.location.href.endsWith("login.html")) {
    window.location.href = "index.html";
}

// if a user is NOT logged in and tries to access any page other than login.html & about.html, redirect them to the login page.
if (localStorage.getItem("islogin") !== "true" && !window.location.href.endsWith("login.html") && !window.location.href.endsWith("register.html") && !window.location.href.endsWith("about.html"))  {
    window.location.href = "login.html";
}

let isloggedin = false

const login = () => {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (username === "lemong" || username === "lemong@gmail.com") {
        if (password === "lemong") {
            isloggedin = true
            localStorage.setItem("islogin", true);
            window.location.href = "profile.html";
        } else {
            alert("Wrong password");
        }
    }

    else {
        alert("Username is invalid");
    }


    return false;
}

const rightDiv = document.querySelector(".navbar .right");
const about = rightDiv.querySelector("p");

if (localStorage.getItem("islogin") === "true") {
    const profileP = document.createElement("p");
    const profileA = document.createElement("a");
    profileA.href = "profile.html";              
    profileA.textContent = "Profile";    
    profileP.appendChild(profileA);

    rightDiv.insertBefore(profileP, about);

    const logoutP = document.createElement("p");
    const logoutA = document.createElement("a");
    logoutA.href = "index.html";
    logoutA.textContent = "Logout";
    logoutA.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.setItem("islogin", "false");
        // this redirect will be caught by the guard, sending the user to login.html
        window.location.href = "index.html";
    });
    rightDiv.insertBefore(logoutP, about.nextSibling);
    logoutP.appendChild(logoutA);

} else {
    // this is a redundant check, but it's here to ensure
    // that the "Login" link is only added when the user is not logged in.
    // it prevents adding a "Login" link to the login page itself.
    if (!window.location.href.endsWith("login.html")) {
        const p = document.createElement("p");
        const a = document.createElement("a");
        a.href = "login.html";
        a.textContent = "Login"; 
        p.appendChild(a);

        rightDiv.insertBefore(p, about);
    }
}