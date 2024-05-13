let data = JSON.parse(localStorage.getItem("object")) || [];

function readAll() {
    let tableData = document.querySelector(".data_table");
    let element = "";

    data.forEach((ele,index) => {
        let interestsArray = [];
        if (ele.java) interestsArray.push('Java');
        if (ele.python) interestsArray.push('Python');
        if (ele.html) interestsArray.push('HTML');
        if (ele.css) interestsArray.push('CSS');
        if (ele.javascript) interestsArray.push('JavaScript');

        let interest = interestsArray.join(",");
        element += `<tr>
            <td>${ele.name +" " +ele.lastName}</td>
            <td>${ele.email}</td>
            <td>${ele.number}</td>
            <td>${ele.gender}</td>
            <td>${ele.dob}</td>
            <td>${ele.pass}</td>
            <td>${ele.country}</td>
            <td>${interest}</td>
            <td>${ele.file}</td>
            <td><button onclick="deleteRow(${index})">delete</button><button onclick="editRow(${index})">edit</button></td>
            </tr>`;
    });

    tableData.innerHTML = element;
}
function deleteRow(index) {
   
    data.splice(index, 1);
    
    localStorage.setItem("object", JSON.stringify(data));

    readAll();
}

function editRow(index) {
     let ele = data[index];
     alert(ele.name);
    document.getElementById("name").value = ele.name;
    document.getElementById("last-name").value = ele.lastName;
    document.getElementById("email").value = ele.email;
    document.getElementById("number").value = ele.number;
    document.querySelector('input[name="gender"][value="' + ele.gender + '"]').checked = true;
    document.getElementById("dob").value = ele.dob;
    document.getElementById("pass").value = ele.pass;
    document.getElementById("confirm-pass").value = ele.confirmPass; 
    document.getElementById("country").value = ele.country;

    let interestsArray = [];
    if (ele.java) interestsArray.push('Java');
    if (ele.python) interestsArray.push('Python');
    if (ele.html) interestsArray.push('HTML');
    if (ele.css) interestsArray.push('CSS');
    if (ele.javascript) interestsArray.push('JavaScript');

    document.getElementById("java").checked = interestsArray.includes("Java");
    document.getElementById("python").checked = interestsArray.includes("Python");
    document.getElementById("html").checked = interestsArray.includes("HTML");
    document.getElementById("css").checked = interestsArray.includes("CSS");
    document.getElementById("javascript").checked = interestsArray.includes("JavaScript");

    const fileError = document.getElementById("fileError");
    // fileError.textContent = fileName ? fileName : 'No file selected';
    let fileInput = document.getElementById("file");
        fileInput.click();
    data[index] = {
        name: document.getElementById("name").value.trim(),
        lastName: document.getElementById("last-name").value.trim(),
        dob: document.getElementById("dob").value.trim(),
        gender: document.querySelector('input[name="gender"]:checked').value,
        country: document.getElementById("country").value.trim(),
        email: document.getElementById("email").value.trim(),
        number: document.getElementById("number").value.trim(),
        java: document.getElementById("java").checked,
        python: document.getElementById("python").checked,
        html: document.getElementById("html").checked,
        css: document.getElementById("css").checked,
        javascript: document.getElementById("javascript").checked,
        pass: document.getElementById("pass").value.trim(),
        confirmPass: document.getElementById("confirm-pass").value.trim(),
        file: document.getElementById("file").value.trim()
    };
    deleteRow(index);


    localStorage.setItem("object", JSON.stringify(data));

    readAll();
}


