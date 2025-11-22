
export type LanguageCode = 'en' | 'hi' | 'mr' | 'es' | 'fr' | 'ta' | 'or' | 'te' | 'ml';

const en = {
  appTitle: "CulturaX",
  subtitle: "Civic Sense Comic Creator",
  nav: {
    home: "Home",
    features: "Features",
    downloads: "Downloads",
    impact: "Impact",
    team: "Team",
    contact: "Contact",
    launch: "Launch Studio",
    feedback: "Feedback"
  },
  hero: {
    title: "Preserving History with",
    highlight: "AR Innovation",
    desc: "CulturaX brings India's cultural heritage to life using immersive Augmented Reality, making monuments accessible to every student, tourist, and citizen — anywhere and anytime.",
    tryNow: "Try Now",
    demo: "Interactive Demo",
    demoDesc: "Experience the Taj Mahal in AR"
  },
  why: {
    title: "Why CulturaX?",
    items: [
      "Offline AR experience for remote accessibility.",
      "360° immersive monument reconstructions.",
      "Educational platform built for schools & colleges.",
      "Interactive storytelling for cultural learning.",
      "Built for low-end devices.",
      "Digitally preserves India's historical landmarks."
    ]
  },
  features: {
    title: "Core Features",
    f1: { t: "Offline AR Access", d: "Explore monuments anytime without internet dependency." },
    f2: { t: "Marker-Based Accuracy", d: "Reliable AR tracking for stable viewing on all devices." },
    f3: { t: "Immersive Learning", d: "Perfect for tourism, academics, and cultural awareness." },
    f4: { t: "High-Performance", d: "Optimized 3D models for smooth performance." },
    f5: { t: "Cross-Platform", d: "Works on Android & iOS seamlessly." },
    f6: { t: "Cultural Preservation", d: "Digitally archiving India’s monuments for future generations." }
  },
  downloads: {
    title: "Download Our Apps",
    subtitle: "Experience the full power of CulturaX with our dedicated mobile applications.",
    bookletTitle: "CulturaX Booklet AR",
    bookletDesc: "Interactive learning through AR-enabled heritage booklets. Point your camera at our specific markers.",
    bookletPreview: "Preview Booklet (Watermarked)",
    bookletBuy: "Buy & Download",
    gpTitle: "CulturaX Groundplan AR",
    gpDesc: "Visualize architectural layouts and site maps in 3D space. Understand the scale of heritage sites.",
    downloadApk: "Download APK",
    offlineTag: "Offline Mode",
    onlineTag: "Online Mode"
  },
  impact: {
    title: "Impact & Benefits",
    items: [
      "Democratizes access to India’s heritage.",
      "Enhances classroom learning using AR.",
      "Boosts cultural awareness across youth.",
      "Supports tourism growth & digital innovation.",
      "Preserves monuments digitally.",
      "Creates AR & tech-based employment opportunities."
    ]
  },
  team: {
    title: "Meet the Team",
    lead: "Team Lead",
    member: "Member"
  },
  footer: {
    contact: "Contact Us",
    text: "For queries, collaborations, or access to the CulturaX APK:",
    rights: "© 2025 CulturaX • All Rights Reserved"
  },
  purchase: {
    title: "Request App Access",
    step1: "Your Details",
    step2: "Verification",
    step3: "Confirmation",
    nameLabel: "Full Name",
    emailLabel: "Email Address",
    phoneLabel: "Phone Number",
    payBtn: "Request Access",
    processing: "Submitting Request...",
    successTitle: "Request Received!",
    successDesc: "Payment details and download instructions have been sent to your email ID. You will receive the app link after payment verification.",
    downloadBtn: "Close",
    secureBadge: "Secure Registration"
  },
  feedback: {
    title: "We Value Your Feedback",
    subtitle: "Help us improve the CulturaX experience for everyone.",
    placeholder: "Share your thoughts, suggestions, or report issues here...",
    submit: "Send Feedback",
    success: "Thank you! Your feedback helps us grow.",
    ratingLabel: "Rate your experience:"
  },
  // Comic Creator & Existing Translations
  sceneLabel: "What is happening in the scene?",
  placeholder: "e.g., A boy throwing a plastic bottle in a historic garden...",
  clear: "Clear",
  paint: "Paint Panel",
  loadingStory: "Writing the lesson",
  loadingPaint: "Painting the scene",
  magicEdit: "Magical Edits",
  editPlaceholder: "e.g., Add a retro filter, Remove background...",
  introTitle: "Let's create a story!",
  introText: "Teach others how to protect our beautiful heritage sites. Type a scenario and watch the magic happen!",
  suggestions: [
    "Kids planting a tree near a fort",
    "A tourist picking up trash",
    "Correcting a litterer at a heritage site",
    "Quietly observing a museum exhibit"
  ],
  ep: "Ep.",
  tooltips: {
    edit: "Edit Image",
    download: "Download",
    share: "Share",
    delete: "Delete",
    read: "Read Aloud"
  },
  errorGen: "Oops! The artists dropped their brushes. Please try again.",
  errorEdit: "Magic spell failed! Could not edit the image.",
  quiz: {
    button: "Take the Quiz!",
    title: "Civic Sense Challenge",
    loading: "Preparing your challenge...",
    next: "Next Question",
    resultTitle: "Quiz Complete!",
    greatJob: "Awesome! You are a true Heritage Guardian!",
    goodTry: "Good try! Keep learning to protect our history.",
    score: "Your Score:",
    restart: "Play Again",
    close: "Close"
  },
  shareStory: {
    button: "Share Full Story",
    generating: "Creating Story Collage...",
    success: "Story Ready!",
    error: "Could not create story."
  },
  tabs: {
    studio: "Creative Studio",
    book: "The Guardian's Chronicles"
  },
  comicBook: {
    title: "The Guardian's Chronicles",
    subtitle: "Tales of Respect & Care",
    nextBtn: "Next",
    prevBtn: "Prev",
    page: "Page",
    official: "Official Story",
    userStory: "User Created",
    empty: "Create more stories in the Studio to add pages here!"
  },
  officialStories: {
      s1: "Cleanliness is next to Godliness. We must keep our public places clean. Don't litter.",
      s2: "Atithi Devo Bhava: The guest is equivalent to God. Respecting tourists is respecting our own culture.",
      s3: "Please do not write on the walls! Cleanliness and respect are the marks of a true tourist.",
      s4: "Shhh! Keep the volume down. Being considerate makes public places pleasant for everyone!"
  }
};

