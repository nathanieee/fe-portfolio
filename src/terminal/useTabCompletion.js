import { useCallback } from 'react';
import { getCommandNames } from '../commands';
import config from '../config/portfolio.json';

/**
 * Tab completion for command names and project IDs.
 */
export default function useTabCompletion() {
  return useCallback((input) => {
    const trimmed = input.trim().toLowerCase();
    if (!trimmed) return null;

    const commands = getCommandNames();
    const tokens = trimmed.split(/\s+/);

    // Single token: complete command names
    if (tokens.length === 1) {
      const matches = commands.filter((cmd) => cmd.startsWith(tokens[0]));
      if (matches.length === 1) return matches[0];
      return null;
    }

    // Two tokens after "projects"/"project": complete project IDs
    if (tokens.length === 2 && ['projects', 'project'].includes(tokens[0])) {
      const partial = tokens[1];
      const projectIds = config.projects.map((p) => p.id);
      const matches = projectIds.filter((id) => id.startsWith(partial));
      if (matches.length === 1) return `${tokens[0]} ${matches[0]}`;
    }

    // Two tokens after "theme": complete theme names
    if (tokens.length === 2 && tokens[0] === 'theme') {
      const themeNames = ['classic', 'retro', 'hacker', 'amber', 'list'];
      const partial = tokens[1];
      const matches = themeNames.filter((t) => t.startsWith(partial));
      if (matches.length === 1) return `${tokens[0]} ${matches[0]}`;
    }

    return null;
  }, []);
}
