---
order: 16
slug: vertraging-livestream
cluster: techniek
keyword: livestream vertraging
title: Livestream vertraging: waarom en hoeveel?
description: Livestream vertraging uitgelegd: waar de seconden achterstand vandaan komen, wat YouTube-latency doet en wanneer je die vertraging moet verkorten.
h1: Livestream vertraging: waarom loopt je stream achter?
summary: Elke livestream loopt achter op de werkelijkheid. Bij YouTube is dat met de normale instelling vaak 15 tot 30 seconden, met lage of ultralage latency een paar seconden. De vertraging ontstaat in de encoder, onderweg en vooral in de buffer van het platform en de speler. Voor de meeste events is dat geen probleem. Het telt pas bij chatinteractie, live commentaar op afstand en scores of weddenschappen.
cta: contact
related: hoeveel-internet-voor-livestream, wat-doet-een-livestreamregisseur, interactie-hybride-event
---
Wie voor het eerst een livestream bekijkt terwijl hij zelf op het event staat, schrikt vaak. Het doelpunt valt, het publiek juicht, en pas een halve minuut later zie je het op je telefoon. Die livestream vertraging heet latency. Ze is normaal, ze zit in elke stream en je kunt haar voor een groot deel zelf kiezen. Hieronder lees je waar die vandaan komt en wanneer het uitmaakt.

## Waarom heeft een livestream vertraging?
Een livestream loopt achter omdat het beeld onderweg een paar keer wordt verwerkt en tijdelijk opgeslagen. Elke stap kost tijd, en die tijd telt op. Het grootste deel zit niet bij de camera of de regie, maar bij het platform en de speler van de kijker.

De keten ziet er grofweg zo uit:

1. **Camera en regie.** De camera's gaan naar een regietafel, waar het beeld wordt gemixt en overlays erbij komen. Dat kost een fractie van een seconde.
2. **Encoder.** De encoder comprimeert het beeld tot een stream die over internet kan. Hoe efficiënter de compressie, hoe meer beelden de encoder vooruit moet kijken. Vuistregel: een paar honderd milliseconden tot een à twee seconden.
3. **Upload.** De stream gaat via de internetverbinding op locatie naar het platform. Bij een stabiele lijn is dat kort. Bij een wankele verbinding of 4G/5G-bonding komt er een buffer bij om haperingen op te vangen.
4. **Platform.** YouTube, Vimeo of een ander platform zet je stream om naar meerdere kwaliteiten (1080p, 720p, 480p) en knipt hem in stukjes van een paar seconden. Die stukjes worden naar servers over de hele wereld gestuurd.
5. **Speler van de kijker.** De speler wacht tot hij een paar stukjes binnen heeft voordat hij begint. Zo kan hij doorspelen als het internet van de kijker even hapert. Dit is meestal de grootste bron van vertraging.

## Hoeveel vertraging is normaal?
Bij een standaardinstelling op YouTube is 15 tot 30 seconden vertraging normaal. Met de instelling voor lage latency kom je vaak rond de 5 tot 10 seconden uit, met ultralage latency rond de 2 tot 5 seconden. Dat zijn vuistregels. De echte waarde hangt af van je verbinding, de encoder en het apparaat van de kijker.

Twee kijkers die naar dezelfde stream kijken, zien ook niet precies hetzelfde moment. De een zit op glasvezel, de ander op mobiel in de trein. De speler van de tweede buffert meer en loopt verder achter.

## YouTube-latency: normaal, laag of ultralaag
YouTube laat je per uitzending kiezen hoeveel vertraging je accepteert. Je stelt dat in YouTube Studio in bij de instellingen van de stream. Elke stand heeft een prijs.

| Instelling | Vertraging (vuistregel) | Voordeel | Nadeel |
|---|---|---|---|
| Normaal | 15 tot 30 seconden | Beste beeldkwaliteit, minste haperingen bij kijkers | Chat loopt duidelijk achter op het beeld |
| Laag | 5 tot 10 seconden | Goed compromis voor interactie | Iets meer kans op bufferen bij kijkers met matig internet |
| Ultralaag | 2 tot 5 seconden | Bijna live gesprek met de chat mogelijk | Meer haperingen, geen 1440p of 4K |

De reden voor die nadelen is simpel. Hoe kleiner de buffer, hoe minder ruimte de speler heeft om een hapering op te vangen. Bij ultralage latency merkt een kijker met wisselend wifi dat sneller. Bij een sportevent waar veel mensen op hun telefoon of op de tv kijken, weegt dat zwaar.

