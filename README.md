# piatelli

för att installera paket i alla mappar, kör:
npm run init 

För att starta client samt server, kör: 
npm start 

Vi har förberett med en adminanvändare så att man kan testa funktionalitetet att en admin behöver bli godkänd av en annan admin. 
email: admin@gmail.com
lösenord: hej

Kravlista: 

G-krav
* Det ska gå att registrera sig samt logga in på hemsidan som kund eller administratör - Uppfyllt kravet 
* Produktdatabasen ska vara kopplad mot molnet så att denna fungerar lika bra oavsett var i världen användaren befinner sig, samt vara fullt skalbar. - Uppfyllt kravet
* Produkters lagersaldo ska uppdateras automatiskt då en order läggs - Uppfyllt kravet, saldot kan aldrig gå under 0. 
* Kundens personliga uppgifter ska valideras, antingen vid utcheckning eller vid registrering av konto - Uppfyllt kravet, vi validerar vid registrering. 
* Besökare ska kunna välja ett av flera fraktsätt där fraktkostnaden automatiskt adderas till orderns totalpris - Uppfyllt kravet
* Om en kund besöker en URL som inte finns ska detta hanteras med en felhanterare - Uppfyllt
* Om en kund har produkter i sin varukorg ska dessa sparas lokalt hos användaren, så att de finns kvar nästa gång kunden besöker sidan - Uppfyllt kravet, vi sparar i local storage.
* Administratören ska kunna se en lista på alla genomföra beställningar - uppfyllt kravet
* Administratören ska kunna uppdatera lagersaldot för samtliga produkter - uppfyllt kravet, en admin kan uppdatera samtliga fält på en produkt.
* Alla sidor ska ha en responsiv layout - uppfyllt kravet 
* Arbetet ska implementeras med React på klientsidan och Express på serversidan - Uppfyllt kravet
* Alla lösenord måste krypteras innan de sparas i databasen - - Uppfyllt kravet, vi använder bcrypt paketet för kryptering

VG-krav 
* Inloggade administratörer ska kunna uppdatera, skapa samt ta bort produkter och produktkategorier - Uppfyllt kravet, detta går att genomföra i vårt admin-CMS
* Inloggade administratörer ska kunna redigera kategori för en produkt - Uppfyllt kravet, detta går att genomföra i vårt admin-CMS
* Serversidan har implementerat en global felhantering - Uppfyllt kravet, vi fångar upp alla fel i en ErrorHandler
* En administratör behöver ha godkänts av en tidigare administratör innan de kan logga in för första gången - Uppfyllt kravet, detta går att genomföra i vårt admin-CMS