let formClick = document.querySelector("#myForm");
formClick.addEventListener("submit", function(e) {
    e.preventDefault();
    if (validate()) {
        let name = document.getElementById("name").value.trim();
        let lastName = document.getElementById("last-name").value.trim();
        let dob = document.getElementById("dob").value.trim();
        let gender = document.querySelector('input[name="gender"]:checked');
        let country = document.getElementById("country").value.trim();
        let email = document.getElementById("email").value.trim();
        let number = document.getElementById("number").value.trim();
        let java = document.getElementById("java").checked;
        let python = document.getElementById("python").checked;
        let html = document.getElementById("html").checked;
        let css = document.getElementById("css").checked;
        let javascript = document.getElementById("javascript").checked;
        let pass = document.getElementById("pass").value.trim();
        let confirmPass = document.getElementById("confirm-pass").value.trim();
        let file = document.getElementById("file").value.trim(); 

        let newObj = {
            name: name,
            lastName: lastName,
            dob: dob,
            gender: gender ? gender.value : '',
            country: country,
            email: email,
            number: number,
            java: java,
            python: python,
            html: html,
            css: css,
            javascript: javascript,
            pass: pass,
            confirmPass: confirmPass,
            file: file
        }

        data.push(newObj);
        localStorage.setItem("object", JSON.stringify(data));
        readAll();
        formClick.reset();
    }
});
function validate() {
    let name = document.getElementById("name").value.trim();
    let lastName = document.getElementById("last-name").value.trim();
    let dob = document.getElementById("dob").value.trim();
    let gender = document.querySelector('input[name="gender"]:checked');
    let country = document.getElementById("country").value.trim();
    let email = document.getElementById("email").value.trim();
    let number = document.getElementById("number").value.trim();
    let java = document.getElementById("java").checked;
    let python = document.getElementById("python").checked;
    let html = document.getElementById("html").checked;
    let css = document.getElementById("css").checked;
    let javascript = document.getElementById("javascript").checked;
    let pass = document.getElementById("pass").value.trim();
    let confirmPass = document.getElementById("confirm-pass").value.trim();
    let file = document.getElementById("file").value.trim(); 

    let isValid = true;

    if (name === '') {
        document.getElementById("nameError").innerText = "Please enter your first name";
        isValid = false;
    } else {
        document.getElementById("nameError").innerText = "";
    }

    if (lastName === '') {
        document.getElementById("lastNameError").innerText = "Please enter your last name";
        isValid = false;
    } else {
        document.getElementById("lastNameError").innerText = "";
    }

    if (dob === '') {
        document.getElementById("dobError").innerText = "Please enter your date of birth";
        isValid = false;
    } else {
        document.getElementById("dobError").innerText = "";
    }

    if (!gender) {
        document.getElementById("genderError").innerText = "Please select your gender";
        isValid = false;
    } else {
        document.getElementById("genderError").innerText = "";
    }

    if (country === '') {
        document.getElementById("countryError").innerText = "Please select your country";
        isValid = false;
    } else {
        document.getElementById("countryError").innerText = "";
    }

    if (email === '') {
        document.getElementById("emailError").innerText = "Please enter your email";
        isValid = false;
    } else if (!validateEmail(email)) {
        document.getElementById("emailError").innerText = "Please enter a valid email address";
        isValid = false;
    } else {
        document.getElementById("emailError").innerText = "";
    }

    if (number === '') {
        document.getElementById("numberError").innerText = "Please enter your mobile number";
        isValid = false;
    } else if (!/^\d{10}$/.test(number)) {
        document.getElementById("numberError").innerText = "Please enter a valid 10-digit mobile number";
        isValid = false;
    }else {
        document.getElementById("numberError").innerText = "";
    }

    if (!java && !python && !html && !css && !javascript) {
        document.getElementById("interestError").innerText = "Please select at least one interest";
        isValid = false;
    } else {
        document.getElementById("interestError").innerText = "";
    }

    if (pass === '') {
        document.getElementById("passError").innerText = "Please enter your password";
        isValid = false;
    } else if (!validatePassword(pass)) {
        document.getElementById("passError").innerText = "Password should be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character";
        isValid = false;
    } else {
        document.getElementById("passError").innerText = "";
    }

    if (confirmPass === '') {
        document.getElementById("confirmPassError").innerText = "Please confirm your password";
        isValid = false;
    } else if (confirmPass !== pass) {
        document.getElementById("confirmPassError").innerText = "Passwords do not match";
        isValid = false;
    } else {
        document.getElementById("confirmPassError").innerText = "";
    }
    if (file === '') {
        document.getElementById("fileError").innerText = "Please select a file";
        isValid = false;
    } else {
        document.getElementById("fileError").innerText = "";
    }

    return isValid;
}

function validateEmail(email) {
    // Regular expression for validating email addresses
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    // Regular expression for validating password strength
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
    return passwordRegex.test(password);
}