// At the top of the file, add these utility functions
function stringToColor(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash % 360);
  return `hsl(${hue}, 70%, 50%)`; // Using HSL for consistent brightness
}

function getInitials(name: string) {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2); // Get maximum 2 initials
}

function generateDefaultLogo(name: string) {
  return {
    type: 'initials' as const,
    initials: getInitials(name),
    color: stringToColor(name)
  };
}

// Update the Agent type in src/types/agent.ts to include the new logo type
export interface Agent {
  id: string;
  name: string;
  website: string;
  description: string;
  logo?: string | { type: 'initials'; initials: string; color: string };
  category: string[];
  isOpenSource: boolean;
  github?: string;
  twitter?: string;
  discord?: string;
  lastUpdated: string;
}

export const agents: Agent[] = [
  {
    id: 'agentops',
    name: 'AgentOps',
    website: 'https://agents.staf.ai/AgentOps',
    description: 'Build your next agent with graphs, monitoring, and replay analytics. Tools to make agents that work. No more black boxes and prompt guessing.',
    logo: 'https://github.com/AgentOps-AI/agentops/blob/main/docs/images/external/logo/banner-badge.png?raw=true',
    category: ['Analytics'],
    isOpenSource: true,
    github: 'https://github.com/AgentOps-AI/agentops',
    twitter: 'agentopsai',
    discord: 'https://discord.gg/FagdcwwXRR',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'nelima',
    name: 'Nelima',
    website: 'https://sellagen.com/nelima',
    description: 'Nelima is designed for taking actions on your behalf with natural language commands.',
    logo: generateDefaultLogo('Nelima'), // Example of adding default logo
    category: ['Assistant'],
    isOpenSource: true,
    discord: 'https://discord.com/invite/zGdUve2Nhk',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'adala',
    name: 'Adala',
    website: 'https://humansignal.github.io/Adala/',
    description: 'Adala is an Autonomous Data (Labeling) Agent framework.',
    logo: 'https://raw.githubusercontent.com/HumanSignal/Adala/master/docs/src/img/logo-dark-mode.png',
    category: ['General Purpose'],
    isOpenSource: true,
    github: 'https://github.com/HumanSignal/Adala',
    discord: 'https://discord.com/invite/QBtgTbXTgU',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'agent4rec',
    name: 'Agent4Rec',
    website: 'https://arxiv.org/abs/2310.10108',
    description: 'A recommender system simulator with 1,000 LLM-empowered generative agents.',
    logo: 'https://github.com/LehengTHU/Agent4Rec/blob/master/assets/sandbox.png?raw=true',
    category: ['DIY/Build Your Own'],
    isOpenSource: true,
    github: 'https://github.com/LehengTHU/Agent4Rec',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'agentforge',
    name: 'AgentForge',
    website: 'https://www.agentforge.net/',
    description: 'A low-code framework designed for the swift creation, testing, and iteration of AI-powered autonomous agents and Cognitive Architectures, compatible with various LLM models.',
    logo: 'https://camo.githubusercontent.com/184f63d4b1074c7a17b463af24497c0c863dba25e8b8a075cda0b4a144705ca0/68747470733a2f2f7062732e7477696d672e636f6d2f70726f66696c655f696d616765732f313636373136373236353036303532383132392f6c385S39767450325f343030783430302e6a7067',
    category: ['DIY/Build Your Own'],
    isOpenSource: true,
    github: 'https://github.com/DataBassGit/AgentForge',
    twitter: 'AgentForge',
    discord: 'https://discord.com/invite/ttpXHUtCW6',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'agentgpt',
    name: 'AgentGPT',
    website: 'https://agentgpt.reworkd.ai/',
    description: 'Assemble, configure, and deploy autonomous AI Agents in your browser.',
    logo: 'https://raw.githubusercontent.com/reworkd/AgentGPT/main/next/public/banner.png',
    category: ['General Purpose'],
    isOpenSource: true,
    github: 'https://github.com/reworkd/AgentGPT',
    twitter: 'ReworkdAI',
    discord: 'https://discord.com/invite/gcmNyAAFfV',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'agentpilot',
    name: 'AgentPilot',
    website: 'https://agentpilot.ai/',
    description: 'Integrated into Open Interpreter and MemGPT',
    logo: 'https://raw.githubusercontent.com/jbexta/AgentPilot/master/docs/demo.png',
    category: ['General Purpose'],
    isOpenSource: true,
    github: 'https://github.com/jbexta/AgentPilot',
    twitter: 'AgentPilotAI',
    discord: 'https://discord.com/invite/ge2ZzDGu9e',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'agents',
    name: 'Agents',
    website: 'https://agents-readthedocsio.readthedocs.io/en/latest/index.html',
    description: 'A systematic framework for training language agents, which is inspired by the connectionist learning procedure used for training neural nets.',
    logo: 'https://raw.githubusercontent.com/aiwaves-cn/agents/master/assets/agents-logo.png',
    category: ['General Purpose'],
    isOpenSource: true,
    github: 'https://github.com/aiwaves-cn/agents',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'agentverse',
    name: 'AgentVerse',
    website: 'https://www.openbmb.cn/home',
    description: 'Designed to facilitate the deployment of multiple LLM-based agents in various applications. AgentVerse primarily provides two frameworks: task-solving and simulation.',
    logo: 'https://repository-images.githubusercontent.com/638629097/1d3d6251-f8be-4d11-bbb1-4e44b7364b74',
    category: ['DIY/Build Your Own'],
    isOpenSource: true,
    github: 'https://github.com/OpenBMB/AgentVerse',
    twitter: 'Agentverse71134',
    discord: 'https://discord.com/invite/gDAXfjMw',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'ai-legion',
    name: 'AI Legion',
    website: 'https://gpt3demo.com/apps/ai-legion',
    description: 'An LLM-powered autonomous agent platform',
    category: ['DIY/Build Your Own'],
    isOpenSource: true,
    github: 'https://github.com/eumemic/ai-legion',
    twitter: 'dysmemic',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'aider',
    name: 'Aider',
    website: 'https://aider.chat/',
    description: 'A command line tool that lets you pair program with GPT-3.5/GPT-4, to edit code stored in your local git repository.',
    category: ['Coding'],
    isOpenSource: true,
    github: 'https://github.com/paul-gauthier/aider',
    discord: 'https://discord.com/invite/Tv2uQnR88V',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'ailice',
    name: 'AIlice',
    website: 'https://app.myshell.ai/explore',
    description: 'A fully autonomous, general-purpose AI agent. This project aims to create a standalone artificial intelligence assistant, similar to JARVIS, based on the open-source LLM.',
    logo: 'https://github.com/myshell-ai/AIlice/blob/master/AIliceLogo.png',
    category: ['Productivity'],
    isOpenSource: true,
    github: 'https://github.com/myshell-ai/AIlice',
    twitter: 'stevenlu1729',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'autogen',
    name: 'AutoGen',
    website: 'https://microsoft.github.io/autogen/',
    description: 'Enable Next-Gen Large Language Model Applications.',
    category: ['DIY/Build Your Own'],
    isOpenSource: true,
    github: 'https://github.com/microsoft/autogen',
    twitter: 'pyautogen',
    discord: 'https://discord.com/invite/pAbnFJrkgZ',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'autogpt',
    name: 'AutoGPT',
    website: 'https://news.agpt.co/',
    description: 'Working Towards an Open Source AI Assistant Available To Everyone',
    logo: 'https://camo.githubusercontent.com/6d02d6d4e6efd05f3fb4455751c01701e618a10d9557bcc77072551f95e07a39/68747470733a2f2f6e6577732e616770742e636f2f77702d636f6e74656e742f75706c6f6164732f323032332f30342f4c6f676f5f2d5f4175746f5f4750542d422d383030783336332e706e67',
    category: ['General Purpose'],
    isOpenSource: true,
    github: 'https://github.com/Significant-Gravitas/AutoGPT?utm_source=awesome-ai-agents',
    twitter: 'Auto_GPT',
    discord: 'https://discord.com/invite/autogpt',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'automata',
    name: 'Automata',
    website: 'https://agents.staf.ai/Automata',
    description: "Automata's objective is to evolve into a fully autonomous, self-programming Artificial Intelligence system.",
    logo: 'https://github-production-user-asset-6210df.s3.amazonaws.com/68796651/250135126-61fe3c33-9b7a-4c1b-9726-a77140476b83.png',
    category: ['Coding'],
    isOpenSource: true,
    github: 'https://github.com/emrgnt-cmplxty/automata',
    twitter: 'ocolegro',
    discord: 'https://discord.com/invite/j9GxfbxqAe',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'autopr',
    name: 'AutoPR',
    website: 'https://agents.staf.ai/AutoPR',
    description: 'Fix issues with AI-generated pull requests, powered by ChatGPT',
    logo: 'https://raw.githubusercontent.com/irgolic/AutoPR/main/website/static/img/AutoPR_Mark_color.png',
    category: ['Coding'],
    isOpenSource: true,
    github: 'https://github.com/irgolic/AutoPR',
    twitter: 'IrgolicR',
    discord: 'https://discord.com/invite/ykk7Znt3K6',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'autonomous-hr-chatbot',
    name: 'Autonomous HR Chatbot',
    website: 'https://agents.staf.ai/AutonomousHRChatbot',
    description: 'An autonomous HR agent that can answer user queries using tools',
    category: ['HR'],
    isOpenSource: true,
    github: 'https://github.com/stepanogil/autonomous-hr-chatbot',
    twitter: 'Stepanogil',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'babyagi',
    name: 'BabyAGI',
    website: 'https://agents.staf.ai/BabyAGI',
    description: 'The system uses OpenAI and vector databases such as Chroma or Weaviate to create, prioritize, and execute tasks. The main idea behind this system is that it creates tasks based on the result of previous tasks and a predefined objective.',
    category: ['General Purpose'],
    isOpenSource: true,
    github: 'https://github.com/yoheinakajima/babyagi',
    twitter: 'babyAGI_',
    discord: 'https://discord.com/invite/TMUw26XUcg',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'babybeeagi',
    name: 'BabyBeeAGI',
    website: 'https://yoheinakajima.com/babybeeagi-task-management-and-functionality-expansion-on-top-of-babyagi/',
    description: 'BabyBeeAGI: Task Management and Functionality Expansion on top of BabyAGI',
    category: ['General Purpose'],
    isOpenSource: true,
    github: 'https://github.com/yoheinakajima/babyagi/blob/main/classic/BabyBeeAGI.py',
    twitter: 'yoheinakajima',
    discord: 'https://discord.com/invite/TMUw26XUcg',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'babycatagi',
    name: 'BabyCatAGI',
    website: 'https://agents.staf.ai/BabyCatAGI',
    description: 'This was built as a continued iteration on the original BabyAGI code in a lightweight way.',
    category: ['General Purpose'],
    isOpenSource: true,
    github: 'https://github.com/yoheinakajima/babyagi/blob/main/classic/BabyCatAGI.py',
    twitter: 'yoheinakajima',
    discord: 'https://discord.com/invite/TMUw26XUcg',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'babydeeragi',
    name: 'BabyDeerAGI',
    website: 'https://replit.com/@YoheiNakajima/BabyDeerAGI',
    description: 'A mod of BabyCatAGI, which is a mod of BabyBeeAGI, which is a mod of OG BabyAGI. BabyDeerAGI is at ~350 lines of code.',
    category: ['General Purpose'],
    isOpenSource: true,
    github: 'https://github.com/yoheinakajima/babyagi/blob/main/classic/BabyDeerAGI.py',
    twitter: 'yoheinakajima',
    discord: 'https://discord.com/invite/TMUw26XUcg',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'babyelfagi',
    name: 'BabyElfAGI',
    website: 'https://replit.com/@YoheiNakajima/BabyElfAGI',
    description: 'Most recent mod of OG BabyAGI. Added Skills class and example tasklists.',
    category: ['General Purpose'],
    isOpenSource: true,
    github: 'https://github.com/yoheinakajima/babyagi/blob/main/classic/BabyElfAGI/main.py',
    twitter: 'yoheinakajima',
    discord: 'https://discord.com/invite/TMUw26XUcg',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'babycommandagi',
    name: 'BabyCommandAGI',
    website: 'https://agents.staf.ai/BabyCommanAGI',
    description: 'Designed to test what happens when you combine CLI and LLM, which are older computer interfaces than GUI. Based on BabyAGI, and using GPT-4 API. Imagine LLM and CLI having a conversation.',
    category: ['General Purpose'],
    isOpenSource: true,
    github: 'https://github.com/saten-private/BabyCommandAGI',
    twitter: 'yoheinakajima',
    discord: 'https://discord.com/invite/TMUw26XUcg',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'babyfoxagi',
    name: 'BabyFoxAGI',
    website: 'https://replit.com/@YoheiNakajima',
    description: 'A mod of BabyElfAGI, in a series of mods w the naming of BabyAGI in alphabetical order.',
    category: ['General Purpose'],
    isOpenSource: true,
    github: 'https://github.com/yoheinakajima/babyagi/tree/main/classic/babyfoxagi',
    discord: 'https://discord.com/invite/TMUw26XUcg',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'bambooai',
    name: 'BambooAI',
    website: 'https://agents.staf.ai/BambooAI',
    description: 'A lightweight library that leverages Language Models (LLMs) to enable natural language interactions, allowing you to source and converse with data.',
    category: ['Coding'],
    isOpenSource: true,
    github: 'https://github.com/pgalko/BambooAI',
    twitter: 'pgalko',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'beebot',
    name: 'BeeBot',
    website: 'https://agents.staf.ai/BeeBot',
    description: 'BeeBot is your personal worker bee, an Autonomous AI Assistant designed to perform a wide range of practical tasks autonomously.',
    category: ['General Purpose'],
    isOpenSource: true,
    github: 'https://github.com/AutoPackAI/beebot',
    twitter: 'Douglas_Schon',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'bloop',
    name: 'Bloop',
    website: 'https://bloop.ai/',
    description: 'Find Code. Fast. Understand codebases with GPT-4 and semantic code search',
    logo: 'https://github.com/BloopAI',
    category: ['Coding'],
    isOpenSource: true,
    github: 'https://github.com/BloopAI/bloop',
    twitter: 'bloopdotai',
    discord: 'https://discord.com/invite/kZEgj5pyjm',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'bondai',
    name: 'BondAI',
    website: 'https://bondai.dev/docs/intro',
    description: 'A highly capable, autonomous AI Agent with an easy to use CLI, RESTful/WebSocket API, Pre-built Docker image and a robust suite of integrated tools.',
    logo: 'https://camo.githubusercontent.com/7e6d2f2ad5d9b9fb1aacf5260066407a0f6050f1be007a69ac11a5e3f4b8d80e/68747470733a2f2f626f6e6461692e6465762f6173736574732f696d616765732f626f6e6461692d6c6f676f2d39626563376532376239336238303464333735323231666638666236643333362e706e67',
    category: ['Coding'],
    isOpenSource: true,
    github: 'https://github.com/krohling/bondai',
    discord: 'https://discord.com/invite/docusaurus',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'bumpgen',
    name: 'bumpgen',
    website: 'https://www.xeol.io/beta',
    description: 'Bumpgen builds your project to understand what broke when a dependency was bumped.',
    category: ['Coding'],
    isOpenSource: true,
    github: 'https://github.com/xeol-io/bumpgen',
    twitter: 'xeol_io',
    discord: 'https://discord.com/invite/J7E9BqVHkG',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'calai',
    name: 'Cal.ai',
    website: 'https://cal.com/ai',
    description: 'Cal.ai can book meetings, summarize your week, and find time with others based on natural language.',
    logo: 'https://camo.githubusercontent.com/8e9f64be3c8dab914b01094e195cdb6feda132fbb51575e049bc3882d19f8a6a/68747470733a2f2f333632303130373734332d66696c65732e676974626f6f6b2e696f2f7e2f66696c65732f76302f622f676974626f6f6b2d782d70726f642e61707073706f742e636f6d2f6f2f737061636573253246706d554f715a6a6647714e6b69506d71676e4d7625324675706c6f6164732532463951617131686c615463714b667263396b344f47253246696d6167652e706e673f616c743d6d6564696126746f6b656e3d31666665383533302d313966662d346165612d623032302d613939636463323234636531',
    category: ['Productivity'],
    isOpenSource: true,
    github: 'https://github.com/calcom/cal.com/tree/main/apps/ai',
    twitter: 'calcom',
    discord: 'https://discord.com/invite/calcom',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'camel',
    name: 'CAMEL',
    website: 'https://www.camel-ai.org/',
    description: 'An open-source library designed for the study of autonomous and communicative agents. 1)AI user agent: give instructions to the AI assistant with the goal of completing the task.',
    logo: 'https://raw.githubusercontent.com/camel-ai/camel/master/misc/primary_logo.png',
    category: ['General Purpose'],
    isOpenSource: true,
    github: 'https://github.com/camel-ai/camel',
    twitter: 'CamelAIOrg',
    discord: 'https://discord.com/invite/CNcNpquyDc',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'chatarena',
    name: 'ChatArena',
    website: 'https://www.chatarena.org/',
    description: 'A Multi-Agent Language Game Environments for LLMs. The goal is to develop communication and collaboration capabilities of AIs.',
    category: ['DIY/Build Your Own'],
    isOpenSource: true,
    github: 'https://github.com/Farama-Foundation/chatarena',
    twitter: '_chatarena',
    discord: 'https://chatarena.slack.com/join/shared_invite/zt-1t5fpbiep-CbKucEHdJ5YeDLEpKWxDOg#/shared-invite/email',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'chatdev',
    name: 'ChatDev',
    website: 'https://chatdev.modelbest.cn/',
    description: 'Create Customized Software using Natural Language Idea (through LLM-powered Multi-Agent Collaboration)',
    logo: 'https://github.com/OpenBMB/ChatDev/blob/main/misc/logo1.png',
    category: ['DIY/Build Your Own'],
    isOpenSource: true,
    github: 'https://github.com/OpenBMB/ChatDev',
    twitter: 'OpenBMB',
    discord: 'https://discord.com/invite/bn4t2Jy6TT',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'chem-crow',
    name: 'Chem Crow',
    website: 'https://agents.staf.ai/ChemCrow',
    description: 'ChemCrow is an open source package for the accurate solution of reasoning-intensive chemical tasks. Built with Langchain, it uses a collection of chemical tools including RDKit, paper-qa, as well as some relevant databases in chemistry, like Pubchem and chem-space.',
    logo: 'https://raw.githubusercontent.com/ur-whitelab/chemcrow-public/main/assets/chemcrow_dark_bold.png',
    category: ['Science'],
    isOpenSource: true,
    github: 'https://github.com/ur-whitelab/chemcrow-public',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'clippy',
    name: 'Clippy',
    website: 'https://python-poetry.org/docs/#installing-with-pipx',
    description: 'Develop code for or with the user. It can plan, write, debug, and test some projects autonomously.',
    category: ['Coding'],
    isOpenSource: true,
    github: 'https://github.com/ennucore/clippinator',
    twitter: 'ennucore',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'codefuse-chatbot',
    name: 'CodeFuse-ChatBot',
    website: 'https://github.com/codefuse-ai/codefuse-chatbot#-%E6%A8%A1%E5%9E%8B%E6%8E%A5%E5%85%A5',
    description: 'An intelligent assistant serving the entire software development lifecycle, powered by a Multi-Agent Framework, working with DevOps Toolkits, Code&Doc Repo RAG, etc.',
    category: ['Coding'],
    isOpenSource: true,
    github: 'https://github.com/codefuse-ai/codefuse-chatbot',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'cody-ajhous44',
    name: 'Cody by ajhous44',
    website: 'https://github.com/ajhous44/cody/blob/main/cody.py',
    description: 'An AI assistant designed to let you interactively query your codebase using natural language.',
    logo: 'https://camo.githubusercontent.com/18cfdc02648d5adceb0e43e3ebb80742421d56122e2a76a1cc3f7ab7eafd6780/68747470733a2f2f6769746875622e6769746875626173736574732e636f6d2f6173736574732f4769744875622d4d61726b2d6561323937316365653739392e706e67',
    category: ['Coding'],
    isOpenSource: true,
    github: 'https://github.com/ajhous44/cody',
    twitter: 'https://github.com/ajhous44/',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'cody-sourcegraph',
    name: 'Cody by Sourcegraph',
    website: 'https://github.com/sourcegraph/docs',
    description: 'An AI code assistant from Sourcegraph that writes code and answers questions for you by reading your entire codebase and the code graph.',
    logo: 'https://camo.githubusercontent.com/05d7f57f98c1a924b36b9bedbbc78a2a22996b232b5fd586a5c28dbfae346510/68747470733a2f2f736f7572636567726170682e636f6d2f2e6173736574732f696d672f736f7572636567726170682d6d61726b2e7376673f7632',
    category: ['Coding'],
    isOpenSource: true,
    github: 'https://github.com/sourcegraph/sourcegraph/tree/main/client/cody',
    twitter: 'sourcegraph',
    discord: 'https://discord.com/invite/s2qDtYGnAE',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'continue',
    name: 'Continue',
    website: 'https://www.continue.dev/',
    description: 'Leading open-source AI code assistant. You can connect any models and any context to build custom autocomplete and chat experiences inside VS Code and JetBrains.',
    logo: 'https://github.com/continuedev/continue/blob/main/media/readme.png',
    category: ['Coding'],
    isOpenSource: true,
    github: 'https://github.com/continuedev/continue',
    twitter: 'continuedev',
    discord: 'https://discord.com/invite/vapESyrFmJ',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'crewai',
    name: 'CrewAI',
    website: 'https://crewai.com/',
    description: 'AI Agents reimaged for engineers',
    logo: 'https://raw.githubusercontent.com/joaomdmoura/crewAI/main/docs/crewai_logo.png',
    category: ['DIY/Build Your Own'],
    isOpenSource: true,
    github: 'https://github.com/joaomdmoura/crewai',
    twitter: 'crewAIInc',
    discord: 'https://discord.com/invite/X4JWnZnxPb',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'databerry',
    name: 'Databerry',
    website: 'https://www.chaindesk.ai/',
    description: 'No-code platform for building custom LLM Agents.',
    category: ['DIY/Build Your Own'],
    isOpenSource: true,
    github: 'https://github.com/gmpetrov/databerry',
    twitter: 'georges_petrov',
    discord: 'https://discord.com/invite/FSWKj49ckX',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'demogpt',
    name: 'DemoGPT',
    website: 'https://www.demogpt.io/',
    description: 'Build a quick demo based on your prompt',
    logo: 'https://raw.githubusercontent.com/melih-unsal/DemoGPT/main/assets/banner_small.png',
    category: ['DIY/Build Your Own'],
    isOpenSource: true,
    github: 'https://github.com/melih-unsal/DemoGPT',
    twitter: 'demo_gpt',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'devgpt',
    name: 'DevGPT',
    website: 'https://agents.staf.ai/DevGPT',
    description: 'Code generation leverages a vectorised version of your repository, ensuring highly relevant and contextually useful code. Say goodbye to copy-pasting; the generated code appears directly in your editor.',
    logo: 'https://camo.githubusercontent.com/88dbeadbb0a831d9488e6719d459515d0b629bd81f96ddc9c0087d6bd57577f5/68747470733a2f2f7062732e7477696d672e636f6d2f70726f66696c655f696d616765732f313638343437323735343539373134323532392f74794d39327352415f343030783430302e6a7067',
    category: ['Coding'],
    isOpenSource: true,
    github: 'https://github.com/jina-ai/dev-gpt',
    twitter: 'JinaAI_',
    discord: 'https://discord.com/invite/AWXCCC6G2P',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'devika',
    name: 'Devika',
    website: 'https://github.com/stitionai/devika/tree/main/docs/architecture',
    description: 'Agentic AI Software Engineer that can understand high-level human instructions, break them down into steps, research relevant information, and write code to achieve the given objective. Devika aims to be a competitive open-source alternative to Devin by Cognition AI.',
    category: ['Coding'],
    isOpenSource: true,
    github: 'https://github.com/stitionai/devika',
    twitter: 'stitionai',
    discord: 'https://discord.com/invite/CYRp43878y',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'devon',
    name: 'Devon',
    website: 'https://github.com/entropy-research/Devon',
    description: 'Open-source alternative to Devin by Entropy research',
    category: ['Research'],
    isOpenSource: true,
    github: 'https://github.com/entropy-research/Devon',
    discord: 'https://discord.com/invite/p5YpZ5vjd9',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'devopsgpt',
    name: 'DevOpsGPT',
    website: 'https://www.kuafuai.net/',
    description: 'Multi agent system for AI-driven software development. Combine LLM with DevOps tools to convert natural language requirements into working software. Supports any development language and extends the existing code.',
    category: ['Coding'],
    isOpenSource: true,
    github: 'https://github.com/kuafuai/DevOpsGPT',
    discord: 'https://discord.com/invite/4RMUCZwnxF',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'dotagent',
    name: 'dotagent',
    website: 'https://dotagent.ai/',
    description: 'An agent management system that facilitates the creation of robust AI applications and experimental autonomous agents through a rich suite of developer tools.',
    logo: 'https://avatars.githubusercontent.com/u/133483033?s=200&v=4',
    category: ['DIY/Build Your Own'],
    isOpenSource: true,
    github: 'https://github.com/dot-agent/nextpy',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'eidolon',
    name: 'Eidolon',
    website: 'https://www.eidolonai.com/',
    description: 'An open source SDK for AI agents',
    logo: 'https://camo.githubusercontent.com/083e799e7d041aed2d2d25f97a21173de4df562dff822a9cfe8dae887ea38afc/68747470733a2f2f7777772e6569646f6c6f6e61692e636f6d2f5f617374726f2f64656661756c742e6a4b4159586d70495f5a57566735452e77656270',
    category: ['DIY/Build Your Own'],
    isOpenSource: true,
    github: 'https://github.com/eidolon-ai/eidolon',
    twitter: 'AgentSDK',
    discord: 'https://discord.com/invite/6kVQrHpeqG',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'english-compiler',
    name: 'English Compiler',
    website: 'https://agents.staf.ai/EnglishCompiler',
    description: 'POC AI based Compiler, for converting english based markdown specs, into functional code',
    category: ['Coding'],
    isOpenSource: true,
    github: 'https://github.com/uilicious/english-compiler',
    twitter: 'picocreator',
    discord: 'https://discord.com/invite/SgSxuQ65GF',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'evo-ninja',
    name: 'evo.ninja',
    website: 'https://evo.ninja/',
    description: 'Evo utilizes pre-defined agent personas that are tailored to specific domains of tasks. Each iteration of evo\'s execution loop it will select and adopt the persona that fits the task at hand best.',
    logo: 'https://github.com/agentcoinorg/evo.ninja/blob/dev/docs/imgs/evo-ninja-logo.png',
    category: ['General Purpose'],
    isOpenSource: true,
    github: 'https://github.com/agentcoinorg/evo.ninja',
    twitter: 'agentcoinorg',
    discord: 'https://discord.com/invite/r3rwh69cCa',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'flowise',
    name: 'Flowise AI',
    website: 'https://flowiseai.com/',
    description: 'Build LLMs Apps Easily. Open source UI visual tool to build your customized LLM flow using LangchainJS, written in Node Typescript/Javascript',
    logo: 'https://camo.githubusercontent.com/632999c7177d5eb029d9479862242590cff5b6d2cb0dff721c7667293fa16f04/68747470733a2f2f666c6f7769736561692e636f6d2f5f6e6578742f696d6167653f75726c3d2532465f6e6578742532467374617469632532466d656469612532466c6f676f2d636f6c6f722d686967682e65363064653266382e706e6726773d33383426713d3735',
    category: ['DIY/Build Your Own'],
    isOpenSource: true,
    github: 'https://github.com/FlowiseAI/Flowise',
    twitter: 'FlowiseAI',
    discord: 'https://discord.com/invite/jbaHfsRVBW',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'friday',
    name: 'Friday',
    website: 'https://github.com/amirrezasalimi/friday/blob/main/readme.md',
    description: 'Friday is a developer agent that helps you quickly create applications with AI assistance.',
    category: ['Coding'],
    isOpenSource: true,
    github: 'https://github.com/amirrezasalimi/friday/',
    twitter: 'amirsalimiiii',
    discord: 'https://discord.com/invite/gnjutQvwah',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'genia',
    name: 'GeniA',
    website: 'https://genia-dev.github.io/GeniA/',
    description: 'GeniA is able to work along side you on your production enviroment, executing tasks on your behalf in your dev & cloud environments, AWS/k8s/Argo/GitHub etc.',
    logo: 'https://raw.githubusercontent.com/genia-dev/GeniA/main/media/genia_title.png',
    category: ['Coding'],
    isOpenSource: true,
    github: 'https://github.com/genia-dev/GeniA',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'godmode',
    name: 'GodMode',
    website: 'https://godmode.space/',
    description: 'Godmode is a web platform to access the powers of autoGPT and babyAGI. AI agents are still in their infancy, but they are quickly growing in capabilities, and we hope that Godmode will enable more people to tap into autonomous AI agents even in this early stage.',
    category: ['General Purpose'],
    isOpenSource: true,
    github: 'https://github.com/FOLLGAD/Godmode-GPT',
    twitter: 'emilahlback',
    discord: 'https://discord.com/invite/vSzCcDDwz3',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'gpt-discord',
    name: 'GPT Discord',
    website: 'https://kaveenk.com/',
    description: 'GPT Discord is a robust, all-in-one GPT interface for Discord.',
    category: ['Productivity'],
    isOpenSource: true,
    github: 'https://github.com/Kav-K/GPTDiscord',
    discord: 'https://discord.com/invite/WvAHXDMS7Q',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'gpt-engineer',
    name: 'GPT Engineer',
    website: 'https://gptengineer.app/',
    description: 'Specify what you want it to build, the AI asks for clarification, and then builds it.',
    category: ['Coding'],
    isOpenSource: true,
    github: 'https://github.com/gpt-engineer-org/gpt-engineer',
    twitter: 'antonosika',
    discord: 'https://discord.com/invite/8tcDQ89Ej2',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'gpt-migrate',
    name: 'GPT Migrate',
    website: 'https://gpt-migrate.com/',
    description: 'Easily migrate your codebase from one framework or language to another.',
    logo: 'https://butternut.ai/_next/image?url=%2Fimages%2Flogo%2Flogo-text.png&w=384&q=75',
    category: ['Coding'],
    isOpenSource: true,
    github: 'https://github.com/joshpxyne/gpt-migrate',
    twitter: 'joshpxyne',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'gpt-pilot',
    name: 'GPT Pilot',
    website: 'https://github.com/Pythagora-io/gpt-pilot/blob/main/README.md',
    description: 'GPT Pilot is an AI agent that codes the entire app as you oversee the code being written.',
    logo: 'https://camo.githubusercontent.com/6f1124eec1cfa9a842e27e4d66fb170c2f0d8d5ee23b11d7b2c6ff53be85d5f9/68747470733a2f2f746563686372756e63682e636f6d2f77702d636f6e74656e742f75706c6f6164732f323032332f30382f6770745f70696c6f745f6c6f676f2e706e673f773d313530',
    category: ['Coding'],
    isOpenSource: true,
    github: 'https://github.com/Pythagora-io/gpt-pilot',
    twitter: 'HiPythagora',
    discord: 'https://discord.com/invite/HaqXugmxr9',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'gpt-researcher',
    name: 'GPT Researcher',
    website: 'https://gptr.dev/',
    description: 'GPT Researcher is a GPT-based autonomous agent that does online comprehensive research on any given topic.',
    category: ['Research'],
    isOpenSource: true,
    github: 'https://github.com/assafelovic/gpt-researcher',
    twitter: 'tavilyai',
    discord: 'https://discord.com/invite/QgZXvJAccX',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'gpt-runner',
    name: 'GPT Runner',
    website: 'https://github.com/nicepkg/gpt-runner',
    description: 'Use GPT-Runner to manage your AI presets, engage in AI-powered conversations with your code, and significantly boost the development efficiency of both you and your team!',
    logo: 'https://private-user-images.githubusercontent.com/34775414/252919370-a48b745f-c803-4884-95a8-26c63f7f5b53.svg',
    category: ['Research'],
    isOpenSource: true,
    github: 'https://github.com/nicepkg/gpt-runner',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'gptswarm',
    name: 'GPTSwarm',
    website: 'https://gptswarm.org/',
    description: 'GPTSwarm is a graph-based framework for LLM-based agents.',
    logo: 'https://camo.githubusercontent.com/5ede790924129556c7f7020a19c50e07c31a9520e8bdf92a6da5958124863868/68747470733a2f2f677074737761726d2e6f72672f696d616765732f677074737761726d2e706e67',
    category: ['DIY/Build Your Own'],
    isOpenSource: true,
    github: 'https://github.com/metauto-ai/GPTSwarm',
    twitter: 'MingchenZhuge',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'ix',
    name: 'IX',
    website: 'https://github.com/kreneskyp/ix',
    description: 'IX is a platform for designing and deploying autonomous and [semi]-autonomous LLM powered agents and workflows.',
    logo: 'https://raw.githubusercontent.com/kreneskyp/ix/master/ix_350.png',
    category: ['DIY/Build Your Own'],
    isOpenSource: true,
    github: 'https://github.com/kreneskyp/ix',
    twitter: 'kreneskyp',
    discord: 'https://discord.com/invite/jtrMKxzZZQ',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'jarvis',
    name: 'JARVIS',
    website: 'https://github.com/microsoft/JARVIS',
    description: 'JARVIS is to explore artificial general intelligence (AGI) and deliver cutting-edge research to the whole community.',
    category: ['General Purpose'],
    isOpenSource: true,
    github: 'https://github.com/microsoft/JARVIS',
    twitter: 'OpenAtMicrosoft',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'langroid',
    name: 'Langroid',
    website: 'https://langroid.github.io/langroid/',
    description: 'Langroid is an intuitive, lightweight, extensible and principled Python framework to easily build LLM-powered applications, from ex-CMU and UW-Madison researchers.',
    logo: 'https://raw.githubusercontent.com/langroid/langroid/main/docs/assets/langroid-card-lambda-ossem-rust-1200-630.png',
    category: ['General Purpose'],
    isOpenSource: true,
    github: 'https://github.com/langroid/langroid',
    discord: 'https://discord.com/invite/ZU36McDgDs',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'lemon-agent',
    name: 'Lemon Agent',
    website: 'https://github.com/felixbrock/lemon-agent?tab=readme-ov-file',
    description: 'Lemon agent is a Plan-Validate-Solve (PVS) Agent for accurate, reliable and reproducable workflow automation.',
    category: ['Productivity'],
    isOpenSource: true,
    github: 'https://github.com/felixbrock/lemon-agent',
    twitter: 'felixbrockm',
    discord: 'https://discord.com/invite/fWU4rDYSxw',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'llm-agents',
    name: 'LLM Agents',
    website: 'https://www.paepper.com/blog/posts/intelligent-agents-guided-by-llms/',
    description: 'A minimalistic library for building agents that leverage large language models to automate tasks through a loop of commands and tool integrations.',
    logo: 'https://camo.githubusercontent.com/18cfdc02648d5adceb0e43e3ebb80742421d56122e2a76a1cc3f7ab7eafd6780/68747470733a2f2f6769746875622e6769746875626173736574732e636f6d2f6173736574732f4769744875622d4d61726b2d6561323937316365653739392e706e67',
    category: ['Coding'],
    isOpenSource: true,
    github: 'https://github.com/mpaepper/llm_agents',
    twitter: 'mpaepper',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'llm-stack',
    name: 'LLM Stack',
    website: 'https://llmstack.ai/',
    description: 'LLMStack is a no-code platform for building generative AI agents, workflows and chatbots, connecting them to your data and business processes.',
    logo: 'https://camo.githubusercontent.com/15283dcfeca5ca20fb2d8dd40272bf95eb9139f4c19bdd25056dd021aa671ec0/68747470733a2f2f6c6c6d737461636b2e61692f696d672f6c6f676f2d677261797363616c652e737667',
    category: ['DIY/Build Your Own'],
    isOpenSource: true,
    github: 'https://github.com/trypromptly/LLMStack',
    twitter: 'trypromptly',
    discord: 'https://discord.com/invite/3JsEzSXspJ',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'local-gpt',
    name: 'Local GPT',
    website: 'https://github.com/PromtEngineer/localGPT',
    description: 'LocalGPT is an open-source initiative that allows you to converse with your documents without compromising your privacy. Inspired by privateGPT, allows using your own documents as an information source',
    logo: 'https://camo.githubusercontent.com/18cfdc02648d5adceb0e43e3ebb80742421d56122e2a76a1cc3f7ab7eafd6780/68747470733a2f2f6769746875622e6769746875626173736574732e636f6d2f6173736574732f4769744875622d4d61726b2d6561323937316365653739392e706e67',
    category: ['General Purpose'],
    isOpenSource: true,
    github: 'https://github.com/PromtEngineer/localGPT',
    twitter: 'engineerrprompt',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'loop-gpt',
    name: 'Loop GPT',
    website: 'https://github.com/farizrahman4u/loopgpt/tree/mainn',
    description: 'Modular Auto-GPT Framework',
    logo: 'https://raw.githubusercontent.com/farizrahman4u/loopgpt/main/docs/assets/imgs/loopgpt_demo_pic.png',
    category: ['General Purpose'],
    isOpenSource: true,
    github: 'https://github.com/farizrahman4u/loopgpt/tree/mainn',
    discord: 'https://discord.com/invite/rqs26cqx7v',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'l2mac',
    name: 'L2MAC',
    website: 'https://samholt.github.io/L2MAC/',
    description: 'L2MAC is a multi-agent generation framework that, a single input prompt can generate an extensive unbounded output, such as an entire codebase or an entire book.',
    logo: 'https://raw.githubusercontent.com/samholt/L2MAC/master/docs/public/l2mac-icon-white.png',
    category: ['General Purpose'],
    isOpenSource: true,
    github: 'https://github.com/samholt/l2mac',
    twitter: 'samianholt',
    discord: 'https://discord.com/invite/z27CxnwdhY',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'maige',
    name: 'Maige',
    website: 'https://maige.app/',
    description: 'Maige is a codebase agent that runs when new issues and pull requests come up. Its core features are labelling, assigning, and answering questions.',
    category: ['Coding'],
    isOpenSource: true,
    github: 'https://github.com/RubricLab/maige',
    twitter: 'rubriclabs',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'magick',
    name: 'Magick',
    website: 'https://www.magickml.com/',
    description: 'Magick is an AIDE for creating, deploying, scaling, and monetizing useful AI agents, and prompt chaining.',
    logo: 'https://camo.githubusercontent.com/5afc442f5bfb87b906dd75ce394c7c62e30d94cfcbc2f3a755c681ae8fec36c5/68747470733a2f2f6173736574732d676c6f62616c2e776562736974652d66696c65732e636f6d2f3635303762346166323238373564306238616266393561372f3635303762626463333038356366323664316538303431655f77686974652d776d2d74696e792e706e67',
    category: ['Coding'],
    isOpenSource: true,
    github: 'https://github.com/Oneirocom/Magick',
    twitter: 'magickml',
    discord: 'https://discord.com/invite/7Xx5DmbJCe',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'memgpt',
    name: 'MemGPT',
    website: 'https://memgpt.readme.io/docs/index',
    description: 'A system that intelligently manages different memory tiers in LLMs to effectively provide the extended context within the LLM\'s limited context window.',
    logo: 'https://camo.githubusercontent.com/263624cc2d55362161e9d3ec8e519fe411311f63c5b432ca1953b91d40dca404/68747470733a2f2f66696c65732e726561646d652e696f2f646137663731392d736d616c6c2d6d656d6770745f6c6f676f5f636972636c655f6e756e6f2e706e67',
    category: ['Analytics'],
    isOpenSource: true,
    github: 'https://github.com/cpacker/MemGPT',
    twitter: 'MemGPT',
    discord: 'https://discord.com/invite/9GEQrxmVyE',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'mentat',
    name: 'Mentat',
    website: 'https://mentat.ai/',
    description: 'AI tool that assists you with any coding task, right from your command line.',
    logo: 'https://camo.githubusercontent.com/bd753f96fb429900fc0fddba8b6adcd54b11bdc81e0bc5189e1f10c6a6ba1eed/68747470733a2f2f6173736574732d676c6f62616c2e776562736974652d66696c65732e636f6d2f3634626164313735633366316665383935376130366661662f3634626566306435376361333466393763323662326336335f6162616e74652d61692d69636f6e5f7472616e73706172656e745f3237312e706e67',
    category: ['Coding'],
    isOpenSource: true,
    github: 'https://github.com/AbanteAI/mentat',
    twitter: 'bio_bootloader',
    discord: 'https://discord.com/invite/zbvd9qx9Pb',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'metagpt',
    name: 'MetaGPT',
    website: 'https://www.deepwisdom.ai/',
    description: 'MetaGPT is a multi-agent framework that, given one line requirement, returns PRD, Design, Tasks, or Repo.',
    category: ['DIY/Build Your Own'],
    isOpenSource: true,
    github: 'https://github.com/geekan/MetaGPT',
    twitter: 'DeepWisdom2019',
    discord: 'https://discord.com/invite/4WdszVjv',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'mini-agi',
    name: 'Mini AGI',
    website: 'https://github.com/muellerberndt/mini-agi',
    description: 'MiniAGI is a minimal general-purpose autonomous agent based on GPT-3.5 / GPT-4. Can analyze stock prices, perform network security tests, create art, and order pizza.',
    logo: 'https://raw.githubusercontent.com/muellerberndt/mini-agi/main/static/mini-agi-cover.png',
    category: ['General Purpose'],
    isOpenSource: true,
    github: 'https://github.com/muellerberndt/mini-agi',
    twitter: 'muellerberndt',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'multiagent-debate',
    name: 'Multiagent Debate',
    website: 'https://composable-models.github.io/llm_debate/',
    description: 'Multiagent Debate is an implementation of the paper "Improving Factuality and Reasoning in Language Models through Multiagent Debate".',
    category: ['General Purpose'],
    isOpenSource: true,
    github: 'https://github.com/composable-models/llm_multiagent_debate',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'multi-gpt',
    name: 'Multi GPT',
    website: 'https://www.loom.com/share/b6bec93065794eb8a47e2109697afa39',
    description: 'An experimental open-source attempt to make GPT-4 fully autonomous',
    logo: 'https://camo.githubusercontent.com/18cfdc02648d5adceb0e43e3ebb80742421d56122e2a76a1cc3f7ab7eafd6780/68747470733a2f2f6769746875622e6769746875626173736574732e636f6d2f6173736574732f4769744875622d4d61726b2d6561323937316365653739392e706e67',
    category: ['General Purpose'],
    isOpenSource: true,
    github: 'https://github.com/sidhq/Multi-GPT',
    twitter: 'try_sid',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'nlsom',
    name: 'NLSOM',
    website: 'https://metauto.ai/',
    description: 'Mindstorm in Natural Language-based Societies of Mind',
    category: ['Science'],
    isOpenSource: true,
    github: 'https://github.com/mczhuge/NLSOM',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'openagents',
    name: 'OpenAgents',
    website: 'https://github.com/xlang-ai/OpenAgents?tab=readme-ov-file',
    description: 'OpenAgents is an Open Platform for Language Agents in the Wild, ChatGPT Plus Replica for Researchers, Developers, and General Users.',
    category: ['General Purpose'],
    isOpenSource: true,
    github: 'https://github.com/xlang-ai/OpenAgents',
    twitter: 'XLangNLP',
    discord: 'https://discord.com/invite/4Gnw7eTEZR',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'openagi',
    name: 'OpenAGI',
    website: 'https://github.com/agiresearch/OpenAGI',
    description: 'OpenAGI is an open-source AGI R&D platform that enables agents for both benchmark tasks and open-ended tasks',
    category: ['General Purpose'],
    isOpenSource: true,
    github: 'https://github.com/agiresearch/OpenAGI',
    discord: 'https://discord.com/invite/B2HFxEgTJX',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'opendevin',
    name: 'OpenDevin',
    website: 'https://docs.all-hands.dev/',
    description: 'The OpenDevin project is born out of a desire to replicate, enhance, and innovate beyond the original Devin model.',
    category: ['Coding'],
    isOpenSource: true,
    github: 'https://github.com/OpenDevin/OpenDevin',
    discord: 'https://discord.com/invite/ESHStjSjD4',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'openinterpreter',
    name: 'OpenInterpreter',
    website: 'https://www.openinterpreter.com/',
    description: 'A new way to use computers. Open Interpreter lets LLMs run code on your computer to complete tasks',
    category: ['Coding'],
    isOpenSource: true,
    github: 'https://github.com/KillianLucas/open-interpreter',
    twitter: 'hellokillian',
    discord: 'https://discord.com/invite/Hvz9Axh84z',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'pezzo',
    name: 'Pezzo',
    website: 'https://pezzo.ai/',
    description: 'Pezzo is a development toolkit designed to streamline prompt design, version management, publishing, collaboration, troubleshooting, observability and more',
    logo: 'https://camo.githubusercontent.com/b79e7a149e6e403710e411b57041f11d5a3ef4199e1c18da1b7419053cf7841d/68747470733a2f2f7777772e70657a7a6f2e61692f5f6e6578742f7374617469632f6d656469612f4c6f676f2e62376533383738622e737667',
    category: ['Coding'],
    isOpenSource: true,
    github: 'https://github.com/pezzolabs/pezzo',
    twitter: 'pezzoai',
    discord: 'https://discord.com/invite/h5nBW5ySqQ',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'private-gpt',
    name: 'Private GPT',
    website: 'https://privategpt.io/',
    description: 'Interact with your documents using the power of GPT, 100% privately, no data leaks',
    logo: 'https://camo.githubusercontent.com/ddfc695140fb1e5d9f376bccbed48f77159d45e3b790b5f336f42587f1b8b0c0/68747470733a2f2f6173736574732d676c6f62616c2e776562736974652d66696c65732e636f6d2f3634303838373265343965303934346130383866313763312f3634306633633665383634303839356632636266393562615f6c6f676f25323066756c6c2e737667',
    category: ['Research'],
    isOpenSource: true,
    github: 'https://github.com/imartinez/privateGPT',
    twitter: 'ZylonPrivateGPT',
    discord: 'https://discord.com/invite/bK6mRVpErU',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'prometh-ai',
    name: 'PromethAI',
    website: 'https://www.cognee.ai/',
    description: 'Open-source framework that gives you AI Agents that help you navigate decision-making, get personalized goals and execute them',
    logo: 'https://avatars.githubusercontent.com/u/125468716?s=280&v=4',
    category: ['Assistant'],
    isOpenSource: true,
    github: 'https://github.com/topoteretes/PromethAI-Backend',
    twitter: 'tricalt',
    discord: 'https://discord.com/invite/m63hxKsp4p',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'react-agent',
    name: 'React Agent',
    website: 'https://reactagent.io/',
    description: 'The open-source React.js Autonomous LLM Agent',
    logo: 'https://camo.githubusercontent.com/ffba5d362350742ba2397446b014ab8e72ae990775d0e5eaa8523562b016ead1/68747470733a2f2f72656163746167656e742e696f2f6c6f676f2d6461726b2e706e67',
    category: ['Coding'],
    isOpenSource: true,
    github: 'https://github.com/eylonmiz/react-agent',
    twitter: 'EylonMiz',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'self-operating-computer',
    name: 'Self-operating computer',
    website: 'https://www.hyperwriteai.com/self-operating-computer',
    description: 'A framework to enable multimodal models to operate a computer.',
    logo: 'https://camo.githubusercontent.com/d441f22e80e23e72bf5541662c4062dd68f2d7631d4e2c7975e463087015c976/68747470733a2f2f6173736574732d676c6f62616c2e776562736974652d66696c65732e636f6d2f3633666364373964343130623232646466333937653162382f3635343237323535343430323431306137316338346162395f3634303563316361626466396336396630356231303830655f6f74686572736964655f6c6f676f5f73796d626f6c2e77656270',
    category: ['Productivity'],
    isOpenSource: true,
    github: 'https://github.com/OthersideAI/self-operating-computer',
    twitter: 'HyperWriteAI',
    discord: 'https://discord.com/invite/2hXjDrgTcx',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'smol-developer',
    name: 'Smol Developer',
    website: 'https://agents.staf.ai/SmolDeveloper',
    description: 'The first library to let you embed a developer agent in your own app!',
    category: ['Coding'],
    isOpenSource: true,
    github: 'https://github.com/smol-ai/developer',
    twitter: 'SmolModels',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'stackwise',
    name: 'Stackwise',
    website: 'https://www.stackwise.ai/stacks',
    description: 'Stackwise is a VS Code extension that writes and imports nodejs functions so that you can write code without context switching.',
    logo: 'https://camo.githubusercontent.com/2073402a5c9b06a7726a4bce3cb8f72c5eacc4e7d21c7297058a9033b8673ac3/68747470733a2f2f7062732e7477696d672e636f6d2f70726f66696c655f696d616765732f313732333931313636303233323934353636342f4374756d665575425f343030783430302e6a7067',
    category: ['Coding'],
    isOpenSource: true,
    github: 'https://github.com/stackwiseai/stackwise',
    twitter: 'stackwiseai',
    discord: 'https://discord.com/invite/KfUxa8h3s6',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'superagent',
    name: 'SuperAgent',
    website: 'https://superagent.sh/',
    description: 'Build, deploy, and manage LLM-powered agents',
    logo: 'https://camo.githubusercontent.com/41e23b277675be4f7ed1fb1653e080af5d59e0000ea9c6cc4023664500b47387/68747470733a2f2f6170692e74797065647265616d2e636f6d2f76302f646f63756d656e742f7075626c69632f62396436383862612d386633342d343065342d613234612d6336326234303362343032642f3259756b6751737662566b5570377531484c7372424b436a66724f5f73757065726167656e745f6c6f676f5f63616e6469646174655f325f696e76697369626c655f6261636b67726f756e645f736d616c6c2e706e67',
    category: ['DIY/Build Your Own'],
    isOpenSource: true,
    github: 'https://github.com/superagent-ai/superagent',
    twitter: 'superagent_ai',
    discord: 'https://discord.com/invite/mhmJUTjW4b',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'superagi',
    name: 'SuperAGI',
    website: 'https://superagi.com/',
    description: 'Dev-first opensource AI agents framework to build, manage & run autonomous agents',
    logo: 'https://camo.githubusercontent.com/868888277174cd5cd096597189a7582c80c2336afba7a5fe5c4808c50c67bba0/68747470733a2f2f7062732e7477696d672e636f6d2f70726f66696c655f696d616765732f313637383635393531303034313435363634302f7278554966756c545f343030783430302e6a7067',
    category: ['DIY/Build Your Own'],
    isOpenSource: true,
    github: 'https://github.com/TransformerOptimus/SuperAGI',
    twitter: '_superAGI',
    discord: 'https://discord.com/invite/dXbRe5BHJC',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'suspicion-agent',
    name: 'Suspicion Agent',
    website: 'https://github.com/CR-Gjx/Suspicion-Agent',
    description: 'The implementation of "Suspicion-Agent: Playing Imperfect Information Games with Theory of Mind Aware GPT-4"',
    category: ['General Purpose'],
    isOpenSource: true,
    github: 'https://github.com/CR-Gjx/Suspicion-Agent',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'swe-agent',
    name: 'SWE Agent',
    website: 'https://princeton-nlp.github.io/SWE-agent/',
    description: 'SWE-agent takes a GitHub issue and tries to automatically fix it, using GPT-4, or your LM of choice.',
    category: ['Coding'],
    isOpenSource: true,
    github: 'https://github.com/princeton-nlp/SWE-agent',
    discord: 'https://discord.com/invite/AVEFbBn2rH',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'sweep',
    name: 'Sweep',
    website: 'https://sweep.dev/',
    description: 'Sweep: open-source AI-powered Software Developer for small features and bug fixes.',
    logo: 'https://avatars.githubusercontent.com/u/127925974?s=200&v=4',
    category: ['Coding'],
    isOpenSource: true,
    github: 'https://github.com/sweepai/sweep',
    twitter: 'sweep__ai',
    discord: 'https://discord.com/invite/sweep-ai',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'taxy-ai',
    name: 'Taxy AI',
    website: 'https://github.com/TaxyAI/browser-extension',
    description: 'Taxy uses GPT-4 to control your browser and perform repetitive actions on your behalf',
    logo: 'https://raw.githubusercontent.com/TaxyAI/browser-extension/main/src/assets/img/icon-128.png',
    category: ['General Purpose'],
    isOpenSource: true,
    github: 'https://github.com/TaxyAI/browser-extension',
    discord: 'https://discord.gg/DXaErbBc',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'teenage-agi',
    name: 'Teenage AGI',
    website: 'https://github.com/seanpixel/Teenage-AGI/blob/main/README.md',
    description: 'A BabyAGI-inspired agent that can recall infinite memory, "thinks" before making action, and doesn\'t lose memory after being shutting down',
    logo: 'https://camo.githubusercontent.com/18cfdc02648d5adceb0e43e3ebb80742421d56122e2a76a1cc3f7ab7eafd6780/68747470733a2f2f6769746875622e6769746875626173736574732e636f6d2f6173736574732f4769744875622d4d61726b2d6561323937316365653739392e706e67',
    category: ['General Purpose'],
    isOpenSource: true,
    github: 'https://github.com/seanpixel/Teenage-AGI/blob/main/README.md#experiments',
    twitter: 'sean_pixel',
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'ufo',
    name: 'UFO',
    website: 'https://github.com/microsoft/UFO',
    description: 'UFO is a UI-Focused dual-agent framework to fulfill user requests on Windows OS by seamlessly navigating and operating within individual or spanning multiple applications.',
    logo: 'https://raw.githubusercontent.com/microsoft/UFO/main/assets/ufo_blue.png',
    category: ['General Purpose'],
    isOpenSource: true,
    github: 'https://github.com/microsoft/UFO',
    twitter: 'OpenAtMicrosoft',
    lastUpdated: new Date().toISOString()
  }
].map(agent => ({
  ...agent,
  logo: agent.logo || generateDefaultLogo(agent.name)
}));

// Generate unique categories from all agents
export const categories = Array.from(
  new Set(agents.flatMap(agent => agent.category))
).sort();