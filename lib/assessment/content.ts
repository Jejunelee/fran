import type { Choice } from "./types";

/**
 * Assessment copy, transcribed from the source PDFs.
 * Wording is intentional. Change it only when the source material changes.
 * Apostrophes are typographic so the page matches the rest of the site.
 */

export type Question = {
  id: number;
  part: 1 | 2 | 3;
  partLabel?: string;
  prompt: string;
  choices: readonly { letter: Choice; text: string }[];
};

export type PersonaId = "curious" | "compromiser" | "autopilot" | "stranger";

export type Persona = {
  id: PersonaId;
  letter: Choice;
  name: string;
  sections: readonly { heading: string; paragraphs: readonly string[] }[];
};

export type StickingPoint = {
  letter: Choice;
  title: string;
  body: string;
};

export type ReadinessId = "ready" | "close" | "not-yet";

export type ResultCta = {
  label: string;
  href: string;
  external?: boolean;
};

export type Readiness = {
  id: ReadinessId;
  headline: string;
  body: string;
  ctas: readonly ResultCta[];
};

/**
 * “Book Your Vibe Check” opens the Calendly page.
 * “Explore free resources” goes to Instagram. That is the live free-content
 * destination on the site. The Resources nav item does not have a page yet.
 */
export const RESULT_LINKS = {
  bookCall: "https://calendly.com/francescaatendido/60min",
  freeResources: "https://www.instagram.com/francescaatendido/",
} as const;

const bookCall: ResultCta = {
  label: "Book Your Vibe Check",
  href: RESULT_LINKS.bookCall,
  external: true,
};

const freeResources: ResultCta = {
  label: "Explore free resources",
  href: RESULT_LINKS.freeResources,
  external: true,
};

