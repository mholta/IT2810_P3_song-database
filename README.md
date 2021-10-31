# Sangdatabase

Dette prosjektet inneholder en singlepage-applikasjon for søk og visning av sanger som ligger i en database. Applikasjonen er utviklet i React og Express med TypeScript, og har MongoDB som database. Vi bruker GraphQL for å hente og sende data mellom frontend og backend, og har brukt Cypress til å lage end-2-end tester.

## Beskrivelse av applikasjonen

Når man bruker webapplikasjonen kan man til enhver tid søke etter sanger ved å skrive i tekstfeltet øverst på siden. Brukeren får også muligheten til å filtrere på tema og sortere sangene på tittel, artistnavn og utgivelsesdato. I utgangspunktet blir bare et begrenset antall sanger hentet om gangen, men flere blir lastet inn når man blar nedover på siden. Klikker man på en sang får man opp mer informasjon om sangen, som f. eks. bidragsytere, toneart og linker til hvor man kan høre på sangen. Trykker man på et tema eller navn vil man få opp et søk på sanger som har samme tema, eller sanger personen har jobbet på.

## Arkitektur og valg

Under er et diagram av de viktigste mappene i arkitekturen vår:

```
backend
└───src
    ├───models
    │   └───resolvers
    └───tests

react-client
├───cypress
├───public
└───src
    ├───animations
    ├───api
    │   └───testData
    ├───components
    │   ├───elements
    │   ├───layout
    │   ├───lists
    │   ├───SearchFilter
    │   └───SearchResults
    ├───hooks
    ├───pages
    │   ├───ContributorPage
    │   ├───HomePage
    │   ├───NotFoundPage
    │   ├───SongPage
    │   ├───SongsPage
    │   └───SubmitSong
    ├───store
    │   ├───filter
    │   └───layout
    ├───styles
    └───utils
```

## Universell utforming

## Tekniske valg

Vi valgte å gå for MERN-stacken. Dette innebærer MongoDB, Express, React og Node.js. TODO: Skriv mer her

### GraphQL

### MongoDB og Mongoose

For valg av database, kunne de aller fleste databaser gjort jobben med håndtering av data. Vi valgte å gå for MongoDB med Mongoose ettersom MongoDB er en del av MERN-stacken, samt at det finnes mye dokumentasjon rundt problematikk som kan oppstå. Underveis benyttet vi oss aktivt av dokumentasjonen til [MongoDB](https://docs.mongodb.com/) og [Mongoose](https://mongoosejs.com/docs/api.html). Mongoose ble benyttet da det tilbyr enkel sammenkobling av databasen og server, og forenkling av query.

Databasen er satt opp med tre collections, _songs_, _albums_ og _artists_. Disse er koblet sammen ved at en sang har en eller flere artister og et album, og et album har en eller flere artister. Her hadde det vært gunstig å benytte en database med fremmednøkkelsjekk når vi oppretter nye sanger. For å bevare sikre at en sangs artister og album referer til en instans i databasen, sjekkes fremmednøkkel på serveren før de nye sangene settes inn i databasen.

### Apollo Express Server

## Testing

Vi har laget en del forskjellige tester for å teste ulike deler av applikasjonen:

### Snapshot testing

Alle sidene i applikasjonen har en snapshottest. Her er det laget en egen TestProvider som er en wrapper som inkluderer alle de andre providerne som trengs for at sidene skal kunne kjøre. Dette inkluderer muligheter for å mocke routeren og GraphQL requests og responses. Snapshottestene henter da inn testdata gjennom mockene og sammenligner UI-et med det som er lagret i snapshottene for å sjekke om det har skjedd utilsiktede endringer.

### Enhetstesting av custom hooks

Vi har også laget tester for noen av de custom hookene vi bruker i applikasjonen. For å teste disse har vi brukt et eget [bibliotek for testing av hooks](https://www.npmjs.com/package/@testing-library/react-hooks). Hookene sender forespørsler til serveren og leser av parametre fra URL-en, derfor har vi også her måttet mocke GraphQL forespørslene og routeren for å kunne sjekke at hookene fungerer og returnerer de forventede verdiene.

### Enhetstesting av validering av input

I opprettelse av nye sanger, finnes det felt som skal være på bestemte format. Det er laget validatorer-funksjoner som sjekker om input er på riktig format før data sendes til backend. For å være sikker på at validatoren fungerer korrekt for forskjellig input, er funksjonene testet for ulike tilfeller for å fange opp edge caser.

### End-2-end testing

For end-2-end testing har vi brukt [Cypress](https://www.cypress.io/). Disse testene sjekker at hele teknologistacken fungerer som den skal, helt fra UI til database. Vi har skrevet tester som interagerer med flere av sidene i webapplikasjonen og sjekker at forespørslene som blir sendt og dataene som blir mottatt er som forventet og at UI-et gjenspeiler disse dataene.

### Testing av backend

I backenden har vi laget tester som sjekker håndteringen av HTTP forespørsler med GraphQL queries. Vi sender forespørslene med _request_ fra [SuperTest](https://www.npmjs.com/package/supertest) og mocker resolverne til Apollo Serveren for å sjekke at de blir kalt med de forventede verdiene. Med disse mockene unngår vi også å skrive til databasen når vi kjører testene.
