import { useState, useMemo, useRef, useEffect, Fragment } from "react";
import {
  History,
  Star,
  Store,
  Shuffle,
  X,
  AlertTriangle,
  Search,
  Calendar,
  ChevronDown,
  Check,
  Printer,
  Columns3,
  LayoutGrid,
  Users,
  ListChecks,
  List,
  Blend,
  Table2,
  Repeat,
  ShoppingCart,
  Pencil,
  Info,
  ArrowLeft,
  RefreshCw,
  Sun,
  Coins,
  Carrot,
  Milk,
  Beef,
  Snowflake,
  Wheat,
  Home,
  Warehouse,
  ShoppingBasket,
  ClipboardList,
  BarChart3,
  Sparkles,
  Settings,
  GraduationCap,
  HelpCircle,
  ChevronRight,
  Utensils,
  Wand2,
  NotebookPen,
  PackageOpen,
  Trash2,
  ArrowRight,
  MoreVertical,
} from "lucide-react";

/* ---------------------------------------------------------------------- */
/*  Design tokens — matched to the supplied mockups                        */
/* ---------------------------------------------------------------------- */
const T = {
  teal: "#2f6f68",
  tealDark: "#255650",
  tealBar: "#eaf3f1",
  green: { row: "#eafaf1", badge: "#B4F0D6", text: "#1B5139", ring: "#a9dfbd" },
  violet: { row: "#f2edfd", badge: "#AAB0F4", text: "#090E4C", ring: "#cdb6f7" },
  matchHistorique: { badge: "#CEF8D8", text: "#204635" },
  matchAuto: { badge: "#E2F6FF", text: "#143D7E" },
  rose: { row: "#fdecec", badge: "#f8cac8", text: "#c9372c", ring: "#f0a9a5" },
  manual: { row: "#eaf4f6", badge: "#c9e6e6", text: "#1f6f6f", ring: "#a7d6d6" },
  selected: "#d9f6e4",
  amber: "#f0a63d",
  amberDark: "#d88f24",
  border: "#e4e4e4",
};

/* ---------------------------------------------------------------------- */
/*  Mock data                                                              */
/* ---------------------------------------------------------------------- */

const FOURNISSEURS = [
  "CERCLE VERT",
  "CRENO",
  "DS RESTAURATION",
  "FRANCE FRAIS",
  "POMONA EPISAVEURS",
  "POMONA PASSION FROID",
  "POMONA TERRE AZUR",
  "PRO A PRO",
  "RELAIS D'OR",
  "RESEAU KRILL",
  "SYSCO",
  "TRANSGOURMET",
];

const initialRows = [
  {
    id: 1,
    aliment: "Melon",
    gamme: "brut",
    famille: "Fruits & légumes",
    alimentLabel: "Issu du...",
    matchType: "historique",
    verified: false,
    matchProduct: "Melon Charentais HVE",
    matchGamme: "brut",
    pinnedFavori: true,
    pinnedMarketPublic: true,
    dateLivraison: "12/09",
    produitLabel: "Issu du...",
    fournisseur: "CRENO",
    recette: "Salade de melon",
    etat: "En stock",
    prixUnitaire: "3,80 €/kg",
    prixTotal: "76,00 €",
    dateProd: "12/09",
    besoinMenu: "20,00 kg",
    moinsCher: false,
    labelMismatch: false,
    sansOffre: false,
  },
  {
    id: 2,
    aliment: "Tomate",
    gamme: "brut",
    famille: "Fruits & légumes",
    alimentLabel: "Bio",
    matchType: "basevariant",
    verified: false,
    matchProduct: "Tomate",
    matchGamme: "brut",
    dateLivraison: "13/09",
    produitLabel: "",
    fournisseur: "TRANSGOURMET",
    recette: "Salade composée",
    etat: "Commandé",
    prixUnitaire: "3,29 €/kg",
    prixTotal: "75,67 €",
    dateProd: "13/09",
    besoinMenu: "23,00 kg",
    moinsCher: false,
    labelMismatch: true,
    sansOffre: false,
  },
  {
    id: 3,
    aliment: "Pomme de terre",
    gamme: "brut",
    famille: "Fruits & légumes",
    alimentLabel: "",
    matchType: "mp",
    verified: false,
    matchProduct: "PDT Chair Ferme",
    matchGamme: "brut",
    dateLivraison: "14/09",
    produitLabel: "",
    fournisseur: "POMONA TERRE AZUR",
    recette: "Gratin dauphinois",
    etat: "À traiter",
    prixUnitaire: "1,58 €/kg",
    prixTotal: "41,08 €",
    dateProd: "14/09",
    besoinMenu: "26,00 kg",
    moinsCher: true,
    labelMismatch: false,
    sansOffre: false,
  },
  {
    id: 4,
    aliment: "Laitue",
    gamme: "brut",
    famille: "Fruits & légumes",
    alimentLabel: "Bio",
    matchType: "basevariant",
    verified: false,
    matchProduct: "Laitue Bio",
    matchGamme: "brut",
    dateLivraison: "Multi",
    produitLabel: "",
    fournisseur: "TRANSGOURMET",
    recette: "Multi",
    etat: "Commandé",
    prixUnitaire: "7,00 €/kg",
    prixTotal: "60,90 €",
    dateProd: "Multi",
    besoinMenu: "29,00 pièces",
    moinsCher: false,
    labelMismatch: true,
    sansOffre: false,
    subRows: [
      {
        recette: "Salade verte",
        dateLivraison: "12/09",
        dateProd: "12/09",
        dateConso: "12/12",
        etat: "Commandé",
        prixTotal: "35,00 €",
        besoinMenu: "15,00 pièces",
        verified: false,
      },
      {
        recette: "Salade César",
        dateLivraison: "13/09",
        dateProd: "13/09",
        dateConso: "13/12",
        etat: "Commandé",
        prixTotal: "25,90 €",
        besoinMenu: "14,00 pièces",
        verified: false,
      },
    ],
  },
  {
    id: 5,
    aliment: "Avocat",
    gamme: "brut",
    famille: "Fruits & légumes",
    alimentLabel: "",
    matchType: "none",
    verified: false,
    matchProduct: null,
    matchGamme: null,
    dateLivraison: null,
    produitLabel: "",
    fournisseur: "",
    recette: "Salade composée",
    etat: "En stock",
    prixUnitaire: null,
    prixTotal: null,
    dateProd: "12/09",
    besoinMenu: "32,00 pièces",
    moinsCher: false,
    labelMismatch: false,
    sansOffre: false,
  },
  {
    id: 6,
    aliment: "Yaourt à boire",
    gamme: "préemballé",
    famille: "BOF",
    alimentLabel: "Bio",
    matchType: "favori",
    verified: false,
    matchProduct: "Yaourt à boire à la Fraise 100g Bio",
    matchGamme: "préemballé",
    dateLivraison: "13/09",
    produitLabel: "Bio",
    fournisseur: "FRANCE FRAIS",
    recette: "Petit-déjeuner",
    etat: "Commandé",
    prixUnitaire: "4,10 €/kg",
    prixTotal: "14,35 €",
    dateProd: "13/09",
    besoinMenu: "35,00 pièces",
    moinsCher: false,
    labelMismatch: false,
    sansOffre: false,
  },
  {
    id: 7,
    aliment: "Gouda",
    gamme: "préemballé",
    famille: "BOF",
    alimentLabel: "Bio",
    matchType: "mp",
    verified: false,
    matchProduct: "Gouda préemballé env 27%MG 20g Bio",
    matchGamme: "préemballé",
    dateLivraison: "14/09",
    produitLabel: "Bio",
    fournisseur: "PRO A PRO",
    recette: "Plateau de fromages",
    etat: "À traiter",
    prixUnitaire: "15,00 €/kg",
    prixTotal: "11,40 €",
    dateProd: "14/09",
    besoinMenu: "38,00 pièces",
    moinsCher: false,
    labelMismatch: false,
    sansOffre: false,
  },
  {
    id: 8,
    aliment: "Fromage portion",
    gamme: "préemballé",
    famille: "BOF",
    alimentLabel: "Bio",
    matchType: "basevariant",
    verified: false,
    matchProduct: "Bonbel prédécoupé 23%MG 30g",
    matchGamme: "préemballé",
    dateLivraison: "13/09",
    produitLabel: "",
    fournisseur: "FRANCE FRAIS",
    recette: "Plateau de fromages",
    etat: "Commandé",
    prixUnitaire: "13,33 €/kg",
    prixTotal: "16,40 €",
    dateProd: "13/09",
    besoinMenu: "41,00 pièces",
    moinsCher: false,
    labelMismatch: true,
    sansOffre: false,
  },
  {
    id: 9,
    aliment: "Fromage de chèvre",
    gamme: "préemballé",
    famille: "BOF",
    alimentLabel: "",
    matchType: "historique",
    verified: false,
    matchProduct: "Chavroux 13,3%MG 20g",
    matchGamme: "préemballé",
    pinnedFavori: true,
    pinnedMarketPublic: true,
    dateLivraison: "12/09",
    produitLabel: "",
    fournisseur: "SYSCO",
    recette: "Salade de chèvre chaud",
    etat: "En stock",
    prixUnitaire: "16,00 €/kg",
    prixTotal: "14,08 €",
    dateProd: "12/09",
    besoinMenu: "44,00 pièces",
    moinsCher: false,
    labelMismatch: false,
    sansOffre: true,
  },
  {
    id: 10,
    aliment: "Bleu",
    gamme: "brut",
    famille: "BOF",
    alimentLabel: "",
    matchType: "favori",
    verified: false,
    matchProduct: "Bresse Bleu env 30%MG env 500g",
    matchGamme: "brut",
    dateLivraison: "13/09",
    produitLabel: "",
    fournisseur: "SYSCO",
    recette: "Multi",
    etat: "Commandé",
    prixUnitaire: "14,20 €/kg",
    prixTotal: "312,40 €",
    dateProd: "13/09",
    besoinMenu: "22,00 kg",
    moinsCher: false,
    labelMismatch: false,
    sansOffre: false,
    subRows: [
      {
        recette: "Plateau de fromages",
        dateLivraison: "13/09",
        dateProd: "13/09",
        dateConso: "14/12",
        etat: "Commandé",
        prixTotal: "213,00 €",
        besoinMenu: "15,00 kg",
        verified: false,
      },
      {
        recette: "Gratin de bleu",
        dateLivraison: "13/09",
        dateProd: "13/09",
        dateConso: "14/12",
        etat: "Commandé",
        prixTotal: "99,40 €",
        besoinMenu: "7,00 kg",
        verified: false,
      },
    ],
  },
  {
    id: 11,
    aliment: "Boeuf rôti",
    gamme: "brut",
    famille: "VPO",
    alimentLabel: "",
    matchType: "mp",
    verified: false,
    matchProduct: "Boeuf Rôti Macreuse PAD Sans Barde env 2Kg UE",
    matchGamme: "brut",
    dateLivraison: "14/09",
    produitLabel: "",
    fournisseur: "SYSCO",
    recette: "Rôti du dimanche",
    etat: "À traiter",
    prixUnitaire: "17,80 €/kg",
    prixTotal: "445,00 €",
    dateProd: "14/09",
    besoinMenu: "25,00 kg",
    moinsCher: false,
    labelMismatch: false,
    sansOffre: false,
  },
  {
    id: 12,
    aliment: "Porc rôti",
    gamme: "cuit sous vide",
    famille: "VPO",
    alimentLabel: "",
    matchType: "basevariant",
    verified: false,
    matchProduct: "Porc Rôti Cuit Carré Filet env 2Kg LPF",
    matchGamme: "cuit sous vide",
    dateLivraison: "13/09",
    produitLabel: "",
    fournisseur: "FRANCE FRAIS",
    recette: "Rôti de porc",
    etat: "Commandé",
    prixUnitaire: "6,96 €/kg",
    prixTotal: "194,88 €",
    dateProd: "13/09",
    besoinMenu: "28,00 kg",
    moinsCher: false,
    labelMismatch: false,
    sansOffre: false,
  },
  {
    id: 13,
    aliment: "Boeuf filet",
    gamme: "brut",
    famille: "VPO",
    alimentLabel: "Issu du...",
    matchType: "historique",
    verified: false,
    matchProduct: "Boeuf Filet Semi-paré sans chaînette env 2kg VBF",
    matchGamme: "brut",
    pinnedMarketPublic: true,
    dateLivraison: "12/09",
    produitLabel: "Issu du...",
    fournisseur: "DS RESTAURATION",
    recette: "Filet de boeuf",
    etat: "En stock",
    prixUnitaire: "28,36 €/kg",
    prixTotal: "879,16 €",
    dateProd: "12/09",
    besoinMenu: "31,00 kg",
    moinsCher: true,
    labelMismatch: false,
    sansOffre: false,
  },
  {
    id: 14,
    aliment: "Agneau épaule",
    gamme: "cuit sous vide",
    famille: "VPO",
    alimentLabel: "",
    matchType: "none",
    verified: false,
    matchProduct: null,
    matchGamme: null,
    dateLivraison: null,
    produitLabel: "",
    fournisseur: "",
    recette: "Agneau confit",
    etat: "Commandé",
    prixUnitaire: null,
    prixTotal: null,
    dateProd: "13/09",
    besoinMenu: "34,00 kg",
    moinsCher: false,
    labelMismatch: false,
    sansOffre: false,
  },
  {
    id: 15,
    aliment: "Veau",
    gamme: "brut",
    famille: "VPO",
    alimentLabel: "Issu du...",
    matchType: "mp",
    verified: false,
    matchProduct: "Veau Noix Pâtissière VF 2Kg",
    matchGamme: "brut",
    dateLivraison: "14/09",
    produitLabel: "Issu du...",
    fournisseur: "POMONA PASSION FROID",
    recette: "Blanquette de veau",
    etat: "À traiter",
    prixUnitaire: "13,41 €/kg",
    prixTotal: "496,17 €",
    dateProd: "14/09",
    besoinMenu: "37,00 kg",
    moinsCher: false,
    labelMismatch: false,
    sansOffre: false,
  },
  {
    id: 16,
    aliment: "Poulet haut de cuisse",
    gamme: "brut",
    famille: "VPO",
    alimentLabel: "Issu du...",
    matchType: "basevariant",
    verified: false,
    matchProduct: "Poulet Haut Cuisse 110-140g VF",
    matchGamme: "brut",
    dateLivraison: "13/09",
    produitLabel: "Issu du...",
    fournisseur: "SYSCO",
    recette: "Poulet basquaise",
    etat: "Commandé",
    prixUnitaire: "6,38 €/kg",
    prixTotal: "255,20 €",
    dateProd: "13/09",
    besoinMenu: "40,00 kg",
    moinsCher: false,
    labelMismatch: false,
    sansOffre: false,
  },
  {
    id: 17,
    aliment: "Croûtons",
    gamme: "préemballé",
    famille: "Epicerie",
    alimentLabel: "",
    matchType: "historique",
    verified: false,
    matchProduct: "Croûtons Cubes à l'Ail PASQUIER 500g",
    matchGamme: "préemballé",
    pinnedFavori: true,
    dateLivraison: "12/09",
    produitLabel: "",
    fournisseur: "FRANCE FRAIS",
    recette: "Salade César",
    etat: "En stock",
    prixUnitaire: "5,32 €/kg",
    prixTotal: "114,38 €",
    dateProd: "12/09",
    besoinMenu: "43,00 pièces",
    moinsCher: false,
    labelMismatch: false,
    sansOffre: false,
  },
  {
    id: 18,
    aliment: "Purée pomme banane",
    gamme: "appertisé",
    famille: "Epicerie",
    alimentLabel: "Bio",
    matchType: "favori",
    verified: false,
    matchProduct: "Purée Pomme Banane 100g Bio",
    matchGamme: "appertisé",
    dateLivraison: "13/09",
    produitLabel: "Bio",
    fournisseur: "POMONA EPISAVEURS",
    recette: "Dessert enfant",
    etat: "Commandé",
    prixUnitaire: "3,00 €/kg",
    prixTotal: "6,30 €",
    dateProd: "13/09",
    besoinMenu: "21,00 pièces",
    moinsCher: false,
    labelMismatch: false,
    sansOffre: false,
  },
  {
    id: 19,
    aliment: "Mayonnaise",
    gamme: "appertisé",
    famille: "Epicerie",
    alimentLabel: "",
    matchType: "mp",
    verified: false,
    matchProduct: "Mayonnaise Flacon Top Down 450ml",
    matchGamme: "appertisé",
    dateLivraison: "14/09",
    produitLabel: "",
    fournisseur: "CERCLE VERT",
    recette: "Sauce maison",
    etat: "À traiter",
    prixUnitaire: "10,62 €/kg",
    prixTotal: "114,72 €",
    dateProd: "14/09",
    besoinMenu: "24,00 pièces",
    moinsCher: false,
    labelMismatch: false,
    sansOffre: false,
  },
  {
    id: 20,
    aliment: "Pâtes torsade",
    gamme: "préemballé",
    famille: "Epicerie",
    alimentLabel: "",
    matchType: "basevariant",
    verified: false,
    matchProduct: "Pâtes Torsade Qualité Standard 5kg",
    matchGamme: "préemballé",
    dateLivraison: "13/09",
    produitLabel: "",
    fournisseur: "POMONA EPISAVEURS",
    recette: "Pâtes bolognaise",
    etat: "Commandé",
    prixUnitaire: "1,22 €/kg",
    prixTotal: "32,94 €",
    dateProd: "13/09",
    besoinMenu: "27,00 kg",
    moinsCher: false,
    labelMismatch: false,
    sansOffre: false,
  },
  {
    id: 21,
    aliment: "Courgette",
    gamme: "surgelé",
    famille: "Surgelé",
    alimentLabel: "",
    matchType: "none",
    verified: false,
    matchProduct: null,
    matchGamme: null,
    dateLivraison: null,
    produitLabel: "",
    fournisseur: "",
    recette: "Ratatouille",
    etat: "En stock",
    prixUnitaire: null,
    prixTotal: null,
    dateProd: "12/09",
    besoinMenu: "30,00 kg",
    moinsCher: false,
    labelMismatch: false,
    sansOffre: false,
  },
  {
    id: 22,
    aliment: "Poulet filet",
    gamme: "surgelé",
    famille: "Surgelé",
    alimentLabel: "",
    matchType: "favori",
    verified: false,
    matchProduct: "Poulet Filet 120-140g",
    matchGamme: "surgelé",
    dateLivraison: "13/09",
    produitLabel: "",
    fournisseur: "RELAIS D'OR",
    recette: "Poulet basquaise",
    etat: "Commandé",
    prixUnitaire: "7,84 €/kg",
    prixTotal: "258,72 €",
    dateProd: "13/09",
    besoinMenu: "33,00 kg",
    moinsCher: true,
    labelMismatch: false,
    sansOffre: false,
  },
  {
    id: 23,
    aliment: "Ravioli",
    gamme: "surgelé",
    famille: "Surgelé",
    alimentLabel: "",
    matchType: "mp",
    verified: false,
    matchProduct: "Ravioli ou Tortellini 4 ou 5 fromages 2Kg",
    matchGamme: "surgelé",
    dateLivraison: "14/09",
    produitLabel: "",
    fournisseur: "RESEAU KRILL",
    recette: "Ravioli gratinés",
    etat: "À traiter",
    prixUnitaire: "8,54 €/kg",
    prixTotal: "307,44 €",
    dateProd: "14/09",
    besoinMenu: "36,00 kg",
    moinsCher: false,
    labelMismatch: false,
    sansOffre: false,
  },
  {
    id: 24,
    aliment: "Panais",
    gamme: "surgelé",
    famille: "Surgelé",
    alimentLabel: "",
    matchType: "basevariant",
    verified: false,
    matchProduct: "Panais Blanchis Cubes",
    matchGamme: "surgelé",
    dateLivraison: "13/09",
    produitLabel: "",
    fournisseur: "POMONA PASSION FROID",
    recette: "Purée de panais",
    etat: "Commandé",
    prixUnitaire: "2,65 €/kg",
    prixTotal: "103,35 €",
    dateProd: "13/09",
    besoinMenu: "39,00 kg",
    moinsCher: false,
    labelMismatch: false,
    sansOffre: false,
  },
];

