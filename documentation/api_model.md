# Modellering av REST-API för elsparkcyckelsystem

Detta är en modell för det REST-API som ska användas av High5-systemet. API:t används för all kommunikation
mellan servern och systemets olika användargränssnitt, samt mellan servern och alla enskilda cyklars interna system.
Delar av API:t kommer också att tillgängliggöras för tredjeparts-applikationer.

All interaktion med API:t kräver autentisering. För användare (kunder) innebär det att man skapar och loggar
in med ett användarkonto. För admin innebär det inloggning med ett adminkonto. 

## Allmänt

Från API:t ska man kunna hämta all aktuell information. Det ska även gå
att interagera med systemet genom att exempelvis starta/avsluta resor, eller att skicka en signal till en cykel för att 
stoppa den. 

Information som ska gå att hämta:

* Cyklars status, fart, position osv.
* Registrede kunder och deras information
* Loggade resor
* Kartzoner, position för laddstationer, osv.

Övra funktioner som ska stödjas av API:t är listade nedan, kategoriserade enligt det berörda elementet/applikationen.

## Elsparkcyklar

* skicka in information från cykeln
* skicka varning om lågt batteri
* spara logg efter avslutad resa
* stoppa cykeln från att köra

## Kunder

* Skapa nytt konto
* Logga in som kund
* Fylla på pengar
* Registrera månatlig betalning
* Hyra cykel/starta resa
* Lämna tillbaka cykel/avsluta resa

## Admin

* Logga in som admin
* Stoppa specifik cykel
* Ta in specifik cykel för laddning eller underhåll
