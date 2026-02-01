Αυτή η εφαρμογή αποτελεί ένα RESTful API για τη διαχείριση video games και χρηστών, υλοποιημένο με Node.js, Express και MongoDB.

Περιγραφή

Το API επιτρέπει:
	•	Διαχείριση video games (δημιουργία, ανάκτηση, ενημέρωση, διαγραφή)
	•	Εγγραφή και σύνδεση χρηστών
	•	Πρόσβαση σε προστατευμένα endpoints μέσω JWT αυθεντικοποίησης
	•	Φιλτράρισμα, ταξινόμηση και συγκεντρωτικά αποτελέσματα (π.χ. κορυφαία παιχνίδια, παιχνίδια ανά κατηγορία)

Η εφαρμογή ακολουθεί αρχιτεκτονική MVC και τις βασικές αρχές του REST.

Τεχνολογίες
	•	Node.js
	•	Express.js
	•	MongoDB (MongoDB Atlas)
	•	Mongoose
	•	JSON Web Tokens (JWT)

  Δομή φακέλων

  Restful_API/
  
── controllers

── models

── routes

── middlewares

── utils

── data

── app.js

── package.json

Εκτέλεση εφαρμογής

	1.	Εγκατάσταση εξαρτήσεων:  npm install
	
    2.	Δημιουργία αρχείου .env με τις απαραίτητες μεταβλητές (π.χ. DATABASE, JWT_SECRET)
     
	3.	Εκκίνηση server: node app.js


  Σημείωση

Ο φάκελος node_modules και το αρχείο .env δεν περιλαμβάνονται στο repository για λόγους ασφάλειας 