export const QUESTIONS: readonly Question[] = [
  {
    id: 1,
    part: 1,
    prompt:
      "Someone asks you, “What brings you joy?” What’s your immediate reaction?",
    choices: [
      {
        letter: "A",
        text: "I could answer pretty easily. I know what I enjoy and I make space for those things, but I’m always open to discovering more.",
      },
      {
        letter: "B",
        text: "I know what I’d say, although when I think about it, a lot of those things don’t happen as often as I’d like anymore.",
      },
      {
        letter: "C",
        text: "I’d probably need a second. Life’s been so busy lately that I haven’t really thought about what I enjoy outside of everything I have going on.",
      },
      {
        letter: "D",
        text: "I’d probably say things like my friends, family, travelling or having a good time, but beyond the obvious answers, I’m not really sure what I’d say.",
      },
    ],
  },
  {
    id: 2,
    part: 1,
    prompt:
      "Someone is talking about something you disagree with. What’s most likely happening in your head?",
    choices: [
      {
        letter: "A",
        text: "I can see where they’re coming from, but I still know what I think.",
      },
      {
        letter: "B",
        text: "Maybe they have a point. Am I being too rigid about this?",
      },
      {
        letter: "C",
        text: "I’d probably get caught up in what they’re saying and only realise later that I actually didn’t agree with it.",
      },
      {
        letter: "D",
        text: "Honestly, I don’t have strong opinions on a lot of things. Unless it really matters to me, I’m usually somewhere in the middle.",
      },
    ],
  },
  {
    id: 3,
    part: 1,
    prompt:
      "You’re in the middle of something that feels almost impossible to solve. What do you usually do?",
    choices: [
      {
        letter: "A",
        text: "I start experimenting. If the obvious way isn’t working, I’m usually pretty good at finding another way in.",
      },
      {
        letter: "B",
        text: "I can usually think of other ways to approach it, but I have a habit of talking myself out of the riskier or less obvious ones.",
      },
      {
        letter: "C",
        text: "I’ll keep trying to make the approach I know work for longer than I probably should before considering something completely different.",
      },
      {
        letter: "D",
        text: "I tend to get stuck. Once the ways I know how to handle something stop working, it’s hard for me to see what else I could do.",
      },
    ],
  },
  {
    id: 4,
    part: 1,
    prompt: "When something really hurts or upsets you, what tends to happen?",
    choices: [
      {
        letter: "A",
        text: "I let myself feel it. I might not like it, but I know I can be uncomfortable without needing to make the feeling go away immediately.",
      },
      {
        letter: "B",
        text: "I know I need to feel it, but I’ll usually bargain with myself a bit first. I’ll distract myself, rationalise it or tell myself I’m fine before eventually dealing with it.",
      },
      {
        letter: "C",
        text: "I tend to keep going. Work, plans, errands, whatever needs doing. I usually deal with how I feel once everything else quiets down.",
      },
      {
        letter: "D",
        text: "I find painful feelings really difficult to sit with. When they come up, I mostly just want to feel like myself again.",
      },
    ],
  },
  {
    id: 5,
    part: 1,
    prompt:
      "When you think about the relationships you value most, what do they give you?",
    choices: [
      {
        letter: "A",
        text: "They challenge me, expose me to different ways of thinking and give me room to keep becoming more of myself.",
      },
      {
        letter: "B",
        text: "They make me feel loved and understood, but I know I sometimes rely on that reassurance more than I’d like to admit.",
      },
      {
        letter: "C",
        text: "I’ve never really thought about it. My relationships are just part of my life, and I tend to take them as they are rather than question what they mean to me now.",
      },
      {
        letter: "D",
        text: "They’re a huge source of safety for me. When an important relationship feels uncertain, it can affect everything else because I rely on the people I love to feel grounded.",
      },
    ],
  },
  {
    id: 6,
    part: 1,
    prompt:
      "Something comes your way that you know could be really good for you, but it would push you outside your comfort zone. What do you tend to do?",
    choices: [
      {
        letter: "A",
        text: "I’ll usually go for it. I might be nervous, but that doesn’t make me think I shouldn’t do it.",
      },
      {
        letter: "B",
        text: "I want to say yes, but I can immediately think of all the reasons it might not be the right time, the right move or worth the risk.",
      },
      {
        letter: "C",
        text: "I tend to stick with what I already have going on. Unless there’s a really compelling reason to change course, I don’t usually disrupt things.",
      },
      {
        letter: "D",
        text: "My first instinct is usually to pull back. Even when I know something could be good for me, unfamiliar territory can feel more threatening than exciting.",
      },
    ],
  },
  {
    id: 7,
    part: 1,
    prompt:
      "Imagine you wake up tomorrow and somehow have everything you’ve always said you wanted. What happens?",
    choices: [
      {
        letter: "A",
        text: "I think I’d genuinely enjoy it. I’m sure I’d want other things eventually, but I’m pretty good at appreciating when life is good.",
      },
      {
        letter: "B",
        text: "I’d be happy, but knowing me, I’d eventually find something that still wasn’t quite right or start thinking about what could be better.",
      },
      {
        letter: "C",
        text: "I’d enjoy it, but I know I’d eventually start thinking about the next thing I want to do, achieve or work towards. That’s just how I operate.",
      },
      {
        letter: "D",
        text: "I honestly think I’d feel a bit uneasy. I’m so used to wanting, working towards or worrying about something that having nothing to fix would feel strange.",
      },
    ],
  },
  {
    id: 8,
    part: 2,
    partLabel: "What gets in the way",
    prompt:
      "Real change often asks something from us before we see the payoff. Which of these would be hardest for you to commit to right now?",
    choices: [
      {
        letter: "A",
        text: "Continuing to work on something when I’m frustrated that I haven’t seen results yet.",
      },
      {
        letter: "B",
        text: "Trying a different response even when my usual one feels safer or more natural.",
      },
      {
        letter: "C",
        text: "Making time for the work consistently, especially when life gets busy.",
      },
      {
        letter: "D",
        text: "Having conversations or making decisions I’ve been putting off.",
      },
    ],
  },
  {
    id: 9,
    part: 3,
    partLabel: "Where you are now",
    prompt:
      "When you notice yourself repeating a pattern that you know isn’t serving you, what best describes where you are right now?",
    choices: [
      {
        letter: "A",
        text: "I know the pattern, I’m tired of repeating it, and I’m ready to understand what it will take to actually change it.",
      },
      {
        letter: "B",
        text: "I’m not always sure what the pattern is yet. I just know something keeps feeling off.",
      },
      {
        letter: "C",
        text: "I can usually see the pattern, but I’ve mostly learned to live with it.",
      },
      {
        letter: "D",
        text: "I know the pattern and I want things to change, but I keep finding myself back in the same place.",
      },
    ],
  },
  {
    id: 10,
    part: 3,
    partLabel: "Where you are now",
    prompt:
      "Once you became aware of the patterns holding you back, what did you do with that awareness?",
    choices: [
      {
        letter: "A",
        text: "I’ve tried to work on it on my own, but if I’m honest, I’m inconsistent and tend to fall back into what’s familiar.",
      },
      {
        letter: "B",
        text: "I’ve actively sought support, applied what I’ve learned and made changes, but I’m ready to go deeper.",
      },
      {
        letter: "C",
        text: "Mostly nothing. I know what I do and why I do it, but I haven’t really changed how I respond.",
      },
      {
        letter: "D",
        text: "I’ve made intentional changes, but there are certain patterns I still can’t seem to shift on my own.",
      },
    ],
  },
  {
    id: 11,
    part: 3,
    partLabel: "Where you are now",
    prompt:
      "When you think about making the changes you know you need to make, which feels closest to where you are right now?",
    choices: [
      {
        letter: "A",
        text: "I’m scared of what changing might require from me, but I’m starting to realize that staying where I am is costing me more.",
      },
      {
        letter: "B",
        text: "I know something needs to change, but the thought of disrupting what I know still feels scarier than staying where I am.",
      },
      {
        letter: "C",
        text: "I know change will be uncomfortable. But honestly, so is my life right now. I’d rather go through the discomfort of changing than keep living like this.",
      },
      {
        letter: "D",
        text: "I’m unhappy with where I am, but part of me is still hoping things will change without me having to make any difficult decisions.",
      },
    ],
  },
  {
    id: 12,
    part: 3,
    partLabel: "Where you are now",
    prompt:
      "When you look at an area of your life that isn’t working, how do you tend to make sense of why you’re still there?",
    choices: [
      {
        letter: "A",
        text: "I can see where circumstances have affected me and where my own choices have kept me stuck. I’m trying to take more ownership of what I can control.",
      },
      {
        letter: "B",
        text: "A lot of it comes down to circumstances, timing or other people. There are things I simply can’t control.",
      },
      {
        letter: "C",
        text: "I may not be responsible for everything that happened to me, but I’m responsible for what I do from here. I’m ready to look honestly at where I might be getting in my own way.",
      },
      {
        letter: "D",
        text: "I know I play a part, but I also have very real reasons for why changing hasn’t been possible yet.",
      },
    ],
  },
];

