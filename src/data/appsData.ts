import { AppItem, ProblemItem, UpdateRequestItem } from '../types';

export const TYPEMASTER_APP: AppItem = {
  id: 'typemaster',
  name: 'TypeMaster',
  tagline: '100% Local, On-Device AI Speech-to-Text for Every Desktop App',
  description: 'TypeMaster runs high-precision neural speech models directly on your hardware. Press a global hotkey, speak naturally, and watch your voice transcribe into any active window in real time with zero cloud latency and total privacy.',
  longDescription: 'Engineered for developers, writers, and power users who demand private, instant dictation. Unlike cloud-tethered subscription services, TypeMaster processes every phoneme locally on your CPU or GPU. Your microphone data never touches an external server, your system works fully offline, and it is completely free to download and keep forever.',
  priceUsd: 0,
  platforms: ['Windows'],
  version: 'v1.4.2',
  rating: 4.98,
  reviewsCount: 342,
  developer: 'keepware Labs',
  accentColor: 'var(--text)',
  badge: 'Featured Product',
  size: '20.6 MB (Installer) • 1.9 GB (Local Model)',
  releasedYear: 2026,
  updatesIncluded: 'Lifetime core binary updates + continuous local model fine-tunes included',
  features: [
    '100% On-Device Neural Processing: Zero audio packets leave your computer.',
    'Universal Global Hotkey: Tap Alt+Space to dictate into Slack, VS Code, Notion, Obsidian, Terminal, or any text field.',
    'Sub-180ms Latency: Hardware-accelerated with NVIDIA CUDA & DirectML engines.',
    'Smart Auto-Punctuation & Formatting: Automatically strips "um/ah", formats code snippets, and fixes casing.',
    'Custom Technical Vocabulary: Add project names, camelCase variables, and custom jargon easily.',
    '99+ Languages & Accents: Instant local multi-dialect switching.',
    'Offline Independence: Operates at 35,000 feet or in secure air-gapped environments with 0 kbps internet.'
  ],
  usageGuide: [
    {
      id: 'install',
      step: '01',
      title: 'Download and install — free',
      description: 'Download the 20.6 MB installer and run it. No account, email, or licence key needed — TypeMaster is free to keep. If Windows SmartScreen shows a warning (the installer is unsigned), click "More info" > "Run anyway".',
      hint: 'Prefer an .msi for scripted or managed rollouts? A .msi build is on the same GitHub release.'
    },
    {
      id: 'model',
      step: '02',
      title: 'Download the local model — once',
      description: 'On first launch TypeMaster fetches the 1.9 GB speech model and stores it on your own disk. This is the only time an internet connection is required.',
      hint: 'Allow ~2.4 GB of free space for the weights and the local index cache.'
    },
    {
      id: 'setup',
      step: '03',
      title: 'Pick your microphone and hotkey',
      description: 'Open the tray menu and choose your input device. Alt+Space is the default push-to-talk hotkey and can be remapped to any combination you prefer.',
      hint: 'Windows Settings > Privacy & security > Microphone must allow desktop apps.'
    },
    {
      id: 'dictate',
      step: '04',
      title: 'Dictate into any window',
      description: 'Put your cursor in any text field — Slack, VS Code, Notion, Obsidian, a terminal, an email — hold the hotkey and speak. Text lands in the active window in under 180 ms, punctuated and correctly cased.',
      hint: 'Filler words like "um" and "ah" are stripped automatically as you talk.'
    },
    {
      id: 'tune',
      step: '05',
      title: 'Teach it your vocabulary',
      description: 'Add project names, client names, camelCase variables and technical jargon under Tray Menu > Custom Dictionary, or upload a .txt list. TypeMaster boosts those terms immediately.',
      hint: 'Ideal for stacks with names like Kubernetes, tRPC or in-house tooling.'
    },
    {
      id: 'speed',
      step: '06',
      title: 'Turn on hardware acceleration',
      description: 'Under Settings > Engine > Hardware Acceleration, select CUDA or DirectML to move inference onto your GPU. On lighter machines, switch to the Fast Quantized model instead.',
      hint: 'Enable "Keep Neural Weights Resident in RAM" to remove the first-press delay.'
    }
  ],
  systemRequirements: {
    os: 'Windows 10/11 64-bit',
    ram: '8 GB RAM minimum (16 GB recommended for high-accuracy Multi-lingual Ultra model)',
    recommendedRam: '16 GB RAM',
    processor: 'Intel/AMD CPU with AVX2 instruction support',
    gpuAcceleration: 'NVIDIA GPU (4GB+ VRAM with CUDA 11.8+) or DirectML. CPU fallback supported.',
    storage: '2.4 GB free disk space for offline weights and local index cache',
    microphone: 'Any standard built-in or USB/Bluetooth external microphone',
    network: '0 kbps (100% offline; internet only required once for initial download)'
  },
  problems: [
    {
      id: 'mic-permission',
      title: 'Microphone not capturing in background apps or games',
      description: 'On Windows 10/11, background accessibility or input monitoring permissions might be blocked by default security sandboxes.',
      solution: 'Ensure "Allow desktop apps to access your microphone" is toggled ON in Windows Settings > Privacy & security > Microphone.',
      platform: 'Windows',
      badge: 'Permissions'
    },
    {
      id: 'gpu-acceleration',
      title: 'High CPU utilization during extended voice dictation',
      description: 'If GPU acceleration is not detected on first launch, TypeMaster defaults to multi-core CPU fallback mode.',
      solution: 'Go to TypeMaster Settings > Engine > Hardware Acceleration and select "CUDA/DirectML". Alternatively, switch to the "Fast Quantized" model.',
      platform: 'Windows',
      badge: 'Hardware'
    },
    {
      id: 'cold-start-lag',
      title: 'Slight delay on the very first hotkey press',
      description: 'Loading deep neural weights from cold SSD disk memory into RAM can take 1.2s on initial boot.',
      solution: 'Toggle ON "Keep Neural Weights Resident in Background RAM" under Advanced Settings so dictation is primed sub-200ms at all times.',
      platform: 'All',
      badge: 'Quick Fix'
    },
    {
      id: 'jargon-recognition',
      title: 'Custom programming acronyms or uncommon names misheard',
      description: 'Standard language models might misinterpret domain-specific terms like "Kubernetes", "tRPC", or proprietary client names.',
      solution: 'Open the TypeMaster Tray Menu > Custom Dictionary, and enter your key terms or upload a `.txt` list. TypeMaster immediately boosts their phonetic token probabilities.',
      platform: 'All',
      badge: 'Customization'
    }
  ]
};

