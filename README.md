Příprava aplikace:
- instalovat NodeJS - https://nodejs.org/en/
- pokud není nainstalován lokálně grunt, CMD: "npm install -g grunt-cli"
- pokud není nainstalován bower, CMD: "npm install -g bower"
- CMD: "npm install" (instaluje závislosti z package.json)
- složka www/ CMD: "bower install" (instaluje bower.json)

Vývoj aplikace:
- CMD: "grunt watch" (sleduje změny stylů a skriptů)

//todo Deployment aplikace:
- připojí se na server, promaže temp/ a log/, a nahraje/promaže soubory 
//todo - devel:  _deployment/deploy-devel.cmd 
//todo - master: _deployment/deploy-master.cmd (nutné zadání hesla)

EditorConfig:
- jednotné nastavení editoru  