export const PERSONAS: Record<PersonaId, Persona> = {
  curious: {
    id: "curious",
    letter: "A",
    name: "The Curious",
    sections: [
      {
        heading: "Core pattern",
        paragraphs: [
          "You have a fairly strong relationship with yourself. You know what you like, what matters to you and what feels right for you. You’re not taking this assessment because you’ve completely lost yourself. You’re here because you’re interested in understanding yourself more deeply and you’re aware that who you are is still evolving.",
        ],
      },
      {
        heading: "Strengths",
        paragraphs: [
          "You’re self-aware, reflective and open to new experiences. You can usually trust your own judgement without needing everyone around you to agree with it. You’re also able to question yourself without immediately assuming something is wrong with you.",
        ],
      },
      {
        heading: "Weaknesses",
        paragraphs: [
          "Because you already know yourself quite well, you can sometimes assume that awareness is enough. You may understand your patterns beautifully without necessarily noticing the subtler ways you’ve outgrown parts of your life.",
        ],
      },
      {
        heading: "What to watch",
        paragraphs: [
          "Don’t let self-awareness become a finished identity. The version of you that you understand today isn’t necessarily the version of you that needs to make your next decisions.",
        ],
      },
      {
        heading: "Growth edge",
        paragraphs: [
          "Keep paying attention to what is changing. What are you becoming more drawn towards? What matters less? What are you no longer willing to tolerate? Your work is less about finding yourself and more about continuing to meet yourself as you evolve.",
        ],
      },
    ],
  },
  compromiser: {
    id: "compromiser",
    letter: "B",
    name: "The Compromiser",
    sections: [
      {
        heading: "Core pattern",
        paragraphs: [
          "You know yourself. The problem is that you don’t always choose accordingly.",
          "You usually have a pretty good sense of what you want, what matters to you and when something doesn’t feel right. But somewhere between knowing and doing, negotiation begins. You make exceptions. You find reasonable explanations. You convince yourself something is fine when you already know it isn’t quite right for you.",
        ],
      },
      {
        heading: "Strengths",
        paragraphs: [
          "You’re perceptive, emotionally intelligent and capable of seeing complexity. You don’t make decisions recklessly, and you’re often very good at considering different perspectives and understanding consequences.",
        ],
      },
      {
        heading: "Weaknesses",
        paragraphs: [
          "That same ability to see every side can make you incredibly good at talking yourself out of what you already know. You can rationalise almost anything, particularly when choosing yourself would create discomfort, uncertainty or disruption.",
        ],
      },
      {
        heading: "What to watch",
        paragraphs: [
          "The individual compromises rarely look dramatic. The danger is accumulation. Enough small decisions against yourself can eventually create a life that looks perfectly reasonable but doesn’t feel particularly yours.",
        ],
      },
      {
        heading: "Growth edge",
        paragraphs: [
          "Pay attention to the gap between what you say matters to you and what your choices repeatedly demonstrate. You probably don’t need significantly more insight. You need to start trusting and acting on the insight you already have.",
        ],
      },
    ],
  },
  autopilot: {
    id: "autopilot",
    letter: "C",
    name: "The Autopilot",
    sections: [
      {
        heading: "Core pattern",
        paragraphs: [
          "You’ve become very good at getting on with life.",
          "You handle what needs handling, maintain your responsibilities and keep things moving. But because you’re so used to functioning, you may not regularly stop to ask whether the things you’re maintaining still make sense for who you are now.",
        ],
      },
      {
        heading: "Strengths",
        paragraphs: [
          "You’re dependable, capable and resilient. You know how to keep going without needing to constantly analyse yourself or every decision you make. There’s stability in the way you operate, and that can make you someone other people rely on.",
        ],
      },
      {
        heading: "Weaknesses",
        paragraphs: [
          "Familiarity can become your default decision-maker. You may continue relationships, routines, goals, habits or even versions of yourself simply because they’re already there. Nothing necessarily feels wrong enough to change, so very little gets questioned.",
        ],
      },
      {
        heading: "What to watch",
        paragraphs: [
          "A life doesn’t have to be falling apart for you to have outgrown it. Autopilot can keep something running long after you would have stopped choosing it consciously.",
        ],
      },
      {
        heading: "Growth edge",
        paragraphs: [
          "Interrupt the automatic. Start asking yourself questions you haven’t needed to ask in a while: Do I still like this? Do I still want this? Does this still matter to me? If I were choosing this for the first time today, would I choose it again?",
        ],
      },
    ],
  },
  stranger: {
    id: "stranger",
    letter: "D",
    name: "The Stranger",
    sections: [
      {
        heading: "Core pattern",
        paragraphs: [
          "You’ve become difficult for yourself to read.",
          "You can function, make decisions and move through your life, but your own internal reference point has become harder to access. You may know the facts about yourself very well without feeling particularly clear about what you want, what genuinely fulfils you or what feels most like you anymore.",
        ],
      },
      {
        heading: "Strengths",
        paragraphs: [
          "You’re adaptable. You’ve learned how to function across different circumstances, relationships and expectations, and you may be very good at finding stability through the people and structures around you.",
        ],
      },
      {
        heading: "Weaknesses",
        paragraphs: [
          "When you don’t have a strong internal reference point, external things can start carrying too much weight. Relationships can become your sense of safety. Familiarity can feel like correctness. Other people’s opinions can become easier to access than your own.",
        ],
      },
      {
        heading: "What to watch",
        paragraphs: [
          "The danger isn’t simply “not knowing yourself.” It’s continuing to make important decisions without knowing the person those decisions are supposed to serve.",
        ],
      },
      {
        heading: "Growth edge",
        paragraphs: [
          "Before trying to figure out your entire life, start gathering information about yourself again. Your preferences. Your opinions. Your limits. What gives you energy. What drains you. What you want when nobody else is part of the equation. The goal is to slowly become familiar to yourself again.",
        ],
      },
    ],
  },
};

