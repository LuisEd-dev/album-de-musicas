var apilink = 'http://api-luised-dev-com.umbler.net/api/videos'

async function render(){
    const axi = await axios.get(apilink);
    for (data of axi.data){ 
        let { _id, title, link, like = 0, deslike = 0 } = data
        var lista = document.getElementById('list')

        let divsVerticais = document.createElement('div')
        divsVerticais.setAttribute('class', 'divsVerticais')

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

        divsVerticais.appendChild(divInterna)

        lista.appendChild(divsVerticais)

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

render()