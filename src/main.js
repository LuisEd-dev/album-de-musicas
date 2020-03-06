var apilink = 'http://api-luised-dev-com.umbler.net/api/videos'

async function render(){
    const axi = await axios.get(apilink);
    for (data of axi.data){ 
        let { _id, title, link, like = 0, deslike = 0 } = data
        var row = document.getElementsByClassName('row')[0]

        let col = document.createElement('div')
        col.setAttribute('class', 'col-lg-4')

        let divsItens = document.createElement('div')
        divsItens.setAttribute('class', 'divsItens')

        let divInterna = document.createElement("div")
        divInterna.setAttribute("class", "interno")

        let youtube = document.createElement("iframe")
        youtube.setAttribute("id", "ytplayer")
        youtube.setAttribute("type", "text/html")
        youtube.setAttribute("src", `https://www.youtube.com/embed/${link}`)
        youtube.setAttribute("frameborder", "0")

        let linkElement = document.createElement("a")
        linkElement.setAttribute("target", "_blank")
        linkElement.setAttribute("href", `https://youtu.be/${link}`)
        linkElement.setAttribute("class", "text")
        linkElement.appendChild(document.createTextNode(title))

        let contadorLikes = document.createElement('h1')
        contadorLikes.setAttribute("class", "contadores")
        contadorLikes.setAttribute("id", "likes")
        contadorLikes.appendChild(document.createTextNode(like))

        let imgLike = document.createElement("img")
        imgLike.setAttribute("id", "imgButton")
        imgLike.setAttribute("src", "icons/like.png")

        let buttonLike = document.createElement("button")
        buttonLike.setAttribute("onClick", `vote(this.id, "${_id}")`)
        buttonLike.setAttribute("class", "btn")
        buttonLike.setAttribute("id", "like")
        buttonLike.appendChild(imgLike)

        let contadorDeslikes = document.createElement('h1')
        contadorDeslikes.setAttribute("class", "contadores")
        contadorDeslikes.setAttribute("id", "deslikes")
        contadorDeslikes.appendChild(document.createTextNode(deslike))

        let imgDeslike = document.createElement("img")
        imgDeslike.setAttribute("id", "imgButton")
        imgDeslike.setAttribute("src", "icons/deslike.png")

        let buttonDeslike = document.createElement("button")
        buttonDeslike.setAttribute("onClick",`vote(this.id, "${_id}")`)
        buttonDeslike.setAttribute("class", "btn")
        buttonDeslike.setAttribute("id", "deslike")
        buttonDeslike.appendChild(imgDeslike)
        
        divInterna.appendChild(youtube)
        divInterna.appendChild(linkElement)

        divInterna.appendChild(contadorLikes)
        divInterna.appendChild(buttonLike)
        divInterna.appendChild(contadorDeslikes)
        divInterna.appendChild(buttonDeslike)

        divsItens.appendChild(divInterna)

        col.appendChild(divsItens)

        row.appendChild(col)

    };
}

async function vote(option, id){
    console.log(id)
    let get = await axios.get(`${apilink}/${id}`)
    let { like = 0, deslike = 0 } = get.data
    if(option == "like"){
        like += 1;
        const axi = await axios.put(`${apilink}/${id}`, {"like": like})
        window.location.reload();
    } else if(option == "deslike"){
        deslike += 1;
        const axi = await axios.put(`${apilink}/${id}`, {"deslike": deslike})
        window.location.reload();
    }
}
function darktheme(){
    document.getElementById("css").setAttribute("href", "css/dark.css")
    var theme = "dark"
    document.cookie = `theme=${theme}; path=/album-de-musicas-bootstrap`;

}
function ligththeme(){
    document.getElementById("css").setAttribute("href", "css/ligth.css")  
    var theme = "ligth"
    document.cookie = `theme=${theme}; path=/album-de-musicas-bootstrap`;
}
if(document.cookie){
    if(document.cookie.indexOf('theme=ligth') > -1){
        ligththeme()
    } else if(document.cookie.indexOf('theme=dark') > -1){
        darktheme()
    }
}
render()