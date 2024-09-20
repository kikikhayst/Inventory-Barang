const dbPromised = idb.open("favorite-teams", 1, (upgradeDb) => {
    if (!upgradeDb.objectStoreNames.contains('articles')) {
        const articlesObjectStore = upgradeDb.createObjectStore("articles", {
            keyPath: "id",
            autoIncrement: false
        });
        articlesObjectStore.createIndex("post_team", "name", { unique: false });
    }
});

const saveForLater = (data) => {
    dbPromised
        .then((db) => {
            // transacation pembungkus untuk menjaga integritas data
            const tx = db.transaction('articles', 'readwrite');
            const store = tx.objectStore('articles')
            console.log(data);
            store.put(data);
            return tx.complete;
        })
        .then(() => {
            console.log("Artikel Tim Favorit berhasil disimpan.");
        });
}

const getAll = () => {
    return new Promise((resolve, reject) => {
        dbPromised
            .then((db) => {
                const tx = db.transaction("articles", "readonly");
                const store = tx.objectStore("articles");
                return store.getAll();
            })
            .then((articles) => {
                resolve(articles);
            });
    });
}

function getById(id) {
    return new Promise(function (resolve, reject) {
        dbPromised
            .then(function (db) {
                var tx = db.transaction("articles", "readonly");
                var store = tx.objectStore("articles");
                return store.get(parseInt(id));
            })
            .then(function (article) {
                resolve(article);
            });
    });
}

const deleteArticle = (data) => {
    const urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get("id");
    dbPromised
        .then((db) => {
            const tx = db.transaction('articles', 'readwrite');
            const store = tx.objectStore('articles');
            console.log(data);
            store.delete(parseInt(idParam));
            return tx.complete;
        })
        .then(() => {
            console.log("Artikel Tim Favorit telah dihapus.");
        });
}