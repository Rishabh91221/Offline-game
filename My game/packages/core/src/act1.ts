import type { Act } from './types.ts';

// Act I: "The Banished Prince" — an original interactive retelling of the Ayodhya Kanda arc.
// Narration is paraphrased in the game's own words. No verses are quoted; a scholar should review
// before any verse citations are added.
const a = (svadharma: number, samanyaDharma: number, samsaraKalyana: number, viveka: number, nishkamaKarma: number) =>
  ({ svadharma, samanyaDharma, samsaraKalyana, viveka, nishkamaKarma });

export const ACT1: Act = {
  id: 'act_1',
  title: { en: 'Act I: The Banished Prince', hi: 'प्रथम अंक: वनवासी राजकुमार' },
  intro: {
    en: 'You are Rama, eldest son of Dasharatha of Ayodhya. Tomorrow you are to be crowned. Every choice you make will be weighed on five lenses of dharma, and you will see the weighing only when the act ends.',
    hi: 'आप अयोध्या के राजा दशरथ के ज्येष्ठ पुत्र राम हैं। कल आपका राज्याभिषेक होना है। आपके हर निर्णय को धर्म (Dharma) के पाँच दृष्टिकोणों पर तौला जाएगा, और यह आकलन आपको अंक के अंत में ही दिखेगा।',
  },
  scenes: [
    {
      id: 's1_coronation',
      title: { en: 'The Coronation Is Announced', hi: 'राज्याभिषेक की घोषणा' },
      narrative: {
        en: 'The city glows with lamps. Dasharatha has named you heir. Your brother Bharata is away at his maternal uncle\'s home, and word of the coronation has reached him only by rumour.',
        hi: 'नगर दीपों से जगमगा रहा है। दशरथ ने आपको युवराज घोषित किया है। आपके भाई भरत अपने मामा के घर दूर हैं, और राज्याभिषेक की बात उन तक केवल अफ़वाह से पहुँची है।',
      },
      prompt: { en: 'How do you receive the news?', hi: 'आप इस समाचार को कैसे स्वीकार करते हैं?' },
      choices: [
        { id: 'c1', text: { en: 'Accept humbly, pray, and spend the night preparing to serve the people.', hi: 'विनम्रता से स्वीकार करें, प्रार्थना करें, और रात प्रजा की सेवा की तैयारी में बिताएँ।' },
          consequence: { en: 'The court sees a calm heir. Yet Bharata\'s absence stays an unspoken question.', hi: 'दरबार एक शांत उत्तराधिकारी को देखता है। फिर भी भरत की अनुपस्थिति एक अनकहा प्रश्न बनी रहती है।' },
          axes: a(85, 75, 85, 70, 80) },
        { id: 'c2', text: { en: 'Ask your father to wait until Bharata returns, so the family stands together.', hi: 'पिता से प्रतीक्षा करने को कहें, ताकि भरत के लौटने पर पूरा परिवार साथ खड़ा हो।' },
          consequence: { en: 'Dasharatha is moved but fears delay; the stars favour tomorrow. He gently declines.', hi: 'दशरथ द्रवित होते हैं पर विलंब से डरते हैं; नक्षत्र कल के पक्ष में हैं। वे विनम्रता से मना कर देते हैं।' },
          axes: a(60, 85, 65, 85, 70) },
        { id: 'c3', text: { en: 'Celebrate openly with friends tonight; you have waited long enough.', hi: 'आज रात मित्रों के साथ खुलकर उत्सव मनाएँ; आपने बहुत प्रतीक्षा की है।' },
          consequence: { en: 'The city\'s joy is real, but some elders notice how quickly the heir took the crown for granted.', hi: 'नगर का आनंद सच्चा है, पर कुछ वृद्ध देखते हैं कि उत्तराधिकारी ने राजमुकुट को कितनी सहजता से मान लिया।' },
          axes: a(35, 40, 45, 25, 20) },
      ],
    },
    {
      id: 's2_boons',
      title: { en: 'Kaikeyi\'s Two Boons', hi: 'कैकेयी के दो वरदान' },
      narrative: {
        en: 'At dawn you are summoned. Queen Kaikeyi has claimed two boons Dasharatha once granted: the throne for Bharata, and fourteen years of forest exile for you. The king sits broken, unable to speak.',
        hi: 'भोर में आपको बुलाया जाता है। रानी कैकेयी ने दशरथ के दिए दो पुराने वरदान माँगे हैं: भरत के लिए राजसिंहासन, और आपके लिए चौदह वर्ष का वनवास। राजा टूटे हुए बैठे हैं, बोल नहीं पा रहे।',
      },
      prompt: { en: 'What do you do?', hi: 'आप क्या करते हैं?' },
      choices: [
        { id: 'c1', text: { en: 'Accept the exile calmly, so that your father\'s word is not broken.', hi: 'वनवास को शांति से स्वीकार करें, ताकि पिता का वचन न टूटे।' },
          consequence: { en: 'Dasharatha weeps. The palace is silent. Your calm becomes the story people will tell.', hi: 'दशरथ रो पड़ते हैं। महल मौन है। आपकी शांति ही वह कथा बन जाती है जो लोग सुनाएँगे।' },
          axes: a(90, 85, 55, 60, 90) },
        { id: 'c2', text: { en: 'Refuse. Rally the guards and the city to protect your rightful place.', hi: 'मना कर दें। अपने अधिकार की रक्षा के लिए सैनिकों और नगर को एकत्र करें।' },
          consequence: { en: 'Ayodhya would split between two factions. You step back from the brink before the first blade is drawn.', hi: 'अयोध्या दो दलों में बँट जाती। पहली तलवार खिंचने से पहले ही आप पीछे हट जाते हैं।' },
          axes: a(25, 15, 15, 30, 10) },
        { id: 'c3', text: { en: 'Argue with Kaikeyi and the king, asking them to reconsider a hasty bargain.', hi: 'कैकेयी और राजा से तर्क करें, और उनसे जल्दबाज़ी में हुए सौदे पर पुनर्विचार करने को कहें।' },
          consequence: { en: 'Kaikeyi will not move. The delay only deepens your father\'s shame.', hi: 'कैकेयी टस से मस नहीं होतीं। विलंब से पिता की लज्जा और गहरी हो जाती है।' },
          axes: a(55, 60, 55, 65, 45) },
      ],
    },
    {
      id: 's3_citizens',
      title: { en: 'The Citizens Follow', hi: 'प्रजा पीछे चल पड़ती है' },
      narrative: {
        en: 'You leave the city on foot. Thousands follow, weeping, refusing to turn back. By nightfall they are asleep at the river\'s edge, exhausted.',
        hi: 'आप पैदल नगर छोड़ते हैं। हज़ारों लोग रोते हुए पीछे चलते हैं, लौटने को तैयार नहीं। साँझ तक वे नदी किनारे थककर सो जाते हैं।',
      },
      prompt: { en: 'What do you do about the crowd?', hi: 'आप उस जनसमूह के बारे में क्या करते हैं?' },
      choices: [
        { id: 'c1', text: { en: 'Wake them and speak with love: ask them to return and serve Ayodhya under Bharata.', hi: 'उन्हें जगाकर प्रेम से कहें: लौट जाएँ और भरत के अधीन अयोध्या की सेवा करें।' },
          consequence: { en: 'Many refuse at first. Slowly most turn back, carrying your words home.', hi: 'पहले बहुत से लोग मना करते हैं। धीरे-धीरे अधिकतर लौट जाते हैं, आपकी बातें साथ लिए।' },
          axes: a(80, 85, 90, 85, 80) },
        { id: 'c2', text: { en: 'Slip away quietly in the night while they sleep.', hi: 'रात में, जब वे सो रहे हों, चुपचाप निकल जाएँ।' },
          consequence: { en: 'You escape the crowd. They wake to an empty riverbank and a grief with no goodbye.', hi: 'आप भीड़ से निकल जाते हैं। वे जागकर सूना तट और बिना विदा का शोक पाते हैं।' },
          axes: a(55, 40, 45, 60, 55) },
        { id: 'c3', text: { en: 'Let them follow you into the forest; their love is its own argument.', hi: 'उन्हें वन में साथ चलने दें; उनका प्रेम ही स्वयं एक तर्क है।' },
          consequence: { en: 'A city would empty out into the wilderness, and Ayodhya would be left without its people.', hi: 'पूरा नगर वन में उतर आता, और अयोध्या अपनी प्रजा के बिना रह जाती।' },
          axes: a(30, 35, 20, 25, 30) },
      ],
    },
    {
      id: 's4_companions',
      title: { en: 'Sita and Lakshmana', hi: 'सीता और लक्ष्मण' },
      narrative: {
        en: 'Sita says she will not stay behind; Lakshmana says the same. The forest is dangerous, and your mothers will be left in grief.',
        hi: 'सीता कहती हैं कि वे पीछे नहीं रहेंगी; लक्ष्मण भी यही कहते हैं। वन में संकट हैं, और आपकी माताएँ शोक में रह जाएँगी।',
      },
      prompt: { en: 'How do you answer them?', hi: 'आप उन्हें क्या उत्तर देते हैं?' },
      choices: [
        { id: 'c1', text: { en: 'Order both to stay. You will not risk their safety.', hi: 'दोनों को रुकने का आदेश दें। आप उनकी सुरक्षा का जोखिम नहीं लेंगे।' },
          consequence: { en: 'They obey with tears. You walk on carrying the weight of having decided for them.', hi: 'वे आँसुओं के साथ मानते हैं। आप उनके लिए निर्णय करने का बोझ लिए आगे बढ़ते हैं।' },
          axes: a(55, 50, 50, 55, 40) },
        { id: 'c2', text: { en: 'Listen fully, explain the dangers honestly, and honour their free choice.', hi: 'पूरा सुनें, संकट ईमानदारी से समझाएँ, और उनके स्वतंत्र निर्णय का सम्मान करें।' },
          consequence: { en: 'They come with open eyes. The bond between you is now a choice made by all three.', hi: 'वे खुली आँखों से साथ आते हैं। आपके बीच का बंधन अब तीनों का चुना हुआ निर्णय है।' },
          axes: a(80, 90, 70, 90, 75) },
        { id: 'c3', text: { en: 'Let Sita come, but send Lakshmana back to care for the queens.', hi: 'सीता को आने दें, पर लक्ष्मण को माताओं की सेवा हेतु लौटा दें।' },
          consequence: { en: 'Lakshmana pleads, hurt, but accepts for now. The queens are cared for; the road is lonelier.', hi: 'लक्ष्मण आहत होकर विनती करते हैं, पर अभी मान लेते हैं। माताओं की देखभाल होती है; मार्ग अधिक सूना हो जाता है।' },
          axes: a(70, 65, 70, 70, 60) },
      ],
    },
    {
      id: 's5_bharata',
      title: { en: 'Bharata at Chitrakuta', hi: 'चित्रकूट में भरत' },
      narrative: {
        en: 'Bharata has refused the throne and found you in the forest. Weeping, he begs you to return and rule. Your father has passed away. Ayodhya waits without a king.',
        hi: 'भरत ने राजसिंहासन अस्वीकार कर दिया है और वन में आपको खोज लिया है। रोते हुए वे आपसे लौटकर राज्य सँभालने की विनती करते हैं। पिता का देहांत हो चुका है। अयोध्या बिना राजा के प्रतीक्षा में है।',
      },
      prompt: { en: 'What is your answer?', hi: 'आपका उत्तर क्या है?' },
      choices: [
        { id: 'c1', text: { en: 'Return with him. The people\'s peace matters more than a promise made in grief.', hi: 'उनके साथ लौट जाएँ। प्रजा की शांति शोक में दिए वचन से अधिक महत्वपूर्ण है।' },
          consequence: { en: 'The city rejoices, but your father\'s word stands broken, and Kaikeyi\'s grief is made pointless.', hi: 'नगर प्रसन्न होता है, पर पिता का वचन टूटा रह जाता है, और कैकेयी का शोक निरर्थक हो जाता है।' },
          axes: a(35, 40, 70, 45, 35) },
        { id: 'c2', text: { en: 'Refuse lovingly, honour the vow, and give Bharata your sandals to hold the throne in trust.', hi: 'प्रेम से मना करें, वचन का मान रखें, और भरत को अपनी पादुकाएँ दें ताकि वे न्यासी बनकर राज्य चलाएँ।' },
          consequence: { en: 'Bharata sets the sandals on the throne and rules as your servant. Both brothers keep their word.', hi: 'भरत पादुकाओं को सिंहासन पर रखते हैं और आपके सेवक बनकर शासन करते हैं। दोनों भाई अपना वचन निभाते हैं।' },
          axes: a(90, 85, 85, 85, 90) },
        { id: 'c3', text: { en: 'Send him away sternly; there is nothing more to discuss.', hi: 'उन्हें कठोरता से लौटा दें; अब कहने को कुछ नहीं बचा।' },
          consequence: { en: 'Bharata leaves wounded. The vow is kept, but a brother\'s grief is left with no comfort.', hi: 'भरत आहत होकर जाते हैं। वचन निभता है, पर एक भाई का शोक बिना सांत्वना रह जाता है।' },
          axes: a(65, 25, 35, 40, 50) },
      ],
    },
  ],
};
