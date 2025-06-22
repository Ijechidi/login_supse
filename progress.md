# Étapes du projet & commandes

## 1. Initialisation du projet
```bash
pnpm init
```

## 2. Ajout de Prisma (ORM)
```bash
pnpm add -D prisma         # Ajoute Prisma en dev
pnpm add @prisma/client    # Ajoute le client Prisma
npx prisma init            # Initialise Prisma
```
```bash
npx prisma studio                # visualise la db sur une page

package.json : "postinstall": "npx prisma generate" # permet de generer prisma en local/ sur vercel apres pnpm i / npm i 


```

## 3. Migration et génération du client Prisma
```bash
npx prisma migrate dev     # Crée et applique une migration sur supabase en ligne
npx prisma generate        # Génère le client Prisma en local sur le projet
```

## 4. Ajout d'autres dépendances (exemples)
```bash
# pnpm add express         # Exemple : ajout d'Express
# pnpm add dotenv          # Exemple : ajout de dotenv
```

## 5. Lancement du projet
```bash
pnpm run dev               # Démarre le serveur en mode développement
```