export const INITIAL_UPDATE_REQUESTS: UpdateRequestItem[] = [
  {
    id: 'req-1',
    title: 'Custom Hotkey Voice Macro Triggers (e.g., "Insert Git Commit Template")',
    description: 'Allow users to say custom voice triggers that expand into pre-configured multi-line snippets directly into the active editor.',
    category: 'Feature',
    votes: 184,
    status: 'In Progress',
    tag: 'v1.5 Roadmap'
  },
  {
    id: 'req-2',
    title: 'Whisper Large v3 Turbo Quantized Model Pack',
    description: 'Add optional 4-bit quantized Turbo model weights to cut memory footprint down to only 900MB RAM with 99.1% accuracy.',
    category: 'Model',
    votes: 219,
    status: 'Planned',
    tag: 'Performance'
  },
  {
    id: 'req-3',
    title: 'Multi-Language Auto-Switching Pack (Spanish, French, German, Japanese)',
    description: 'Real-time multilingual language switching without manually changing model settings between sentences.',
    category: 'Language',
    votes: 312,
    status: 'In Progress',
    tag: 'Localization'
  },
  {
    id: 'req-4',
    title: 'Raycast & Alfred Direct Workflow Integration',
    description: 'Native script commands to stream transcription directly into Raycast and Alfred search bars and actions.',
    category: 'Integration',
    votes: 97,
    status: 'Under Review',
    tag: 'Ecosystem'
  }
];

export const FEATURED_APP = TYPEMASTER_APP;
