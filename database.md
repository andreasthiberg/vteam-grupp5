# Databas
Vi skall utveckla en databas för uthyrning av elsparkcyklar. I databasen lagras alla information som behövs för systemets processer. Det handlar exempelvis om information om alla aktuella elsparkcyklar, om kunder, och om kartor och zoner. Förmodligen är det bäst att använda sig av ett relationellt databassystem.

## Cyklar
Cyklarna skall presenteras tillsammans med information om deras 
- id,
- position,
- status (tillgänglig, uthyrd, laddas, service),
- batterinivå.

## Kunder
Kunderna skall presenteras tillsammans med deras
- id,
- namn/email,
- saldo,
- historik.

## Historik
I historiken ska det finnas detaljer om kundens gamla resor
- cykelns id,
- kundens id,
- starttid,
- sluttid,
- startposition,
- slutposition,
- resans pris


## Relationer i databasen
Cykel -> kund: cykeln är uthyrd av en kund
Cykel -> laddstation: cykeln finns på en laddstation
Cykel -> parkeringzon: cykeln finns på en parkeringszon
