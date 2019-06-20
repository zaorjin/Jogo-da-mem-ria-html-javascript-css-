(function(){
    var acertos = 0;

    var imgs = [];

    var cartas = [];

    var modalgg = document.getElementById("modalgg");

    for(var i=0; i<20; i++){
        var img = {
            src: "imgs/"+i+".png",
            id: i%10
        };
        imgs.push(img);
    }
    start();
    function start(){
        acertos = 0;

        cartas = [];
        imgs = random(imgs);

        var frontfaces = document.getElementsByClassName("front");
        var backfaces = document.getElementsByClassName("back");


        for(var i = 0; i<20; i++){
            frontfaces[i].classList.remove("virado","acerto");
            backfaces[i].classList.remove("virado","acerto");

            var card = document.getElementById("card" + i);
            card.style.left = (i % 10 === 0) ? 5 + "px" : i % 10 * 183 + 5 + "px";
            card.style.top = i < 10 ? 5 + "px" : 260 + "px";

            card.addEventListener("click",virar,false);

            frontfaces[i].style.background = "url('"+ imgs[i].src +"')";
            frontfaces[i].setAttribute("id",imgs[i].id);
        }

        modalgg.style.zIndex = -2;
        modalgg.removeEventListener("click",start,false);

    }

    function random(aArray){
        var array = [];

        while(array.length !== aArray.length){
            var i = Math.floor(Math.random()*aArray.length);

            if(array.indexOf(aArray[i]) <0 ){
                array.push(aArray[i]);
            }


        }
        return array;

    }

    function virar(){
        if(cartas.length < 2){

        var faces = this.getElementsByClassName("face");
            if(faces[0].classList.length > 2){
                return;
            }
        faces[0].classList.toggle("virado");
        faces[1].classList.toggle("virado");

        cartas.push(this);
        if(cartas.length == 2){
            if(cartas[0].childNodes[3].id === cartas[1].childNodes[3].id){
                cartas[0].childNodes[1].classList.toggle("acerto");
                cartas[0].childNodes[3].classList.toggle("acerto");
                cartas[1].childNodes[1].classList.toggle("acerto");
                cartas[1].childNodes[3].classList.toggle("acerto");

                acertos++;
                cartas = [];

                if(acertos === 10){
                    gg();
                }
            }
        }
    }else{
        cartas[0].childNodes[1].classList.toggle("virado");
        cartas[0].childNodes[3].classList.toggle("virado");
        cartas[1].childNodes[1].classList.toggle("virado");
        cartas[1].childNodes[3].classList.toggle("virado");

        cartas = [];
    }
        
    }

    function gg(){ 
        modalgg.style.zIndex = 10;
        modalgg.addEventListener("click",start,false);

    }
}());