const hi = {
  appTitle: "CulturaX",
  subtitle: "नागरिक जागरूकता कॉमिक निर्माता",
  nav: {
    home: "होम",
    features: "विशेषताएँ",
    downloads: "डाउनलोड",
    impact: "प्रभाव",
    team: "टीम",
    contact: "संपर्क",
    launch: "स्टूडियो शुरू करें",
    feedback: "प्रतिक्रिया"
  },
  hero: {
    title: "इतिहास का संरक्षण",
    highlight: "AR नवाचार के साथ",
    desc: "CulturaX भारत की सांस्कृतिक विरासत को इमर्सिव ऑगमेंटेड रियलिटी का उपयोग करके जीवंत करता है।",
    tryNow: "अभी आज़माएं",
    demo: "इंटरएक्टिव डेमो",
    demoDesc: "ताजमहल को AR में देखें"
  },
  why: {
    title: "CulturaX क्यों?",
    items: [
      "दूरस्थ पहुंच के लिए ऑफ़लाइन AR अनुभव।",
      "360° इमर्सिव स्मारक पुनर्निर्माण।",
      "स्कूलों और कॉलेजों के लिए शैक्षिक मंच।",
      "सांस्कृतिक सीखने के लिए इंटरएक्टिव कहानी।",
      "कम-अंत वाले उपकरणों के लिए बनाया गया।",
      "भारत के ऐतिहासिक स्थलों को डिजिटल रूप से संरक्षित करता है।"
    ]
  },
  features: {
    title: "मुख्य विशेषताएँ",
    f1: { t: "ऑफ़लाइन AR एक्सेस", d: "इंटरनेट के बिना कभी भी स्मारकों का अन्वेषण करें।" },
    f2: { t: "मार्कर-आधारित सटीकता", d: "सभी उपकरणों पर स्थिर देखने के लिए विश्वसनीय AR ट्रैकिंग।" },
    f3: { t: "इमर्सिव लर्निंग", d: "पर्यटन, शिक्षा और सांस्कृतिक जागरूकता के लिए उत्तम।" },
    f4: { t: "उच्च प्रदर्शन", d: "सुचारू प्रदर्शन के लिए अनुकूलित 3D मॉडल।" },
    f5: { t: "क्रॉस-प्लॅटफ़ॉर्म", d: "Android और iOS पर निर्बाध रूप से काम करता है।" },
    f6: { t: "सांस्कृतिक संरक्षण", d: "भविष्य की पीढ़ियों के लिए भारत के स्मारकों को डिजिटल रूप से संग्रहीत करना।" }
  },
  downloads: {
    title: "हमारे ऐप्स डाउनलोड करें",
    subtitle: "हमारे समर्पित मोबाइल एप्लिकेशन के साथ CulturaX की पूरी शक्ति का अनुभव करें।",
    bookletTitle: "CulturaX बुकलेट AR",
    bookletDesc: "AR-सक्षम विरासत पुस्तिकाओं के माध्यम से इंटरएक्टिव शिक्षा।",
    bookletPreview: "पूर्वावलोकन (वाटरमार्क)",
    bookletBuy: "खरीदें और डाउनलोड करें",
    gpTitle: "CulturaX ग्राउंडप्लान AR",
    gpDesc: "3D स्पेस में आर्किटेक्चरल लेआउट और साइट मैप की कल्पना करें।",
    downloadApk: "APK डाउनलोड करें",
    offlineTag: "ऑफ़लाइन मोड",
    onlineTag: "ऑनलाइन मोड"
  },
  impact: {
    title: "प्रभाव और लाभ",
    items: [
      "भारत की विरासत तक पहुंच का लोकतंत्रीकरण।",
      "AR का उपयोग करके कक्षा सीखने को बढ़ाता है।",
      "युवाओं में सांस्कृतिक जागरूकता बढ़ाता है।",
      "पर्यटन विकास और डिजिटल नवाचार का समर्थन करता है।",
      "स्मारकों को डिजिटल रूप से संरक्षित करता है।",
      "AR और तकनीकी-आधारित रोजगार के अवसर पैदा करता है।"
    ]
  },
  team: {
    title: "टीम से मिलें",
    lead: "टीम लीड",
    member: "सदस्य"
  },
  footer: {
    contact: "संपर्क करें",
    text: "प्रश्नों, सहयोग, या CulturaX APK तक पहुंच के लिए:",
    rights: "© 2025 CulturaX • सर्वाधिकार सुरक्षित"
  },
  purchase: {
    title: "ऐप एक्सेस का अनुरोध करें",
    step1: "आपका विवरण",
    step2: "सत्यापन",
    step3: "पुष्टि",
    nameLabel: "पूरा नाम",
    emailLabel: "ईमेल पता",
    phoneLabel: "फ़ोन नंबर",
    payBtn: "एक्सेस का अनुरोध करें",
    processing: "अनुरोध भेजा जा रहा है...",
    successTitle: "अनुरोध प्राप्त हुआ!",
    successDesc: "भुगतान विवरण और डाउनलोड निर्देश आपकी ईमेल आईडी पर भेज दिए गए हैं। भुगतान पुष्टि के बाद आपको लिंक प्राप्त होगा।",
    downloadBtn: "बंद करें",
    secureBadge: "सुरक्षित पंजीकरण"
  },
  feedback: {
    title: "आपकी प्रतिक्रिया महत्वपूर्ण है",
    subtitle: "CulturaX अनुभव को बेहतर बनाने में हमारी सहायता करें।",
    placeholder: "अपने विचार, सुझाव साझा करें या समस्याओं की रिपोर्ट करें...",
    submit: "प्रतिक्रिया भेजें",
    success: "धन्यवाद! आपकी प्रतिक्रिया हमें आगे बढ़ने में मदद करती है।",
    ratingLabel: "अपना अनुभव रेट करें:"
  },
  sceneLabel: "दृश्य में क्या हो रहा है?",
  placeholder: "उदा. एक लड़का ऐतिहासिक बगीचे में प्लास्टिक की बोतल फेंक रहा है...",
  clear: "साफ़ करें",
  paint: "पेंट करें",
  loadingStory: "पाठ लिख रहे हैं",
  loadingPaint: "चित्र बना रहे हैं",
  magicEdit: "जादुई संपादन",
  editPlaceholder: "उदा. रेट्रो फ़िल्टर जोड़ें...",
  introTitle: "चलो एक कहानी बनाएँ!",
  introText: "दूसरों को हमारी सुंदर विरासत स्थलों की रक्षा करना सिखाएं। एक परिदृश्य टाइप करें और जादू देखें!",
  suggestions: [
    "बच्चे किले के पास पेड़ लगा रहे हैं",
    "एक पर्यटक कचरा उठा रहा है",
    "स्मारक पर कचरा फेंकने वाले को टोकना",
    "संग्रहालय में शांति बनाए रखना"
  ],
  ep: "अध्याय",
  tooltips: {
    edit: "संपादित करें",
    download: "डाउनलोड",
    share: "साझा करें",
    delete: "हटाएं",
    read: "जोर से पढ़ें"
  },
  errorGen: "उफ़! कलाकारों ने अपने ब्रश गिरा दिए। कृपया पुनः प्रयास करें।",
  errorEdit: "जादुई मंत्र विफल! छवि को संपादित नहीं कर सका।",
  quiz: {
    button: "प्रश्नोत्तरी खेलें!",
    title: "नागरिक जागरूकता चुनौती",
    loading: "आपकी चुनौती तैयार हो रही है...",
    next: "अगला प्रश्न",
    resultTitle: "प्रश्नोत्तरी पूर्ण!",
    greatJob: "बहुत बढ़िया! आप एक सच्चे विरासत रक्षक हैं!",
    goodTry: "अच्छा प्रयास! हमारे इतिहास की रक्षा करना सीखते रहें।",
    score: "आपका स्कोर:",
    restart: "फिर से खेलें",
    close: "बंद करें"
  },
  shareStory: {
    button: "पूरी कहानी साझा करें",
    generating: "कहानी का कोलाज बना रहे हैं...",
    success: "कहानी तैयार है!",
    error: "कहानी नहीं बन सकी।"
  },
  tabs: {
    studio: "रचनात्मक स्टूडियो",
    book: "धरोहर रक्षक गाथा"
  },
  comicBook: {
    title: "धरोहर रक्षक गाथा",
    subtitle: "सम्मान और देखभाल की कहानियाँ",
    nextBtn: "अगला",
    prevBtn: "पिछला",
    page: "पृष्ठ",
    official: "आधिकारिक कहानी",
    userStory: "उपयोगकर्ता द्वारा निर्मित",
    empty: "यहाँ पृष्ठ जोड़ने के लिए स्टूडियो में और कहानियाँ बनाएँ!"
  },
  officialStories: {
      s1: "स्वच्छता भक्ति के समान है। हमें अपने सार्वजनिक स्थानों को साफ रखना चाहिए। कूड़ा न फैलाएं।",
      s2: "अतिथी देवो भव: अतिथि भगवान के समान है। पर्यटकों का सम्मान करना हमारी अपनी संस्कृति का सम्मान करना है।",
      s3: "कृपया दीवारों पर न लिखें! स्वच्छता और सम्मान एक सच्चे पर्यटक की निशानी है।",
      s4: "शशश! आवाज कम रखें। दूसरों का ख्याल रखना सार्वजनिक स्थानों को सभी के लिए सुखद बनाता है!"
  }
};

