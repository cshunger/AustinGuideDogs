function postEmail() {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    var url = "http://localhost:3000/subscribe"

    var email = JSON.stringify({email: document.getElementById('email').value});

    if (validateEmail(document.getElementById('email').value)){
        xhr.open('post', url, true);
        // xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.setRequestHeader("Content-Type", "application/json")
        xhr.onload = function() {
            var status = xhr.status;
            if (status == 200) {
                document.getElementById('thank_you').style.display = "block";
                document.getElementById('subscribe_heading').style.display = "none";
                document.getElementById('subscribe_form').style.display = "none";
                resolve(xhr.response);
            } else {
                reject(status);
            }
        };
        xhr.send(email);
    } else {
      var error = document.createElement('p');

      error.classList = "error";
      error.innerHTML = "Invalid email address"
      document.getElementById('subscribe_form').appendChild(error);
    }
  });
};

function validateEmail(email) {
    var re = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return re.test(email);
}