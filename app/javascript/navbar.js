var navHidden = true;

function smallScreen(){
     var w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        x = w.innerWidth || e.clientWidth || g.clientWidth;
    return x < 824;
}

function openNav(){
     if(navHidden && smallScreen()){
        document.getElementById('navbar').style.display = 'block';
     } else if (!navHidden && smallScreen()){
        document.getElementById('navbar').style.display = 'none';
     }
     navHidden = !navHidden;
}

function resetNav(){
     var w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        x = w.innerWidth || e.clientWidth || g.clientWidth;
    if(smallScreen()){
        navHidden = true;
        document.getElementById('navbar').style.display = 'none';
    }else {
        document.getElementById('navbar').style.display = 'flex';
    }
}