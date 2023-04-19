const getCharacter = (characters) => {
    const  ul = document.createElement('ul')
    const result = characters.map(character => {
        const node = document.createElement("li");
        const link = document.createElement("a");
        link.setAttribute("href", "people.html");
        link.addEventListener('click', () =>  localStorage.setItem("person", character))
        const textNode = document.createTextNode(character);
        link.appendChild(textNode)
        node.appendChild(link);
        return node
    })
    result.forEach(elem => ul.appendChild(elem))
    return ul
}

const fetchFilmData = () => {
    const film = localStorage.getItem("film");

    fetch(film)
        .then(response => {
            if(!response.ok){
                throw Error("ERROR")
            }
            return response.json()
        }).then (filmData => {
            const html = `<div class ="card">
                                <div>
                                    <h2>${filmData.title} (${filmData.release_date.slice(0,4)})</h2>
                                    <p><strong>About:</strong> ${filmData.opening_crawl}/p>  
                                    <p><strong>Director:</strong> ${filmData.director}</p>  
                                </div>
                                <div id="characters">
                                    <h2>Cast</h2>
                                </div>
                         </div>`;

        document.getElementById("app").insertAdjacentHTML("afterBegin", html);
        document.getElementById("characters").appendChild(getCharacter(filmData.characters));

    }).catch(err=> console.log(err))
}


window.onload = function() {
        fetchFilmData()
};