const candidatePoolsByFamille = {
  "Fruits & légumes": [
    {
      id: "fr0",
      name: "Fenouil",
      gamme: "brut",
      fournisseur: "TRANSGOURMET",
      labels: [],
      origin: "Italie",
      seasonal: false,
      price: "2,35 €/kg",
      total: "47,00 €",
      badge: "Dernier achat",
    },
    {
      id: "fr1",
      name: "Myrtille",
      gamme: "brut",
      fournisseur: "VIVALYA",
      labels: ["Bio"],
      origin: "Espagne",
      seasonal: false,
      price: "2,90 €/kg",
      total: "58,00 €",
      badge: null,
      favori: true,
    },
    {
      id: "fr2",
      name: "Banane P19",
      gamme: "brut",
      fournisseur: "CRENO",
      labels: [],
      origin: "AUTRES",
      seasonal: true,
      price: "1,85 €/kg",
      total: "37,00 €",
      badge: null,
    },
    {
      id: "fr3",
      name: "Radis Noir",
      gamme: "brut",
      fournisseur: "CRENO",
      labels: ["Issu du..."],
      origin: "FR",
      seasonal: false,
      price: "2,95 €/kg",
      total: "59,00 €",
      badge: null,
      marketPublic: true,
      catalog: "Lot marché public Fruits & légumes",
    },
    {
      id: "fr4",
      name: "Oignon Jaune",
      gamme: "brut",
      fournisseur: "CRENO",
      labels: [],
      origin: "FR",
      seasonal: false,
      price: "0,75 €/kg",
      total: "15,00 €",
      badge: "Le moins cher",
    },
    {
      id: "fr5",
      name: "Fraises Import",
      gamme: "brut",
      fournisseur: "TRANSGOURMET",
      labels: [],
      origin: "BELGIQUE",
      seasonal: true,
      price: "5,76 €/kg",
      total: "115,20 €",
      badge: null,
    },
    {
      id: "fr6",
      name: "Batavia",
      gamme: "brut",
      fournisseur: "VIVALYA",
      labels: [],
      origin: "Italie",
      seasonal: false,
      price: null,
      total: null,
      badge: null,
      sansOffre: true,
    },
    {
      id: "fr7",
      name: "Pomme Golden 115/136 g",
      gamme: "brut",
      fournisseur: "POMONA TERRE AZUR",
      labels: ["Bio"],
      origin: "France/Local",
      seasonal: false,
      price: "1,92 €/kg",
      total: "38,40 €",
      badge: null,
    },
    {
      id: "fr8",
      name: "Aubergine Longue Violette",
      gamme: "brut",
      fournisseur: "TRANSGOURMET",
      labels: [],
      origin: "Espagne",
      seasonal: true,
      price: "2,60 €/kg",
      total: "52,00 €",
      badge: null,
    },
    {
      id: "fr9",
      name: "Aubergine Ronde Bio",
      gamme: "brut",
      fournisseur: "CRENO",
      labels: ["Bio"],
      origin: "France",
      seasonal: true,
      price: "3,40 €/kg",
      total: "68,00 €",
      badge: null,
      favori: true,
    },
  ],
  "BOF": [
    {
      id: "bo0",
      name: "Yogourmand Fraise 125g Bio",
      gamme: "préemballé",
      fournisseur: "PRO A PRO",
      labels: ["Bio"],
      origin: "FR",
      seasonal: false,
      price: "0,36 €/pièce",
      total: "7,20 €",
      badge: "Dernier achat",
    },
    {
      id: "bo1",
      name: "Bleu d'Auvergne AOP env 25% MG env 1,5kg",
      gamme: "préemballé",
      fournisseur: "POMONA PASSION FROID",
      labels: ["Issu du..."],
      origin: "France",
      seasonal: false,
      price: "9,52 €/kg",
      total: "190,40 €",
      badge: null,
      favori: true,
    },
    {
      id: "bo2",
      name: "Yaourt Aromatisé Panaché 125g - NOVA",
      gamme: "préemballé",
      fournisseur: "FRANCE FRAIS",
      labels: [],
      origin: "FR",
      seasonal: false,
      price: "0,20 €/pièce",
      total: "4,00 €",
      badge: "Le moins cher",
    },
    {
      id: "bo3",
      name: "Force + Flan vanille nappé caramel Riche en protéine 100g",
      gamme: "préemballé",
      fournisseur: "TRANSGOURMET",
      labels: [],
      origin: "FR",
      seasonal: false,
      price: "0,66 €/pièce",
      total: "13,20 €",
      badge: null,
      marketPublic: true,
      catalog: "Lot marché public BOF",
    },
    {
      id: "bo4",
      name: "Cantal Jeune 30% 30G AOP",
      gamme: "préemballé",
      fournisseur: "PRO A PRO",
      labels: ["Issu du..."],
      origin: "",
      seasonal: false,
      price: "0,43 €/pièce",
      total: "8,60 €",
      badge: null,
    },
    {
      id: "bo5",
      name: "Beurre Sandwich Tendre 1kg",
      gamme: "préemballé",
      fournisseur: "POMONA PASSION FROID",
      labels: [],
      origin: "France",
      seasonal: false,
      price: "8,47 €/kg",
      total: "169,40 €",
      badge: null,
    },
    {
      id: "bo6",
      name: "Oeufs entiers liquides 1L",
      gamme: "préemballé",
      fournisseur: "SYSCO",
      labels: [],
      origin: "Belgique",
      seasonal: false,
      price: null,
      total: null,
      badge: null,
      sansOffre: true,
    },
    {
      id: "bo7",
      name: "Samos env 30%MG 18g",
      gamme: "préemballé",
      fournisseur: "SYSCO",
      labels: [],
      origin: "FR-France",
      seasonal: false,
      price: "0,25 €/pièce",
      total: "5,00 €",
      badge: null,
    },
  ],
  "VPO": [
    {
      id: "vp0",
      name: "Dinde Escalope 130-150g VF",
      gamme: "brut",
      fournisseur: "RESEAU KRILL",
      labels: ["Issu du..."],
      origin: "FR",
      seasonal: false,
      price: "9,52 €/kg",
      total: "190,40 €",
      badge: "Dernier achat",
    },
    {
      id: "vp1",
      name: "Dinde Jambonnette confite 1,6Kg",
      gamme: "brut",
      fournisseur: "POMONA PASSION FROID",
      labels: [],
      origin: "France",
      seasonal: false,
      price: "9,02 €/kg",
      total: "180,40 €",
      badge: null,
      favori: true,
    },
    {
      id: "vp2",
      name: "Boeuf Sauté / Bourguignon collier / basse cOte env 60g UE",
      gamme: "brut",
      fournisseur: "SYSCO",
      labels: [],
      origin: "FR-France",
      seasonal: false,
      price: "16,45 €/kg",
      total: "329,00 €",
      badge: null,
    },
    {
      id: "vp3",
      name: "Dinde Brochette env 130g",
      gamme: "brut",
      fournisseur: "RESEAU KRILL",
      labels: [],
      origin: "FR",
      seasonal: false,
      price: "8,19 €/kg",
      total: "163,80 €",
      badge: null,
      marketPublic: true,
      catalog: "Lot marché public VPO",
    },
    {
      id: "vp4",
      name: "Poulet Cuisse Déjointée 230-260g Halal",
      gamme: "brut",
      fournisseur: "SYSCO",
      labels: ["Issu du..."],
      origin: "UE-Union européenne",
      seasonal: false,
      price: "4,52 €/kg",
      total: "90,40 €",
      badge: "Le moins cher",
    },
    {
      id: "vp5",
      name: "Dinde Filet Émincé Sans os Sans peau env 20g VF",
      gamme: "brut",
      fournisseur: "RESEAU KRILL",
      labels: [],
      origin: "FR",
      seasonal: false,
      price: "6,59 €/kg",
      total: "131,80 €",
      badge: null,
    },
    {
      id: "vp6",
      name: "Dinde Rôti 100% Filet env 2Kg VF",
      gamme: "brut",
      fournisseur: "RESEAU KRILL",
      labels: [],
      origin: "FR",
      seasonal: false,
      price: null,
      total: null,
      badge: null,
      sansOffre: true,
    },
    {
      id: "vp7",
      name: "Boeuf Paleron semi paré env 2Kg UE",
      gamme: "brut",
      fournisseur: "RESEAU KRILL",
      labels: [],
      origin: "UE et ROYAUME-UNI",
      seasonal: false,
      price: "11,65 €/kg",
      total: "233,00 €",
      badge: null,
    },
  ],
  "Epicerie": [
    {
      id: "ep0",
      name: "Savarin Bouchon à Garnir 15g",
      gamme: "préemballé",
      fournisseur: "POMONA EPISAVEURS",
      labels: [],
      origin: "Italie",
      seasonal: false,
      price: "0,21 €/pièce",
      total: "4,20 €",
      badge: "Dernier achat",
    },
    {
      id: "ep1",
      name: "Céleri Coeur 5/1",
      gamme: "préemballé",
      fournisseur: "POMONA EPISAVEURS",
      labels: ["Bio"],
      origin: "UE",
      seasonal: false,
      price: "5,54 €/boîte",
      total: "110,80 €",
      badge: null,
      favori: true,
    },
    {
      id: "ep2",
      name: "Lentilles Corail Sac 2,5Kg",
      gamme: "préemballé",
      fournisseur: "FRANCE FRAIS",
      labels: [],
      origin: "AUTRES",
      seasonal: false,
      price: "2,37 €/kg",
      total: "47,40 €",
      badge: null,
    },
    {
      id: "ep3",
      name: "Poires 1/2 au Naturel 5/1",
      gamme: "préemballé",
      fournisseur: "POMONA EPISAVEURS",
      labels: [],
      origin: "AUTRES",
      seasonal: false,
      price: "9,95 €/boîte",
      total: "199,00 €",
      badge: null,
      marketPublic: true,
      catalog: "Lot marché public Epicerie",
    },
    {
      id: "ep4",
      name: "Ras el hanout 500g",
      gamme: "préemballé",
      fournisseur: "COLIN RHD",
      labels: [],
      origin: "France",
      seasonal: false,
      price: "14,44 €/pièce",
      total: "288,80 €",
      badge: null,
    },
    {
      id: "ep5",
      name: "Poudre de Lait 1/2 écrémé 5Kg",
      gamme: "préemballé",
      fournisseur: "CERCLE VERT",
      labels: ["Issu du..."],
      origin: "FINISTÈRE",
      seasonal: false,
      price: "6,87 €/kg",
      total: "137,40 €",
      badge: null,
    },
    {
      id: "ep6",
      name: "Madeleine aux oeufs 25g",
      gamme: "préemballé",
      fournisseur: "POMONA EPISAVEURS",
      labels: [],
      origin: "FR",
      seasonal: false,
      price: null,
      total: null,
      badge: "Le moins cher",
      sansOffre: true,
    },
    {
      id: "ep7",
      name: "Pêche Oreillon au Naturel  5/1",
      gamme: "préemballé",
      fournisseur: "POMONA EPISAVEURS",
      labels: [],
      origin: "Espagne",
      seasonal: false,
      price: "7,64 €/boîte",
      total: "152,80 €",
      badge: null,
    },
  ],
  "Surgelé": [
    {
      id: "su0",
      name: "Salsifis Coupés 2,5Kg",
      gamme: "surgelé",
      fournisseur: "SYSCO",
      labels: [],
      origin: "UE-Union européenne",
      seasonal: false,
      price: "2,57 €/kg",
      total: "51,40 €",
      badge: "Dernier achat",
    },
    {
      id: "su1",
      name: "Base Paëlla - avec Riz Jaune 2,5Kg",
      gamme: "surgelé",
      fournisseur: "SYSCO",
      labels: ["Issu du..."],
      origin: "UNU-Union européenne / non Union européenne",
      seasonal: false,
      price: "2,10 €/kg",
      total: "42,00 €",
      badge: null,
      favori: true,
    },
    {
      id: "su2",
      name: "Quenelle de volaille 40g",
      gamme: "surgelé",
      fournisseur: "POMONA PASSION FROID",
      labels: ["Bio"],
      origin: "France",
      seasonal: false,
      price: "0,26 €/pièce",
      total: "5,20 €",
      badge: "Le moins cher",
    },
    {
      id: "su3",
      name: "Tartelette Citron Meringuée",
      gamme: "surgelé",
      fournisseur: "SYSCO",
      labels: [],
      origin: "UE-Union européenne",
      seasonal: false,
      price: "1,54 €/boîte",
      total: "30,80 €",
      badge: null,
      marketPublic: true,
      catalog: "Lot marché public Surgelé",
    },
    {
      id: "su4",
      name: "Saumon Fumé Pré Tranché Sans Intercalaire 600-900g",
      gamme: "surgelé",
      fournisseur: "POMONA PASSION FROID",
      labels: [],
      origin: "France",
      seasonal: false,
      price: "24,13 €/kg",
      total: "482,60 €",
      badge: null,
    },
    {
      id: "su5",
      name: "Ananas Cubes 1Kg",
      gamme: "surgelé",
      fournisseur: "FRANCE FRAIS",
      labels: [],
      origin: "",
      seasonal: false,
      price: "4,96 €/kg",
      total: "99,20 €",
      badge: null,
    },
    {
      id: "su6",
      name: "Aiguillette panée de blé cuite 40g",
      gamme: "surgelé",
      fournisseur: "POMONA PASSION FROID",
      labels: [],
      origin: "France",
      seasonal: false,
      price: null,
      total: null,
      badge: null,
      sansOffre: true,
    },
    {
      id: "su7",
      name: "Boeuf Noix de joue entière 400-800g",
      gamme: "surgelé",
      fournisseur: "RESEAU KRILL",
      labels: [],
      origin: "UE et ROYAUME-UNI",
      seasonal: false,
      price: "12,93 €/kg",
      total: "258,60 €",
      badge: null,
    },
  ],
};

