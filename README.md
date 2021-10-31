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

Gruppen har gjennomført en rekke tiltakt for å oppnå universell utforming. Vi oppsummerer i følgende punkt under:

- Perceivable - mulig å oppfatte
- Operable - mulig å betjene
- Understandable - forståelig
- Robust - robust

I tillegg har vi benyttet oss av chrome-utvidelsen "axe DevTools" for å enklere identifisere brudd på WCAG-retningslinjer og -anbefalinger.

### W3C WAI-ARIA - Accessible Rich Internet Applications

Gjennom applikasjonen har vi etterstrebet bruk av beskrivende element-typer. Dette gjør det lettere for eksempelvis en skjermleser å forstå innholde og strukturen på nettsiden.

### Perceivable - observerbar (mulig å oppfatte)

- Alle font-størrelser baserer seg på body-tagens font size. Dette gjør at forstørrelsesprogrammer som baserer seg på dette vil kunne fungere bra. I tillegg fungerer vanlig zoom i nettlesere som forventet.
- Ikke-tekstlige elementer, som bilder, er beskrevet med alt-tagger for å være mer tilgjengelige for skjermlesere.
- `aria-label` attributtet er benyttet i enkelte tilfeller for å ytterligere beskrive elementer som tabs etc.
- Vi har etterstrebet å bruke tilstrekkelig kontrast på tekst.

### Operable - anvendelig (mulig å betjene)

- Alle knapper og inputfelt har en naturlig flow ved bruk av tab-knappen på tastatur.
- Det er statiske sider som ikke endres før brukeren trykker på noe, altså bestemmer brukeren selv tempoet på informasjonen og interaksjonen.
- Siden er enkel å navigere med en sidebar, så fremt man er kjent med konseptet "hamburgermeny". Dette er mulig å anta da det brukes på flesteparten av webapplikasjoner og annet i dag.

### Understandable - forståelig

- Kontrast og relativ skriftstørrelse gjør innholdet forståelig og lestbart på ulike skjermstørrelser.
- Siden henter opp flere konsepter fra musikktjenester som Spotify, noe som samsvarer med innholdet og dermed øker sjansen for at dette gir mening for brukeren.

### Robust

Siden er testet i ulike nettlesere og bruker moderne teknologier for å være rustet mot fremtidige endringer.

## Tekniske valg

Vi valgte å gå for MERN-stacken. Dette innebærer MongoDB, Express, React og Node.js.

### MUI - tidligere Materials UI

