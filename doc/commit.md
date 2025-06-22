# Guide détaillé - Convention de nommage des commits

## 📋 Introduction

Ce guide détaille les conventions de nommage des commits Git pour maintenir un historique propre, lisible et professionnel. Une bonne convention de commits facilite la collaboration, le debug et la maintenance du projet.

## 🎯 Pourquoi respecter une convention ?

- **Historique lisible** : Comprendre rapidement les changements
- **Automatisation** : Génération automatique de changelogs
- **Collaboration** : Faciliter le travail en équipe
- **Debug** : Identifier rapidement les commits problématiques
- **Releases** : Automatiser la gestion des versions

## 📝 Format général

```
<type>(<scope>): <description>

[corps optionnel]

[footer optionnel]
```

### Structure détaillée :
- **type** : Type de changement (obligatoire)
- **scope** : Portée du changement (optionnel)
- **description** : Description courte (obligatoire, max 50 caractères)
- **corps** : Description détaillée (optionnel)
- **footer** : Métadonnées (optionnel)

## 🏷️ Types de commits

### Types principaux

| Type | Description | Exemple |
|------|-------------|---------|
| `feat` | Nouvelle fonctionnalité | `feat: add user authentication` |
| `fix` | Correction de bug | `fix: resolve login validation error` |
| `docs` | Documentation | `docs: update README installation steps` |
| `style` | Formatage, espaces, etc. | `style: fix indentation in user.js` |
| `refactor` | Refactorisation du code | `refactor: extract validation logic` |
| `test` | Ajout/modification de tests | `test: add unit tests for auth service` |
| `chore` | Tâches de maintenance | `chore: update dependencies` |

### Types secondaires

| Type | Description | Exemple |
|------|-------------|---------|
| `perf` | Amélioration des performances | `perf: optimize database queries` |
| `ci` | Configuration CI/CD | `ci: add GitHub Actions workflow` |
| `build` | Système de build | `build: update webpack config` |
| `revert` | Annulation d'un commit | `revert: feat: add user authentication` |

## 🎯 Scopes (Portées)

Le scope indique quelle partie du projet est affectée :

### Exemples de scopes
- `auth` : Authentification
- `api` : API/Backend
- `ui` : Interface utilisateur
- `db` : Base de données
- `config` : Configuration
- `deps` : Dépendances

### Exemples avec scopes
```bash
feat(auth): add JWT token validation
fix(api): resolve CORS error on login endpoint
docs(readme): add installation instructions
style(ui): improve button hover effects
```

## ✅ Exemples de bons commits

### Commits simples
```bash
feat: add user registration form
fix: resolve password validation bug
docs: update API documentation
style: format code with prettier
refactor: simplify authentication logic
test: add user service unit tests
chore: update npm dependencies
```

### Commits avec scope
```bash
feat(auth): implement OAuth2 authentication
fix(db): resolve connection pool timeout
docs(api): add endpoint documentation
style(ui): update button component styles
refactor(utils): extract date formatting functions
test(auth): add integration tests for login
chore(deps): upgrade React to v18
```

### Commits avec corps détaillé
```bash
feat(auth): add password reset functionality

- Add password reset request endpoint
- Implement email notification system
- Create reset token validation
- Add rate limiting for security

Fixes #123
```

### Commits avec breaking changes
```bash
feat(api): update user endpoint response format

BREAKING CHANGE: The user endpoint now returns
an object with user data nested under 'data' key
instead of returning user data directly.

Before: { id: 1, name: "John" }
After: { data: { id: 1, name: "John" } }
```

## ❌ Exemples de mauvais commits

### À éviter
```bash
# Trop vague
fix: bug fix
update: changes
misc: stuff

# Trop long
feat: add user authentication system with JWT tokens and refresh tokens and password hashing and email verification

# Pas de type
add login form
removed old files
updated readme

# Mauvais type
feat: fix typo in documentation
fix: add new feature
```

## 🛠️ Conseils pratiques

### Règles d'or

1. **Utilisez l'impératif** : "add" au lieu de "added" ou "adds"
2. **Pas de point final** dans la description
3. **Première lettre en minuscule** après le ":"
4. **Maximum 50 caractères** pour la description
5. **Ligne vide** entre la description et le corps
6. **Corps en 72 caractères** maximum par ligne

