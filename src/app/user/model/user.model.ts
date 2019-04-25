export class User {

    public uid: string = null;
    public displayName: string = null;
    public email: string = null;
    public password: string = null;
    public photoURL: string = null;
    public isAuthenticated: boolean = false;

    assign(user: firebase.User) {

        this.isAuthenticated = user != null;

        if (user != null) {

            this.uid = user.uid;
            this.displayName = user.displayName;
            this.email = user.email;
            this.photoURL = user.photoURL;
        }
    }
}