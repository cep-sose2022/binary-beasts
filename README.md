# Binary Beasts - OT Security Awareness Training: Backend

# Installation und Konfiguration

1. Git Repo klonen

### `git clone https://github.com/BBeasts100/BinaryBeastsBackend.git`

2. Ins Repo navigieren

### `cd BinaryBeastsBackend`

3. Alle Module installieren

### `npm install`

4. Im Directory 'server' eine .env Datei mit der Datenbankverbindung anlegen

### `cd server`
### `touch .env`
### `nano .env`

In dieser Datei dann die Zugangsdaten für die MongoDB ablegen
Alternativ bei einem Hosting-Service diese Zugangsdaten als Environmentvariable setzen

5. Server starten

Im Root-Directory lässt sich dann server wie folgt hochfahren:
### `npm start`
