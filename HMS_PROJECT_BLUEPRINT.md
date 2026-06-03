# Humanitarian Mapping Studio (HMS)
## Document de référence officiel du projet

| Attribut | Valeur |
|----------|--------|
| **Nom du produit** | Humanitarian Mapping Studio (HMS) |
| **Version du document** | 1.0.0 |
| **Statut** | Référence officielle — toute évolution majeure doit être reflétée ici |
| **Public** | Équipe produit, design, développement, partenaires techniques |

---

## Table des matières

1. [Vision du produit](#1-vision-du-produit)
2. [Objectifs](#2-objectifs)
3. [Philosophie produit](#3-philosophie-produit)
4. [Les cinq piliers du produit](#4-les-cinq-piliers-du-produit)
5. [Utilisateurs cibles](#5-utilisateurs-cibles)
6. [Fonctionnalités MVP](#6-fonctionnalités-mvp)
7. [Architecture fonctionnelle](#7-architecture-fonctionnelle)
8. [Architecture technique](#8-architecture-technique)
9. [Stack technologique](#9-stack-technologique)
10. [Roadmap de développement](#10-roadmap-de-développement)
11. [Principes UX](#11-principes-ux)
12. [Règles de développement](#12-règles-de-développement)
13. [Glossaire](#13-glossaire)

---

## 1. Vision du produit

**Humanitarian Mapping Studio** est une plateforme intelligente de production cartographique humanitaire.

### Ambition

Devenir **le Canva de la cartographie humanitaire** : un outil où la création de cartes professionnelles est aussi accessible que la création d’une affiche ou d’une présentation, sans formation SIG préalable.

### Proposition de valeur

| Aujourd’hui (pain points) | Avec HMS |
|---------------------------|----------|
| QGIS / ArcGIS requis pour des cartes « pro » | Production guidée, sans logiciel SIG desktop |
| Courbe d’apprentissage longue | Parcours pas à pas, assistant contextuel |
| Normes humanitaires dispersées | Templates et règles intégrés (OCHA, clusters, etc.) |
| Mise en page manuelle et répétitive | Layout engine dédié au secteur humanitaire |
| Données et symbologie hétérogènes | Intelligence métier + base de connaissances |

HMS ne remplace pas le SIG expert pour l’analyse spatiale avancée ; il **industrialise la production de cartes de communication** pour les opérations humanitaires, la sensibilisation et la coordination.

---

## 2. Objectifs

### Objectif principal

Permettre aux **ONG**, **agences des Nations Unies** et **institutions publiques** de produire des **cartes professionnelles, conformes et reproductibles** sans utiliser QGIS ou ArcGIS.

### Objectifs opérationnels

1. **Réduire le temps de production** d’une carte standard de plusieurs heures à moins de 30 minutes.
2. **Standardiser** titres, légendes, sources, échelles et symbologie selon les usages humanitaires.
3. **Guider** l’utilisateur de la question métier (« quelle carte pour quel public ? ») jusqu’à l’export (PDF, PNG, impression).
4. **Cacher la complexité SIG** : projections, couches, styles et requêtes restent gérées par la plateforme.
5. **Capitaliser** les bonnes pratiques via templates, règles et base de connaissances évolutive.

### Critères de succès (indicateurs produit)

- Taux de complétion d’un premier projet cartographique sans aide externe > 70 %.
- Temps médian jusqu’à premier export < 45 minutes (utilisateur non-SIG).
- Satisfaction perçue de la qualité visuelle ≥ 4/5 (enquête utilisateur).
- Conformité automatique aux checklists humanitaires (sources, disclaimer, légende) sur les exports MVP.

### Non-objectifs (hors périmètre MVP)

- Remplacer un SIG desktop pour modélisation spatiale, géotraitement lourd ou analyse statistique avancée.
- Héberger l’intégralité des données géospatiales mondiales en propre (agrégation de sources ouvertes et import utilisateur).
- Devenir un outil de collecte terrain mobile (possible évolution ultérieure).

---

## 3. Philosophie produit

### Le GIS doit être invisible

L’utilisateur ne manipule pas des « couches », des « projections » ou des « expressions ». Il manipule des **intentions** :

- *« Carte des sites d’accueil dans la région X »*
- *« Carte de vulnérabilité pour briefing OCHA »*
- *« Carte d’évacuation pour affichage A3 »*

Le moteur cartographique traduit ces intentions en opérations SIG en arrière-plan.

### Guidage par assistant

Chaque projet suit un **parcours structuré** (wizard / assistant) :

1. Contexte et objectif de la carte  
2. Zone d’intérêt et échelle  
3. Données et thématique  
4. Style et symbologie (assistée)  
5. Mise en page et éléments cartographiques  
6. Revue et export  

L’assistant pose des questions en langage métier, propose des défauts intelligents et signale les écarts par rapport aux bonnes pratiques.

### Qualité humanitaire par défaut

La plateforme privilégie **l’exactitude perçue et la clarté communication** plutôt que la sophistication technique visible. Chaque export doit être **lisible, sourcé et défendable** dans un contexte opérationnel.

---

## 4. Les cinq piliers du produit

Chaque pilier est un **domaine fonctionnel** distinct, avec des interfaces claires entre eux. Aucun écran utilisateur ne doit mélanger les responsabilités de plusieurs piliers sans abstraction explicite.

### 4.1 Guided Mapping Engine

**Rôle :** Orchestrer le parcours utilisateur de bout en bout.

| Responsabilité | Description |
|----------------|-------------|
| Workflow | Étapes, validations, reprise de brouillon |
| Contexte projet | Type de carte, audience, urgence, format de sortie |
| Règles de navigation | Blocage / suggestion selon complétude des étapes |
| Intégration | Appelle les autres piliers via des API internes stables |

**Livrables clés :** machine à états du wizard, persistance d’étape, messages d’aide contextuels.

---

### 4.2 Smart Template Generator

**Rôle :** Proposer et instancier des modèles de cartes adaptés au cas d’usage.

| Responsabilité | Description |
|----------------|-------------|
| Bibliothèque de templates | Situation, clusters, WASH, sécurité alimentaire, etc. |
| Paramétrisation | Variables (zone, titre, logo, langue) |
| Pré-configuration | Couches suggérées, styles par défaut, layout de base |
| Personnalisation | Fork du template sans casser la conformité de base |

**Livrables clés :** catalogue templates, moteur d’instanciation, versioning des templates.

---

### 4.3 Humanitarian Intelligence Engine

**Rôle :** Porter la logique métier humanitaire (règles, suggestions, contrôles qualité).

| Responsabilité | Description |
|----------------|-------------|
| Recommandations | Symboles, classifications, échelles adaptées |
| Validation | Sources obligatoires, légende complète, échelle cohérente |
| Enrichissement | Suggestions de données ouvertes (HDX, OSM, etc.) |
| Alertes | Incohérences (ex. trop de classes, symboles non accessibles) |

**Livrables clés :** moteur de règles, scores de qualité carte, messages actionnables.

---

### 4.4 Humanitarian Layout Engine

**Rôle :** Composer la carte finale pour impression et diffusion.

| Responsabilité | Description |
|----------------|-------------|
| Grilles et formats | A4, A3, slide 16:9, réseaux sociaux |
| Éléments cartographiques | Titre, légende, échelle, nord, sources, disclaimer |
| Branding | Logos organisation, palettes institutionnelles |
| Export | PDF haute résolution, PNG, prévisualisation WYSIWYG |

**Livrables clés :** éditeur de mise en page, rendu vectoriel/raster, presets OCHA / cluster.

---

### 4.5 Humanitarian Knowledge Base

**Rôle :** Centraliser normes, guides et contenus pédagogiques intégrés au produit.

| Responsabilité | Description |
|----------------|-------------|
| Documentation | Fiches « comment faire une carte X » |
| Référentiels | Symboles, couleurs, typographies recommandées |
| Mise à jour | Contenus versionnés, multilingues (FR / EN prioritaire) |
| Lien produit | Tooltips et aide in-app alimentés par la KB |

**Livrables clés :** CMS léger ou contenu structuré (JSON/Markdown), API de recherche contextuelle.

---

### Schéma d’interaction des piliers

```
┌─────────────────────────────────────────────────────────────────┐
│                    Guided Mapping Engine                         │
│              (parcours, étapes, persistance)                       │
└────────────┬──────────────┬──────────────┬────────────────────┘
             │              │              │
     ┌───────▼──────┐ ┌─────▼─────┐ ┌──────▼───────┐
     │   Smart      │ │ Humanit.  │ │ Humanit.     │
     │  Template    │ │ Intel.    │ │ Layout       │
     │  Generator     │ │ Engine    │ │ Engine       │
     └───────┬──────┘ └─────┬─────┘ └──────┬───────┘
             │              │              │
             └──────────────┼──────────────┘
                            │
                    ┌───────▼────────┐
                    │  Knowledge     │
                    │  Base          │
                    └────────────────┘
```

---

## 5. Utilisateurs cibles

### Personas principaux

| Persona | Organisation | Besoin | Niveau SIG |
|---------|--------------|--------|------------|
| **Coordinateur terrain** | ONG locale / internationale | Cartes situation rapides pour réunions | Faible |
| **Officier information** | OCHA, cluster lead | Cartes standardisées briefing | Moyen |
| **Communicant humanitaire** | ONG, médias partenaires | Visuels clairs pour plaidoyer | Faible |
| **Analyste SIG junior** | Agence UN, gouvernement | Accélérer la production récurrente | Moyen à élevé |
| **Responsable programmes** | Institution publique | Cartes décision sans dépendre au SIG | Faible |

### Segments institutionnels

- **ONG** (internationales et nationales) : urgence, développement, droits humains.
- **Système des Nations Unies** : OCHA, UNHCR, UNICEF, WFP, etc.
- **Institutions publiques** : ministères, agences nationales de gestion des risques.
- **Partenaires académiques et formations** (secondaire MVP) : pédagogie cartographie humanitaire.

### Besoins transverses

- Multilinguisme (français et anglais en priorité).
- Faible bande passante (mode dégradé, exports différés).
- Traçabilité des sources sur chaque carte.
- Réutilisation de modèles entre missions.

---

## 6. Fonctionnalités MVP

Le MVP vise une **carte de situation humanitaire complète**, produite de A à Z dans HMS, exportable en PDF/PNG.

### 6.1 Périmètre inclus

| Domaine | Fonctionnalité MVP |
|---------|-------------------|
| **Compte & projet** | Authentification, création projet, brouillon sauvegardé |
| **Assistant** | Parcours guidé 6 étapes (voir §3) |
| **Templates** | ≥ 3 modèles (situation générale, sites / POI, choroplèthe administrative) |
| **Carte** | Fond cartographique (OSM / tuiles), zone d’intérêt (bbox / dessin simple) |
| **Données** | Import GeoJSON/CSV points ; couche administrative simplifiée |
| **Style** | Palettes humanitaires prédéfinies, classification automatique simple |
| **Layout** | Titre, légende, échelle, flèche nord, sources, date, logo |
| **Intelligence** | Checklist pré-export (sources, légende, titre) |
| **Export** | PDF A4/A3, PNG 300 dpi |
| **Aide** | Tooltips + 5 fiches knowledge base intégrées |

### 6.2 Hors MVP (backlog proche)

- Collaboration temps réel multi-utilisateurs.
- Connexion directe API HDX / dataservices OCHA.
- Bibliothèque complète symboles cluster tous secteurs.
- Impression cartographique avancée (trames, grids multiples).
- Application mobile hors-ligne.

### 6.3 Définition of Done — MVP

- [ ] Un utilisateur non-SIG produit une carte exportée en < 45 min sans documentation externe.
- [ ] Export PDF contient titre, légende, échelle, sources et date.
- [ ] Projet réouvrable après déconnexion.
- [ ] Au moins 3 templates instanciables et modifiables sans casser le layout.
- [ ] Checklist intelligence bloque ou avertit avant export incomplet.

---

## 7. Architecture fonctionnelle

### 7.1 Domaines métier

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Identity   │     │   Project    │     │   Template   │
│   & Access   │     │   Lifecycle  │     │   Catalog    │
└──────────────┘     └──────────────┘     └──────────────┘
        │                    │                    │
        └────────────────────┼────────────────────┘
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
┌───────▼──────┐     ┌───────▼──────┐     ┌───────▼──────┐
│ Map Composer │     │   Styling    │     │   Layout     │
│ (view, layers)│     │   & Rules    │     │   Composer   │
└──────────────┘     └──────────────┘     └──────────────┘
        │                    │                    │
        └────────────────────┼────────────────────┘
                             │
                    ┌────────▼────────┐
                    │ Export & Assets │
                    └─────────────────┘
```

### 7.2 Flux principal (création carte)

1. **Authentification** → création ou reprise de projet.
2. **Sélection template** (Smart Template Generator) selon objectif déclaré.
3. **Définition zone** → recadrage carte, échelle suggérée (Intelligence Engine).
4. **Ajout / import données** → validation format, géoréférencement implicite.
5. **Application style** → règles métier + palettes.
6. **Mise en page** (Layout Engine) → ajustements WYSIWYG limités.
7. **Revue qualité** → checklist Intelligence Engine.
8. **Export** → génération PDF/PNG, archivage métadonnées projet.

### 7.3 Contrats entre modules (principes)

- Le **Guided Mapping Engine** est le seul orchestrateur de navigation UI.
- Les modules **Template**, **Intelligence** et **Layout** exposent des services sans dépendre de l’UI React directement.
- L’état carte (viewport, layers, styles) est **sérialisable** (JSON) pour persistance et reprise.
- La **Knowledge Base** est en lecture seule côté runtime applicatif (édition via pipeline contenu).

---

## 8. Architecture technique

### 8.1 Vue d’ensemble

Architecture **SPA moderne** avec backend managé (BaaS) pour l’authentification, la persistance projet et le stockage fichiers ; logique SIG et rendu **côté client** pour réactivité et réduction de charge serveur.

```
┌─────────────────────────────────────────────────────────────┐
│                     Client (Browser)                         │
│  ┌─────────────┐  ┌──────────────┐  ┌─────────────────────┐ │
│  │ React UI    │  │ State /      │  │ MapLibre GL +       │ │
│  │ (MUI)       │  │ Router       │  │ Canvas export       │ │
│  └─────────────┘  └──────────────┘  └─────────────────────┘ │
│         │                 │                    │             │
│  ┌──────▼─────────────────▼────────────────────▼──────────┐ │
│  │ Services: Wizard, Templates, Rules, Layout, Export    │ │
│  └────────────────────────────────────────────────────────┘ │
└────────────────────────────┬────────────────────────────────┘
                             │ HTTPS
┌────────────────────────────▼────────────────────────────────┐
│ Firebase (Auth, Firestore, Storage)                          │
│  — utilisateurs, projets JSON, assets exportés               │
└─────────────────────────────────────────────────────────────┘
                             │
┌────────────────────────────▼────────────────────────────────┐
│ Sources externes (MVP)                                       │
│  — Tuiles OSM / MapLibre compatible                          │
│  — Import fichiers utilisateur (GeoJSON, CSV, XLSX)          │
└─────────────────────────────────────────────────────────────┘
```

### 8.2 Structure applicative cible (frontend)

```
src/
├── app/                 # Bootstrap, providers, routing
├── features/            # Modules par pilier / domaine
│   ├── wizard/
│   ├── templates/
│   ├── map/
│   ├── intelligence/
│   ├── layout/
│   └── export/
├── shared/              # Composants UI, hooks, utils
├── services/            # API Firebase, parsers géo, règles
├── domain/              # Types métier, modèles projet/carte
└── content/             # Knowledge base (MD/JSON)
```

### 8.3 Modèle de données projet (conceptuel)

| Entité | Contenu principal |
|--------|-------------------|
| `User` | Profil, organisation, préférences langue |
| `Project` | Métadonnées, statut wizard, templateId |
| `MapState` | Viewport, layers[], styles[], sources[] |
| `LayoutState` | Éléments mise en page, format, marges |
| `Export` | Historique exports, URLs Storage |

### 8.4 Sécurité et conformité

- Authentification Firebase (email / SSO selon déploiement).
- Règles Firestore **par utilisateur / organisation** (pas d’accès croisé).
- Données sensibles : ne pas stocker de PII dans les attributs carte sans consentement explicite.
- Exports : filigrane optionnel « non officiel » en brouillon.

### 8.5 Performance

- Lazy loading des modules carte et export lourds.
- Limitation nombre de features affichées (simplification géométrique client).
- Cache tuiles navigateur ; debounce sur interactions carte.

---

## 9. Stack technologique

### 9.1 Stack actuelle (dépôt HMS)

| Couche | Technologie | Rôle |
|--------|-------------|------|
| Build | **Vite 8** | Dev server, bundling rapide |
| Langage | **TypeScript 6** | Typage strict, maintenabilité |
| UI | **React 19** | Interface composants |
| Design system | **MUI 9** (+ Emotion) | Composants accessibles, thème HMS |
| Routing | **React Router 7** | Navigation wizard / app |
| Cartographie | **MapLibre GL JS 5** | Rendu carte WebGL, fond OSM-compatible |
| Backend | **Firebase 12** | Auth, Firestore, Storage |
| Export | **html2canvas**, **jsPDF** | Rasterisation et PDF |
| Données tabulaires | **xlsx** | Import tableurs |
| Qualité code | **ESLint 10** | Lint TypeScript/React |

### 9.2 Choix techniques justifiés

- **MapLibre** : open source, performant, aligné avec écosystème humanitaire (pas de licence Esri).
- **Firebase** : time-to-market MVP, auth et sync sans serveur dédié initial.
- **React + Vite** : écosystème mature, recrutement facilité, HMR rapide.

### 9.3 Évolutions stack envisagées (post-MVP)

| Besoin | Option |
|--------|--------|
| Géotraitement serveur | PostGIS + API Node/Deno ou Cloud Functions |
| Tuiles custom | Martin / TileServer GL |
| Collaboration | WebSockets / Firebase Realtime |
| i18n | react-i18next |
| Tests E2E | Playwright |

---

## 10. Roadmap de développement

### Phase 0 — Fondations (en cours)

- [x] Initialisation projet Vite + React + TypeScript  
- [ ] Thème MUI HMS (couleurs humanitaires, typographie)  
- [ ] Routing et coque applicative (layout authentifié / public)  
- [ ] Intégration Firebase (auth + règles de base)  

### Phase 1 — MVP Core (8–10 semaines cible)

| Semaine | Focus | Livrable |
|---------|-------|----------|
| 1–2 | Wizard + persistance projet | Parcours 6 étapes navigable |
| 2–3 | Carte MapLibre + zone d’intérêt | Carte interactive, bbox |
| 3–4 | Templates (×3) | Instanciation template → MapState |
| 4–5 | Import GeoJSON/CSV | Couche points / polygones simples |
| 5–6 | Styling + palettes | Classification, légende auto |
| 6–7 | Layout engine v1 | Titre, légende, échelle, sources |
| 7–8 | Intelligence checklist | Blocage / warnings pré-export |
| 8–9 | Export PDF/PNG | Pipeline html2canvas + jsPDF |
| 9–10 | KB intégrée + polish UX | 5 fiches, tests utilisateurs pilotes |

### Phase 2 — Renforcement produit

- Bibliothèque templates élargie (par cluster).
- Connexion HDX (recherche jeux de données).
- Organisations / espaces partagés.
- Historique versions projet.

### Phase 3 — Plateforme

- API publique export.
- Plugins templates communautaires.
- Mode hors-ligne partiel.
- Certification / alignement standards OCHA visuels.

---

## 11. Principes UX

### 11.1 Règles d’or

1. **Langage métier avant jargon SIG** — « Zone de la carte » plutôt que « Étendue du canvas ».
2. **Une décision principale par écran** — éviter les formulaires fourre-tout.
3. **Defaults intelligents** — chaque champ a une valeur suggérée modifiable.
4. **Feedback immédiat** — la carte et la mise en page se mettent à jour en direct.
5. **Erreurs récupérables** — messages clairs + action corrective proposée.
6. **Progression visible** — indicateur d’étape wizard toujours affiché.
7. **Confiance** — sources et date visibles avant export ; pas de surprise à l’impression.

### 11.2 Accessibilité

- Contraste WCAG AA minimum sur textes carte et UI.
- Symboles ne reposent pas uniquement sur la couleur (formes, motifs).
- Navigation clavier sur le wizard et les contrôles layout.
- Textes redimensionnables sans casser le layout export.

### 11.3 Ton et voix

- Professionnel, calme, orienté mission humanitaire.
- Tutoiement ou vouvoiement : **vouvoiement** par défaut (contexte institutionnel).
- Pas de culpabilisation sur les erreurs (« Complétez la source pour finaliser »).

### 11.4 Patterns UI HMS

| Pattern | Usage |
|---------|--------|
| Wizard latéral | Navigation étapes + résumé projet |
| Preview carte centrale | Zone focalisée, panneau contextuel à droite |
| Cards template | Choix visuel avec miniature et cas d’usage |
| Checklist qualité | Dernière étape avant export |
| Empty states | Guider vers import ou template quand pas de données |

---

## 12. Règles de développement

### 12.1 Gouvernance du code

- **Ce document est la source de vérité produit** ; les PRs qui ajoutent des fonctionnalités visibles doivent être traçables vers un pilier ou une ligne de roadmap.
- Toute fonctionnalité livrée inclut **typage TypeScript** (pas de `any` sans justification commentée).
- **Pas de logique SIG dans les composants React** — extraire dans `services/` ou `domain/`.
- **Feature folders** : code métier regroupé sous `src/features/<nom>/`.

### 12.2 Conventions

| Sujet | Convention |
|-------|------------|
| Composants | PascalCase, un composant par fichier |
| Hooks | Préfixe `use`, colocalisés au feature si spécifiques |
| Styles | Thème MUI + `sx` ; éviter CSS global sauf MapLibre |
| État global | Contexte React ou store léger ; éviter sur-ingénierie MVP |
| API Firebase | Couche `services/firebase/*` uniquement |
| i18n | Clés string externalisées dès Phase 1 (même si FR seul au début) |

### 12.3 Git et revues

- Branches : `feature/`, `fix/`, `docs/` + identifiant court.
- Commits : impératif, en anglais ou français cohérent par repo (préférer **anglais** pour messages techniques).
- PR : description avec pilier concerné + capture écran si UI.
- Pas de commit de secrets (`.env`, clés Firebase) — utiliser `.env.example`.

### 12.4 Tests (progressif)

| Niveau | Cible |
|--------|--------|
| Unitaires | Parsers GeoJSON/CSV, règles Intelligence Engine |
| Composants | Wizard navigation, checklist |
| E2E (Phase 2) | Parcours complet création → export |

### 12.5 Documentation

- README : installation et `npm run dev` uniquement.
- Décisions d’architecture significatives : section dans ce blueprint ou ADR court dans `docs/adr/`.
- Mise à jour obligatoire de ce fichier lors de changement de stack, de périmètre MVP ou de piliers.

### 12.6 Interdits explicites

- Exposer à l’utilisateur final des termes « WGS84 », « GeoPackage » sans traduction métier.
- Appels directs MapLibre depuis plus de 2 couches d’abstraction (wrapper carte obligatoire).
- Dépendance licence propriétaire Esri pour le MVP.
- Export sans possibilité d’afficher les sources (même si champs vides → warning).

---

## 13. Glossaire

| Terme | Définition |
|-------|------------|
| **HMS** | Humanitarian Mapping Studio |
| **GIS / SIG** | Système d’information géographique — **masqué** dans l’UX HMS |
| **Template** | Modèle de projet pré-configuré (couches, style, layout) |
| **Wizard** | Assistant pas à pas de création de carte |
| **Layout** | Composition graphique finale (hors contenu géographique pur) |
| **POI** | Point d’intérêt (site, bureau, entrepôt, etc.) |
| **HDX** | Humanitarian Data Exchange (source de données potentielle) |
| **OCHA** | Bureau de la coordination des affaires humanitaires (UN) |
| **Cluster** | Mécanisme de coordination sectorielle (WASH, santé, etc.) |
| **MVP** | Produit minimum viable décrit en §6 |

---

## Historique des révisions

| Version | Date | Auteur | Modifications |
|---------|------|--------|---------------|
| 1.0.0 | 2026-06-03 | Équipe HMS | Création du document de référence initial |

---

*Humanitarian Mapping Studio — Cartographier l’urgence avec clarté, sans complexité visible.*
