import path from 'path';
import type { Client, Mapping, Scope } from './types.js';
import { resolveRoots } from './paths.js';
import { pathExists } from '../utils/fs.js';

export type MappingOptions = {
  scope: Scope;
  projectRoot?: string;
  homeDir?: string;
  clients?: Client[];
};

export async function getMappings(opts: MappingOptions): Promise<Mapping[]> {
  const roots = resolveRoots(opts);
  const canonical = roots.canonicalRoot;
  const claudeOverride = path.join(canonical, 'CLAUDE.md');
  const geminiOverride = path.join(canonical, 'GEMINI.md');
  const agentsFallback = path.join(canonical, 'AGENTS.md');
  const claudeSource = await pathExists(claudeOverride) ? claudeOverride : agentsFallback;
  const geminiSource = await pathExists(geminiOverride) ? geminiOverride : agentsFallback;
  const clients = new Set<Client>(opts.clients ?? ['claude', 'factory', 'codex', 'cursor', 'opencode', 'ampcode', 'github', 'gemini', 'antigravity', 'windsurf', 'aider', 'goose', 'kiro', 'devin']);

  const mappings: Mapping[] = [];
  const includeAgentFiles = opts.scope === 'global';
  if (includeAgentFiles && clients.has('claude')) {
    mappings.push({
      name: 'claude-md',
      source: claudeSource,
      targets: [path.join(roots.claudeRoot, 'CLAUDE.md')],
      kind: 'file',
    });
  }

  if (includeAgentFiles && clients.has('gemini')) {
    mappings.push({
      name: 'gemini-md',
      source: geminiSource,
      targets: [path.join(roots.geminiRoot, 'GEMINI.md')],
      kind: 'file',
    });
  }

  if (includeAgentFiles && clients.has('antigravity')) {
    mappings.push({
      name: 'antigravity-md',
      source: geminiSource, // Antigravity shares GEMINI.md with Gemini CLI at ~/.gemini/GEMINI.md
      targets: [path.join(roots.geminiRoot, 'GEMINI.md')],
      kind: 'file',
    });
  }

  if (includeAgentFiles) {
    const agentTargets = [
      clients.has('factory') ? path.join(roots.factoryRoot, 'AGENTS.md') : null,
      clients.has('codex') ? path.join(roots.codexRoot, 'AGENTS.md') : null,
      clients.has('opencode') ? path.join(roots.opencodeConfigRoot, 'AGENTS.md') : null,
      clients.has('ampcode') ? path.join(roots.ampcodeConfigRoot, 'AGENTS.md') : null,
      clients.has('windsurf') ? path.join(roots.windsurfRoot, 'AGENTS.md') : null,
      clients.has('aider') ? path.join(roots.aiderRoot, 'AGENTS.md') : null,
      clients.has('kiro') ? path.join(roots.kiroRoot, 'AGENTS.md') : null,
      clients.has('devin') ? path.join(roots.devinRoot, 'AGENTS.md') : null,
    ].filter(Boolean) as string[];

    if (agentTargets.length > 0) {
      mappings.push({
        name: 'agents-md',
        source: agentsFallback,
        targets: agentTargets,
        kind: 'file',
      });
    }
  }

  mappings.push(
    {
      name: 'commands',
      source: path.join(canonical, 'commands'),
      targets: [
        clients.has('claude') ? path.join(roots.claudeRoot, 'commands') : null,
        clients.has('factory') ? path.join(roots.factoryRoot, 'commands') : null,
        clients.has('codex') ? path.join(roots.codexRoot, 'prompts') : null,
        clients.has('opencode') ? path.join(roots.opencodeRoot, 'commands') : null,
        clients.has('cursor') ? path.join(roots.cursorRoot, 'commands') : null,
        clients.has('gemini') ? path.join(roots.geminiRoot, 'commands') : null,
        clients.has('antigravity') ? path.join(roots.antigravityRoot, 'commands') : null,
        clients.has('windsurf') ? path.join(roots.windsurfRoot, 'commands') : null,
        clients.has('aider') ? path.join(roots.aiderRoot, 'commands') : null,
        clients.has('goose') ? path.join(roots.gooseConfigRoot, 'commands') : null,
        clients.has('kiro') ? path.join(roots.kiroRoot, 'commands') : null,
      ].filter(Boolean) as string[],
      kind: 'dir',
    },
    {
      name: 'hooks',
      source: path.join(canonical, 'hooks'),
      targets: [
        clients.has('claude') ? path.join(roots.claudeRoot, 'hooks') : null,
        clients.has('factory') ? path.join(roots.factoryRoot, 'hooks') : null,
      ].filter(Boolean) as string[],
      kind: 'dir',
    },
    {
      name: 'skills',
      source: path.join(canonical, 'skills'),
      targets: [
        clients.has('claude') ? path.join(roots.claudeRoot, 'skills') : null,
        clients.has('factory') ? path.join(roots.factoryRoot, 'skills') : null,
        clients.has('codex') ? path.join(roots.codexRoot, 'skills') : null,
        clients.has('opencode') ? path.join(roots.opencodeRoot, 'skills') : null,
        clients.has('cursor') ? path.join(roots.cursorRoot, 'skills') : null,
        // GitHub uses .github/skills for project scope and ~/.copilot/skills for global scope
        clients.has('github') ? (opts.scope === 'global' ? path.join(roots.copilotRoot, 'skills') : path.join(roots.githubRoot, 'skills')) : null,
        clients.has('gemini') ? path.join(roots.geminiRoot, 'skills') : null,
        clients.has('antigravity') ? path.join(roots.antigravityRoot, 'skills') : null,
        clients.has('windsurf') ? path.join(roots.windsurfRoot, 'skills') : null,
        clients.has('aider') ? path.join(roots.aiderRoot, 'skills') : null,
        clients.has('goose') ? path.join(roots.gooseConfigRoot, 'skills') : null,
        clients.has('kiro') ? path.join(roots.kiroRoot, 'skills') : null,
      ].filter(Boolean) as string[],
      kind: 'dir',
    },
  );

  return mappings;
}
