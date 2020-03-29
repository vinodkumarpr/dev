const url = require('url');

var GIT_API_HOST = 'api.github.com';
var GIT_USER = "/user";

class GitClient {
    constructor(token, callback) {
        this.token = token;
        this.initCallback = callback;
        this.getRequest(GIT_API_HOST, GIT_USER, (data) => {
            let jsonText = data.toString('utf-8');
            this.user = JSON.parse(jsonText);
            //console.log(jsonText);
            this.initCallback();
        });
    }

    getRepos(callback) {
        if (this.repos){
            callback();
            return;
        }
        
        let file_url = url.parse(this.user["repos_url"]);
        this.getRequest(file_url.hostname, file_url.path, (data) => {
            let jsonText = data.toString('utf-8');
            this.repos = JSON.parse(jsonText);
            callback();
        });
    }

    getFile(repoName, branch, path, callback) {
        this.getRepos(()=> {
            let repo = this.getRepo(repoName);
            let contentUrl = repo["contents_url"].replace('{+path}', path);
            if (!(branch == null && branch == '')){
                contentUrl += '?ref=' + branch;
            }
            let file_url = url.parse(contentUrl);
            this.getRequest(file_url.hostname, file_url.path, (data) => {
                let jsonText = data.toString('utf-8');
                let content = JSON.parse(jsonText);
                console.log(content);
                callback(content);
            });
        });
    }
    
    updateFile(repoName, branch, path, content, message){
        this.getRepos(() => {
            this.getFile(repoName, branch, path, (file)=>{
                let jsonObj = {
                    "message": message,
                    "content": Buffer.from(content).toString('base64'),
                    "sha": file["sha"]
                };
                if (branch){
                    jsonObj['branch'] = branch;
                }
                let repo = this.getRepo(repoName);
                let contentUrl = repo["contents_url"].replace('{+path}', path);
                if (!(branch == null && branch == '')) {
                    contentUrl += '?ref=' + branch;
                }
                let file_url = url.parse(contentUrl);
                this.putRequest(file_url.hostname, file_url.path, jsonObj, (data) => {
                    let text = data.toString('utf-8');
                    console.log(text);
                });    
            });
        });
    }

    getRepo(repoName){
        for (let i = 0; i < this.repos.length; i++){
            if (this.repos[i].name == repoName){
                return this.repos[i];
            }
        }
        return null;
    }

    getHash(text){
        var crypto = require('crypto');
        let hash = crypto.createHash('sha1');
        let hashUpdate = hash.update(text, 'utf-8');
        return hashUpdate.digest('hex');
    }

    getRequest(hostname, path, callback) {
        const https = require('https')

        let auth = 'Basic ' + Buffer.from(this.token).toString('base64');
        const options = {
            hostname: hostname,
            port: 443,
            path: path,
            method: 'GET',
            headers: {
                'Authorization': auth,
                'User-Agent': 'git-user-app'
            }
        }

        const req = https.request(options, (res) => {
            console.log(`statusCode: ${res.statusCode}`)
            let data = new Buffer(0);
            res.on('data', (d) => {
                data = Buffer.concat([data, d]);
            })
            res.on("end", () => {
                if (callback) {
                    callback(data);
                }
            });
        })

        req.on('error', (error) => {
            console.error(error)
        })

        req.end()
    }

    putRequest(hostname, path, json, callback) {
        const https = require('https')

        let auth = 'Basic ' + Buffer.from(this.token).toString('base64');
        const options = {
            hostname: hostname,
            port: 443,
            path: path,
            method: 'PUT',
            headers: {
                'Authorization': auth,
                'User-Agent': 'git-user-app',
                "Content-Type" : "application/json"
            }
        }

        const req = https.request(options, (res) => {
            console.log(`statusCode: ${res.statusCode}`)
            let data = new Buffer(0);
            res.on('data', (d) => {
                data = Buffer.concat([data, d]);
            })
            res.on("end", () => {
                if (callback) {
                    callback(data);
                }
            });
        })

        req.on('error', (error) => {
            console.error(error)
        })

        req.write(JSON.stringify(json));

        req.end()
    }
}

const client = new GitClient(GIT_TOKEN, () => {
    client.getFile("dev", "working", "emlr/mkr/make_jsons.js", (data)=>{
        let buff = new Buffer(data.content, 'base64');
        let text = buff.toString('ascii');
        console.log(text);
    });
    //client.updateFile("dev", "working", "emlr/store/recipients.csv", 'This is updated', "Updated using rest api");
});
