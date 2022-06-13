# Binary Beasts - OT Security Awareness Training: Frontend

## Link zum Backend
Die Anwendung verwendet einen Backend-Server, der sich durch das folgende Repository einrichten lässt:
https://github.com/BBeasts100/BinaryBeastsBackend.git

# Installation und Konfiguration

1. Git Repo klonen

### `git clone https://github.com/BBeasts100/BinaryBeastsFrontend.git`

2. Ins Repo navigieren

### `cd BinaryBeastsFrontend`

3. In den client Ordner navigieren

### `cd client`

4. Alle Module installieren

### `npm install`

5. Server starten

Im Root-Directory lässt sich dann server wie folgt hochfahren:
### `npm start`

# Limitations

1. Unsichere Login-Authentifikation:

Sobald man sich auf der Webseite eingeloggt hat, wird der Username im Local-Storage gespeichert. Anhand dieses Eintrags wird entschieden, ob man eingeloggt ist oder nicht, und es werden die individuellen Daten zu diesem Nutzer angezeigt. Daher können Nutzer anhand des Leaderboards die Usernamen von den anderen Nutzern herausfinden und sich anhand dessen als diese Nutzer einloggen, indem man mit den Developer-Tools den Local-Storage manipuliert.

2. Keine Optimierung für Safari

Benutzt man die Software im Safari-Browser, so wird man z.B. im Level "Social Engineering und Phishing" auf ein Problem stoßen: Die Ereignis-Bilder sind zu groß und überdecken die Karten und den Ereignis-Text. Dieses Problem tritt jedoch nur im Safari-Browser auf, auf den anderen bekannten Browsern existiert dieses Problem nicht
