import help from './help';
import about from './about';
import skills from './skills';
import projects from './projects';
import experience from './experience';
import contact from './contact';
import theme from './theme';
import matrix from './matrix';
import sudo from './sudo';
import clear from './clear';
import notFound from './notFound';

const commands = {
  help,
  about,
  skills,
  projects,
  project: projects,
  experience,
  contact,
  theme,
  matrix,
  sudo,
  clear,
};

export function executeCommand(commandName, args, config) {
  const handler = commands[commandName];
  if (handler) {
    return handler(args, config);
  }
  return notFound([commandName, ...args], config);
}

export function getCommandNames() {
  return Object.keys(commands);
}
