export class UserDto {
  id
  email
  fullName
  avatarUrl

  constructor(model) {
    this.email = model.email
    this.id = model._id
    this.fullName = model.fullName
    this.avatarUrl = model.avatarUrl || 'no avatar url..'
  }
}