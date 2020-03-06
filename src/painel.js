var apilink = 'http://api-luised-dev-com.umbler.net/api/videos'

async function add(){
    var response = await axios.get(apilink)

    let linkVideo = document.getElementById("linkVideo").value
    let titleVideo = document.getElementById("tituloVideo").value
    let div = document.getElementById("videos")

    var registrado = false
    
    for ( response of response.data ){
        let { link, title } = response
        if( linkVideo == link || titleVideo == title){
            registrado = true
        }
    }
    
    if ( registrado == false && linkVideo != "ID do Vídeo" &&  titleVideo != "Titulo do Vídeo"){
        await axios.post(apilink, { 'title': titleVideo , 'link' : linkVideo})

        linkVideo = `https://www.youtube.com/embed/${linkVideo}`

        let youtube = document.createElement("iframe")
        youtube.setAttribute("id", "ytplayer2")
        youtube.setAttribute("type", "text/html")
        youtube.setAttribute("src", linkVideo)
        youtube.setAttribute("frameborder", "0")

        div.appendChild(youtube)

        alert("Adicionado com Sucesso")
    } else if( registrado == true){
        alert("Música já Adicionada")
    } else if(linkVideo == "" ||  titleVideo == ""){
        alert("Preencha Todos os Campos")
    } else if(linkVideo == "ID do Vídeo" ||  titleVideo == "Titulo do Vídeo"){
        alert("Altere os Campos")
    } else{
        alert("Erro!")
    }
}
async function remove(){
    var response = await axios.get(apilink)

    let linkVideo = document.getElementById("linkVideo").value
    let titleVideo = document.getElementById("tituloVideo").value
    let div = document.getElementById("videos")

    for (response of response.data){
        let { link, title, _id} = response
        if(linkVideo == link || titleVideo == title){
            await axios.delete(`${apilink}/${_id}`)
            alert("Deletado com Sucesso")
        }
    }
}
function limpar(){
    document.getElementById("videos").innerHTML = ""
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