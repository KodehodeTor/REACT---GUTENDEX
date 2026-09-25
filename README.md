NOTES FOR TOR:
Context structure:

Implementer TanStack Query og Axios.

Krav til innhold og funksjonalitet

1. Søke etter bøker
   Applikasjonen skal ha en header med et søkefelt hvor brukere kan søke etter spesifikke boktitler.
   Søkeresultatene skal vises som en liste, og du skal implementere paginering ved hjelp av API-ets innebygde funksjonalitet for å bla gjennom resultatene.
2. Kategorimeny
   Applikasjonen skal ha en meny med lenker til følgende bokkategorier:

Fiction
Mystery
Thriller
Romance
Fantasy
Morality
Society
Power
Justice
Adventure
Tragedy
War
Philosophy
Når brukeren klikker på en kategori, skal applikasjonen gjøre et API-kall til /books?topic=kategori og vise bøkene som tilhører denne kategorien. Menyen kan gjerne plasseres i headeren for enkel tilgang.

3. Favorittbøker
   Applikasjonen skal ha en funksjon for å lagre favorittbøker. Dette må være tilgjengelig via en egen lenke i menyen/headeren.
   Favorittbøker skal lagres i localStorage slik at de forblir tilgjengelige selv om siden oppdateres.
   Når brukeren klikker på "Favoritter", skal en liste over favorittbøkene vises.
4. Bokdetaljer
   Ved å klikke på en bok fra søkeresultatene eller kategorioversikten, skal brukeren tas til en detaljside som viser informasjon om den valgte boken.
   Informasjonen på detaljsiden skal inkludere:
   Boktittel
   Coverbilde
   Forfatter
   Antall nedlastninger
   Kategori
   Språk
   Lenke til boka i digitalt format
   En knapp for "Legg til i Favoritter"

Tekniske krav
Routing

Bruk createBrowserRouter fra react-router-dom for å sette opp routing i applikasjonen.
Kategorilinker og individuelle bøker skal bruke dynamiske lenker.
Header/meny skal alltid være synlig, uansett hvilken side brukeren er på.
State-håndtering

Bruk Reacts state til å håndtere applikasjonsdata, som søkeresultater, kategoribøker og favoritter.
Implementer visning av loading-status og feilmeldinger dersom API-kall tar tid eller mislykkes.
Styling

Du kan bruke hvilken som helst tilnærming til CSS (global CSS, CSS-moduler, eller tredjeparts stylingbiblioteker som Styled Components eller Material-UI).
Applikasjonen skal være responsiv, og tilpasse seg ulike skjermstørrelser.
API-dokumentasjon

Bruk dokumentasjonen til Gutendex APILinks to an external site. for å forstå hvordan du henter data.
Tips
Begynn med å sette opp grunnstrukturen for prosjektet, inkludert routing og komponenter.
Del opp oppgaven i mindre deler, som for eksempel søkefunksjonalitet, kategorilister og favoritter.
Test underveis for å sikre at hver funksjonalitet fungerer før du går videre.
Hvis du står fast, ta kontakt med en medelev eller veileder.
