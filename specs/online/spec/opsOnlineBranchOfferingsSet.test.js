import nav from '../lib/opsOnlineNavBar';
import home from '../lib/opsOnlineHome';

describe('Operations online branch select for program browse', () => {
	nav.login();
	home.changeLocation();
	home.toAutomationBranch();
	home.changeLocation();
	home.toAllLocations();
	nav.logout();
});
