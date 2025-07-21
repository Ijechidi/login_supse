# Configuration des variables d'environnement pour l'envoi d'e-mails (SMTP)

Ajoutez les variables suivantes dans votre fichier `.env` à la racine du projet :

```
# Adresse du serveur SMTP (exemple : smtp.gmail.com, smtp.mailtrap.io, etc.)
SMTP_HOST=smtp.example.com

# Port SMTP (souvent 587 pour TLS, 465 pour SSL, 25 pour non sécurisé)
SMTP_PORT=587

# Identifiants de connexion SMTP
SMTP_USER=mon.email@example.com
SMTP_PASS=motdepasse

# Adresse d'expéditeur (optionnel, sinon SMTP_USER sera utilisé)
SMTP_FROM="Nom de l'expéditeur" <mon.email@example.com>
```

**Remarques :**
- Utilisez un service SMTP compatible (Gmail, Mailjet, Mailtrap, etc.).
- Pour Gmail, il peut être nécessaire d'activer les "mots de passe d'application" ou l'accès aux applications moins sécurisées.
- SMTP_FROM permet de personnaliser le nom de l'expéditeur dans les e-mails envoyés.
