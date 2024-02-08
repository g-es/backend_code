export default class User {

	name;
	date_of_birth;
	attitude;

	constructor({
		name,
		date_of_birth,
		attitude,
	}){
		this.name = name || 'J. Doe';
		this.date_of_birth = date_of_birth || new Date();
		this.attitude = attitude || 'positive';
	}

	static from(params){
		return new User(params)
	}
}