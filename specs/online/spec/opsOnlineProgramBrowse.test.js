import nav from '../lib/opsOnlineNavBar';
import home from '../lib/opsOnlineHome';
import prog from '../lib/opsOnlineSearch';

describe('Operations online program browse', () => {
	nav.login();
	home.changeLocation();
	home.toAutomationBranch();
	home.catSelect();
	prog.programSelect();
	nav.programsButton();
	home.changeLocation();
	home.toAllLocations();
	nav.logout();
});
