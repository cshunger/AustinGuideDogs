(function(){
  getJSON('facebook').then(function(data) {
    if(data.data == undefined){
      document.getElementById('no_events').style.display = "block";
    } else{
      for(element in data.data) {
        var event = document.createElement('div');
        var event_name = document.createElement('p')
        var event_time = document.createElement('p')

        event.classList = "event";
        event_name.innerHTML = data.data[element].name;
        event_time.innerHTML = convertTime(data.data[element].start_time);
        event.onclick = function () {
          window.open('https://www.facebook.com/events/' + data.data[element].id, '_blank')
        }

        event.appendChild(event_name);
        event.appendChild(event_time);
        document.getElementById('FacebookEvents').appendChild(event);
      }
    }
  }, function(status) { //error detection....
    alert('Something went wrong.');
  });
})();

(function(){
  getJSON('instagram').then(function(data) {
    for(element in data.data) {
      var photo = document.createElement('img');

      photo.classList = "instagram";
      photo.src = data.data[element].images.standard_resolution.url;
      photo.onclick = function () {
        window.open(element.link, '_blank')
      }
      document.getElementById('InstagramGallery').appendChild(photo);
    }
  }, function(status) { //error detection....
    alert('Something went wrong.');
  });
})();

function getJSON(url) {
  return new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('get', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
      var status = xhr.status;
      if (status == 200) {
        resolve(xhr.response);
      } else {
        reject(status);
      }
    };
    xhr.send();
  });
};

function convertTime(event_time){
    var res = event_time.split("T")

    var date = res[0];
    var time = res[1].split("-")[0];

    var hour = Number(time.split(":")[0])
    var minute = time.split(":")[1]

    var timeOfDay = "AM";
    if (hour > 12 ){
        timeOfDay = "PM";
        hour -= 12;
    }

    var date_res = date.split("-");

    var month = date_res[1];
    var day = Number(date_res[2]);

    if(month === "01"){
        month = "January";
    }else if(month === "02"){
        month = "February"
    }else if(month === "03"){
        month = "March"
    }else if(month === "04"){
        month = "April"
    }else if(month === "05"){
        month = "May"
    }else if(month === "06"){
        month = "June"
    }else if(month === "07"){
        month = "July"
    }else if(month === "08"){
        month = "August"
    }else if(month === "09"){
        month = "September"
    }else if(month === "10"){
        month = "October"
    }else if(month === "11"){
        month = "November"
    }else if(month === "12"){
        month = "December"
    }        
    
    return month + " " + day + " " + hour + ":" + minute + " " + timeOfDay
}