// A flat view of every real product across every famille, used so the
// search bar in the match popup can find genuinely different products
// (not just variations of the current aliment).
const GLOBAL_CATALOG = Object.entries(candidatePoolsByFamille).flatMap(([famille, items]) =>
  items.map((item) => ({ ...item, famille }))
);

const CANDIDATE_DESCRIPTORS = [
  "standard",
  "premium",
  "calibre supérieur",
  "origine locale",
  "lot mixte",
  "sélection qualité",
  "format cuisine",
  "alternative",
];

function priceValueOf(c) {
  if (!c.price) return null;
  return parseFloat(c.price.replace(/[^\d.,]/g, "").replace(",", "."));
}

const TOMATE_VARIANT_DATA = [
  { suffix: "séchées", fournisseur: "TRANSGOURMET", labels: [], origin: "Italie", price: "6,20 €/kg", total: "124,00 €" },
  { suffix: "cerise", fournisseur: "VIVALYA", labels: [], origin: "Espagne", price: "4,10 €/kg", total: "82,00 €" },
  { suffix: "ronde", fournisseur: "CRENO", labels: [], origin: "France", price: "2,95 €/kg", total: "59,00 €" },
  { suffix: "sauce tomate provençal", fournisseur: "CERCLE VERT", labels: [], origin: "France", price: "3,50 €/kg", total: "70,00 €" },
  { suffix: "grappe", fournisseur: "POMONA TERRE AZUR", labels: ["Bio"], origin: "France", price: "2,10 €/kg", total: "42,00 €" },
];

const candidatesByAliment = (row) => {
  const pool = candidatePoolsByFamille[row.famille] || candidatePoolsByFamille["Epicerie"];
  const isTomate = row.aliment === "Tomate";
  // Vary how many alternatives are available per aliment (sometimes just 1,
  // sometimes up to 7) so every popup doesn't feel identical.
  const count = isTomate ? TOMATE_VARIANT_DATA.length + 1 : (row.id % 7) + 1;
  const sliced = isTomate
    ? [
        { ...pool[0], name: row.aliment, gamme: row.gamme },
        ...TOMATE_VARIANT_DATA.map((v, i) => ({
          id: `tomate-var-${i}`,
          name: v.suffix.startsWith("sauce") ? "Sauce tomate provençal" : `Tomate ${v.suffix}`,
          gamme: row.gamme,
          fournisseur: v.fournisseur,
          labels: v.labels,
          origin: v.origin,
          seasonal: false,
          price: v.price,
          total: v.total,
          badge: null,
        })),
      ]
    : pool.slice(0, count).map((c, i) => ({
        ...c,
        // Keep the real supplier/price/label data, but rename the product so it
        // reads as a genuine alternative for *this* aliment rather than an
        // unrelated item from the mercuriale.
        name: i === 0 ? row.aliment : `${row.aliment} — ${CANDIDATE_DESCRIPTORS[i % CANDIDATE_DESCRIPTORS.length]}`,
        gamme: row.gamme,
      }));

  // The pinned (index 0) candidate represents *why* this row was matched.
  // A "Marché public" match type means the underlying product genuinely
  // comes from a marché public catalog — that can't be true for one row's
  // pinned product and false for another sharing the same pool item, so we
  // derive it from the row's matchType rather than trusting whatever the
  // pool item happened to carry statically.
  //
  // Beyond that mandatory case, "favori" and "marché public" are independent
  // product attributes that can coexist with any match reason (e.g. a
  // "Dernier achat" match can also happen to be a favori and/or sourced from
  // a marché public catalog). Rows can opt into that via
  // pinnedFavori / pinnedMarketPublic.
  if (sliced[0]) {
    sliced[0].favori = row.matchType === "favori" || !!row.pinnedFavori;
    if (row.matchType === "mp" || row.pinnedMarketPublic) {
      sliced[0].marketPublic = true;
      sliced[0].catalog = sliced[0].catalog || row.pinnedCatalog || `Lot marché public ${row.famille}`;
    } else {
      sliced[0].marketPublic = false;
    }
  }

  // Business rule: Favori (niveau 2) outranks Base/variante (niveau 4) in the
  // auto-match priority order. If this row ended up matched on Base/variante,
  // that means no favori product exists for this aliment — otherwise it
  // would have been matched via Favori instead. So no candidate here should
  // ever show as favori.
  if (row.matchType === "basevariant") {
    sliced.forEach((c) => {
      c.favori = false;
    });
  }

  // The pool's static "Le moins cher" badge may land on an item that isn't
  // even shown for this aliment (or isn't actually cheaper than the pinned
  // match). Recompute it among the visible candidates so the tag always
  // points at a genuinely cheaper option when one is on screen.
  const pinnedPrice = priceValueOf(sliced[0]);
  let cheapest = null;
  sliced.forEach((c, i) => {
    if (i === 0) return;
    const p = priceValueOf(c);
    if (p != null && pinnedPrice != null && p < pinnedPrice) {
      if (!cheapest || p < priceValueOf(cheapest)) cheapest = c;
    }
  });

  return sliced.map((c) => {
    if (c === cheapest) return { ...c, badge: "Le moins cher" };
    if (c.badge === "Le moins cher") return { ...c, badge: null };
    return c;
  });
};

/* ---------------------------------------------------------------------- */
/*  Small style helpers                                                    */
/* ---------------------------------------------------------------------- */

function isFranceOrigin(o) {
  if (!o) return false;
  const u = o.toUpperCase();
  return u === "FR" || u.startsWith("FR-") || u.includes("FRANCE");
}

const FAMILLE_ICON = {
  "Fruits & légumes": Carrot,
  BOF: Milk,
  VPO: Beef,
  Surgelé: Snowflake,
  Epicerie: Wheat,
};

const DAY_COLORS = {
  0: "#DC2F6B", // Dimanche
  1: "#DC752C", // Lundi
  2: "#DC2F2C", // Mardi
  3: "#662CDB", // Mercredi
  4: "#3273DB", // Jeudi
  5: "#AC27C3", // Vendredi
  6: "#302CDC", // Samedi
};

function dayColorFor(dateStr) {
  if (!dateStr) return null;
  const [d, m] = dateStr.split("/").map(Number);
  if (!d || !m) return null;
  const date = new Date(2026, m - 1, d);
  return DAY_COLORS[date.getDay()];
}

function labelStyle(label) {
  if (!label) return null;
  if (label === "Bio") return T.green;
  if (label.startsWith("Issu du")) return T.violet;
  return { badge: "#e7e7e7", text: "#5a5f66" };
}

const LABEL_FULL_TEXT = {
  "Issu du...": "Issu du commerce équitable",
};

function LabelBadge({ label, className = "px-2 py-0.5 rounded-full text-[11px] font-semibold" }) {
  const s = labelStyle(label);
  const full = LABEL_FULL_TEXT[label];
  const badge = (
    <span className={className} style={{ background: s.badge, color: s.text }}>
      {label}
    </span>
  );
  return full ? <Tooltip text={full}>{badge}</Tooltip> : badge;
}

const matchStyle = {
  historique: { c: T.matchHistorique, icon: History, label: "Match historique" },
  favori: { c: T.matchAuto, icon: Star, label: "Produit favori" },
  mp: { c: T.matchAuto, icon: Store, label: "Produit issu d'un marché public" },
  basevariant: { c: T.matchAuto, icon: Shuffle, label: "Produit similaire" },
  manuel: { c: T.matchHistorique, icon: Pencil, label: "Match manuel" },
  none: { c: T.rose, icon: X, label: "Sans match" },
};

const MATCH_TYPE_BADGE_TEXT = {
  historique: "Dernier achat",
  favori: "Produit favori",
  mp: "Produit issu d'un marché public",
  basevariant: "Produit similaire",
  manuel: "Sélection manuelle",
};

function Pill({ children, active, onClick, className = "" }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-[13px] border bg-white hover:bg-gray-50 transition-colors flex items-center gap-1.5 whitespace-nowrap ${className}`}
      style={{ borderColor: active ? T.teal : T.border, color: active ? T.teal : "#33383f" }}
    >
      {children}
    </button>
  );
}

function Dropdown({ label, value, options, onChange, width = "w-44", placeholder = "" }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    function onDoc(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);
  const current = options.find((o) => o.value === value);
  return (
    <div className="relative" ref={ref}>
      <Pill onClick={() => setOpen((o) => !o)} active={open}>
        {label ? (
          <>
            {label}
            {current && current.value !== "tous" ? `: ${current.label}` : ""}
          </>
        ) : (
          current?.label || placeholder
        )}
        <ChevronDown size={14} />
      </Pill>
      {open && (
        <div
          className={`absolute z-30 mt-1 ${width} bg-white border rounded-xl shadow-lg py-1 overflow-hidden`}
          style={{ borderColor: T.border }}
        >
          {options.map((o) => (
            <button
              key={o.value}
              onClick={() => {
                onChange(o.value);
                setOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-[13px] hover:bg-gray-50 flex items-center justify-between"
            >
              {o.label}
              {o.value === value && <Check size={14} color={T.teal} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function Tooltip({ text, children, className = "" }) {
  const [show, setShow] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const ref = useRef(null);

  function open() {
    const r = ref.current?.getBoundingClientRect();
    if (r) setPos({ top: r.bottom, left: r.left + r.width / 2 });
    setShow(true);
  }
  function close() {
    setShow(false);
  }

  if (!text) return children;

  return (
    <span
      ref={ref}
      className={`relative inline-flex ${className}`}
      onMouseEnter={open}
      onMouseLeave={close}
      onFocus={open}
      onBlur={close}
    >
      {children}
      {show && (
        <span
          className="pointer-events-none fixed whitespace-normal"
          style={{
            top: pos.top + 8,
            left: pos.left,
            transform: "translateX(-50%)",
            width: "max-content",
            maxWidth: 240,
            background: "#53565c",
            color: "#ffffff",
            fontSize: "13px",
            lineHeight: 1.4,
            padding: "10px 14px",
            borderRadius: "14px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
            zIndex: 9999,
            display: "block",
          }}
        >
          {text}
        </span>
      )}
    </span>
  );
}

function MultiSelect({ label, options, optionLabels, optionColors, disabledOptions, selected, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    function onDoc(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);
  function toggle(val) {
    onChange(selected.includes(val) ? selected.filter((v) => v !== val) : [...selected, val]);
  }
  return (
    <div className="relative" ref={ref}>
      <Pill onClick={() => setOpen((o) => !o)} active={open || selected.length > 0}>
        {label}
        {selected.length > 0 ? ` (${selected.length})` : ""}
        <ChevronDown size={14} />
      </Pill>
      {open && (
        <div
          className="absolute z-30 mt-1 w-56 bg-white border rounded-xl shadow-lg py-1"
          style={{ borderColor: T.border }}
        >
          {options.map((o) => {
            const isDisabled = disabledOptions?.includes(o);
            return (
              <label
                key={o}
                className={`flex items-center gap-2 px-3 py-2 text-[13px] ${
                  isDisabled ? "text-gray-300 cursor-not-allowed" : "hover:bg-gray-50 cursor-pointer"
                }`}
              >
                <input
                  type="checkbox"
                  disabled={isDisabled}
                  style={{ accentColor: T.teal }}
                  checked={selected.includes(o)}
                  onChange={() => toggle(o)}
                />
                {optionColors?.[o] && (
                  <span
                    className="w-2.5 h-2.5 rounded-full inline-block shrink-0"
                    style={{ background: optionColors[o] }}
                  />
                )}
                {optionLabels?.[o] || o}
              </label>
            );
          })}
          {selected.length > 0 && (
            <button
              onClick={() => onChange([])}
              className="w-full text-left px-3 py-2 text-[12.5px] text-gray-400 hover:text-gray-700 border-t"
              style={{ borderColor: T.border }}
            >
              Réinitialiser
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function MatchBadge({ row, onClick, active }) {
  if (row.matchType === "none") {
    return (
      <button
        onClick={onClick}
        className="inline-flex items-center gap-1.5 pl-3 pr-3 py-1 rounded-full text-[13px] font-semibold"
        style={{
          background: T.rose.badge,
          color: T.rose.text,
          border: active ? `2px solid ${T.rose.text}` : "2px solid transparent",
        }}
      >
        Aucun produit
      </button>
    );
  }
  const s = matchStyle[row.matchType];
  return (
    <Tooltip text={s.label}>
      <button
        onClick={onClick}
        className="inline-flex items-center gap-1.5 pl-3 pr-3 py-1 rounded-full text-[13px] font-semibold hover:opacity-80"
        style={{
          background: active ? shade(s.c.badge, -12) : s.c.badge,
          color: s.c.text,
          border: active ? `2px solid ${s.c.text}` : "2px solid transparent",
        }}
      >
        {row.matchProduct}, {row.matchGamme}
      </button>
    </Tooltip>
  );
}

function shade(hex, percent) {
  const num = parseInt(hex.replace("#", ""), 16);
  const amt = Math.round(2.55 * percent);
  let r = (num >> 16) + amt;
  let g = ((num >> 8) & 0x00ff) + amt;
  let b = (num & 0x0000ff) + amt;
  r = Math.max(0, Math.min(255, r));
  g = Math.max(0, Math.min(255, g));
  b = Math.max(0, Math.min(255, b));
  return `#${(0x1000000 + r * 0x10000 + g * 0x100 + b).toString(16).slice(1)}`;
}

/* ---------------------------------------------------------------------- */
/*  Match popup ("Changer de match")                                       */
/* ---------------------------------------------------------------------- */

const GRAY = { badge: "#eeeeee", text: "#5a5f66" };