const mr = {
  appTitle: "CulturaX",
  subtitle: "नागरिक भान कॉमिक निर्माता",
  nav: {
    home: "होम",
    features: "वैशिष्ट्ये",
    downloads: "डाउनलोड",
    impact: "प्रभाव",
    team: "टीम",
    contact: "संपर्क",
    launch: "स्टुडिओ सुरू करा",
    feedback: "अभिप्राय"
  },
  hero: {
    title: "इतिहासाचे जतन",
    highlight: "AR तंत्रज्ञानासह",
    desc: "CulturaX भारताचा सांस्कृतिक वारसा ऑगमेंटेड रिॲलिटीद्वारे जिवंत करते.",
    tryNow: "आत्ताच करून पहा",
    demo: "डेमो",
    demoDesc: "ताजमहाल AR मध्ये अनुभवा"
  },
  why: {
    title: "CulturaX का?",
    items: [
      "रिमोट ऍक्सेससाठी ऑफलाइन AR अनुभव.",
      "360° इमर्सिव्ह स्मारक पुनर्बांधणी.",
      "शाळा आणि महाविद्यालयांसाठी शैक्षणिक व्यासपीठ.",
      "सांस्कृतिक शिक्षणासाठी इंटरएक्टिव्ह कथाकथन.",
      "कमी क्षमतेच्या उपकरणांसाठी तयार केलेले.",
      "भारताच्या ऐतिहासिक वास्तूंचे डिजिटली जतन."
    ]
  },
  features: {
    title: "मुख्य वैशिष्ट्ये",
    f1: { t: "ऑफलाइन AR ऍक्सेस", d: "इंटरनेटशिवाय स्मारके एक्सप्लोर करा." },
    f2: { t: "अचूक ट्रॅकिंग", d: "सर्व उपकरणांवर स्थिर AR ट्रॅकिंग." },
    f3: { t: "इमर्सिव्ह लर्निंग", d: "पर्यटन आणि शिक्षणासाठी उत्तम." },
    f4: { t: "उच्च कार्यक्षमता", d: "3D मॉडेल्सचे ऑप्टिमायझेशन." },
    f5: { t: "क्रॉस-प्लॅटफॉर्म", d: "Android आणि iOS वर चालते." },
    f6: { t: "सांस्कृतिक जतन", d: "भविष्यातील पिढ्यांसाठी स्मारकांचे जतन." }
  },
  downloads: {
    title: "आमचे ॲप्स डाउनलोड करा",
    subtitle: "आमच्या मोबाइल ॲप्लिकेशनसह CulturaX चा पूर्ण अनुभव घ्या.",
    bookletTitle: "CulturaX बुकलेट AR",
    bookletDesc: "AR-सक्षम वारसा पुस्तिकांद्वारे इंटरएक्टिव्ह शिक्षण.",
    bookletPreview: "प्रिव्ह्यू (वॉटरमार्क)",
    bookletBuy: "खरेदी आणि डाउनलोड",
    gpTitle: "CulturaX ग्राउंडप्लान AR",
    gpDesc: "3D स्पेसमध्ये वास्तुशास्त्रीय लेआउट आणि साइट नकाशे पहा.",
    downloadApk: "APK डाउनलोड करा",
    offlineTag: "ऑफलाइन मोड",
    onlineTag: "ऑनलाइन मोड"
  },
  impact: {
    title: "प्रभाव आणि फायदे",
    items: [
      "भारताच्या वारशापर्यंत पोहोचण्याचे लोकशाहीकरण.",
      "AR वापरून वर्गातील शिक्षण वाढवते.",
      "तरुणांमध्ये सांस्कृतिक जागरूकता वाढवते.",
      "पर्यटन वाढ आणि डिजिटल नवोपक्रमाला समर्थन.",
      "स्मारके डिजिटली जतन करते.",
      "AR आणि तंत्रज्ञान-आधारित रोजगार संधी निर्माण करते."
    ]
  },
  team: {
    title: "आमची टीम",
    lead: "टीम लीड",
    member: "सदस्य"
  },
  footer: {
    contact: "संपर्क करा",
    text: "चौकशी किंवा सहयोगासाठी:",
    rights: "© 2025 CulturaX • सर्व हक्क राखीव"
  },
  purchase: {
    title: "ॲप एक्सेसची विनंती करा",
    step1: "तुमचा तपशील",
    step2: "पडताळणी",
    step3: "पुष्टीकरण",
    nameLabel: "पूर्ण नाव",
    emailLabel: "ईमेल",
    phoneLabel: "फोन नंबर",
    payBtn: "एक्सेस विनंती करा",
    processing: "विनंती पाठवत आहे...",
    successTitle: "विनंती स्वीकारली!",
    successDesc: "पुढील पेमेंट तपशील आणि सूचना तुमच्या ईमेल आयडीवर पाठवल्या आहेत. पेमेंट कन्फर्मेशननंतर तुम्हाला लिंक मिळेल.",
    downloadBtn: "बंद करा",
    secureBadge: "सुरक्षित नोंदणी"
  },
  feedback: {
    title: "तुमचा अभिप्राय महत्त्वाचा आहे",
    subtitle: "CulturaX अनुभव सुधारण्यास आम्हाला मदत करा.",
    placeholder: "तुमचे विचार, सूचना सामायिक करा किंवा समस्या कळवा...",
    submit: "अभिप्राय पाठवा",
    success: "धन्यवाद! तुमचा अभिप्राय आम्हाला प्रगती करण्यास मदत करतो.",
    ratingLabel: "तुमचा अनुभव रेट करा:"
  },
  sceneLabel: "दृश्यात काय घडत आहे?",
  placeholder: "उदा. ऐतिहासिक बागेत कचरा टाकणारा मुलगा...",
  clear: "साफ करा",
  paint: "चित्र काढा",
  loadingStory: "धडा लिहित आहे",
  loadingPaint: "चित्र रंगवत आहे",
  magicEdit: "जादुई संपादन",
  editPlaceholder: "उदा. रेट्रो फिल्टर जोडा...",
  introTitle: "चला एक गोष्ट बनवूया!",
  introText: "आपल्या वारसा स्थळांचे रक्षण कसे करावे हे इतरांना शिकवा. एखादा प्रसंग लिहा आणि जादू पहा!",
  suggestions: [
    "किल्ल्याजवळ झाडे लावणारी मुले",
    "कचरा उचलणारा पर्यटक",
    "स्मारकावर कचरा टाकणाऱ्याला समज देणे",
    "संग्रहालयात शांतता पाळणे"
  ],
  ep: "भाग",
  tooltips: {
    edit: "संपादित करा",
    download: "डाउनलोड",
    share: "शेअर",
    delete: "हटवा",
    read: "मोठ्याने वाचा"
  },
  errorGen: "अरेरे! काहीतरी चूक झाली. कृपया पुन्हा प्रयत्न करा.",
  errorEdit: "संपादन अयशस्वी झाले.",
  quiz: {
    button: "क्विझ खेळा!",
    title: "नागरिक भान परीक्षा",
    loading: "तुमची परीक्षा तयार होत आहे...",
    next: "पुढील प्रश्न",
    resultTitle: "क्विझ पूर्ण!",
    greatJob: "अप्रतिम! तुम्ही खरे वारसा रक्षक आहात!",
    goodTry: "चांगला प्रयत्न! आपल्या इतिहासाचे रक्षण करायला शिका.",
    score: "तुमचा गुण:",
    restart: "पुन्हा खेळा",
    close: "बंद करा"
  },
  shareStory: {
    button: "पूर्ण गोष्ट शेअर करा",
    generating: "कोलाज बनवत आहे...",
    success: "गोष्ट तयार आहे!",
    error: "गोष्ट बनवता आली नाही."
  },
  tabs: {
    studio: "क्रिएटिव्ह स्टुडिओ",
    book: "वारसा रक्षक गाथा"
  },
  comicBook: {
    title: "वारसा रक्षक गाथा",
    subtitle: "आदर आणि काळजीच्या कथा",
    nextBtn: "पुढील",
    prevBtn: "मागील",
    page: "पान",
    official: "अधिकृत कथा",
    userStory: "वापरकर्ता निर्मित",
    empty: "येथे पाने जोडण्यासाठी स्टुडिओमध्ये अधिक कथा बनवा!"
  },
  officialStories: {
      s1: "स्वच्छता देवासमान आहे. आपण आपली सार्वजनिक ठिकाणे स्वच्छ ठेवली पाहिजेत. कचरा टाकू नका.",
      s2: "अतिथी देवो भव: पाहुणा देवासारखा असतो. पर्यटकांचा आदर करणे म्हणजे आपल्या संस्कृतीचा आदर करणे.",
      s3: "कृपया भिंतींवर लिहू नका! स्वच्छता आणि आदर हीच खऱ्या पर्यटकाची ओळख आहे.",
      s4: "शशश! आवाज कमी ठेवा. विचारशील असण्यामुळे सार्वजनिक ठिकाणे सर्वांसाठी आनंददायी बनतात!"
  }
};

