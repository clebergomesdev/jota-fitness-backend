import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import { UserStoreValidator, UserUpdateValidator } from 'App/Validators/User'

export default class UsersController {
  public async index({}: HttpContextContract) {
    const users = await User.all()

    return users
  }

  public async store({ request }: HttpContextContract) {
    const data = await request.validate(UserStoreValidator)

    const user = await User.create({ ...data })

    return user
  }

  public async show({ params }: HttpContextContract) {
    const user = await User.findOrFail(params.id)

    return user
  }

  public async update({ params, request }: HttpContextContract) {
    const user = await User.findOrFail(params.id)
    const data = await request.validate(UserUpdateValidator)
    console.log(data)

    user.merge(data)

    await user.save()

    return user
  }

  public async destroy({ params }: HttpContextContract) {
    const user = await User.findOrFail(params.id)

    await user.delete()
  }
}