Ons standaardadvies: kies normaal, tenzij je een concrete reden hebt om korter te gaan. Die redenen staan hieronder.

## Wanneer maakt livestream vertraging uit?
Latency doet er alleen toe als er iets gebeurt tussen de kijker en het event. Kijkt je publiek alleen, dan merkt niemand of de stream 5 of 25 seconden achterloopt. Er zijn vier situaties waarin het wel telt.

### Chatinteractie
Stelt de presentator een vraag aan de chat, dan zien kijkers die vraag pas na de vertraging. Hun antwoord komt nog later binnen. Bij normale latency zit daar al snel een minuut tussen, en dan is het gesprek alweer verder. Wil je echt met de chat praten, bijvoorbeeld bij een Q&A of een poll, dan helpt lage latency. Meer daarover lees je in het artikel over [interactie bij een hybride event](/kennisbank/interactie-hybride-event).

### Commentaar of gasten op afstand
Een commentator die thuis of in een andere ruimte de stream volgt en daarop praat, loopt achter op wat er echt gebeurt. Dat los je niet op met een latency-instelling. Commentatoren horen een directe feed vanuit de regie te krijgen, niet de publieke stream. Zet het commentaar daarom zo dicht mogelijk bij de regie, liefst met een eigen ruimte of studio ter plekke.

### Scores en uitslagen
Toon je live scores in beeld, dan moet die score bij het beeld passen. Komt de score uit een systeem dat direct online staat, dan kan een kijker op de uitslagenpagina al zien wie gewonnen heeft terwijl de run in de stream nog bezig is. Dat is voor de meeste sporten een kleine ergernis. De oplossing is dat de score in de regie wordt ingevoegd, zodat beeld en score samen vertraagd worden. Hoe dat werkt, staat in [replay en live scores](/kennisbank/replay-en-live-scores).

### Wedden en prijsvragen
Bij alles waar geld of een prijs mee gemoeid is, is vertraging een risico. Iemand op locatie weet de uitkomst eerder dan een kijker thuis. Voor een gewone club of bond speelt dit zelden, maar organiseer je een prijsvraag tijdens de stream, sluit die dan op basis van het beeld in de stream en niet op de klok op locatie.

## Wanneer vertraging juist handig is
Een beetje vertraging is niet alleen een nadeel. Het geeft de regie ruimte. Bij normale latency merkt een kijker niets van een korte hapering in de upload, omdat de buffer die opvangt. Hoe groter de buffer, hoe stabieler het beeld bij de kijker thuis. Op locaties met wisselend internet, zoals buiten of op het water, is dat vaak belangrijker dan een paar seconden winst. Lees ook [hoeveel internet je nodig hebt voor een livestream](/kennisbank/hoeveel-internet-voor-livestream).

## Zo verklein je de vertraging
Wil je de achterstand korter maken, dan zijn dit de stappen die het meeste effect hebben, in volgorde:

1. Kies in YouTube Studio voor lage of ultralage latency.
2. Zorg voor een stabiele, vaste internetverbinding op locatie. Dan hoeft er minder buffer in de upload.
3. Stel de encoder in op een vaste bitrate die ruim binnen je uploadsnelheid blijft.
4. Test vooraf met iemand die op een telefoon meekijkt en een klok of timer in beeld houdt. Zo meet je de echte vertraging.

Dat laatste past goed op de testdag die we vooraf houden. De hele keten draait dan al: internet, regie en stream. Dan weet je vooraf hoeveel seconden je stream achterloopt en of dat past bij wat je wilt. Wat de regie verder doet, lees je in [wat doet een livestreamregisseur](/kennisbank/wat-doet-een-livestreamregisseur).

## Veelgestelde vragen
### Is 20 seconden vertraging bij een livestream normaal?
Ja. Bij de standaardinstelling van YouTube is 15 tot 30 seconden gebruikelijk. Wil je korter, kies dan lage of ultralage latency.

### Kan een livestream helemaal zonder vertraging?
Nee. Encoderen, versturen en bufferen kosten altijd tijd. Met ultralage latency kom je op een paar seconden, korter lukt via een gewoon streamplatform nauwelijks.

### Waarom loopt mijn stream bij de ene kijker verder achter dan bij de andere?
De speler van elke kijker buffert zelf. Wie op traag of wisselend internet kijkt, krijgt een grotere buffer en loopt dus verder achter.

### Welke latency-instelling raden jullie aan voor een sportevent?
Normaal, tenzij je veel met de chat wilt doen. Dan geeft lage latency een goed evenwicht tussen snelheid en stabiel beeld.
