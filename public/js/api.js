const baseURL = "https://api.football-data.org/v2/";
const APIKey = "8b6d34002a404137adf18de11c9d4516";
const urlParams = new URLSearchParams(window.location.search);
const idParam = urlParams.get("id");
const endpointStandingEngland = `${baseURL}competitions/2021/standings`;
const endpointStandingItaly = `${baseURL}competitions/2019/standings`;
const endpointArticleTeam = `${baseURL}teams/${idParam}`

const fetchAPI = url => {
    return fetch(url, {
        headers: {
            'X-Auth-Token': APIKey
        }
    })
        .then(res => {
            if (res.status != 200) {
                console.log("Error: " + res.status);
                return Promise.reject(new Error(res.statusText))
            } else {
                return Promise.resolve(res)
            }
        })
        .then(res => res.json())
        .catch(err => {
            console.log(err)
        })
};

// code untuk memanggil data dari API menggunakan code showStanding
const getAllStandingsEngland = () => {
    if ("caches" in window) {
        caches.match(endpointStandingEngland).then(response => {
            if (response) {
                response.json().then(data => {
                    console.log("Data Pertandingan" + data);
                    showStanding(data);
                })
            }
        })
    }

    fetchAPI(endpointStandingEngland)
        .then(data => {
            showStanding(data);
        })
        .catch(error => {
            console.log(error)
        })
}

const getAllStandingsItaly = () => {
    if ("caches" in window) {
        caches.match(endpointStandingItaly).then(response => {
            if (response) {
                response.json().then(data => {
                    console.log("Data Pertandingan" + data);
                    showStanding(data);
                })
            }
        })
    }

    fetchAPI(endpointStandingItaly)
        .then(data => {
            showStanding(data);
        })
        .catch(error => {
            console.log(error)
        })
}

// Code untuk membuat tampilan dalam website
const showStanding = data => {
    let standings = "";
    let standingElement = document.getElementById("standingResult");

    data.standings[0].table.forEach(standing => {
        standings += `
            <tr>
                <td><img src="${standing.team.crestUrl.replace(/^http:\/\//i, 'https://')}" width="30px" alt="badge"/></td>
                <td><a class="linked" href="./article.html?id=${standing.team.id}">${standing.team.name}</a></td>
                <td>${standing.won}</td>
                <td>${standing.draw}</td>
                <td>${standing.lost}</td>
                <td>${standing.points}</td>
                <td>${standing.goalsFor}</td>
                <td>${standing.goalsAgainst}</td>
                <td>${standing.goalDifference}</td>
            </tr>
        `;
    });

    standingElement.innerHTML = `
        <div class="card" style="padding-left: 24px; padding-right: 24px; margin-top: 30px;">
            <table class="striped responsive-table">
                <thead>
                    <tr>
                        <th></th>
                        <th>Team Name</th>
                        <th>W</th>
                        <th>D</th>
                        <th>L</th>
                        <th>P</th>
                        <th>GF</th>
                        <th>GA</th>
                        <th>GD</th>
                    </tr>
                </thead>
                <tbody id="standings">
                    ${standings}
                </tbody>
            </table>
        </div>
    `;
}

// code untuk mengambil data tiap artikel tim dari API
const getArticleTeam = (idParam) => {
    return new Promise((resolve, reject) => {
        if ("caches" in window) {
            caches.match(endpointArticleTeam).then(response => {
                if (response) {
                    response.json().then(team => {
                        console.log("Detail Tim:" + team);
                        showArticleTeam(team);
                        resolve(team);
                    })
                }
            })
        }

        fetchAPI(endpointArticleTeam)
            .then(team => {
                showArticleTeam(team);
                resolve(team);
            })
            .catch(error => {
                console.log(error)
            })
    })
}

