import os from 'os';
import path from 'path';
import type { Scope } from './types.js';

export type RootOptions = {
  scope: Scope;
  projectRoot?: string;
  homeDir?: string;
};

export type ResolvedRoots = {
  canonicalRoot: string;
  claudeRoot: string;
  factoryRoot: string;
  codexRoot: string;
  cursorRoot: string;
  opencodeRoot: string;
  opencodeConfigRoot: string;
  ampcodeConfigRoot: string;
  githubRoot: string;
  copilotRoot: string;
  geminiRoot: string;
  antigravityRoot: string;
  antigravityConfigRoot: string;
  windsurfRoot: string;
  windsurfConfigRoot: string;
  aiderRoot: string;
  gooseConfigRoot: string;
  kiroRoot: string;
  devinRoot: string;
  projectRoot: string;
  homeDir: string;
};

export function resolveRoots(opts: RootOptions): ResolvedRoots {
  const homeDir = opts.homeDir || os.homedir();
  const projectRoot = path.resolve(opts.projectRoot || process.cwd());
  if (opts.scope === 'global') {
    return {
      canonicalRoot: path.join(homeDir, '.agents'),
      claudeRoot: path.join(homeDir, '.claude'),
      factoryRoot: path.join(homeDir, '.factory'),
      codexRoot: path.join(homeDir, '.codex'),
      cursorRoot: path.join(homeDir, '.cursor'),
      opencodeRoot: path.join(homeDir, '.opencode'),
      opencodeConfigRoot: path.join(homeDir, '.config', 'opencode'),
      ampcodeConfigRoot: path.join(homeDir, '.config', 'amp'),
      githubRoot: path.join(projectRoot, '.github'),
      copilotRoot: path.join(homeDir, '.copilot'),
      geminiRoot: path.join(homeDir, '.gemini'),
      antigravityRoot: path.join(homeDir, '.gemini'), // Shares .gemini with Gemini CLI
      antigravityConfigRoot: path.join(homeDir, '.config', 'antigravity'),
      windsurfRoot: path.join(homeDir, '.windsurf'),
      windsurfConfigRoot: path.join(homeDir, '.codeium', 'windsurf'),
      aiderRoot: path.join(homeDir, '.aider'),
      gooseConfigRoot: path.join(homeDir, '.config', 'goose'),
      kiroRoot: path.join(homeDir, '.kiro'),
      devinRoot: path.join(projectRoot, '.devin'), // Devin uses project-level only
      projectRoot,
      homeDir,
    };
  }
  return {
    canonicalRoot: path.join(projectRoot, '.agents'),
    claudeRoot: path.join(projectRoot, '.claude'),
    factoryRoot: path.join(projectRoot, '.factory'),
    codexRoot: path.join(projectRoot, '.codex'),
    cursorRoot: path.join(projectRoot, '.cursor'),
    opencodeRoot: path.join(projectRoot, '.opencode'),
    opencodeConfigRoot: path.join(homeDir, '.config', 'opencode'),
    ampcodeConfigRoot: path.join(homeDir, '.config', 'amp'),
    githubRoot: path.join(projectRoot, '.github'),
    copilotRoot: path.join(homeDir, '.copilot'),
    geminiRoot: path.join(projectRoot, '.gemini'),
    antigravityRoot: path.join(projectRoot, '.gemini'), // Shares .gemini with Gemini CLI
    antigravityConfigRoot: path.join(homeDir, '.config', 'antigravity'),
    windsurfRoot: path.join(projectRoot, '.windsurf'),
    windsurfConfigRoot: path.join(homeDir, '.codeium', 'windsurf'),
    aiderRoot: path.join(projectRoot, '.aider'),
    gooseConfigRoot: path.join(homeDir, '.config', 'goose'),
    kiroRoot: path.join(projectRoot, '.kiro'),
    devinRoot: path.join(projectRoot, '.devin'),
    projectRoot,
    homeDir,
  };
}
