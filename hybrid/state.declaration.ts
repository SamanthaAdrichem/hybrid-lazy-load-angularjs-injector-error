import {NgHybridStateDeclaration} from '@uirouter/angular-hybrid';

export interface StateDeclaration extends NgHybridStateDeclaration {
	permissions: [];
	requiresAuth: boolean;
}
