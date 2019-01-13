// git push   instead of git push origin master
// git push -u origin master    only do this once (when the first time you push the project to github)
// git push heroku master
// git log    display all commits done in respository
// git status
// git reset HEAD .   change files from the tracked stage to untracked
// git checkout -- .   will cancel all file changes before git add . (process to tracked)
// git commit -m ''
// git init
// git add .
// git config
// git remote -v
// rm -rf .git    command to delete git repository
// git remote remove origin // delete the remote origin repo
// git commit -a -m '' or git commit -am ''  command to add files and commit both of them at the same time. (Note: does not tracking a new file!)


// steps to deploy to heroku
// creat heroku app
    // heroku create
// add build pack
    //heroku buildpacks:set https://github.com/AdmitHub/meteor-buildpack-horse.git
// set the node version
    // "engines": {"node": "nodeversionhere"}
// add mongolab add-on
    // add this from the heroku ui OR heroku addons:create mongolab:sandbox
// set ROOT_URL
    // remove the last "/" from the root url ex: heroku config:set ROOT_URL="https://short-link-dennis-juanito.herokuapp.com" change the root url depends on your project
// Push the project to the heroku respository
    // git push heroku master

// open the application
    // heroku open