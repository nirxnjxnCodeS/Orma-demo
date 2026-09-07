// Single source of truth for all UI copy.
// Malayalam is supplied by the product owner (everyday spoken Kerala register).
// Do NOT generate, translate or edit Malayalam here. If a string is missing, stop and ask.

export const STRINGS = {
  status: {
    new: { en: "New", ml: "പുതിയത്", roman: "puthiyath" },
    same: { en: "Same as before", ml: "പഴയതുപോലെ", roman: "pazhayathupole" },
    changed: { en: "Changed", ml: "മാറ്റി", roman: "maatti" },
    stopped: { en: "Stopped", ml: "നിർത്തി", roman: "nirthi" },
  },

  confirmation: {
    confirmed: { en: "Confirmed", ml: "ഉറപ്പിച്ചു", roman: "urappichu" },
    unconfirmed: { en: "Not confirmed yet", ml: "ഉറപ്പിച്ചിട്ടില്ല", roman: "urappichittilla" },
  },

  call: {
    incoming: { en: "Orma is calling you back…", ml: "ഓർമ്മ വിളിക്കുന്നു…", roman: "Orma vilikkunnu" },
    prompt: {
      en: "Tell me what the doctor said. Take your time.",
      ml: "ഡോക്ടർ പറഞ്ഞത് പറയൂ. സാവധാനം മതി.",
      roman: "Doctor paranjath parayoo. Saavadhaanam mathi.",
    },
    listening: { en: "Listening…", ml: "കേൾക്കുന്നു…", roman: "kelkkunnu" },
    oneMoment: { en: "One moment", ml: "ഒരു നിമിഷം", roman: "oru nimisham" },
    // Deliberately not literal: "I'm right here", what people say when the line goes quiet.
    stillHere: { en: "Still with you…", ml: "ഞാൻ ഇവിടെയുണ്ട്", roman: "njaan ivideyundu" },
  },

  questions: {
    howManyTimes: {
      en: "How many times a day should the white tablet be taken?",
      ml: "വെള്ള ഗുളിക ദിവസം എത്ര നേരം കഴിക്കണം?",
      roman: "vella gulika divasam ethra neram kazhikkanam?",
    },
    // "randu" ambiguity: exists in Malayalam, not in English.
    tabletsOrTimes: {
      en: "Two tablets, or two times a day?",
      ml: "രണ്ട് ഗുളികയാണോ, അതോ രണ്ടുനേരമാണോ?",
      roman: "randu gulikayaano, atho randu neramaano?",
    },
  },

  record: {
    header: { en: "From today's visit", ml: "ഇന്നത്തെ ചെക്കപ്പിൽ നിന്ന്", roman: "innathe checkuppil ninnu" },
    tablet: { en: "tablet", ml: "ഗുളിക", roman: "gulika" },
    whiteTablet: { en: "white tablet", ml: "വെള്ള ഗുളിക", roman: "vella gulika" },
    halfTablet: { en: "half tablet", ml: "പകുതി ഗുളിക", roman: "pakuthi gulika" },
    twiceADay: { en: "twice a day", ml: "രണ്ടുനേരം", roman: "randu neram" },
    onceADay: { en: "once a day", ml: "ഒരു നേരം", roman: "oru neram" },
    afterFood: { en: "after food", ml: "ഭക്ഷണം കഴിഞ്ഞ്", roman: "bhakshanam kazhinju" },
    beforeFood: { en: "before food", ml: "ഭക്ഷണത്തിനു മുൻപ്", roman: "bhakshanathinu munpu" },
    morning: { en: "morning", ml: "രാവിലെ", roman: "raavile" },
    night: { en: "night", ml: "രാത്രി", roman: "raathri" },
    nextVisit: { en: "next visit", ml: "അടുത്ത തവണ", roman: "aduthha thavana" },
  },

  doseCall: {
    taken: { en: "taken", ml: "കഴിച്ചു", roman: "kazhichu" },
    later: { en: "later", ml: "പിന്നെ", roman: "pinne" },
    familyNotified: { en: "Family notified", ml: "വീട്ടിൽ അറിയിച്ചു", roman: "veettil ariyichu" },
    // Yes/no here is deliberate: a wrong answer costs one dose, not a wrong prescription.
    opening: {
      ml: "{name} കഴിക്കാൻ സമയമായി. കഴിച്ചോ?",
      en: "It's time for {name}. Have you taken it?",
      roman: "{name} kazhikkaan samayamaayi. Kazhicho?",
    },
    missed: { ml: "കഴിച്ചില്ല", en: "Missed", roman: "kazhichilla" },
  },

  demo: {
    seedTranscript: {
      ml: "ഡോക്ടർ പറഞ്ഞു ഷുഗർ കൂടുതലാണെന്ന്. വെള്ള ഗുളിക രണ്ട് കഴിക്കണം. പ്രഷറിന്റെ ഗുളിക പഴയതുപോലെ തന്നെ. രാത്രിയിലെ ഗുളിക പകുതിയാക്കി. പിങ്ക് ഗുളിക നിർത്താൻ പറഞ്ഞു. ഒരു ബ്ലഡ് ടെസ്റ്റും എടുക്കണം. അടുത്ത മാസം വരാൻ പറഞ്ഞു. അത്രേയുള്ളൂ.",
      en: "Doctor said the sugar is high. Take two of the white tablet. The pressure tablet stays as before. The night tablet was halved. He said to stop the pink tablet. Also need a blood test. Come back next month. That's all.",
    },
  },

  // Templates: slots are {name}, {dose}, {nameA}, {nameB}. Bare nouns need no case marking here.
  confirm: {
    opening: {
      ml: "ഡോക്ടർ പറഞ്ഞെന്ന് നിങ്ങൾ പറഞ്ഞത് ഞാൻ പറയാം. ശരിയല്ലെങ്കിൽ തിരുത്തണം.",
      en: "I'll say back what you told me the doctor said. Correct me if it's wrong.",
      roman: "Doctor paranjennu ningal paranjath njaan parayaam. Shariyallenkil thiruthanam.",
    },
    howManyTimes: {
      ml: "{name} ദിവസം എത്ര നേരം കഴിക്കണം?",
      en: "How many times a day should you take {name}?",
      roman: "{name} divasam ethra neram kazhikkanam?",
    },
    howMuch: {
      ml: "{name} ഒരു നേരം എത്ര കഴിക്കണം?",
      en: "How much of {name} at a time?",
      roman: "{name} oru neram ethra kazhikkanam?",
    },
    countOrFrequency: {
      ml: "{dose} ഗുളികയാണോ, അതോ {dose} നേരമാണോ?",
      en: "Is that {dose} tablets, or {dose} times a day?",
      roman: "{dose} gulikayaano, atho {dose} neramaano?",
    },
    nameCollision: {
      ml: "{nameA} ആണോ, അതോ {nameB} ആണോ?",
      en: "Is it {nameA}, or {nameB}?",
      roman: "{nameA} aano, atho {nameB} aano?",
    },
    nextVisit: {
      ml: "അടുത്ത തവണ എന്നാണ് ചെല്ലാൻ പറഞ്ഞത്?",
      en: "When did they say to come next?",
      roman: "Aduthha thavana ennaanu chellaan paranjath?",
    },
    didntCatch: {
      ml: "കേട്ടില്ല, ഒന്നുകൂടി പറയാമോ?",
      en: "I didn't catch that — could you say it again?",
      roman: "Kettilla, onnukoodi parayaamo?",
    },
    closing: {
      ml: "ശരി, എഴുതിവെച്ചു. അടുത്ത തവണ ഡോക്ടറെ കാണുമ്പോൾ ഇത് കാണിക്കാം.",
      en: "Right, I've written it down. You can show this when you next see the doctor.",
      roman: "Shari, ezhuthiveccu. Aduthha thavana doctore kaanumpol ith kaanikkaam.",
    },
  },

  // Reads only what changed: new → changed → stopped, then unconfirmed, then the date.
  preVisitCall: {
    opening: {
      ml: "നാളെ ഡോക്ടറെ കാണാനുള്ളതല്ലേ? കഴിഞ്ഞ തവണ മുതൽ മാറിയത് പറയാം.",
      en: "You're seeing the doctor tomorrow. Here's what changed since last time.",
      roman: "Naale doctore kaanaanullathalle? Kazhinja thavana muthal maariyath parayaam.",
    },
  },

  // Demo-only limitation. Spoken in English so the line never goes silent.
  unsupportedLanguage: {
    en: "I'm still learning that language. Your record is on screen.",
  },

  // Speech recognition vocabulary (what she says, not what the UI shows).
  heard: {
    endTurn: { en: "that's all", ml: "അത്രേയുള്ളൂ", roman: "athreyullu" },
    // Accept both: അതെ is standard, ഉവ്വ് is more common in older rural speech.
    yes: { en: "yes", ml: ["അതെ", "ഉവ്വ്"], roman: ["athe", "uvvu"] },
  },
} as const;

export type Lang = "en" | "ml";