export const PERSONA_BY_LETTER: Record<Choice, Persona> = {
  A: PERSONAS.curious,
  B: PERSONAS.compromiser,
  C: PERSONAS.autopilot,
  D: PERSONAS.stranger,
};

export const STICKING_POINTS: Record<Choice, StickingPoint> = {
  A: {
    letter: "A",
    title: "Staying with the work when results are slow.",
    body: "Expect a stretch where you’re doing everything right and nothing seems to move yet. Plan for it now so it doesn’t surprise you.",
  },
  B: {
    letter: "B",
    title: "Choosing a new response when the old one feels safer.",
    body: "Your usual reaction is fast and automatic, so change will feel awkward before it feels natural.",
  },
  C: {
    letter: "C",
    title: "Protecting time for the work when life gets busy.",
    body: "Busy weeks are when your patterns get loudest, which makes them the weeks that count most.",
  },
  D: {
    letter: "D",
    title: "The conversations and decisions you’ve been putting off.",
    body: "Some of the change you want is waiting on one of them.",
  },
};

export const READINESS: Record<ReadinessId, Readiness> = {
  ready: {
    id: "ready",
    headline: "You sound ready to work on this.",
    body: "You can see the pattern, you’ve already tried to shift it, and you’re willing to be uncomfortable. That’s exactly where coaching helps most. The first step is a free 20-minute call to see if we’re a fit.",
    ctas: [bookCall],
  },
  close: {
    id: "close",
    headline: "You’re closer than you think.",
    body: "Part of you is ready and part of you is still weighing it up. That’s normal. Start with the free resources, and book a call whenever it feels right.",
    ctas: [freeResources, bookCall],
  },
  "not-yet": {
    id: "not-yet",
    headline: "Start by getting to know the pattern.",
    body: "Naming your pattern is real progress. Spend some time with it before deciding on anything bigger. The free resources are a good place to start.",
    ctas: [freeResources],
  },
};
