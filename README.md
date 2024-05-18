# Just another Bimaru

## Deployment

- visit [Pages Demo](https://dafahrni.github.io/just-another-bimaru/)


## Setup

- install [node.js](https://nodejs.org/en/download)
- execute `npm install`


## Available Build Commands

- `npm run clean`
- `npm run build`
- `npm run release`


## Launch Scripts

- `npm test`
- `npm start`


## Debugging in VS Code

- go to marketplace and install *Live Server* extension
- right mouse click on `index.html` to open with *Live Server*

---

# Appendix

### Class Diagram

This creates only an extract of some classes.

``` PlantUML
@startuml

title Just another Bimaru - Code

class FieldFactory {
  +parse(text): Field
}

class Field {
+ checkForWinner()
}

class Field {

}

class GameModel {
+ changeCell()
+ checkForWinner()
}

class GameApi {
+ changeCell()
+ checkForWinner()
}

FieldBase <|-- Field
FieldFactory - Field
Field -- Game
Game -- GameModel
GameApi - GameModel

@enduml
```
