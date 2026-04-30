export interface StretchStep {
  text: string;
  imageAlt: string;
  imageUrl?: string;
}

export interface ROMData {
  normalAngle: string;
  evaluation: string;
  compensation: string;
  imageUrl?: string;
}

export interface BodyPartData {
  id: string;
  jointId: string; // skeleton click target (e.g., 'shoulder')
  jointName: string; // e.g., '肩関節'
  movement: string; // e.g., '屈曲 (Flexion)'
  targetMuscles: string[];
  anatomyPoint: string;
  rom: ROMData;
  selfStretch: StretchStep[];
  partnerStretch: StretchStep[];
}

export const stretchData: BodyPartData[] = [
  {
    id: 'shoulder_flexion',
    jointId: 'shoulder',
    jointName: '肩関節',
    movement: '屈曲 (Flexion)',
    targetMuscles: ['広背筋', '大円筋', '上腕三頭筋長頭'],
    anatomyPoint: '広背筋は骨盤から上腕骨まで繋がる巨大な筋肉です。バックファンクショナルライン（BFL）を介して対角の殿筋群とも連動するため、骨盤の固定がストレッチの鍵となります。',
    rom: {
      normalAngle: '180°',
      evaluation: '耳の横まで腕がスムーズに挙上できるか確認。150°未満の場合は広背筋や大円筋の短縮が疑われます。',
      compensation: '腕を上げる際に「腰椎が過剰に反る（骨盤前傾）」または「肋骨が浮き上がる」代償動作に注意。',
      imageUrl: '/shoulder_flex_rom.png'
    },
    selfStretch: [
      { text: '壁の前に立ち、両手を肩幅よりやや広く開いて壁の少し高い位置につきます。', imageAlt: '壁に両手をついて立つ図', imageUrl: '/shoulder_flex_1.png' },
      { text: '足の位置を後ろに下げながら、お尻を突き出すようにして上半身を沈め、背中を平らにします。', imageAlt: 'お尻を引いて背中を平らにする図', imageUrl: '/shoulder_flex_2.png' },
      { text: '腰が反らないようにお腹に軽く力を入れたまま、脇の下から背中の横（広背筋）が伸びるのを感じます。', imageAlt: '脇の下が伸びている図', imageUrl: '/shoulder_flex_3.png' },
      { text: '深呼吸を繰り返し、吐く息とともに少しずつ胸を床に近づけてさらに伸ばします。', imageAlt: '胸を床に近づける図', imageUrl: '/shoulder_flex_4.png' }
    ],
    partnerStretch: [
      { text: 'クライアントは仰向けに寝て、両膝を立てて骨盤を後傾させ（腰と床の隙間をなくす）ます。', imageAlt: '仰向けで膝を立てる図', imageUrl: '/shoulder_flex_partner_1.png' },
      { text: '施術者は頭側に立ち、クライアントの両手首または前腕を下から優しく把持します。', imageAlt: '頭側から腕を持つ図' },
      { text: 'クライアントの腕を頭上（屈曲方向）へゆっくりと引き上げます。この時、少し外旋を加えると広背筋がより伸張されます。', imageAlt: '腕を頭上に引き上げる図' },
      { text: 'クライアントが腰を反らせて代償しようとしたらストップし、その位置で呼吸を促します。', imageAlt: '代償動作を確認しながらキープする図' }
    ]
  },
  {
    id: 'shoulder_er',
    jointId: 'shoulder',
    jointName: '肩関節',
    movement: '外旋 (External Rotation)',
    targetMuscles: ['肩甲下筋', '大胸筋'],
    anatomyPoint: '肩甲下筋はローテーターカフの中で唯一内旋に働く強力な筋肉です。巻き肩（肩関節内旋位）の主要な原因となり、ディープフロントアームライン（DFAL）の緊張を強めます。',
    rom: {
      normalAngle: '60°（下垂位） / 90°（90°外転位）',
      evaluation: '肘を脇につけた状態、および肩と同じ高さに上げた状態で前腕を外側に倒せるか確認。',
      compensation: '肩甲骨が寄る（内転）、または胸椎が反る（伸展）代償動作がないか確認。'
    },
    selfStretch: [
      { text: 'ドアの枠（または柱）の横に立ち、肘を90度に曲げて前腕を枠に当てます。', imageAlt: 'ドア枠に前腕を当てる図' },
      { text: '肘は肩と同じ高さか、少し低い位置にセットします。', imageAlt: '肘の位置をセットする図' },
      { text: '枠に当てた腕を支点にして、体をゆっくりと反対側へ捻り、胸の前から脇の下の深部を伸ばします。', imageAlt: '体を捻る図' },
      { text: '肩甲骨が浮かないように意識し、深呼吸を繰り返しながら20秒キープします。', imageAlt: '深呼吸しながらキープする図' }
    ],
    partnerStretch: [
      { text: 'クライアントは仰向けに寝ます。施術者は横に座り、クライアントの肩を90度外転、肘を90度屈曲させます。', imageAlt: '仰向けで肩肘90度の図' },
      { text: '片手でクライアントの肩前面（烏口突起のあたり）を軽く押さえ、肩甲骨が浮くのを防ぎます。', imageAlt: '肩前面を固定する図' },
      { text: 'もう片方の手でクライアントの手首を持ち、前腕を床に向かってゆっくりと倒していきます（外旋）。', imageAlt: '前腕を床に倒す図' },
      { text: '抵抗を感じたところで止め、クライアントに軽く押し返してもらい（等尺性収縮）、脱力後にさらに伸ばします。', imageAlt: '抵抗運動を交える図' }
    ]
  },
  {
    id: 'hip_extension',
    jointId: 'pelvis',
    jointName: '股関節',
    movement: '伸展 (Extension)',
    targetMuscles: ['腸腰筋（大腰筋・腸骨筋）', '大腿直筋'],
    anatomyPoint: '大腰筋は第12胸椎から小菱形筋へ付着する、上半身と下半身を繋ぐ唯一の筋肉です。ディープフロントライン（DFL）のコアであり、ここの短縮は反り腰や腰痛の直接的な原因となります。',
    rom: {
      normalAngle: '15°',
      evaluation: 'うつ伏せで膝を伸ばしたまま足を天井方向に持ち上げられるか（トーマステストなどで腸腰筋の短縮も評価）。',
      compensation: '足を上げる際に骨盤が前傾する、または腰椎が過剰に反る代償に注意。'
    },
    selfStretch: [
      { text: '床に膝立ちになり、片足を前に大きく踏み出します（ランジの姿勢）。', imageAlt: '片足立ちのランジ姿勢の図' },
      { text: '骨盤を後傾（しっぽを巻くようなイメージ）させ、お腹に軽く力を入れます。', imageAlt: '骨盤を後傾させる図' },
      { text: 'そのままゆっくりと重心を前に移動させ、後ろ足の付け根（そけい部）の伸びを感じます。', imageAlt: '重心を前に移動させる図' },
      { text: '余裕があれば、後ろ足側の腕を上に伸ばし、さらに体を反対側に軽く倒してスパイラルラインも伸ばします。', imageAlt: '腕を上げて横に倒す図' }
    ],
    partnerStretch: [
      { text: 'クライアントはうつ伏せに寝ます。施術者は横に立ちます。', imageAlt: 'うつ伏せに寝る図' },
      { text: '片手でクライアントの骨盤（仙骨・後上腸骨棘）を上からしっかりと押さえ、骨盤の前傾を防ぎます。', imageAlt: '骨盤を上から固定する図' },
      { text: 'もう片方の手でクライアントの膝上（大腿部遠位）を下からすくい上げます。', imageAlt: '膝上を下から持つ図' },
      { text: '骨盤を固定したまま、太ももを床からゆっくりと持ち上げ、腸腰筋の伸張を感じたところでキープします。', imageAlt: '太ももを持ち上げる図' }
    ]
  },
  {
    id: 'cervical_rotation',
    jointId: 'cervical',
    jointName: '頸椎',
    movement: '回旋 (Rotation)',
    targetMuscles: ['胸鎖乳突筋', '板状筋', '斜角筋'],
    anatomyPoint: '胸鎖乳突筋は鎖骨と側頭骨を繋ぎます。眼球の動きや前庭系（バランス）と密接に関係しており、この筋肉の過緊張は頭痛やめまいの原因になり得ます。',
    rom: {
      normalAngle: '60°',
      evaluation: '正面から見て、顎が肩のラインの延長線上まで回るか。左右差がないかをチェック。',
      compensation: '首を回す際に、肩が一緒に上がってしまう、または体が捻れる代償動作に注意。'
    },
    selfStretch: [
      { text: '椅子に深く座り、背筋を伸ばします。左手でお尻の下の座面を軽く掴み、左肩を下げて固定します。', imageAlt: '座面を掴んで肩を下げる図' },
      { text: '右手で左の鎖骨のすぐ下を押さえ、皮膚を少し下へ引っ張ります。', imageAlt: '鎖骨の下を押さえる図' },
      { text: '顔を右斜め上へゆっくりと向け、左の首の前側（胸鎖乳突筋）がピンと張るのを感じます。', imageAlt: '顔を右斜め上に向ける図' },
      { text: 'そのまま深呼吸。視線をさらに右後ろへ向ける（眼球運動）と、筋膜連鎖でより深く伸びます。', imageAlt: '視線を後ろに向ける図' }
    ],
    partnerStretch: [
      { text: 'クライアントは仰向けに寝ます。施術者は頭側に座り、両手で頭部を優しく包み込みます。', imageAlt: '仰向けで頭を包み込む図' },
      { text: '少しだけ頭を手前に牽引（トラクション）し、頸椎の隙間を広げます。', imageAlt: '頭を牽引する図' },
      { text: '牽引を保ったまま、クライアントの顔をゆっくりと右へ回旋させます（左の首が伸びる）。', imageAlt: '顔を右に回旋させる図' },
      { text: '反対側の肩（左肩）が浮いてこないように注意しながら、心地よい抵抗がある位置で呼吸に合わせキープします。', imageAlt: '肩の浮きに注意してキープする図' }
    ]
  }
];

// Helper to get joints
export const getJoints = () => {
  const joints = new Map();
  stretchData.forEach(item => {
    if (!joints.has(item.jointId)) {
      joints.set(item.jointId, item.jointName);
    }
  });
  return Array.from(joints.entries()).map(([id, name]) => ({ id, name }));
};

// Helper to get movements for a joint
export const getMovementsForJoint = (jointId: string) => {
  return stretchData.filter(item => item.jointId === jointId);
};