### Exemples d'impératif
```bash
✅ feat: add user dashboard

✅ fix: resolve memory leak in cache
❌ fix: resolved memory leak in cache
❌ fix: resolving memory leak in cache
```

## 🔧 Templates et outils

### Template de commit
```bash
# Titre (50 caractères max)
<type>(<scope>): <description>

# Corps (optionnel, 72 caractères par ligne)
# Expliquez le QUOI et le POURQUOI, pas le COMMENT

# Footer (optionnel)
# Refs, fixes, breaking changes, etc.
```

### Configuration Git
```bash
# Configurer un template de commit
git config commit.template ~/.gitmessage

# Ouvrir l'éditeur pour chaque commit
git config core.editor "code --wait"
```

### Fichier ~/.gitmessage
```
# <type>(<scope>): <description>

# <body>

# <footer>

# Types: feat, fix, docs, style, refactor, test, chore, perf, ci, build, revert
# Scope: auth, api, ui, db, config, deps, etc.
# Description: impératif, max 50 chars, pas de point final
# Body: optionnel, explique le pourquoi
# Footer: refs #123, fixes #456, BREAKING CHANGE: ...
```

## 📊 Exemples par contexte

### Développement de fonctionnalités
```bash
feat(auth): add Google OAuth integration
feat(ui): implement dark mode toggle
feat(api): add user profile endpoints
feat(db): add user preferences table
```

### Corrections de bugs
```bash
fix(auth): resolve token expiration handling
fix(ui): fix responsive layout on mobile
fix(api): handle null values in user data
fix(db): resolve migration rollback issue
```

### Documentation
```bash
docs: add contributing guidelines
docs(api): update authentication examples
docs(readme): fix installation commands
docs(changelog): add v2.1.0 release notes
```

### Maintenance et configuration
```bash
chore: update ESLint configuration
chore(deps): upgrade lodash to v4.17.21
chore(ci): add automated testing pipeline
chore(build): optimize production bundle size
```

### Tests
```bash
test(auth): add login flow integration tests
test(api): increase coverage for user endpoints
test(ui): add accessibility tests for forms
test(e2e): add checkout process scenarios
```

## 🚀 Automatisation

### Commitizen
```bash
# Installation
npm install -g commitizen cz-conventional-changelog

# Configuration
echo '{ "path": "cz-conventional-changelog" }' > ~/.czrc

# Utilisation
git cz
```

### Husky + Commitlint
```bash
# Installation
npm install --save-dev @commitlint/cli @commitlint/config-conventional husky

# Configuration commitlint.config.js
module.exports = {
  extends: ['@commitlint/config-conventional']
}

# Hook Husky
npx husky add .husky/commit-msg 'npx --no-install commitlint --edit $1'
```

## 📋 Checklist avant commit

- [ ] Le type est-il approprié ?
- [ ] La description est-elle claire et concise ?
- [ ] Le commit fait-il une seule chose ?
- [ ] L'impératif est-il utilisé ?
- [ ] La limite de 50 caractères est-elle respectée ?
- [ ] Y a-t-il des breaking changes à mentionner ?
- [ ] Les références (issues, PRs) sont-elles incluses ?

## 🎯 Bonnes pratiques avancées

### Commits atomiques
```bash
# ✅ Un commit par fonctionnalité
feat(auth): add login form
feat(auth): add password validation
feat(auth): add remember me option

# ❌ Tout en un commit
feat(auth): add complete login system with form, validation and remember me
```

### Squash de commits
```bash
# Avant squash
feat(ui): add button component
fix(ui): adjust button padding
fix(ui): fix button hover state
style(ui): format button component

# Après squash
feat(ui): add button component with hover states
```

### Revert de commits
```bash
# Commit original
feat(payment): add Stripe integration

# Revert
revert: feat(payment): add Stripe integration

This reverts commit abc123def456.
Reason: Stripe API credentials expired.
```

---

**💡 Tip** : Utilisez cette convention de manière cohérente dans toute votre équipe pour maximiser les bénéfices. N'hésitez pas à adapter les scopes selon votre projet !