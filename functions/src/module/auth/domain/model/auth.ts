export class Auth {
  constructor(
    readonly uid: string,
    readonly email: string,
    readonly token: string,
  ) {}
}
