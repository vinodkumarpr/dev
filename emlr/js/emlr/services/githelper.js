var GIT_API_USER_URL = 'https://api.github.com/user';

class GitClient {
    constructor($http, token, callback) {
        this.token = token;
        this.initCallback = callback;
        this.http = $http;
        this.getRequest(GIT_API_USER_URL, (err, data) => {
            this.user = data;
            //console.log(jsonText);
            this.initCallback();
        });
    }

    getRepos(callback) {
        if (this.repos) {
            callback();
            return;
        }

        this.getRequest(this.user["repos_url"], (err, data) => {        
            this.repos = data;
            callback(err);
        });
    }

    getFile(repoName, branch, path, callback) {
        this.getRepos(() => {
            let repo = this.getRepo(repoName);
            let contentUrl = repo["contents_url"].replace('{+path}', path);
            if (!(branch == null && branch == '')) {
                contentUrl += '?ref=' + branch;
            }
            this.getRequest(contentUrl, (err, data) => {
                let file = data;
                console.log(file);
                callback(file);
            });
        });
    }

    updateFile(repoName, branch, path, content, message, callback) {
        this.getRepos(() => {
            this.getFile(repoName, branch, path, (file) => {
                let update = {
                    "message": message,
                    "content": btoa(content),
                    "sha": file["sha"]
                };
                if (branch) {
                    update['branch'] = branch;
                }
                let repo = this.getRepo(repoName);
                let contentUrl = repo["contents_url"].replace('{+path}', path);
                if (!(branch == null && branch == '')) {
                    contentUrl += '?ref=' + branch;
                }
                this.putRequest(contentUrl, update, (err, data) => {
                    console.log(data);
                    callback(data);
                });
            });
        });
    }

    getRepo(repoName) {
        for (let i = 0; i < this.repos.length; i++) {
            if (this.repos[i].name == repoName) {
                return this.repos[i];
            }
        }
        return null;
    }

    getRequest(url, callback) {
        let auth = 'Basic ' + btoa(this.token);

        var req = {
            method: 'GET',
            url: url,
            headers: {
              'Authorization' : auth
            }
           }

        this.http(req).then((response) => {
            if (callback) {
                callback(0, response.data);
            }
        }, (response) => {
            callback(1, response.data);
        });
    }


    putRequest(url, data, callback) {
        let auth = 'Basic ' + btoa(this.token);

        var req = {
            method: 'PUT',
            url: url,
            headers: {
              'Authorization' : auth,
              "Content-Type": "application/json" 
            },
            data : JSON.stringify(data)
           }

        this.http(req).then((response) => {
            if (callback) {
                callback(0, response.data);
            }
        }, (response) => {
            callback(1, response.data);
        });
    }
}

// const client = new GitClient(GIT_TOKEN, () => {
//     client.getFile("dev", "working", "emlr/mkr/make_jsons.js", (data)=>{
//         let buff = new Buffer(data.content, 'base64');
//         let text = buff.toString('ascii');
//         console.log(text);
//     });
//     //client.updateFile("dev", "working", "emlr/store/recipients.csv", 'This is updated', "Updated using rest api");
// });
