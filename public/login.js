
function login() {
    var username = document.getElementById("username").value.toString();
    var password = document.getElementById("password").value.toString();
    fetch("/check-login", {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify({username: username, password: password})
    })
        .then ((res) => res.json())
        .then ((isCorrect) => {
            if (isCorrect) {
                sessionStorage.setItem("username", username);
                window.location.href = "home.html";
            }
            else document.getElementById("problem").innerHTML ="Username or password is incorrect!";
        })
        .catch((e) => console.error(e));
}

function register() {
    var username = document.getElementById("username").value.toString();
    var password = document.getElementById("password").value.toString();
    console.log("lol");
    fetch("/check-reg", {
        method: "POST",
        headers: {"Content-Type" : "application/json"},
        body: JSON.stringify({username: username, password: password})
    })
        .then ((res) => res.text())
        .then ((problem) => {
            if (problem === "ok") {
                // everything ok
                sessionStorage.setItem("username", username);
                window.location.href = "home.html";
            }
            else if (problem === "username") {
                // username issues
                document.getElementById("problem").innerHTML = "Username is taken or not valid";
            }
            else {
                // password issues
                document.getElementById("problem").innerHTML = "Password is not valid: " + problem;
            }
        });
}

if (sessionStorage.getItem("username")) 
    window.location.href = "home.html";