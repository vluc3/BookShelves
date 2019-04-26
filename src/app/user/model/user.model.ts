export class User {

    public uid: string;
    public email: string;
    public password: string;
    public displayName: string;
    public photoURL: string;
    public isAuthenticated: boolean = false;

    assign(user: firebase.User) {

        this.isAuthenticated = user != null;

        if (user != null) {

            this.uid = user.uid;
            this.email = user.email;
            this.displayName = user.displayName;
            this.photoURL = user.photoURL;
        }
    }
}