function CandidateCard({ c, row, selected, onSelect, onViewMore, pinned }) {
  const showOrigin = c.origin && !["AUTRE", "AUTRES"].includes(c.origin.toUpperCase());
  const matchInfo = pinned && row.matchType && row.matchType !== "none" ? matchStyle[row.matchType] : null;
  return (
    <div
      onClick={onSelect}
      className="flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors hover:bg-gray-50"
      style={{
        borderColor: selected ? T.teal : T.border,
        background: selected ? "#f5fbf8" : "#ffffff",
      }}
    >
      <input
        type="radio"
        name="candidate"
        readOnly
        style={{ accentColor: T.teal }}
        checked={selected}
        className="pointer-events-none"
      />
      <div className="w-14 h-14 rounded-lg bg-gray-200 flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="text-[12px]">
          <span
            className="text-[14px] font-semibold hover:underline"
            onClick={(e) => {
              e.stopPropagation();
              onViewMore?.(c);
            }}
          >
            {c.name}
          </span>{" "}
          <span className="italic text-gray-500">{c.gamme}</span>{" "}
          <span className="text-gray-500">| {c.fournisseur}</span>
        </div>
        <div className="text-[14px] font-normal mt-1 flex items-center gap-1.5" style={{ color: "#1f2430" }}>
          {c.sansOffre ? (
            <span
              className="px-2 py-0.5 rounded-full text-[12px] font-semibold"
              style={{ background: T.rose.badge, color: T.rose.text }}
            >
              Sans offre
            </span>
          ) : (
            <>
              {c.price}
              {c.marketPublic && (
                <Tooltip text="Ce produit est issu d'un marché public">
                  <MarketPublicIcon size={20} />
                </Tooltip>
              )}
              {c.marketPublic && (
                <span className="text-[12px] font-normal text-gray-400">| {c.catalog}</span>
              )}
            </>
          )}
        </div>
        <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
          {c.labels?.map((l) => (
            <LabelBadge key={l} label={l} className="px-2 py-0.5 rounded-full text-[12px] font-semibold" />
          ))}
          {row.alimentLabel && !c.labels?.includes(row.alimentLabel) && (
            <Tooltip text="Le label du produit matché est différent du label ingrédient">
              <AlertTriangle size={13} color={T.amberDark} />
            </Tooltip>
          )}
          {showOrigin && (
            <span
              className="px-2 py-0.5 rounded-full text-[12px] font-semibold inline-flex items-center gap-1"
              style={{ background: GRAY.badge, color: GRAY.text }}
            >
              {isFranceOrigin(c.origin) ? (
                <>
                  <span aria-hidden="true">🇫🇷</span> France
                </>
              ) : (
                c.origin
              )}
            </span>
          )}
          {c.seasonal && (
            <span
              className="px-2 py-0.5 rounded-full text-[12px] font-semibold"
              style={{ background: T.green.badge, color: T.green.text }}
            >
              De saison
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-col items-end self-start flex-shrink-0">
        <div style={{ height: "20px", display: "flex", alignItems: "center" }}>
          {c.favori && (
            <Tooltip text="Produit en favori">
              <Star size={16} color="#9aa0a6" fill="#9aa0a6" />
            </Tooltip>
          )}
        </div>
        <div style={{ height: "20px", marginTop: "4px" }} />
        <div style={{ marginTop: "6px" }}>
        {matchInfo ? (
          <span
            className="px-2 py-0.5 rounded-full text-[12px] font-semibold whitespace-nowrap inline-flex items-center"
            style={{ background: matchInfo.c.badge, color: matchInfo.c.text }}
          >
            {MATCH_TYPE_BADGE_TEXT[row.matchType]}
          </span>
        ) : (
          c.badge && (
            <span
              className="px-2 py-0.5 rounded-full text-[12px] font-semibold whitespace-nowrap inline-flex items-center gap-1"
              style={
                c.badge === "Dernier achat"
                  ? { background: T.matchHistorique.badge, color: T.matchHistorique.text }
                  : c.badge === "Le moins cher"
                  ? { background: "#FCEACB", color: T.amberDark }
                  : { background: GRAY.badge, color: GRAY.text }
              }
            >
              {c.badge === "Le moins cher" && <Coins size={12} color={T.amberDark} />}
              {c.badge}
            </span>
          )
        )}
        </div>
      </div>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-44 shrink-0 text-gray-500">{label} :</div>
      <div className="font-medium text-gray-800 min-w-0">{value}</div>
    </div>
  );
}

function ProductSheet({ candidate, row, onBack, onClose, onMatch }) {
  const c = candidate;
  const showOrigin = c.origin && !["AUTRE", "AUTRES"].includes(c.origin.toUpperCase());
  const originText = showOrigin ? (isFranceOrigin(c.origin) ? "France" : c.origin) : "-";

  return (
    <div
      className="fixed inset-0 flex justify-end"
      style={{ background: "rgba(0,0,0,0.3)", zIndex: 60 }}
      onClick={onClose}
    >
      <div
        className="bg-white h-full shadow-2xl flex flex-col"
        style={{ width: "100%", maxWidth: "900px" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-6 pt-5 pb-4 border-b shrink-0"
          style={{ borderColor: T.border }}
        >
          <div className="flex items-center gap-3 min-w-0">
            <button onClick={onBack} className="text-gray-400 hover:text-gray-700 shrink-0">
              <ArrowLeft size={20} />
            </button>
            <h2 className="text-[15px] font-bold tracking-wide truncate">
              FICHE PRODUIT : {c.name.toUpperCase()}
            </h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 shrink-0">
            <X size={20} />
          </button>
        </div>

        <div className="overflow-y-auto flex-1 min-h-0 px-6 py-5">
          {/* Top card: photo + offer */}
          <div className="flex gap-6 flex-wrap">
            <div className="w-56 h-40 rounded-xl bg-gray-100 flex-shrink-0" />
            <div className="flex-1 min-w-[200px] pt-1">
              <span
                className="inline-block px-3 py-1 rounded-full text-[12px] font-medium"
                style={{ background: "#f0f0f0", color: "#5a5f66" }}
              >
                {c.marketPublic ? c.catalog : "Catalogue de la cuisine"}
              </span>
              <div className="mt-3 text-[15px]">
                Offre : <span className="font-bold">{c.price || "-"}</span>
                {c.total && (
                  <>
                    {" "}
                    <span className="text-gray-400">|</span>{" "}
                    <span className="italic text-gray-500">Soit {c.total}</span>
                  </>
                )}
              </div>
              <div className="text-[12px] italic text-gray-500 mt-1">TVA : 5,5 %</div>
              <div className="text-[12px] italic text-gray-400 mt-2">Dernière mise à jour : -</div>
            </div>
          </div>

          {/* Informations produits */}
          <div className="mt-8">
            <div className="flex items-center justify-between">
              <h3 className="text-[13px] font-bold tracking-wide text-gray-700">
                INFORMATIONS PRODUITS
              </h3>
              <div className="flex items-center gap-2">
                <button
                  className="w-8 h-8 rounded-full border flex items-center justify-center text-gray-400 hover:text-gray-600"
                  style={{ borderColor: T.border }}
                >
                  <RefreshCw size={14} />
                </button>
                <button
                  className="w-8 h-8 rounded-full border flex items-center justify-center text-gray-400 hover:text-gray-600"
                  style={{ borderColor: T.border }}
                >
                  <Pencil size={14} />
                </button>
              </div>
            </div>
            <div className="mt-4 space-y-3 text-[13px]">
              <InfoRow label="Nom du produit" value={c.name} />
              <InfoRow label="Code produit" value="-" />
              <InfoRow label="Gamme du produit" value={c.gamme || "-"} />
              <InfoRow label="Origine" value={originText} />
              <InfoRow
                label="Labels"
                value={
                  c.labels?.length ? (
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {c.labels.map((l) => (
                        <LabelBadge key={l} label={l} />
                      ))}
                    </div>
                  ) : (
                    "-"
                  )
                }
              />
              <InfoRow label="Nom fournisseur" value={c.fournisseur || "-"} />
              <InfoRow label="Aliment / Variante" value={row.aliment} />
              <InfoRow
                label="Saisonnalité"
                value={
                  c.seasonal ? (
                    <span
                      className="inline-flex items-center justify-center rounded-full"
                      style={{ width: 22, height: 22, background: T.green.badge }}
                    >
                      <Sun size={13} color={T.green.text} />
                    </span>
                  ) : (
                    "-"
                  )
                }
              />
              <InfoRow label="Marque" value="-" />
              <InfoRow label="Version" value="-" />
            </div>
          </div>

          {/* Allergènes */}
          <div className="mt-8">
            <h3 className="text-[13px] font-bold tracking-wide text-gray-700">ALLERGÈNES</h3>
            <div className="mt-4 space-y-3 text-[13px]">
              <InfoRow label="Allergène" value="-" />
              <InfoRow label="Traces" value="-" />
            </div>
          </div>

          {/* Conditionnement */}
          <div className="mt-8 mb-2">
            <h3 className="text-[13px] font-bold tracking-wide text-gray-700">CONDITIONNEMENT</h3>
            <div className="mt-4 space-y-3 text-[13px]">
              <InfoRow label="Conditionnement" value="-" />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className="px-6 py-4 border-t shrink-0 flex items-center justify-between"
          style={{ borderColor: T.border }}
        >
          <button
            className="px-4 py-2 rounded-full border text-[13px] font-semibold"
            style={{ borderColor: T.rose.text, color: T.rose.text }}
          >
            Désactiver le produit
          </button>
          <button
            onClick={onMatch}
            className="px-5 py-2 rounded-full text-[13px] font-semibold"
            style={{ background: T.amber, color: "#1f2430" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = T.amberDark)}
            onMouseLeave={(e) => (e.currentTarget.style.background = T.amber)}
          >
            Matcher ce produit
          </button>
        </div>
      </div>
    </div>
  );
}

function MatchPopup({ row, onClose, onConfirm, onViewProduct }) {
  const candidates = useMemo(() => candidatesByAliment(row), [row.id, row.famille, row.aliment, row.gamme]);
  const [selectedId, setSelectedId] = useState(() => {
    if (!row.matchProduct) return null;
    if (row.matchType === "manuel") {
      const foundLocal = candidates.find(
        (c) => c.name === row.matchProduct && c.fournisseur === row.fournisseur
      );
      if (foundLocal) return foundLocal.id;
      const foundGlobal = GLOBAL_CATALOG.find(
        (c) => c.name === row.matchProduct && c.fournisseur === row.fournisseur
      );
      if (foundGlobal) return foundGlobal.id;
    }
    return candidates[0]?.id ?? null;
  });
  const [etat, setEtat] = useState(row.etat);
  const [applyAll, setApplyAll] = useState(false);
  function toggleSelect(id) {
    const newId = selectedId === id ? null : id;
    setSelectedId(newId);
    const chosen =
      candidates.find((c) => c.id === newId) ||
      GLOBAL_CATALOG.find((c) => c.id === newId) ||
      null;
    onConfirm({ chosen, etat, applyAll });
  }
  const [search, setSearch] = useState("");

  const [sortBy, setSortBy] = useState("alpha");
  const [fFavori, setFFavori] = useState(false);
  const [fFournisseur, setFFournisseur] = useState([]);
  const [fTarif, setFTarif] = useState([]);
  const [fGamme, setFGamme] = useState([]);
  const [fOrigine, setFOrigine] = useState([]);
  const [fLabel, setFLabel] = useState([]);

  const searchActive = search.trim().length > 0;
  const basePool = searchActive ? GLOBAL_CATALOG : candidates;

  const fournisseurOptions = useMemo(
    () => [...new Set(basePool.map((c) => c.fournisseur).filter(Boolean))],
    [basePool]
  );
  const gammeOptions = useMemo(
    () => [...new Set(basePool.map((c) => c.gamme).filter(Boolean))],
    [basePool]
  );
  function normalizeOrigin(o) {
    if (!o) return "";
    if (["AUTRE", "AUTRES"].includes(o.toUpperCase())) return "";
    if (isFranceOrigin(o)) return "France";
    return o;
  }
  const origineOptions = useMemo(
    () => [...new Set(basePool.map((c) => normalizeOrigin(c.origin)).filter(Boolean))],
    [basePool]
  );
  const labelOptions = useMemo(
    () => [...new Set(basePool.flatMap((c) => c.labels || []))],
    [basePool]
  );
  const tarifOptions = [
    "Prix marché public",
    "Prix centrale d'achat",
    "Prix fournisseur",
    "Prix cuisine",
    "Produits sans offre",
  ];

  function inTarifBucket(c, bucket) {
    // Only 3 buckets are wired up for this prototype; the other two are
    // shown for completeness but don't filter anything yet.
    if (bucket === "Prix marché public") return !!c.marketPublic;
    if (bucket === "Produits sans offre") return !!c.sansOffre;
    if (bucket === "Prix cuisine") return !c.marketPublic && !c.sansOffre;
    return true;
  }

  const filtered = basePool
    .filter((c) => {
      if (fFavori && !c.favori) return false;
      if (search && !c.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (fFournisseur.length > 0 && !fFournisseur.includes(c.fournisseur)) return false;
      if (fGamme.length > 0 && !fGamme.includes(c.gamme)) return false;
      if (fOrigine.length > 0 && !fOrigine.includes(normalizeOrigin(c.origin))) return false;
      if (fLabel.length > 0 && !(c.labels || []).some((l) => fLabel.includes(l))) return false;
      if (fTarif.length > 0 && !fTarif.some((b) => inTarifBucket(c, b))) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "price") {
        const pa = priceValueOf(a);
        const pb = priceValueOf(b);
        if (pa == null && pb == null) return 0;
        if (pa == null) return 1;
        if (pb == null) return -1;
        return pa - pb;
      }
      return a.name.localeCompare(b.name);
    });

  const pinnedCandidate =
    candidates.find((c) => c.id === selectedId) || GLOBAL_CATALOG.find((c) => c.id === selectedId);
  const isFiltering = !!(search || fFavori || fFournisseur.length || fGamme.length || fOrigine.length || fLabel.length || fTarif.length);
  const hadMatch = !!row.matchProduct;
  const showSuggestions = hadMatch || isFiltering;

  return (
    <div
      className="fixed top-0 right-0 h-full bg-white shadow-2xl flex flex-col z-50"
      style={{ width: "100%", maxWidth: "900px" }}
    >
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b shrink-0" style={{ borderColor: T.border }}>
          <h2 className="text-[15px] font-bold tracking-wide">CHANGER DE MATCH</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <div className="px-6 pt-4 flex items-center gap-2 shrink-0">
          <Dropdown
            label=""
            value={etat}
            onChange={setEtat}
            width="w-40"
            options={[
              { value: "En stock", label: "En stock" },
              { value: "À traiter", label: "À traiter" },
              { value: "Commandé", label: "Commandé" },
            ]}
          />
          <span
            className="px-3 py-1.5 rounded-full text-[13px] border bg-white"
            style={{ borderColor: T.border }}
          >
            Livraison le : {row.dateLivraison || "—"}
          </span>
        </div>

        {/* Aliment info banner */}
        <div className="mx-6 mt-4 rounded-xl px-4 py-3 bg-gray-50 border shrink-0" style={{ borderColor: T.border }}>
          <div className="flex items-center gap-2 font-semibold text-[14px]">
            {row.aliment}, {row.gamme}
            {row.alimentLabel && <LabelBadge label={row.alimentLabel} />}
          </div>
          <div className="text-[11px] text-gray-500 mt-1">
            {(() => {
              const allSame = (arr) => arr.every((v) => v === arr[0]);
              let recetteNode = row.recette;
              let prodNode = row.dateProd;
              let consoNode = "12/12";

              if (row.subRows) {
                const recettes = row.subRows.map((s) => s.recette);
                const prods = row.subRows.map((s) => s.dateProd);
                const consos = row.subRows.map((s) => s.dateConso || "12/12");

                recetteNode = allSame(recettes) ? (
                  recettes[0]
                ) : (
                  <Tooltip text={`Recettes : ${recettes.join(", ")}`}>
                    <span className="underline decoration-dotted">Multi</span>
                  </Tooltip>
                );
                prodNode = allSame(prods) ? (
                  prods[0]
                ) : (
                  <Tooltip text={row.subRows.map((s) => `${s.recette} : ${s.dateProd}`).join(" · ")}>
                    <span className="underline decoration-dotted">Multi</span>
                  </Tooltip>
                );
                consoNode = allSame(consos) ? (
                  consos[0]
                ) : (
                  <Tooltip
                    text={row.subRows.map((s) => `${s.recette} : ${s.dateConso || "12/12"}`).join(" · ")}
                  >
                    <span className="underline decoration-dotted">Multi</span>
                  </Tooltip>
                );
              }

              return (
                <>
                  {recetteNode} · Production le : {prodNode} · Consommation le : {consoNode}
                </>
              );
            })()}
          </div>
        </div>

        {/* Search + sort + filters */}
        <div className="mx-6 mt-4 py-4 rounded-2xl shrink-0" style={{ background: T.tealBar }}>
          <div className="relative px-3">
            <Search size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher un produit, code produit..."
              className="w-full pl-9 pr-3 py-2.5 rounded-full border text-[13px] outline-none focus:border-gray-400 bg-white"
              style={{ borderColor: T.border }}
            />
          </div>
          <div className="flex items-center justify-between gap-2 mt-3 px-3">
            <div className="flex flex-wrap items-center gap-2">
              <Dropdown
                label=""
                value={sortBy}
                onChange={setSortBy}
                width="w-56"
                options={[
                  { value: "alpha", label: "A → Z" },
                  { value: "price", label: "Prix/kg le moins cher" },
                ]}
              />
              <span className="h-5 w-px bg-gray-300" />
              <Pill active={fFavori} onClick={() => setFFavori((v) => !v)}>
                <Star size={13} fill={fFavori ? T.teal : "none"} />
                Favoris
              </Pill>
              <MultiSelect label="Fournisseur" options={fournisseurOptions} selected={fFournisseur} onChange={setFFournisseur} />
              <MultiSelect
                label="Tarif"
                options={tarifOptions}
                disabledOptions={["Prix fournisseur", "Prix centrale d'achat"]}
                selected={fTarif}
                onChange={setFTarif}
              />
              <MultiSelect label="Gamme" options={gammeOptions} selected={fGamme} onChange={setFGamme} />
              <MultiSelect label="Origine" options={origineOptions} selected={fOrigine} onChange={setFOrigine} />
              <MultiSelect
                label="Label"
                options={labelOptions}
                optionLabels={LABEL_FULL_TEXT}
                selected={fLabel}
                onChange={setFLabel}
              />
            </div>
            <button
              className="px-4 py-1.5 rounded-full text-[13px] font-bold bg-white shrink-0"
              style={{ marginLeft: "40px" }}
            >
              Explorer les produits
            </button>
          </div>
        </div>

        {/* Product list (scrollable, up to 25) */}
        <div className="px-6 mt-3 overflow-y-auto flex-1 pb-2 min-h-0">
          <div className="pb-2">
            {!showSuggestions ? (
              <div className="text-center py-10 px-4">
                <div className="text-[13px] font-semibold text-gray-500">
                  Aucun produit ne correspond automatiquement à cet aliment
                </div>
                <div className="text-[12px] text-gray-400 mt-1.5">
                  Utilisez la recherche ou les filtres ci-dessus pour trouver un produit manuellement.
                </div>
              </div>
            ) : (
              (() => {
                const selectedIncludedNaturally = filtered.some((c) => c.id === selectedId);
                if (!pinnedCandidate || selectedIncludedNaturally) {
                  return (
                    <div className="space-y-2">
                      {filtered.map((c) => (
                        <CandidateCard
                          key={c.id}
                          c={c}
                          row={row}
                          selected={c.id === selectedId}
                          onSelect={() => toggleSelect(c.id)}
                          onViewMore={onViewProduct}
                          pinned={c.id === selectedId}
                        />
                      ))}
                    </div>
                  );
                }
                return (
                  <>
                    <div className="pb-3 mb-2 border-b" style={{ borderColor: T.border }}>
                      <CandidateCard
                        c={pinnedCandidate}
                        row={row}
                        selected={true}
                        onSelect={() => toggleSelect(pinnedCandidate.id)}
                        onViewMore={onViewProduct}
                        pinned={true}
                      />
                      <div className="text-[11px] text-gray-400 mt-1.5 px-1">
                        Produit sélectionné — affiché même hors recherche/filtres
                      </div>
                    </div>
                    <div className="space-y-2">
                      {filtered
                        .filter((c) => c.id !== selectedId)
                        .map((c) => (
                          <CandidateCard
                            key={c.id}
                            c={c}
                            row={row}
                            selected={false}
                            onSelect={() => toggleSelect(c.id)}
                            onViewMore={onViewProduct}
                          />
                        ))}
                    </div>
                  </>
                );
              })()
            )}
          </div>
        </div>

        {/* Footer */}
        {!row.__isSubRow && (
          <div className="px-6 py-4 border-t shrink-0 flex items-center justify-between gap-4" style={{ borderColor: T.border }}>
            <label className="flex items-center gap-2 text-[13px] text-gray-600 cursor-pointer">
              <input
                type="checkbox"
                checked={applyAll}
                onChange={(e) => setApplyAll(e.target.checked)}
                style={{ accentColor: T.teal }}
              />
              Appliquer ce match à tous les aliments "{row.aliment}" ayant la même gamme
            </label>
            {pinnedCandidate && (
              <button
                onClick={() => toggleSelect(pinnedCandidate.id)}
                className="px-4 py-2 rounded-full border text-[13px] font-semibold inline-flex items-center gap-1.5 whitespace-nowrap hover:opacity-80"
                style={{ borderColor: T.rose.text, color: T.rose.text }}
              >
                <Trash2 size={14} />
                Retirer le match
              </button>
            )}
          </div>
        )}
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/*  Main app                                                                */
/* ---------------------------------------------------------------------- */

export default function App() {
  const [page, setPage] = useState("matching"); // "matching" | "recettes"
  const [rows, setRows] = useState(initialRows);
  const [selected, setSelected] = useState([]);
  const [expandedGroups, setExpandedGroups] = useState(new Set());
  const [hoveredRowKey, setHoveredRowKey] = useState(null);
  const [showRulesInfo, setShowRulesInfo] = useState(false);
  function toggleGroup(id) {
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }
  function toggleSubRowVerified(groupId, idx) {
    setRows((rs) =>
      rs.map((r) =>
        r.id === groupId
          ? { ...r, subRows: r.subRows.map((s, i) => (i === idx ? { ...s, verified: !s.verified } : s)) }
          : r
      )
    );
  }
  function toggleGroupVerified(r) {
    const allVerified = r.subRows.every((s) => s.verified);
    setRows((rs) =>
      rs.map((row) =>
        row.id === r.id
          ? { ...row, verified: !allVerified, subRows: row.subRows.map((s) => ({ ...s, verified: !allVerified })) }
          : row
      )
    );
  }
  function setSubRowEtat(groupId, idx, value) {
    setRows((rs) =>
      rs.map((r) =>
        r.id === groupId
          ? { ...r, subRows: r.subRows.map((s, i) => (i === idx ? { ...s, etat: value } : s)) }
          : r
      )
    );
  }
  const [popupRowId, setPopupRowId] = useState(null);
  const [popupSubTarget, setPopupSubTarget] = useState(null); // { groupId, subIndex } | null

  function parseEuro(str) {
    if (!str) return 0;
    return parseFloat(str.replace(/[^\d.,]/g, "").replace(",", ".")) || 0;
  }
  function formatEuro(n) {
    return n.toFixed(2).replace(".", ",") + " €";
  }
  function parseQty(str) {
    if (!str) return { value: 0, unit: "kg" };
    const m = str.match(/([\d.,]+)\s*(.*)/);
    return { value: m ? parseFloat(m[1].replace(",", ".")) || 0 : 0, unit: m ? m[2] : "kg" };
  }
  function formatQty(value, unit) {
    return value.toFixed(2).replace(".", ",") + " " + unit;
  }
  const [toast, setToast] = useState(null);

  const [sortBy, setSortBy] = useState("aliment");
  const [fournisseursFilter, setFournisseursFilter] = useState([]);
  const [matchFilter, setMatchFilter] = useState([]);
  const [etatFilter, setEtatFilter] = useState([]);
  const [familles, setFamilles] = useState([]);
  const [search, setSearch] = useState("");

  const [bulkEtat, setBulkEtat] = useState(null);
  const [bulkDate, setBulkDate] = useState(null);

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  }

  const filteredRows = rows
    .filter((r) => {
      if (fournisseursFilter.length > 0 && !fournisseursFilter.includes(r.fournisseur)) return false;
      if (etatFilter.length > 0 && !etatFilter.includes(r.etat)) return false;
      if (familles.length > 0 && !familles.includes(r.famille)) return false;
      if (matchFilter.length > 0) {
        const group =
          r.matchType === "historique"
            ? "historique"
            : r.matchType === "none"
            ? "none"
            : "automatique";
        if (!matchFilter.includes(group)) return false;
      }
      if (search && !`${r.aliment} ${r.matchProduct || ""}`.toLowerCase().includes(search.toLowerCase()))
        return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "aliment") return a.aliment.localeCompare(b.aliment);
      if (sortBy === "recette") return a.recette.localeCompare(b.recette);
      return 0;
    });

  function toggleRow(id) {
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  }
  function toggleAll() {
    if (selected.length === filteredRows.length) setSelected([]);
    else setSelected(filteredRows.map((r) => r.id));
  }
  function toggleVerified(id) {
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, verified: !r.verified } : r)));
  }
  function setRowEtat(id, val) {
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, etat: val } : r)));
  }

  function applyBulkEtat(val) {
    setRows((rs) => rs.map((r) => (selected.includes(r.id) ? { ...r, etat: val } : r)));
    showToast(`État changé pour ${selected.length} produit(s)`);
    setSelected([]);
  }
  function applyBulkDate(val) {
    setRows((rs) => rs.map((r) => (selected.includes(r.id) ? { ...r, dateLivraison: val } : r)));
    showToast(`Date de livraison mise à jour pour ${selected.length} produit(s)`);
    setSelected([]);
  }

  const popupGroupForSub = popupSubTarget ? rows.find((r) => r.id === popupSubTarget.groupId) : null;
  const popupSub = popupGroupForSub ? popupGroupForSub.subRows[popupSubTarget.subIndex] : null;
  const popupRow = popupSub
    ? {
        ...popupGroupForSub,
        id: popupGroupForSub.id * 1000 + popupSubTarget.subIndex + 1,
        subRows: undefined,
        recette: popupSub.recette,
        dateLivraison: popupSub.dateLivraison,
        dateProd: popupSub.dateProd,
        etat: popupSub.etat,
        besoinMenu: popupSub.besoinMenu,
        prixTotal: popupSub.prixTotal,
        verified: popupSub.verified,
        __isSubRow: true,
        __groupId: popupGroupForSub.id,
        __subIndex: popupSubTarget.subIndex,
      }
    : rows.find((r) => r.id === popupRowId);
  const [productSheet, setProductSheet] = useState(null); // { candidate, row } | null

  function closeMatchPopup() {
    setPopupRowId(null);
    setPopupSubTarget(null);
  }

  function confirmMatch({ chosen, etat, applyAll }) {
    if (popupRow?.__isSubRow) {
      const groupId = popupRow.__groupId;
      const subIndex = popupRow.__subIndex;

      setRows((rs) => {
        const groupIdx = rs.findIndex((r) => r.id === groupId);
        if (groupIdx === -1) return rs;
        const group = rs[groupIdx];
        const sub = group.subRows[subIndex];
        const remaining = group.subRows.filter((_, i) => i !== subIndex);

        // The detached recipe becomes its own standalone top-level row.
        const newId = Math.max(0, ...rs.map((r) => r.id)) + 1;
        const detachedRow = {
          ...group,
          id: newId,
          subRows: undefined,
          recette: sub.recette,
          dateLivraison: sub.dateLivraison,
          dateProd: sub.dateProd,
          etat,
          besoinMenu: sub.besoinMenu,
          prixTotal: sub.prixTotal,
          verified: sub.verified,
          matchType: chosen ? "manuel" : "none",
          matchProduct: chosen ? chosen.name : null,
          matchGamme: chosen ? chosen.gamme : null,
          fournisseur: chosen ? chosen.fournisseur : "",
          produitLabel: chosen ? chosen.labels?.[0] || "" : "",
          prixUnitaire: chosen ? chosen.price || null : null,
          sansOffre: chosen ? !!chosen.sansOffre : false,
          moinsCher: chosen ? chosen.badge === "Le moins cher" : false,
        };

        const newRows = [...rs];

        if (remaining.length <= 1) {
          // Down to one recipe (or zero) — dissolve the group back into a normal row.
          if (remaining.length === 1) {
            const only = remaining[0];
            newRows[groupIdx] = {
              ...group,
              subRows: undefined,
              recette: only.recette,
              dateLivraison: only.dateLivraison,
              dateProd: only.dateProd,
              etat: only.etat,
              besoinMenu: only.besoinMenu,
              prixTotal: only.prixTotal,
              verified: only.verified,
            };
          } else {
            newRows.splice(groupIdx, 1);
          }
        } else {
          // Still a group — recompute the aggregate fields from the remaining recipes.
          const sameDateLiv = remaining.every((s) => s.dateLivraison === remaining[0].dateLivraison);
          const sameDateProd = remaining.every((s) => s.dateProd === remaining[0].dateProd);
          const totalPrix = remaining.reduce((sum, s) => sum + parseEuro(s.prixTotal), 0);
          const qtyUnit = parseQty(remaining[0].besoinMenu).unit;
          const totalQty = remaining.reduce((sum, s) => sum + parseQty(s.besoinMenu).value, 0);
          newRows[groupIdx] = {
            ...group,
            subRows: remaining,
            dateLivraison: sameDateLiv ? remaining[0].dateLivraison : "Multi",
            dateProd: sameDateProd ? remaining[0].dateProd : "Multi",
            prixTotal: formatEuro(totalPrix),
            besoinMenu: formatQty(totalQty, qtyUnit),
            verified: remaining.every((s) => s.verified),
          };
        }

        // Insert the newly detached recipe right after its former group.
        const insertAt = newRows.findIndex((r) => r.id === group.id);
        newRows.splice(insertAt + 1, 0, detachedRow);
        return newRows;
      });

      showToast(`"${popupRow.recette}" a été détachée du groupe avec son propre match`);
      closeMatchPopup();
      return;
    }

    setRows((rs) =>
      rs.map((r) => {
        const matches = applyAll ? r.aliment === popupRow.aliment : r.id === popupRow.id;
        if (!matches) return r;
        if (!chosen) {
          return {
            ...r,
            matchType: "none",
            matchProduct: null,
            matchGamme: null,
            dateLivraison: null,
            fournisseur: "",
            produitLabel: "",
            prixUnitaire: null,
            prixTotal: null,
            sansOffre: false,
            moinsCher: false,
            etat,
          };
        }
        return {
          ...r,
          matchType: "manuel",
          verified: r.verified,
          matchProduct: chosen.name,
          matchGamme: chosen.gamme,
          fournisseur: chosen.fournisseur,
          produitLabel: chosen.labels?.[0] || "",
          prixUnitaire: chosen.price || null,
          prixTotal: chosen.total || null,
          sansOffre: !!chosen.sansOffre,
          moinsCher: false,
          etat,
        };
      })
    );
    showToast(
      !chosen
        ? "Match retiré"
        : applyAll
        ? `Match appliqué à tous les aliments "${popupRow.aliment}"`
        : "Match mis à jour"
    );
  }

  function rowBg(r) {
    if (selected.includes(r.id)) return T.selected;
    if (r.verified) return "#F0F0F0";
    if (r.matchType === "none") return T.rose.row;
    return "#ffffff";
  }

  return (
    <div
      className="overflow-hidden font-sans flex w-full"
      style={{ height: "100vh", background: "#ffffff", color: "#1f2430" }}
    >
      {/* App sidebar — not part of this module, shown as a placeholder
          so the prototype reads in the context of the real tool's nav */}
      <AppSidebar page={page} onNavigate={setPage} />

      {page === "recettes" && <RecettesPage />}

      {page === "matching" && (
      <div className="flex-1 min-w-0 p-5 flex flex-col" style={{ background: "#ffffff" }}>
        <div className="min-w-0 flex flex-col flex-1 min-h-0">
          {/* Top bar */}
            <div
              className="relative flex items-center px-6 py-4 rounded-2xl shrink-0"
              style={{ background: "#f4f4f4" }}
            >
              <h1 className="text-2xl font-bold">Menu</h1>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-3">
                <TabButton icon={Users} label="Effectifs" />
                <TabButton icon={List} label="Conception" />
                <TabButton icon={Blend} label="Match produit" active />
                <TabButton icon={Table2} label="Allotissement" />
                <TabButton icon={ShoppingCart} label="Panier" />
              </div>
            </div>

            {/* Filter bar */}
            <div className="px-6 py-4 mt-4 rounded-t-2xl shrink-0" style={{ background: T.tealBar }}>
              <div className="flex items-center flex-wrap" style={{ gap: "40px" }}>
                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full border bg-white text-[13px]"
                    style={{ borderColor: T.border }}
                  >
                    Du 10/09/2026 <Calendar size={14} className="text-gray-400" />
                  </span>
                  <span
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full border bg-white text-[13px]"
                    style={{ borderColor: T.border }}
                  >
                    Au 17/09/2026 <Calendar size={14} className="text-gray-400" />
                  </span>
                </div>

                <div className="relative flex-1" style={{ minWidth: "280px" }}>
                  <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Rechercher un produit, code produit..."
                    className="w-full pl-9 pr-3 py-1.5 rounded-full border text-[13px] outline-none bg-white"
                    style={{ borderColor: T.border }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 mt-3 flex-wrap" style={{ minHeight: "38px" }}>
                <div className="flex items-center gap-2 flex-wrap">
                  {selected.length > 0 ? (
                    <>
                      <span className="text-[13px] font-semibold pr-1" style={{ color: "#255650" }}>
                        {selected.length} produit{selected.length > 1 ? "s" : ""} sélectionné
                        {selected.length > 1 ? "s" : ""}
                      </span>
                      <Dropdown
                        label="Changer l'état"
                        value={bulkEtat}
                        onChange={(v) => {
                          setBulkEtat(v);
                          applyBulkEtat(v);
                        }}
                        options={[
                          { value: "En stock", label: "En stock" },
                          { value: "À traiter", label: "À traiter" },
                          { value: "Commandé", label: "Commandé" },
                        ]}
                      />
                      <Pill onClick={() => applyBulkDate("13/09")}>
                        Définir une date de livraison <Calendar size={14} />
                      </Pill>
                      <button
                        onClick={() => setSelected([])}
                        className="text-[13px] text-gray-500 underline ml-1"
                      >
                        Annuler la sélection
                      </button>
                    </>
                  ) : (
                    <>
                      <Dropdown
                        label=""
                        value={sortBy}
                        onChange={setSortBy}
                        width="w-56"
                        placeholder="Trier par"
                        options={[
                          { value: "aliment", label: "Aliment A → Z" },
                          { value: "recette", label: "Recette A → Z" },
                        ]}
                      />
                      <span className="h-5 w-px bg-gray-300" />
                      <MultiSelect
                        label="Fournisseur"
                        options={FOURNISSEURS}
                        selected={fournisseursFilter}
                        onChange={setFournisseursFilter}
                      />
                      <MultiSelect
                        label="Famille"
                        options={["Fruits & légumes", "BOF", "VPO", "Epicerie", "Surgelé"]}
                        selected={familles}
                        onChange={setFamilles}
                      />
                      <MultiSelect
                        label="Match"
                        options={["historique", "automatique", "none"]}
                        optionLabels={{
                          historique: "Match historique",
                          automatique: "Match automatique nona",
                          none: "Sans match",
                        }}
                        optionColors={{
                          historique: "#A2EFB4",
                          automatique: "#ACE5F8",
                          none: "#F2ACA8",
                        }}
                        selected={matchFilter}
                        onChange={setMatchFilter}
                      />
                      <MultiSelect
                        label="État"
                        options={["En stock", "À traiter", "Commandé"]}
                        selected={etatFilter}
                        onChange={setEtatFilter}
                      />
                    </>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    className="w-8 h-8 rounded-full border bg-white flex items-center justify-center text-gray-400 hover:text-gray-600"
                    style={{ borderColor: T.border }}
                  >
                    <Printer size={15} />
                  </button>
                  <button
                    className="w-8 h-8 rounded-full border bg-white flex items-center justify-center text-gray-400 hover:text-gray-600"
                    style={{ borderColor: T.border }}
                  >
                    <Columns3 size={15} />
                  </button>
                </div>
              </div>
            </div>

            {/* Table — this is the only part of the screen that scrolls */}
            <div className="overflow-auto flex-1 min-h-0" style={{ borderBottom: `1px solid ${T.border}` }}>
              <table className="w-full text-[13px] border-collapse" style={{ minWidth: "1300px" }}>
                <thead>
                  <tr style={{ background: T.tealBar }} className="text-left">
                    <Th w="40px">
                      <input
                        type="checkbox"
                        style={{ accentColor: T.teal }}
                        checked={selected.length > 0 && selected.length === filteredRows.length}
                        onChange={toggleAll}
                      />
                    </Th>
                    <Th>Aliment</Th>
                    <Th>
                      <span className="inline-flex items-center gap-1.5">
                        Match produit
                        <button
                          onClick={() => setShowRulesInfo(true)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <Info size={13} />
                        </button>
                      </span>
                    </Th>
                    <Th>Vérification</Th>
                    <Th>Label</Th>
                    <Th>Fournisseur</Th>
                    <Th>Recette</Th>
                    <Th>État</Th>
                    <Th>Prix/kg</Th>
                    <Th>Prix total</Th>
                    <Th>Date de liv.</Th>
                    <Th>Date de prod.</Th>
                    <Th>Besoin menu</Th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRows.map((r) => {
                    const isGroup = !!r.subRows;
                    const isExpanded = isGroup && expandedGroups.has(r.id);
                    const groupAllVerified = isGroup && r.subRows.every((s) => s.verified);
                    return (
                      <Fragment key={r.id}>
                        <tr
                          style={{ background: hoveredRowKey === r.id ? shade(rowBg(r), -4) : rowBg(r) }}
                          className="border-t transition-colors"
                          onMouseEnter={() => setHoveredRowKey(r.id)}
                          onMouseLeave={() => setHoveredRowKey(null)}
                        >
                          <Td>
                            <input
                              type="checkbox"
                              style={{ accentColor: T.teal }}
                              checked={selected.includes(r.id)}
                              onChange={() => toggleRow(r.id)}
                            />
                          </Td>
                          <Td>
                            <span className="inline-flex items-center gap-2">
                              {FAMILLE_ICON[r.famille] && (
                                <Tooltip text={r.famille}>
                                  {(() => {
                                    const FamIcon = FAMILLE_ICON[r.famille];
                                    return <FamIcon size={16} className="text-gray-400 shrink-0" />;
                                  })()}
                                </Tooltip>
                              )}
                              <span>
                                <span className="font-semibold">
                                  {r.aliment}, {r.gamme}
                                </span>{" "}
                                {r.alimentLabel && (
                                  <LabelBadge label={r.alimentLabel} className="ml-1 px-2 py-0.5 rounded-full text-[11px] font-semibold" />
                                )}
                              </span>
                              {isGroup && (
                                <button onClick={() => toggleGroup(r.id)} className="text-gray-400 hover:text-gray-700 shrink-0">
                                  <ChevronDown
                                    size={16}
                                    style={{ transform: isExpanded ? "rotate(180deg)" : "none", transition: "transform 0.15s" }}
                                  />
                                </button>
                              )}
                            </span>
                          </Td>
                          <Td>
                            <span className="inline-flex items-center gap-1.5">
                              <MatchBadge
                                row={r}
                                active={popupRowId === r.id}
                                onClick={() => {
                                  setPopupSubTarget(null);
                                  setPopupRowId(r.id);
                                }}
                              />
                              {r.moinsCher && (
                                <Tooltip text="Il existe des produits moins chers que le produit sélectionné.">
                                  <Coins size={14} color={T.amberDark} />
                                </Tooltip>
                              )}
                            </span>
                          </Td>
                          <Td>
                            <Tooltip
                              text={
                                isGroup
                                  ? "Valide/dévalide le match pour toutes les recettes de ce groupe"
                                  : r.verified
                                  ? "Marqué comme vérifié — cliquer pour repasser en non vérifié"
                                  : "Marquer ce match comme vérifié"
                              }
                            >
                              <button
                                onClick={() => (isGroup ? toggleGroupVerified(r) : toggleVerified(r.id))}
                                className="w-11 h-6 rounded-full relative transition-colors"
                                style={{ background: (isGroup ? groupAllVerified : r.verified) ? T.teal : "#d8d8da" }}
                              >
                                <span
                                  className="absolute top-0.5 w-5 h-5 rounded-full shadow flex items-center justify-center transition-all"
                                  style={{
                                    left: (isGroup ? groupAllVerified : r.verified) ? "22px" : "2px",
                                    background: (isGroup ? groupAllVerified : r.verified) ? "#ffffff" : "#2b2f36",
                                  }}
                                >
                                  {(isGroup ? groupAllVerified : r.verified) ? (
                                    <Check size={12} color={T.teal} />
                                  ) : (
                                    <History size={12} color="#ffffff" />
                                  )}
                                </span>
                              </button>
                            </Tooltip>
                          </Td>
                          <Td>
                            {r.produitLabel ? (
                              <LabelBadge label={r.produitLabel} />
                            ) : r.labelMismatch ? (
                              <Tooltip text="Le label du produit matché est différent du label ingrédient">
                                <AlertTriangle size={15} color={T.amberDark} />
                              </Tooltip>
                            ) : (
                              "—"
                            )}
                          </Td>
                          <Td>{r.fournisseur || "—"}</Td>
                          <Td>
                            {r.recette === "Multi" ? (
                              <Tooltip text={r.subRows.map((s) => s.recette).join(", ")}>
                                <span className="px-2 py-0.5 rounded-full text-[12px] font-semibold bg-gray-200 text-gray-600">
                                  Multi
                                </span>
                              </Tooltip>
                            ) : (
                              r.recette || "—"
                            )}
                          </Td>
                          <Td>
                            <span className="relative inline-flex items-center">
                              <select
                                value={r.etat}
                                onChange={(e) => setRowEtat(r.id, e.target.value)}
                                className="appearance-none border rounded-full pl-3 pr-8 py-1 text-[12.5px] bg-white outline-none cursor-pointer"
                                style={{ borderColor: T.border }}
                              >
                                <option>En stock</option>
                                <option>À traiter</option>
                                <option>Commandé</option>
                              </select>
                              <ChevronDown
                                size={14}
                                className="pointer-events-none absolute text-gray-500"
                                style={{ right: "10px" }}
                              />
                            </span>
                          </Td>
                          <Td>
                            {r.prixUnitaire ? (
                              <span className="inline-flex items-center gap-1">{r.prixUnitaire}</span>
                            ) : (
                              "—"
                            )}
                          </Td>
                          <Td>{r.prixTotal || "—"}</Td>
                          <Td>
                            {r.dateLivraison ? (
                              r.dateLivraison === "Multi" ? (
                                <Tooltip
                                  text={r.subRows
                                    .map((s) => `${s.recette} : ${s.dateLivraison}`)
                                    .join(" · ")}
                                >
                                  <span className="px-2 py-0.5 rounded-full text-[12px] font-semibold bg-gray-200 text-gray-600">
                                    Multi
                                  </span>
                                </Tooltip>
                              ) : (
                                <span
                                  className="px-2 py-0.5 rounded-full text-[12px] font-semibold"
                                  style={{ background: dayColorFor(r.dateLivraison), color: "#ffffff" }}
                                >
                                  {r.dateLivraison}
                                </span>
                              )
                            ) : (
                              "—"
                            )}
                          </Td>
                          <Td>
                            {r.dateProd === "Multi" ? (
                              <Tooltip
                                text={r.subRows
                                  .map((s) => `${s.recette} : ${s.dateProd}`)
                                  .join(" · ")}
                              >
                                <span className="px-2 py-0.5 rounded-full text-[12px] font-semibold bg-gray-200 text-gray-600">
                                  Multi
                                </span>
                              </Tooltip>
                            ) : (
                              r.dateProd || "—"
                            )}
                          </Td>
                          <Td>{r.besoinMenu || "—"}</Td>
                        </tr>

                        {isGroup &&
                          isExpanded &&
                          r.subRows.map((s, idx) => (
                            <tr
                              key={`${r.id}-sub-${idx}`}
                              className="border-t transition-colors"
                              style={{ background: hoveredRowKey === `${r.id}-sub-${idx}` ? shade("#ffffff", -4) : "#ffffff" }}
                              onMouseEnter={() => setHoveredRowKey(`${r.id}-sub-${idx}`)}
                              onMouseLeave={() => setHoveredRowKey(null)}
                            >
                              <Td>{null}</Td>
                              <Td>
                                <span className="inline-flex items-center gap-2">
                                  {FAMILLE_ICON[r.famille] &&
                                    (() => {
                                      const FamIcon = FAMILLE_ICON[r.famille];
                                      return <FamIcon size={16} className="text-gray-300 shrink-0" />;
                                    })()}
                                  <span>
                                    <span className="font-semibold">
                                      {r.aliment}, {r.gamme}
                                    </span>{" "}
                                    {r.alimentLabel && (
                                      <LabelBadge label={r.alimentLabel} className="ml-1 px-2 py-0.5 rounded-full text-[11px] font-semibold" />
                                    )}
                                  </span>
                                </span>
                              </Td>
                              <Td>
                                <MatchBadge
                                  row={r}
                                  active={popupSubTarget?.groupId === r.id && popupSubTarget?.subIndex === idx}
                                  onClick={() => {
                                    setPopupRowId(null);
                                    setPopupSubTarget({ groupId: r.id, subIndex: idx });
                                  }}
                                />
                              </Td>
                              <Td>
                                <Tooltip
                                  text={
                                    s.verified
                                      ? "Marqué comme vérifié pour cette recette — cliquer pour repasser en non vérifié"
                                      : "Marquer ce match comme vérifié pour cette recette"
                                  }
                                >
                                  <button
                                    onClick={() => toggleSubRowVerified(r.id, idx)}
                                    className="w-11 h-6 rounded-full relative transition-colors"
                                    style={{ background: s.verified ? T.teal : "#d8d8da" }}
                                  >
                                    <span
                                      className="absolute top-0.5 w-5 h-5 rounded-full shadow flex items-center justify-center transition-all"
                                      style={{
                                        left: s.verified ? "22px" : "2px",
                                        background: s.verified ? "#ffffff" : "#2b2f36",
                                      }}
                                    >
                                      {s.verified ? (
                                        <Check size={12} color={T.teal} />
                                      ) : (
                                        <History size={12} color="#ffffff" />
                                      )}
                                    </span>
                                  </button>
                                </Tooltip>
                              </Td>
                              <Td>
                                {r.produitLabel ? (
                                  <LabelBadge label={r.produitLabel} />
                                ) : r.labelMismatch ? (
                                  <Tooltip text="Le label du produit matché est différent du label ingrédient">
                                    <AlertTriangle size={15} color={T.amberDark} />
                                  </Tooltip>
                                ) : (
                                  "—"
                                )}
                              </Td>
                              <Td>{r.fournisseur || "—"}</Td>
                              <Td>
                                <Tooltip text="Précision sur la recette">
                                  <span>{s.recette}</span>
                                </Tooltip>
                              </Td>
                              <Td>
                                <span className="relative inline-flex items-center">
                                  <select
                                    value={s.etat}
                                    onChange={(e) => setSubRowEtat(r.id, idx, e.target.value)}
                                    className="appearance-none border rounded-full pl-3 pr-8 py-1 text-[12.5px] bg-white outline-none cursor-pointer"
                                    style={{ borderColor: T.border }}
                                  >
                                    <option>En stock</option>
                                    <option>À traiter</option>
                                    <option>Commandé</option>
                                  </select>
                                  <ChevronDown
                                    size={14}
                                    className="pointer-events-none absolute text-gray-500"
                                    style={{ right: "10px" }}
                                  />
                                </span>
                              </Td>
                              <Td>
                                {r.prixUnitaire ? (
                                  <span className="inline-flex items-center gap-1">{r.prixUnitaire}</span>
                                ) : (
                                  "—"
                                )}
                              </Td>
                              <Td>{s.prixTotal || "—"}</Td>
                              <Td>
                                {s.dateLivraison ? (
                                  <span
                                    className="px-2 py-0.5 rounded-full text-[12px] font-semibold"
                                    style={{ background: dayColorFor(s.dateLivraison), color: "#ffffff" }}
                                  >
                                    {s.dateLivraison}
                                  </span>
                                ) : (
                                  "—"
                                )}
                              </Td>
                              <Td>{s.dateProd || "—"}</Td>
                              <Td>{s.besoinMenu || "—"}</Td>
                            </tr>
                          ))}
                      </Fragment>
                    );
                  })}
                  {filteredRows.length === 0 && (
                    <tr>
                      <td colSpan={13} className="text-center text-gray-400 py-10">
                        Aucun résultat pour ces filtres.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Bottom stats bar (existing feature — display only) */}
            <div className="px-6 py-4 flex items-center gap-3 shrink-0">
              <div className="flex-1 flex rounded-full overflow-hidden h-9 text-[14px] font-semibold">
                <div className="flex items-center justify-center px-3" style={{ background: T.green.badge, color: T.green.text, width: "22%" }}>
                  29% soit 40€
                </div>
                <div className="flex items-center justify-center px-3" style={{ background: T.violet.badge, color: T.violet.text, width: "14%" }}>
                  11% soit 25€
                </div>
                <div className="flex items-center justify-center px-3 bg-gray-200 text-gray-600" style={{ width: "18%" }}>
                  20% soit 35€
                </div>
                <div className="flex items-center justify-center px-3 bg-gray-100 text-gray-500 flex-1">
                  40% soit 90€
                </div>
              </div>
              <div className="text-[14px] font-semibold whitespace-nowrap">
                Prix total :{" "}
                {rows
                  .reduce((sum, r) => sum + parseFloat((r.prixTotal || "0").replace(/[^\d.,]/g, "").replace(",", ".") || 0), 0)
                  .toFixed(2)
                  .replace(".", ",")}{" "}
                €
              </div>
            </div>
            <div className="px-6 pb-4 flex items-center gap-4 text-[12px] text-gray-500 shrink-0">
              <LegendDot color={T.green.badge} label="Bio" />
              <LegendDot color={T.violet.badge} label="EGalim (hors bio)" />
              <LegendDot color="#d8d8da" label="Autres labels" />
              <LegendDot color="#efefef" label="Conventionnel" />
              <Info size={13} />
            </div>
          </div>
        </div>
      )}

      {popupRow && (
        <MatchPopup
          key={popupRow.id}
          row={popupRow}
          onClose={closeMatchPopup}
          onConfirm={confirmMatch}
          onViewProduct={(candidate) => setProductSheet({ candidate, row: popupRow })}
        />
      )}

      {productSheet && (
        <ProductSheet
          candidate={productSheet.candidate}
          row={productSheet.row}
          onBack={() => setProductSheet(null)}
          onClose={() => {
            setProductSheet(null);
            closeMatchPopup();
          }}
          onMatch={() => {
            confirmMatch({ chosen: productSheet.candidate, etat: productSheet.row.etat, applyAll: false });
            setProductSheet(null);
          }}
        />
      )}

      {toast && (
        <div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 text-[13px] px-4 py-2.5 rounded-full shadow-lg z-50"
          style={{ background: "#1f2430", color: "#ffffff" }}
        >
          {toast}
        </div>
      )}

      {showRulesInfo && <MatchRulesInfoModal onClose={() => setShowRulesInfo(false)} />}
    </div>
  );
}

function SidebarIcon({ icon: Icon, active, size = 20, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-9 h-9 rounded-xl flex items-center justify-center hover:opacity-80"
      style={{ background: active ? "rgba(0,0,0,0.18)" : "transparent" }}
    >
      <Icon size={size} color="#ffffff" strokeWidth={1.8} />
    </button>
  );
}

function AppSidebar({ page, onNavigate }) {
  return (
    <div
      className="w-16 shrink-0 self-stretch flex flex-col items-center py-4 gap-1"
      style={{ background: T.teal }}
    >
      {/* Logo */}
      <div className="w-8 h-8 mb-4 shrink-0">
        <svg width="32" height="32" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="1" y="32.8716" width="25.8821" height="7.53846" rx="3.76923" fill="#F2B02B" />
          <circle cx="42.4613" cy="16.5385" r="7.53846" fill="#F2B02B" />
          <path
            d="M25.3072 9.50244C27.7182 9.50244 29.8845 10.0276 31.8063 11.078C33.728 12.1283 35.2305 13.6688 36.3137 15.6994C37.3969 17.6951 37.9384 20.1109 37.9384 22.9468V35.866C37.9384 36.6362 37.6764 37.2839 37.1523 37.8091C36.6631 38.2993 36.0342 38.5443 35.2655 38.5443C34.4968 38.5443 33.8503 38.2993 33.3262 37.8091C32.837 37.2839 32.5925 36.6362 32.5925 35.866V22.9468C32.5925 20.1109 31.8238 17.9752 30.2863 16.5397C28.7839 15.0692 26.7748 14.334 24.259 14.334C22.7915 14.334 21.4462 14.6316 20.2233 15.2268C19.0353 15.822 18.0919 16.6272 17.3931 17.6426C16.7292 18.6579 16.3973 19.7958 16.3973 21.0562V35.866C16.3973 36.6362 16.1527 37.2839 15.6635 37.8091C15.1743 38.2993 14.5279 38.5443 13.7243 38.5443C12.9556 38.5443 12.3091 38.2993 11.785 37.8091C11.2959 37.2839 11.0513 36.6362 11.0513 35.866V12.4434C11.0513 11.6381 11.2959 10.9904 11.785 10.5003C12.3091 10.0101 12.9556 9.76503 13.7243 9.76503C14.5279 9.76503 15.1743 10.0101 15.6635 10.5003C16.1527 10.9904 16.3973 11.6381 16.3973 12.4434V13.0211C17.5154 11.9007 18.8431 11.0429 20.3805 10.4477C21.918 9.81754 23.5602 9.50244 25.3072 9.50244Z"
            fill="white"
          />
        </svg>
      </div>

      <SidebarIcon icon={Home} />
      <SidebarIcon icon={Warehouse} />
      <SidebarIcon icon={ShoppingBasket} />

      <div className="w-6 h-px bg-white/25 my-1.5" style={{ background: "rgba(255,255,255,0.25)" }} />

      <Tooltip text="Menu (Matching produit)">
        <SidebarIcon icon={Calendar} active={page === "matching"} onClick={() => onNavigate("matching")} />
      </Tooltip>
      <Tooltip text="Recettes">
        <SidebarIcon icon={ClipboardList} active={page === "recettes"} onClick={() => onNavigate("recettes")} />
      </Tooltip>
      <SidebarIcon icon={Carrot} />

      <div className="w-6 h-px my-1.5" style={{ background: "rgba(255,255,255,0.25)" }} />

      <SidebarIcon icon={BarChart3} />
      <div className="w-9 h-9 rounded-xl flex items-center justify-center gap-0.5">
        <span className="text-white text-[11px] font-bold">PMS</span>
        <Sparkles size={10} color="#ffffff" />
      </div>
      <SidebarIcon icon={Settings} />

      <div className="flex-1" />

      <div
        className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[11px] font-bold mb-3"
        style={{ background: "rgba(255,255,255,0.25)" }}
      >
        CB
      </div>
      <SidebarIcon icon={GraduationCap} size={18} />
      <SidebarIcon icon={HelpCircle} size={18} />

      <button
        className="w-8 h-8 rounded-full flex items-center justify-center mt-3"
        style={{ background: "rgba(255,255,255,0.9)" }}
      >
        <ChevronRight size={16} color={T.teal} />
      </button>
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/*  Recettes — "add an ingredient, then match it" flow                     */
/* ---------------------------------------------------------------------- */

const GAMME_OPTIONS = ["brut", "appertisé", "cru sous vide", "préemballé", "cuit sous vide", "surgelé"];
const ALIMENT_OPTIONS = ["Aubergine", "Tomate", "Oignon", "Courgette", "Huile"];

function AlimentAutocomplete({ value, onChange, onPick }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    function onDoc(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);
  const matches = ALIMENT_OPTIONS.filter((a) => a.toLowerCase().includes(value.toLowerCase()));
  return (
    <div className="relative" ref={ref}>
      <input
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        placeholder="Aliment"
        className="w-full border-2 rounded-lg pl-3 pr-3 py-2 text-[13px] outline-none bg-white"
        style={{ borderColor: T.teal }}
      />
      {open && matches.length > 0 && (
        <div
          className="absolute z-50 left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border overflow-hidden"
          style={{ borderColor: T.border }}
        >
          {matches.map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => {
                onPick(a);
                setOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-[13px] hover:bg-gray-50"
            >
              {a}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

const RECIPE_CANDIDATE_TEMPLATES = [
  { gamme: "brut", suffix: "", fournisseur: "TRANSGOURMET", price: 9.2, labels: ["Bio"], origin: "France", dejaAchete: true },
  { gamme: "brut", suffix: "— calibre supérieur", fournisseur: "CRENO", price: 7.8, labels: [], origin: "Espagne", favori: true },
  { gamme: "brut", suffix: "— lot", fournisseur: "POMONA TERRE AZUR", price: 6.5, labels: [], origin: "France" },
  { gamme: "brut", suffix: "— origine locale", fournisseur: "VIVALYA", price: 8.1, labels: ["Issu du..."], origin: "France" },
  { gamme: "cru sous vide", suffix: "— tranchée", fournisseur: "VIVALYA", price: 8.6, labels: ["Issu du..."], origin: "France" },
  { gamme: "surgelé", suffix: "— surgelée", fournisseur: "POMONA PASSION FROID", price: 5.4, labels: [], origin: "France" },
  { gamme: "surgelé", suffix: "— cubes surgelés", fournisseur: "RELAIS D'OR", price: 4.9, labels: [], origin: "Belgique" },
  { gamme: "cuit sous vide", suffix: "— cuite", fournisseur: "SYSCO", price: 10.2, labels: ["Bio"], origin: "France" },
  { gamme: "préemballé", suffix: "— préemballée", fournisseur: "PRO A PRO", price: 6.9, labels: [], origin: "Espagne" },
];

function recipeCandidatesFor(aliment, quantiteKg) {
  const qty = quantiteKg > 0 ? quantiteKg : 1;
  const list = RECIPE_CANDIDATE_TEMPLATES.map((t, i) => ({
    id: `rc${i}`,
    name: `${aliment}${t.suffix ? " " + t.suffix : ""}`,
    gamme: t.gamme,
    fournisseur: t.fournisseur,
    labels: t.labels,
    origin: t.origin,
    unitPrice: t.price,
    total: t.price * qty,
    dejaAchete: !!t.dejaAchete,
    favori: !!t.favori,
  }));
  let cheapest = list[0];
  list.forEach((c) => {
    if (c.total < cheapest.total) cheapest = c;
  });
  cheapest.moinsCher = true;
  return list;
}

function RecipeCandidateCard({ c, selected, onSelect }) {
  return (
    <div
      onClick={onSelect}
      className="flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors hover:bg-gray-50"
      style={{ borderColor: selected ? T.teal : T.border, background: selected ? "#f5fbf8" : "#ffffff" }}
    >
      <input type="radio" readOnly checked={selected} className="pointer-events-none" style={{ accentColor: T.teal }} />
      <div className="w-14 h-14 rounded-lg bg-gray-200 flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="text-[12px]">
          <span className="text-[14px] font-semibold">{c.name}</span>{" "}
          <span className="italic text-gray-500">{c.gamme}</span>{" "}
          <span className="text-gray-400">| {c.fournisseur}</span>
        </div>
        <div className="flex items-center gap-1.5 mt-1 flex-wrap">
          {c.labels.map((l) => (
            <LabelBadge key={l} label={l} className="px-2 py-0.5 rounded-full text-[12px] font-semibold" />
          ))}
          {c.origin && (
            <span
              className="px-2 py-0.5 rounded-full text-[12px] font-semibold inline-flex items-center gap-1"
              style={{ background: GRAY.badge, color: GRAY.text }}
            >
              {isFranceOrigin(c.origin) ? (
                <>
                  <span aria-hidden="true">🇫🇷</span> France
                </>
              ) : (
                c.origin
              )}
            </span>
          )}
        </div>
        <div className="text-[12px] text-gray-600 mt-1">
          {c.unitPrice.toFixed(2).replace(".", ",")} €/kg
        </div>
      </div>
      <div className="flex flex-col items-end flex-shrink-0" style={{ gap: "20px" }}>
        <div style={{ height: "16px", display: "flex", alignItems: "center" }}>
          {c.favori && (
            <Tooltip text="Produit en favori">
              <Star size={16} color="#9aa0a6" fill="#9aa0a6" />
            </Tooltip>
          )}
        </div>
        {c.dejaAchete ? (
          <span
            className="px-2 py-0.5 rounded-full text-[12px] font-semibold whitespace-nowrap"
            style={{ background: T.matchHistorique.badge, color: T.matchHistorique.text }}
          >
            Déjà acheté
          </span>
        ) : (
          c.moinsCher && (
            <span
              className="px-2 py-0.5 rounded-full text-[12px] font-semibold whitespace-nowrap inline-flex items-center gap-1"
              style={{ background: GRAY.badge, color: GRAY.text }}
            >
              <Coins size={12} color={GRAY.text} />
              Le moins cher
            </span>
          )
        )}
      </div>
    </div>
  );
}

function RecipeMatchModal({ ingredient, onBack, onConfirm }) {
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState(ingredient.match?.id ?? null);
  const [sortBy, setSortBy] = useState("alpha");
  const candidates = useMemo(
    () => recipeCandidatesFor(ingredient.aliment, ingredient.quantite || 1),
    [ingredient.aliment, ingredient.quantite]
  );
  const fournisseurs = useMemo(() => [...new Set(candidates.map((c) => c.fournisseur))], [candidates]);
  const gammes = useMemo(() => [...new Set(candidates.map((c) => c.gamme))], [candidates]);
  const origines = useMemo(() => [...new Set(candidates.map((c) => c.origin).filter(Boolean))], [candidates]);
  const labels = useMemo(() => [...new Set(candidates.flatMap((c) => c.labels))], [candidates]);
  const tarifOptions = [
    "Prix marché public",
    "Prix centrale d'achat",
    "Prix fournisseur",
    "Prix cuisine",
    "Produits sans offre",
  ];

  const [fFournisseur, setFFournisseur] = useState([]);
  const [fGamme, setFGamme] = useState([ingredient.gamme]);
  const [fTarif, setFTarif] = useState([]);
  const [fOrigine, setFOrigine] = useState([]);
  const [fLabel, setFLabel] = useState([]);

  const filtered = candidates
    .filter((c) => c.name.toLowerCase().includes(search.toLowerCase()))
    .filter((c) => fFournisseur.length === 0 || fFournisseur.includes(c.fournisseur))
    .filter((c) => fGamme.length === 0 || fGamme.includes(c.gamme))
    .filter((c) => fOrigine.length === 0 || fOrigine.includes(c.origin))
    .filter((c) => fLabel.length === 0 || c.labels.some((l) => fLabel.includes(l)))
    .filter((c) => fTarif.length === 0 || fTarif.includes("Prix cuisine"))
    .sort((a, b) => (sortBy === "price" ? a.unitPrice - b.unitPrice : a.name.localeCompare(b.name)));

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      style={{ background: "rgba(0,0,0,0.35)" }}
    >
      <div className="bg-white rounded-2xl w-full shadow-2xl flex flex-col" style={{ maxWidth: "1100px", height: "760px" }}>
        <div className="px-6 pt-5 pb-4 shrink-0">
          <h2 className="text-[17px] font-bold">
            Ajouter un match pour : {ingredient.aliment}, {ingredient.gamme}
          </h2>
        </div>

        <div className="px-6 py-4 mx-6 mt-2 rounded-2xl shrink-0" style={{ background: T.tealBar }}>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher un produit, code produit..."
              className="w-full pl-9 pr-3 py-2 rounded-full border text-[13px] outline-none focus:border-gray-400 bg-white"
              style={{ borderColor: T.border }}
            />
          </div>
          <div className="flex items-center justify-between gap-2 mt-3">
            <div className="flex flex-wrap items-center gap-2">
              <Dropdown
                label=""
                value={sortBy}
                onChange={setSortBy}
                width="w-56"
                options={[
                  { value: "alpha", label: "A → Z" },
                  { value: "price", label: "Prix/kg le moins cher" },
                ]}
              />
              <span className="h-5 w-px bg-gray-300 shrink-0" />
              <MultiSelect label="Fournisseur" options={fournisseurs} selected={fFournisseur} onChange={setFFournisseur} />
              <MultiSelect
                label="Tarif"
                options={tarifOptions}
                disabledOptions={["Prix fournisseur", "Prix centrale d'achat"]}
                selected={fTarif}
                onChange={setFTarif}
              />
              <MultiSelect label="Gamme" options={gammes} selected={fGamme} onChange={setFGamme} />
              <MultiSelect label="Origine" options={origines} selected={fOrigine} onChange={setFOrigine} />
              <MultiSelect
                label="Label"
                options={labels}
                optionLabels={LABEL_FULL_TEXT}
                selected={fLabel}
                onChange={setFLabel}
              />
            </div>
            <button
              className="px-4 py-1.5 rounded-full text-[13px] font-bold bg-white shrink-0"
              style={{ marginLeft: "40px" }}
            >
              Explorer les produits
            </button>
          </div>
        </div>

        <div className="px-6 mt-3 overflow-y-auto flex-1 min-h-0 pb-2">
          {(() => {
            const selectedIncludedNaturally = filtered.some((c) => c.id === selectedId);

            if (!selectedId || selectedIncludedNaturally) {
              return (
                <div className="space-y-2">
                  {filtered.map((c) => (
                    <RecipeCandidateCard
                      key={c.id}
                      c={c}
                      selected={selectedId === c.id}
                      onSelect={() => setSelectedId(selectedId === c.id ? null : c.id)}
                    />
                  ))}
                </div>
              );
            }

            const pinned = candidates.find((c) => c.id === selectedId);
            return (
              <>
                {pinned && (
                  <div className="pb-3 mb-2 border-b" style={{ borderColor: T.border }}>
                    <RecipeCandidateCard c={pinned} selected={true} onSelect={() => setSelectedId(null)} />
                    <div className="text-[11px] text-gray-400 mt-1.5 px-1">
                      Produit sélectionné — affiché même hors recherche/filtres
                    </div>
                  </div>
                )}
                <div className="space-y-2">
                  {filtered.map((c) => (
                    <RecipeCandidateCard
                      key={c.id}
                      c={c}
                      selected={false}
                      onSelect={() => setSelectedId(c.id)}
                    />
                  ))}
                </div>
              </>
            );
          })()}
        </div>

        <div className="px-6 py-4 border-t shrink-0 flex items-center justify-between" style={{ borderColor: T.border }}>
          <button
            onClick={onBack}
            className="px-4 py-2 rounded-full border text-[13px] font-semibold"
            style={{ borderColor: T.border, color: "#33383f" }}
          >
            Retour
          </button>
          <button
            onClick={() => {
              const chosen = candidates.find((c) => c.id === selectedId) || null;
              onConfirm(chosen);
            }}
            className="px-5 py-2 rounded-full text-[13px] font-semibold"
            style={{ background: T.amber, color: "#1f2430" }}
          >
            Confirmer
          </button>
        </div>
      </div>
    </div>
  );
}

function RecettesPage() {
  const [ingredients, setIngredients] = useState([]);
  const [addingNew, setAddingNew] = useState(false);
  const [draftAliment, setDraftAliment] = useState("");
  const [draftGamme, setDraftGamme] = useState("");
  const [draftQuantite, setDraftQuantite] = useState("1");
  const [draftUnit, setDraftUnit] = useState("kg");
  const [modalIngredientId, setModalIngredientId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [toast, setToast] = useState(null);

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  }

  function resetDraft() {
    setDraftAliment("");
    setDraftGamme("");
    setDraftQuantite("1");
    setDraftUnit("kg");
    setAddingNew(false);
  }

  function pickAliment(name) {
    setDraftAliment(name);
    setDraftGamme((g) => g || "brut");
  }

  function validateNewIngredient() {
    if (!draftAliment.trim() || !draftGamme) return;
    const id = Date.now();
    setIngredients((list) => [
      ...list,
      {
        id,
        aliment: draftAliment.trim(),
        gamme: draftGamme,
        quantite: parseFloat((draftQuantite || "1").replace(",", ".")) || 1,
        unit: draftUnit,
        match: null,
      },
    ]);
    resetDraft();
  }

  function startEdit(ing) {
    setDraftAliment(ing.aliment);
    setDraftGamme(ing.gamme);
    setDraftQuantite(String(ing.quantite));
    setDraftUnit(ing.unit);
    setEditingId(ing.id);
  }

  function cancelEdit() {
    setEditingId(null);
    resetDraft();
  }

  function saveEdit() {
    if (!draftAliment.trim() || !draftGamme) return;
    setIngredients((list) =>
      list.map((ing) => {
        if (ing.id !== editingId) return ing;
        const alimentChanged = ing.aliment !== draftAliment.trim();
        return {
          ...ing,
          aliment: draftAliment.trim(),
          gamme: draftGamme,
          quantite: parseFloat((draftQuantite || "1").replace(",", ".")) || 1,
          unit: draftUnit,
          // Changing the aliment invalidates whatever match was found for the old one.
          match: alimentChanged ? null : ing.match,
        };
      })
    );
    if (ingredients.find((i) => i.id === editingId)?.aliment !== draftAliment.trim()) {
      showToast("Aliment modifié — le match précédent a été retiré");
    }
    setEditingId(null);
    resetDraft();
  }

  function deleteIngredient(id) {
    setIngredients((list) => list.filter((ing) => ing.id !== id));
  }

  const modalIngredient = ingredients.find((i) => i.id === modalIngredientId);

  return (
    <div className="flex-1 min-w-0 p-5 flex flex-col overflow-auto" style={{ background: "#ffffff" }}>
      <div className="min-w-0 flex flex-col flex-1">
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-4 rounded-2xl shrink-0" style={{ background: "#f4f4f4" }}>
          <h1 className="text-2xl font-bold">Recettes</h1>
        </div>

        <div className="flex items-center justify-between mt-5 shrink-0">
          <span className="text-[17px]">Créer une recette - Ratatouille</span>
          <div className="flex items-center gap-2">
            <button
              className="px-4 py-2 rounded-full border text-[13px] font-semibold bg-white"
              style={{ borderColor: T.border }}
            >
              Annuler
            </button>
            <button
              className="px-5 py-2 rounded-full text-[13px] font-semibold"
              style={{ background: T.amber, color: "#1f2430" }}
            >
              Ajouter
            </button>
          </div>
        </div>

        <div className="flex-1 min-w-0 overflow-auto space-y-5 pb-8 mt-4">
          {/* Ingrédients */}
          <div className="rounded-xl border" style={{ borderColor: T.border }}>
            <div
              className="px-5 py-3 flex items-center rounded-t-xl"
              style={{ background: "#efefef" }}
            >
              <div className="flex items-center gap-2">
                <Utensils size={15} color="#5a5f66" />
                <h3 className="text-[13px] font-bold tracking-wide text-gray-600">INGRÉDIENTS</h3>
              </div>
            </div>

            <div className="px-5 py-4">
              {ingredients.length > 0 && (
                <div className="grid gap-3 pb-2 mb-2 border-b" style={{ borderColor: T.border, gridTemplateColumns: "1fr 170px 180px 90px" }}>
                  <div className="text-[13px] font-bold">Nom & Gamme</div>
                  <div />
                  <div className="text-[13px] font-bold flex items-center gap-1.5">
                    Quantité de référence <Info size={13} color="#9aa0a6" />
                  </div>
                  <div />
                </div>
              )}

              <div className="divide-y" style={{ borderColor: T.border }}>
                {ingredients.map((ing) =>
                  editingId === ing.id ? (
                    <div
                      key={ing.id}
                      className="grid gap-2 items-center py-3"
                      style={{ gridTemplateColumns: "1fr 1fr 80px 90px auto" }}
                    >
                      <AlimentAutocomplete
                        value={draftAliment}
                        onChange={setDraftAliment}
                        onPick={pickAliment}
                      />
                      <div className="relative">
                        <select
                          value={draftGamme}
                          onChange={(e) => setDraftGamme(e.target.value)}
                          className="w-full appearance-none border rounded-lg pl-3 pr-8 py-2 text-[13px] outline-none bg-white"
                          style={{ borderColor: T.border, color: draftGamme ? "#1f2430" : "#9aa0a6" }}
                        >
                          <option value="">Gamme *</option>
                          {GAMME_OPTIONS.map((g) => (
                            <option key={g} value={g}>
                              {g}
                            </option>
                          ))}
                        </select>
                        <ChevronDown size={14} className="pointer-events-none absolute text-gray-400" style={{ right: "10px", top: "50%", transform: "translateY(-50%)" }} />
                      </div>
                      <input
                        value={draftQuantite}
                        onChange={(e) => setDraftQuantite(e.target.value)}
                        className="border rounded-lg px-3 py-2 text-[13px] outline-none"
                        style={{ borderColor: T.border }}
                      />
                      <div className="relative">
                        <select
                          value={draftUnit}
                          onChange={(e) => setDraftUnit(e.target.value)}
                          className="w-full appearance-none border rounded-lg pl-3 pr-8 py-2 text-[13px] outline-none bg-white"
                          style={{ borderColor: T.border }}
                        >
                          <option value="kg">kg</option>
                          <option value="pièces">pièces</option>
                          <option value="L">L</option>
                        </select>
                        <ChevronDown size={14} className="pointer-events-none absolute text-gray-400" style={{ right: "10px", top: "50%", transform: "translateY(-50%)" }} />
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={cancelEdit}
                          className="w-8 h-8 rounded-full border flex items-center justify-center text-gray-400 hover:text-gray-600"
                          style={{ borderColor: T.border }}
                        >
                          <X size={16} />
                        </button>
                        <button
                          onClick={saveEdit}
                          disabled={!draftAliment || !draftGamme}
                          className="w-8 h-8 rounded-full border flex items-center justify-center disabled:opacity-40"
                          style={{ borderColor: T.teal, color: T.teal, background: "#eafaf1" }}
                        >
                          <Check size={16} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div key={ing.id} className="py-3">
                      <div className="grid gap-3 items-center" style={{ gridTemplateColumns: "1fr 170px 180px 90px" }}>
                        <div className="text-[13px]">
                          <span className="font-semibold">{ing.aliment}</span> {ing.gamme}
                        </div>
                        <div>
                          {!ing.match && (
                            <button
                              onClick={() => setModalIngredientId(ing.id)}
                              className="px-4 py-1.5 rounded-lg border text-[13px] font-medium bg-white whitespace-nowrap"
                              style={{ borderColor: T.border }}
                            >
                              Ajouter un match
                            </button>
                          )}
                        </div>
                        <div className="text-[13px]">
                          {ing.quantite} {ing.unit}
                        </div>
                        <div className="flex items-center gap-2">
                          <Tooltip text="Modifier l'aliment">
                            <button
                              onClick={() => startEdit(ing)}
                              className="w-8 h-8 rounded-full border flex items-center justify-center text-gray-500 hover:text-gray-700"
                              style={{ borderColor: T.border }}
                            >
                              <Pencil size={14} />
                            </button>
                          </Tooltip>
                          <Tooltip text="Supprimer l'aliment">
                            <button
                              onClick={() => deleteIngredient(ing.id)}
                              className="w-8 h-8 rounded-full border flex items-center justify-center"
                              style={{ borderColor: T.rose.text, color: T.rose.text }}
                            >
                              <Trash2 size={14} />
                            </button>
                          </Tooltip>
                        </div>
                      </div>

                      {ing.match && (
                        <button
                          onClick={() => setModalIngredientId(ing.id)}
                          className="mt-2 rounded-lg px-3 py-2 flex items-center gap-2 text-[13px] w-full text-left hover:opacity-80"
                          style={{ background: "#fafafa" }}
                        >
                          <ArrowRight size={14} color="#9aa0a6" />
                          <span className="font-semibold">{ing.match.name}</span>
                          <span className="italic text-gray-500">{ing.match.gamme}</span>
                          {ing.match.labels[0] && (
                            <span className="px-2 py-0.5 rounded text-[11px] bg-gray-200 text-gray-600">
                              {ing.match.labels[0]}
                            </span>
                          )}
                          <span className="text-gray-400">—</span>
                          <span className="font-semibold">{ing.match.total.toFixed(2).replace(".", ",")} €</span>
                        </button>
                      )}
                    </div>
                  )
                )}
              </div>

              {addingNew ? (
                <div className="grid gap-2 items-center mt-3" style={{ gridTemplateColumns: "1fr 1fr 80px 90px auto" }}>
                  <AlimentAutocomplete
                    value={draftAliment}
                    onChange={setDraftAliment}
                    onPick={pickAliment}
                  />
                  <div className="relative">
                    <select
                      value={draftGamme}
                      onChange={(e) => setDraftGamme(e.target.value)}
                      className="w-full appearance-none border rounded-lg pl-3 pr-8 py-2 text-[13px] outline-none bg-white"
                      style={{ borderColor: T.border, color: draftGamme ? "#1f2430" : "#9aa0a6" }}
                    >
                      <option value="">Gamme *</option>
                      {GAMME_OPTIONS.map((g) => (
                        <option key={g} value={g}>
                          {g}
                        </option>
                      ))}
                    </select>
                    <ChevronDown size={14} className="pointer-events-none absolute text-gray-400" style={{ right: "10px", top: "50%", transform: "translateY(-50%)" }} />
                  </div>
                  <input
                    value={draftQuantite}
                    onChange={(e) => setDraftQuantite(e.target.value)}
                    className="border rounded-lg px-3 py-2 text-[13px] outline-none"
                    style={{ borderColor: T.border }}
                  />
                  <div className="relative">
                    <select
                      value={draftUnit}
                      onChange={(e) => setDraftUnit(e.target.value)}
                      className="w-full appearance-none border rounded-lg pl-3 pr-8 py-2 text-[13px] outline-none bg-white"
                      style={{ borderColor: T.border }}
                    >
                      <option value="kg">kg</option>
                      <option value="pièces">pièces</option>
                      <option value="L">L</option>
                    </select>
                    <ChevronDown size={14} className="pointer-events-none absolute text-gray-400" style={{ right: "10px", top: "50%", transform: "translateY(-50%)" }} />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={resetDraft}
                      className="w-8 h-8 rounded-full border flex items-center justify-center text-gray-400 hover:text-gray-600"
                      style={{ borderColor: T.border }}
                    >
                      <X size={16} />
                    </button>
                    <button
                      onClick={validateNewIngredient}
                      disabled={!draftAliment || !draftGamme}
                      className="w-8 h-8 rounded-full border flex items-center justify-center disabled:opacity-40"
                      style={{ borderColor: T.teal, color: T.teal, background: "#eafaf1" }}
                    >
                      <Check size={16} />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between gap-2 mt-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setAddingNew(true)}
                      className="px-4 py-2 rounded-lg text-[13px] font-medium"
                      style={{ background: T.tealBar, color: T.teal }}
                    >
                      + Ajouter un aliment
                    </button>
                    <button className="text-gray-400 hover:text-gray-600 px-1">
                      <MoreVertical size={16} />
                    </button>
                  </div>
                  {ingredients.some((i) => i.match) && (
                    <span
                      className="px-3 py-1.5 rounded-full text-[13px] whitespace-nowrap"
                      style={{ background: "#FCEACB", color: "#1f2430" }}
                    >
                      Prix total sur la recette :{" "}
                      <span className="font-bold">
                        {ingredients
                          .reduce((sum, i) => sum + (i.match ? i.match.total : 0), 0)
                          .toFixed(2)
                          .replace(".", ",")}{" "}
                        €
                      </span>
                    </span>
                  )}
                </div>
              )}

              <div className="mt-4 rounded-lg border px-4 py-3 text-[13px] flex items-center gap-6" style={{ borderColor: T.border }}>
                <span>
                  <span className="font-bold">Allergènes :</span> aucun
                </span>
                <span>
                  <span className="font-bold">Traces :</span> aucune trace
                </span>
              </div>
            </div>
          </div>

          {/* Informations PMS — static per demo scope */}
          <div className="rounded-xl border" style={{ borderColor: T.border }}>
            <div className="px-5 py-3 flex items-center rounded-t-xl" style={{ background: "#efefef" }}>
              <div className="flex items-center gap-2">
                <Wand2 size={15} color="#5a5f66" />
                <h3 className="text-[13px] font-bold tracking-wide text-gray-600">INFORMATIONS PMS</h3>
              </div>
            </div>
            <div className="px-5 py-4 flex items-center gap-10">
              <div>
                <div className="text-[13px] text-gray-500 mb-1.5">DLC</div>
                <div className="flex items-center gap-2 text-[13px]">
                  J +{" "}
                  <input
                    defaultValue="3"
                    className="w-14 border rounded-lg px-2 py-1.5 text-[13px] outline-none"
                    style={{ borderColor: T.border }}
                  />
                </div>
              </div>
              <div>
                <div className="text-[13px] text-gray-500 mb-1.5">Température de service</div>
                <div
                  className="border rounded-full pl-4 pr-9 py-1.5 text-[13px] bg-white text-gray-400"
                  style={{ borderColor: T.border, minWidth: "220px", display: "inline-block" }}
                >
                  Non renseigné
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              className="px-4 py-2.5 rounded-full border text-[13px] font-semibold flex items-center gap-2"
              style={{ borderColor: T.teal, color: T.teal }}
            >
              <NotebookPen size={15} />
              Ajouter des indications
            </button>
            <button
              className="px-4 py-2.5 rounded-full border text-[13px] font-semibold flex items-center gap-2"
              style={{ borderColor: T.teal, color: T.teal }}
            >
              <PackageOpen size={15} />
              Ajouter l'allotissement
            </button>
          </div>
        </div>
      </div>

      {modalIngredient && (
        <RecipeMatchModal
          ingredient={modalIngredient}
          onBack={() => setModalIngredientId(null)}
          onConfirm={(chosen) => {
            setIngredients((list) =>
              list.map((i) => (i.id === modalIngredient.id ? { ...i, match: chosen } : i))
            );
            setModalIngredientId(null);
            showToast(chosen ? "Match ajouté à l'aliment" : "Match retiré");
          }}
        />
      )}

      {toast && (
        <div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 text-[13px] px-4 py-2.5 rounded-full shadow-lg z-50"
          style={{ background: "#1f2430", color: "#ffffff" }}
        >
          {toast}
        </div>
      )}
    </div>
  );
}

function MatchRulesInfoModal({ onClose }) {
  const rules = [
    {
      title: "Dernier achat",
      c: T.matchHistorique,
      icon: History,
      text: "Si l'aliment a déjà été matché manuellement ou validé pour cette recette par le passé, ce produit est conservé.",
    },
    {
      title: "Produit favori",
      c: T.matchAuto,
      icon: Star,
      text: "Le produit avec la même base/variante, marqué comme favori par la cuisine.",
    },
    {
      title: "Produit issu d'un marché public",
      c: T.matchAuto,
      icon: Store,
      text: "Le produit avec la même base/variante qui fait partie d'un marché public dont l'offre est active à la date de livraison.",
    },
    {
      title: "Produit similaire",
      c: T.matchAuto,
      icon: Shuffle,
      text: "Le produit avec la même base/variante, quand aucun favori ni marché public ne correspond.",
    },
    {
      title: "Aucun match",
      c: T.rose,
      icon: X,
      text: "Aucun produit n'a pu être matché automatiquement — un match manuel est nécessaire.",
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      style={{ background: "rgba(0,0,0,0.35)" }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full shadow-2xl"
        style={{ maxWidth: "760px", maxHeight: "85vh", overflowY: "auto" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b" style={{ borderColor: T.border }}>
          <h2 className="text-[16px] font-bold">Comment fonctionnent les matchs ?</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <div className="px-6 py-5">
          <div className="text-[12px] font-bold text-gray-500 uppercase tracking-wide mb-3">
            Ordre de priorité du match automatique
          </div>
          <div className="space-y-3">
            {rules.map((r, i) => {
              const Icon = r.icon;
              return (
                <div key={r.title} className="flex items-start gap-3">
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center text-[12px] font-bold shrink-0 mt-0.5"
                    style={{ background: "#f4f4f4", color: "#5a5f66" }}
                  >
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <span
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[13px] font-semibold"
                      style={{ background: r.c.badge, color: r.c.text }}
                    >
                      <Icon size={13} />
                      {r.title}
                    </span>
                    <div className="text-[13px] text-gray-600 mt-1.5">{r.text}</div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-[12px] font-bold text-gray-500 uppercase tracking-wide mb-3 mt-6">
            Code couleur des chips
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2.5 text-[13px] text-gray-600">
              <span className="w-3 h-3 rounded-full shrink-0" style={{ background: "#A2EFB4" }} />
              Match historique ou match manuel
            </div>
            <div className="flex items-center gap-2.5 text-[13px] text-gray-600">
              <span className="w-3 h-3 rounded-full shrink-0" style={{ background: "#ACE5F8" }} />
              Match automatique (Favori, Marché public ou Base/variante)
            </div>
            <div className="flex items-center gap-2.5 text-[13px] text-gray-600">
              <span className="w-3 h-3 rounded-full shrink-0" style={{ background: "#F2ACA8" }} />
              Aucun match — à traiter manuellement
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TabButton({ icon: Icon, label, active }) {
  return (
    <button
      className="flex flex-col items-center gap-1.5 px-6 py-3 rounded-2xl text-[12px] transition-colors"
      style={{
        background: active ? T.teal : "transparent",
        color: active ? "white" : "#a3a9b0",
        fontWeight: active ? 700 : 500,
      }}
    >
      <Icon size={19} strokeWidth={2} />
      {label}
    </button>
  );
}

function Th({ children, w }) {
  return (
    <th
      className="px-3 py-2.5 font-semibold text-[12.5px] whitespace-nowrap"
      style={{
        width: w,
        color: "#255650",
        position: "sticky",
        top: 0,
        zIndex: 10,
        background: T.tealBar,
      }}
    >
      {children}
    </th>
  );
}
function Td({ children }) {
  return <td className="px-3 py-2.5 align-middle whitespace-nowrap">{children}</td>;
}
function MarketPublicIcon({ size = 20 }) {
  return (
    <span
      className="inline-flex items-center justify-center rounded-full shrink-0"
      style={{ width: size, height: size, background: "#E6F5FE" }}
    >
      <Store size={size * 0.6} color="#4491C4" strokeWidth={2.2} />
    </span>
  );
}

function LegendDot({ color, label }) {
  return (
    <span className="flex items-center gap-1.5">
      <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: color }} />
      {label}
    </span>
  );
}