// code untuk menampilkan artikel tim
const showArticleTeam = (team) => {
    const teamElement = document.getElementById('team-detail');

    let playerTeamLogo = "";
    playerTeamLogo += `
            <img src="${team.crestUrl.replace(/^http:\/\//i, 'https://')}" width="30px" alt="badge"/>
        `;
    let playersTeam = "";
    team.squad.forEach(players => {
        playersTeam += `
            <tr>
                <td>${playerTeamLogo}</td>
                <td>${players.name}</td>
                <td>${players.role}</td>
                <td>${players.position}</td>
                <td>${players.nationality}</td>                
            </tr>
        `;

    });
    teamElement.innerHTML = `
        <div class="col s12 m12">
            <h2 class="header" style="color: #3e977b; text-align: center;">${team.name}</h2>
            <div class="card horizontal">
                <div class="card-image">
                    <img src="${team.crestUrl.replace(/^http:\/\//i, 'https://')}">
                </div>
                <div class="card-stacked">
                    <div class="card-content">
                        <p>Short Name : ${team.shortName}</p>
                        <p>TLA : ${team.tla}</p>
                        <p>Address  : ${team.address}</p>
                        <p>Phone    : ${team.phone}</p>
                        <p>Club Colors : ${team.clubColors}</p>
                        <p>Venue : ${team.venue}</p>
                        <p>Email : ${team.email}</p>
                        <p>Website  : <a href="${team.website}">${team.website}</a></p>
                        <p></p>
                    </div>
                </div>
            </div>
        </div>
        <div class="col s12">
            <div class="card blue-grey darken-1">
                <div class="card-content white-text">
                    <span class="card-title" style="font-weight: bold; text-align: center;">Pemain Tim</span>
                </div>
            </div>
        </div>
        <div class="card" style="padding-left: 24px; padding-right: 24px; margin-top: 30px;">
            <table class="striped responsive-table">
                <thead>
                    <tr>
                        <th></th>
                        <th>Nama</th>
                        <th>Wewenang</th>
                        <th>Possisi</th>
                        <th>Negara</th>
                    </tr>
                </thead>
                <tbody id="standings">
                    ${playersTeam}
                </tbody>
            </table>
        </div>  
    `;
    const btnSave = document.getElementById("save");
    btnSave.onclick = function () {
        console.log("Tombol save telah diklik.");

        // gunakan toast yang ada di materialize untuk memberi tahu bahwa
        // artikel team berhasil disimpan
        M.toast({ html: `${team.name} ditambahkan ke halaman tersimpan` });
        saveForLater(team);
    };
};

const getSavedArticles = () => {
    getAll().then((articles) => {
        console.log(articles);
        // Menyusun komponen card artikel secara dinamis
        let articlesSavedTeam = "";
        articles.forEach((article) => {
            articlesSavedTeam += `
                <div class="col m12">
                    <div class="card horizontal">
                        <div class="card-image">
                            <img src="${article.crestUrl.replace(/^http:\/\//i, 'https://')}">
                        </div>
                        <div class="card-stacked">
                            <div class="card-content">
                                <p>Name : <a href="./article.html?id=${article.id}&saved=true">${article.name}</a></p>
                                <p>Short Name : ${article.shortName}</p>
                                <p>TLA : ${article.tla}</p>
                                <p>Address  : ${article.address}</p>
                                <p>Phone    : ${article.phone}</p>
                                <p>Club Colors : ${article.clubColors}</p>
                                <p>Venue : ${article.venue}</p>
                                <p>Email : ${article.email}</p>
                                <p>Website  : <a href="${article.website}">${article.website}</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
        // Sisipkan komponen card ke dalam elemen dengan id #body-content
        document.getElementById("Saved-Team").innerHTML = articlesSavedTeam;
    });
}

function getSavedArticleById() {
    getById(parseInt(idParam))
        .then(function (article) {
            console.log(article);
            const articleHTML = document.getElementById("team-detail");
            let playerTeamLogo = "";
            let playersTeam = "";
            playerTeamLogo += `
                <img src="${article.crestUrl.replace(/^http:\/\//i, 'https://')}" width="30px" alt="badge"/>
            `;

            article.squad.forEach(players => {
                playersTeam += `
                    <tr>
                        <td>${playerTeamLogo}</td>
                        <td>${players.name}</td>
                        <td>${players.role}</td>
                        <td>${players.position}</td>
                        <td>${players.nationality}</td>                
                    </tr>
                `;

            });
            articleHTML.innerHTML = `
                <div class="col s12 m12">
                    <h2 class="header" style="color: #3e977b; text-align: center;">${article.name}</h2>
                    <div class="card horizontal">
                        <div class="card-image">
                            <img src="${article.crestUrl.replace(/^http:\/\//i, 'https://')}">
                        </div>
                        <div class="card-stacked">
                            <div class="card-content">
                                <p>Short Name : ${article.shortName}</p>
                                <p>TLA : ${article.tla}</p>
                                <p>Address  : ${article.address}</p>
                                <p>Phone    : ${article.phone}</p>
                                <p>Club Colors : ${article.clubColors}</p>
                                <p>Venue : ${article.venue}</p>
                                <p>Email : ${article.email}</p>
                                <p>Website  : <a href="${article.website}">${article.website}</a></p>
                                <p></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col s12">
                    <div class="card blue-grey darken-1">
                        <div class="card-content white-text">
                            <span class="card-title" style="font-weight: bold; text-align: center;">Pemain Tim</span>
                        </div>
                    </div>
                </div>
                <div class="card" style="padding-left: 24px; padding-right: 24px; margin-top: 30px;">
                    <table class="striped responsive-table">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Nama</th>
                                <th>Wewenang</th>
                                <th>Possisi</th>
                                <th>Negara</th>
                            </tr>
                        </thead>
                        <tbody id="standings">
                            ${playersTeam}
                        </tbody>
                    </table>
                </div>  
            `;
            const btnDelete = document.getElementById("delete");
            btnDelete.onclick = function () {
                console.log("Tombol hapus telah diklik.");

                // gunakan toast yang ada di materialize untuk memberi tahu bahwa
                // artikel team berhasil dihapus
                M.toast({ html: `${article.name} telah terhapus` });
                deleteArticle(article);
            };
        })
}

