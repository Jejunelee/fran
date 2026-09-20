import type { SectionStyles, SiteContent } from "./types";

const burgundy: SectionStyles = {
  headingColor: "#750000",
  bodyColor: "#5a0a0a",
  scriptColor: "#750000",
  accentColor: "#F5B7C4",
};

const creamOnDark: SectionStyles = {
  headingColor: "#F8F2E7",
  bodyColor: "#F8F2E7",
  scriptColor: "#F8F2E7",
  accentColor: "#F5B7C4",
};

const pinkOnDark: SectionStyles = {
  headingColor: "#F3C8D0",
  bodyColor: "#EFC0C9",
  scriptColor: "#F3C8D0",
  accentColor: "#F5B7C4",
};

export const defaultSiteContent: SiteContent = {
  home: {
    hero: {
      styles: burgundy,
      video: "/Hero/herobg4.mp4",
      line1: "At some point, the life",
      line2: "you built stops feeling",
      line3Before: "like",
      line3Script: "y",
      line3After: "ours",
      body: "Not because you chose wrong. You wanted it. You meant it. You just grew, and it didn’t grow with you. Aren’t you exhausted? I help women let go of what no longer fits, shed the roles they’ve outgrown, and come back to the one thing that’s been there the whole time.",
      ctaPrimary: "Take the 2-minute self-assessment",
      ctaPrimaryHref: "#self-assessment",
      ctaSecondary: "Book a call",
      ctaSecondaryHref: "#book-a-call",
      comingHome: "Coming home",
    },
    explain: {
      styles: { ...burgundy, headingColor: "#7f0f0f", scriptColor: "#7f0f0f" },
      background: "/Explain2/bg.png",
      artwork: "/Explain2/md2.png",
      artworkAlt: "Ornate mirror with woman and chair – decorative golden artwork",
      line1: "You already know",
      line2Before: "what's not",
      line2Script: "working",
      line3: "You've known for years",
      line4Before: "That's the part that's",
      line4Script: "exhausting",
      body: "You can name your patterns. You've named them out loud, to friends, over drinks, more times than you can count. You've read the books. You follow the accounts. You are not short on information.",
      rightHeading: "Deep down, you know:",
      rightBody: "The exhaustion isn't from doing too much. It's from carrying a life that no longer fits.",
      insights: [
        "You became who you needed to be to survive, and somewhere along the way, you lost yourself.",
        "You silence your truth before anyone else gets the chance to reject it.",
        "You crave deeper intimacy, yet hide the very parts that would make it possible.",
        "You shrink your power to stay lovable, digestible, and safe.",
        "And you're reaching a point where abandoning yourself hurts more than being fully seen.",
      ],
    },
    quote: {
      styles: burgundy,
      image: "/Quote/3.png",
      imageAlt: "Quote",
    },
    lion: {
      styles: burgundy,
      background: "/bg.png",
      image: "/Lion/1.png",
      imageAlt: "Lion – majestic, powerful, and aware",
      headingBefore1: "I don't give you more",
      headingScript1: "information",
      headingBefore2: "You've got",
      headingScript2: "plenty",
      paragraphs: [
        "You don't need another book, another podcast, another framework. I'm not against frameworks. I have a master's in psychology, I know they have their place. But you've already done that part. You've understood yourself from every possible angle.",
        "The problem was never that you don't know. It's that you're too close to your own patterns to see them clearly.",
        "That's where I come in. I see what you're doing, clearly and without flinching. The truths you soften. The stories you keep repeating. The ways you abandon yourself and call it being reasonable.",
        "Then I hold the mirror up. Not to shame you, not to fix you. Just to show you what you've been too close to see. And once you've seen it, you can't unsee it.",
        "That's where it starts to change. It's not always comfortable. But it sticks.",
      ],
    },
    selfAssess: {
      styles: burgundy,
      background: "/SelfAssess/P4.png",
      cat: "/SelfAssess/cat.png",
      heading: "Not sure if this is",
      headingScript: "your thing?",
      subheading: "Find out in 2 minutes",
      bodyMobile:
        "Twelve questions. They show which of four patterns you're stuck in — and where your work actually starts.",
      bodyDesktop:
        "Here are twelve questions. They show you which of four patterns you're most stuck in, and where the work actually starts for you. You get your result the second you finish, plus a breakdown that's specific to you.",
      cta: "TAKE THE SELF ASSESSMENT",
    },
    testimonials: {
      styles: burgundy,
      background: "/Testimonials/bg.png",
      headingBefore1: "What",
      headingScript1: "changes",
      headingAfter1: "when",
      headingBefore2: "someone actually",
      headingScript2: "sees you",
      items: [
        {
          text: "I thought I needed more motivation. What I actually needed was clarity. Coaching helped me make decisions with more confidence and less second-guessing.",
          desktopLines:
            "I thought I needed more motivation.\nWhat I actually needed was clarity.\nCoaching helped me make decisions\nwith more confidence and less\nsecond-guessing.",
          author: "BEA T.",
        },
        {
          text: "Working with Francesca helped me gain clarity and confidence in both my personal and professional life. I finally feel like I'm moving forward with purpose",
          desktopLines:
            "Working with Francesca helped\nme gain clarity and confidence in\nboth my personal and professional\nlife. I finally feel like I'm moving\nforward with purpose",
          author: "LIZA C.",
        },
        {
          text: "The sessions gave me practical tools to manage stress, set boundaries, and stay focused on my goals. I've seen real growth in just a few months",
          desktopLines:
            "The sessions gave me practical\ntools to manage stress, set\nboundaries, and stay focused on my\ngoals. I've seen real growth in just a\nfew months",
          author: "THEA D.",
        },
      ],
    },
    intro: {
      styles: burgundy,
      background: "/Intro/Pinkbg.png",
      image: "/Intro/FA.png",
      imageAlt: "Francesca – coach, psychologist, and guide",
      greeting: "Hi, I'm",
      name: "Francesca",
      bio: "I've built a few different lives. Each one was real, and I meant every one of them. The work was learning to recognize when a chapter had run its course, and to evolve with it instead of clinging on. Now I help other people do the same, without the years of trial and error it took me.",
      credentials:
        "MSc Psychology  |  Former beauty PR  |  Based in Manila, working with clients globally",
      cta: "Read My Story",
    },
    lead: {
      styles: burgundy,
      background: "/Lead/bg.png",
      image: "/Lead/1.png",
      imageAlt: "Lead – majestic, powerful, and aware",
      heading: "Ready to stop choosing",
      scriptWords: "comfort over truth?",
      body: "We start with a free 20-minute call to see if it's a fit.\nNot ready yet? Take the quiz instead.",
      ctaPrimary: "BOOK A CALL",
      ctaSecondary: "TAKE A QUIZ",
    },
  },
  about: {
    page: {
      styles: burgundy,
      background: "/AboutMe/main/white.png",
    },
    hero: {
      styles: burgundy,
      background: "/AboutMe/hero/hero.png",
      line1a: "I built a life",
      line1b: "I",
      line1Script: "genuinely",
      line1c: "wanted",
      line2Before: "Then I",
      line2Script: "outgrew",
      line2After: "it",
      line3: "Then I did it again.",
    },
    hi: {
      styles: { ...burgundy, bodyColor: "#111111" },
      background: "/AboutMe/hi/bg.png",
      greeting: "Hi, I'm",
      name: "Francesca",
      body: "Most coaching pages open with credentials. I'll get to mine. But credentials aren't why anyone hires a coach. They hire a coach because they want to know one thing: have you been where I am, and did you find your way through? So here's the version that matters.",
    },
    built: {
      styles: pinkOnDark,
      panelColor: "#5B0706",
      book: "/AboutMe/Built/book.png",
      photo: "/AboutMe/Built/pic.png",
      heading: "The life I",
      headingScript: "built",
      body1:
        "I spent my twenties chasing a very specific dream from fashion school in New York, a master's in fashion communications in London, then a career in beauty PR. And I want to be clear, because this is the part most people get wrong about stories like mine: I wasn't faking it. I loved it. The city, the work, the version of myself it let me be. It was real, and it was mine.",
      body2:
        "And then, slowly, it stopped fitting. Not because it had been wrong, but because I had changed and it hadn't. That's the part nobody warns you about. Even the things you genuinely love can quietly stop being yours.",
    },
    ended: {
      styles: burgundy,
      background: "/AboutMe/ended/bg.png",
      accentImage: "/AboutMe/ended/red.png",
      heading: "The moment it",
      headingScript: "ended",
      body1:
        "I was writing a content calendar for a feminine hygiene brand, for an influencer I didn't respect, and something in me just went quiet. I quit the next week. No plan. I just couldn't keep maintaining a version of myself that no longer fit.",
      body2: "That was the start of the real work.",
      body3:
        "I didn't find my purpose in a single clean epiphany. I found it the way most people do. Slowly, awkwardly, while doing other things. The thread that kept showing up was this: I was the friend people called when they were unraveling.",
    },
    pivot: {
      styles: burgundy,
      heading: "Coaching",
      headingMid: "wasn't a",
      headingScript: "pivot",
      body1: "It was the only thing I'd been doing consistently",
      body2: "my whole life. I just hadn't named it yet.",
    },
    again: {
      styles: burgundy,
      panelColor: "#750100",
      accentImage: "/AboutMe/again/gold.png",
      heading: "The version of me",
      headingMid: "that did it",
      headingScript: "again",
      paragraphs: [
        "I trained as a coach. I built the business. I got clients. I moved back to London. I did a second master's, this time in psychology, because I wanted the work grounded in more than my own instincts.",
        "And then life rerouted me again. Visa issues, of all things. So I came back to Manila, and started over one more time.",
        "But this time I knew what I was building toward. Not a version of myself that looked impressive. A version that fits who I'd actually become.",
        "Here's the thing I've learned doing this over and over. The careers changed. The cities changed. The dreams changed. The one constant, through all of it, was my relationship with myself. That's the whole of what I do now. I don't help you become someone new. I help you build a relationship with yourself that's strong enough to survive every version of your life.",
      ],
    },
    whereIAm: {
      styles: burgundy,
      images: [
        "/AboutMe/WhereIAm/4.png",
        "/AboutMe/WhereIAm/1.png",
        "/AboutMe/WhereIAm/3.png",
        "/AboutMe/WhereIAm/2.png",
      ],
      heading: "Where I am",
      headingScript: "now",
      paragraphs: [
        "I'm 36. I live in Manila. I work with clients globally. I have a master's in psychology and a clinical eye for patterns. I also have a colorful personal life, a sharp sense of humor, and a low tolerance for performed depth.",
        "I'm not a “healing” coach. I don't pull cards. I won't tell you to manifest your way out of grief. I'll tell you the truth, clearly, with care, and in a way that's hard to unsee once you've heard it.",
        "My work isn't about teaching you who to become. It's about helping you stay connected to yourself while you become it. That's the work. If it sounds like what you've been looking for, you're in the right place.",
      ],
    },
    credentials: {
      styles: burgundy,
      background: "/AboutMe/credentials/bg.png",
      headingScript: "credentials",
      headingMid: ", for the",
      headingEnd: "people who want them",
      items: [
        "MSc Psychology",
        "MA Fashion Communications and Branding",
        "Certified Life Coach",
        "Five years of 1:1 coaching practice",
        "A background in PR, branding, and communications, which is exactly why I can spot a performed version of someone from across a room",
      ],
    },
    belief: {
      styles: burgundy,
      background: "/AboutMe/belief/bg.png",
      heading: "What I actually",
      headingScript: "believe",
      items: [
        "Awareness is not the same as change. Most people get stuck mistaking one for the other.",
        "Toxic positivity is just avoidance with better lighting.",
        "You can be deeply emotional and brutally honest at the same time.",
        "Self-abandonment is socially rewarded. That's why it's so hard to spot.",
        "Resilience isn't bouncing back. It's trusting that you can navigate whatever's next, because you can navigate yourself.",
        "The goal was never certainty about what happens. The goal is knowing you'll be okay regardless of what happens.",
        "If a coach tells you they have all the answers, run.",
      ],
    },
    lead: {
      styles: burgundy,
      background: "/AboutMe/Lead/bg.png",
      heading: "If any of that",
      headingScript: "resonated",
      headingEndDesktop: "we should probably work.",
      headingEndMobile: "we should probably talk.",
      ctaPrimary: "BOOK A CALL",
      ctaSecondary: "TAKE A QUIZ",
    },
  },
  work: {
    hero: {
      styles: burgundy,
      video: "/WorkWithMe/Hero/herobg4.mp4",
      line1: "Homecoming",
      line2: "1:1 coaching with Francesca",
      body: "This isn't about becoming someone new, and it isn't about going back to who you used to be. It's about building a strong enough relationship with yourself that you can grow without abandoning who you already are.",
      comingHome: "Coming home",
    },
    who: {
      styles: creamOnDark,
      background: "/WorkWithMe/WhoIsThisFor/bg.png",
      heading: "Who this is for",
      items: [
        {
          icon: "/WorkWithMe/WhoIsThisFor/1.png",
          title: "You're already self-aware.",
          description:
            "You've done the reading, the journaling, maybe the therapy. You don't need a lecture on boundaries or attachment styles. You need help actually living what you already know.",
        },
        {
          icon: "/WorkWithMe/WhoIsThisFor/2.png",
          title: "You're high-functioning and quietly disconnected.",
          description:
            "From the outside, your life works. Inside, you've lost track of yourself somewhere along the way.",
        },
        {
          icon: "/WorkWithMe/WhoIsThisFor/3.png",
          title: "You're done with surface-level advice.",
          description:
            "You don't want a five-step framework. You want someone who can see you clearly, name what's happening, and stay in it with you.",
        },
        {
          icon: "/WorkWithMe/WhoIsThisFor/4.png",
          title: "You're in transition.",
          description:
            "A relationship, a career, a version of yourself. You're not lost. You're recalibrating, and you'd rather not do it alone.",
        },
      ],
    },
    notForYou: {
      styles: {
        headingColor: "#7D0808",
        bodyColor: "#7D0808",
        scriptColor: "#7D0808",
        accentColor: "#7D0808",
      },
      background: "/WorkWithMe/NotForYouIf/bg.png",
      headingBefore: "This is",
      headingScript: "not",
      headingAfter: "for you if:",
      bullets: [
        "You want a quick fix or a 30-day transformation.",
        "You want someone to tell you what to do.",
        "You want validation, not reflection. I'll be honest with you, even when it's uncomfortable. Especially then.",
        "You're not ready to sit with what comes up between sessions.",
      ],
    },
    how: {
      styles: { ...burgundy, headingColor: "#750100", bodyColor: "#750100" },
      background: "/WorkWithMe/HowItWorks/bg.png",
      cat: "/WorkWithMe/HowItWorks/cat.png",
      heading: "How it",
      headingScript: "works",
      containerLabel: "1:1 Coaching Container:",
      containerName: "“Homecoming”",
      bullets: [
        "Minimum 8 sessions, up to 12 weeks",
        "60-minute weekly sessions, conversational, led by whatever is actually coming up for you that week",
        "Voice-note and message support between sessions, for when something hits midweek and you can't wait for the next call",
        "Prompts, reflections, and the occasional framework sent between sessions, built around what you're working through. No generic workbooks.",
      ],
      investmentLabel: "Investment",
      investmentPrice: "USD $120 per session",
      investmentNote: "8-session minimum, payable per session or as a full container.",
      investmentBoxBg: "#750100",
      investmentBoxText: "#F8F1E7",
      rightCopy:
        "Eight sessions isn't arbitrary. Real pattern change takes time, and most of the meaningful shifts I see happen between sessions four and seven. Anything shorter is a conversation, not a container.",
    },
    what: {
      styles: {
        headingColor: "#5B0706",
        bodyColor: "#5B0706",
        scriptColor: "#5B0706",
        accentColor: "#5B0706",
      },
      background: "/WorkWithMe/WhatWorkOn/bg.png",
      headingLine1: "What we'll",
      headingScript: "actually",
      headingLine3: "work on",
      intro: "Every container is different, because every person is.",
      themesLabel: "The themes that come up most:",
      items: [
        {
          icon: "/WorkWithMe/WhatWorkOn/1.png",
          title: "Identity and self-trust",
          description:
            "Learning to tell the difference between who you are and the roles, careers, and expectations stacked on top of you.",
        },
        {
          icon: "/WorkWithMe/WhatWorkOn/2.png",
          title: "Self-abandonment",
          description:
            "The small, socially rewarded ways you've been leaving yourself for years without noticing.",
        },
        {
          icon: "/WorkWithMe/WhatWorkOn/3.png",
          title: "People-pleasing and performance",
          description:
            "The real cost of being easy to love, and what it's doing to your sense of self.",
        },
        {
          icon: "/WorkWithMe/WhatWorkOn/4.png",
          title: "Relationships and dating",
          description: "Closing the gap between knowing your worth and acting like it.",
        },
        {
          icon: "/WorkWithMe/WhatWorkOn/5.png",
          title: "Family and cultural expectations",
          description:
            "Especially in Asian family dynamics, where loyalty and self-abandonment get tangled up in each other.",
        },
        {
          icon: "/WorkWithMe/WhatWorkOn/6.png",
          title: "Resilience",
          description:
            "Not bouncing back, and not gritting through. Learning to trust that whatever season you're in, you can navigate it, because you can navigate yourself.",
        },
      ],
    },
    testimonials: {
      styles: burgundy,
      background: "/Testimonials/bg.png",
      headingLine1: "What",
      headingLine2: "clients",
      headingScript: "actually say",
      items: [
        {
          text: "I thought I needed more motivation. What I actually needed was clarity. Coaching helped me make decisions with more confidence and less second-guessing.",
          desktopLines:
            "I thought I needed more motivation.\nWhat I actually needed was clarity.\nCoaching helped me make decisions\nwith more confidence and less\nsecond-guessing.",
          author: "BEA T.",
        },
        {
          text: "Working with my Francesca helped me gain clarity and confidence in both my personal and professional life. I finally feel like I'm moving forward with purpose",
          desktopLines:
            "Working with my Francesca helped\nme gain clarity and confidence in\nboth my personal and professional\nlife. I finally feel like I'm moving\nforward with purpose",
          author: "LIZA C.",
        },
        {
          text: "The sessions gave me practical tools to manage stress, set boundaries, and stay focused on my goals. I've seen real growth in just a few months",
          desktopLines:
            "The sessions gave me practical\ntools to manage stress, set\nboundaries, and stay focused on my\ngoals. I've seen real growth in just a\nfew months",
          author: "THEA D.",
        },
      ],
    },
    process: {
      styles: burgundy,
      background: "/WorkWithMe/Process/bgcombined1.png",
      frame: "/WorkWithMe/Process/1.png",
      heading: "The",
      headingScript: "process",
      steps: [
        {
          number: "01",
          title: "Book a free 20-minute call.",
          description:
            "We talk. I ask questions. You ask questions. We figure out whether this is the right work, at the right time, with the right person.",
        },
        {
          number: "02",
          title: "If it's a fit, you pick a start date.",
          description:
            "I send the welcome pack: a short intake, the schedule, everything you need to begin.",
        },
        {
          number: "03",
          title: "We begin.",
          description:
            "Weekly sessions, between-session access, and we shape the work around whatever is actually happening in your life.",
        },
        {
          number: "04",
          title: "After 8 sessions, we check in.",
          description:
            "Some people close out the work here, some extend to 12 weeks. Both are right.",
        },
      ],
    },
    faq: {
      styles: burgundy,
      heading: "FAQs",
      items: [
        {
          question: "I've worked with coaches before and it didn't stick. How is this different?",
          answer:
            "Most coaching hands you frameworks. This is more like holding a mirror up. Accurately, without judgment, and with enough care that you can actually look at what's reflected back. Frameworks fade. Seeing yourself clearly doesn't.",
        },
        {
          question: "I'm not based in Manila. Does that matter?",
          answer:
            "No. Sessions are virtual, or in person if you're local. I work with clients all over.",
        },
        {
          question: "Is this therapy?",
          answer:
            "No. I have a master's in psychology, but coaching and therapy are different practices. If you're navigating clinical-level concerns like active depression, trauma processing, or an eating disorder, I'll always point you to a licensed therapist. Sometimes alongside coaching, sometimes instead of it. I'll be honest with you about what I think you need.",
        },
        {
          question: "What if I can't commit to 8 sessions, financially or time-wise?",
          answer:
            "Then this isn't the right container right now, and that's okay. Take the self-assessment, join the email list for free reflections and supper club invites, and come back when the timing's right.",
        },
        {
          question: "Can I pay per session?",
          answer:
            "Yes. Pay as you go, or pay for the full 8-session container upfront. There's no discount for paying upfront, but some clients prefer it, because the commitment is part of the work.",
        },
      ],
    },
    cta: {
      styles: burgundy,
      image: "",
      headingLine1: "If you're still reading, you're",
      headingLine2: "probably the",
      headingScript: "right person.",
      notReady: "Not quite ready?",
      selfAssess: "Take the self-assessment",
      joinList: "and join the list.",
      ctaPrimary: "BOOK A CALL",
      ctaSecondary: "TAKE A QUIZ",
    },
  },
  contact: {
    main: {
      styles: burgundy,
      image: "/Contact/left.png",
      heading: "Contact",
      headingScript: "Let's",
      headingEnd: "talk.",
      intro: "There are two ways to start. Pick whichever feels right.",
      option1Title: "Option 1: Book a free 20-minute call",
      option1Body:
        "This is a conversation, not a sales call. We talk. I listen. I ask questions. You ask questions. By the end of 20 minutes, we both know whether to move forward.",
      option1Cta: "Book a call →",
      option2Title: "Option 2: Send me a message",
      option2Body:
        "For a specific question, group offerings, supper club invitations, or corporate work.",
      option2Cta: "Send message →",
      note: "I read every message myself. I usually reply within 2 to 3 working days.",
      findMe: "find me",
    },
  },
};