Vi har brukt [MUI-biblioteket](https://mui.com/getting-started/usage/) som basis for alle generelle komponenter som f. eks. knapper og input-felt. I forrige prosjekt brukte vi [styled-components](https://styled-components.com/docs) i tillegg for ryddig styling av komponenter, men tilsvarende funksjonalitet er nå inkludert i MUI.

### GraphQL

For å unngå store resultatsett, er det benyttet pagination ved at man begrenser antall resultater som sendes, og at bruker kan be om neste side i datasettet. Det er benyttet `page` og `limit` for blaing og begrensing av datasettet. Her kunne man nok med fordel valgt å benytte `offset` i stedet for `page`, da `offset` er det som vanligvis benyttes i offset-basert pagination. Det ble benyttet `page` før vi hadde lest oss opp på best-practice og valgte vi valgte å ikke bruke tid på å endre det til `offset` da det fungerte.

For bildeopplasting er pakken [apollo-upload-client](https://www.npmjs.com/package/apollo-upload-client) brukt for å muliggjøre filopplasting via GraphQL fra klienten.

### MongoDB og Mongoose

For valg av database, kunne de aller fleste databaser gjort jobben med håndtering av data. Vi valgte å gå for MongoDB med Mongoose ettersom MongoDB er en del av MERN-stacken, samt at det finnes mye dokumentasjon rundt problematikk som kan oppstå. Underveis benyttet vi oss aktivt av dokumentasjonen til [MongoDB](https://docs.mongodb.com/) og [Mongoose](https://mongoosejs.com/docs/api.html). Mongoose ble benyttet da det tilbyr enkel sammenkobling av databasen og server, og forenkling av query.

Databasen er satt opp med tre collections, _songs_, _albums_ og _artists_. Disse er koblet sammen ved at en sang har en eller flere artister og et album, og et album har en eller flere artister. Her hadde det vært gunstig å benytte en database med fremmednøkkelsjekk når vi oppretter nye sanger. For å sikre at en sangs artister og album referer til en instans i databasen, sjekkes fremmednøkkel på serveren før de nye sangene settes inn i databasen.

For søk benyttes MongoDB sin [text-search](https://docs.mongodb.com/manual/text-search/). Det er lagt inn text-index på _sang-tittel_, _album-tittel_ og _artist-navn_, og ved søk i applikasjonen, utføres det er søk i alle disse collectionene. Resultatene slås deretter sammen slik at sanger som har _sang-tittel_, _album-tittel_ eller _artist-navn_ som søkt på returneres. Man trenger her ikke å ha fullt treff, og resultatet kan sorteres på beste match.

### Apollo Express Server

Serveren er bygget i [Express](https://expressjs.com/). For enkel integrering av GraphQL ble [Apollo Server](https://www.apollographql.com/docs/apollo-server/) med pakken [apollo-server-express](https://www.npmjs.com/package/apollo-server-express) benyttet.

### Tilstandshåndtering og -lagring

For håndtering av tilstand på søkesiden bruker vi query params. Dette er vanlig praksis på flere søkesider og muliggjør lagring og deling av søk/tilstand ved å kopiere url. Når man trykker på et filter eller skriver inn i søkefeltet legges det til et query parameter i url-en. Ved endring av url rerendres søkesiden og en ny graphql-spørring gjøres med parametre fra query parametrene.

Åpning og lukking av meny og top-baren håndteres med redux. I tillegg lagres en liste med alle kategoriene i redux ved første sideinnlasting. Dette begrenser antall spørringer som kreves mot server.

## Testing

Vi har laget en del forskjellige tester for å teste ulike deler av applikasjonen:

### Snapshot testing

Alle sidene i applikasjonen har en snapshottest. Her er det laget en egen TestProvider som er en wrapper som inkluderer alle de andre providerne som trengs for at sidene skal kunne kjøre. Dette inkluderer muligheter for å mocke routeren og GraphQL requests og responses. Snapshottestene henter da inn testdata gjennom mockene og sammenligner UI-et med det som er lagret i snapshottene for å sjekke om det har skjedd utilsiktede endringer.

### Enhetstesting av komponenter og custom hooks

Vi har også laget tester for flere av react-komponentene og custom hookene vi bruker i applikasjonen. Komponenttestene sjekker at de responderer korrekt til museklikk og annen interaksjon, samt at de rendres som forventet basert på ulike props og queryparametre. For å teste hookene har vi brukt et eget [bibliotek for testing av hooks](https://www.npmjs.com/package/@testing-library/react-hooks). Hookene sender forespørsler til serveren og leser av parametre fra URL-en, derfor har vi også her måttet mocke GraphQL forespørslene og routeren for å kunne sjekke at hookene fungerer og returnerer de forventede verdiene.

### Enhetstesting av validering av input

I opprettelse av nye sanger, finnes det felt som skal være på bestemte format. Det er laget validatorer-funksjoner som sjekker om input er på riktig format før data sendes til backend. For å være sikker på at validatoren fungerer korrekt for forskjellig input, er funksjonene testet for ulike tilfeller for å fange opp edge caser.

### End-2-end testing

For end-2-end testing har vi brukt [Cypress](https://www.cypress.io/). Disse testene sjekker at hele teknologistacken fungerer som den skal, helt fra UI til database. Vi har skrevet tester som interagerer med flere av sidene i webapplikasjonen og sjekker at forespørslene som blir sendt og dataene som blir mottatt er som forventet og at UI-et gjenspeiler disse dataene.

### Testing av backend

I backenden har vi laget tester som sjekker håndteringen av HTTP forespørsler med GraphQL queries. Vi sender forespørslene med _request_ fra [SuperTest](https://www.npmjs.com/package/supertest) og mocker resolverne til Apollo Serveren for å sjekke at de blir kalt med de forventede verdiene. Med disse mockene unngår vi også å skrive til databasen når vi kjører testene.

## Git

Vi har dekomponert prosjektet i issues og jobbet i separate brancher for hvert issue. Når en issue er ferdig har vi rebaset den på develop-branchen (master) og laget en merge request som et annet gruppemedlem må approve før det kan merges inn i develop.