// Helper to merge partial translations with English fallback safely
const withFallback = (partial: any) => {
  const result = { ...en }; // Start with English copy
  
  Object.keys(partial).forEach(key => {
    const k = key as keyof typeof en;
    // If the key is an object (and not array), merge it
    if (
      result[k] && 
      typeof partial[k] === 'object' && 
      partial[k] !== null && 
      !Array.isArray(partial[k])
    ) {
      // We need to cast result[k] to any to allow assignment of merged object
      (result[k] as any) = { ...(result[k] as any), ...partial[k] };
    } else {
      // Otherwise overwrite
      (result[k] as any) = partial[k];
    }
  });
  
  return result;
};

export const translations = {
  en,
  hi,
  mr,
  ta: withFallback({ 
    appTitle: "CulturaX", 
    subtitle: "குடிமைப் பண்பு காமிக் உருவாக்கி",
    nav: {home:"முகப்பு", features:"அம்சங்கள்", downloads:"பதிவிறக்கங்கள்", impact:"தாக்கம்", team:"குழு", contact:"தொடர்பு", launch:"தொடங்கு", feedback: "கருத்து"}, 
    hero: { title: "வரலாற்றைப் பாதுகாத்தல்", highlight: "AR கண்டுபிடிப்புடன்", desc: "CulturaX இந்தியாவின் கலாச்சார பாரம்பரியத்தை AR மூலம் உயிர்ப்பிக்கிறது.", tryNow: "முயற்சி செய்", demo: "AR செயல்விளக்கம்", demoDesc: "தாஜ்மஹாலை AR இல் காண்க" },
    features: { title: "முக்கிய அம்சங்கள்", f1: {t: "ஆஃப்லைன் AR", d: "இணையம் இல்லாமல் அணுகலாம்"}, f2: {t: "துல்லியமான கண்காணிப்பு", d: "அனைத்து சாதனங்களிலும் நிலையானது"}, f3: {t: "கற்றல்", d: "கல்வி மற்றும் சுற்றுலாவிற்கு சிறந்தது"}, f6: {t: "பாதுகாப்பு", d: "வரலாற்று சின்னங்களை பாதுகாத்தல்"} },
    downloads: { title: "எங்கள் செயலிகள்", subtitle: "எங்கள் மொபைல் செயலிகளுடன் CulturaX ஐ அனுபவிக்கவும்.", bookletTitle: "CulturaX கையேடு AR", bookletDesc: "AR இயக்கப்பட்ட கையேடுகள் மூலம் ஊடாடும் கற்றல்.", bookletBuy: "பதிவிறக்க", gpTitle: "CulturaX வரைபடம் AR", gpDesc: "3D இல் கட்டிடக்கலை வரைபடங்களைக் காண்க.", downloadApk: "APK பதிவிறக்க", offlineTag: "ஆஃப்லைன் பயன்முறை", onlineTag: "ஆன்லைன் பயன்முறை" },
    impact: { title: "தாக்கம் & நன்மைகள்", items: ["பாரம்பரியத்தை அணுகுதல்", "வகுப்பறை கற்றலை மேம்படுத்துதல்", "கலாச்சார விழிப்புணர்வு", "சுற்றுலா வளர்ச்சி", "டிஜிட்டல் பாதுகாப்பு", "வேலைவாய்ப்பு"] },
    team: { title: "எங்கள் குழு", lead: "குழுத் தலைவர்", member: "உறுப்பினர்" },
    footer: { contact: "தொடர்பு கொள்ள", text: "கேள்விகள் அல்லது ஒத்துழைப்புக்காக:", rights: "© 2025 CulturaX" },
    // Purchase uses fallback to English for correct logic
    sceneLabel: "காட்சியில் என்ன நடக்கிறது?",
    placeholder: "எ.கா. வரலாற்றுத் தோட்டத்தில் குப்பையை வீசும் சிறுவன்...",
    clear: "அழி",
    paint: "வரை",
    loadingStory: "கதை எழுதுகிறது...",
    loadingPaint: "ஓவியம் தீட்டுகிறது...",
    magicEdit: "மேஜிக் எடிட்",
    introTitle: "ஒரு கதையை உருவாக்குவோம்!",
    introText: "நமது பாரம்பரிய இடங்களைப் பாதுகாக்க மற்றவர்களுக்குக் கற்பிக்கவும்.",
    suggestions: ["கோட்டைக்கு அருகில் மரம் நடும் குழந்தைகள்", "குப்பைகளை எடுக்கும் சுற்றுலாப் பயணி"],
    tabs: {studio:"Studio", book:"Guardian's Chronicles"}, 
    comicBook: {title:"Guardian's Chronicles", subtitle:"Tales of Respect", nextBtn:"Next", prevBtn:"Prev", page:"Page", official:"Official", userStory:"User Created", empty:"Create more!"}, 
    officialStories: {s1:"Cleanliness is next to Godliness.", s2:"Atithi Devo Bhava.", s3:"Do not write on walls.", s4:"Keep volume down."},
    quiz: { button: "வினாடி வினா", title: "குடிமைப் பண்பு சவால்", loading: "ஏற்றுகிறது...", next: "அடுத்தது", resultTitle: "முடிந்தது!", greatJob: "அற்புதம்!", goodTry: "நன்றாக முயற்சித்தீர்கள்!", score: "மதிப்பெண்:", restart: "மீண்டும் விளையாடு", close: "மூடு" },
    shareStory: { button: "கதையைப் பகிரவும்", generating: "உருவாக்குகிறது...", success: "தயார்!", error: "தோல்வி" },
    feedback: { title: "உங்கள் கருத்து முக்கியமானது", subtitle: "மேம்படுத்த உதவுங்கள்.", placeholder: "உங்கள் கருத்துக்களை இங்கே பகிரவும்...", submit: "அனுப்பவும்", success: "நன்றி!", ratingLabel: "மதிப்பிடவும்:" }
  }),
  te: withFallback({ 
    appTitle: "CulturaX", 
    subtitle: "పౌర స్పృహ కామిక్ సృష్టికర్త",
    nav: {home:"హోమ్", features:"ఫీచర్లు", downloads:"డౌన్‌లోడ్లు", impact:"ప్రభావం", team:"బృందం", contact:"సంప్రదించండి", launch:"ప్రారంభించు", feedback: "అభిప్రాయం"}, 
    hero: { title: "చరిత్ర పరిరక్షణ", highlight: "AR ఆవిష్కరణతో", desc: "CulturaX భారతదేశ సాంస్కృతిక వారసత్వాన్ని AR ద్వారా జీవం పోస్తుంది.", tryNow: "ప్రయత్నించండి", demo: "డెమో", demoDesc: "తాజ్ మహల్ AR లో చూడండి" },
    features: { title: "ముఖ్య లక్షణాలు", f1: {t: "ఆఫ్‌లైన్ AR", d: "ఇంటర్నెట్ లేకుండా యాక్సెస్"}, f2: {t: "ఖచ్చితమైన ట్రాకింగ్", d: "అన్ని పరికరాల్లో స్థిరంగా ఉంటుంది"}, f3: {t: "లెర్నింగ్", d: "విద్య మరియు పర్యాటకానికి ఉత్తమం"}, f6: {t: "పరిరక్షణ", d: "చారిత్రక కట్టడాల రక్షణ"} },
    downloads: { title: "యాప్‌లు డౌన్‌లోడ్ చేయండి", subtitle: "CulturaX ని పూర్తిగా అనుభవించండి.", bookletTitle: "CulturaX బుక్‌లెట్ AR", bookletDesc: "AR పుస్తకాల ద్వారా ఇంటరాక్టివ్ లెర్నింగ్.", bookletBuy: "డౌన్‌లోడ్", gpTitle: "CulturaX గ్రౌండ్‌ప్లాన్ AR", gpDesc: "3D లో నిర్మాణ లేఅవుట్‌లను చూడండి.", downloadApk: "APK డౌన్‌లోడ్", offlineTag: "ఆఫ్‌లైన్ మోడ్", onlineTag: "ఆన్‌లైన్ మోడ్" },
    impact: { title: "ప్రభావం & ప్రయోజనాలు", items: ["వారసత్వానికి ప్రాప్యత", "తరగతి గది అభ్యాసం", "సాంస్కృతిక అవగాహన", "పర్యాటక వృద్ధి", "డిజిటల్ రక్షణ", "ఉపాధి"] },
    team: { title: "మా బృందం", lead: "టీమ్ లీడ్", member: "సభ్యుడు" },
    footer: { contact: "సంప్రదించండి", text: "విచారణల కోసం:", rights: "© 2025 CulturaX" },
    // Purchase uses fallback to English for correct logic
    sceneLabel: "దృశ్యంలో ఏమి జరుగుతోంది?",
    placeholder: "ఉదా. చారిత్రక ఉద్యానవనంలో చెత్త వేస్తున్న బాలుడు...",
    clear: "క్లియర్",
    paint: "పెయింట్",
    loadingStory: "కథ రాస్తున్నారు...",
    loadingPaint: "చిత్రం గీస్తున్నారు...",
    magicEdit: "మ్యాజిక్ ఎడిట్",
    introTitle: "ఒక కథను సృష్టిద్దాం!",
    introText: "మన వారసత్వ ప్రదేశాలను ఎలా రక్షించుకోవాలో ఇతరులకు నేర్పండి.",
    suggestions: ["కోట దగ్గర మొక్కలు నాటుతున్న పిల్లలు", "చెత్తను తీస్తున్న పర్యాటకుడు"],
    tabs: {studio:"Studio", book:"Guardian's Chronicles"}, 
    comicBook: {title:"Guardian's Chronicles", subtitle:"Tales of Respect", nextBtn:"Next", prevBtn:"Prev", page:"Page", official:"Official", userStory:"User Created", empty:"Create more!"}, 
    officialStories: {s1:"Cleanliness is next to Godliness.", s2:"Atithi Devo Bhava.", s3:"Do not write on walls.", s4:"Keep volume down."},
    quiz: { button: "క్విజ్", title: "పౌర స్పృహ సవాలు", loading: "లోడ్ అవుతోంది...", next: "తరువాత", resultTitle: "పూర్తయింది!", greatJob: "అద్భుతం!", goodTry: "మంచి ప్రయత్నం!", score: "స్కోరు:", restart: "మళ్ళీ ఆడండి", close: "మూసివేయి" },
    shareStory: { button: "కథను భాగస్వామ్యం చేయండి", generating: "సృష్టిస్తోంది...", success: "సిద్ధం!", error: "విఫలమైంది" },
    feedback: { title: "మీ అభిప్రాయం ముఖ్యం", subtitle: "మాకు మెరుగుపరచడంలో సహాయపడండి.", placeholder: "మీ అభిప్రాయాన్ని ఇక్కడ వ్రాయండి...", submit: "పంపండి", success: "ధన్యవాదాలు!", ratingLabel: "రేట్ చేయండి:" }
  }),
  ml: withFallback({ 
    appTitle: "CulturaX", 
    subtitle: "പൗരബോധ കോമിക് ക്രിയേറ്റർ",
    nav: {home:"ഹോം", features:"സവിശേഷതകൾ", downloads:"ഡൗൺലോഡുകൾ", impact:"സ്വാധീനം", team:"ടീം", contact:"ബന്ധപ്പെടുക", launch:"തുടങ്ങുക", feedback: "അഭിപ്രായം"}, 
    hero: { title: "ചരിത്രം സംരക്ഷിക്കുന്നു", highlight: "AR ഇന്നൊവേഷൻ ഉപയോഗിച്ച്", desc: "CulturaX ഇന്ത്യയുടെ സാംസ്കാരിക പൈതൃകം AR വഴി സജീവമാക്കുന്നു.", tryNow: "ശ്രമിക്കുക", demo: "ഡെമോ", demoDesc: "താജ് മഹൽ AR-ൽ കാണുക" },
    features: { title: "പ്രധാന സവിശേഷതകൾ", f1: {t: "ഓഫ്‌ലൈൻ AR", d: "ഇന്റർനെറ്റ് ഇല്ലാതെ ആക്സസ് ചെയ്യാം"}, f2: {t: "കൃത്യമായ ട്രാക്കിംഗ്", d: "എല്ലാ ഉപകരണങ്ങളിലും കൃത്യത"}, f3: {t: "പഠനം", d: "വിദ്യാഭ്യാസത്തിനും വിനോദ സഞ്ചാരത്തിനും"}, f6: {t: "സംരക്ഷണം", d: "ചരിത്ര സ്മാരകങ്ങളുടെ ഡിജിറ്റൽ സംരക്ഷണം"} },
    downloads: { title: "ആപ്പുകൾ ഡൗൺലോഡ് ചെയ്യുക", subtitle: "CulturaX പൂർണ്ണമായി അനുഭവിക്കുക.", bookletTitle: "CulturaX ബുക്ക്‌ലെറ്റ് AR", bookletDesc: "AR ബുക്ക്‌ലെറ്റുകൾ വഴി പഠനം.", bookletBuy: "ഡൗൺലോഡ്", gpTitle: "CulturaX ഗ്രൗണ്ട്പ്ലാൻ AR", gpDesc: "3D-യിൽ കെട്ടിടങ്ങളുടെ രൂപരേഖ കാണുക.", downloadApk: "APK ഡൗൺലോഡ്", offlineTag: "ഓഫ്‌ലൈൻ മോഡ്", onlineTag: "ഓൺലൈൻ മോഡ്" },
    impact: { title: "സ്വാധീനവും നേട്ടങ്ങളും", items: ["പൈതൃകത്തിലേക്കുള്ള പ്രവേശനം", "ക്ലാസ് റൂം പഠനം മെച്ചപ്പെടുത്തുന്നു", "സാംസ്കാരിക അവബോധം", "ടൂറിസം വളർച്ച", "ഡിജിറ്റൽ സംരക്ഷണം", "തൊഴിൽ അവസരങ്ങൾ"] },
    team: { title: "ഞങ്ങളുടെ ടീം", lead: "ടീം ലീഡ്", member: "അംഗം" },
    footer: { contact: "ബന്ധപ്പെടുക", text: "അന്വേഷണങ്ങൾക്ക്:", rights: "© 2025 CulturaX" },
    // Purchase uses fallback to English for correct logic
    sceneLabel: "രംഗത്ത് എന്താണ് നടക്കുന്നത്?",
    placeholder: "ഉദാ: ചരിത്രപരമായ ഉദ്യാനത്തിൽ പ്ലാസ്റ്റിക് കുപ്പി എറിയുന്ന കുട്ടി...",
    clear: "ക്ലിയർ",
    paint: "പെയിന്റ്",
    loadingStory: "കഥ എഴുതുന്നു...",
    loadingPaint: "ചിത്രം വരക്കുന്നു...",
    magicEdit: "മാജിക് എഡിറ്റ്",
    introTitle: "നമുക്കൊരു കഥ ഉണ്ടാക്കാം!",
    introText: "നമ്മുടെ പൈതൃക സ്ഥലങ്ങൾ എങ്ങനെ സംരക്ഷിക്കാമെന്ന് മറ്റുള്ളവരെ പഠിപ്പിക്കുക.",
    suggestions: ["കോട്ടയ്ക്ക് സമീപം മരങ്ങൾ നടുന്ന കുട്ടികൾ", "മാലിന്യം നീക്കം ചെയ്യുന്ന വിനോദസഞ്ചാരി"],
    tabs: {studio:"Studio", book:"Guardian's Chronicles"}, 
    comicBook: {title:"Guardian's Chronicles", subtitle:"Tales of Respect", nextBtn:"Next", prevBtn:"Prev", page:"Page", official:"Official", userStory:"User Created", empty:"Create more!"}, 
    officialStories: {s1:"Cleanliness is next to Godliness.", s2:"Atithi Devo Bhava.", s3:"Do not write on walls.", s4:"Keep volume down."},
    quiz: { button: "ക്വിസ്", title: "പൗരബോധ വെല്ലുവിളി", loading: "തയ്യാറാക്കുന്നു...", next: "അടുത്തത്", resultTitle: "പൂർത്തിയായി!", greatJob: "അടിപൊളി!", goodTry: "നല്ല ശ്രമം!", score: "സ്കോർ:", restart: "വീണ്ടും കളിക്കുക", close: "അടയ്ക്കുക" },
    shareStory: { button: "കഥ പങ്കിടുക", generating: "നിർമ്മിക്കുന്നു...", success: "തയ്യാർ!", error: "പരാജയപ്പെട്ടു" },
    feedback: { title: "നിങ്ങളുടെ അഭിപ്രായം", subtitle: "മെച്ചപ്പെടുത്താൻ സഹായിക്കുക.", placeholder: "ഇവിടെ എഴുതുക...", submit: "അയക്കുക", success: "നന്ദി!", ratingLabel: "റേറ്റ് ചെയ്യുക:" }
  }),
  or: withFallback({ 
    appTitle: "CulturaX", 
    subtitle: "ସିଭିକ ସେନ୍ସ କମିକ ନିର୍ମାତା", 
    nav: {home:"ମୁଖ୍ୟ ପୃଷ୍ଠା", features:"ବୈଶିଷ୍ଟ୍ୟ", downloads:"ଡାଉନଲୋଡ୍", impact:"ପ୍ରଭାବ", team:"ଟିମ୍", contact:"ଯୋଗାଯୋଗ", launch:"ଆରମ୍ଭ କରନ୍ତୁ", feedback: "ମତାମତ"}, 
    hero: { title: "ଇତିହାସର ସଂରକ୍ଷଣ", highlight: "AR ଉଦ୍ଭାବନ ସହିତ", desc: "CulturaX ଭାରତର ସାଂସ୍କୃତିକ ଐତିହ୍ୟକୁ ଇମର୍ସିଭ୍ ଅଗମେଣ୍ଟେଡ୍ ରିଆଲିଟି ବ୍ୟବହାର କରି ଜୀବନ୍ତ କରିଥାଏ |", tryNow: "ବର୍ତ୍ତମାନ ଚେଷ୍ଟା କରନ୍ତୁ", demo: "ଇଣ୍ଟରାକ୍ଟିଭ୍ ଡେମୋ", demoDesc: "AR ରେ ତାଜମହଲ ଅନୁଭବ କରନ୍ତୁ" },
    why: { title: "CulturaX କାହିଁକି?", items: [ "ଦୂର ସ୍ଥାନ ପାଇଁ ଅଫଲାଇନ୍ AR ଅନୁଭୂତି", "360° ଇମର୍ସିଭ୍ ସ୍ମାରକୀ ପୁନନିର୍ମାଣ", "ବିଦ୍ୟାଳୟ ଏବଂ କଲେଜ ପାଇଁ ଶିକ୍ଷାଗତ ପ୍ଲାଟଫର୍ମ", "ସାଂସ୍କୃତିକ ଶିକ୍ଷା ପାଇଁ ଇଣ୍ଟରାକ୍ଟିଭ୍ କାହାଣୀ", "କମ୍ ମୂଲ୍ୟର ଡିଭାଇସ୍ ପାଇଁ ତିଆରି", "ଭାରତର ଐତିହାସିକ ସ୍ଥଳଗୁଡିକର ଡିଜିଟାଲ୍ ସଂରକ୍ଷଣ" ] },
    features: { title: "ମୁଖ୍ୟ ବୈଶିଷ୍ଟ୍ୟ", f1: { t: "ଅଫଲାଇନ୍ AR ଆକ୍ସେସ୍", d: "ଇଣ୍ଟରନେଟ୍ ବିନା ଯେକୌଣସି ସମୟରେ ସ୍ମାରକୀ ଅନୁସନ୍ଧାନ କରନ୍ତୁ" }, f2: { t: "ମାର୍କର-ଆଧାରିତ ସଠିକତା", d: "ସମସ୍ତ ଡିଭାଇସ୍ ରେ ସ୍ଥିର ଦେଖିବା ପାଇଁ ନିର୍ଭରଯୋଗ୍ୟ AR ଟ୍ରାକିଂ" }, f3: { t: "ଇମର୍ସିଭ୍ ଶିକ୍ଷା", d: "ପର୍ଯ୍ୟଟନ ଏବଂ ଶିକ୍ଷା ପାଇଁ ଉତ୍ତମ" }, f4: { t: "ଉଚ୍ଚ ପ୍ରଦର୍ଶନ", d: "ସ୍ମୁଥ୍ ପ୍ରଦର୍ଶନ ପାଇଁ ଅପ୍ଟିମାଇଜ୍ ହୋଇଥିବା 3D ମଡେଲ୍" }, f5: { t: "କ୍ରସ୍-ପ୍ଲାଟଫର୍ମ", d: "Android ଏବଂ iOS ରେ ସହଜରେ କାମ କରେ" }, f6: { t: "ସାଂସ୍କୃତିକ ସଂରକ୍ଷଣ", d: "ଭବିଷ୍ୟତ ପିଢି ପାଇଁ ଭାରତର ସ୍ମାରକୀଗୁଡିକୁ ଡିଜିଟାଲ୍ ସଂରକ୍ଷଣ କରିବା" } },
    downloads: { title: "ଆମର ଆପ୍ ଡାଉନଲୋଡ୍ କରନ୍ତୁ", subtitle: "ଆମର ମୋବାଇଲ୍ ଆପ୍ଲିକେସନ୍ ସହିତ CulturaX ର ସମ୍ପୂର୍ଣ୍ଣ ଅନୁଭବ ନିଅନ୍ତୁ", bookletTitle: "CulturaX ବୁକଲେଟ୍ AR", bookletDesc: "AR-ସକ୍ଷମ ଐତିହ୍ୟ ପୁସ୍ତିକା ମାଧ୍ୟମରେ ଇଣ୍ଟରାକ୍ଟିଭ୍ ଶିକ୍ଷା", bookletPreview: "ପ୍ରିଭ୍ୟୁ (ୱାଟରମାର୍କ)", bookletBuy: "କିଣନ୍ତୁ ଏବଂ ଡାଉନଲୋଡ୍ କରନ୍ତୁ", gpTitle: "CulturaX ଗ୍ରାଉଣ୍ଡପ୍ଲାନ AR", gpDesc: "3D ସ୍ପେସ୍ ରେ ଆର୍କିଟେକ୍ଚରାଲ୍ ଲେଆଉଟ୍ ଏବଂ ସାଇଟ୍ ମ୍ୟାପ୍ ଦେଖନ୍ତୁ", downloadApk: "APK ଡାଉନଲୋଡ୍ କରନ୍ତୁ", offlineTag: "ଅଫଲାଇନ୍ ମୋଡ୍", onlineTag: "ଅନଲାଇନ୍ ମୋଡ୍" },
    impact: { title: "ପ୍ରଭାବ ଏବଂ ଲାଭ", items: [ "ଭାରତର ଐତିହ୍ୟ ପର୍ଯ୍ୟନ୍ତ ପହଞ୍ଚିବାର ସୁଯୋଗ", "AR ବ୍ୟବହାର କରି ଶ୍ରେଣୀ ଶିକ୍ଷା ବୃଦ୍ଧି କରେ", "ଯୁବକମାନଙ୍କ ମଧ୍ୟରେ ସାଂସ୍କୃତିକ ସଚେତନତା ବୃଦ୍ଧି କରେ", "ପର୍ଯ୍ୟଟନ ବିକାଶ ଏବଂ ଡିଜିଟାଲ୍ ଉଦ୍ଭାବନକୁ ସମର୍ଥନ କରେ", "ସ୍ମାରକୀଗୁଡିକୁ ଡିଜିଟାଲ୍ ସଂରକ୍ଷଣ କରେ", "AR ଏବଂ ଟେକ୍ନୋଲୋଜି ଆଧାରିତ ନିଯୁକ୍ତି ସୁଯୋଗ ସୃଷ୍ଟି କରେ" ] },
    team: { title: "ଆମର ଟିମ୍", lead: "ଟିମ୍ ଲିଡ୍", member: "ସଦସ୍ୟ" },
    footer: { contact: "ଯୋଗାଯୋଗ କରନ୍ତୁ", text: "ଅନୁସନ୍ଧାନ କିମ୍ବା ସହଯୋଗ ପାଇଁ:", rights: "© 2025 CulturaX • ସର୍ବସ୍ୱତ୍ୱ ସଂରକ୍ଷିତ" },
    // Purchase uses fallback to English for correct logic
    sceneLabel: "ଦୃଶ୍ୟରେ କଣ ଘଟୁଛି?",
    placeholder: "ଉଦାହରଣ: ଏକ ଐତିହାସିକ ବଗିଚାରେ ପ୍ଲାଷ୍ଟିକ୍ ବୋତଲ ଫିଙ୍ଗୁଥିବା ପିଲା...",
    clear: "ସଫା କରନ୍ତୁ",
    paint: "ଚିତ୍ର ଆଙ୍କନ୍ତୁ",
    loadingStory: "କାହାଣୀ ଲେଖୁଛନ୍ତି",
    loadingPaint: "ଚିତ୍ର ରଙ୍ଗ କରୁଛନ୍ତି",
    magicEdit: "ଯାଦୁ ସମ୍ପାଦନ",
    editPlaceholder: "ଉଦାହରଣ: ରେଟ୍ରୋ ଫିଲ୍ଟର ଯୋଡନ୍ତୁ...",
    introTitle: "ଚାଲନ୍ତୁ ଏକ କାହାଣୀ ତିଆରି କରିବା!",
    introText: "ଅନ୍ୟମାନଙ୍କୁ ଆମର ସୁନ୍ଦର ଐତିହ୍ୟ ସ୍ଥଳର ସୁରକ୍ଷା କରିବା ଶିଖାନ୍ତୁ | ଏକ ଦୃଶ୍ୟ ଲେଖନ୍ତୁ ଏବଂ ଯାଦୁ ଦେଖନ୍ତୁ!",
    suggestions: [ "ଦୁର୍ଗ ନିକଟରେ ଗଛ ଲଗାଉଥିବା ପିଲାମାନେ", "ଜଣେ ପର୍ଯ୍ୟଟକ ଅଳିଆ ଉଠାଉଛନ୍ତି", "ସ୍ମାରକୀରେ ଅଳିଆ ପକାଉଥିବା ଲୋକଙ୍କୁ ବାରଣ କରିବା", "ମ୍ୟୁଜିୟମରେ ଶାନ୍ତି ବଜାୟ ରଖିବା" ],
    ep: "ଅଧ୍ୟାୟ",
    tooltips: { edit: "ସମ୍ପାଦନ କରନ୍ତୁ", download: "ଡାଉନଲୋଡ୍", share: "ସେୟାର୍", delete: "ଡିଲିଟ୍", read: "ଜୋରରେ ପଢନ୍ତୁ" },
    errorGen: "କ୍ଷମା କରିବେ! କିଛି ଭୁଲ୍ ହେଲା |",
    errorEdit: "ସମ୍ପାଦନ ବିଫଳ ହେଲା |",
    quiz: { button: "କୁଇଜ୍ ଖେଳନ୍ତୁ!", title: "ସିଭିକ ସେନ୍ସ ଚ୍ୟାଲେଞ୍ଜ", loading: "ଆପଣଙ୍କ ଚ୍ୟାଲେଞ୍ଜ ପ୍ରସ୍ତୁତ ହେଉଛି...", next: "ପରବର୍ତ୍ତୀ ପ୍ରଶ୍ନ", resultTitle: "କୁଇଜ୍ ସମାପ୍ତ!", greatJob: "ବହୁତ ଭଲ! ଆପଣ ଜଣେ ପ୍ରକୃତ ଐତିହ୍ୟ ରକ୍ଷକ!", goodTry: "ଭଲ ଚେଷ୍ଟା! ଆମର ଇତିହାସର ସୁରକ୍ଷା କରିବା ଶିଖନ୍ତୁ |", score: "ଆପଣଙ୍କ ସ୍କୋର:", restart: "ପୁନର୍ବାର ଖେଳନ୍ତୁ", close: "ବନ୍ଦ କରନ୍ତୁ" },
    shareStory: { button: "ସମ୍ପୂର୍ଣ୍ଣ କାହାଣୀ ସେୟାର୍ କରନ୍ତୁ", generating: "କୋଲାଜ୍ ତିଆରି ହେଉଛି...", success: "କାହାଣୀ ପ୍ରସ୍ତୁତ!", error: "କାହାଣୀ ତିଆରି ହୋଇପାରିଲା ନାହିଁ" },
    tabs: { studio: "କ୍ରିଏଟିଭ୍ ଷ୍ଟୁଡିଓ", book: "ଗାର୍ଡିଆନ୍ କ୍ରୋନିକଲ୍ସ" },
    comicBook: { title: "ଗାର୍ଡିଆନ୍ କ୍ରୋନିକଲ୍ସ", subtitle: "ସମ୍ମାନ ଏବଂ ଯତ୍ନର କାହାଣୀ", nextBtn: "ପରବର୍ତ୍ତୀ", prevBtn: "ପୂର୍ବ", page: "ପୃଷ୍ଠା", official: "ଅଫିସିଆଲ୍ କାହାଣୀ", userStory: "ୟୁଜର ତିଆରି କରିଛନ୍ତି", empty: "ଅଧିକ କାହାଣୀ ତିଆରି କରନ୍ତୁ!" },
    officialStories: { s1: "ପରିଷ୍କାର ପରିଚ୍ଛନ୍ନତା ଭଗବାନଙ୍କ ସମାନ", s2: "ଅତିଥି ଦେବୋ ଭବ", s3: "କାନ୍ଥରେ ଲେଖନ୍ତୁ ନାହିଁ", s4: "ଶବ୍ଦ କମ୍ ରଖନ୍ତୁ" },
    feedback: { title: "ଆପଣଙ୍କ ମତାମତ ଗୁରୁତ୍ୱପୂର୍ଣ୍ଣ", subtitle: "ଆମକୁ ଉନ୍ନତି କରିବାରେ ସାହାଯ୍ୟ କରନ୍ତୁ |", placeholder: "ଆପଣଙ୍କ ମତାମତ ଏଠାରେ ଲେଖନ୍ତୁ...", submit: "ମତାମତ ପଠାନ୍ତୁ", success: "ଧନ୍ୟବାଦ!", ratingLabel: "ରେଟିଂ ଦିଅନ୍ତୁ:" }
  }),
  es: withFallback({ 
    appTitle: "CulturaX", 
    nav: {home:"Inicio", features:"Características", downloads:"Descargas", impact:"Impact", team:"Equipo", contact:"Contacto", launch:"Iniciar Estudio", feedback: "Feedback"}, 
    tabs: {studio:"Studio", book:"Guardian's Chronicles"}, 
    comicBook: {title:"Guardian's Chronicles", subtitle:"Tales of Respect", nextBtn:"Next", prevBtn:"Prev", page:"Page", official:"Official", userStory:"User Created", empty:"Create more!"}, 
    officialStories: {s1:"Cleanliness is next to Godliness.", s2:"Atithi Devo Bhava.", s3:"Do not write on walls.", s4:"Keep volume down."},
    // Purchase uses fallback
  }),
  fr: withFallback({ 
    appTitle: "CulturaX", 
    nav: {home:"Accueil", features:"Fonctionnalités", downloads:"Téléchargements", impact:"Impact", team:"Équipe", contact:"Contact", launch:"Lancer Studio", feedback: "Commentaires"}, 
    tabs: {studio:"Studio", book:"Guardian's Chronicles"}, 
    comicBook: {title:"Guardian's Chronicles", subtitle:"Tales of Respect", nextBtn:"Next", prevBtn:"Prev", page:"Page", official:"Official", userStory:"User Created", empty:"Create more!"}, 
    officialStories: {s1:"Cleanliness is next to Godliness.", s2:"Atithi Devo Bhava.", s3:"Do not write on walls.", s4:"Keep volume down."},
    // Purchase uses fallback
  })
};

export const languageOptions = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिंदी (Hindi)' },
  { code: 'mr', label: 'मराठी (Marathi)' },
  { code: 'ta', label: 'தமிழ் (Tamil)' },
  { code: 'te', label: 'తెలుగు (Telugu)' },
  { code: 'ml', label: 'മലയാളം (Malayalam)' },
  { code: 'or', label: 'ଓଡ଼ିଆ (Odia)' },
  { code: 'es', label: 'Español' },
  { code: 'fr', label: 'Français' },
];
