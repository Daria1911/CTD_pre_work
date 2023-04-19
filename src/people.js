const getFilm = (list) => {
    const ul = document.createElement('ul')
    const result = list.map(film => {
        const node = document.createElement("li");
        const link = document.createElement("a");
        link.setAttribute("href", "films.html");
        link.addEventListener('click', () => localStorage.setItem("film", film))
        const textNode = document.createTextNode(film);
        link.appendChild(textNode)
        node.appendChild(link);
        return node
    })
    result.forEach(elem => ul.appendChild(elem))
    return ul
}

const fetchData = () => {
    let person  = localStorage.getItem("person");

    if (!person) {
        fetch("https://swapi.dev/api/people")
            .then(response => {
                if (!response.ok) {
                    throw Error("ERROR")
                }
                return response.json()
            })
            .then(data => {
                data.results.forEach((person) => {
                    const html = `<div class ="card">
                            <div>
                                <h2>${person.name}</h2>
                                <span>Born: ${person.birth_year}</span>  
                                <span>Gender: ${person.gender}</span>  
                            </div>
                            
                            <div id="films" >
                              
                            </div>
                            </div>`;

                    document.getElementById("app").insertAdjacentHTML("afterBegin", html);
                    document.getElementById("films").appendChild(getFilm(person.films));
                })

            }).catch(err => console.log(err))
    } else {
        console.log(person)
        fetch(person)
            .then(response => {
                if (!response.ok) {
                    throw Error("ERROR")
                }
                return response.json()
            })
            .then(person => {
                const html = `<div class ="card">
                            <div>
                                <h2>${person.name}</h2>
                                <span>Born: ${person.birth_year}</span>  
                                <span>Gender: ${person.gender}</span>  
                            </div>
                            
                            <div id="films" ></div>
                            </div>`;

                document.getElementById("app").insertAdjacentHTML("afterBegin", html);
                document.getElementById("films").appendChild(getFilm(person.films));
            })

    }
}

window.onload = function () {
    fetchData()
};